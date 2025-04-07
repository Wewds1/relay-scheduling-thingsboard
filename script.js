// ThingsBoard API details
const tbUrl = 'http://172.104.40.40:8080';
const deviceToken = 'XX3mCw961W0g4ZvTk6fh';

// Function to show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Hide notification after 3 seconds
}

// Save to history
function saveToHistory(dateTime, recurring) {
    const historyList = document.getElementById('scheduleHistoryList');
    const listItem = document.createElement('li');
    listItem.textContent = `Scheduled at ${dateTime} (${recurring})`;
    historyList.appendChild(listItem);
}

// Function to send schedule to ThingsBoard
function sendSchedule() {
    const date = document.getElementById('onDate').value;
    const time = document.getElementById('onTime').value;
    const recurring = document.getElementById('recurring').value;

    if (!date || !time) {
        alert('Please select both date and time!');
        return;
    }

    const fullDateTime = `${date}T${time}`;

    // Send the schedule data
    fetch(`${tbUrl}/api/v1/${deviceToken}/attributes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            relay_schedule: [
                {
                    datetime: fullDateTime,
                    recurring: recurring
                }
            ]
        })
    }).then(res => {
        if (res.ok) {
            showNotification('Schedule sent successfully!');
            saveToHistory(fullDateTime, recurring);
        } else {
            alert('Failed to send schedule to ThingsBoard.');
        }
    }).catch(() => {
        alert('Error: Could not connect to ThingsBoard.');
    });
}