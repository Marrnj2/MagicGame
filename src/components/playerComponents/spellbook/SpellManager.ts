import { Player } from "../Player";
import BasicSpell from "../spells/basicspell";
import Spell from "../spells/spell";

export default class SpellManager{
    spells: Spell[]
    scene: Phaser.Scene

    constructor(scene:Phaser.Scene){
        this.spells = []
        this.scene = scene

    }
    CreateNewSlell(index:number,x:number,y:number){
        console.log("Create NEw Spell")
        let newSpell:any
        if(index === 0){
            newSpell =  new BasicSpell(this.scene,'Basic',x,y)
        }
        this.spells.push(newSpell)
        
    }
    Remove(){

    }
    MoveSpell(spell:Spell){
        spell.Move()
    }
    update(){
        this.spells.forEach(spell=>{
            this.MoveSpell(spell)
        })
    }
}