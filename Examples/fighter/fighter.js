// image file ref
imgBullet = "assets/bullet.png";
imgEnemy  = "assets/Enemy.png";
imgPlayer = "assets/Player.png";

// init the game when window is ready
window.onload = function()
{
	bt.system.init();
	
	bt.system.assets.add(imgBullet);
	bt.system.assets.add(imgEnemy);
	bt.system.assets.add(imgPlayer);
	
	bt.system.assets.download(function() {
		
		// when finished download
		bt.system.setGame(PixelFighter);
		bt.system.appendGame("game");
		bt.system.start();
		
		// initialization
		
		var player = new Player();
		bt.game.add(player,0,0);
		
		
	});
	
}

// the game
function PixelFighter(width, height) {
	
	// init the game
	bt.parent(this, width, height);
	
	// setup the keybindings
	bt.input.bind("LEFT", "goLeft");
	bt.input.bind("RIGHT", "goRight");
	bt.input.bind("SPACE", "shoot");
	
	// activate the keyboard control
	bt.input.useKeyboard();
	
}
bt.inherits(PixelFighter, bt.Game);

// Figher, Player and Enemy would inherit from here
function Fighter() {

	// call the parent constructor
	bt.parent(this);
	
	// set the size of the fighter
	this.size = {
		width: 80,
		height: 120
	};
	
	// define the moving speed of the player
	this.speed = 200; // 200 pixel per second
}
bt.inherits(Fighter, bt.Entity);

// Player
function Player() {

	// init the object
	bt.parent(this);
	
	// use the player image
	this.drawable = new bt.Image(bt.system.assets.get(imgPlayer));
	
	// For debug, To show the boundaries of the entity
	// this.drawable.showBounds = true;
	
	// position the player
	// center the player
	this.position.x = bt.game.width/2;
	// stick the player to bottom
	this.position.y = bt.game.height - this.size.height/2;
	
	
	// define the moving speed of the player
	this.speed = 200; // 200 pixel per second
}
bt.inherits(Player, Fighter);
Player.prototype.update = function() {
	
	// reset the velocity
	this.velocity.x = 0;
	this.velocity.y = 0;
	
	// handle key down
	if ( bt.input.isDown("goLeft") )
		this.velocity.x = -this.speed;
	if ( bt.input.isDown("goRight") )
		this.velocity.x = this.speed;
	
	// call back the default update
	bt.parent(this, "update");
}

// Enemy
function Enemy() {

	bt.parent(this);
	
	// use the Enemy Image
	this.drawable = new bt.Image(bt.system.assets.get(imgEnemy));
	
	
}
bt.inherits(Enemy, Fighter);
Enemy.prototype.update = function() {

	

}