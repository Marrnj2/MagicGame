import {CST} from "../CST"
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key:CST.SCENES.MENU
        })
    }
    create(){
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.40,"play")
        playButton.setInteractive();
        this.scene.start(CST.SCENES.PLAY)

        playButton.on("pointerup",() =>{
            this.scene.start(CST.SCENES.PLAY)
        })
    }
}