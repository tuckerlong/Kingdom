class Monster extends Entity {
	loot = []
	counter = 0

	damage = (dmg) => {
		this.hp -= dmg;
		getEle("enemy-hp").innerHTML = this.hp;
	}

	defeat = () => {
		for (let i = 0; i < this.loot.length; i++) {
			addItem(this.loot[i].item);
			showMessage(this.name + " dropped " + this.loot[i].item.name);
		}
	}

	lowerCounter = (amount) => {
		this.counter -= amount;
		getEle("enemy-counter").innerHTML = this.counter;
	}

	resetCounter = () => {
		this.counter = this.baseCounter;
		getEle("enemy-counter").innerHTML = this.counter;
	}
}

class Rat extends Monster {
	name = "Rat"
	hp = 10
	baseCounter = 5
	loot = []
	skills = [new Slap()]
}

class Spider extends Monster {
	name = "Spider"
	hp = 3
	baseCounter = 5
	loot = [{"item": item, rate: 10.0}]
	skills = [new Slap()]
}

// var rat = {
// 	hp: 10,
// 	attackCounter: 0,
// 	baseAttackCounter: 4,
// 	loot: [],
// 	skills: [new Slap()]
// }

// var spider = {
// 	hp: 3,
// 	attackCounter: 0,
// 	baseAttackCounter: 3,
// 	loot: [{"item": item, rate: 10.0}],
// 	skills: [new Slap()]
// }