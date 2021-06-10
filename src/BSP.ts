// First Create world X,Y Tiles 
// Pick Random Point and Axis to split on 
// On That Axis and point SPlit
// Store Partitions
// On each Partition Pick Random Point and Axis to split on 
import { Renderer } from "phaser"
import {BinaryTree} from "./BSP/BinaryTree"
import { Container } from "./BSP/Container"
import { TreeNode } from "./BSP/TreeNode"
export default class BSP{
    readonly minSize = 6
    width:number = 50
    height:number = 50
    roomCount:number
    constructor(){
        this.width = 80
        this.height = 80
        this.roomCount = 0
 
    }
    BSPController(){
        let rootContainer = new Container(0,0,this.width,this.height)
        let rooms:Container[] = []
        let root = this.SplitDirection(rootContainer,3)
        let tree = new BinaryTree(root)
        tree.preOrder(rooms)
        let world:any  = this.CreateWorld(this.width,this.height)
        console.log(world)
        rooms.forEach(room =>{
            // for(let i = 0; i < rHeight; i ++){
            //     for(let j = 0; j < rWidth;j++){
            //         let index = roomPos + (lWidth * i)+ j
            //         gameWorld[index] = newArray[(rWidth * i)+ j]
            //     }
            // }510
            let roomPos = (room.y * this.width) + room.x
            console.log(roomPos)
            // for(let x = room.x; x < room.x + room.w; x ++){
            //     world[roomPos + x] = 510
            //     // world[(roomPos + x) + (this.width * (room.h - 1))] = 510
            //     // for(let y = room.y; y < room.y + room.h;y++){
            //     //     let index = roomPos + (this.width * y)
            //     //     world[index] = 510
            //     //     world[index + room.w - 1] = 510
            //     // }
            // }
            for(let i = 0; i < room.w; i++){
                world[roomPos + i] = 510
                world[(roomPos + i) + (this.width * (room.h - 1))] = 510
                for(let j = 0; j < room.h; j++){
                    let index = roomPos + (this.width * j)
                    world[index] = 510
                    world[index + room.w - 1] = 510
                }
            }
        })
        let cWorld:any = []
        while(world.length){
            cWorld.push(world.splice(0,this.width))
        }
        return cWorld
    }
    SplitDirection(container:Container,iterations:number){
        let node = new TreeNode(container)
        if(iterations != 0){
            let rand = Math.floor((Math.random() * 100) + 0)
            if( rand % 2 == 0){
                let splits = this.WorldCopyX(container)
                node.left = this.SplitDirection(splits[0],iterations-1)
                node.right = this.SplitDirection(splits[1],iterations-1)

            }
            else{
                let splits = this.WorldCopyY(container)
                node.left = this.SplitDirection(splits[0],iterations-1)
                node.right = this.SplitDirection(splits[1],iterations-1)

            }
        }

        return node
    }
    WorldCopyX(container:Container){
        console.log("Split X")
        console.log("CW",container.w)
        let min = Math.floor(container.w * 0.40);
        let max = Math.floor(container.w * 0.70); 

        console.log("min",min)
        console.log("max",max)

        let splitOn:number = Math.floor(Math.random() * (max - min) + min);
        let remainder = (container.w - splitOn)
        // for(let i = 0; i < node.container.length; i += tilesToSkip){
    
        //     a = node.container.slice(i,(i + splitOn))
        //     b = node.container.slice(i + splitOn,(i+ splitOn + tilesToSkip))
        // }
        console.log("Rem",remainder)
        console.log("Split",splitOn)
    
        let containerL = new Container(container.x,container.y,container.w - remainder, container.h)
        let containerR = new Container(container.x + splitOn,container.y,container.w  - splitOn, container.h)
        console.log("L",containerL)
        console.log("R",containerR)
        if(containerL.w < this.minSize || containerR.w < this.minSize){
            console.log("Invalid")
            return this.WorldCopyX(container)
        
        }else{
            return [containerL,containerR]
        }
        

    }
    WorldCopyY(container:Container){
        console.log("Split Y")
        console.log("CH",container.h)
        let min = Math.floor(container.h * 0.30);
        let max = Math.floor(container.h * 0.70); 
        console.log("min",min)
        console.log("max",max)

        let splitOn:number = Math.floor(Math.random() * (max - min) + min);
        let remainder = (container.h - splitOn)
   
        // for(let i = 0; i < node.container.length; i += tilesToSkip){
    
        //     a = node.data.slice(i,(i + splitOn))
        //     b = node.data.slice(i + splitOn,(i+ splitOn + tilesToSkip))

        // }
        let containerL = new Container(container.x,container.y,container.w,  container.h - remainder)
        let containerR = new Container(container.x,container.y + splitOn ,container.w , container.h - splitOn )
        console.log("L",containerL)
        console.log("R",containerR)
        if(containerL.h < this.minSize || containerR.h < this.minSize){
            console.log("Invalid")
            return this.WorldCopyY(container)
        }else{
            return [containerL,containerR]
        }
   
    }
  

    CreateWorld(width:number,height:number){
        var level:number[] = [];
        for(let i = 0; i < width; i++){
            for(let j = 0; j < height; j++){
                level.push(1140)
            }
        }   
        return level
    }

}