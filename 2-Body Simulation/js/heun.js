var bodies_h = [];
var trackBody0_h = '';

createBodies_h = function (f) {
	bodies_h[0] = new body_h(f, 50, 0, 0, 0, -2, 0, 10); //-2.9
	bodies_h[1] = new body_h(f, -100, 0, 0, 0, 2, 0, 20);
};

drawBodies_h = function (f) {
	trackBody0_h +=
		String(bodies_h[0].pos.x - centerOfMass_h(f).x) +
		' ' +
		String(bodies_h[0].pos.y - centerOfMass_h(f).y) +
		' ' +
		String(bodies_h[0].pos.z - centerOfMass_h(f).z) +
		'\n';
	trackCoordinateH.push([
		bodies_h[0].pos.x - centerOfMass_h(f).x,
		bodies_h[0].pos.y - centerOfMass_h(f).y,
		bodies_h[0].pos.z - centerOfMass_h(f).z,
	]);

	bodies_h[0].show();
	bodies_h[1].show();

	for (let j = 0; j <= speed; j++) {
		bodies_h[0].calculateAcc(bodies_h[1]);
		bodies_h[1].calculateAcc(bodies_h[0]);
		bodies_h[0].acc0 = bodies_h[0].acc.copy();
		bodies_h[0].vel0 = bodies_h[0].vel.copy();
		bodies_h[0].pos0 = bodies_h[0].pos.copy();
		bodies_h[1].acc0 = bodies_h[1].acc.copy();
		bodies_h[1].vel0 = bodies_h[1].vel.copy();
		bodies_h[1].pos0 = bodies_h[1].pos.copy();
		bodies_h[0].vel.add(bodies_h[0].acc.copy().mult(dt));
		bodies_h[1].vel.add(bodies_h[1].acc.copy().mult(dt));
		bodies_h[0].pos.add(bodies_h[0].vel.copy().mult(dt));
		bodies_h[1].pos.add(bodies_h[1].vel.copy().mult(dt));
		bodies_h[0].calculateAcc(bodies_h[1]);
		bodies_h[1].calculateAcc(bodies_h[0]);
		bodies_h[0].acc1 = bodies_h[0].acc.copy();
		bodies_h[1].acc1 = bodies_h[1].acc.copy();

		bodies_h[0].acc = bodies_h[0].acc0
			.copy()
			.mult(dt / 2)
			.add(bodies_h[0].acc1.copy().mult(dt / 2));
		bodies_h[1].acc = bodies_h[1].acc0
			.copy()
			.mult(dt / 2)
			.add(bodies_h[1].acc1.copy().mult(dt / 2));
		bodies_h[0].vel = bodies_h[0].vel0.copy().add(bodies_h[0].acc.copy());
		bodies_h[1].vel = bodies_h[1].vel0.copy().add(bodies_h[1].acc.copy());
		bodies_h[0].pos = bodies_h[0].pos0
			.copy()
			.add(bodies_h[0].vel.copy().mult(dt));
		bodies_h[1].pos = bodies_h[1].pos0
			.copy()
			.add(bodies_h[1].vel.copy().mult(dt));
	}
};

centerOfMass_h = function (f) {
	let sumOfMass = 0,
		sumOfPosition = f.createVector(0, 0);
	for (i in bodies_h) {
		sumOfMass += bodies_h[i].mass;
		sumOfPosition.add(bodies_h[i].pos.copy().mult(bodies_h[i].mass));
	}
	return sumOfPosition.mult(1 / sumOfMass);
};

class body_h {
	constructor(f, x, y, z, vx, vy, vz, m) {
		this.f = f;
		this.pos = f.createVector(x, y, z);
		this.vel = f.createVector(vx, vy, vz);
		this.col = [f.random(0, 255), f.random(0, 255), f.random(0, 255)];
		this.mass = m;
		this.radius = ((this.mass * 4) / 3 / density / Math.PI) ** (1 / 3);
		this.acc = f.createVector(0, 0);
		this.r = 0;

		this.pos0 = f.createVector(0, 0);
		this.vel0 = f.createVector(0, 0);
		this.acc0 = f.createVector(0, 0);
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

	calculateAcc(body) {
		let acc = this.f.createVector(0, 0, 0);
		// calculate force

		this.r = this.pos.copy().sub(body.pos.copy());
		acc.add(this.r.copy().mult((-k * body.mass) / this.r.mag() ** 3));

		this.acc = acc;
	}

	updateVel1(obj) {
		this.vel.add(this.acc.copy().mult(dt));
		this.velE = this.vel.copy();
		this.pos.add(this.vel.copy().mult(dt));
	}

	update2(obj) {
		this.vel.add(this.acc.copy().mult(dt));
		this.vel = this.vel.copy().mult(0.5).add(this.velE.copy().mult(0.5));
	}
}
