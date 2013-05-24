/*
 Author: Alvin Leung
 Email : alvinleung2009@gmail.com
 Description:
 	this is a HTML 5 game engine written in fully 'native' javascript. It uses the
 	the prototype-based syntax to implement the object-oriented programming, which
 	javascript recgonize as an Class. 
 */
var bt = bt || {};
/*
 This is  a abstract of the platform which other classes will use
 */
 
// VERY CORE FUNCTION OF THE GAME ENGINE
bt.game = null;

/*
 NAVTIVE JAVASCRIPT INHERITANCE
 
 summary: 
       Array.prototype.indexOf
	   window.requestAnimationFrame
	   Function.prototype.bindScope
	   ** for oo **
	   bt.inherits ( child, parent );
	   bt.parent   (); // no arguments for calling the parent constructor
	   bt.parent   (this, "methodname", ["arg1", "arg2"]);
	   bt.class(class)
	   bt.class(parent, child)
	   bt.merge ( obj1, obj2 );
 */
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
  };
}
if (!Array.prototype.remove)
{
    /**
     * Add array.remove() convenience method to remove element from array.
     *
     * @param {Object} elem Element to remove.
     */
    Array.prototype.remove = function(elem) {
        var index = this.indexOf(elem);
 
        if (index !== -1) {
            this.splice(index, 1);
        }
    };
}
window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();
var bt = bt || {};
// binding functions
Function.prototype.bindScope = function(scope) {
	var _function = this;
	return function() {
		return _function.apply(scope, arguments);
	}
}
bt.log = function(str) {
	console.log(str); 
}
// adapeted from google code
bt.inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  childCtor.prototype.constructor = childCtor;
};
bt.parent = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if (caller.superClass_) {
    // This is a constructor. Call the superclass constructor.
    return caller.superClass_.constructor.apply(
        me, Array.prototype.slice.call(arguments, 1));
  }

  var args = Array.prototype.slice.call(arguments, 2);
  var foundCaller = false;
  for (var ctor = me.constructor;
       ctor; ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if (ctor.prototype[opt_methodName] === caller) {
      foundCaller = true;
    } else if (foundCaller) {
      return ctor.prototype[opt_methodName].apply(me, args);
    }
  }

  // If we did not find the caller in the prototype chain,
  // then one of two things happened:
  // 1) The caller is an instance method.
  // 2) This method was not called by the right caller.
  if (me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args);
  } else {
    throw 'bt.parent called from a method of one name ' +
          'to a method of a different name';
  }
};
bt.loadScript = function(src) {
	document.getElementsByTagName("head")[0].innerHTML += "<script type='text/javascript' src='"+ src+"'></script>";
}
bt.merge = function(obj1, obj2) {
	// it basicly merge two object together
	// put every thing in obj2 into obj1
	for (var i in obj2)
		obj1[i] = obj2[i];
}
bt.asc = function ( string ) {
	return string.charCodeAt(0);
}
bt.chr = function ( asciiNum ) {
	return String.fromCharCode(AsciiNum);
}
// added for a more convinent way to write code
bt.class = function(parent, child) {
	if (arguments.length == 2) {
		// when provided parent and child
		// so we identify it as "extending"
		var ctor = child.constuctor;child.constuctor = null; // clear the constructor of the child
		bt.inherits(parent, ctor);
		//bt.log(child)
		bt.merge(ctor.prototype,child);
	} else {	
		// when only one argumentc
		// we identify it as "creating a class"
		child = arguments[0];
		var ctor = child.constructor;child.constuctor = null; // clear the constructor of the child
		bt.merge(ctor.prototype,child);
	}
	return ctor;
}
// This AssetManager will only add image to the list and will NOT remove from the list
/* please use the load method beside of this
bt.AssetManager.prototype.addImage   = function(arg) {
	if (typeof arg == "string") {
		// this is a URL
		var idOfImage = this.imagesUrl.length;
		this.imagesUrl[idOfImage] = arg;
	} else {
		// this is a array of images
		var i = 0;
		while ( i < arg.length ) {
			this.addImage(arg[i]);
			i++;
		}
	}
} */

