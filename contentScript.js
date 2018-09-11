// Will run in an assolated env with no access to page's global vars
(function() {
	const scriptSources = [
		"https://code.jquery.com/jquery-3.3.1.slim.min.js",
		chrome.extension.getURL("injected/hooking.js"),
		chrome.extension.getURL("injected/celebrations.js"),
		chrome.extension.getURL("injected/main.js"),
	];

	scriptSources.forEach(src => {
		var injectedScriptTag = document.createElement("script");
		injectedScriptTag.src = src;
		document.head.appendChild(injectedScriptTag);
	})
})();
