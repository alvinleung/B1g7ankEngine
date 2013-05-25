/*
 @Class bt.AssetLoader
 @Extends PIXI.AssetLoader
 */
bt.AssetLoader = bt.class(PIXI.AssetLoader , function() {

	constructor: function(assetURLs) {

		// call the parent constructor
		bt.parent(this, assetURLs);

	}
	//TODO: Implement Audio loadings
})