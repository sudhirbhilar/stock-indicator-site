const ctx = document.getElementById('stockChart').getContext('2d');

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Stock Price',
            data: [10, 20, 30, 25, 15, 35, 45],
            borderColor: 'blue',
            fill: false
        }]
    },
    options: {
        scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true }
        }
    }
});