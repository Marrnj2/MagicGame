import {CST} from"../CST"
import { Player } from "./Player";
export class PlayScene extends Phaser.Scene{
    mage!:Phaser.Physics.Arcade.Sprite
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
        let map = this.add.tilemap("map");
        let terrain = map.addTilesetImage("terrain","terrain");
        let ground = map.createLayer("Tile Layer 1",[terrain],0,0)
        let river = map.createLayer("Tile Layer 2", [terrain],0,0)
        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels)
        
        let keyboard = this.input.keyboard.createCursorKeys()
        this.mage = new Player(this,map.width,map.height,"Mage",keyboard,0)
        this.cameras.main.setSize(800,600);
        this.cameras.main.startFollow(this.mage)
        this.physics.add.collider(this.mage,ground)
        this.physics.add.collider(this.mage,river)
        river.setCollisionByProperty({collideable:true})
        
    }
    update(time:number,delta:number){
      this.mage.update()

    }
}      