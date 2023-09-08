
import { describe , expect, test, expectTypeOf } from 'vitest';
import { ChessBoard, Square } from '../src/knight-moves';


describe('testing Square class', () => {
    test('testing Square constructor', () => {
        let sq = new Square(0,0);
        expectTypeOf(Square).constructorParameters.toEqualTypeOf<number | number>
    });

    test('testing Square creation', () => {
        let sq = new Square(0,1);
        expect(sq).toBeInstanceOf(Square);
    });

    test('testing Square coords', () => {
        let x = 1;
        let y = 7;
        let coords = [x, y];
        let sq = new Square(x,y);
        expect(sq.getCoords()).toStrictEqual(coords);
    });

    test('testing Square coords strings', () => {
        let x = 1;
        let y = 7;
        let coords = x + "" + y;
        let sq = new Square(x,y);
        expect(sq.getCoordStr()).toStrictEqual(coords);
    });

    test('testing Square with random coord values', () => {
        let x: number = Math.random() * 8;
        let y: number = Math.random() * 8;
        let coords = [x, y];
        let coords_str = x + "" + y;
        let sq = new Square(x, y);

        expect(sq.getCoords()).toStrictEqual(coords);

        expect(sq.getCoordStr()).toStrictEqual(coords_str);

    });

    test('testing Square adding neighbor and getting neighbor', () => {
        let neighbor = new Square(0,0);
        let square = new Square(1,1);
        square.addNeighbors(neighbor);
        let neighbors = square.getNeighbors();

        expect(neighbors[0]).toStrictEqual(neighbor);
    });

    test('testing Square adding neighbors and getting neighbors', () => {
        let square = new Square(7,7);
        let neighbors: Array<Square> = [];
        for(let i = 0; i < 2; i++) {
            let neighbor = new Square(i,i);
            square.addNeighbors(neighbor);
            neighbors.push(neighbor);
        }

        let square_neighbors = square.getNeighbors();
        for(let i = 0; i < 2; i++) {
            expect(square_neighbors[i]).toStrictEqual(neighbors[i]);
        }
    });

    test('testing Square neighbor length', () => {
        let square = new Square(5,5);
        for(let i = 0; i < 5; i++) {
            let neighbor = new Square(i,i);
            square.addNeighbors(neighbor);
        }

        expect(square.getNeighbors()).toHaveLength(5);
    });

});

/**Testing ChessBoard is quite hard
 * so we will just test the most important function: knight_moves
 */
describe('testing ChessBoard class', () => {
    test('test first square', () => {
     let board = new ChessBoard();
     let expected_moves = [[0,0]];
     let moves = board.knightMoves([0,0], [0,0]); 

     expect(moves).toStrictEqual(expected_moves);
    });

    test('test moves with two moves', () => {
        let board = new ChessBoard();
        let expected_moves = [[3,3], [1,2]];
        let moves = board.knightMoves([3,3], [1,2]);

        expect(moves).toStrictEqual(expected_moves);
    });

    test('test moves with three moves', () => {
        let board = new ChessBoard();
            /** Could also be [[1,2], [2,4], [3,2]] */
        let expected_moves = [[1,2], [2,0], [3,2]];
        let moves = board.knightMoves([1,2], [3,2]);

        expect(moves).toStrictEqual(expected_moves);
    });

    test('test moves with adjacent square', () => {
        let board = new ChessBoard();
            /** Could also be [[0,0], [2,1], [1,3], [0,1]]; */
        let expected_moves = [[0,0], [1,2], [2,0], [0,1]];
        let moves = board.knightMoves([0,0], [0,1]);

        expect(moves).toStrictEqual(expected_moves);        
    });

    test('test moves length: 2', () => {
        let board = new ChessBoard();
        /** Could also be [[0,0], [2,1], [1,3], [0,1]]; */
        //let expected_moves = [[7,0], [6,2]];
        let moves = board.knightMoves([7,0], [6,2]);

        expect(moves).toHaveLength(2);  
    });

    test('test moves length: 3', () => {
        let board = new ChessBoard();
        /** Could also be [[0,0], [2,1], [1,3], [0,1]]; */
        let moves = board.knightMoves([0,2], [2,2]);

        expect(moves).toHaveLength(3); 
    });

    test('test moves length: 4', () => {
        let board = new ChessBoard();
        let moves = board.knightMoves([3,2], [1,7]);

        expect(moves).toHaveLength(4); 
    });

    test('test moves length: 6(Actually 7)', () => {
        let board = new ChessBoard();
        let moves = board.knightMoves([0,0], [7,7]);
        expect(moves).toHaveLength(7); 
    });


});