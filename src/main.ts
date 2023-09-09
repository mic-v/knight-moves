import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { ChessBoard } from './knight-moves.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    <h1>Knight Moves Display</h1>
    <section id="main-content">
      <div id="chess">
          <div id="chessboard">
          </div>
          <ul id="board-column">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
          </ul>
          <ul id="board-row">
            <li>A</li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
            <li>E</li>
            <li>F</li>
            <li>G</li>
            <li>H</li>
          </ul>
      </div>
      <div id="io-box">
        <div class="flex-row">
          <div class="flex-row">
          <label for="start-square">Start Square: </label>
          <input type="text" name="start-square id="start-square" pattern="[a-zA-Z]{1}[1-8]{1}" required></input>
          </div>
          <div class="flex-row">
            <label for="end-square">End Square: </label>
            <input type="text" name="end-square id="end-square" pattern="[a-zA-Z]{1}[1-8]{1}" required></input>
          </div>
          <button id="input-button">Enter</button>
        </div>
        <ul id="output">
          <li>blah</li>
        </ul>
        <div id="controls" class="flex-row">
          <button><</button>
          <button>Play</button>
          <button>></button>
        </div>
      </div>
    </section>
    
  </main>

`;

function generateHtmlChessBoard() {
  const htmlBoard = document.getElementById('chessboard');
  
  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
      const square = document.createElement('div');
      const id = i + '' + j;
      square.setAttribute('id', id);

      if((i + j) % 2 === 0) {
        square.setAttribute('class', 'square-color-1');
      } else {
        square.setAttribute('class', 'square-color-2');
      }

      htmlBoard?.appendChild(square);
    }
  }
}

generateHtmlChessBoard();


const board = new ChessBoard();
console.log(board.knightMoves([0,0], [1,2]));
