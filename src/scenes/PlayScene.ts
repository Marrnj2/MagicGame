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

        let lWidth = 30;
        let lHeight = 20;
        let level = mapMaker.CreateArray(lWidth,lHeight)

        let rWidth = 10;
        let rHeight = 10;

        let room = mapMaker.CreateRoom(rWidth,rHeight);
        let newArray: any[] = [];
        for(var i = 0; i < room.length; i++)
        {
            newArray = newArray.concat(room[i]);
        }
        let maxPosition = (lWidth*lHeight) - (rWidth*rHeight);
        let roomPos = Math.floor(Math.random()*(maxPosition - 1));
        
        console.log(roomPos, newArray.length)
        roomPos = 5
        for(let i = roomPos; i < rWidth+roomPos; i ++){
            console.log(i - roomPos);
            for(let j = roomPos; j < rHeight+roomPos;j++){
                level[i+roomPos+j*( lWidth - rWidth)] = newArray[i +(j*rHeight) + roomPos]
            }
        }
        const newLevel = [];
        console.log(level)
        while(level.length) newLevel.push(level.splice(0,lHeight));
        console.log(newLevel)

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