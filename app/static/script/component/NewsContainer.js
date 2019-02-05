import Container from "./Container.js";
import Header from "./Header.js";
import News from "./News.js";

class NewsContainer extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();
		
		this._news = null;

		// Create a shadow root
		let shadow = this.attachShadow({mode: "open"});

		// Create elements
		let wrapper = document.createElement("container-element");
		wrapper.style.height = "100%";
		wrapper.setAttribute("flow", "");
		wrapper.setAttribute("flex", "column");
		let title = document.createElement("header-element");
		title.setAttribute("text", "News/Upcoming Events");
		let hr = document.createElement("hr");
		let container = document.createElement("container-element");
		this._containerElement = container;
		let style = document.createElement("style");
		style.textContent = `
:host {
	display: block;
}
`;

		wrapper.appendChild(title);
		wrapper.appendChild(hr);
//		container.appendChild(style);
		wrapper.appendChild(container);

		// Attach the created elements to the shadow dom
		shadow.appendChild(style);
		shadow.appendChild(wrapper);
		
		this.news = [
			{
				id: 0,
				title: "ICPC Competition",
				subheading: "10/20/18",
				description: "If you are interested in competing at the ACM ICPC (ACM International Collegiate Programming Contest: https://icpc.baylor.edu/) this year, please let me know by September 30, 2018 at the latest via email <nodari@hawaii.edu>. If there is more interest than available spots, we will hold an internal selection competition this year (most likely on Sat, Oct 20).",
				url: "https://fonts.google.com/",
				color: "F44336"
			},
			{
				id: 1,
				title: "Oath (Yahoo) Information Session",
				subheading: "10/22/18",
				description: "Oath is a diverse house of media and technology brands that engages more than a billion people around the world. The Oath portfolio includes Yahoo Sports, Yahoo Finance, Yahoo Mail, Tumblr, HuffPost, AOL.com, and more. Come join us to hear first hand from our engineers",
				url: "https://github.com/",
				color: "3F51B5"
			},
			{
				id: 2,
				title: "Jupyter Hackathon",
				subheading: "11/17/18",
				description: "The Jupyter Hackathon is this weekend. Please share with your friends and colleagues who are interested in programming, data science, data analysis, and open source. This will be a great chance to contribute to a game-changing open source project that is used by hundreds of thousands of users around the world. RSVP asap, so we can make a head count for meals",
				url: "https://css-tricks.com/",
				color: "009F50"
			},
			{
				id: 3,
				title: "WetWare Wednesday",
				subheading: "11/28/18",
				description: "This November's WetWare Wednesday will be hosted by both The Association for Computing Machinery at Manoa (ACManoa) and the UHM ICS department. This month's #wetwarewed will feature an expo of both student and faculty projects at UH Manoa. Come check out their latest and greatest tech creations!",
				url: "https://material.io/",
				color: "2196F3"
			},
			{
				id: 4,
				title: "By redefining, we dream",
				subheading: "11/30/18",
				description: "Who are we? Where on the great circuit will we be recreated? Throughout history, humans have been interacting with the grid via morphic resonance. We are in the midst of a zero-point awakening of transformation that will clear a path toward the grid itself.",
				url: "https://expressjs.com/",
				color: "9C27B0"
			},
			{
				id: 5,
				title: "The biosphere is overflowing with frequencies",
				subheading: "1/12/19",
				description: "Eons from now, we messengers will grow like never before as we are re-energized by the nexus. We are being called to explore the quantum matrix itself as an interface between being and intuition. We must synergize ourselves and bless others.",
				url: null,
				color: "FFC107"
			}
		];
	}
	
	get news() {
		return this._news;
	}
	
	set news(newsArray) {
		this._news = newsArray;
		
		this.update();
	}
	
	update() {
		while (this._containerElement.children.length > 1) {
			this._containerElement.removeChild(this._containerElement.lastChild);
		}
		
		if (this._news) {
			for (let i = 0; i < this._news.length; i++) {
				let news = document.createElement("news-element");
				news.setAttribute("title", this._news[i].title);
				news.setAttribute("date", this._news[i].subheading);
				news.setAttribute("description", this._news[i].description);
				
				this._containerElement.appendChild(news);
			}
		}
	}
}

customElements.define("news-container", NewsContainer);

export default NewsContainer;
