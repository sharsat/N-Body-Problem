function calculateCenterOfMass(/* body Objects */) {
	let coordinates = arguments;
	let totalMass = 0,
		numeratorX = 0,
		numeratorY = 0,
		numeratorZ = 0;
	for (coord of coordinates) {
		numeratorX += coord.mass * coord.pos.x;
		numeratorY += coord.mass * coord.pos.y;
		numeratorZ += coord.mass * coord.pos.z;
		totalMass += coord.mass;
	}
	return [
		numeratorX / totalMass,
		numeratorY / totalMass,
		numeratorZ / totalMass,
	];
}



function find(p, node) {
	stroke(0);
	if (node.centerOfMass.pos.x == 0) {
		return;
	}
	if (!criteria(p, node)) {
		if (node.divided) {
			find(p, node.upRightA);
			find(p, node.upLeftA);
			find(p, node.downRightA);
			find(p, node.downLeftA);
			find(p, node.upRightB);
			find(p, node.upLeftB);
			find(p, node.downRightB);
			find(p, node.downLeftB);
		} else {
			// line(
			// 	p.pos.x,
			// 	p.pos.y,
			// 	p.pos.z,
			// 	node.centerOfMass.pos.x,
			// 	node.centerOfMass.pos.y,
			// 	node.centerOfMass.pos.z
			// );
			attractQT.push(node);
		}
	} else {
		// line(
		// 	p.pos.x,
		// 	p.pos.y,
		// 	p.pos.z,
		// 	node.centerOfMass.pos.x,
		// 	node.centerOfMass.pos.y,
		// 	node.centerOfMass.pos.z
		// );
		attractQT.push(node);
	}
}

function drawBox(
	x,
	y,
	z,
	width,
	height,
	length,
	rotationX,
	rotationY,
	rotationZ
) {
	push();
	translate(x, y, z);
	// rotateX(rotationX);
	// rotateY(rotationY);
	// rotateZ(rotationZ);
	box(width, height, length);
	pop();
}

function drawSphere(x, y, z, radius, col) {
	push();
	stroke(col);
	translate(x, y, z);
	sphere(radius);
	pop();
}
function criteria(p, qt) {
	let d = dist(
		p.pos.x,
		p.pos.y,
		p.pos.z,
		qt.centerOfMass.pos.x,
		qt.centerOfMass.pos.y,
		qt.centerOfMass.pos.z
	);
	let s = qt.w;
	return s / d < threshold && s != 400; // NUR VORÜBERGEHEND; NOCH VERÄNDERN
}

