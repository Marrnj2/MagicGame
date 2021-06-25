import {CST} from"../CST"
import { Player } from "../components/playerComponents/Player";
import Walker from "../components/NPC/walker"
import MapGenerator from "../MapGenerator"
import BSP from "../BSP";
import Exit from "../components/exit/exit";
export class PlayScene extends Phaser.Scene{
    readonly WALL = 510
    readonly tileSize = 16
    mage!:Player
    testEnemy!:Walker
    exit!:Exit
    healthText!:any
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
        let bsp = new BSP();
        let world = bsp.BSPController();

        var map = this.make.tilemap({ data: world, tileWidth: this.tileSize, tileHeight: this.tileSize });
        var tiles = map.addTilesetImage('terrain');
        var layer = map.createLayer(0, tiles, 0, 0);
        layer.setCollision(this.WALL,true);
        let terrain = map.addTilesetImage("terrain","terrain");
        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels)
        let keyboard = this.input.keyboard
        this.mage = new Player(this,map.width,map.height,"Mage",keyboard)
        this.cameras.main.setSize(800,600);
        this.cameras.main.startFollow(this.mage)
        this.cameras.main.setBounds(0,0,80 * this.tileSize,this.tileSize * 80)
        this.physics.add.collider(this.mage,layer)
        let rooms = bsp.leafs
        let exitRoom =  Math.floor((Math.random() * rooms.length) + 0)
        console.log(rooms[exitRoom])
        console.log(rooms[exitRoom]["center"].x,rooms[exitRoom]["center"].y)
        let xPos = rooms[exitRoom]["center"].x * this.tileSize
        let yPos = rooms[exitRoom]["center"].y * this.tileSize
        this.exit = new Exit(this,xPos,yPos,"Mage",this.mage)
        this.healthText = this.add.text(16, 16, `Health: ${this.mage.health}`, { fontSize: '32px' ,color:"#ffffff"});
        this.healthText.setScrollFactor(0)
        this.testEnemy = new Walker(this,150,150,"enemy",this.mage)
        this.physics.add.collider(this.testEnemy,layer)

    }
    update(time:number,delta:number){
      this.mage.update()
      this.testEnemy.update()
      this.exit.update()
        this.healthText.setText(`Health: ${this.mage.health}`)
    }
}      