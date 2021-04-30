import { NONE } from "phaser";
import { Player } from "../Player";
import BasicSpell from "../spells/basicspell";
import Spell from "../spells/spell";

export default class SpellManager extends Phaser.Physics.Arcade.Group{
    spells: Spell[]
    scene: Phaser.Scene

    constructor(world:Phaser.Physics.Arcade.World,scene:Phaser.Scene){
        super(world,scene)
        this.spells = []
        this.scene = scene

    }
    CreateNewSlell(index:number,x:number,y:number,direction:number){
        console.log("Create NEw Spell")
        let newSpell:any
        if(index === 0){
            // newSpell =  new BasicSpell(this.scene,'fireBall',x,y,direction)
            this.create(

            )
        }
        this.spells.push(newSpell)
        
    }
    Remove(){

    }

    update(){
        this.spells.forEach(spell=>{
            if(spell.active == false){

            }else{
                spell.update()
            }
        })
    }
}