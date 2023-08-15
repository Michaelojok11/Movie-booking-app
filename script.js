const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementsByName('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value; 

// Add event listeners
container.addEventListener('click', (e) => {
    // check if we are adding the target
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        // Add a class so that it turns to blue
        e.target.classList.toggle('selected');
    }
});

