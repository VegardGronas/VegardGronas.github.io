const navLinks = document.getElementById("nav-links");
document.getElementById("nav-toggle").addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// Get all card elements
const cards = document.querySelectorAll('.card');

// Add click event listener to each card
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h2').textContent;

        // Get all p tags within the card
        const descriptionElements = card.querySelectorAll('p');

        const imgElement = card.querySelector('img');
        const imageUrl = imgElement ? imgElement.src : null;

        // Create an empty string to store the combined text content of all p tags
        let description = '';

        // Loop through the p tags and concatenate their text content with HTML line breaks
        descriptionElements.forEach((p) => {
            description += p.textContent + '<br>';
        });

        document.getElementById('overlay-title').textContent = title;
        document.getElementById('overlay-description').innerHTML = description; // Use innerHTML to interpret the <br> tags as line breaks
        if (imageUrl) {
            document.getElementById('overlay-image').src = imageUrl;
        }
        else{
            document.getElementById('overlay-image').src = "";
        }
        document.getElementById('overlay').style.display = 'block';
    });
});

// Add a click event listener to the overlay
document.getElementById('overlay').addEventListener('click', (event) => {
    // Check if the clicked element is the overlay itself
    if (event.target.id === 'overlay') {
        document.getElementById('overlay').style.display = 'none';
    }
});

// Close the overlay when the close button is clicked
document.getElementById('close-overlay').addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';
});