bt.KEY = {
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
bt.createCanvas = function(width,height) {
	var canvas = document.createElement("canvas");
	canvas.setAttribute("width", width);
	canvas.setAttribute("height", height);
	canvas.width = width;
	canvas.height = height;
	canvas.setWidth = function(val) {
		this.setAttribute("width", val);
	}
	canvas.setHeight = function(val) {
		this.setAttribute("height",val);
	}
	canvas.setSize = function(w,h) {
		this.setAttribute("width", w);
		this.setAttribute("height", h);
	}
	canvas.getSize = function() {
		var width  = canvas.width || this.getAttribute("width");
		var height = canvas.height|| this.getAttribute("height");
		return {
			width: width,
			height: height
		}
	}
	canvas.getHeight = function() {
		return canvas.width || this.getAttribute("width");
	}
	canvas.getWidth = function() {
		return canvas.height || this.getAttribute("height");
	}
	return canvas;
}

bt.AssetManager = function() {
  this.successCount = 0;
  this.errorCount = 0;
  this.cache = {};
  this.downloadQueue = [];
}

bt.AssetManager.prototype.add = function(path) {
	if (typeof path == "string")
		this.downloadQueue.push(path);
	else {
		for (var i in path)
			this.add(path[i])
	}
}

bt.AssetManager.prototype.isDone = function() {
  return (this.downloadQueue.length == this.successCount + this.errorCount);
}
bt.AssetManager.prototype.download = function(callback) {
	for (var i = 0; i < this.downloadQueue.length; i++) {
		var path = this.downloadQueue[i];
		var img = new Image();
		var that = this;
		img.addEventListener("load", function() {
			that.successCount += 1;
			if (that.isDone()) { callback(); }
		}, false);
		img.addEventListener("error", function() {
			that.errorCount += 1;
			if (that.isDone()) { callback(); }
		}, false);
		img.src = path;
		this.cache[path] = img;
  }
}
bt.AssetManager.prototype.get = function(path) {
	return this.cache[path];
}

//********************************************************************************************************
//
// big tank engine classes
//
//********************************************************************************************************
// TODO(s)
// TODO: IMPORTANT: FINISH THE RENDER SHIT
// TODO: Construct basic bt.Entity object
// TODO: Make an external Effect library
// TODO: plot box2d physix engine to 'native' javascript
// TODO: Make an networking framework
// default stuffs
bt.DEFAULT = {};

// default game size
bt.DEFAULT.GAME_WIDTH  = 854;
bt.DEFAULT.GAME_HEIGHT = 480;

// TRANSFORM
bt.DEFAULT.WIDTH = 20;
bt.DEFAULT.HEIGHT= 20;
bt.DEFAULT.ROTATION = 0;
// graphic
bt.DEFAULT.DRAWX = 0;
bt.DEFAULT.DRAWY = 0;

// ENTITY DEFAULT
bt.DEFAULT.POSITION_X = 0;
bt.DEFAULT.POSITION_Y = 0;
bt.DEFAULT.VELOCITY_X = 0;
bt.DEFAULT.VELOCITY_Y = 0;
/*
 by alvinleung
 This is the entry of the game engine
 */
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
/*
 Class:       bt.Timer
 extend:      none
 Description: timing stuffs !
 */
bt.Timer = function () { 
	this.startTime = Date.now();
}
bt.Timer.delta = function() {
	return Date.now() - this.startTime;
}
bt.Timer.reset = function() {
	this.startTime = Date.now();
}
/*
 Class:       bt.system.****
 extend:      none
 Description: A static class of the system, the game initialization starts here
 */
bt.system = bt.system || {};
// to kick the system start running
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
		useTouch: false

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
			document.getElementById(options.element).appendChild(bt.game.canvas);
		else
			element.appendChild(bt.game.canvas);
	}
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
/*
 Class:       bt.Game
 extend:      none
 Description: the main frame of the game, which would run by the bt.system
 */
