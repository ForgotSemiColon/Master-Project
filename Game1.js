// script.js
let images = [];
let names = {};

function shuffleImages() {
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
    }
}

fetch('names.txt')
    .then(response => response.text())
    .then(data => {
        const nameLines = data.split('\n');
        nameLines.forEach(line => {
            const [nameKey, nameValue] = line.split(':').map(item => item.trim());
            names[nameKey] = nameValue;
        });

        for (let i = 1; i <= 6; i++) {
            images.push(`images/face${i}.png`);
        }

        shuffleImages();

        const shuffledNames = Object.values(names);
        shuffleArray(shuffledNames);

        displayImage(0);
        const optionsContainer = document.getElementById('options');
        shuffledNames.forEach(name => {
            const button = document.createElement('button');
            button.textContent = name;
            button.addEventListener('click', () => checkAnswer(name));
            optionsContainer.appendChild(button);
        });
    })
    .catch(error => console.error(error));

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayImage(index) {
    const imageElement = document.getElementById('image');
    imageElement.src = images[index];
}

function showPopup(message) {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    popupText.textContent = message;
    popup.style.display = 'block';
}

function hidePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function checkAnswer(selectedName) {
    const expectedName = names[`name${currentIndex + 1}`];

    if (selectedName === expectedName) {
        showPopup('Correct!');
    } else {
        showPopup('Wrong!');
    }

    setTimeout(hidePopup, 2000);

    currentIndex++;
    if (currentIndex < images.length) {
        displayImage(currentIndex);
    } else {
        alert('Game Over!');
    }
}

let currentIndex = 0;

window.addEventListener('load', () => {
    shuffleImages();
    displayImage(0);
});
