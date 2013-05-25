/*
 Class:       bt.Scene
 extend:      object
 Description: Controlled by bt.Game it contain different layers
 */
bt.Scene = bt.class({
	constructor: function () {
		/*
		 structure
		 {
			'entities': {
				'bob': {
					class:bob,
					value: {
						x: 10, 
						y: 10
					}
				}, 
				'bob2': {
					class:bob,
					value: {
						x: 10, 
						y: 10
					}
				}, 
				'zombie': {
					class:zombie,
					value: {
						x: 10, 
						y: 10
					}
				}, 
				'sky': {
					class:sky,
					value: {
						x: 0, 
						y: 0
					}
				}, 
			}
		 }
		 */
		this.displayObject = new PIXI.DisplayObjectContainer();

		this.data = new Object();
		this.entities = [];
	},
	initialize: function() {
		// build entities

	},
	update: function() {
		// update function
		while ( i < this.entities.length ) {
			var that = this.entities[i];
			that.update();
			i++;
		}
		this.updateTime = Date.now()-startTime;
	},
	getEntitiesByType: function(type) {
		
		for ( var i = 0; i < this.entities.length; i++ ) {
			var e = this.entities[i]
			if ( e instanceof type ) {
				// push the required entity type to the result
				result.push(e);
			}
		}
		return result;
	},
	swapIndex: function(obj1, obj2) {
		var index1 = this.entities.indexOf(obj1);
		var index2 = this.entities.indexOf(obj2);
		this.entities[index1] = obj2;
		this.entities[index2] = obj1;
	},

});