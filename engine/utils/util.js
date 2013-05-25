/*
 * JAVASCRIPT EXTENSION
 * 
 * Core function extension
 * Browser Prefix handle
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
Function.prototype.bindScope = function(scope) {
	var _function = this;
	return function() {
		return _function.apply(scope, arguments);
	}
}
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
/*
 * 
 * OBJECT ORIENTED PROGRAMMING HELPER
 * this part of the code is mostly resembled the google implementation
 * bt.class is added to simplify the procecss of creating a class
 *
 * Syantax
 *   bt.inherits ( child, parent );
 *   bt.parent   (); // no arguments for calling the parent constructor
 *   bt.parent   (this, "methodname", ["arg1", "arg2"]);
 *   bt.class(class)
 *   bt.class(parent, child)
 *   bt.merge ( obj1, obj2 );
 * 
 */
/**
 * Extend the parent class with the child class
 *
 * @param  childCtor  the child constructor
 * @param  parentCtor parent constructor
 * @return void
 */
bt.inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  childCtor.prototype.constructor = childCtor;
};
/**
 * Call the parent class's method
 *
 * @param  me             the child class (this argument should always pass in "this")
 * @param  opt_methodName target method name
 * @param  var_args       arguments(optional)
 * @return the return value of the parent method
 */
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
/**
 * This function will create a class for you. If only one Object is provided,
 * the operation will identified as "extending a class". If two Object is provided,
 * the operation will identified as "creating a class"
 *
 * @param  parent the parent class
 * @param  child  the child class
 * @return constructor
 */
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
/**
 * Initialize and setup a canvas element
 *
 * @param  width  Specifies the width of the canvas. Measured in pixel
 * @param  height Specifies the height of the canvas. Measured in pixel
 * @return canvas
 */
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