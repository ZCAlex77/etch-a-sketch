window.onload = () =>{
  const container = document.querySelector('#container'),
        gridSize = document.querySelector('#grid-size-change');

  const createTiles = (numOfTiles) =>{
    container.innerHTML = '';
    container.style.gridTemplateRows = "1fr ".repeat(numOfTiles);
    container.style.gridTemplateColumns = "1fr ".repeat(numOfTiles);
    for(let i = 0; i < numOfTiles*numOfTiles; i++){
      let tile = document.createElement('div');
      tile.classList.add('tile');
      tile.style.background = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
      container.appendChild(tile);
    }
    gridSize.setAttribute('data-size', `${numOfTiles}x${numOfTiles}`);
  }

  gridSize.addEventListener('change', ev => createTiles(ev.target.value));

  createTiles(20);
}