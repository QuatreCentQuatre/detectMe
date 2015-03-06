$(document).ready(function(){
	console.log("Current Browser :: " + Me.detect.data.browser);
	console.log("Current Version :: " + Me.detect.data.version);
	console.log("Current OS :: " + Me.detect.data.os);
	if (Me.detect.isOldIE()) {
		console.log("IS OLD IE!");
	}
});