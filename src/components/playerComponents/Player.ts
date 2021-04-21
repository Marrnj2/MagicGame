import SpellBook from "./spellbook/spellbook";
import SpellManager from "./spellbook/SpellManager";
import BasicSpell from "./spells/basicspell";
import Spell from "./spells/spell";

export class Player extends Phaser.Physics.Arcade.Sprite{
    keyboard: Phaser.Input.Keyboard.KeyboardPlugin
    spellManager:SpellManager;
    currentSpell: number
    constructor(scene:Phaser.Scene, x:number,y:number, textrue:string,
        keyboard:Phaser.Input.Keyboard.KeyboardPlugin,frame?:string | number){
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

        this.spellManager = new SpellManager(this.scene);
        this.keyboard.addKeys('W,A,S,D,ONE,TWO,THREE');
        this.currentSpell = 0

        this.preload()
    }
    preload(){
        console.log("Preload")
        this.create()
    }
    create(){
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
            key:"idle-up",
            frameRate:1,
            frames:this.anims.generateFrameNames("Mage",{
                start:0,
                end:0
            }),
            repeat: -1
        });
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
            key:"idle-left",
            frameRate:1,
            frames:this.anims.generateFrameNames("Mage",{
                start:9,
                end:9
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
            key:"idle-down",
            frameRate:1,
            frames:this.anims.generateFrameNames("Mage",{
                start:18,
                end:18
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
            key:"idle-right",
            frameRate:1,
            frames:this.anims.generateFrameNames("Mage",{
                start:27,
                end:27
            }),
            repeat: -1
        });
        this.scene.input.on('pointerdown',(pointer:any) =>{
            this.Casting()
        },this.scene)


        this.keyboard.on('keydown-ONE',()=>{
            this.currentSpell = 0
        })
        this.keyboard.on('keydown-TWO',()=>{
            this.currentSpell = 1
        })
        this.keyboard.on('keydown-THREE',()=>{
            this.currentSpell = 2
        })
        this.keyboard.on('keydown-D',()=>{
            this.setVelocityX(250)
        },this)
        this.keyboard.on('keyup-D',()=>{
            this.setVelocityX(0)
            this.play('idle-right',true)

        },this)
        this.keyboard.on('keydown-A',() =>{
            this.setVelocityX(-250)
        },this)
        this.keyboard.on('keyup-A',()=>{
            this.setVelocityX(0)
            this.play('idle-left',true)

        },this)
        this.keyboard.on('keydown-W',() =>{
            this.setVelocityY(-250)
        })
        this.keyboard.on('keyup-W',()=>{
            this.setVelocityY(0)
            this.play('idle-up',true)
        },this)
        this.keyboard.on('keydown-S',()=>{
            this.setVelocityY(250)
        })
        this.keyboard.on('keyup-S',()=>{
            this.setVelocityY(0)
            this.play('idle-down',true)

        },this)
    }

    update(){
        this.Movement()
        this.ChangeSpell()
        this.spellManager.update()
    }
    ChangeSpell(){
       
    }
    Casting(){
        this.spellManager.CreateNewSlell(this.currentSpell,this.body.x,this.body.y)
    }
    Movement() {

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
        }
        
    }
}


