class Base {
	name = "Base"
	length = -1
	timer = -1
	element = null
	shortInfo = "No info set.";
	longInfo = "This skill hasn't had more info set.";

	effect = (target) => {}

	setElement = (element) => {
		this.element = element;
	}

	invoke = (target) => {
		if (this.timer > 0) {
			return false;
		}

		showMessage("Used " + this.name);
		this.effect(target);
		
		this.timer = this.length;
		this.updateName();

		loopForXSeconds(this.timer, () => {
			this.timer--;
			this.updateName();
		}, () => {
			this.updateName();
		});

		return true
	}
	
	trigger = () => {
		return this.timer <= 0;
	}

	updateName = () => {
		if (this.timer > 0) {
			this.element.innerHTML = this.timer + "<br/> " + this.name;
		} else {
			this.element.innerHTML = "--<br/>" + this.name;
		}
	}
}

class Slap extends Base {
	name = "Slap"
	length = 10

	effect = (target) => {	
		target.damage(2);
	}
}

class Bite extends Base {
	name = "Bite"
	length = 5
	shortInfo = "Does 5 damage."
	longInfo = "Bite your opponent for 5 damage.";

	effect = (target) => {
		target.damage(5);
	}
}