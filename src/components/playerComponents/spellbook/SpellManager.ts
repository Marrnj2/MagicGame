import BasicSpell from "../spells/basicspell";
import Spell from "../spells/spell";

export default class SpellManager extends Phaser.Physics.Arcade.Group{
    scene: Phaser.Scene

    constructor(scene:Phaser.Scene){
        super(scene.physics.world,scene)
        this.scene = scene
        this.createMultiple({
            classType:BasicSpell,
            frameQuantity:2,
            active:false,
            visible:false,
            key:"basicSpell"
        })

    }
    CreateNewSlell(index:number,x:number,y:number,direction:number){
        let spell = this.getFirstDead(false);
        if(spell){
            spell.Cast(x,y,direction)
        }
    }
    Remove(){

    }

    update(){        
        
    }
}