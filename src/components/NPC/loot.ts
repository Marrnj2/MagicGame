import { PlayScene } from "../../scenes/PlayScene"
import { Player } from "../playerComponents/Player"

export default class Loot extends Phaser.Physics.Arcade.Sprite{
    player:Player

    constructor(scene:Phaser.Scene, x:number,y:number, texture:string,player:Player){
        super(scene,x,y,texture)
        this.scene = scene
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.addToUpdateList()
        this.addToDisplayList()
        this.player = player
        this.anims.play(texture)
    }

    preUpdate(){
        let playerBody = this.player.GetBody()
        if(Phaser.Math.Distance.BetweenPoints(this.body,playerBody) < 30){
            this.player.score +=100
            this.visible = false
            this.active = false
        }

    }
}