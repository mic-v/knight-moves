export type Coord = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Let Coords[0] be x or rows, and Coords[1] be y or columns
 * */
export type Coords = [Coord, Coord];

export class Square {
    private x:number;
    private y:number;
    private neighbors: Square[] = [];
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;

    }

    public getCoords() : [number, number] {
        return [this.x,this.y];
    }

    public getCoordStr() : string {
        return this.x + "" + this.y;
    }

    public addNeighbors(square: Square) {
        this.neighbors.push(square);
    }

    public getNeighbors() {
        return this.neighbors;
    }
}


/**
 * Represent the chess board for the knight
 * 
 */
export class ChessBoard {
    squares: Square[] = [];
    boardSize: number = 64;
    
    constructor() {
        this.generateSquares();
        this.generateNeighbors();
    }

    /**
     * Generate the squares in the board
     * Let [0,0] be A1 and [7,7] be H8
     * or let x be the rows, [1-8], and y be the columns[A-H]
     */
    private generateSquares() {
        for(let i = 0; i < this.boardSize; i++) {
            let x = Math.floor(i / 8);
            let y = i % 8;
            this.squares.push(new Square(x,y));
        }
    }


    /**
     * Generate the neighbor squares of a square for a potential knight move
     */
    private generateNeighbors() {
        for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++) {
                let square = this.squares[(i * 8) + j];
                if(i - 1 >= 0) {
                    if(j - 2 >= 0) square.addNeighbors(this.squares[(i - 1) * 8 + (j - 2)]);
                    if(j + 2 < 8)  square.addNeighbors(this.squares[(i - 1) * 8 + (j + 2)]);
                }
                if(i + 1 < 8) {
                    if(j - 2 >= 0) square.addNeighbors(this.squares[(i + 1) * 8 + (j - 2)]);
                    if(j + 2 < 8)  square.addNeighbors(this.squares[(i + 1) * 8 + (j + 2)]);
                }
                if(j - 1 >= 0) {
                    if(i - 2 >= 0) square.addNeighbors(this.squares[(i - 2) * 8 + (j - 1)]);
                    if(i + 2 < 8)  square.addNeighbors(this.squares[(i + 2) * 8 + (j - 1)]);
                }
                if(j + 1 < 8) {
                    if(i - 2 >= 0) square.addNeighbors(this.squares[(i - 2) * 8 + (j + 1)]);
                    if(i + 2 < 8)  square.addNeighbors(this.squares[(i + 2) * 8 + (j + 1)]);
                }
            }
        }
    }
    
    public displaySquares() {
        for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++) {
                let square = this.squares[(i * 8) + j];
            }
        }
    }

    /**
     * Using Dijkstra's shortest path algorithm using Set
     * https://www.geeksforgeeks.org/introduction-to-dijkstras-shortest-path-algorithm/
     */
    public knightMoves(start: Coords, end: Coords) {
        if(start[0] === end[0] && start[1] === end[1]) {
            return [start];
        }
        let queue : Square[] = [];
        let visited = new Set();
        let startSquare = this.squares[start[0] * 8 + start[1]];
        
        const paths = new Map();

        queue.unshift(startSquare);
        visited.add(startSquare);
        paths.set(startSquare, [startSquare.getCoords()]);

        let found = false;



        while(queue.length != 0 && !found) {
            let v = queue.pop(); 
            let v_coords;
            if(v !== undefined) {
                v_coords = v.getCoords();
            } else {
                throw "Error, v coords are undefined";
            } 

            if(v_coords[0] === end[0] && v_coords[1] === end[1]) {
                found = true;
                return paths.get(v);
            }
            if(v?.getNeighbors() === undefined) {
                throw "Error, v neighbors are undefined";
            } else {
                let neighbors = v.getNeighbors();
                for(let i = 0; i < neighbors.length; i++) {
                    let w = neighbors[i];
                    if(!visited.has(w)) {
                        queue.unshift(w);
                        visited.add(w);
    
                        //make a new copy without a reference
                        let path =  JSON.parse(JSON.stringify(paths.get(v)));
                        path.push(w.getCoords());

                        paths.set(w, path);
                    }
                }
            }
        }
    }
}
