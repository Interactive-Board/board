class Button extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();

		// Create a shadow root
		let shadow = this.attachShadow({mode: "open"});

		// Create elements
		let wrapper = document.createElement("button");
		
		this.text = "";
		this._wrapperElement = wrapper;

		let style = document.createElement("style");
		style.textContent = `
button {
	/* min-width: 64px; */
	min-width: 4rem;
	/* height: 36px; */
	height: 2.25rem;
	/* margin: 0 5px; */
	margin: 0 0.3125rem;
	/* padding: 0 16px; */
	padding: 0 1rem;
	/* border: 1px solid #DADCE0; */
	border: 0.0625rem solid #DADCE0;
	/* border-radius: 4px; */
	border-radius: 0.25rem;
	outline: none;
	background: #FFF;
	font-family: "Roboto", Helvetica, "Times New Roman", sans-serif;
	font-display: swap;
	font-size: 0.875em;
	font-weight: bold;
	/* line-height: 36px; */
	line-height: 2.25rem;
	text-transform: uppercase;
	box-sizing: border-box;
	transition: border-color 50ms, background 50ms, box-shadow 250ms;
	cursor: pointer;
}

button:first-child {
	margin-left: 0;
}

button:last-child {
	margin-right: 0;
}

button:hover {
	/* box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.08), 0 1px 10px 0 rgba(0,0,0,.12); */
	box-shadow: 0 0.125rem 0.25rem -0.0625rem rgba(0,0,0,.2), 0 0.25rem 0.3125rem 0 rgba(0,0,0,.08), 0 0.0625rem 0.625rem 0 rgba(0,0,0,.12);
}

button:focus {
	border-color: #2196F3;
	opacity: 0.78;
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

customElements.define("button-element", Button);
