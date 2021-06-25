import { PlayScene } from "../../scenes/PlayScene"
import { Player } from "../playerComponents/Player"

export default class Walker extends Phaser.Physics.Arcade.Sprite{
    player:Player
    private readonly STATES = [
        "IDLE",
        "CHASE"
    ]
    constructor(scene:Phaser.Scene, x:number,y:number, texture:string,player:Player){
        super(scene,x,y,texture)
        this.scene = scene
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.addToUpdateList()
        this.addToDisplayList()
        this.player = player
        this.play("down")
    }

    update(){
        let playerBody = this.player.GetBody()
        if(Phaser.Math.Distance.BetweenPoints(this.body,playerBody) < 300){
            this.scene.physics.moveToObject(this,playerBody,50)
        }else{
            this.scene.physics.moveToObject(this,playerBody,0)
        }
        if(Phaser.Math.Distance.BetweenPoints(this.body,playerBody) < 25){
            this.player.health -= 1
        }
    }
}