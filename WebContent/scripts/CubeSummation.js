 var matrix;
 var n;
 /**
  * This algorithm initializes the matrix with zeros.
  * */
 function initialize() {
	matrix = [];
	var r = document.getElementById("textBoxN");
	n = parseInt(document.getElementById("textBoxN").value);
	clearErrorLabel();

	while (document.getElementById("tableBody").hasChildNodes()) {
		document.getElementById("tableBody").removeChild(
				document.getElementById("tableBody").firstChild);
	}

	for (var x = 0; x < 101; x++) {
		var array = [];
		for (var y = 0; y < 101; y++) {
			var internal = [];
			for (var z = 0; z < 101; z++) {
				internal.push(0);
			}
			array.push(internal);
		}
		matrix.push(array);
	}
}
function clearErrorLabel() {
	while (document.getElementById("errorLabel").hasChildNodes()) {
		document.getElementById("errorLabel").removeChild(
				document.getElementById("errorLabel").firstChild);
	}
}
function updateClick() {
	clearErrorLabel();
	if (n == null || !/[0-9]+/g.test(n)) {
		var text = document
				.createTextNode("You must initialize the matrix with the value of N before you can update the matrix.");
		document.getElementById("errorLabel").appendChild(text);
		return;
	}
	var tableBody = document.getElementById("tableBody");
	var x = parseInt(document.getElementById("x").value);
	var y = parseInt(document.getElementById("y").value);
	var z = parseInt(document.getElementById("z").value);
	var w = parseInt(document.getElementById("w").value);
	if (x < 1 || y < 1 || z < 1 || x > n || y > n || z > n) {
		var text = document
				.createTextNode("x, y and z must be on the range [1, n].");
		document.getElementById("errorLabel").appendChild(text);
		return;
	}
	if (!/[0-9]+/g.test(x + "") || !/[0-9]+/g.test(y + "")
			|| !/[0-9]+/g.test(z + "") || !/[0-9]+/g.test(w + "")) {
		var text = document
				.createTextNode("All the values are required to perform an update.");
		document.getElementById("errorLabel").appendChild(text);
		return;
	}
	var x1 = x;
	var y1 = y;
	var z1 = z;
	var value1 = query(x, y, z) - query(x1 - 1, y, z) - query(x, y1 - 1, z)
			+ query(x1 - 1, y1 - 1, z);
	var value2 = query(x, y, z1 - 1) - query(x1 - 1, y, z1 - 1)
			- query(x, y1 - 1, z1 - 1) + query(x1 - 1, y1 - 1, z1 - 1);
	update(x, y, z, w - (value1 - value2), n);
	var tr = document.createElement('tr');
	var td = document.createElement("td");
	var text = document.createTextNode("matrix(" + x + ", " + y + ", " + z
			+ ") <= " + w);
	tr.appendChild(td);
	td.appendChild(text);
	tableBody.appendChild(tr);
}
function queryClick() {
	clearErrorLabel();
	if (n == null || !/[0-9]+/g.test(n)) {
		var text = document
				.createTextNode("You must initialize the matrix with the value of N before you can query to the matrix.");
		document.getElementById("errorLabel").appendChild(text);
		return;
	}
	var x1 = parseInt(document.getElementById("x1").value);
	var y1 = parseInt(document.getElementById("y1").value);
	var z1 = parseInt(document.getElementById("z1").value);
	var x2 = parseInt(document.getElementById("x2").value);
	var y2 = parseInt(document.getElementById("y2").value);
	var z2 = parseInt(document.getElementById("z2").value);
	if (!/[0-9]+/g.test(x1 + "") || !/[0-9]+/g.test(y1 + "")
			|| !/[0-9]+/g.test(z1 + "") || !/[0-9]+/g.test(x2 + "")
			|| !/[0-9]+/g.test(y2 + "") || !/[0-9]+/g.test(z2 + "")) {
		var text = document
				.createTextNode("All the values are required to perform a query.");
		document.getElementById("errorLabel").appendChild(text);
		return;
	}
	if (x1 > x2 || x2 > n || x1 < 1) {
		var text = document
				.createTextNode("It is mandatory that 1 <= x1 <= x2 <= n.");
		document.getElementById("errorLabel").appendChild(text);
		return;
	}
	if (y1 > y2 || y2 > n || y1 < 1) {
		var text = document
				.createTextNode("It is mandatory that 1 <= y1 <= y2 <= n.");
		document.getElementById("errorLabel").appendChild(text);
		return;
	}
	if (z1 > z2 || z2 > n || z1 < 1) {
		var text = document
				.createTextNode("It is mandatory that 1 <= z1 <= z2 <= n.");
		document.getElementById("errorLabel").appendChild(text);
		return;
	}
	var value1 = query(x2, y2, z2) - query(x1 - 1, y2, z2)
			- query(x2, y1 - 1, z2) + query(x1 - 1, y1 - 1, z2);

	var value2 = query(x2, y2, z1 - 1) - query(x1 - 1, y2, z1 - 1)
			- query(x2, y1 - 1, z1 - 1) + query(x1 - 1, y1 - 1, z1 - 1);
	var result = value1 - value2;

	var tr = document.createElement('tr');
	var td = document.createElement("td");
	var text = document.createTextNode("sum(" + x1 + ", " + y1 + ", " + z1
			+ ", " + x2 + ", " + y2 + ", " + z2 + ") = " + result);
	tr.appendChild(td);
	td.appendChild(text);
	tableBody.appendChild(tr);
}
function update(x, y, z, w, n) {
	for (var z1 = z; z1 <= n; z1 += z1 & (-z1)) {
		for (var y1 = y; y1 <= n; y1 += y1 & (-y1)) {
			for (var x1 = x; x1 <= n; x1 += x1 & (-x1)) {
				matrix[x1][y1][z1] += w;
			}
		}
	}
}
function query(x, y, z) {
	var sum = 0;
	for (var z1 = z; z1 > 0; z1 -= z1 & -z1) {
		for (var y1 = y; y1 > 0; y1 -= y1 & -y1) {
			for (var x1 = x; x1 > 0; x1 -= x1 & -x1) {
				sum += matrix[x1][y1][z1];
			}
		}
	}
	return sum;
}