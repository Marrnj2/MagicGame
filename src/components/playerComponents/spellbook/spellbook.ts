import BasicSpell from "../spells/basicspell"
import Spell from "../spells/spell"
import SpellStratagy from "./spellstratagy"
export default class SpellBook{
    spellStratagy:SpellStratagy
    spellbook: {[name:string]:Spell}

    constructor(){
        let basicSpell = new BasicSpell("Basic Spell");
        this.spellbook = {
            "Basic": new BasicSpell("Basic")
        };
        this.spellStratagy = new SpellStratagy(this.spellbook["Basic"])
    }
    CastCurrentSpell(){
          this.spellStratagy.Cast();  
    }
}