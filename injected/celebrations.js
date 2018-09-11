const WAIT_BEFORE_CHECK_IF_CELEBRATED = 500;


if(!global.DissBlock) global.DissBlock = {};
global.DissBlock.didCelebrate = false;


global.DissBlock.callOriginalCelebrtion = function() {
	try {
		global.OriginalAsanaRainbow.start();
	} catch {}
}


// Hooks the celebration so we can flag that a celebration occurred
global.DissBlock.replaceAsanaRainbow = function() {
	global.OriginalAsanaRainbow = global.AsanaRainbow;
	// Create a clone
	var newAsanaRainbow = {};
	Object.assign(newAsanaRainbow, global.AsanaRainbow);

	newAsanaRainbow.start = (e) => {
		global.DissBlock.didCelebrate = true;
		global.DissBlock.callOriginalCelebrtion();
	}

	global.AsanaRainbow = newAsanaRainbow;
}


// To check whether the task completion triggered a celebration
global.DissBlock.onTaskComplete = function() {
	global.DissBlock.didCelebrate = false;
	// Check if Asana triggered a celebration itself, and trigger one otherwise
	setTimeout(function() {
		if(!global.DissBlock.didCelebrate) {
			console.log("Here to the rescue!");
			global.DissBlock.callOriginalCelebrtion();
		}
	}, WAIT_BEFORE_CHECK_IF_CELEBRATED);
}


// Scripts loading synchronization
if(global.DissBlock.mainLoaded && global.DissBlock.hookingLoaded)
	global.DissBlock.main();
else
	global.DissBlock.celebrationsLoaded = true;
