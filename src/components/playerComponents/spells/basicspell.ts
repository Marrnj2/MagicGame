import Spell from "./spell"

export default class BasicSpell extends Spell{
    constructor(scene:Phaser.Scene,name:string,playerX:number,playerY:number,direction:number){
        super(scene,name,playerX,playerY,direction)
    }

}