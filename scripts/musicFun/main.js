const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const audioElement = document.getElementById('audio');
const startButton = document.getElementById('startButton');
const background = document.getElementById('ambi-background');
let audioContext;
let analyser;
let dataArray;
let bufferLength;

document.addEventListener('DOMContentLoaded', () => {
    fetch('/scripts/musicFun/data.json')
        .then(response => response.json())
        .then(data => {
            populateDropdown(data);
        })
        .catch(error => console.error('Error:', error));
    
    document.getElementById('songSelect').addEventListener('change', (event) => {
        const audioElement = document.getElementById('audio');
        const selectedOption = event.target.options[event.target.selectedIndex];  // Access the selected <option> element
        const imageSrc = selectedOption.dataset.image;  // Access the data-image attribute
        
        if (selectedOption.value) {
            if (background) {
                background.src = imageSrc;  // Set the image source
            }
            audioElement.src = selectedOption.value;  // Set the audio source
            audioElement.play();  // Play the selected song
        }
    });
});

function populateDropdown(songs) {
    const selectElement = document.getElementById('songSelect');
    songs.forEach(song => {
        const option = document.createElement('option');
        option.value = song.link;
        option.setAttribute('data-image', song.img);  // Set data-image attribute
        option.textContent = `${song.name} (${song.genre})`;
        selectElement.appendChild(option);
    });
}

function initializeAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audioElement);
        analyser = audioContext.createAnalyser();
        
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 512;  // Increase the FFT size for more detailed data
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        draw();
    }
}

function draw() {
    requestAnimationFrame(draw);
    
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = 100;
    const barWidth = canvas.width / bufferLength;
    const numBars = bufferLength;
    
    for (let i = 0; i < numBars; i++) {
        const barHeight = dataArray[i];
        const angle = i * (Math.PI * 2 / numBars); // Angle for each bar
        const radius = maxRadius + barHeight / 2; // Dynamic radius based on frequency
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.fillStyle = `hsl(${(i / numBars) * 360}, 100%, 50%)`; // Hue based on index
        ctx.fillRect(x, y, barWidth, barHeight / 2);
    }
}

window.onload = function()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 200;

    initializeAudio();
}