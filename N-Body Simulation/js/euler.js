var bodies_e = [];
var trackBody0_e = '';

createBodies_e = function (f) {
	bodies_e[0] = new body_e(f, 50, 0, 0, 0, -2, 0, 10);
	bodies_e[1] = new body_e(f, -100, 0, 0, 0, 2, 0, 20);
	
};

drawBodies_e = function (f) {
	trackBody0_e +=
		String(bodies_e[0].pos.x - centerOfMass_e(f).x) +
		' ' +
		String(bodies_e[0].pos.y - centerOfMass_e(f).y) +
		' ' +
		String(bodies_e[0].pos.z - centerOfMass_e(f).z) +
		'\n';
	trackCoordinateE.push([
		bodies_e[0].pos.x - centerOfMass_e(f).x,
		bodies_e[0].pos.y - centerOfMass_e(f).y,
		bodies_e[0].pos.z - centerOfMass_e(f).z,
	]);
	for (let i in bodies_e) {
		if (bodies_e[i].pos.mag() < 2000) {
			bodies_e[i].show();
		}
	}

	for (let j = 0; j <= speed; j++) {
		for (i in bodies_e) {
			bodies_e[i].calculateAcc(bodies_e);
		}

		for (i in bodies_e) {
			bodies_e[i].update(bodies_e);
		}
	}
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
		// this.acc = this.calculateAcc(obj);
		this.vel.add(this.acc.copy().mult(dt));
		this.pos.add(this.vel.copy().mult(dt));
	}
}
