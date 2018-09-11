const classesToClickHook = ["TaskRowCompletionStatus", "CompletionButton"];
const enterKeyCode = 13;
const rehookButtonInterval = 200;


if(!global.DissBlock) global.DissBlock = {};


function hookDOMClick(jqueryObject) {
	if(jqueryObject.attr("db-hooked") == "true") return;

	// Preserve original onclick
	jqueryObject.attr("original-onclick", jqueryObject.attr("onclick"));

	jqueryObject.click(function(e) {
		// If already launched a celebration for a click on this one
		//	(prevent double click -> double rainbow)
		if($(this).attr("db-launched-celebration") == "true") return;

		$(this).attr("db-launched-celebration", "true");

		// Call previous if present
		if($(this).attr('original-onclick'))
			$(this).attr('original-onclick')(e);

		global.DissBlock.onTaskComplete();
	});

	jqueryObject.attr("db-hooked", "true");
}


function hookCtrlEnterCombination(eventHandler) {
	document.originalOnkeydown = document.onkeydown;

	document.onkeydown = e => {
		if(document.originalOnkeydown)
			document.originalOnkeydown(e);

		if(e && e.ctrlKey && e.keyCode == enterKeyCode)
			global.DissBlock.onTaskComplete();
	}
}


// This will call eventHandler every time a task is completed
// Expects the callback to completion to be defined at
//	global.DissBlock.onTaskComplete
global.DissBlock.hookTaskCompletion = function() {

	hookCtrlEnterCombination();

	// Hook currently present elements
	setInterval(() =>
		classesToClickHook.forEach(cls =>
			$("." + cls).each(function(i) { hookDOMClick($(this)) })
		)
	, rehookButtonInterval);

	// Hook elements created in the future
	$('body').on('DOMNodeInserted', 'div', function () {
		const nodeClasses = $(this).attr("class") || "";
		const nodeSplittedClasses = nodeClasses.split(" ");
		let shouldBeHooked = false;
		nodeSplittedClasses.forEach(cls => {
			if(classesToClickHook.indexOf(cls) !== -1)
				shouldBeHooked = true;
		});

		if(!shouldBeHooked) return;

		hookDOMClick($(this));
	});
}

// Scripts loading synchronization
if(global.DissBlock.mainLoaded && global.DissBlock.celebrationsLoaded)
	global.DissBlock.main();
else
	global.DissBlock.hookingLoaded = true;
