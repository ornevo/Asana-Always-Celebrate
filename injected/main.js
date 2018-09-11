/**
 * Replace the global AsanaRainbow class with a wrapper class that
 * 	only overrides the 'start' function. Each time a task is completed,
 * 	it checks whether 'start' was called, and if not calls it himself.
 */

if(!global.DissBlock) global.DissBlock = {};

global.DissBlock.main = function() {
	window.originalOnload = window.onload;
	window.onload = function functionName() {
		if(window.originalOnload)
			window.originalOnload();

		global.DissBlock.replaceAsanaRainbow();
		global.DissBlock.hookTaskCompletion();
	}
}

// Scripts loading synchronization
if(global.DissBlock.celebrationsLoaded && global.DissBlock.hookingLoaded)
	global.DissBlock.main();
else
	global.DissBlock.mainLoaded = true;
