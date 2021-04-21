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
        this.load.spritesheet("FireBall","./assets/Fireball_68x9.png",{
            frameWidth:68,
            frameHeight:9
        })
    }
    create(){
        this.anims.create({
            key:"fireBall",
            frameRate:10,
            frames:this.anims.generateFrameNames("FireBall",{
                start:0,
                end:59
            }),
            repeat: -1
        });
        this.scene.start(CST.SCENES.MENU)
    }

}