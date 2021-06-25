import BasicSpell from "../spells/basicspell";
import Spell from "../spells/spell";

export default class SpellManager extends Phaser.Physics.Arcade.Group{
    scene: Phaser.Scene
    constructor(scene:Phaser.Scene){
        super(scene.physics.world,scene)
        this.scene = scene

       

    }
    CreateNewSpell(index:number,x:number,y:number,direction:number){
        let spellList = [
            new BasicSpell(this.scene,0,0,"FireBall",0),
            new BasicSpell(this.scene,0,0,"IceBall",0),
            new BasicSpell(this.scene,0,0,"EarthBall",0)
        ]
        let spell = spellList[index]
            spell.Cast(x,y,direction)
        
    }
    Remove(){

    }

    update(){        
        
    }
}