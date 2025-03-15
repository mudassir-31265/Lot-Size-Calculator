document.addEventListener("DOMContentLoaded", function () {
    // Load saved values from localStorage
    if (localStorage.getItem("accountBalance")) {
        document.getElementById("accountBalance").value = localStorage.getItem("accountBalance");
    }
    if (localStorage.getItem("riskPercentage")) {
        document.getElementById("riskPercentage").value = localStorage.getItem("riskPercentage");
    }

    // Fetch live BTC/USD and XAU/USD prices
    fetchLivePrices();
});

// Function to calculate lot size
function calculateLotSize() {
    let accountBalance = parseFloat(document.getElementById("accountBalance").value);
    let riskPercentage = parseFloat(document.getElementById("riskPercentage").value);
    let instrument = document.getElementById("instrument").value;
    let entryPrice = parseFloat(document.getElementById("entryPrice").value);
    let stopLoss = parseFloat(document.getElementById("stopLoss").value);

    if (isNaN(accountBalance) || isNaN(riskPercentage) || isNaN(entryPrice) || isNaN(stopLoss) || accountBalance <= 0 || riskPercentage <= 0) {
        alert("Please enter valid values!");
        return;
    }

    // Save account balance & risk percentage in localStorage
    localStorage.setItem("accountBalance", accountBalance);
    localStorage.setItem("riskPercentage", riskPercentage);

    let riskAmount = (accountBalance * riskPercentage) / 100;
    let stopLossPoints = Math.abs(entryPrice - stopLoss);

    let lotSize;
    if (instrument === "BTCUSD") {
        let valuePerPoint = 1; // 1 lot = $1 per point for BTC
        lotSize = riskAmount / (stopLossPoints * valuePerPoint);
    } else if (instrument === "XAUUSD") {
        let valuePerPoint = 10; // 1 lot = $10 per point for XAU
        lotSize = riskAmount / (stopLossPoints * valuePerPoint);
    }

    document.getElementById("result").innerHTML = `Lot Size: ${lotSize.toFixed(2)} lots`;
}

// Function to fetch live BTC/XAU prices
function fetchLivePrices() {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
        .then(response => response.json())
        .then(data => {
            let btcPrice = data.bitcoin.usd;
            document.getElementById("liveBTCPrice").innerText = `BTC/USD Live Price: $${btcPrice}`;
        })
        .catch(error => console.error("Error fetching BTC price:", error));

    fetch("https://api.metals.live/v1/spot")
        .then(response => response.json())
        .then(data => {
            let xauPrice = data[0].gold;
            document.getElementById("liveXAUPrice").innerText = `XAU/USD Live Price: $${xauPrice}`;
        })
        .catch(error => console.error("Error fetching XAU price:", error));
}
