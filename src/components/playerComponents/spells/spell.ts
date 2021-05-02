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
    constructor(scene:Phaser.Scene,name:string,playerX:number, playerY:number,direction:number){
        super(scene,playerX,playerY,name)
        this.name = name
        this.scene = scene
        scene.add.existing(this)
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.add.existing(this)
        scene.physics.world.enableBody(this)
        this.playerX = playerX
        this.playerY = playerY
        this.myDirection = direction

        if(this.myDirection % 2 === 0){
            this.angle = -90 * this.DIRECTIONS[this.myDirection][1]
            this.hitboxX = 10
            this.hitboxY = 70
        }else{
            this.angle = this.BOXVALUE[this.myDirection]
            this.hitboxX = 70
            this.hitboxY = 10
        }
        this.setSize(this.hitboxX,this.hitboxY)
        this.setAngle(this.angle)
        let xSpeed = this.SPEED * this.DIRECTIONS[this.myDirection][0]
        let ySpeed = this.SPEED * this.DIRECTIONS[this.myDirection][1]
        this.setVelocityX(xSpeed)
        this.setVelocityY(ySpeed)
        this.play(name)

    }
    preUpdate(time:number,delta:number){
        super.preUpdate(time,delta);
        console.log("preUpdate")
    }
    abstract Behavior() : any
    update(time:number,delta:number){
        super.update(time,delta);
        console.log("update")

    }
}