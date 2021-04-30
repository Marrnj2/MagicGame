export default abstract class Spell{
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
    sprite:Phaser.Physics.Arcade.Sprite
    angle:number
    hitboxX:number
    hitboxY:number
    myDirection:number
    active:boolean
    constructor(scene:Phaser.Scene,name:string,playerX:number, playerY:number,direction:number){
        this.name = name
        this.scene = scene
        this.sprite = this.scene.physics.add.sprite(playerX,playerY,this.name)
        this.myDirection = direction
        this.sprite.play(name)

        if(this.myDirection % 2 === 0){
            this.angle = -90 * this.DIRECTIONS[this.myDirection][1]
            this.hitboxX = 10
            this.hitboxY = 70
        }else{
            this.angle = this.BOXVALUE[this.myDirection]
            this.hitboxX = 70
            this.hitboxY = 10
        }
        this.active = true
        this.sprite.setSize(this.hitboxX,this.hitboxY)
        this.sprite.setAngle(this.angle)
        let xSpeed = this.SPEED * this.DIRECTIONS[this.myDirection][0]
        let ySpeed = this.SPEED * this.DIRECTIONS[this.myDirection][1]
        this.sprite.setVelocityX(xSpeed)
        this.sprite.setVelocityY(ySpeed)
    }
   
    abstract Behavior() : any
    update(){
        this.Behavior()
    }
}