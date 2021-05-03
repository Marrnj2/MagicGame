import Spell from "../spells/spell";

export default class SpellStratagy{
    spell: Spell
    constructor(spell: Spell){
        this.spell = spell;
    }
    setSpell(spell:Spell){
        this.spell = spell
    }
    Cast(playerX:number,playerY:number){
        return this.spell.Cast(playerX,playerY)
    }
}