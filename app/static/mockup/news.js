class News extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    let shadow = this.attachShadow({mode: "open"});

    // Create elements
    let wrapper = document.createElement("div");
    wrapper.className = "wrapper";
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
    let button = document.createElement("button");
    button.className = "button";
    button.innerText = "READ MORE";
    let hr = document.createElement("hr");

    this.titleElement = title;
    this.dateElement = date;
    this.descriptionElement = description;

    wrapper.appendChild(title);
    wrapper.appendChild(date);
    wrapper.appendChild(description);
    wrapper.appendChild(buttonContainer);
    buttonContainer.appendChild(button);
    wrapper.appendChild(hr);

    let style = document.createElement("style");
    style.textContent = `
.wrapper {
	padding: 5px 25px;
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

button {
  min-width: 64px;
  height: 36px;
  margin: 0 5px;
  padding: 0 16px;
  border: 1px solid #DADCE0;
  border-radius: 4px;
  outline: none;
  background: #FFF;
  font-family: "Roboto", Helvetica, "Times New Roman", sans-serif;
  font-display: swap;
  font-size: 14px;
  font-weight: bold;
  line-height: 36px;
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
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.08), 0 1px 10px 0 rgba(0,0,0,.12);
}

button:focus {
  border-color: #2196F3;
  opacity: 0.78;
}
`;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }

  connectedCallback() {
    let title = this.getAttribute("title");
    let date = this.getAttribute("date");
    let description = this.getAttribute("description");

    this.titleElement.innerText = title;
    this.dateElement.innerText = date
    this.descriptionElement.innerText = description;
  }
}

// The "element-name" can be anything, but it must contain AT LEAST one dash between letters
customElements.define("news-element", News);
