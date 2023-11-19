let attractQT = [];
class Body {
	constructor(x, y, z, vx, vy, vz, m) {
		this.pos = createVector(x, y, z);
		this.vel = createVector(vx, vy, vz);
		this.col = [random(0, 255), random(0, 255), random(0, 255)];
		this.mass = m;
		this.radius = ((this.mass * 4) / 3 / density / Math.PI) ** (1 / 3);
		this.acc = createVector(0, 0);
		this.r = 0;
	}

	show() {
		drawSphere(this.pos.x, this.pos.y, this.pos.z, this.radius, this.col);
	}

	update() {
		this.vel.add(this.acc.copy().mult(dt));
		this.pos.add(this.vel.copy().mult(dt));
	}

	attractor() {
		find(this, barnesHut);
		let copyAttractQT = attractQT;
		attractQT = [];
		return copyAttractQT;
	}

	calculateAcc(obj) {
		let numb = obj.indexOf(this);
		let acc = createVector(0, 0);
		let r;
		// calculate force
		for (let i = 0; i < obj.length; i++) {
			if (i != numb) {
				r = this.pos.copy().sub(obj[i].pos.copy());
				//console.log(this.radius + obj[i].radius)
				if (r.mag() > this.radius + obj[i].radius) {
					acc.add(r.copy().mult((-k * obj[i].mass) / r.mag() ** 3));

				} 
			}
		}
		this.acc = acc;

		// let acc = createVector(0, 0);
		// for (let i of obj) {
		// 	this.r = this.pos.copy().sub(i.centerOfMass.pos.copy());
		// 	if (this.r.mag() != 0) {
		// 		acc.add(
		// 			this.r.copy().mult((-k * i.totalMass) / this.r.mag() ** 3)
		// 		);
		// 	}
		// }
		// stroke(0, 0, 255);
		// line(
		// 	this.pos.x,
		// 	this.pos.y,
		// 	this.pos.z,
		// 	this.pos.x + acc.x * 3000,
		// 	this.pos.y + acc.y * 3000,
		// 	this.pos.z + acc.z * 3000
		// );
		// this.acc = acc;
	}
}
