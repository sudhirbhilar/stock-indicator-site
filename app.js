// Your RapidAPI key for Yahoo Finance API
const apiKey = '591ca27796msh3f4821afd69f473p1c4f21jsn3b6d208feae6'; // Replace with your actual RapidAPI key

// Get references to HTML elements
const stockSelect = document.getElementById('stockSelect');
const ctx = document.getElementById('stockChart').getContext('2d');

// Initial chart setup with no data
let stockData = [];
let labels = [];

// Initialize Chart.js instance
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels, // X-axis labels (dates)
        datasets: [{
            label: 'Stock Price',
            data: stockData, // Y-axis data (prices)
            borderColor: 'blue',
            fill: false
        }]
    },
    options: {
        scales: {
            x: { 
                type: 'time', // To show dates properly on X-axis
                time: {
                    unit: 'day',
                    tooltipFormat: 'll'
                }
            },
            y: { beginAtZero: false }
        }
    }
});

// Function to fetch stock data using the Yahoo Finance API
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

        // Assuming we're fetching the closing prices for each day
        const prices = result.prices;
        stockData = prices.map(data => data.close);
        labels = prices.map(data => new Date(data.date * 1000).toLocaleDateString());

        // Update chart with new data
        updateChart();
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}

// Function to update the chart with new data
function updateChart() {
    chart.data.labels = labels; // Update the X-axis (dates)
    chart.data.datasets[0].data = stockData; // Update the Y-axis (prices)
    chart.update(); // Refresh the chart
}

// Event listener to detect when the stock selection changes
stockSelect.addEventListener('change', (e) => {
    const selectedStock = e.target.value;
    fetchStockData(selectedStock); // Fetch new data for the selected stock
});

// Fetch data for the default stock when the page loads
fetchStockData(stockSelect.value);