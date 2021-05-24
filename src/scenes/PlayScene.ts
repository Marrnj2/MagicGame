import {CST} from"../CST"
import { Player } from "../components/playerComponents/Player";
import Walker from "../components/NPC/walker"
import MapGenerator from "../MapGenerator"
export class PlayScene extends Phaser.Scene{
    mage!:Player
    testEnemy!:Walker
    constructor(){
        super({
            key:CST.SCENES.PLAY
        })
    }

    preload(){
        this.load.image("terrain","./assets/terrain.png")
        this.load.tilemapTiledJSON("map","./assets/map.json")
    }
    create(){
        let mapMaker = new MapGenerator();
        let newLevel = mapMaker.General()
        // When loading from an array, make sure to specify the tileWidth and tileHeight
        var map = this.make.tilemap({ data: newLevel, tileWidth: 16, tileHeight: 16 });
        var tiles = map.addTilesetImage('terrain');
        var layer = map.createLayer(0, tiles, 0, 0);
        // let map = this.add.tilemap("map");
        let terrain = map.addTilesetImage("terrain","terrain");
        // let ground = map.createLayer("Tile Layer 1",[terrain],0,0)
        // let river = map.createLayer("Tile Layer 2", [terrain],0,0)
        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels)
        let keyboard = this.input.keyboard
        this.mage = new Player(this,map.width,map.height,"Mage",keyboard)
        this.cameras.main.setSize(800,600);
        this.cameras.main.startFollow(this.mage)
        // this.physics.add.collider(this.mage,ground)
        // this.physics.add.collider(this.mage,river)
        
        // river.setCollisionByProperty({collideable:true})
        this.testEnemy = new Walker(this,150,150,"enemy",this.mage)
        // this.physics.add.collider(this.testEnemy,ground)
        // this.physics.add.collider(this.testEnemy,river)

    }
    update(time:number,delta:number){
      this.mage.update()
      this.testEnemy.update()
    }
}      