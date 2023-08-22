type Coord = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

type Coords = [Coord, Coord];

 class Square {
    private x:number;
    private y:number;
    private neighbors: Square[] = [];
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    public getCoords() {
        return [this.x,this.y];
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
    squares: Square[][] = [[]];
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

        for(var i = 0; i < 8; i++) this.squares.push( [] );

        for(var i = 0; i < 8; i++) {
            console.log(i);
            for(var j = 0; j < 8; j++) {
                let x = new Square(i,j);
                this.squares[i].push(x);
            }
        }
    }


    /**
     * Generate the neighbor squares of a square for a potential knight move
     */
    private generateNeighbors() {
        for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++) {
                let square = this.squares[i][j];
                if(i - 1 >= 0) {
                    if(j - 2 >= 0) square.addNeighbors(this.squares[i - 1][j - 2]);
                    if(j + 2 < 8)  square.addNeighbors(this.squares[i - 1][j + 2]);
                }
                if(i + 1 < 8) {
                    if(j - 2 >= 0) square.addNeighbors(this.squares[i + 1][j - 2]);
                    if(j + 2 < 8)  square.addNeighbors(this.squares[i + 1][j + 2]);
                }
                if(j - 1 >= 0) {
                    if(i - 2 >= 0) square.addNeighbors(this.squares[i - 2][j - 1]);
                    if(i + 2 < 8)  square.addNeighbors(this.squares[i + 2][j - 1]);
                }
                if(j + 1 < 8) {
                    if(i - 2 >= 0) square.addNeighbors(this.squares[i - 2][j + 1]);
                    if(i + 2 < 8)  square.addNeighbors(this.squares[i + 2][j + 1]);
                }
            }
        }
    }
    
    public displaySquares() {
        for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++) {
                let square = this.squares[i][j];
                console.log("Square: " + i + " " + j);
                console.log(square.getNeighbors());
            }
        }
    }

    public knightMoves(start: Coords, end: Coords) {

    }
}
