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

    let riskAmount = (accountBalance * riskPercentage) / 100;
    let stopLossPoints = Math.abs(entryPrice - stopLoss);

    let lotSize;
    
    if (instrument === "BTCUSD") {
        let valuePerPoint = 1; // 1 lot = $1 per point for BTC
        lotSize = riskAmount / (stopLossPoints * valuePerPoint);
    } 
    else if (instrument === "XAUUSD") {
        let valuePerPoint = 10; // 1 lot = $10 per point for XAU
        lotSize = riskAmount / (stopLossPoints * valuePerPoint);
    }

    document.getElementById("result").innerHTML = `Lot Size: ${lotSize.toFixed(2)} lots`;
}
