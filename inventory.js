var inventory = {};


function addItem(item) {
	if (!(item.name in inventory)) {
		inventory[item.name] = {"item": item, "count": 0};
	}

	inventory[item.name].count++;
	updateInventory();
}

function removeItem(itemName, amount) {
	inventory[itemName].count -= amount;
	if (inventory[itemName].count <= 0) {
		delete inventory[itemName];
	}
	updateInventory();
}

function updateInventory() {
	var inv = document.getElementById("inventory");
	inv.innerHTML = "";	
	for (let key in inventory) {
		let ele = document.createElement("div");
		ele.innerHTML = inventory[key].count + "x  " + inventory[key].item.name;
		inv.appendChild(ele);
	}
}