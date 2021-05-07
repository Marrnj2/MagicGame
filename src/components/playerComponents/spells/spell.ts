export default abstract class Spell extends Phaser.Physics.Arcade.Sprite{
    readonly SPEED = 200
    readonly DIRECTIONS:{[index:number]:[x:number,y:number]} = {
        0:[0,-1],
        1:[1,0],
        2:[0,1],
        3:[-1,0]
    }
    readonly BOXVALUE:{[index:number]:number} = {
        1:180,
        3:0
    }

    textureKey:string
    scene:Phaser.Scene
    myDirection:number
    playerX:number
    playerY:number
    xSpeed:number
    ySpeed:number
    constructor(scene:Phaser.Scene,playerX:number, playerY:number,textureKey:string,direction:number){
        super(scene,playerX,playerY,textureKey)
        this.textureKey = textureKey
        this.scene = scene
        this.playerX = playerX
        this.playerY = playerY
        this.myDirection = 0
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.addToUpdateList()
        this.addToDisplayList()
        this.xSpeed = this.SPEED * this.DIRECTIONS[this.myDirection][0]
        this.ySpeed = this.SPEED * this.DIRECTIONS[this.myDirection][1]
        this.play(textureKey)
    }   
    preUpdate(time:number,delta:number){
        super.preUpdate(time,delta)
        this.setVelocity(this.xSpeed,this.ySpeed)
    }
    Cast(x:number,y:number,direction:number){
        this.myDirection = direction
        this.xSpeed = this.SPEED * this.DIRECTIONS[this.myDirection][0]
        this.ySpeed = this.SPEED * this.DIRECTIONS[this.myDirection][1]
        this.body.reset(x,y)
        this.setActive(true)
        this.setVisible(true)
        this.setVelocityX(this.xSpeed)
        this.setVelocityY(this.ySpeed)
    }
    abstract Behavior() : any
}