class SkillSlot {
	ele = null;
	name = "Always";
	skill = null;
	tooltip = "Always activates if possible";

	selecting = () => {
		this.ele.innerHTML = this.name + "<br/>Selecting";
	}
	
	setSkill = (skill) => {
		this.skill = skill;
		this.updateName();
	}

	unselect = () => {
		this.ele.innerHTML = this.name + "<br/>" + (this.skill !== null ? this.skill.name : "Not set");
	}
	
	updateElement = (ele) => {
		this.ele = ele;
		ele.title = this.tooltip;
		this.updateName();
	}

	updateName = () => {
		this.ele.innerHTML = this.name + "<br/>" + (this.skill !== null ? this.skill.name : "Not set");
	}
}

class HPSkillSlot extends SkillSlot {
	name = "HP < 50";
	tooltip = "HP < 50 before skill can activate";
}

fighterSkillSlots = [new HPSkillSlot(), new SkillSlot(), new SkillSlot()];