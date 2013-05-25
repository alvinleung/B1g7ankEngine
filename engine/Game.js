/*
 Class:       bt.Game
 extend:      none
 Description: the main frame of the game, which would run by the bt.system
 */
bt.Game = function(width, height) {
	// the thing needed to render
	this.stage    = new PIXI.Stage(0xFFFFFF);
	this.renderer = new PIXI.autoDetectRenderer(width, height);
}
bt.Game.prototype.initialize = function() {
	// need to be implement 
	this.updateTime = 0;
	this.renderTime = 0;
	this.sceneManager = new SceneManager();
}
bt.Game.prototype.update = function() {
	
	// Update the Entities
	var i = 0;
	var startTime = Date.now();
	this.sceneManager.update();
	
	// Update the stage
	i = 0;
	startTime = Date.now();
	this.renderer.render(this.stage);
	this.renderTime = Date.now()-startTime;
}
bt.Game.prototype.logRenderTime = function() {
	console.log(this.renderTime);
}
/*
 Class:       bt.SceneLoader
 extend:      bt.Scene
 Description: Controlled by bt.Game it contain different layers
 */