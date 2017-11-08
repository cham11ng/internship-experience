var wrapper = document.getElementById("wrapper");
var container = document.createElement("div");
wrapper.appendChild(container);
var imagesUl = document.createElement("ul");
var control = document.createElement("div");
var next = document.createElement("div");
var previous = document.createElement("div");
container.appendChild(imagesUl);
container.appendChild(control);
control.appendChild(previous);
control.appendChild(next);

control.style.width = "17em";
control.style.margin = "0em auto";

next.innerHTML = "Next >>";
next.style.display = "inline-block";
next.style.width = "6.25em";
next.style.textAlign = "center";
next.style.cursor = "pointer";
next.style.padding = "1em";
next.style.marginLeft = "0.25em";
next.style.backgroundColor = "#00bcd4";
next.style.color = "#ffffff";

previous.innerHTML = "<< Prev";
previous.style.display = "inline-block";
previous.style.width = "6.25em";
previous.style.textAlign = "center";
previous.style.cursor = "pointer";
previous.style.padding = "1em";
previous.style.marginRight = "0.25em";
previous.style.backgroundColor = "#00bcd4";
previous.style.color = "#ffffff";

imagesUl.style.margin = "0em";
imagesUl.style.width = "100%";
imagesUl.style.padding = "0em";
imagesUl.style.listStyle = "none";
imagesUl.style.overflow = "hidden";

var images = [
	"a.png",
	"b.png",
	"c.png",
	"d.png",
	"e.png",
	"f.png"
];

for (var i = 0; i < images.length; i++) {
	var imageList = document.createElement("li");
	var image = document.createElement("img");
	imagesUl.appendChild(imageList);
	imageList.appendChild(image);
	imageList.style.display = "inline-block";
	image.src = images[i];
}

var position = 0;
next.onclick = function() {
	position = (++position) % images.length;
	console.log(position);
};

previous.onclick = function() {
	position = Math.abs((--position + images.length) % images.length);
	console.log(position);
};
