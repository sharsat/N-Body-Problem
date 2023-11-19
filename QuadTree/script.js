let bodies = [];
let sun;

const k = 1;
function setup() {
	createCanvas(600, 600);
	for (let i = 0; i < 300; i++) {
		let pos = p5.Vector.random2D();
		let vel = pos.copy();
		vel.setMag(random(10, 15));
		pos.setMag(random(100, 150));
		vel.rotate(PI / 2);
		let m = random(10, 15);
		bodies[i] = new Body(pos.x, pos.y, vel.x, vel.y, m);
	}
	sun = new Body(0, 0, 0, 0, 500);
	// bodies[0] = new Body(300, 200, 0, 5, 10);
	// bodies[1] = new Body(100, 200, 0, -5, 10);
	// bodies[2] = new Body(200, 300, -5, 0, 10);
	// bodies[3] = new Body(200, 100, 5, 0, 10);
	background(0);
}

function draw() {
	background(250);
	translate(width / 2, height / 2);
	for (let body of bodies) {
		sun.attract(body);
		for (let other of bodies) {
			if (body !== other) {
				body.attract(other);
				// stroke(255);
				// line(body.pos.x, body.pos.y, other.pos.x, other.pos.y);
			}
		}
	}

	for (let body of bodies) {
		body.update();
		body.show();
	}
	//sun.show();
}
