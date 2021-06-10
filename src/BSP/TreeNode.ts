import { Container } from "./Container";

class TreeNode{
    container: Container;
    left?:TreeNode
    right?:TreeNode
    constructor(container:Container){
        this.container = container
        this.left = this.right = undefined
    }
}

export {TreeNode}