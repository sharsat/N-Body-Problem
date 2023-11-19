var bodies_a = [];
var trackBody0_a = '';
var trackerCOM = [];
const provDt = 0.000000000000000000000001;

createBodies_a = function (f) {
	bodies_a[0] = new body_a(f, 50, 0, 0, 0, -2, 0, 10);
	bodies_a[1] = new body_a(f, -100, 0, 0, 0, 2, 0, 20);
};

drawBodies_a = function (f) {
	trackBody0_a +=
		String(bodies_a[0].pos.x - centerOfMass_a(f).x) +
		' ' +
		String(bodies_a[0].pos.y - centerOfMass_a(f).y) +
		' ' +
		String(bodies_a[0].pos.z - centerOfMass_a(f).z) +
		'\n';
	trackCoordinate.push([
		bodies_a[0].pos.x - centerOfMass_a(f).x,
		bodies_a[0].pos.y - centerOfMass_a(f).y,
		bodies_a[0].pos.z - centerOfMass_a(f).z,
	]);
	for (let i in bodies_a) {
		if (bodies_a[i].pos.mag() < 2000) {
			bodies_a[i].show();
		}
	}

	for (let j = 0; j < speed; j++) {
		for (let i in bodies_a) {
		}

		for (i in bodies_a) {
			if (f.frameCount == 1 && j < 2) {
				bodies_a[i].calculateAcc(bodies_a);
				bodies_a[i].updateE(bodies_a);
			} else {
				bodies_a[i].update(bodies_a);
			}
		}
		trackerCOM.push(centerOfMass_a(f));
	}
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


	calculateAcc(obj) {
		let numb = obj.indexOf(this);
		let acc = this.f.createVector(0, 0, 0);
		// calculate force
		for (let i = 0; i < obj.length; i++) {
			if (i != numb) {
				//	if (this.r == 0 || this.r.mag() >= obj[i].radius + this.radius) {
				this.r = this.pos.copy().sub(obj[i].pos.copy());
				acc.add(
					this.r.copy().mult((-k * obj[i].mass) / this.r.mag() ** 3)
				);
				//}
			}
		}
		return acc;
	}

	updateE(obj) {
		this.acc = this.calculateAcc(obj);
		this.vel.add(this.acc.copy().mult(provDt));
		this.pos.add(this.vel.copy().mult(provDt));

		this.trackA.push(this.acc);
		this.trackV.push(this.vel);
	}

	update(obj) {
		this.acc = this.calculateAcc(obj);
		this.vel
			.add(this.acc.copy().mult((23 * dt) / 12))
			.sub(this.trackA[1].copy().mult((16 * dt) / 12))
			.add(this.trackA[0].copy().mult((5 * dt) / 12));
		this.pos
			.add(this.vel.copy().mult((23 * dt) / 12))
			.sub(this.trackV[1].copy().mult((16 * dt) / 12))
			.add(this.trackV[0].copy().mult((5 * dt) / 12));

		this.trackA.push(this.acc);
		this.trackV.push(this.vel);
		this.trackA.shift();
		this.trackV.shift();
	}
}
