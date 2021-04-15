import Spell from "./spell"

export default class BasicSpell extends Spell{
    constructor(name:string){
        super(name)
    }
    Cast(){
        console.log(this.name)
    }
}