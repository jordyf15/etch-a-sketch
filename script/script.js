const sketchContainer = document.querySelector('#sketch-container');

for(let i =0;i<16;i++){
    const sketchGrid = document.createElement('div');
    sketchGrid.classList.add('sketch-grid');
    sketchContainer.appendChild(sketchGrid);
}
