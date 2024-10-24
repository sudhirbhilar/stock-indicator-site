const apiKey = '591ca27796msh3f4821afd69f473p1c4f21jsn3b6d208feae6'; // Replace with your actual RapidAPI key

// Elements
const stockSelect = document.getElementById('stockSelect');
const ctx = document.getElementById('stockChart').getContext('2d');

// Default chart data
let stockData = [];
let labels = [];

// Create the chart
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Stock Price',
            data: stockData,
            borderColor: 'blue',
            fill: false
        }]
    },
    options: {
        scales: {
            x: { beginAtZero: false },
            y: { beginAtZero: false }
        }
    }
});

// Function to fetch stock data
async function fetchStockData(stockSymbol) {
    const url = `https://yh-finance.p.rapidapi.com/stock/v3/get-historical-data?symbol=${stockSymbol}&region=IN`;
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const prices = result.prices;

        stockData = prices.map(data => data.close);
        labels = prices.map(data => new Date(data.date * 1000).toLocaleDateString());

        updateChart();
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}

// Function to update the chart with new data
function updateChart() {
    chart.data.labels = labels;
    chart.data.datasets[0].data = stockData;
    chart.update();
}

// Event listener to fetch new stock data when dropdown changes
stockSelect.addEventListener('change', (e) => {
    const selectedStock = e.target.value;
    fetchStockData(selectedStock);
});

// Fetch default stock data (first stock in the dropdown)
fetchStockData(stockSelect.value);