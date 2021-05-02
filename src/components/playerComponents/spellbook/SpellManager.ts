import BasicSpell from "../spells/basicspell";

export default class SpellManager extends Phaser.Physics.Arcade.Group{
    scene: Phaser.Scene

    constructor(scene:Phaser.Scene){
        super(scene.physics.world,scene)
        this.scene = scene

    }
    CreateNewSlell(index:number,x:number,y:number,direction:number){
        let spell = new BasicSpell(this.scene,"fireBall",x,y,direction)
        this.add(spell)
    }
    Remove(){

    }

    update(){        
        
    }
}