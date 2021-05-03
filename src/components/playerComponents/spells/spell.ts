export default abstract class Spell extends Phaser.Physics.Arcade.Sprite{
    readonly SPEED = 100
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
    name:string
    scene:Phaser.Scene
    angle:number
    hitboxX:number
    hitboxY:number
    myDirection:number
    playerX:number
    playerY:number
    xSpeed:number
    ySpeed:number
    constructor(scene:Phaser.Scene,playerX:number, playerY:number,name:string,direction:number){
        super(scene,playerX,playerY,name)
        this.name = name
        this.scene = scene
        this.playerX = playerX
        this.playerY = playerY
        this.myDirection = direction
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.addToUpdateList()
        this.addToDisplayList()

        this.xSpeed = this.SPEED * this.DIRECTIONS[this.myDirection][0]
        this.ySpeed = this.SPEED * this.DIRECTIONS[this.myDirection][1]
        this.setVelocity(100,0)
        this.play(name)

    }   
    preUpdate(time:number,delta:number){
        super.preUpdate(time,delta);
        this.setVelocity(this.xSpeed,this.ySpeed)


    }
    abstract Behavior() : any
}