document.getElementById('rollButton').addEventListener('click', function() {
    const formula = document.getElementById('formula').value;
    const resultElement = document.getElementById('result');

    try {
        const result = rollDiceFormula(formula);
        resultElement.textContent = `Result: ${result}`;
        displayResultInTab(result);
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
});

function rollDiceFormula(formula) {
    const dicePattern = /(\d*)d(\d+)/g;
    let match;
    let total = 0;

    while ((match = dicePattern.exec(formula)) !== null) {
        const count = parseInt(match[1]) || 1;
        const sides = parseInt(match[2]);

        if (sides < 2) {
            throw new Error("Dice must have at least 2 sides.");
        }

        for (let i = 0; i < count; i++) {
            total += Math.floor(Math.random() * sides) + 1;
        }
    }

    return total;
}

function displayResultInTab(result) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: (result) => {
                alert(`Dice Roll Result: ${result}`);
            },
            args: [result]
        });
    });
}
