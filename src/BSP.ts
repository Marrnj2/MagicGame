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
    readonly GROUND = 300
    readonly WALL = 510
    readonly minSize = 6
    readonly HEIGHT = 80
    readonly WIDTH = 80
    width:number
    height:number
    roomCount:number
    world:any
    leafs:any[]
    constructor(){
        this.width = this.WIDTH
        this.height = this.HEIGHT
        this.roomCount = 0
        this.world = 0
        this.leafs = []
    }
    BSPController(){
        let rootContainer = new Container(0,0,this.width,this.height)
        let rooms:Container[] = []
        let root = this.SplitDirection(rootContainer,3)
        let tree = new BinaryTree(root)
        tree.preOrder(rooms)
        this.world = this.CreateWorld(this.width,this.height)
        rooms.forEach(room =>{
            let roomPos = (room.y * this.width) + room.x
            for(let i = 0; i < room.w; i++){
                this.world[roomPos + i] = this.WALL
                this.world[(roomPos + i) + (this.width * (room.h - 1))] = this.WALL
                for(let j = 0; j < room.h; j++){
                    let index = roomPos + (this.width * j)
                    this.world[index] = this.WALL
                    this.world[index + room.w - 1] = this.WALL
                }
            }
        })
        this.leafs = rooms
        this.PostOrderTraversal(tree.root)
        let cWorld:any = []
        while(this.world.length){
            cWorld.push(this.world.splice(0,this.width))
        }
        return cWorld
    }

    PostOrderTraversal(node:TreeNode){
        if(node != undefined){
            this.PostOrderTraversal(node.left)
            this.PostOrderTraversal(node.right)
            if(node.left != undefined && node.right != undefined){
                this.ConnectContainers(node.left,node.right)
            }
        }
    }
    ConnectContainers(nodeLeft:TreeNode,nodeRight:TreeNode){
        if (nodeLeft.container.center.x < nodeRight.container.center.x){
            for(let x = nodeLeft?.container.center.x; x <= nodeRight.container.center.x; x++){
                let xPos =  nodeLeft.container.center.y * this.width + x
                let xPosPad =  (nodeLeft.container.center.y + 1) * this.width + x
                this.world[xPos] = this.GROUND
                this.world[xPosPad] = this.GROUND

            }
        }
        if(nodeLeft.container.center.y < nodeRight.container.center.y){
            for(let y = nodeLeft?.container.center.y; y <= nodeRight.container.center.y; y++){
                let yPos =  y * this.width + nodeLeft.container.center.x
                let yPosPad =  y * this.width + nodeLeft.container.center.x + 1

                this.world[yPos] = this.GROUND
                this.world[yPosPad] = this.GROUND

            }
        }
    }
    GetXY(x:number,y:number){
        let xPos =  y * this.width + x

        return xPos
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
        let min = Math.floor(container.w * 0.40);
        let max = Math.floor(container.w * 0.70); 
        let splitOn:number = Math.floor(Math.random() * (max - min) + min);
        let remainder = (container.w - splitOn)
        let containerL = new Container(container.x,container.y,container.w - remainder, container.h)
        let containerR = new Container(container.x + splitOn,container.y,container.w  - splitOn, container.h)
        if(containerL.w < this.minSize || containerR.w < this.minSize){
            return this.WorldCopyX(container)
        }else{
            return [containerL,containerR]
        }
        

    }
    WorldCopyY(container:Container){
        let min = Math.floor(container.h * 0.30);
        let max = Math.floor(container.h * 0.70); 
        let splitOn:number = Math.floor(Math.random() * (max - min) + min);
        let remainder = (container.h - splitOn)
        let containerL = new Container(container.x,container.y,container.w,  container.h - remainder)
        let containerR = new Container(container.x,container.y + splitOn ,container.w , container.h - splitOn )
        if(containerL.h < this.minSize || containerR.h < this.minSize){
            return this.WorldCopyY(container)
        }else{
            return [containerL,containerR]
        }
    }
  

    CreateWorld(width:number,height:number){
        var level:number[] = [];
        for(let i = 0; i < width; i++){
            for(let j = 0; j < height; j++){
                level.push(this.GROUND)
            }
        }   
        return level
    }

}