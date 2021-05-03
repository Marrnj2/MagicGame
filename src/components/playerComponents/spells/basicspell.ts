import Spell from "./spell"

export default class BasicSpell extends Spell{
    readonly TRAVELDISTANCE = 10
    angle:number
    hitboxX:number
    hitboxY:number
    constructor(scene:Phaser.Scene,playerX:number,playerY:number,name:string,direction:number){
        super(scene,playerX,playerY,name,direction)

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
    }

    Behavior(){
        if (Phaser.Math.Distance.Between(this.x,this.y,this.playerX,this.playerY) > 100)
        {
            this.setActive(false)
            this.setVisible(false)
        }
    }
}