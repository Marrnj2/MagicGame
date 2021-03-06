import {CST} from"../CST"
import { Player } from "../components/playerComponents/Player";
import Walker from "../components/NPC/walker"
import Walkers from "../components/NPC/Walkers"

import MapGenerator from "../MapGenerator"
import BSP from "../BSP";
import Exit from "../components/exit/exit";
import { Container } from "../BSP/Container";
import Loot from "../components/NPC/loot";
import Loots from "../components/NPC/Loots";
export class PlayScene extends Phaser.Scene{
    readonly WALL = 510
    readonly tileSize = 16
    mage!:Player
    testEnemy!:Walker
    exit!:Exit
    healthText!:any
    scoreText!:any
    enemies!: Walkers;
    loots!:Loot[]
    // enemiesArray:Phaser.GameObjects.GameObject[]
    constructor(){
        super({
            key:CST.SCENES.PLAY,
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
        let rooms = bsp.leafs
        let spawnRoom =  Math.floor((Math.random() * rooms.length) + 0)
        let xPos = rooms[spawnRoom]["center"].x * this.tileSize
        let yPos = rooms[spawnRoom]["center"].y * this.tileSize
        this.mage = new Player(this,xPos,yPos,"Mage",keyboard)
        this.cameras.main.setSize(800,600);
        this.cameras.main.startFollow(this.mage)
        this.cameras.main.setBounds(0,0,80 * this.tileSize,this.tileSize * 80)
        this.physics.add.collider(this.mage,layer)
        let exitRoom =  Math.floor((Math.random() * rooms.length) + 0)
        xPos = rooms[exitRoom]["center"].x * this.tileSize
        yPos = rooms[exitRoom]["center"].y * this.tileSize
        this.exit = new Exit(this,xPos,yPos,"Portal",this.mage)
        
        this.enemies = new Walkers(this)
        rooms.forEach((room:Container) =>{
            let eCount =  Math.floor((Math.random() * 8))
            if(room != rooms[spawnRoom]){
                for(let e = 0; e < eCount;e++){
                    let randX =  Math.floor((Math.random() * (room.x + (room.w -1) - (room.x + 1))) + room.x +1)
                    let randY =  Math.floor((Math.random() * (room.y + (room.h -1) - (room.y + 1))) + room.y + 1)
                    let xPos = randX * this.tileSize
                    let yPos = randY * this.tileSize
                    let newEnemy = new Walker(this,xPos,yPos,"enemy",this.mage)
                    this.physics.add.collider(newEnemy,layer)
                    this.enemies.add(newEnemy)
                }
                let lCount =  Math.floor((Math.random() * 4))

                for(let l = 0; l <lCount; l++ ){
                    let randX =  Math.floor((Math.random() * (room.x + (room.w -1) - (room.x + 1))) + room.x +1)
                    let randY =  Math.floor((Math.random() * (room.y + (room.h -1) - (room.y + 1))) + room.y + 1)
                    let xPos = randX * this.tileSize
                    let yPos = randY * this.tileSize
                    let loot = new Loot(this,xPos,yPos,"Loot",this.mage)
                }
            }

        })
        this.physics.add.collider(
            this.enemies,
            this.mage.spellManager,
            function (enemy,spell) {
                enemy.destroy()
                spell.destroy()
                
            }
        )
        this.physics.add.collider(
            this.mage.spellManager,
            layer,
            function (spell) {
                spell.destroy()
            }
        )

        this.healthText = this.add.text(16, 16, `Health: ${this.mage.health}`, { fontSize: '32px' ,color:"#ffffff"});
        this.scoreText = this.add.text(16, 64, `Score: ${this.mage.score}`, { fontSize: '32px' ,color:"#ffffff"});

        this.healthText.setScrollFactor(0)
        this.scoreText.setScrollFactor(0)


    }

    update(time:number,delta:number){
        this.mage.update()
        this.exit.update()
        this.healthText.setText(`Health: ${this.mage.health}`)
        this.scoreText.setText(`Score: ${this.mage.score}`)

    }
}      
