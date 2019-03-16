class StatusBar extends HTMLElement {
	constructor() {
		// Always call super first in constructor
		super();

		this._timeUpdateInterval = undefined;

		// Create a shadow root
		let shadow = this.attachShadow({mode: "open"});

		/*
		<div class="header container flex-row">
			<div id="weather"><img style="top: 0;" src="/image/weather/cloud.png"></div>
			<div id="time" class="container flow"><span></span><span class="seconds"></span><span></span></div>
		</div>
		 */

		// Create elements
		let weather = document.createElement("div");
		weather.className = "weather";
		this._weatherElement = weather;

		// // Jquery
		// let weather = $(`
		// 	<div class="weather">
		// 	</div>
		// `);

		let image = document.createElement("img");
		image.style.top = "0";
		image.src = "/image/weather/cloud.png";

		// // Jquery
		// let image = $(`
		// 	<img src="/image/weather/cloud.png" style="top: 0;">
		// 	</img>
		// `);

		let time = document.createElement("div");
		this._timeElement = time;
		time.className = "time container flow";
		let hoursMinutes = document.createElement("span");
		let seconds = document.createElement("span");
		seconds.className = "seconds";
		let period = document.createElement("span");

		// // Jquery
		// let time = $(`
		// 	<div class="time container flow">
		// 		<span></span>
		// 		<span class="seconds"></span>
		// 		<span></span>
		// 	</div>`
		// );
		// this._timeElement = time;

		let style = document.createElement("style");
		style.textContent = `
:host {
	display: block;
	height: var(--header-height);
	background: #2196F3;
	font-size: 1.25em;
}

.weather {
	position: fixed;
	width: var(--header-height);
	height: var(--header-height);
	margin-left: 1.4vw;
	overflow: hidden;
}

.weather img {
	position: absolute;
	display: block;
	height: var(--header-height);
	transition: top 1s;
}

.time {
	color: #FFF;
	text-align: center;
/*	font-family: "Roboto Mono", Helvetica, "Times New Roman", monospace;*/
	font: 500 1.25em "Roboto Mono";
	line-height: var(--header-height);
	overflow: hidden;
}

.time .seconds {
	color: rgba(255, 255, 255, 0.75);
	/* Calculate header font-size */
	font-size: 0.645161290em;
}
`;

		// Attach the created elements to the shadow dom
		shadow.appendChild(style);
		shadow.appendChild(weather);
		weather.appendChild(image);
		shadow.appendChild(time);
		time.appendChild(hoursMinutes);
		time.appendChild(seconds);
		time.appendChild(period);
	}

	connectedCallback() {
		// Sync time every hour to mitigate time drift propagated with setInterval
		this._timeUpdateInterval = setInterval(this.syncTime, 1000 * 60 * 60);

		this.updateTime();
		this.syncTime();

		// Demo changing weather when clicked
		let weatherIndex = 0;
		let weatherStates = ["cloud", "cloud-sun", "sun", "moon", "cloud-moon", "rain"];
		this._weatherElement.addEventListener("click", () => {
			weatherIndex++;

			if (weatherIndex == weatherStates.length) {
				weatherIndex = 0;
			}

			this.setWeather(weatherStates[weatherIndex]);
		});

		this.setWeather(weatherStates[weatherIndex]);
	}

	updateTime() {
		let date = new Date();
		let hours = date.getHours();
		let period = hours <= 12 ? "AM" : "PM";
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();

		// Adjust 24 hour time to 12 hour time
		if (hours > 12) {
			hours = hours - 12;
		} else if (hours == 0) {
			hours = 12;
		}

		// Add leading zeroes
		if (hours < 10) {
			hours = `0${hours}`;
		}
		if (minutes < 10) {
			minutes = `0${minutes}`;
		}
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}

		this._timeElement.children[0].innerText = `${hours}:${minutes}`;
		this._timeElement.children[1].innerText = `:${seconds}`;
		this._timeElement.children[2].innerText = ` ${period}`;
	}

	syncTime() {
		let now = new Date();
		let target = new Date(Date.now() + 1000);
		let timeUntilNextSecond = new Date(target.getFullYear(), target.getMonth(), target.getDate(), target.getHours(), target.getMinutes(), target.getSeconds(), 0) - now;

		setTimeout(() => {
			let newUpdateInterval = setInterval(() => {
				this.updateTime();
			}, 1000);

			this.updateTime();

			if (this._timeUpdateInterval) {
				clearInterval(this._timeUpdateInterval);
				this._timeUpdateInterval = newUpdateInterval;
			}
		}, timeUntilNextSecond);
	}

	setWeather(weatherState) {
		let newWeatherIcon = document.createElement("img");
		newWeatherIcon.src = `/image/weather/${weatherState}.png`;
		newWeatherIcon.style.top = "calc(-1 * var(--header-height))";
		this._weatherElement.appendChild(newWeatherIcon);
		let currentWeatherIcon = this._weatherElement.children[0];

		setTimeout(() => {
			currentWeatherIcon.addEventListener("transitionend", this.onWeatherExited);

			newWeatherIcon.style.top = 0;
			currentWeatherIcon.style.top = "var(--header-height)";
		}, 20);
	}

	onWeatherExited(event) {
		let element = event.target;

		element.parentElement.removeChild(element);
		element.removeEventListener("transitionend", onWeatherExited);
	}
}

customElements.define("status-bar", StatusBar);
export default StatusBar;
