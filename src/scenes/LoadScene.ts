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
        this.load.spritesheet("enemy","/assets/enemy.png",{
            frameWidth:32,
            frameHeight:32
        })
        this.load.spritesheet("Mage","./assets/mage.png",{
            frameWidth:64,
            frameHeight:64
        })
        this.load.spritesheet("FireBall","./assets/Fireball_68x9.png",{
            frameWidth:68,
            frameHeight:9
        })
        this.load.spritesheet("EarthBall","./assets/EarthBall.png",{
            frameWidth:48,
            frameHeight:48
        })
        this.load.image("IceBall","./assets/IceBall.png")
        this.load.spritesheet("Portal","./assets/Portal.png",{
            frameWidth:32,
            frameHeight:32
        })
        
    }
    create(){
        this.anims.create({
            key:"EarthBall",
            frameRate:10,
            frames:this.anims.generateFrameNames("EarthBall",{
                start:0,
                end:12
            }),
            repeat: -1
        });
        this.anims.create({
            key:"Portal",
            frameRate:10,
            frames:this.anims.generateFrameNames("Portal",{
                start:0,
                end:16
            }),
            repeat: -1
        });
        this.anims.create({
            key:"FireBall",
            frameRate:10,
            frames:this.anims.generateFrameNames("FireBall",{
                start:0,
                end:59
            }),
            repeat: -1
        });
        this.scene.start(CST.SCENES.MENU)
        this.anims.create({
            key:"down",
            frameRate:1,
            frames:this.anims.generateFrameNames("enemy",{
                start:0,
                end:2
            }),
            repeat: -1
        })
        this.anims.create({
            key:"left",
            frameRate:1,
            frames:this.anims.generateFrameNames("enemy",{
                start:3,
                end:5
            }),
            repeat: -1
        })
        this.anims.create({
            key:"right",
            frameRate:1,
            frames:this.anims.generateFrameNames("enemy",{
                start:7,
                end:9
            }),
            repeat: -1
        })
        this.anims.create({
            key:"up",
            frameRate:1,
            frames:this.anims.generateFrameNames("enemy",{
                start:10,
                end:12
            }),
            repeat: -1
        })
    }

}