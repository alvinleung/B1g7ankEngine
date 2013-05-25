/*
 Class:       bt.Clock
 extend:      none
 Description: the core game clock
 */
bt.Clock= function() {
	// last update time
	this.time         = 0;
	this.maxStep      = 1000/60; // 60fps
	this.lastTickTime = 0;
}
bt.Clock.prototype.tick = function()
{
	var currentTime = Date.now();
	var delta       = (currentTime - this.lastTickTime) / 1000;
	this.lastTickTime = currentTime;
	
	// delta = Math.min(delta, this.maxStep);
	delta = (delta > this.maxStep) ? this.maxStep : delta;
	this.time += delta;
	return delta;
};