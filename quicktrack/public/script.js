document.getElementById('entryForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const description = document.getElementById('description').value;

    const response = await fetch('/addEntry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, startTime, endTime, description }),
    });

    const result = await response.json();
    if (response.ok) {
        addEntryToTable(result.entry);
        document.getElementById('entryForm').reset();
    } else {
        console.error(result.error);
    }
});

async function fetchEntries() {
    const response = await fetch('/entries');
    const entries = await response.json();
    entries.forEach(addEntryToTable);
}

function addEntryToTable(entry) {
    const tableBody = document.querySelector('#entriesTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${entry.date}</td>
        <td>${entry.startTime}</td>
        <td>${entry.endTime}</td>
        <td>${entry.description}</td>
    `;

    tableBody.appendChild(row);
}

// Fetch entries when the page loads
fetchEntries();
