import {CST} from"../CST"
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key:CST.SCENES.LOAD
        })
    }

    preload(){
        this.load.image("play","./assets/play_button.png")
        this.load.image("options","options_button.png")
        this.load.spritesheet("Mage","./assets/mage.png",{
            frameWidth:64,
            frameHeight:64
        })
        
    }
    create(){
        this.scene.start(CST.SCENES.MENU)
    }

}