class Tile {
	name = "Tile"
	tiles = [[]]; // 2d array
	previous = null;
	element = null;
	hidden = false;
	counter = 0;

	constructor(previous, hidden = false) {
		this.previous = previous || null;
		this.hidden = hidden;
	}

	activate = () => {
		loadMap(this);
	}

	click = () => {
		if (actionInUse) {
			return
		}

		if (this.hidden) {
			updateAction(ACTIONS.EXPLORING);
			this.element.innerHTML = "Explore<br>" + this.counter;

			loopForXSeconds(this.counter,
				() => {
					increaseCounter();
					this.counter -= 1;
					this.element.innerHTML = "Explore<br>" + this.counter;
				}, 
				() => {
					this.hidden = false;
					this.element.innerHTML = this.name;
					updateAction(ACTIONS.IDLE);
				}
			);
			return
		}

		this.activate();
	}

	init = (element) => {
		this.element = element;
		this.element.innerHTML = this.hidden ? "Explore<br>" + this.counter : this.name;
	}
}

class Rest extends Tile {
	name = "Rest";
	activate = () => {
		if (actionInUse) {
			if (currentAction === ACTIONS.RESTING) {
				cancelAction = true;
			}
			return;
		}

		if (hero.hp === hero.maxHp) {
			showMessage("You are already fully healed.")
			return;
		}
	
		updateAction(ACTIONS.RESTING);
		this.element.innerHTML = "Rest<br/>" + hero.hp + "/" + hero.maxHp;
	
		loopForXSeconds(hero.maxHp - hero.hp, 
			() => {
				hero.hp++;
				updateHeroStats();
				if (this.element) {
					this.element.innerHTML = "Rest<br/>" + hero.hp + "/" + hero.maxHp;
				}
			}, 
			() => {
				this.element.innerHTML = "Rest";
				updateAction(ACTIONS.IDLE);
			}
		);
	}
}

class Campground extends Tile {
	name = "Campground";

	tiles = [[new Rest()]]
}

class BackAlley extends Tile {
	name = "Back Alley";

	activate = () => {
		startCombat(new Rat());
	}
}

class FrontAlley extends Tile {
	name = "Front Alley"

	activate = () => {
		startCombat(new Spider());
	}
}

class MiddleAlley extends Tile {
	name = "Middle Alley"
	hidden = true;
	counter = 3;

	constructor(previous) {
		super(previous, true);
	}

	activate = () => {
		startCombat(new Spider());
	}
}

class Town extends Tile {
	name = "Town";
	tiles = [[new BackAlley(this), new Campground(this), new FrontAlley(this), new MiddleAlley(this), new BackAlley(this)], [new BackAlley(this)]];
};

class Overworld extends Tile {
	name = "Overworld";
	tiles = [[new Town(this)]];
};

var currentMap = null;

function loadMap(newMap) {
	currentMap = newMap;
	drawMap();
}

loadMap(new Overworld()); // Call on init to get base map ready.

function drawMap() {
	if (currentMap === null) {
		return
	}

	getEle("map-title").innerHTML = currentMap.name;
	
	var mapEle = getEle("map-tiles");
	mapEle.innerHTML = "";

	for (let y = 0; y < currentMap.tiles.length; y++) {
		for (let x = 0; x < currentMap.tiles[y].length; x++) {
			let mapTile = document.createElement("div");
			mapTile.classList.add("map-tile");
			mapTile.onclick = () => { currentMap.tiles[y][x].click() };
			currentMap.tiles[y][x].init(mapTile);
			mapEle.appendChild(mapTile);
		}
		let spacer = document.createElement("div");
		spacer.classList.add("map-spacer");
		mapEle.appendChild(spacer);
	}

	if (currentMap.previous !== null) {
		let backLink = document.createElement("div");
		backLink.classList.add("map-tile");
		backLink.innerHTML = "Back to " + currentMap.previous.name;
		backLink.onclick = () => { currentMap.previous.click() };
		mapEle.appendChild(backLink);
	}
}