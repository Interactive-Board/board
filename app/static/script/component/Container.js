class Container extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();
		
		this._flow = false;
		this._flex = null;

		// Create a shadow root
		let shadow = this.attachShadow({mode: "open"});
		this._shadowElement = shadow;

		// Create elements
//		let wrapper = document.createElement("div");
//		this._wrapperElement = wrapper;

		let style = document.createElement("style");
		style.textContent = `
:host {
	display: block;
	overflow: auto;
}

:host([flow]) {
	flex: 1;
}

:host([flex=row]) {
	display: flex;
	flex-direction: row;
}

:host([flex=column]) {
	display: flex;
	flex-direction: column;
}
`;

		// Attach the created elements to the shadow dom
		shadow.appendChild(style);
//		shadow.appendChild(wrapper);
		
		let observer = new MutationObserver((records, observer) => this.observed(records, observer));
		let observationConfig = {attributeFilter: ["flow", "flex"], attributes: true, childList: true};
		observer.observe(this, observationConfig);
		
		this.update();
	}

	connectedCallback() {
		this.update();
	}
	
	update() {
		let flow = this.getAttribute("flow") !== null;
		let flex = this.getAttribute("flex");
		
		if (flex !== "row" && flex !== "column") {
			flex = null;
		}
		
		this._flow = flow;
		this._flex = flex;
				
		while (this._shadowElement.children.length > 1) {
			this._shadowElement.removeChild(this._shadowElement.lastChild);
		}
		
		for (let i = 0; i < this.children.length; i++) {
			this._shadowElement.appendChild(this.children[i].cloneNode(true));
		}
	}
	
	observed(records, observer) {
		for (let i = 0; i < records.length; i++) {
			let record = records[i];

			this.update();
		}
	}
}

customElements.define("container-element", Container);

export default Container;
