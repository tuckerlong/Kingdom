var craftTimer = 0;


function createSword() {
	let hasRequiredItems = true;
	for(let i = 0; i < sword.crafting.length; i++) {
		if (!(sword.crafting[i].item.name in inventory) || inventory[sword.crafting[i].item.name].count < sword.crafting[i].count) {
			hasRequiredItems = false;
			break;
		}
	}

	if (!hasRequiredItems) {
		return;
	}

	updateAction(ACTIONS.CRAFTING);

	for(let i = 0; i < sword.crafting.length; i++) {
		removeItem(sword.crafting[i].item.name, sword.crafting[i].count);
	}

	craftTimer = 10;
	document.getElementById("craft-timer").innerHTML = craftTimer;
	
	loopForXSeconds(craftTimer, function() {
		craftTimer--;
		document.getElementById("craft-timer").innerHTML = craftTimer;
	}, function() {
		addItem(sword);
		updateAction(ACTIONS.IDLE);
	});
}