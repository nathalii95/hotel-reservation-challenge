const hotels = [
    {
        name: "Lakewood",
        stars: 3,
        rates: {
            weekday: { regular: 110, rewards: 80 },
            weekend: { regular: 90, rewards: 80 }
        }
    },
    {
        name: "Bridgewood",
        stars: 4,
        rates: {
            weekday: { regular: 160, rewards: 110 },
            weekend: { regular: 60, rewards: 50 }
        }
    },
    {
        name: "Ridgewood",
        stars: 5,
        rates: {
            weekday: { regular: 220, rewards: 100 },
            weekend: { regular: 150, rewards: 40 }
        }
    }
];

function isWeekend(date) {
    const day = new Date(date).getDay();
    return day === 6 || day === 0;
}

function calculateTotalCost(hotel, dates, customerType) {
    return dates.reduce((total, date) => {
        const dayType = isWeekend(date) ? 'weekend' : 'weekday';
        return total + hotel.rates[dayType][customerType];
    }, 0);
}

function findCheapestHotel() {
    const dateInputs = document.querySelectorAll('.date-input');
    const dates = Array.from(dateInputs).map(input => input.value).filter(date => date);

    if (dates.length === 0) {
        alert('Por favor, ingresa al menos una fecha.');
        return;
    }

    const isRewardsCustomer = document.getElementById('customerType').checked;
    const customerType = isRewardsCustomer ? 'rewards' : 'regular';

    let cheapestHotel = null;
    let lowestCost = Infinity;

    hotels.forEach(hotel => {
        const totalCost = calculateTotalCost(hotel, dates, customerType);

        if (totalCost < lowestCost || 
            (totalCost === lowestCost && hotel.stars > (cheapestHotel?.stars || 0))) {
            cheapestHotel = hotel;
            lowestCost = totalCost;
        }
    });

    displayHotels(cheapestHotel);
}

function displayHotels(cheapestHotel) {
    const container = document.getElementById('hotelsContainer');
    container.innerHTML = '';

    hotels.forEach(hotel => {
        const card = document.createElement('div');
        card.className = 'hotel-card';

        if (hotel === cheapestHotel) {
            card.classList.add('highlight');
        }

        card.innerHTML = `
            <h3>${hotel.name}</h3>
            <div class="stars">${'★'.repeat(hotel.stars)}${'☆'.repeat(5 - hotel.stars)}</div>
            <p>Días de semana: Regular $${hotel.rates.weekday.regular}, Recompensas $${hotel.rates.weekday.rewards}</p>
            <p>Fines de semana: Regular $${hotel.rates.weekend.regular}, Recompensas $${hotel.rates.weekend.rewards}</p>
        `;
        container.appendChild(card);
    });
}

function addDateInput() {
    const container = document.getElementById('dateInputsContainer');
    const input = document.createElement('input');
    input.type = 'date';
    input.className = 'date-input';
    container.appendChild(input);
}

function resetForm() {
    document.getElementById('customerType').checked = false;
    document.getElementById('hotelsContainer').innerHTML = '';
    const dateInputsContainer = document.getElementById('dateInputsContainer');
    dateInputsContainer.innerHTML = '<input type="date" class="date-input" placeholder="Fecha">';
}
