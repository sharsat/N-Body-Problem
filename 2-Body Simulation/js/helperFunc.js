function drawSphere(f, x, y, z, radius, col) {
	f.push();
	if (typeof col == 'object') {
		f.stroke(col);
	}
	f.translate(x, y, z);
	f.sphere(radius);
	f.pop();
}

function drawCone(f, x, y, z, radius, height, rotationX, rotationY, rotationZ) {
	f.push();
	f.translate(x, y, z);
	f.rotateX(rotationX);
	f.rotateY(rotationY);
	f.rotateZ(rotationZ);
	f.cone(radius, height);
	f.pop();
}

function drawPlane(f, x, y, z, w, h) {
	f.push();
	f.translate(x, y, z);
	f.rotateZ(0.3);
	f.rotateX((f.PI * 3) / 2);
	f.rotateY(f.PI / 4);
	f.noStroke();
	f.plane(w, h);
	f.pop();
}

function drawVector(f, x, y, z, xd, yd, zd) {
	f.line(x, y, z, xd, yd, zd);
}

let latinModernMath;

function setup() {
	latinModernMath = loadFont('CMU Font/CMU Serif k.ttf');
}

function back(f) {
	f.background(250);
	f.orbitControl(5, 5, 5);
	f.rotateX(f.PI / 2);
	f.rotateZ(0.5);

	// background sphere
	f.fill(200, 10);
	drawSphere(f, 0, 0, 0, 2000);

	// cordinatesystem
	drawSphere(f, 0, 0, 0, 2);
	f.line(0, 0, 0, 200, 0, 0); //y
	f.line(0, 0, 0, 0, 200, 0); //x
	f.line(0, 0, 0, 0, 0, 200); //z
	drawCone(f, 200, 0, 0, 2, 10, 0, 0, (3 * f.PI) / 2);
	drawCone(f, 0, 200, 0, 2, 10, 0, 0, 0);
	drawCone(f, 0, 0, 200, 2, 10, f.PI / 2, 0, 0);

	// coordinate-labeling
	f.push();
	let coordLabelingX = f.createGraphics(20, 20);
	coordLabelingX.textFont(latinModernMath);
	coordLabelingX.textAlign(f.CENTER);
	coordLabelingX.text('x', 13, 13);
	let coordLabelingY = f.createGraphics(20, 20);
	coordLabelingY.textFont(latinModernMath);
	coordLabelingY.textAlign(f.CENTER);
	coordLabelingY.text('y', 6, 13);
	let coordLabelingZ = f.createGraphics(20, 20);
	coordLabelingZ.textFont(latinModernMath);
	coordLabelingZ.textAlign(f.CENTER);
	coordLabelingZ.text('z', 10, 13);

	f.texture(coordLabelingX);
	drawPlane(f, 0, 220, 0, 20, 20, 0, 0, 0);
	f.texture(coordLabelingY);
	drawPlane(f, 220, 0, 0, 20, 20, 0, 0, 0);
	f.texture(coordLabelingZ);
	drawPlane(f, 0, 0, 210, 20, 20, 0, 0, 0);

	f.pop();
}
