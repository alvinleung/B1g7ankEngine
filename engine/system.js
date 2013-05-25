var bt = bt || {};
bt.system = bt.system  || {};

bt.system.init = function(options) {
	
	// options
	/*
	 width: number
	 height: number
	 
	 element: htmlElement ** the element where we place the game **
	 
	 debug: true
	 useMouse: true
	 useTouch: false ** to be implemented **
	 useKeyboard: true
	 
	 assetManager: new bt.AssetManager()
	 game: new bt.game()
	 
	 */

	if (!options) 
		console.warn("bt.system.init: No arguments provided for initialization, please check if you have provide any arguments");

	// join all the scripts together include config and library
	options.scripts.unshift(options.config);
	options.scripts = options.lib.concat(options.scripts);

	// load all the scripts to continue the setup
	var totalScripts  = options.scripts.length;
	var scriptsLoaded = 0;
	var haveFailed    = false;

	if (options.scripts) {

		for (var i in options.scripts) {

			bt.loadScript(i, function (success) {

				// loaded one script, increment the counter
				scriptsloaded ++;

				// if this script file is failed to load, tell the user
				if (!success) haveFailed = true;
				
				// when loading is finished
				if (scriptsloaded == totalScripts) {
					if (haveFailed)
						console.warn("bt.system.init: Not all the scripts loaded");
					// start the game engine initialization procecss
					initializeGameEngine();
				}

			})
		}
	
	} else console.error("bt.system.init: No scripts files provided, please ensure that you have included scripts");

	function initializeGameEngine() {

		var settings = {

			// the element where we place the game
			element: document.createElement("div"),

			// debug mode
			debug: false,

			//assets
			assetManager: new bt.AssetManager(),
			// game
			game: bt.Game,
			
			// using inputs
			useMouse: true,
			useKeyboard: true,
			useTouch: false,
			
			// scripts to load
			scripts: new Array()

		}
		bt.merge(settings, options)

		// timing stuffs
		bt.system.clock  = this.clock || new bt.Clock();
		bt.system.delta  = 0;
		bt.system.isRunning = false;
		
		// debug
		bt.system.debug = settings.debug;

		// using inputs

		
		// global access objects
		bt.system.assets = settings.assetManager;


		bt.input = new bt.Input(); // make bt input global
		bt.game = new settings.game(options.width || bt.DEFAULT.GAME_WIDTH, options.height || bt.DEFAULT.GAME_HEIGHT );

		// append the game element
		if (!options.element)
			console.warn("bt.system.init: No game element provided");
		else {
			if ( typeof options.element == "string") // the argument is an id
				document.getElementById(options.element).appendChild(bt.game.renderer.view);
			else
				element.appendChild(bt.game.renderer.view);
		}
	}

}
bt.loadScript = function(src,callback) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.scr = src;
	script.addEventListener("load", function() {
		callback(true);
	});
	script.addEventListener("error", function() {
		callback(false);
	})
}
bt.system.start =  function() {
	var that = this;
	this.isRunning = true;
	requestAnimationFrame(game_loop.bindScope(this));
	function game_loop() {
		// enable a globle access of the game time
		this.delta = this.clock.tick();
		this.update();
		// call itself again for looping if the game is running
		if ( this.isRunning )
			requestAnimationFrame(game_loop.bindScope(this)); 
	}
};
bt.system.update = function(val) {
	bt.game.update();

};
bt.system.stop = function() {
	this.isRunning = false;
};
