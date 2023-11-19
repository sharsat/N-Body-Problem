var bodies_e = [];
var trackBody0_e = '';

createBodies_e = function (f) {
	bodies_e[0] = new body_e(f, 100, 60, 0, 0, -2, 0, 20); //-2.9
	bodies_e[1] = new body_e(f, -100, 60, 0, 0, 2, 0, 20);
	bodies_e[2] = new body_e(f, 0, 150, 150, 2, 0, 0, 20);
};

drawBodies_e = function (f) {
	trackBody0_e +=
		String(bodies_e[1].pos.x - centerOfMass_e(f).x) +
		' ' +
		String(bodies_e[1].pos.y - centerOfMass_e(f).y) +
		' ' +
		String(bodies_e[1].pos.z - centerOfMass_e(f).z) +
		'\n';
	trackCoordinateE.push([
		bodies_e[0].pos.x - centerOfMass_e(f).x,
		bodies_e[0].pos.y - centerOfMass_e(f).y,
		bodies_e[0].pos.z - centerOfMass_e(f).z,
	]);

	if (f.frameCount < 100) {
		console.log(totalForce_e(f));
	}
	bodies_e[0].show();
	bodies_e[1].show();
	bodies_e[2].show();

	for (let j = 0; j <= speed; j++) {
		bodies_e[0].calculateAcc(bodies_e[1]);
		bodies_e[0].calculateAcc(bodies_e[2]);
		bodies_e[1].calculateAcc(bodies_e[0]);
		bodies_e[1].calculateAcc(bodies_e[2]);
		bodies_e[2].calculateAcc(bodies_e[0]);
		bodies_e[2].calculateAcc(bodies_e[1]);
		bodies_e[0].update(bodies_e);
		bodies_e[1].update(bodies_e);
		bodies_e[2].update(bodies_e);
	}
};

totalForce_e = function (f) {
	// let totforce = f.createVector(0, 0);
	// for (body of bodies_e) {
	// 	totforce.add(body.vel.copy().mult(body.mass));
	// }
	// return totforce.mag();

	// let first_term = f.createVector(0, 0, 0);
	// let second_term = f.createVector(0, 0, 0);
	// for (let body of bodies_e) {
	// 	first_term.add(body.pos.copy().mult(body.pos.copy().mult(body.mass)));
	// }
	// for (let body of bodies_e) {
	// 	for (let other of bodies_e) {
	// 		differenceVec = body.pos.copy().sub(other.pos.copy());
	// 		multMass = body.mass * other.mass;
	// 	}
	// }
	// first_term.mult(1 / 2);
	// second_term.mult(k / 2);

	// return first_term.copy().sub(second_term.copy()).mag();

		let totforce = f.createVector(0, 0);
		for (body of bodies_l) {
			let crossP = body.pos.copy().cross(body.vel.copy());
			crossP.mult(body.mass);
			totforce.add(crossP);
		}

		return totforce.mag();
};

centerOfMass_e = function (f) {
	let sumOfMass = 0,
		sumOfPosition = f.createVector(0, 0);
	for (i in bodies_e) {
		sumOfMass += bodies_e[i].mass;
		sumOfPosition.add(bodies_e[i].pos.copy().mult(bodies_e[i].mass));
	}
	return sumOfPosition.mult(1 / sumOfMass);
};

class body_e {
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
		this.r = this.pos.copy().sub(body.pos.copy());
		acc.add(this.r.copy().mult((-k * body.mass) / this.r.mag() ** 3));
		this.acc = acc;
	}

	update(obj) {
		// this.acc = this.calculateAcc(obj);
		this.vel.add(this.acc.copy().mult(dt));
		this.pos.add(this.vel.copy().mult(dt));
	}
}
