class TreeNode{
    data: any;
    left?:TreeNode
    right?:TreeNode
    constructor(data:any){
        this.data = data
        this.left = this.right = undefined
    }
}

export {TreeNode}