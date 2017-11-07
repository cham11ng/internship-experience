var wrapper = document.getElementById("wrapper");
var plotArea = document.createElement("div");
var pointLists = document.createElement("ul");

plotArea.style.position = "relative";
plotArea.style.height = "200px";
plotArea.style.width = "500px";
plotArea.style.backgroundColor = "grey";
plotArea.style.margin = "0em auto";
pointLists.style.textAlign = "center";
pointLists.style.listStyle = "none";

wrapper.appendChild(plotArea);
wrapper.appendChild(pointLists);

function newPoint() {
	var point = document.createElement("div");
	point.style.height = "8px";
	point.style.width = "8px";
	point.style.backgroundColor = "silver";
	point.style.position = "absolute";
	point.style.cursor = "pointer";
	point.style.top = Math.random() * 200+"px";
	point.style.left = Math.random() * 500 +"px";

	point.onclick = function() {
		this.style.display = "none";
		var list = document.createElement("li");
		list.style.padding = "5px";
		list.innerHTML = "Top: " + this.style.top + " Left: " + this.style.left;
		pointLists.appendChild(list);
	};

	return point;
}

for (var i = 0; i < 15; i++) {
	plotArea.appendChild(newPoint());
}
