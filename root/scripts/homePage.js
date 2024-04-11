function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString('en-US', { hour12: true });
    document.getElementById('datetime').textContent = dateTimeString;
}

setInterval(updateDateTime, 1000);


document.addEventListener('DOMContentLoaded', updateDateTime);
