const sketchContainer = document.querySelector('#sketch-container');
const newSketchBtn = document.querySelector('#new-sketch');
let rainbowMode = false;
let color = '#000000';
const colorPicker = document.querySelector('#color-picker');
const rainbowButton = document.querySelector('#rainbow-button');

rainbowButton.addEventListener('click', () => {
    rainbowMode=true;
});

function pickColor() {
    color = this.value;
}

colorPicker.addEventListener('change', pickColor);

function displayCreateSketchPopUp(){
    const main = document.querySelector('main');
    const popUpBackground = document.createElement('div');
    popUpBackground.id = 'pop-up-background';

    const popUpContainer = document.createElement('div');
    popUpContainer.id = 'pop-up-container';
    
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
        main.removeChild(popUpBackground);
    })
    main.appendChild(popUpBackground);
}

function createSketch(e) {
    e.stopPropagation();
    const popUpInput = document.querySelector('#pop-up-input');
    const numberOfGrids = parseInt(popUpInput.value);
    if(numberOfGrids>100) {
        const popUpAlert=document.querySelector('#pop-up-alert');
        popUpAlert.textContent='The number of maximum grid is 100!';
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
    const main = document.querySelector('main');
    const popUpBackground = document.querySelector('#pop-up-background');
    main.removeChild(popUpBackground);
}

newSketchBtn.addEventListener('click', displayCreateSketchPopUp);

function getRandomRGBCode() {
    return Math.floor(Math.random()*255)+1;
}

function changeGridColorOnHover() {
    if(rainbowMode === true) {
        this.style.backgroundColor = `rgb(${getRandomRGBCode()}, ${getRandomRGBCode()}, ${getRandomRGBCode()})`
        return;
    }
    this.style.backgroundColor = color;
}

for(let i =0;i<16*16;i++){
    const sketchGrid = document.createElement('div');
    sketchGrid.classList.add('sketch-grid');
    sketchGrid.addEventListener('mouseover', changeGridColorOnHover);
    sketchContainer.appendChild(sketchGrid);
}
sketchContainer.style.gridTemplateColumns='repeat(16, auto)';
sketchContainer.style.gridTemplateRows='repeat(16, auto)';