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


document.getElementById("resetButton").addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});
