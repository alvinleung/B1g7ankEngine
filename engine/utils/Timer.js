/*
 Class:       bt.Timer
 extend:      none
 Description: timing stuffs !
 */
bt.Timer = function () { 
	this.startTime = Date.now();
}
bt.Timer.delta = function() {
	return Date.now() - this.startTime;
}
bt.Timer.reset = function() {
	this.startTime = Date.now();
}