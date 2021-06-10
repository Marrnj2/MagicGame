import { Container } from "./Container";
import {TreeNode} from "./TreeNode"
export class BinaryTree{
    root:TreeNode
    constructor(root:TreeNode){
        this.root = root
    }
    preOrder(rooms:Container[]) {
        
        let current = this.root;
      
        let traverse = (node:TreeNode) => {
          if(node.left == undefined && node.right == undefined){
              console.log(node.container)
              rooms.push(node.container)
          }
          if (node.left) traverse(node.left);
          if (node.right) traverse(node.right);
        };
      
        traverse(current);
      }
}

