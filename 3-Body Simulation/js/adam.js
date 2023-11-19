var bodies_a = [];
var trackBody0_a = '';
var trackerCOM = [];
const provDt = 0.0000000001;

createBodies_a = function (f) {
	bodies_a[0] = new body_a(f, 50, 0, 0, 0, -2, 0, 10);
	bodies_a[1] = new body_a(f, -100, 0, 0, 0, 2, 0, 20);

	bodies_a[0].calculateAcc(bodies_a[1]);
	bodies_a[1].calculateAcc(bodies_a[0]);
	bodies_a[0].updateE(bodies_a);
	bodies_a[1].updateE(bodies_a);
	bodies_a[0].calculateAcc(bodies_a[1]);
	bodies_a[1].calculateAcc(bodies_a[0]);
	bodies_a[0].updateE(bodies_a);
	bodies_a[1].updateE(bodies_a);
	bodies_a[0].calculateAcc(bodies_a[1]);
	bodies_a[1].calculateAcc(bodies_a[0]);
	bodies_a[0].updateE(bodies_a);
	bodies_a[1].updateE(bodies_a);
};

drawBodies_a = function (f) {
	trackBody0_a +=
		String(bodies_a[0].pos.x - centerOfMass_a(f).x) +
		' ' +
		String(bodies_a[0].pos.y - centerOfMass_a(f).y) +
		' ' +
		String(bodies_a[0].pos.z - centerOfMass_a(f).z) +
		'\n';
	trackCoordinateA.push([
		bodies_a[0].pos.x - centerOfMass_a(f).x,
		bodies_a[0].pos.y - centerOfMass_a(f).y,
		bodies_a[0].pos.z - centerOfMass_a(f).z,
	]);

	//console.log(totalForce_a(f))
	bodies_a[0].show();
	bodies_a[1].show();

	for (let j = 0; j < speed; j++) {
		bodies_a[0].update();
		bodies_a[1].update();

		bodies_a[0].calculateAcc(bodies_a[1]);
		bodies_a[1].calculateAcc(bodies_a[0]);
	}

	// for (let j = 0; j < speed; j++) {
	// 	for (i in bodies_a) {
	// 		if (f.frameCount == 1 && j < 2) {
	// 			bodies_a[i].calculateAcc(bodies_a);
	// 			bodies_a[i].updateE(bodies_a);
	// 		} else {
	// 			bodies_a[i].update(bodies_a);
	// 		}
	// 	}
	// 	trackerCOM.push(centerOfMass_a(f));
	// }
};

centerOfMass_a = function (f) {
	let sumOfMass = 0,
		sumOfPosition = f.createVector(0, 0);
	for (i in bodies_a) {
		sumOfMass += bodies_a[i].mass;
		sumOfPosition.add(bodies_a[i].pos.copy().mult(bodies_a[i].mass));
	}
	return sumOfPosition.mult(1 / sumOfMass);
};

totalForce_a = function (f) {
	let totforce = f.createVector(0, 0);
	for (body of bodies_a) {
		totforce.add(body.vel.copy().mult(body.mass));
	}
	return totforce.mag()
};

class body_a {
	constructor(f, x, y, z, vx, vy, vz, m) {
		this.f = f;
		this.pos = f.createVector(x, y, z);
		this.vel = f.createVector(vx, vy, vz);
		this.col = [f.random(0, 255), f.random(0, 255), f.random(0, 255)];
		this.mass = m;
		this.radius = ((this.mass * 4) / 3 / density / Math.PI) ** (1 / 3);
		this.acc = f.createVector(0, 0);
		this.r = 0;
		this.trackA = [];
		this.trackV = [];
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

	updateE(obj) {
		this.vel.add(this.acc.copy().mult(provDt));
		this.pos.add(this.vel.copy().mult(provDt));

		this.trackA.push(this.acc);
		this.trackV.push(this.vel);
	}

	update(obj) {
		this.vel
			.add(this.acc.copy().mult((23 * dt) / 12))
			.sub(this.trackA[1].copy().mult((16 * dt) / 12))
			.add(this.trackA[0].copy().mult((5 * dt) / 12));
		this.pos.add(this.vel.copy().mult(dt));

		this.trackA.push(this.acc);
		this.trackV.push(this.vel);
		this.trackA.shift();
		this.trackV.shift();
	}
}