bt.Game = function(width, height) {
	// the basic object
	this.canvas = document.createElement("canvas");
	this.context = this.canvas.getContext("2d");
	
	// the thing needed to render
	this.updateTime = 0;
	this.renderTime = 0;
	this.entities = [];

	this.canvas.width = width || bt.DEFAULT.GAME_WIDTH;
	this.canvas.height = height || bt.DEFAULT.GAME_HEIGHT;
	this.width = width || 640;
	this.height = height || 360;
}
bt.Game.prototype.initialize = function() {
	// need to be implement 
	this.updateTime = 0;
	this.renderTime = 0;
	this.entities = [];

	this.canvas.width = width || bt.DEFAULT.GAME_WIDTH;
	this.canvas.height = height || bt.DEFAULT.GAME_HEIGHT;
	this.width = width || 640;
	this.height = height || 360;
}
bt.Game.prototype.swapIndex = function(obj1, obj2) {
	var index1 = this.entities.indexOf(obj1);
	var index2 = this.entities.indexOf(obj2);
	this.entities[index1] = obj2;
	this.entities[index2] = obj1;
}
bt.Game.prototype.getEntitiesByType = function(type) {
	var result = [];
	for ( var i = 0; i < this.entities.length; i++ ) {
		var e = this.entities[i]
		if ( e instanceof type ) {
			// push the required entity type to the result
			result.push(e);
		}
	}
	return result;
}
bt.Game.prototype.setSize = function(obj) {
	if (obj) {
		this.width = obj.width || this.pos.width;
		this.height = obj.height || this.pos.height;
		this.canvas.setAttribute("width", obj.width || this.pos.width);
		this.canvas.setAttribute("height", obj.height || this.pos.height);
	}
}
bt.Game.prototype.setBgColor = function(color) {
	this.context.fillRect(0,0, this.width, this.height);
}
bt.Game.prototype.add = function(entity) {
	this.entities.push(entity);
}
bt.Game.prototype.addAt = function(entity, index) {
	this.entities.splice(index,0, entity);
}
bt.Game.prototype.del = function(entity) {
	this.entities.splice(this.entities.indexOf(entity),1);
}
bt.Game.prototype.update = function() {
	
	// Update the Entities
	var i = 0;
	var startTime = Date.now();
	//console.log(this.renderList)
	while ( i < this.entities.length ) {
		var that = this.entities[i];
		that.update();
		i++;
	}
	this.updateTime = Date.now()-startTime;
	
	// Update the drawing
	i = 0;
	startTime = Date.now();
	bt.game.context.clearRect(0,0,this.width, this.height);
	while ( i < this.entities.length ) {
		var that = this.entities[i];
		that.draw();
		i++;
	}
	this.renderTime = Date.now()-startTime;
}
bt.Game.prototype.logRenderTime = function() {
	console.log(this.renderTime);
}

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
bt.Input.prototype.isDown = function(action) {
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



/*
 Class:       bt.Entity
 extend:      none
 Description: Objects of the game, controlled by the bt.Game class
 */
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
	this.drawable = new bt.Drawable();
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
	this.drawable.setRotation(degree);
}
bt.Entity.prototype.draw = function() {
	this.drawable.draw(this.position.x, this.position.y);
}
/*
 Class:       bt.Drawable
 extend:      none
 Description: basicly abstract a rendering class for the game, all the visual object would enhanced by this
 */
