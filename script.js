document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const seats = document.querySelectorAll(".row .seat:not(.occupied)");
    const count = document.getElementById("count");
    const total = document.getElementById("total");
    const movieSelect = document.getElementById("movie");

    // Get data from local storage and populate the UI
    function populateUI() {
        const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
        if (selectedSeats !== null && selectedSeats.length > 0) {
            seats.forEach((seat, index) => {
                if (selectedSeats.indexOf(index) > -1) {
                    seat.classList.add("selected");
                }
            });
        }
        const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

        if (selectedMovieIndex !== null) {
            movieSelect.selectedIndex = selectedMovieIndex;
        }
    }

    let ticketPrice = +movieSelect.value;

    // Save selected movie and price
    function setMovieData(movieIndex, moviePrice) {
        localStorage.setItem("selectedMovieIndex", movieIndex);
        localStorage.setItem("selectedMoviePrice", moviePrice);
    }

    // Update total and count
    function updateSelectedCount() {
        const selectedSeats = document.querySelectorAll(".row .seat.selected");
        const selectedSeatsCount = selectedSeats.length;

        count.innerText = selectedSeatsCount;
        total.innerText = selectedSeatsCount * ticketPrice;

        // Update local storage
        const seatsIndex = [...selectedSeats].map((seat) => {
            return [...seats].indexOf(seat);
        });

        localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    }

    // Movie select event
    movieSelect.addEventListener("change", (e) => {
        ticketPrice = +e.target.value;
        setMovieData(e.target.selectedIndex, e.target.value);

        updateSelectedCount();
    });

    // Add event listeners
    container.addEventListener("click", (e) => {
        if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
            e.target.classList.toggle("selected");
            updateSelectedCount();
        }
    });

    // Initial population
    populateUI();
    updateSelectedCount();
});