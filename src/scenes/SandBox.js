import Phaser from 'phaser'

export default class SandBox extends Phaser.Scene
{
	constructor()
	{
        
		super('sand-box')
	}

	preload()
    {
       this.load.image('tiles','src/assets/tilemaps/tiles/mapimage.png');
       this.load.tilemapTiledJSON('map','./assets/tilemaps/maps/testmap.json');
    }

    create()
    {
       let map = this.make.tilemap({key:'map'});
       let tiles = map.addTilesetImage('mapimage','tiles');
       let layer = map.createLayer(0,tiles,0,0);
       
    }
}
