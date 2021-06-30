import Spell from "../spells/spell";

export default class SpellManager extends Phaser.Physics.Arcade.Group{
    scene: Phaser.Scene

    constructor(scene:Phaser.Scene){
        super(scene.physics.world,scene)
        this.scene = scene
        this.defaultKey = "spells"
    }
    CreateNewSpell(index:number,x:number,y:number,direction:number){
        let spell:Spell
        switch(index){
            case 0:
                spell = new Spell(this.scene,x,y,"FireBall",direction)
            break
            case 1:
                spell = new Spell(this.scene,x,y,"EarthBall",direction)
            break;
        }
        this.add(spell!)
        
    }
}