var p=Object.defineProperty;var b=(r,e,t)=>e in r?p(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var c=(r,e,t)=>(b(r,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();class v{constructor(e,t){c(this,"x");c(this,"y");c(this,"neighbors",[]);this.x=e,this.y=t}getCoords(){return[this.x,this.y]}getCoordStr(){return this.x+""+this.y}addNeighbors(e){this.neighbors.push(e)}getNeighbors(){return this.neighbors}}class y{constructor(){c(this,"squares",[]);c(this,"boardSize",64);this.generateSquares(),this.generateNeighbors()}generateSquares(){for(let e=0;e<this.boardSize;e++){let t=Math.floor(e/8),i=e%8;this.squares.push(new v(t,i))}}generateNeighbors(){for(var e=0;e<8;e++)for(var t=0;t<8;t++){let i=this.squares[e*8+t];e-1>=0&&(t-2>=0&&i.addNeighbors(this.squares[(e-1)*8+(t-2)]),t+2<8&&i.addNeighbors(this.squares[(e-1)*8+(t+2)])),e+1<8&&(t-2>=0&&i.addNeighbors(this.squares[(e+1)*8+(t-2)]),t+2<8&&i.addNeighbors(this.squares[(e+1)*8+(t+2)])),t-1>=0&&(e-2>=0&&i.addNeighbors(this.squares[(e-2)*8+(t-1)]),e+2<8&&i.addNeighbors(this.squares[(e+2)*8+(t-1)])),t+1<8&&(e-2>=0&&i.addNeighbors(this.squares[(e-2)*8+(t+1)]),e+2<8&&i.addNeighbors(this.squares[(e+2)*8+(t+1)]))}}displaySquares(){for(var e=0;e<8;e++)for(var t=0;t<8;t++){let i=this.squares[e*8+t];console.log(i)}}knightMoves(e,t){if(e[0]===t[0]&&e[1]===t[1])return[e];let i=[],o=new Set,n=this.squares[e[0]*8+e[1]];const s=new Map;i.unshift(n),o.add(n),s.set(n,[n.getCoords()]);let a=!1;for(;i.length!=0&&!a;){let l=i.pop(),d;if(l!==void 0)d=l.getCoords();else throw"Error, v coords are undefined";if(d[0]===t[0]&&d[1]===t[1])return a=!0,s.get(l);if((l==null?void 0:l.getNeighbors())===void 0)throw"Error, v neighbors are undefined";{let u=l.getNeighbors();for(let h=0;h<u.length;h++){let g=u[h];if(!o.has(g)){i.unshift(g),o.add(g);let m=JSON.parse(JSON.stringify(s.get(l)));m.push(g.getCoords()),s.set(g,m)}}}}}}document.querySelector("#app").innerHTML=`
  <main>
    <h1>Knight Moves Display</h1>
    <section id="main-content">
      <div id="chess">
          <figure id="knight">
            <img src="/chess.png">
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

`;function q(){const r=document.getElementById("chessboard");for(let e=0;e<8;e++)for(let t=0;t<8;t++){const i=document.createElement("div"),o=e+""+t;i.setAttribute("id",o),(e+t)%2===0?i.setAttribute("class","square-color-1"):i.setAttribute("class","square-color-2"),r==null||r.appendChild(i)}}const x=new y;function E(r){r==null||r.preventDefault();let e=document.getElementById("start-square").value,t=document.getElementById("end-square").value;e=e.toString(),t=t.toString();const i=document.getElementById("output");i&&(i.innerHTML="");let o=[parseInt(e[0],36)-10,parseInt(e[1])-1],n=[parseInt(t[0],36)-10,parseInt(t[1])-1],s=x.knightMoves(o,n);for(let l=0;l<s.length;l++){let d=document.createElement("li"),u=s[l],h=String.fromCharCode("A".charCodeAt(0)+u[0]);d.innerHTML+="["+h+", "+(u[1]+1)+"]",l===0&&d.classList.add("highlighted-move"),i==null||i.appendChild(d)}let a=document.getElementById("knight");if(a){a.style.transform="none";let l=s[0],d=l[0]*-40,u=Math.abs(l[1]*40);a.style.transform="translate("+u+"px, "+d+"px)"}console.log(s)}function f(r){if(r===null)throw"Someting went wrong with converting list string to array";let e=[],t=parseInt(r[1],36)-10,i=parseInt(r[4])-1;return e.push(t),e.push(i),e}function I(r){var n;r.preventDefault();let e=(n=document.getElementById("output"))==null?void 0:n.children,t=[0,0],i=document.getElementById("knight"),o=null;if(e){for(let s=e.length-1;s>=0;s--)if(e[s].classList.contains("highlighted-move")&&s!==0&&(e[s].classList.remove("highlighted-move"),o=s-1),o===s){t=f(e[s].textContent),e[s].classList.add("highlighted-move");break}}if(i&&typeof o=="number"){let s=t[0]*-40,a=Math.abs(t[1]*40);i.style.transform="translate("+a+"px, "+s+"px)"}}function S(r){var n;r.preventDefault();let e=(n=document.getElementById("output"))==null?void 0:n.children,t=[0,0],i=document.getElementById("knight"),o=null;if(e){for(let s=0;s<e.length;s++)if(e[s].classList.contains("highlighted-move")&&s!=e.length-1&&(console.log(s),e[s].className="",o=s+1),o===s){t=f(e[s].textContent),e[s].className+="highlighted-move";break}}if(i&&o){let s=t[0]*-40,a=Math.abs(t[1]*40);i.style.transform="translate("+a+"px, "+s+"px)"}}function w(r){return new Promise(e=>setTimeout(e,r))}async function N(r){var o,n;r==null||r.preventDefault();const e=(o=document.getElementById("output"))==null?void 0:o.querySelectorAll("li");e==null||e.forEach(s=>{s.classList.remove("highlighted-move")});let t=document.getElementById("knight");t&&(t.style.transform="none");let i=(n=document.getElementById("output"))==null?void 0:n.children;if(i)for(let s=0;s<i.length;s++){if(i[s].classList.add("highlighted-move"),console.log(s),t){let a=f(i[s].textContent),l=a[0]*-40,d=Math.abs(a[1]*40);t.style.transform="translate("+d+"px, "+l+"px)"}await w(500),s+1!==i.length&&i[s].classList.remove("highlighted-move")}}function L(){q();const r=document.getElementById("io-box");r==null||r.addEventListener("submit",E);const e=document.getElementById("prev-button");console.log(e),e==null||e.addEventListener("click",I);const t=document.getElementById("next-button");t==null||t.addEventListener("click",S);const i=document.getElementById("play-button");i==null||i.addEventListener("click",N)}L();
