// BODIES & OCTTREES
var bodies_b = [];
var barnesHut;

function createBodies() {
	// CREATE BODIES
	for (let i = 0; i < N; i++) {
		let b = new Body(
			random(-200, 200),
			random(-200, 200),
			random(-200, 200),
			random(-2, 2),
			random(-2, 2),
			random(-2, 2),
			10
		);
		bodies_b.push(b);
	}
}

function insertBodiesInOcttree(x, y, z, w, b, l) {
	// CREATE OCTTREE
	barnesHut = new QuadTree(x, y, z, w, b, l, 1);

	// INSERT BODIES IN OCTTREE
	for (let body of bodies_b) {
		barnesHut.insert(body);
	}

	// DETERMINE THEIR CENTER OF MASS
	barnesHut.determineCenterOfMass();
}
