export default class Loots extends Phaser.Physics.Arcade.Group{
    constructor(scene:Phaser.Scene){
        super(scene.physics.world,scene)
        this.defaultKey = "Loots"
    }
}