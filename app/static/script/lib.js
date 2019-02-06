let _ = {};

(() => {
	_.get = (url) => {
		return new Promise((resolve, reject) => {
			let request = new XMLHttpRequest();

			request.addEventListener("load", (event) => {
				resolve({responseText: request.responseText, request: request});
			});
			request.addEventListener("error", (event) => {
				reject({event: event, request: request});
			});
			request.addEventListener("abort", (event) => {
				reject({event: event, request: request});
			});

			request.open("GET", url, true);
			request.setRequestHeader("Cache-Control", "no-cache");
			request.setRequestHeader("X-requested-With", "XMLHttpRequest");
			request.send(null);
		});
	};
	
	_.getJSON = (url) => {
		return _.get(url).then((response, request) => {
			return JSON.parse(response);
		});
	};
})();

export default _;
