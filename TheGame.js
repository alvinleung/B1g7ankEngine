var img = "wieldassimage.png";


function startGame() {

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

Someone = bt.class(GameObject, {

	initialize: function() {

		this.testimg = new PIXI.Sprite();

	}

})