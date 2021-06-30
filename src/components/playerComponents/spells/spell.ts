export default class Spell extends Phaser.Physics.Arcade.Sprite{
    readonly SPEED = 200
    readonly DIRECTIONS:{[index:number]:[x:number,y:number]} = {
        0:[0,-1],
        1:[1,0],
        2:[0,1],
        3:[-1,0]
    }

    textureKey:string
    scene:Phaser.Scene
    myDirection:number
    playerX:number
    playerY:number
    xSpeed!:number
    ySpeed!:number
    constructor(scene:Phaser.Scene,playerX:number, playerY:number,textureKey:string,direction:number){
        super(scene,playerX,playerY,textureKey)
        this.myDirection = direction

        this.textureKey = textureKey
        this.scene = scene
        this.playerX = playerX
        this.playerY = playerY
        this.myDirection = 0
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.addToUpdateList()
        this.addToDisplayList()
        this.body.reset(playerX,playerY)
        this.setActive(true)
        this.setVisible(true)
        switch(direction){
            case 3:
                this.setRotation(0)
                this.xSpeed = -100
                this.ySpeed = 0
                break;
            case 0:
                this.setRotation(1.5708)
                this.xSpeed = 0
                this.ySpeed = -100
                break;
            case 1:
                this.setRotation(3.14159)
                this.xSpeed = 100
                this.ySpeed = 0
                break;
            case 2:
                this.setRotation(4.71239)
                this.xSpeed = 0
                this.ySpeed = 100
                break;
        }
        this.play(textureKey)
    }   
    preUpdate(time:number,delta:number){
        super.preUpdate(time,delta)
        this.setVelocity(this.xSpeed,this.ySpeed)
    }
    Cast(x:number,y:number,direction:number){
       
    }
}