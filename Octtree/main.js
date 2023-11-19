// CONSTANTS
const N = 50;
const threshold = 0.001;
const k = 50;
const density = 0.005;
const dt = 0.01;
const speed = 60;
var W = 800;
var H = 800;
var L = 800;
var centerX = 0;
var centerY = 0;
var centerZ = 0;
var longestDistance = 0;

function setup() {
	createCanvas(400, 400, WEBGL);
	camera(650, -400, 500);
	createBodies();
}

function draw() {
	orbitControl();
	background(250);
	insertBodiesInOcttree(centerX, centerY, centerZ, W, H, L);
	for (let i = 0; i < speed; i++) {
		for (let body of bodies_b) {
			if (this != body) {
				body.calculateAcc(bodies_b);
			}
		}

		for (let body of bodies_b) {
			body.update();
		}

		for (let q of bodies_b[0].attractor()) {
			stroke(0);
			drawBox(q.x, q.y, q.z, q.w, q.h, q.l);
		}
	}

	// SHOW BODIES
	for (let i in bodies_b) {
		bodies_b[i].show();
		//bodies_b[i].col = i == 0 ? [0, 255, 0] : [255, 0, 0];
	}

	centerX = barnesHut.centerOfMass.pos.x;
	centerY = barnesHut.centerOfMass.pos.y;
	centerZ = barnesHut.centerOfMass.pos.z;

	// longestDistance = createVector(0, 0, 0);
	// for (let i of bodies_b) {
	// 	//console.log(longestDistance);
	// 	longestDistance =
	// 		longestDistance.mag() <
	// 		barnesHut.centerOfMass.pos.copy().sub(i.pos).mag()
	// 			? barnesHut.centerOfMass.pos.copy().sub(i.pos)
	// 			: longestDistance;
	// }
	// //console.log(W, H, L);
	// W = abs(longestDistance.x);
	// H = abs(longestDistance.y);
	// L = abs(longestDistance.z);

	barnesHut.show(false);
}
