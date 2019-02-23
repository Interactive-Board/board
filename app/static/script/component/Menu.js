import _ from "/script/lib.js";
import Container from "./Container.js";

class Menu extends Container {
	constructor() {
		// Always call super first in constructor
		super();
	}

	async connectedCallback() {
		let style = document.createElement("style");
		style.textContent = `
:host {
	height: var(--menu-height);
	justify-content: center;
	align-items: stretch;
	border-top: 0.0625rem solid var(--divider-color);
	font-size: 0.8em;
}

.item {
	--menu-item-color: var(--menu-item-default-color);

	display: flex;
	flex-direction: column;
	width: var(--menu-item-width);
	padding: 0.3125rem 0.4rem 0 0.4rem;
	border-bottom: 3px solid rgba(0, 0, 0, 0);
	color: var(--menu-item-color);
	cursor: pointer;
}

.item.active {
	--menu-item-color: var(--menu-item-active-color);
	border-bottom-color: var(--menu-item-color);
}

.icon {
	flex: 1;
	width: calc(var(--menu-height) - var(--menu-label-height) - 0.3125rem);
	margin: 0 auto;
	overflow: hidden;
}

svg {
	max-height: 100%;
}

.cls-1 {
	fill: var(--menu-item-color);
}

.label {
	text-align: center;
	line-height: var(--menu-label-height);
}
`;

		this.setAttribute("flex", "row");
		this.appendChild(style);

		let entries = [
			{display: "Home", icon: "default", path: {main: "/mockup/news", alt: []}},
			{display: "Directory", icon: "directory", path: {main: "/mockup/directory", alt: []}},
			{display: "Recognitions", icon: "default", path: {main: "/mockup/recognitions", alt: []}},
			{display: "Alumni Map", icon: "alumni-map", path: {main: "/mockup/alumni", alt: []}},
			{display: "Publications", icon: "publications", path: {main: "/mockup/publications", alt: ["/mockup/publication_details"]}}
		];

		let pathData = (/.*?:\/\/.*?(\/.*)/g).exec(location.href);
		let currentPath = pathData[1];

		for (let i = 0; i < entries.length; i++) {
			let entry = entries[i];
			let item = document.createElement("div");
			item.className = "item";
			if (currentPath == entry.path.main || entry.path.alt.indexOf(currentPath) > -1) {
				item.className += " active";
			}
			item.setAttribute("flex", "column");
			item.dataset.entry = i;
			let iconContainer = document.createElement("div");
			iconContainer.className = "icon";
			_.get(`/image/menu/${entry.icon}.svg`).then(({responseText: data}) => {
				console.log(data);
				iconContainer.innerHTML = data;
				this.update();
			}).catch((error) => {
				console.log(error)
			});
			let label = document.createElement("div");
			label.className = "label";
			label.innerText = entry.display;

			item.appendChild(iconContainer);
			item.appendChild(label);
			this.appendChild(item);
		}

		this.addEventListener("click", (event) => {
			let menuIndex = event.path.indexOf(this);
			// -1 is the document fragment, -2 is the item itself
			let entryIndex = event.path[menuIndex - 2].dataset.entry;
			location.href = entries[entryIndex].path.main;
		});
	}
}

customElements.define("menu-element", Menu);

export default Menu;
