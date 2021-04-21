export default class Spell{
    name:string
    scene: Phaser.Scene
    sprite: Phaser.Physics.Arcade.Sprite

    constructor(scene:Phaser.Scene,name:string,playerX:number, playerY:number){
        this.name = name
        this.scene = scene
        this.sprite = this.scene.physics.add.sprite(playerX,playerY,this.name)
        this.sprite.play("fireBall")

    }
    Move(){
        this.sprite.setVelocityX(-50)
    }
}