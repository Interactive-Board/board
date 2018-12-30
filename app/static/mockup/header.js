let timeUpdateInterval;

function updateTime() {
	let date = new Date();
	let timeElement = document.getElementById("time");
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

	timeElement.children[0].innerText = `${hours}:${minutes}`;
	timeElement.children[1].innerText = `:${seconds}`;
	timeElement.children[2].innerText = ` ${period}`;
}

function syncTime() {
	let now = new Date();
	let target = new Date(Date.now() + 1000);
	let timeUntilNextSecond = new Date(target.getFullYear(), target.getMonth(), target.getDate(), target.getHours(), target.getMinutes(), target.getSeconds(), 0) - now;

	setTimeout(() => {
		let newUpdateInterval = setInterval(() => {
			updateTime();
		}, 1000);

		updateTime();

		if (timeUpdateInterval) {
			clearInterval(timeUpdateInterval);
			timeUpdateInterval = newUpdateInterval;
		}
	}, timeUntilNextSecond);
}

function setWeather(weatherState) {
	let newWeatherIcon = document.createElement("img");
	newWeatherIcon.src = `/image/weather/${weatherState}.png`;
	newWeatherIcon.style.top = "calc(-1 * var(--header-height))";
	document.getElementById("weather").appendChild(newWeatherIcon);
	let currentWeatherIcon = document.getElementById("weather").children[0];

	setTimeout(() => {
		currentWeatherIcon.addEventListener("transitionend", onWeatherExited);

		newWeatherIcon.style.top = 0;
		currentWeatherIcon.style.top = "var(--header-height)";
	}, 20);
}

function onWeatherExited(event) {
	let element = event.target;

	element.parentElement.removeChild(element);
	element.removeEventListener("transitionend", onWeatherExited);
}

document.addEventListener("DOMContentLoaded", () => {
	// Sync time every hour to mitigate time drift propagated with setInterval
	timeUpdateInterval = setInterval(syncTime, 1000 * 60 * 60);

	updateTime();
	syncTime();

	// Demo changing weather when clicked
	let weather = 0;
	let weatherStates = ["cloud", "cloud-sun", "sun", "moon", "cloud-moon", "rain"];
	document.getElementById("weather").addEventListener("click", () => {
		weather++;

		if (weather == weatherStates.length) {
			weather = 0;
		}

		setWeather(weatherStates[weather]);
	});

	setWeather(weatherStates[weather]);
});