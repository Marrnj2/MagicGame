/**
 * 
 * Level is a 1d array of blank tiles
 * Room is a 2d array of room tiles
 * Convert room into 1d array
 * Pick a location in level for the room
 * Replace relevant blank tiles with room tiles
 * Then convert level back into 2d array
 * 
 * 
 */


export default class MapGenerator{
    readonly FLOORTILE = 510
    readonly VOIDTILE = 1140
    readonly WALLTILE = 200
    General(world:number[],lWidth:number,lHeight:number){

        let maxRHeight = lHeight
        let minRHeight = lHeight / 3
        let maxRWidth = lWidth
        let minRWidth = lWidth / 3

        let rWidth:number
        let rHeight:number
        let room: [number[]]
        let newArray: number[]
        let roomPos:number
        let maxPosition:number
        do{
            rWidth = Math.floor(Math.random() * (maxRWidth - minRWidth) + minRWidth)
            rHeight = Math.floor(Math.random() * (maxRHeight - minRHeight) + minRHeight)
            room = this.CreateRoom(rWidth,rHeight);
            maxPosition = (lWidth*lHeight) - (rWidth*rHeight);
            roomPos = Math.floor(Math.random()*(maxPosition - 1));
        }
        while (!this.CheckBoundry(roomPos,rWidth,rHeight,lWidth,lHeight))
        newArray = this.ConcatArray(room)
        world = this.InsertRoom(rHeight,rWidth,roomPos,lWidth,world,newArray)
        world = this.InsertWall(roomPos,rWidth,rHeight,world,lWidth,lHeight)
        let convertedWorld: any = [];
        while(world.length){
            convertedWorld.push(world.splice(0,lWidth))
        }
        return convertedWorld
    }
    InsertWall(roomPos:number,rWidth:number,rHeight:number,world:any,lWidth:number,lHeight:number){
        for(let i = 0; i < rWidth; i++){
            world[roomPos + i] = this.WALLTILE
            world[(roomPos + i) + (lWidth * (rHeight - 1))] = this.WALLTILE
            for(let j = 0; j < rHeight; j++){
                let index = roomPos + (lWidth * j)
                world[index] = this.WALLTILE
                world[index + rWidth - 1] = this.WALLTILE
            }
        }
        return world
    }
    CheckBoundry(roomPos:number,rWidth:number,rHeight:number,lWidth:number,lHeight:number){
        let valid = true
        let index = roomPos + lWidth
        let row = index % lHeight;
        let col = Math.floor(index / lHeight)
        if(col + rHeight > lHeight || row + rWidth > lWidth){
            valid = false
        }
        return valid
    }
    // Checks that rooms do not intersect with each other
    CheckIntersect(roomPos:number,rWidth:number,rHeight:number,world:any,lWidth:number,lHeight:number){
        // For every tile in a room get its index and compare to the world string 
        let valid = true
        for(let i = 0; i < rHeight; i++){
            for(let j = 0; j < rWidth; j++){
                let index = roomPos + (lWidth * i)+ j
                if(world[index] != this.VOIDTILE){
                    valid = false;
                }
            }
        }
        return valid
    }
    // Adds a room to the 1d world array
    ConcatArray(oldArray:any){
        let newArray: any[] = [];
        for(var i = 0; i < oldArray.length; i++)
        {
            newArray = newArray.concat(oldArray[i]);
        }
        return newArray
    }

    CreateRoom(width:number,height:number){
        var room:[number[]] = [[]];
        for(let i=0;i<width;i++){
            let row:number[] = [];
            for(let j=0;j<height;j++){   
                if(i == 0)             
                    row.push(this.FLOORTILE);
                else if(i == height-1)
                    row.push(this.FLOORTILE);
                else{
                    if(j == 0)
                        row.push(this.FLOORTILE);
                    else if(j == width-1)
                        row.push(this.FLOORTILE);
                    else
                        row.push(this.FLOORTILE);
                }
            }
            room.push(row);
        }        
        room.shift()
        return room
    }
    InsertRoom(rHeight:number,rWidth:number,roomPos:number,lWidth:number,gameWorld:any,newArray:any){
        for(let i = 0; i < rHeight; i ++){
            for(let j = 0; j < rWidth;j++){
                let index = roomPos + (lWidth * i)+ j
                gameWorld[index] = newArray[(rWidth * i)+ j]
            }
        }
        return gameWorld
    }
}