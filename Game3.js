function shuffleElements() {
    const container = document.querySelector('.container');
    const target = document.querySelector('.target');
    const colorShapes = document.querySelectorAll('.color-shape');
    const colorNameTargets = document.querySelectorAll('.color-name-target');

    
    const colorShapesArray = Array.from(colorShapes);
    const colorNameTargetsArray = Array.from(colorNameTargets);
    const message = document.getElementById('message');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const closePopupButton = document.getElementById('close-popup');

    colorShapesArray.sort(() => Math.random() - 0.5);
    colorNameTargetsArray.sort(() => Math.random() - 0.5);
    container.innerHTML = '';
    target.innerHTML = '';
    colorShapesArray.forEach(colorShape => container.appendChild(colorShape));
    colorNameTargetsArray.forEach(colorNameTarget => target.appendChild(colorNameTarget));
}

window.onload = shuffleElements;

const message = document.getElementById('message');
const colorShapes = document.querySelectorAll('.color-shape');
const colorNameTargets = document.querySelectorAll('.color-name-target');
let draggedShape = null;

colorShapes.forEach(colorShape => {
    colorShape.addEventListener('dragstart', dragStart);
    colorShape.addEventListener('dragend', dragEnd);
});

colorNameTargets.forEach(colorNameTarget => {
    colorNameTarget.addEventListener('dragover', dragOver);
    colorNameTarget.addEventListener('dragenter', dragEnter);
    colorNameTarget.addEventListener('dragleave', dragLeave);
    colorNameTarget.addEventListener('drop', dragDrop);
});

function dragStart() {
    draggedShape = this;
    setTimeout(() => (this.style.display = 'none'), 0);
}

function dragEnd() {
    draggedShape.style.display = 'block';
    draggedShape = null;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('hovered');
}

function dragLeave() {
    this.classList.remove('hovered');
}

function dragDrop() {
    this.classList.remove('hovered');
    if (draggedShape.dataset.color === this.dataset.color) {
        this.style.background = draggedShape.style.background;
        draggedShape.style.visibility = 'hidden';
        showMessage('Correct!');
       
    } else {
        showMessage('Wrong!');
    }
}
function showMessage(text) {
    const popupMessage = document.getElementById('popup-message');
    const popup = document.getElementById('popup');
    popupMessage.textContent = text;
    popup.style.display = 'block';
}

const closePopupButton = document.getElementById('close-popup');
closePopupButton.addEventListener('click', () => {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    const popupMessage = document.getElementById('popup-message');
    popupMessage.textContent = '';
});


/* animation for floating effect */
const shape = document.querySelector('.container');
let x = 0;
let y = 0;
let xDirection = 1;
let yDirection = 1;
const speed = 2;

function moveShape() {
    x += xDirection * speed;
    y += yDirection * speed;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Check for collisions with the screen edges
    if (x + shape.clientWidth > screenWidth || x < 0) {
        xDirection *= -1;
    }

    if (y + shape.clientHeight > screenHeight || y < 0) {
        yDirection *= -1;
    }

    shape.style.transform = `translate(${x}px, ${y}px)`;

    requestAnimationFrame(moveShape);
}

moveShape();
