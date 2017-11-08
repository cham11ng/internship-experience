var data = [
    {
        tagName: 'div',
        className: 'test-class',
        styles: {
            width: "100px",
            height: "100px",
            backgroundColor: 'red'
        },
        children: [
            {
                tagName: 'div',
                className: 'box',
                styles: {
                    width: "50px",
                    height: "50px",
                    backgroundColor: 'blue'
                },
            },
            {
                tagName: 'div',
                className: 'box',
                styles: {
                    width: "50px",
                    height: "50px",
                    backgroundColor: 'brown',
                    float: 'right'
                },
            }
        ]
    }
];

var wrapper = document.getElementById("wrapper");

for (var i = 0; i < data.length; i++) {
    jsonToHtml(data[i]);
}

function jsonToHtml(datum) {
    var parent = convertIndividualJSONToHTML(datum);
    for (var i = 0; i < datum.children.length; i++) {
        parent.appendChild(convertIndividualJSONToHTML(datum.children[i]));
    }
    
    wrapper.appendChild(parent);
}

function convertIndividualJSONToHTML(datum) {
    var element = document.createElement(datum.tagName);
    element.setAttribute('class', datum.className);
    for (style in datum.styles) {
        element.style[style] = datum.styles[style];
    }

    return element;
}
