const navLinks = document.getElementById("nav-links");
document.getElementById("nav-toggle").addEventListener("click", function () {
    navLinks.classList.toggle("active");
});


// Get all elements with class 'image-modal'
const imageModals = document.querySelectorAll('.image-modal');

// Add click event listener to each image modal
imageModals.forEach((imageModal) => {
    imageModal.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        const modalImage = modal.querySelector('.modal-content');
        modal.style.display = 'block';
        modalImage.src = this.src;

        // Add a click event listener to the modal container to close it when clicking outside the image
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

// Get all close buttons with class 'close'
const closeModalButtons = document.querySelectorAll('.close');

// Add click event listener to each close button
closeModalButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal-close');
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
    });
});