class News extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    let shadow = this.attachShadow({mode: "open"});

    // Create elements
    let wrapper = document.createElement("div");

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
h2, h3 {
  margin: 0px;
}

p {
  margin-top: 5px;
}

.button {
  background-color: #2196F3;
  border: none;
  color: white;
  padding: 5px 15px;
  border-radius: 3px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.button:hover {
  background-color: deepskyblue;
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
