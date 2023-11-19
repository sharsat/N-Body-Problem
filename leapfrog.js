var bodies_l = [];
var trackBody0_l = '';

createBodies_l = function (f) {
	bodies_l[0] = new body_l(f, 50, 0, 0, 0, -1.99, 0, 10);
	bodies_l[1] = new body_l(f, -100, 0, 0, 0, 2, 0, 20);

	bodies_l[0].pos.add(bodies_l[0].vel.copy().mult(dt / 2));
	bodies_l[1].pos.add(bodies_l[1].vel.copy().mult(dt / 2));
	bodies_l[0].calculateAcc(bodies_l[1]);
	bodies_l[1].calculateAcc(bodies_l[0]);

	// bodies_l[0].velHT = bodies_l[0].vel
	// 	.copy()
	// 	.add(bodies_l[1].acc.copy().mult(0.5 * dt));
	// bodies_l[1].velHT = bodies_l[1].vel
	// 	.copy()
	// 	.add(bodies_l[0].acc.copy().mult(0.5 * dt));
};

drawBodies_l = function (f) {
	trackBody0_l +=
		String(bodies_l[0].pos.x - centerOfMass_l(f).x) +
		' ' +
		String(bodies_l[0].pos.y - centerOfMass_l(f).y) +
		' ' +
		String(bodies_l[0].pos.z - centerOfMass_l(f).z) +
		'\n';
	trackCoordinateL.push([
		bodies_l[0].pos.x - centerOfMass_l(f).x,
		bodies_l[0].pos.y - centerOfMass_l(f).y,
		bodies_l[0].pos.z - centerOfMass_l(f).z,
	]);

	if (f.frameCount < 100) {
		 console.log(totalForce_l(f));
	}
	bodies_l[0].show();
	bodies_l[1].show();

	for (let j = 0; j < speed; j++) {
		bodies_l[0].calculateAcc(bodies_l[1]);
		bodies_l[1].calculateAcc(bodies_l[0]);
		bodies_l[0].update(bodies_l[1]);
		bodies_l[1].update(bodies_l[0]);
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

totalForce_l = function (f) {
	// let totforce = f.createVector(0, 0);
	// for (body of bodies_l) {
	// 	totforce.add(body.vel.copy().mult(body.mass));
	// }
	// return totforce.mag();

	let totforce = f.createVector(0, 0);
	for (body of bodies_l) {
		let crossP = body.pos.copy().cross(body.vel.copy());
		crossP.mult(body.mass);
		totforce.add(crossP);
	}

	return totforce.mag()
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

	calculateAcc(body) {
		let acc = this.f.createVector(0, 0, 0);
		// calculate force
		this.r = this.pos.copy().sub(body.pos.copy());
		acc.add(this.r.copy().mult((-k * body.mass) / this.r.mag() ** 3));

		// return acc;
		this.acc = acc;
	}

	update(other) {
		// this.pos.add(this.velHT.copy().mult(dt));
		// this.calculateAcc(other);
		// this.vel = this.velHT.copy().add(this.acc.copy().mult(dt / 2));
		// this.velHT = this.vel.copy().add(this.acc.copy().mult(dt / 2));

		this.vel.add(this.acc.copy().mult(dt));
		this.pos.add(this.vel.copy().mult(dt));
	}
}
