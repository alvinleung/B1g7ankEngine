var img = "wieldassimage.png";
window.onload = function() {

	bt.system.init({

		game: SomeGame,
		element: "game",
		debug: true

	});
	
	// add images to the queue
	bt.system.assets.add(img);
	
	// add fonts to the queue
	bt.system.assets.add("font.png");
	bt.system.assets.add("fontArial.png");
	
	// download all the stuffs
	bt.system.assets.download(startGame);

}

function startGame() {
	
	bt.system.start();

	var someone = new Someone();
	bt.game.add(someone,0,0);
	
	var fpsc = new fpsCounter();
	bt.game.add(fpsc);
	
}

function fpsCounter() {
	
	bt.parent(this);
	
	var font = new bt.Font(bt.system.assets.get("font.png"));
	font.calculateCharacterSize();
	
	this.drawable = new bt.Text(font);
	
	this.position = {
		x: 100,
		y: 16
	}
}
bt.inherits(fpsCounter, bt.Entity);
fpsCounter.prototype.update = function() {
	this.drawable.setText("Update Time:"+bt.game.updateTime);
}

function SomeGame(width , height) {

	bt.parent(this, width, height);
	
	bt.input.bind("A", "left");
	bt.input.bind("D", "right");
	bt.input.bind("W", "up");
	bt.input.bind("S", "down");
	bt.input.bind("LEFT", "rotateLeft");
	bt.input.bind("RIGHT", "rotateRight");
	
	bt.input.bind("SPACE","BLAH");
	
	this.updateTimeCounter = document.getElementById("updateTime");
	this.renderTimeCounter = document.getElementById("renderTime");
	
	bt.input.useKeyboard();
}
bt.inherits(SomeGame, bt.Game);
SomeGame.prototype.update= function() {
	bt.parent(this, "update");
	this.updateTimeCounter.innerHTML = this.updateTime;
	this.renderTimeCounter.innerHTML = this.renderTime;
}


function Someone () {
	
	bt.parent(this);
	this.drawable = new bt.Image(bt.system.assets.get(img));
	//this.drawable.showBounds = true;
	
	this.rotation = 10;
	
	this.size.width = 100;
	this.size.height = 100;
	
	this.position.x = 50;
	this.position.y = 50;
	
	this.speed = 100; // move 10 pixel every second
	
	//this.drawable.context.drawImage(string.canvas, 0,0)
}
bt.inherits(Someone, bt.Entity);
Someone.prototype.update = function() {
	//this.rotate(this.rotation++);
	
	this.velocity.x = 0;
	this.velocity.y = 0;
	if ( bt.input.isDown("left") )
		this.velocity.x = -this.speed;
		
	if ( bt.input.isDown("right") )
		this.velocity.x = this.speed;
		
	if ( bt.input.isDown("up") )
		this.velocity.y = -this.speed;
		
	if ( bt.input.isDown("down") )
		this.velocity.y = this.speed;
	
	if ( bt.input.isDown("rotateLeft") )
		this.drawable.setRotation(this.rotation--); 
	
	if ( bt.input.isDown("rotateRight") )
		this.drawable.setRotation(this.rotation++);
		
	bt.parent(this, "update");
}