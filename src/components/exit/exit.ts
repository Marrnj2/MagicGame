import { Player } from "../playerComponents/Player"

export default class Exit extends Phaser.Physics.Arcade.Sprite{
    player:Player

    constructor(scene:Phaser.Scene, x:number,y:number, texture:string,player:Player){
        super(scene,x,y,texture)
        this.scene = scene
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.addToUpdateList()
        this.addToDisplayList()
        this.player = player
    }

    update(){
        let playerBody = this.player.GetBody()
        if(Phaser.Math.Distance.BetweenPoints(this.body.center,playerBody.center) <= 25){
            this.scene.scene.restart()
        }
    }
}