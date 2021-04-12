export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene:Phaser.Scene, x:number,y:number, textrue:string,frame?:string | number){
        super(scene,x,y,textrue,frame);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.setOrigin(0,0)
        scene.physics.world.enableBody(this)
        this.setCollideWorldBounds(true)
        this.setSize(45,52).setOffset(10,10)
    }
}