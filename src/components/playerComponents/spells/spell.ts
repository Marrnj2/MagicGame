export default class Spell extends Phaser.Physics.Arcade.Sprite{
    readonly SPEED = 200

    textureKey:string
    scene:Phaser.Scene
    xSpeed!:number
    ySpeed!:number
    constructor(scene:Phaser.Scene,playerX:number, playerY:number,textureKey:string,direction:number){
        super(scene,playerX,playerY,textureKey)

        this.textureKey = textureKey
        this.scene = scene
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.addToUpdateList()
        this.addToDisplayList()
        this.setActive(true)
        this.setVisible(true)
        switch(direction){
            case 3:
                this.setRotation(0)
                this.xSpeed = -200
                this.ySpeed = 0
                break;
            case 0:
                this.setRotation(1.5708)
                this.xSpeed = 0
                this.ySpeed = -200

                break;
            case 1:
                this.setRotation(3.14159)
                this.xSpeed = 200
                this.ySpeed = 0
                break;
            case 2:
                this.setRotation(4.71239)
                this.xSpeed = 0
                this.ySpeed = 200
                break;
        }
    
        this.play(textureKey)
        
    }   
    preUpdate(time:number,delta:number){
        super.preUpdate(time,delta)
        this.setVelocity(this.xSpeed,this.ySpeed)
    }
}