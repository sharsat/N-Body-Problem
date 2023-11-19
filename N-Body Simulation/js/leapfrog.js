var bodies_l = [];
var trackBody0_l = '';

createBodies_l = function (f) {
	bodies_l[0] = new body_l(f, 50, 0, 0, 0, -0.85, 0, 10);
	bodies_l[1] = new body_l(f, -100, 0, 0, 0, 2, 0, 20);

	for (i in bodies_l) {
		bodies_l[i].calculateAcc(bodies_l);
	}
	for (i in bodies_l) {
		bodies_l[i].velH = bodies_l[i].vel
			.copy()
			.add(bodies_l[i].acc.copy().mult(dt / 2));
	}
};

drawBodies_l = function (f) {
	trackBody0_l +=
		String(bodies_l[0].pos.x - centerOfMass_l(f).x) +
		' ' +
		String(bodies_l[0].pos.y - centerOfMass_l(f).y) +
		' ' +
		String(bodies_l[0].pos.z - centerOfMass_l(f).z) +
		'\n';
	trackCoordinateE.push([
		bodies_l[0].pos.x - centerOfMass_l(f).x,
		bodies_l[0].pos.y - centerOfMass_l(f).y,
		bodies_l[0].pos.z - centerOfMass_l(f).z,
	]);
	for (let i in bodies_l) {
		if (bodies_l[i].pos.mag() < 2000) {
			bodies_l[i].show();
		}
	}

	for (let j = 0; j <= speed; j++) {
		for (i in bodies_l) {
			bodies_l[i].calculateAcc(bodies_l);
		}

		for (i in bodies_l) {
			bodies_l[i].update(bodies_l);
		}
	}
};

centerOfMass_l = function (f) {
	let sumOfMass = 0,
		sumOfPosition = f.createVector(0, 0);
	for (i in bodies_l) {
		sumOfMass += bodies_l[i].mass;
		sumOfPosition.add(bodies_l[i].pos.copy().mult(bodies_l[i].mass));
	}
	return sumOfPosition.mult(1 / sumOfMass);
};

class body_l {
	constructor(f, x, y, z, vx, vy, vz, m) {
		this.f = f;
		this.pos = f.createVector(x, y, z);
		this.vel = f.createVector(vx, vy, vz);
		this.col = [f.random(0, 255), f.random(0, 255), f.random(0, 255)];
		this.mass = m;
		this.radius = ((this.mass * 4) / 3 / density / Math.PI) ** (1 / 3);
		this.acc = f.createVector(0, 0);
		this.r = 0;
	}

	show() {
		drawSphere(
			this.f,
			this.pos.x,
			this.pos.y,
			this.pos.z,
			this.radius,
			this.col
		);
	}

	calculateAcc(obj) {
		let numb = obj.indexOf(this);
		let acc = this.f.createVector(0, 0, 0);
		// calculate force
		for (let i = 0; i < obj.length; i++) {
			if (i != numb) {
				this.r = this.pos.copy().sub(obj[i].pos.copy());
				acc.add(
					this.r.copy().mult((-k * obj[i].mass) / this.r.mag() ** 3)
				);
			}
		}
		// return acc;
		this.acc = acc;
	}

	update(obj) {
		let provVel = this.vel.copy();
		this.vel = this.velH.copy().add(this.acc.copy().mult(dt));
		this.velH = provVel.copy();
		this.pos = this.pos.copy().add(this.vel.copy().mult(dt));
	}
}
