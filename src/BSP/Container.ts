import {Point} from "./Point"
class Container{
    x:number
    y:number
    w:number
    h:number
    center:Point
    constructor(x:number,y:number,w:number,h:number){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.center = new Point(this.x + (this.w/2),this.y + (this.h/2))
    }
}

export {Container}