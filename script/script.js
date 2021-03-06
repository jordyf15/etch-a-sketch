const sketchContainer = document.querySelector('#sketch-container');
const newSketchBtn = document.querySelector('#new-sketch');
let rainbowMode = false;
let grayscaleMode = false;
let colorMode = false;
let eraserMode = false;
let color = '#000000';
const colorPicker = document.querySelector('#color-picker');
const rainbowButton = document.querySelector('#rainbow-button');
const grayscaleButton = document.querySelector('#grayscale-button');
const colorButton = document.querySelector('#color-button');
const resetButton = document.querySelector('#reset-button');
const eraserButton = document.querySelector('#eraser-button');

colorButton.addEventListener('click', () => {
    rainbowMode=false;
    grayscaleMode=false;
    eraserMode = false;
})
rainbowButton.addEventListener('click', () => {
    rainbowMode=true;
    grayscaleMode=false;
    eraserMode=false;
});
grayscaleButton.addEventListener('click',() =>{
    grayscaleMode=true;
    rainbowMode=false;
    eraserMode=false;
})
eraserButton.addEventListener('click', () => {
    grayscaleMode=false;
    rainbowMode=false;
    eraserMode=true;
});

function pickColor() {
    color = this.value;
}

colorPicker.addEventListener('change', pickColor);

function displayCreateSketchPopUp(){
    const body = document.querySelector('body');
    const popUpBackground = document.createElement('div');
    popUpBackground.id = 'pop-up-background';

    const popUpContainer = document.createElement('div');
    popUpContainer.id = 'pop-up-container';
    popUpContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    })
    
    const popUpQuestion = document.createElement('p');
    popUpQuestion.id='pop-up-question';
    popUpQuestion.textContent="How many squares grid for new sketch?";
    popUpContainer.appendChild(popUpQuestion);

    const popUpInput = document.createElement('input');
    popUpInput.id='pop-up-input';
    popUpInput.addEventListener('click', (e)=>{
        e.stopPropagation();
    })
    popUpContainer.appendChild(popUpInput);

    const popUpAlert = document.createElement('p');
    popUpAlert.id='pop-up-alert';
    popUpContainer.appendChild(popUpAlert);

    const popUpBtn = document.createElement('button');
    popUpBtn.id='pop-up-btn';
    popUpBtn.textContent='Create';
    popUpBtn.addEventListener('click', createSketch);
    popUpContainer.appendChild(popUpBtn);

    popUpBackground.appendChild(popUpContainer);
    popUpBackground.addEventListener('click', ()=>{
        body.removeChild(popUpBackground);
    })
    body.appendChild(popUpBackground);
}

function createSketch(e) {
    e.stopPropagation();
    const popUpInput = document.querySelector('#pop-up-input');
    const popUpAlert=document.querySelector('#pop-up-alert');
    if(popUpInput.value === ''){
        popUpAlert.textContent='The input cannot be empty!';
        return;
    }
    const numberOfGrids = parseInt(popUpInput.value);
    if(numberOfGrids>100) {
        popUpAlert.textContent='The number of maximum grid is 100!';
        return;
    }else if(isNaN(numberOfGrids)){
        popUpAlert.textContent="The input must be a number!";
        return;
    }
    sketchContainer.innerHTML='';

    for(let i =0;i<numberOfGrids*numberOfGrids;i++){
        const sketchGrid = document.createElement('div');
        sketchGrid.classList.add('sketch-grid');
        sketchGrid.addEventListener('mouseover', changeGridColorOnHover);
        sketchContainer.appendChild(sketchGrid);
    }
    sketchContainer.style.gridTemplateColumns = `repeat(${numberOfGrids}, auto)`;
    sketchContainer.style.gridTemplateRows = `repeat(${numberOfGrids}, auto)`;
    const body = document.querySelector('body');
    const popUpBackground = document.querySelector('#pop-up-background');
    body.removeChild(popUpBackground);
}

function resetSketch() {
    const grids = document.querySelectorAll('.sketch-grid');

    grids.forEach((grid) => {
        grid.style.backgroundColor = 'rgb(255, 255 , 255)';
    })
}

resetButton.addEventListener('click', resetSketch);

newSketchBtn.addEventListener('click', displayCreateSketchPopUp);

function getRandomRGBCode() {
    return Math.floor(Math.random()*255)+1;
}

function getGrayscaleRGBCode(rgb) {
    if(rgb === ""){
        return 'rgb(255, 255, 255)';
    }
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    const red = parseInt(rgb[1]);
    const green = parseInt(rgb[2]);
    const blue = parseInt(rgb[3]);
    if(red%5 === 0 && green%5 ===0 && blue%5 ===0 && red === green && green === blue){
        return `rgb(${red-25.5}, ${green-25.5}, ${blue-25.5})`;
    } else {
        return 'rgb(255, 255, 255)';
    }
}

function changeGridColorOnHover() {
    if(rainbowMode === true) {
        this.style.backgroundColor = `rgb(${getRandomRGBCode()}, ${getRandomRGBCode()}, ${getRandomRGBCode()})`;
        return;
    } else if(grayscaleMode === true) {
        this.style.backgroundColor = getGrayscaleRGBCode(this.style.backgroundColor);
    } else if(eraserMode === true){
        this.style.backgroundColor = 'rgb(255, 255, 255)';
    }
    else{
        this.style.backgroundColor = color;
    }
}

for(let i =0;i<16*16;i++){
    const sketchGrid = document.createElement('div');
    sketchGrid.classList.add('sketch-grid');
    sketchGrid.addEventListener('mouseover', changeGridColorOnHover);
    sketchContainer.appendChild(sketchGrid);
}
sketchContainer.style.gridTemplateColumns='repeat(16, auto)';
sketchContainer.style.gridTemplateRows='repeat(16, auto)';