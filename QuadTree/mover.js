class Body {
	constructor(x, y, vx, vy, m) {
		this.pos = createVector(x, y);
		this.vel = createVector(vx, vy);
		this.acc = createVector(0, 0);
		this.mass = m;
		this.col = [random(255), random(255), random(255)];
		this.radius = 15;
	}

	applyForce(force) {
		let f = p5.Vector.div(force, this.mass);
		this.acc.add(f);
	}

	attract(mover) {
		let force = p5.Vector.sub(this.pos, mover.pos);
		let distanceSq = constrain(force.magSq(), 100, 1000);
		let strength = (k * (this.mass * mover.mass)) / distanceSq;
		force.setMag(strength);
		mover.applyForce(force);
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.set(0, 0);
	}

	show() {
		noStroke()
		fill(this.col);
		ellipse(this.pos.x, this.pos.y, this.radius);
	}
}
