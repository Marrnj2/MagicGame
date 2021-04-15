import SpellBook from "./spellbook/spellbook";

export class Player extends Phaser.Physics.Arcade.Sprite{
    keyboard: Phaser.Types.Input.Keyboard.CursorKeys;
    spellbook:SpellBook
    constructor(scene:Phaser.Scene, x:number,y:number, textrue:string,
        keyboard:Phaser.Types.Input.Keyboard.CursorKeys,frame?:string | number){
        super(scene,x,y,textrue,frame);
        scene.add.existing(this)
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.add.existing(this)
        this.setOrigin(0,0)
        scene.physics.world.enableBody(this)
        this.setCollideWorldBounds(true)
        this.setSize(35,32).setOffset(15,30)
        this.keyboard = keyboard;
        this.spellbook = new SpellBook();

        this.preload()
    }
    preload(){
        console.log("Preload")
        this.create()
    }
    create(){
        this.anims.create({
            key:"left",
            frameRate:7,
            frames:this.anims.generateFrameNames("Mage",{
                start:10,
                end:17
            }),
            repeat: -1
        });
        this.anims.create({
            key:"right",
            frameRate:7,
            frames:this.anims.generateFrameNames("Mage",{
                start:27,
                end:37
            }),
            repeat: -1
        });
        this.anims.create({
            key:"up",
            frameRate:7,
            frames:this.anims.generateFrameNames("Mage",{
                start:1,
                end:8
            }),
            repeat: -1
            
        });
        this.anims.create({
            key:"down",
            frameRate:7,
            frames:this.anims.generateFrameNames("Mage",{
                start:19,
                end:26
            }),
            repeat: -1
        });
        this.anims.create({
            key:"idle",
            frameRate:1,
            frames:this.anims.generateFrameNames("Mage",{
                start:26,
                end:26
            }),
            repeat: -1
        });    

        this.scene.input.on('pointerdown',(pointer:any) =>{
            this.Casting()
        },this.scene)
        
    }

    update(){
        this.Movement()
    }
    Casting(){
      this.spellbook.CastCurrentSpell()
    }
    Movement() {
        if(this.keyboard.right.isDown === true){
            this.setVelocityX(250)
        }
        if(this.keyboard.left.isDown === true){
            this.setVelocityX(-250)
        }
        if(this.keyboard.up.isDown === true){
            this.setVelocityY(-250)
        }
        if(this.keyboard.down.isDown === true){
            this.setVelocityY(250)
        }
        if(this.keyboard.right.isUp && this.keyboard.left.isUp){
            this.setVelocityX(0)
        }
        if(this.keyboard.up.isUp && this.keyboard.down.isUp){
            this.setVelocityY(0)

        }
        this.body.velocity.normalize().scale(100)
        if(this.body.velocity.x > 0 || this.body.velocity.x < 0 ||
                this.body.velocity.y > 0 || this.body.velocity.y < 0)
        {
            if(this.body.velocity.x > 0){
                this.play("right",true);
            }
            else if(this.body.velocity.x < 0){
                this.play("left",true);
            }
            if(this.body.velocity.y < 0){
                this.play("up",true);
            }
            else if(this.body.velocity.y > 0){
                this.play("down",true)
            }
        }else{
            this.play("idle",true)
        }
    }
}