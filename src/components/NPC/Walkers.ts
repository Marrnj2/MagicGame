import Walker from "./walker"

export default class Walkers extends Phaser.Physics.Arcade.Group{
    constructor(scene:Phaser.Scene){
        super(scene.physics.world,scene)

    }
}