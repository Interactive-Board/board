class NavigationButton extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();

		// Create a shadow root
		let shadow = this.attachShadow({mode: "open"});

		// Create elements
		let wrapper = document.createElement("div");
		
		this.text = "";
		this._wrapperElement = wrapper;

		let style = document.createElement("style");
		style.textContent = `
h1,
h2 {
	margin: 0;
	padding: 0.67em 0;
	text-align: center;
}
`;

		// Attach the created elements to the shadow dom
		shadow.appendChild(style);
		shadow.appendChild(wrapper);
		
		let observer = new MutationObserver((records, observer) => this.observed(records, observer));
		let observationConfig = {attributeFilter: ["text"], attributes: true};
		observer.observe(this, observationConfig);
		
		this.update();
	}

	connectedCallback() {
		this.update();
	}
	
	update() {
		let text = this.getAttribute("text");

		this._wrapperElement.innerText = text;
	}
	
	observed(records, observer) {
		for (let i = 0; i < records.length; i++) {
			let record = records[i];

			this.update();
		}
	}
}

customElements.define("navigation-button", NavigationButton);

export default NavigationButton;
