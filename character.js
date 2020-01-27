class AvailableSkill {
	assigned = false;
	ele = null;
	name = "Always";
	skill = null;
	tooltip = "Always activates if possible";
	assigned = false;

	constructor(skill) {
		this.skill = skill;
	}

	assign = () => {
		this.assigned = true;
		this.ele.classList.add("skill-assigned");
	}

	updateElement = (ele) => {
		this.ele = ele;
		this.ele.innerHTML = this.skill.name + "<br/>CD:" + this.skill.length + "<br/>" + this.skill.shortInfo;
		this.ele.title = this.skill.longInfo;
	}
}

var availableSkills = [];

function initCharacterJS() {
	// Add available skills. Function since it will be called again when you acquire new skills
	updateAvailableSkills();


	// Create skill structure. Eventually based on character class

	const skillBar = getEle("skill-bar");

	for (let i = 0; i < fighterSkillSlots.length; i++) {
		hero.skillSlots[i] = fighterSkillSlots[i];
		let ele = document.createElement("div");
		ele.classList.add("skill-slot");
		hero.skillSlots[i].updateElement(ele);
		ele.onclick = function() { selectSkillSlot(hero.skillSlots[i]); }
		skillBar.appendChild(ele);
	}
}

initCharacterJS();

var selectedSlot = null;

function selectSkill(skill) {
	if (selectedSlot === null || skill.assigned) {
		return
	}

	skill.assign();
	selectedSlot.setSkill(skill.skill);
}

function selectSkillSlot(slot) {
	if (selectedSlot != null) {
		selectedSlot.unselect();
	}
	
	selectedSlot = selectedSlot === slot ? null : slot;
	
	if (selectedSlot !== null) {
		slot.selecting();
	}
}


function updateAvailableSkills() {
	const skillsAva = getEle("skills-available");
	skillsAva.innerHTML = "";
	availableSkills = [];

	for (let i = 0; i < hero.skills.length; i++) {
		availableSkills[i] = new AvailableSkill(hero.skills[i]);
		let ele = document.createElement("div");
		ele.classList.add("skill-slot");
		ele.onclick = function() { selectSkill(availableSkills[i]) }
		availableSkills[i].updateElement(ele);
		skillsAva.appendChild(ele);
	}
}