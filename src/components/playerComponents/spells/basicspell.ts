import Spell from "./spell"

export default class BasicSpell extends Spell{
    readonly TRAVELDISTANCE = 10
    playerX:number
    playerY:number
    constructor(scene:Phaser.Scene,name:string,playerX:number,playerY:number,direction:number){
        super(scene,name,playerX,playerY,direction)
        this.playerX = playerX
        this.playerY = playerY
    }

    Behavior(){
     
    }
}