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

    constructor(){

    }
    CreateArray(width:number,height:number){

        var level:number[] = [];
        for(let i = 0; i < width; i++){
            for(let j = 0; j < height; j++){
                level.push(0)
            }
        }   
        return level
    }
    CreateRoom(width:number,height:number){
        var room:[number[]] = [[]];
        for(let i=0;i<height;i++){
            let row:number[] = [];
            for(let j=0;j<width;j++){   
                if(i == 0)             
                    row.push(23);
                else if(i == height-1)
                    row.push(23);
                else{
                    if(j == 0)
                        row.push(23);
                    else if(j == width-1)
                        row.push(23);
                    else
                        row.push(0);
                }
            }
            room.push(row);

        }        
        return room
    }
}