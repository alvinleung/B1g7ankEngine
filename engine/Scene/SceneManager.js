/*
 Class:       bt.SceneManager
 extend:      none
 Description: control different scenes
 */
bt.SceneManager = bt.class({

	constructor: function() {
		this.currentScene = null;
		Scene = null;
	},
	changeScene: function (scene) {
		// TODO: animationzzzz
		// tell the previous scene to pause
		bt.game.stage.removeChild(this.currentScene.displayObject);

		// change the scene and start the new scene
		this.currentScene = scene;
		bt.game.stage.addChild(this.currentScene.displayObject);
		
	}

});