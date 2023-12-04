// Function to set the status of a day in local storage
function setDayStatus(day, status) {
    localStorage.setItem(`day${day}`, status);
}

// Function to get the status of a day from local storage
function getDayStatus(day) {
    return localStorage.getItem(`day${day}`);
}

// Function to update the visual style of a day cell
function updateDayCell(day) {
    const cell = document.getElementById(`day${day}`);
    const status = getDayStatus(day);

    if (status === 'done') {
        cell.classList.add('done');
    }
}

// Event listener to handle cell clicks
document.querySelectorAll('td').forEach((cell, index) => {
    cell.addEventListener('click', () => {
        const currentStatus = getDayStatus(index + 1);

        if (!currentStatus || currentStatus === 'skipped') {
            setDayStatus(index + 1, 'done');
        } else {
            setDayStatus(index + 1, 'skipped');
        }

        updateDayCell(index + 1);
    });

    updateDayCell(index + 1);
});



const addNumbers = () => {
    for(let i=1; i<=120; i=i+1) {
        document.getElementById(`day${i}`).innerHTML = i;
    }
}

addNumbers();




async function getRandomQuote() {
    try {
        const response = await fetch('https://api.quotable.io/quotes/random');
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        return data[randomIndex].content + `<br/> ~ <i style="color:#gray"> ${data[randomIndex].author}</i>`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        return 'Error fetching quote. Try again later.';
    }
}

async function displayRandomQuote() {
    const quotesElement = document.getElementById('quotes');
    quotesElement.style.opacity = 0;
    
    const randomQuote = await getRandomQuote();
    quotesElement.innerHTML = `<br/><em>${randomQuote}</em>`;
    
    void quotesElement.offsetWidth;

    quotesElement.style.opacity = 1;
}

displayRandomQuote();
setInterval(displayRandomQuote, 60000);
