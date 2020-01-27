var enemy = {};

class CombatEntity {
	hp = 0
	counter = 0
}


initCombat();

function initCombat() {
}

function loadSkills(source, id) {
	const base = getEle("skill-bar-" + id);
	base.innerHTML = "";

	for (let i = 0; i < source.skills.length; i++) {
		let ele = document.createElement("div")
		ele.className = "skill"
		source.skills[i].setElement(ele);
		source.skills[i].updateName();
		base.appendChild(ele);
	}
}



function startCombat(monster) {
	if (!display("combat-tab")) {
		return
	}

	// if (actionInUse) {
	// 	return;
	// }

	updateAction(ACTIONS.COMBAT);

	generateEnemy(monster);

	updateHeroStats();
	updateEnemyStats();

	loadSkills(hero, 1);
	loadSkills(enemy, 2);

	combatLoop(hero, enemy);
	combatLoop(enemy, hero);
}

function combatLoop(source, target) {
	if (source.hp <= 0 || target.hp <= 0) {
		return;
	}

	source.resetCounter();

	loopForXSeconds(source.counter,
		() => {
			source.lowerCounter(1);
		}, 
		() => {
			if (source.hp <= 0 || target.hp <= 0) {
				return
			}

			let skillUsed = false;
			for (let i = 0; i < source.skills.length; i++) {
				if (source.skills[i].invoke(target)) {
					skillUsed = true;
					break;
				}
			}

			if (!skillUsed) {
				source.basicAttack(target);
			}

			let combatOver = false;

			if (source.hp <= 0) {
				source.defeat();
				combatOver = true;
			}

			if (target.hp <= 0) {
				target.defeat();
				combatOver = true;
			}

			if (combatOver) {
				resolveCombat();
				return;
			}

			setTimeout(() => {combatLoop(source, target)}, 1000);
		});
}

function heroCombatLoop() {
	if (hero.hp > 0 && enemy.hp > 0) {
		counter = 2;
		document.getElementById("counter").innerHTML = counter;
		loopForXSeconds(2, 
			function() {
				counter--;
				document.getElementById("counter").innerHTML = counter;
			},
			function() { 
				let skillUsed = false;
				for (let i = 0; i < skills.length; i++) {
					// TODO change this to no look at ele
					if (skills[i].ele !== null && skills[i].trigger()) {
						skills[i].invoke();
						skillUsed = true;
						break;
					}
				}

				if (!skillUsed) {
					// basic attack
					damageEnemy(1);
				}

				setTimeout(heroCombatLoop, 1000);
			}
		);
	}
}

function enemyCombatLoop() {
	if (hero.hp > 0 && enemy.hp > 0) {
		enemy.attackCounter = enemy.baseAttackCounter;
		document.getElementById("enemy-counter").innerHTML = enemy.attackCounter;
		loopForXSeconds(enemy.baseAttackCounter, 
			function() {
				enemy.attackCounter--;
				document.getElementById("enemy-counter").innerHTML = enemy.attackCounter;
			},
			function() { 
				if (enemy.hp > 0) {
					damageHero(1);
				}
				setTimeout(enemyCombatLoop, 1000);
			}
		);
	}
}

function resolveCombat() {
	updateAction(ACTIONS.IDLE);
}


function damageEnemy(damage) {
	enemy.hp -= damage;
	updateEnemyStats();

	if (enemy.hp <= 0) {
		resolveCombat();
	}
}

function damageHero(damage) {
	hero.hp -= damage;
	updateHeroStats();

	if (hero.hp <= 0) {
		resolveCombat();
	}
}

function updateHeroStats() {
	document.getElementById("hero-hp").innerHTML = hero.hp;
}

function updateEnemyStats() {
	document.getElementById("enemy-hp").innerHTML = enemy.hp;
}

function generateEnemy(monster) {
	// enemy = JSON.parse(JSON.stringify(monster));
	enemy = monster
}