bt.Drawable = function(w,h) {
	this.rotation = 0;

	this.width =  w || bt.DEFAULT.WIDTH;
	this.height = h || bt.DEFAULT.HEIGHT;
	
	this.drawX = -this.width/2;
	this.drawY = -this.height/2;

	this.canvas = bt.createCanvas(this.width, this.height);
	this.context = this.canvas.getContext("2d");
	
	this.showBounds = false;
	this.showCenter = false;
	//this.context.translate(-this.width/2, -this.height/2);
}
bt.Drawable.prototype.setSize = function(val) {
	if (val) {
		this.canvas.setSize(val);
		this.width = val.width;
		this.height= val.height;
		this.context.translate(val.width/2, val.height/2);
		this.drawX = -val.width/2;
		this.drawY = -val.height/2;
	}
}
bt.Drawable.prototype.setWidth = function(val) {
	if (val) {
		this.canvas.setWidth(val);
		this.width = val;
		this.context.translate(val/2, this.height/2);
		this.drawX = -val/2;
	}
}
bt.Drawable.prototype.setHeight= function(val) {
	if (val) {
		this.canvas.setHeight(val);
		this.height= val;
		this.context.translate(this.width/2, val/2);
		this.drawY = -val/2;
	}
}
bt.Drawable.prototype.setRotation = function(degree) {
	// translate to radius
	this.rotation = degree || this.rotation;
	var rot = degree*Math.PI/180;
	// calculate required width and height after the rotation
	//x' = x*cos(t) - y*sin(t)
	//y' = x*sin(t) + y*cos(t)
	var w = this.width;
	var h = this.height;
	
	var canvasWidth  = Math.abs(w*Math.cos(rot)) + Math.abs(h*Math.sin(rot));
	var canvasHeight = Math.abs(w*Math.sin(rot)) + Math.abs(h*Math.cos(rot));
	
	var offsetx = canvasWidth/2*Math.cos(-rot) - canvasHeight/2*Math.sin(-rot);
	var offsety = canvasWidth/2*Math.sin(-rot) + canvasHeight/2*Math.cos(-rot);
	
	// clear the canvas first BEFORE rotating the canvas
	var size = this.canvas.getSize();
	this.context.clearRect(0,0, size.width, size.height);
	// set the canvas size
	this.canvas.setSize(canvasWidth,canvasHeight);
	// save the state of canvas
	this.context.save();
		// rotate the canvas
		this.context.rotate(rot);
		// translate the context
		this.context.translate(offsetx, offsety);
		// render the shit out
		this.render();
	// restore the state of canvas
	this.context.restore();
}
bt.Drawable.prototype.optimizedRotation = function(degree, canvasWidth, canvasHeight, offsetx, offsety) {
	// clear the canvas first BEFORE rotating the canvas
	var size = this.canvas.getSize();
	this.context.clearRect(0,0, size.width, size.height);
	// set the canvas size
	this.canvas.setSize(cw,ch);
	// save the state of canvas
	this.context.save();
		// rotate the canvas
		this.context.rotate(rot);
		// translate the context
		this.context.translate(offsetx, offsety);
		// render the shit out
		this.render();
	// restore the state of canvas
	this.context.restore();
}
bt.Drawable.prototype.rotate = function(val) {
	this.setRotation(this.rotation+val);
}
bt.Drawable.prototype.render = function() {
	// Needed to be implemented
}
bt.Drawable.prototype.draw = function(x,y) {
	if (this.showCenter) {
		// draw the center point with a "X"
		this.context.fillRect(-3,-3,6,6);
	}
	if (this.showBounds) {
		// draw the bounding box
		var size = this.canvas.getSize();
		this.context.strokeRect(0,0,size.width, size.height);
	}
	bt.game.context.drawImage(this.canvas, x-this.canvas.width/2,y-this.canvas.height/2 );
}

/*
 Class:       bt.Image
 extend:      none
 Description: Image object which can be drawn on the canvas
 */
