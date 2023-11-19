class QuadTree {
	constructor(x, y, z, w, h, l, n) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
		this.h = h;
		this.l = l;
		this.capacity = n;
		this.containingPoints = [];
		this.divided = false;
		this.centerOfMass;
		this.points = [];
		this.totalMass = 0;
	}

	contains(body) {
		return (
			body.pos.x <= this.x + this.w / 2 &&
			body.pos.x > this.x - this.w / 2 &&
			body.pos.y <= this.y + this.h / 2 &&
			body.pos.y > this.y - this.h / 2 &&
			body.pos.z <= this.z + this.l / 2 &&
			body.pos.z > this.z - this.l / 2
		);
	}

	insert(point) {
		if (this.contains(point)) {
			if (this.containingPoints.length < this.capacity && !this.divided) {
				// INSERT POINT, IF NOT FILLED
				this.containingPoints.push(point);
				this.points.push(point);
			} else {
				if (!this.divided) {
					// IF FILLED, CREATE 8 NODES
					this.subdivide();
				}
				// INSERT ALL POINTS INTO THE 8 NODES
				this.containingPoints.push(point);
				for (let p of this.containingPoints) {
					this.upRightA.insert(p);
					this.upLeftA.insert(p);
					this.downLeftA.insert(p);
					this.downRightA.insert(p);
					this.upRightB.insert(p);
					this.upLeftB.insert(p);
					this.downLeftB.insert(p);
					this.downRightB.insert(p);
				}
				this.containingPoints = [];
			}
			this.points.push(point);
			// CALCULATE TOTAL MASS
			this.totalMass = 0;
			for (let b of this.points) {
				this.totalMass += b.mass;
			}
			// // CALCULATE CENTER OF MASS
			// this.centerOfMass = new Body(
			// 	...calculateCenterOfMass(...this.points),
			// 	0,
			// 	0,
			// 	0,
			// 	this.totalMass
			// );
		}
	}

	determineCenterOfMass() {
		this.centerOfMass = new Body(
			...calculateCenterOfMass(...this.points),
			0,
			0,
			0,
			this.totalMass
		);
		if (this.divided) {
			this.upRightA.determineCenterOfMass();
			this.upLeftA.determineCenterOfMass();
			this.downLeftA.determineCenterOfMass();
			this.downRightA.determineCenterOfMass();
			this.upRightB.determineCenterOfMass();
			this.upLeftB.determineCenterOfMass();
			this.downLeftB.determineCenterOfMass();
			this.downRightB.determineCenterOfMass();
		}
	}

	subdivide() {
		let URA = [
			this.x + this.w / 4,
			this.y + this.h / 4,
			this.z + this.l / 4,
		];
		this.upRightA = new QuadTree(
			...URA,
			this.w / 2,
			this.h / 2,
			this.l / 2,
			this.capacity
		);
		let ULA = [
			this.x - this.w / 4,
			this.y + this.h / 4,
			this.z + this.l / 4,
		];
		this.upLeftA = new QuadTree(
			...ULA,
			this.w / 2,
			this.h / 2,
			this.l / 2,
			this.capacity
		);
		let DLA = [
			this.x - this.w / 4,
			this.y - this.h / 4,
			this.z + this.l / 4,
		];
		this.downLeftA = new QuadTree(
			...DLA,
			this.w / 2,
			this.h / 2,
			this.l / 2,
			this.capacity
		);
		let DRA = [
			this.x + this.w / 4,
			this.y - this.h / 4,
			this.z + this.l / 4,
		];
		this.downRightA = new QuadTree(
			...DRA,
			this.w / 2,
			this.h / 2,
			this.l / 2,
			this.capacity
		);

		let URB = [
			this.x + this.w / 4,
			this.y + this.h / 4,
			this.z - this.l / 4,
		];
		this.upRightB = new QuadTree(
			...URB,
			this.w / 2,
			this.h / 2,
			this.l / 2,
			this.capacity
		);
		let ULB = [
			this.x - this.w / 4,
			this.y + this.h / 4,
			this.z - this.l / 4,
		];
		this.upLeftB = new QuadTree(
			...ULB,
			this.w / 2,
			this.h / 2,
			this.l / 2,
			this.capacity
		);
		let DLB = [
			this.x - this.w / 4,
			this.y - this.h / 4,
			this.z - this.l / 4,
		];
		this.downLeftB = new QuadTree(
			...DLB,
			this.w / 2,
			this.h / 2,
			this.l / 2,
			this.capacity
		);
		let DRB = [
			this.x + this.w / 4,
			this.y - this.h / 4,
			this.z - this.l / 4,
		];
		this.downRightB = new QuadTree(
			...DRB,
			this.w / 2,
			this.h / 2,
			this.l / 2,
			this.capacity
		);

		this.divided = true;
	}

	show(col) {
		// if (criteria(bodies_b[0], this) && !this.col) {
		// 	stroke(5, 120, 50);
		// 	col = true;
		// } else {
		noStroke();
		// }
		// strokeWeight(1);
		//stroke(0);
		noFill();
		drawBox(this.x, this.y, this.z, this.w, this.h, this.l);
		// drawSphere(
		// 	this.centerOfMass.pos.x,
		// 	this.centerOfMass.pos.y,
		// 	this.centerOfMass.pos.z,
		// 	3,
		// 	0
		// );

		if (this.divided) {
			this.upRightA.show(false);
			this.upLeftA.show(false);
			this.downLeftA.show(false);
			this.downRightA.show(false);
			this.upRightB.show(false);
			this.upLeftB.show(false);
			this.downLeftB.show(false);
			this.downRightB.show(false);
		}
	}
}

/// CANGE ALL POINTS TO BODIES
/// CHANGE ALL QUADTREES TO OCTTREES
