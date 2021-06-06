// First Create world X,Y Tiles 
// Pick Random Point and Axis to split on 
// On That Axis and point SPlit
// Store Partitions
// On each Partition Pick Random Point and Axis to split on 
import {BinaryTree} from "./BSP/BinaryTree"
import { TreeNode } from "./BSP/TreeNode"
export default class BSP{
    width:number = 50
    height:number = 50
    iterations:number = 0
    tree:BinaryTree
    world:number[]
    constructor(){
        this.width = 5,
        this.height = 5
        this.world = this.CreateWorld(this.width,this.height)
        this.tree = new BinaryTree(this.world)
    }
    BSPController(){
         this.SplitDirection(this.tree.root)
    }
    SplitDirection(node:TreeNode){
        if(this.iterations < 2){
            if(Math.random() == 1){
                this.WorldCopyX(node,this.height)
            }else{
                this.WorldCopyY(node,this.height)
            }
            this.iterations++
        }
    }
    WorldCopyX(node:TreeNode,height:number){
        let min = Math.floor(height * 0.30);
        let splitOn:number = Math.random() * (height - min) + min;
        let tilesToSkip = height - splitOn;
        let a:number[] = []
        let b:number[] = []
        for(let i = 0; i < node.data.length; i += tilesToSkip){
    
            a = node.data.slice(i,(i + splitOn))
            b = node.data.slice(i + splitOn,(i+ splitOn + tilesToSkip))
        }
        this.SplitDirection(node)
    }
    WorldCopyY(node:TreeNode,height:number){
        let min = Math.floor(height * 0.30);
        let splitOn:number = Math.random() * (height - min) + min;
        let tilesToSkip = height - splitOn;
        let a:number[] = []
        let b:number[] = []

        for(let i = 0; i < node.data.length; i += tilesToSkip){
    
            a = node.data.slice(i,(i + splitOn))
            b = node.data.slice(i + splitOn,(i+ splitOn + tilesToSkip))

        }
        this.SplitDirection(node)
    }
    WorldSplitY(ATS:number[],height:number){
        let min = Math.floor(height * 0.30);
        let splitOn:number = Math.random() * (height - min) + min;
        let tilesToSkip = height - splitOn;
        let fracture:number[] = []
        for(let i = 0; i < ATS.length; i += tilesToSkip){
    
            fracture = ATS.splice(i,(i + splitOn)).concat(fracture)
        }
        if (this.roomCount < this.maxRooms){

        }
        return ATS
    }
    WorldSplitX(ATS:number[],width:number){
        let min = Math.floor(width - (width * 0.40));
        let max = Math.floor(width - (width * 0.80))
        let splitOn = Math.floor(Math.random() * (max - min) + min)
        let fracture:number[] = ATS.splice(0,splitOn * width) 

        return ATS
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