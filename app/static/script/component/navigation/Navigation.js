class Navigation extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();

		// Create a shadow root
		let shadow = this.attachShadow({mode: "open"});

		// Create elements
		let wrapper = document.createElement("div");
		wrapper.className = "menu";

		this.text = "";
		this._wrapperElement = wrapper;

		let style = document.createElement("style");
		style.textContent = `
:host {
	display: block;
}

.menu {
	height: var(--menu-height);
	overflow-x: auto;
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

customElements.define("navigation-element", Navigation);
