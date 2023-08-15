const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementsByName('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value; 

// update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    
    //    Get the length of the selected seats
    const selectedSeatsCount = selectedSeats.length;
    
    // update the values
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
})







// Add event listeners
container.addEventListener('click', (e) => {
    // check if we are adding the target
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        // Add a class so that it turns to blue
        e.target.classList.toggle('selected');
    }

    // update function to update the selected counts and price
    updateSelectedCount();
});

