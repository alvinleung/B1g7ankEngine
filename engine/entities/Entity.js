/*
 Class:       bt.Entity
 extend:      none
 Description: Objects of the game, controlled by the bt.Game class
 */
bt.Entity = bt.class({
	name: "object",
	body: body

	constructor: function(x,y,name) {

		this.name = "object"+Math.floor(Math.random()*100);
		
		this.body = new bt.body();

		if (name && typeof name == "string")
			this.name = name
		else this.name = "object"+Math.floor(Math.random()*10000); // generate a name for it if no name provided
		this.initialize();
	},
	update: function() {

	}

})