bt.Image = function(img) {
	bt.parent(this);
	this.img = img;
	
	var w = this.img.width;
	var h = this.img.height;
	
	// init the draw
	this.width  = w;
	this.height = h;
	
	this.drawX  = -this.width/2;
	this.drawY  = -this.height/2;
	
	this.canvas.setSize(w,h);         // set size of the canvas
	this.context.save();
	this.context.translate(w/2, h/2); // move the point to the center
	
	this.context.drawImage(this.img, this.drawX, this.drawY, this.width, this.height);
	this.context.restore();
}
bt.inherits(bt.Image, bt.Drawable);
bt.Image.prototype.render = function() {
	bt.parent(this, "render");
	this.context.drawImage(this.img, this.drawX, this.drawY, this.width, this.height);
}
/*
 Class:       bt.Font
 extend:      none
 Description: A font....
 GO TO http://impactjs.com/font-tool/ TO CREATE YOUR OWN FONT
 */
 bt.Font = function(image) {
 
	this.image = null;
	this.canvas = null;
	this.context = null;
	
	this.width = [];
	this.height= 0;
	this.x = [];
	this.y = 0;
	
	if (image) {
		// load the image
		this.image = image;
		this.canvas = bt.createCanvas(image.width, image.height);
		this.context = this.canvas.getContext("2d");
		// resize the canvas
		this.canvas.setSize(this.image.width, this.image.height)
		// render the font on the map
		this.context.drawImage(image, 0,0, image.width, image.height);
	}
 }
 bt.Font.prototype.setImage = function(image) {
	// load the image
	this.image = image;
	this.canvas = bt.createCanvas(image.width, image.height);
	this.context = this.canvas.getContext("2d");
	// resize the canvas
	this.canvas.setSize(this.image.width, this.image.height)
	// render the font on the map
	this.context.drawImage(image, 0,0, image.width, image.height);
 };
 bt.Font.prototype.calculateCharacterSize = function() {
 	var width = this.image.width;
	var height = this.image.height;
	var context = this.context;
	// set the height
	// because the font got a 1 px line under so...
	this.height = height-1; // the 4 pixel is the pixels under the font;
	// get build a map of font width according to ascii
	
	// the image data
	var imageData = context.getImageData(0, height-1, width, height-1);
	var data = imageData.data;
	
	var lastEmptyPosition = -1;
	var currentPosition = 0;
	var currentChar = 0;
	currentChar = 32;
	
	// read lines under the font
	// scan the pixel at the bottom
	for ( var i = 0; i < width*4; i += 4 ) {
		// scan the pixel
		var red   = data[i];
		var green = data[i + 1];
		var blue  = data[i + 2]; 
		var alpha = data[i + 3];
		
		// _ = black
		// . = empty
		// ____.___.____.____
		if ( alpha == 0 ) { 
			// on a empty pixel
			
			// save the position to the data
			this.x[currentChar] = lastEmptyPosition;
			// calculate the font width by the last empty pixel position
			this.width[currentChar] = currentPosition - lastEmptyPosition -1;
			
			// scan the end of the next character
			currentChar ++;
			
			lastEmptyPosition = currentPosition;
		}
		currentPosition ++;
	}
}
/*
 Class:       bt.Text
 extend:      none
 Description: Text that can be drawn on the canvas
 */
bt.Text = function(font) {
	bt.parent(this)
	this.font = font;
	this.text = "";
}
bt.inherits(bt.Text, bt.Drawable);
bt.Text.prototype.setText = function(text) {
	// set the private text data
	this.text = text;
	this.render();
}
bt.Text.prototype.render = function() {
	// render text on the hidden canvas
	var text = this.text;
	var totalWidth = 0;
	
	var fontWidth  = this.font.width;
	var fontHeight = this.font.height;
	var fontx      = this.font.x;
	var fonty      = this.font.y;
	
	var fontImage  = this.font.image;
	
	var widestFontWidth = 16;
	// create a canvas that asuming every character is the widest
	var tmpCanvas = bt.createCanvas(16*text.length, this.font.height)
	var tmpContext = tmpCanvas.getContext("2d");
	
	var tmpCharWidth = 0; 
	
	var pointerPos = 0;
	
	// calculate the total string width
	for (var i = 0; i < text.length ; i ++) {
		
		// GRAB the width from the font class and INCREMENT it
		// bt.asc returns a ascii number
		// text[i] is the current char
		var charAsc = bt.asc(text[i]);
		var charWidth = fontWidth[charAsc];
		var tmpCharWidth = charWidth;
		totalWidth += tmpCharWidth;
		// draw the image to the temp canvas
		tmpContext.drawImage(fontImage, this.font.x[charAsc],0,tmpCharWidth,fontHeight,
		                     pointerPos,0,charWidth,20);
		pointerPos += tmpCharWidth;
		//PROBLEM:: could not show the last word
	}
	// resize the canvas to fit the image
	this.setWidth(totalWidth);
	this.setHeight(this.font.height);
	
	// render the tmp canvas on the drawable canvas
	this.context.drawImage(tmpCanvas, this.drawX,this.drawY);
}
/*
For debugging
bt.Text.prototype.draw = function(x,y) {
	console.log("x:" + x);
	console.log("y:" + y);
	console.log("width"+ this.canvasWidth);
	console.log("height"+ this.canvasHeight);
	
	bt.game.context.drawImage(this.canvas, x-this.canvasWidth/2,y-this.canvasHeight/2 );
	
	bt.system.stop();
	
}*/
