var bodies_h = [];
var trackBody0_h = '';

createBodies_h = function (f) {
	bodies_h[0] = new body_h(f, 50, 0, 0, 0, -2, 0, 10);
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

	for (let i in bodies_h) {
		if (bodies_h[i].pos.mag() < 2000) {
			bodies_h[i].show();
		}
	}

	for (let j = 0; j <= speed; j++) {
		for (i in bodies_h) {
			bodies_h[i].calculateAcc(bodies_h);
		}

		for (i in bodies_h) {
			bodies_h[i].interMediateStep(bodies_h);
		}

		for (i in bodies_h) {
			bodies_h[i].update(bodies_h);
		}
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

	calculateAcc(obj) {
		let numb = obj.indexOf(this);
		let acc = this.f.createVector(0, 0);

		for (let i = 0; i < obj.length; i++) {
			if (i != numb) {
				if (
					this.r == 0 ||
					this.r.mag() >= obj[i].radius + this.radius
				) {
					this.r = this.pos.copy().sub(obj[i].pos.copy());
					acc.add(
						this.r
							.copy()
							.mult((-k * obj[i].mass) / this.r.mag() ** 3)
					);
				}
			}
		}
		this.acc = acc;
	}

	interMediateStep(obj) {
		// this.acc = this.calculateAcc(obj);
		//this.acc = this.calculateAcc(obj);

		this.acc0 = this.acc.copy();
		this.vel0 = this.vel.copy();
		this.pos0 = this.pos.copy();

		this.vel.add(this.acc.copy().mult(dt));
		this.pos.add(this.vel.copy().mult(dt));
	}

	update(obj) {
		let acc1 = this.acc;
		let vel1 = this.vel.copy();
		let pos1 = this.vel.copy();

		this.vel = this.vel0.copy().add(
			acc1
				.copy()
				.mult(dt / 2)
				.add(this.acc0.copy().mult(dt / 2))
		);
		this.pos = this.pos0.copy().add(
			vel1
				.copy()
				.mult(dt / 2)
				.add(this.vel0.copy().mult(dt / 2))
		);
	}
}
