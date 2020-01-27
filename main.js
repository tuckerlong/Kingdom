var counter = 0;
var actionInUse = false;
var cancelAction = false;
var currentAction = "Idle";
var ACTIONS = {
	IDLE: "Idle",
	COMBAT: "Combat",
	RESTING: "Resting",
	CRAFTING: "Crafting",
	EXPLORING: "Exploring"
}
var actionCounter = -1;

var item = {name: "Spider Leg"};

var sword = {name: "Sword", crafting: [{"item": item, "count": 1}]}


var enemy = {};

var hero = {
	hp: 10,
	maxHp: 10
}

class Entity {

	// COMBAT STUFF
	hp = 0
	maxHp = 0
	counter = 0
	baseCounter = 0
	skills = []
	

	basicAttack = (target) => {
		showMessage(this.name + " did 1 dmg to " + target.name);
		target.damage(1);
	}

	damage = (dmg) => {
		this.hp -= dmg;
	}

	defeat = () => {}

	lowerCounter = (amount) => {
		this.counter -= amount;
	}

	resetCounter = () => {}


	// MAIN STUFF
	name = ""
	registry = {}

	get = (key) => {
		return this.register[key]
	}

	register = (key, value) => {
		this.registry[key] = value;
	}
}

class Hero extends Entity {
	name = "Hero"

	hp = 10
	maxHp = 10
	baseCounter = 3
	skills = [];
	skillSlots = [];

	damage = (dmg) => {
		this.hp -= dmg;
		getEle("hero-hp").innerHTML = this.hp;
	}

	lowerCounter = (amount) => {
		this.counter -= amount;
		getEle("counter").innerHTML = this.counter;
	}

	resetCounter = () => {
		this.counter = this.baseCounter;
		getEle("counter").innerHTML = this.counter;
	}
}

var hero = new Hero();

function secondLoop() {
	counter++;
	document.getElementById("counter").innerHTML = counter;
	setTimeout(secondLoop, 1000);
}

function loopForXSeconds(seconds, onTick, callback) {
	if (cancelAction) {
		cancelAction = false;
		updateAction(ACTIONS.IDLE);
		return;
	}

	if (seconds > 0) {
		setTimeout(function() { 
			onTick();
			loopForXSeconds(seconds-1, onTick, callback);
		}, 1000);
	} else {
		callback();
	}
}

var messages = [];
var maxMessages = 7;
function showMessage(message) {
	messages = [message].concat(messages);
	messages = messages.slice(0, Math.min(maxMessages, messages.length));

	let messageSection = getEle("message");
	messageSection.innerHTML = "";
	for (let i = 0; i < messages.length; i++) {
		let messageDiv = document.createElement("div");
		messageDiv.innerHTML = messages[i];
		messageSection.appendChild(messageDiv);
	}
}

function init() {
	updateAction(ACTIONS.IDLE);
	increaseCounter();

	updateHeroStats();
	updateEnemyStats();
}

function updateAction(action) {
	currentAction = action;
	actionInUse = action === ACTIONS.IDLE ? false : true;
	if ([ACTIONS.IDLE, ACTIONS.EXPLORING].indexOf(currentAction) === -1) {
		increaseCounter();
	}
	document.getElementById("current-action").innerHTML = currentAction;
}

function increaseCounter() {
	actionCounter++;
	getEle("action-count").innerHTML = actionCounter;
}


var prevTab = "map-tab";
function display(tabName) {
	if ([ACTIONS.COMBAT, ACTIONS.EXPLORING].indexOf(currentAction) !== -1) {
		return false;
	}

	document.getElementById(prevTab).style.display = "none";
	document.getElementById(tabName).style.display = "block";
	prevTab = tabName;
	return true;
}

function getEle(name) {
	return document.getElementById(name);
}