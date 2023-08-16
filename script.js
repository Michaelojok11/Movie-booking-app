const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementsByName('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// get data from local storage and populate the ui
function populationUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if (selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) =>{
            if(selectedSeats.indexOf(index) > -1)
            seat.classList.add('selected');
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

let ticketPrice = +movieSelect.value; 

// save selected movie  and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}






// update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    
    // update local storage
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));


    //    Get the length of the selected seats
    const selectedSeatsCount = selectedSeats.length;
    
    // update the values
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// movie select event
    movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    
    updateSelectedCount();
});



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

updateSelectedCount();


