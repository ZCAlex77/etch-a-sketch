window.onload = () =>{
  const container = document.querySelector('#container'),
        gridSize = document.querySelector('#grid-size-change');

  let drawColor = '#000', rainbow = false, eraser = false;

  const generateColor = () => `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;
  
  const addTileEvent = tiles =>{
    tiles.forEach(tile => tile.addEventListener('mouseover', function(){
      let col = drawColor;
      if(rainbow) col = generateColor();
      if(eraser) col = '#fff';
      this.style.background = col;
    }));
  }

  const toggleMode = (mode) =>{
    switch(mode){
      case 'rainbow': rainbow = !rainbow; eraser = false; break;
      case 'eraser': eraser = !eraser; rainbow = false; break;
    }
    document.querySelector('#rainbow').textContent = `Rainbow mode: ${rainbow?'ON':'OFF'}`;
    document.querySelector('#eraser').textContent = `Eraser: ${eraser?'ON':'OFF'}`;
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
      container.appendChild(tile);
    }
    gridSize.setAttribute('data-size', `${numOfTiles}x${numOfTiles}`);
    addTileEvent(Array.from(document.querySelectorAll('.tile')));
  }

  gridSize.addEventListener('change', ev => createTiles(ev.target.value));
  document.querySelector('#rainbow').addEventListener('click', () => toggleMode('rainbow'));
  document.querySelector('#eraser').addEventListener('click', () => toggleMode('eraser'));
  document.querySelector('#clear').addEventListener('click', clearTiles);
  document.querySelector('#color-input').addEventListener('change', ev => drawColor = ev.target.value);

  createTiles(20);
}