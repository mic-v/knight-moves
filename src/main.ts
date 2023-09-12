import './style.css'
import { ChessBoard, Coords, Coord } from './knight-moves.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    <h1>Knight Moves Display</h1>
    <section id="main-content">
      <div id="chess">
          <figure id="knight">
            <img src="./knight.png">
          </figure>
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
        <form class="flex-row">
          <div class="flex-row">
          <label for="start-square">Start Square: </label>
          <input type="text" name="start-square" id="start-square" pattern="[a-zA-Z]{1}[1-8]{1}" required></input>
          </div>
          <div class="flex-row">
            <label for="end-square">End Square: </label>
            <input type="text" name="end-square" id="end-square" pattern="[a-zA-Z]{1}[1-8]{1}" required></input>
          </div>
          <button id="input-button">Enter</button>
        </form>
        <ul id="output">
        </ul>
        <div id="controls" class="flex-row">
          <button id="prev-button"><</button>
          <button id="play-button">Play</button>
          <button id="next-button">></button>
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

const board = new ChessBoard();

function inputSubmit(event: any) {
  event?.preventDefault();

  let startValue = (<HTMLInputElement>document.getElementById('start-square')).value;
  let endValue = (<HTMLInputElement>document.getElementById('end-square')).value;

  startValue = startValue.toString();
  endValue = endValue.toString();

  const output = document.getElementById('output');
  if(output) output.innerHTML = "";

  let startMove: Coords = [parseInt(startValue[0], 36) - 10 as Coord, parseInt(startValue[1]) - 1 as Coord];
  let endMove: Coords = [parseInt(endValue[0], 36) - 10 as Coord, parseInt(endValue[1]) - 1 as Coord];

  let knightMoves = board.knightMoves(startMove, endMove);

  for(let i = 0; i < knightMoves.length; i++) {
    let moveItem = document.createElement('li');
    let move = knightMoves[i];
    let char = String.fromCharCode('A'.charCodeAt(0) + move[0]);
    moveItem.innerHTML += "[" + char + ", " + (move[1] + 1) + "]";
    //moveItem.value = "";

    if(i === 0) moveItem.classList.add('highlighted-move');

    output?.appendChild(moveItem);
  }

  let knightPiece = document.getElementById('knight');
  if(knightPiece) {
    knightPiece.style.transform = "none";
    let firstMove = knightMoves[0];
    let y = (firstMove[0]) * -40;
    let x = Math.abs((firstMove[1]) * 40);
    knightPiece.style.transform = "translate(" + x + "px, " + y + "px)";
  }
}

function convertTextMoveToArray(str: string | null) {
  if(str === null)
    throw("Someting went wrong with converting list string to array");

  let move: Array<number> = [];
  let x = parseInt(str[1], 36) - 10;
  let y = parseInt(str[4]) - 1;
  move.push(x);
  move.push(y);

  return move;

}

function prev_move(event: any) {
  event.preventDefault();
  
  let outputlist = document.getElementById('output')?.children;
  let move: Coords = [0,0];
  let knightPiece = document.getElementById('knight');
  let found = null;
  if(outputlist) {
    for(let i = outputlist.length - 1; i >= 0; i--) {
      if(outputlist[i].classList.contains('highlighted-move') && i !== 0) {
        outputlist[i].classList.remove('highlighted-move');
        found = i - 1;
      }
      if(found === i) {
        move = convertTextMoveToArray(outputlist[i].textContent) as Coords;
        outputlist[i].classList.add('highlighted-move');
        break;
      }
    }
  }
  if(knightPiece && typeof found === "number") {
    let y = (move[0]) * -40;
    let x = Math.abs((move[1]) * 40);
    knightPiece.style.transform = "translate(" + x + "px, " + y + "px)";
  }
}

function next_move(event: any) {
  event.preventDefault();

  let outputlist = document.getElementById('output')?.children;
  let move: Coords = [0,0];
  let knightPiece = document.getElementById('knight');
  let found = null;
  if(outputlist) {
    for(let i = 0; i < outputlist.length; i++) {
      if(outputlist[i].classList.contains('highlighted-move') && i != outputlist.length - 1) {
        console.log(i);
        outputlist[i].className = '';
        found = i + 1;
      }
      if(found === i) {
        move = convertTextMoveToArray(outputlist[i].textContent) as Coords;
        outputlist[i].className+= 'highlighted-move';
        break;
      }
    }
  }
  if(knightPiece && found) {
    let y = (move[0]) * -40;
    let x = Math.abs((move[1]) * 40);
    knightPiece.style.transform = "translate(" + x + "px, " + y + "px)";
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function play_moves(event: any) {
  event?.preventDefault();

  const liElements = document.getElementById('output')?.querySelectorAll('li');
  liElements?.forEach((element) => {
    element.classList.remove('highlighted-move');
  }); 


  let knightPiece = document.getElementById('knight');
  if(knightPiece) {
    knightPiece.style.transform = "none";
  }

  let outputlist = document.getElementById('output')?.children;
  if(outputlist) {
    for(let i = 0; i < outputlist.length; i++) {
      outputlist[i].classList.add('highlighted-move');
      console.log(i);
      if(knightPiece) {
        let move = convertTextMoveToArray(outputlist[i].textContent) as Coords;
        let y = (move[0]) * -40;
        let x = Math.abs((move[1]) * 40);
        knightPiece.style.transform = "translate(" + x + "px, " + y + "px)";
      }
      await sleep(500);
      if(i + 1 !== outputlist.length) outputlist[i].classList.remove('highlighted-move');
    }
  }
}

function handleView() {

  generateHtmlChessBoard();

  const form = document.getElementById('io-box');
  form?.addEventListener('submit', inputSubmit);

  const previousButton = document.getElementById('prev-button');
  console.log(previousButton);
  previousButton?.addEventListener('click', prev_move);

  const nextButton = document.getElementById('next-button');
  nextButton?.addEventListener('click', next_move);

  const playButton = document.getElementById('play-button');
  playButton?.addEventListener('click',  play_moves);
}

handleView();

