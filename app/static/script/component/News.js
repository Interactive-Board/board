import Button from "./Button.js";

class News extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();

		// Create a shadow root
		let shadow = this.attachShadow({mode: "open"});

		// Create elements
		let title = document.createElement("h2");
		title.className = "item";
		title.innerText = "ACI - 1st Meeting";
		let date = document.createElement("h3");
		date.className = "item";
		date.innerText = "09/03/18";
		let description = document.createElement("p");
		description.className = "item";
		description.innerText = "Lorem ipsum";
		let buttonContainer = document.createElement("div");
		buttonContainer.style.textAlign = "right";
//		let button = document.createElement("button");
//		button.className = "button";
//		button.innerText = "READ MORE";
		let qrButton = document.createElement("button-element");
		qrButton.setAttribute("text", "qr code");
		let readMoreButton = document.createElement("button-element");
		readMoreButton.setAttribute("text", "read more");

		this.titleElement = title;
		this.dateElement = date;
		this.descriptionElement = description;

		let style = document.createElement("style");
		style.textContent = `
:host {
	display: block;
	padding: 15px 25px;
}

:host(:not(:last-child)) {
	border-bottom: 1px solid #C3C3C3;
}

h2, h3 {
	margin: 0px;
}

p {
	margin-top: 5px;
}

hr {
	border: none;
	height: 1px;
	background: #C3C3C3;
}
`;

		// Attach the created elements to the shadow dom
		shadow.appendChild(style);
		shadow.appendChild(title);
		shadow.appendChild(date);
		shadow.appendChild(description);
		shadow.appendChild(buttonContainer);
		buttonContainer.appendChild(qrButton);
		buttonContainer.appendChild(readMoreButton);
		
		let observer = new MutationObserver((records, observer) => this.observed(records, observer));
		let observationConfig = {attributeFilter: ["title", "date", "description"], attributes: true};
		observer.observe(this, observationConfig);
		
		this.update();
	}

	connectedCallback() {
		this.update();
	}
	
	update() {
		let title = this.getAttribute("title");
		let date = this.getAttribute("date");
		let description = this.getAttribute("description");

		this.titleElement.innerText = title;
		this.dateElement.innerText = date
		this.descriptionElement.innerText = description;
	}
	
	observed(records, observer) {
		for (let i = 0; i < records.length; i++) {
			let record = records[i];

//			if (record.type == "attributes") {
			this.update();
//			}
		}
	}
}

customElements.define("news-element", News);

export default News;
