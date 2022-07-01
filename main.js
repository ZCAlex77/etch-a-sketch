window.onload = () =>{
  const container = document.querySelector('#container'),
        gridSize = document.querySelector('#grid-size-change');

  let drawColor = '#000', rainbow = false, lastColor = null;

  const generateColor = () => `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
  
  const toggleRainbow = () =>{
    rainbow = !rainbow;
    if(!rainbow) drawColor = lastColor;
    else lastColor = drawColor;
    document.querySelector('#rainbow').textContent = `Rainbow mode: ${rainbow?'ON':'OFF'}`;
  }

  const addTileEvent = tiles =>{
    tiles.forEach(tile => tile.addEventListener('mouseover', function(){
      if(rainbow) drawColor = generateColor();
      this.style.background = drawColor;
    }));
  }

  const clearTiles = () =>{
    Array.from(document.querySelectorAll('.tile')).forEach(tile => tile.style.background = '#fff');
  }

  const createTiles = (numOfTiles) =>{
    container.innerHTML = '';
    container.style.gridTemplateRows = "1fr ".repeat(numOfTiles);
    container.style.gridTemplateColumns = "1fr ".repeat(numOfTiles);
    for(let i = 0; i < numOfTiles*numOfTiles; i++){
      let tile = document.createElement('div');
      tile.classList.add('tile');
      tile.addEventListener('hover', function(){this.style.background = 'drawColor';});
      container.appendChild(tile);
    }
    gridSize.setAttribute('data-size', `${numOfTiles}x${numOfTiles}`);
    addTileEvent(Array.from(document.querySelectorAll('.tile')));
  }

  gridSize.addEventListener('change', ev => createTiles(ev.target.value));
  document.querySelector('#rainbow').addEventListener('click', toggleRainbow);
  document.querySelector('#clear').addEventListener('click', clearTiles);
  document.querySelector('#col').addEventListener('change', ev => drawColor = ev.target.value);

  createTiles(20);
}