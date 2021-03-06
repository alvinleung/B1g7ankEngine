/*
 Class:       bt.Input
 extend:      none
 Description: to handle input from the client 
 NOTE ** bt.input is initialized BEFORE initializing the game 
 */

bt.Input = function() {
	this.actions = {};
	this.bindings = {};
}
bt.Input.prototype.on = function(action) {
	return this.actions[action];
}
bt.Input.prototype.isRelease = function(action) {
	
}
// for the mouse
bt.Input.prototype.useMouse = function() {
	bt.game.canvas.addEventListener("mousedown", this.mouseDownHandler.bind(this), false);
	bt.game.canvas.addEventListener("mouseup",   this.mouseUpHandler.bind(this), false);
	bt.game.canvas.addEventListener("mousemove", this.mouseMoveHandler.bind(this), false);
	bt.game.canvas.addEventListener("contextmenu", this.contextMenuHandler.bind(this), false);
}
// to be implemented
bt.Input.prototype.useTouch = function () {
	
}
bt.Input.prototype.mouseDownHandler = function() {
	e.stopPropagation();
	e.preventDefault();
	
}
bt.Input.prototype.mouseUpHandler = function() {
	e.stopPropagation();
	e.preventDefault();
}
bt.Input.prototype.mouseMoveHandler = function() {
	e.stopPropagation();
	e.preventDefault();
}
bt.Input.prototype.contextMenuHandler= function() {
	e.stopPropagation();
	e.preventDefault();
	return false;
}
// for the keyboard
bt.Input.prototype.useKeyboard = function() {
	document.body.addEventListener("keydown", this.keyDownHandler.bind(this), false);
	document.body.addEventListener("keyup", this.keyUpHandler.bind(this), false);
}
bt.Input.prototype.keyDownHandler = function(e) {
	// make the webpage can be refreshed after alter
	if (bt.system.debug && e.keyCode != bt.KEY["F5"] ) {
		if (e.KeyCode != bt.KEY["I"] && e.KeyCode != bt.KEY["CONTROL"] && e.KeyCod != bt.KEY["SHIFT"]) {
			e.stopPropagation();
			e.preventDefault();
		}
	}
	var action = this.bindings[e.keyCode];
	if ( action )
		this.actions[ action ] = true;
}
bt.Input.prototype.keyUpHandler = function(e) {
	e.stopPropagation();
	e.preventDefault();
	var action = this.bindings[e.keyCode];
	if ( action ) 
		this.actions[ action ] = false;
}
bt.Input.prototype.bind = function(key, action) {
	this.actions[action] = this.actions[action] || false;
	this.bindings[bt.KEY[key]] = action;
}
bt.Input.prototype.unbind = function(action) {
	delete this.actions[action];
}
bt.input.KEYS = {
		'MOUSE1': -1,
		'MOUSE2': -3,
		'WHEEL_UP': -4,
		'WHEEL_DOWN': -5,
		'BACKSPACE': 8,
		'TAB': 9,
		'ENTER': 13,
		'PAUSE': 19,
		'CAPS': 20,
		'ESC': 27,
		'SPACE': 32,
		'PAGE_UP': 33,
		'PAGE_DOWN': 34,
		'END': 35,
		'HOME': 36,
		'LEFT': 37,
		'UP': 38,
		'RIGHT': 39,
		'DOWN': 40,
		'INSERT': 45,
		'DELETE': 46,
		'0': 48,
		'1': 49,
		'2': 50,
		'3': 51,
		'4': 52,
		'5': 53,
		'6': 54,
		'7': 55,
		'8': 56,
		'9': 57,
		'A': 65,
		'B': 66,
		'C': 67,
		'D': 68,
		'E': 69,
		'F': 70,
		'G': 71,
		'H': 72,
		'I': 73,
		'J': 74,
		'K': 75,
		'L': 76,
		'M': 77,
		'N': 78,
		'O': 79,
		'P': 80,
		'Q': 81,
		'R': 82,
		'S': 83,
		'T': 84,
		'U': 85,
		'V': 86,
		'W': 87,
		'X': 88,
		'Y': 89,
		'Z': 90,
		'NUMPAD_0': 96,
		'NUMPAD_1': 97,
		'NUMPAD_2': 98,
		'NUMPAD_3': 99,
		'NUMPAD_4': 100,
		'NUMPAD_5': 101,
		'NUMPAD_6': 102,
		'NUMPAD_7': 103,
		'NUMPAD_8': 104,
		'NUMPAD_9': 105,
		'MULTIPLY': 106,
		'ADD': 107,
		'SUBSTRACT': 109,
		'DECIMAL': 110,
		'DIVIDE': 111,
		'F1': 112,
		'F2': 113,
		'F3': 114,
		'F4': 115,
		'F5': 116,
		'F6': 117,
		'F7': 118,
		'F8': 119,
		'F9': 120,
		'F10': 121,
		'F11': 122,
		'F12': 123,
		'SHIFT': 16,
		'CTRL': 17,
		'ALT': 18,
		'PLUS': 187,
		'COMMA': 188,
		'MINUS': 189,
		'PERIOD': 190
	};
