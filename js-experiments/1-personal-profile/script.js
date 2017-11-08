var body = document.getElementsByTagName("body");
var wrapper = document.getElementById("wrapper");

body[0].style.backgroundColor = "#efefef";
body[0].style.margin = "0em";
body[0].style.backgroundColor = "0em";

wrapper.style.background = "url('technology.jpg') no-repeat center center";
wrapper.style.width = "100%";
wrapper.style.height = "21.875em";
wrapper.style.position = "relative";

var contentWrapper = document.createElement("div");
wrapper.appendChild(contentWrapper);
var container = document.createElement("div");
contentWrapper.appendChild(container);

contentWrapper.style.width = "100%";
contentWrapper.style.position = "absolute";
contentWrapper.style.top = "30%";

container.style.maxWidth = "62.5em";
container.style.margin = "1em auto";
container.style.borderRadius = "0.1875em";
container.style.boxShadow = "-8px -3px 29px 0px rgba(55, 50, 50, 0.84)";
container.style.backgroundColor = "white";

var mainContent = document.createElement("div");
var footer = document.createElement("div");
container.appendChild(mainContent);
container.appendChild(footer);
mainContent.style.padding = "1.875em";
footer.style.padding = "1.875em";
footer.style.backgroundColor = "#22a8c1";
footer.style.textAlign = "center";
footer.style.color = "#eeeeee";
footer.style.fontFamily = "Arial";
footer.innerHTML = "copyright &copy; cham11ng | 2017";

var picture = document.createElement("img");
var heading = document.createElement("h1");
var subHeading = document.createElement("h2");
var horizontalLine = document.createElement("hr");
var detail = document.createElement("h3");
var detailList = document.createElement("ul");
mainContent.appendChild(picture);
mainContent.appendChild(heading);
mainContent.appendChild(subHeading);
mainContent.appendChild(horizontalLine);
mainContent.appendChild(detail);
mainContent.appendChild(detailList);

picture.setAttribute("src", "profile.jpg");
picture.setAttribute("alt", "My profile picture");
picture.style.display = "block";
picture.style.borderRadius = "0.3125em";
picture.style.margin = "0em auto";

heading.innerHTML = "I'm Sagar Chamling";
heading.style.textAlign = "center";
heading.style.color = "#037790";
heading.style.fontFamily = "Verdana";
heading.style.margin = ".25em";
heading.style.letterSpacing = "-3px";

subHeading.innerHTML = "Software Engineer Intern";
subHeading.style.textAlign = "center";
subHeading.style.color = "#037790";
subHeading.style.fontFamily = "Verdana";
subHeading.style.margin = "0.25em";
subHeading.style.letterSpacing = "-2px";

detail.innerHTML = "Personal Detail";
detail.style.textAlign = "center";
detail.style.color = "#1ba4c2";
detail.style.fontFamily = "Verdana";
detail.style.textDecoration = "underline"
detail.style.margin = ".25em";
detail.style.letterSpacing = "-1px";

var personalDetail = {
	"Currently Working": "Leapfrog Technology Incorporation (Intern)",
	"Education": "Bachelor in Engineering (Computer Engineering)",
	"Interests": [
		"Singing",
		"Football",
		"Basketball"
	],
	"Completed Projects": [
		"Tutangle: Static and Responsive webpage design, photoshop, UI/UX, good design/bad design",
		"MODUSversus - Slicing and Responsive webpage design"
	],
	"Email": "sgr.raee@gmail.com",
	"Address": "Bhaktapur"
};

for (var detail in personalDetail) {
	if (personalDetail.hasOwnProperty(detail)) {
		var list = document.createElement("li");
		var key = document.createElement("div");
		detailList.appendChild(list);
		list.appendChild(key);

		list.style.padding = "0.375em";

		detailList.style.listStyle = "none";
		detailList.style.padding = "0em";
		detailList.style.margin = "0em";

		key.style.display = "inline-block";
		key.style.textAlign = "right";
		key.style.fontFamily = "Verdana";
		key.style.paddingRight = "1em";
		key.style.fontWeight = "bold";
		key.style.width = "37.234042553%";
		key.innerHTML = detail;

		if (Array.isArray(personalDetail[detail])) {
			var ulValueLists = document.createElement("ul");
			ulValueLists.style.display = "inline-block";
			ulValueLists.style.padding = "0em 1em";
			ulValueLists.style.width = "57.446808511%";
			for (var i = 0; i < personalDetail[detail].length; i++) {
				var liValue = document.createElement("li");
				list.appendChild(ulValueLists);
				ulValueLists.appendChild(liValue);
				liValue.style.fontFamily = "Verdana";
				liValue.style.padding = "0.3125em 0em";
				liValue.innerHTML = personalDetail[detail][i];
			}
		} else {
			var value = document.createElement("span");
			list.appendChild(value);
			value.style.display = "inline-block";
			value.style.fontFamily = "Verdana";
			value.style.width = "57.446808511%";
			value.innerHTML = personalDetail[detail];
		}
	}
}
