import {CST} from"../CST"
import { Player } from "./Player";
export class PlayScene extends Phaser.Scene{
    mage!:Phaser.Physics.Arcade.Sprite
    keyboard!: {[index:string] : Phaser.Input.Keyboard.Key};
    constructor(){
        super({
            key:CST.SCENES.PLAY
        })
    }

    preload(){
        this.anims.create({
            key:"left",
            frameRate:7,
            frames:this.anims.generateFrameNames("Mage",{
                start:10,
                end:17
            }),
            repeat: -1
        });
        this.anims.create({
            key:"right",
            frameRate:7,
            frames:this.anims.generateFrameNames("Mage",{
                start:27,
                end:37
            }),
            repeat: -1
        });
        this.anims.create({
            key:"up",
            frameRate:7,
            frames:this.anims.generateFrameNames("Mage",{
                start:1,
                end:8
            }),
            repeat: -1
            
        });
        this.anims.create({
            key:"down",
            frameRate:7,
            frames:this.anims.generateFrameNames("Mage",{
                start:19,
                end:26
            }),
            repeat: -1
        });
        this.anims.create({
            key:"idle",
            frameRate:1,
            frames:this.anims.generateFrameNames("Mage",{
                start:26,
                end:26
            }),
            repeat: -1
        });
        this.load.image("terrain","./assets/terrain.png")
        this.load.tilemapTiledJSON("map","./assets/map.json")
    }
    create(){
        let map = this.add.tilemap("map");
        let terrain = map.addTilesetImage("terrain","terrain");
        let ground = map.createLayer("Tile Layer 1",[terrain],0,0)
        let river = map.createLayer("Tile Layer 2", [terrain],0,0)
        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels)
        this.mage = new Player(this,map.width,map.height,"Mage",0)
        this.mage.setCollideWorldBounds(true)
        this.mage.setSize(45,52).setOffset(10,10)
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D")
        this.cameras.main.setSize(800,600);
        this.cameras.main.startFollow(this.mage)
        this.physics.add.collider(this.mage,ground)
        this.physics.add.collider(this.mage,river)
        river.setCollisionByProperty({collideable:true})
        
    }
    update(time:number,delta:number){
        if(this.keyboard.D.isDown === true){
            this.mage.setVelocityX(250)
        }
        if(this.keyboard.A.isDown === true){
            this.mage.setVelocityX(-250)
        }
        if(this.keyboard.W.isDown === true){
            this.mage.setVelocityY(-250)
        }
        if(this.keyboard.S.isDown === true){
            this.mage.setVelocityY(250)
        }
        if(this.keyboard.A.isUp && this.keyboard.D.isUp){
            this.mage.setVelocityX(0)
        }
        if(this.keyboard.W.isUp && this.keyboard.S.isUp){
            this.mage.setVelocityY(0)

        }
        this.mage.body.velocity.normalize().scale(100)
        if(this.mage.body.velocity.x > 0 || this.mage.body.velocity.x < 0 ||
             this.mage.body.velocity.y > 0 || this.mage.body.velocity.y < 0)
        {
            if(this.mage.body.velocity.x > 0){
                this.mage.play("right",true);
            }
            else if(this.mage.body.velocity.x < 0){
                this.mage.play("left",true);
            }
            if(this.mage.body.velocity.y < 0){
                this.mage.play("up",true);
            }
            else if(this.mage.body.velocity.y > 0){
                this.mage.play("down",true)
            }
        }else{
            this.mage.play("idle",true)
        }

    }
}      