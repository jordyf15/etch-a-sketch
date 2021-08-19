const sketchContainer = document.querySelector('#sketch-container');


let color = '#000000';



function changeGridColorOnHover() {
    console.log('hovered');
    this.style.backgroundColor = color;
}

for(let i =0;i<16;i++){
    const sketchGrid = document.createElement('div');
    sketchGrid.classList.add('sketch-grid');
    sketchGrid.addEventListener('mouseover', changeGridColorOnHover);
    sketchContainer.appendChild(sketchGrid);
}
