
/*
 Class:       bt.Body
 extend:      none
 Description: The representation of the physical object in the world
 */
bt.Body.fromTexture = function(texture) {
	// create a body using texture

}
bt.Body = bt.class(b2BodyDef,{

	constructor: function(x,y,w,h) {

		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;

	},
	update: function() {

	}

})
/*
bt.Entity = function(x,y) {
	
	this.position = {
		x : bt.DEFAULT.POSITION_X,
		y : bt.DEFAULT.POSITION_Y
	}
	this.size = {
		width:    bt.DEFAULT.WIDTH,
		height:   bt.DEFAULT.HEIGHT,
	}
	this.rotation =  bt.DEFAULT.ROTATION;
	this.velocity = {
		x : bt.DEFAULT.VELOCITY_X,

		y : bt.DEFAULT.VELOCITY_Y
	}

}
bt.Entity.prototype.initialize = function () {
// this function will be called after constructed
}
bt.Entity.prototype.spawn = function() {
	// this funciton will be called when it spawns
}
bt.Entity.prototype.destroy = function() {
	// this function will be called when it destroy
}
bt.Entity.prototype.update = function() {
	// this function will be called every game loop update
	this.position.x += this.velocity.x * bt.system.delta;
	this.position.y += this.velocity.y * bt.system.delta;
}
bt.Entity.prototype.rotate = function( degree ) {
	this.rotation += degree;

}*/