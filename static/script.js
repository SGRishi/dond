const PRIZES = [0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500,
                750, 1000, 5000, 10000, 25000, 50000, 75000, 100000,
                200000, 300000, 400000, 500000, 750000, 1000000];
let shuffledCases = [];
let playerCase = null;
let remainingCases = [];
let round = 0;
let casesToOpen = [6,5,4,3,2];
let offers = [];

function shuffleCases() {
    shuffledCases = PRIZES.slice().sort(() => Math.random() - 0.5);
}

function renderCases() {
    const container = document.getElementById('cases');
    container.innerHTML = '';
    shuffledCases.forEach((_, i) => {
        const div = document.createElement('div');
        div.className = 'case';
        div.id = 'case-' + (i+1);
        div.innerText = i + 1;
        div.onclick = () => chooseCase(i);
        container.appendChild(div);
    });
}

function chooseCase(index) {
    if (playerCase === null) {
        playerCase = index;
        document.getElementById('case-' + (index+1)).style.backgroundColor = '#ffa';
        remainingCases = shuffledCases.map((v, i) => i).filter(i => i !== index);
        nextRound();
    } else if (remainingCases.includes(index)) {
        openCase(index);
    }
}

function openCase(index) {
    const value = shuffledCases[index];
    document.getElementById('case-' + (index+1)).innerText = value;
    document.getElementById('case-' + (index+1)).onclick = null;
    remainingCases = remainingCases.filter(i => i !== index);
    updateRemaining();
    checkRoundCompletion();
}

function updateRemaining() {
    const values = remainingCases.map(i => shuffledCases[i]);
    document.getElementById('remaining').innerText = 'Remaining amounts: ' + values.join(', ');
}

function bankerOffer() {
    const values = remainingCases.map(i => shuffledCases[i]);
    const mean = values.reduce((a,b)=>a+b,0) / values.length;
    const offer = Math.round(mean * (0.5 + round*0.05));
    offers.push(offer);
    const bankDiv = document.getElementById('bank-offer');
    bankDiv.innerHTML = `Bank offers £${offer} <button onclick="deal()">Deal</button> <button onclick="noDeal()">No Deal</button>`;
    bankDiv.classList.remove('hidden');
}

function deal() {
    alert('You won £' + offers[offers.length-1]);
    location.reload();
}

function noDeal() {
    document.getElementById('bank-offer').classList.add('hidden');
    nextRound();
}

function checkRoundCompletion() {
    const opened = shuffledCases.length - 1 - remainingCases.length;
    if (opened >= casesToOpen[round]) {
        bankerOffer();
    }
}

function nextRound() {
    if (round >= casesToOpen.length) {
        if (remainingCases.length <= 1) {
            endGame();
        } else {
            casesToOpen.push(1);
            round++;
        }
    } else {
        round++;
    }
}

function endGame() {
    const otherIndex = remainingCases[0];
    const playerAmount = shuffledCases[playerCase];
    const otherAmount = shuffledCases[otherIndex];
    const finalOffer = Math.round((playerAmount + otherAmount)/2);
    const swap = confirm(`Final offer £${finalOffer}. Deal?`);
    if (swap) {
        alert('You won £' + finalOffer);
    } else {
        const swapCase = confirm('Swap your case?');
        const finalAmount = swapCase ? otherAmount : playerAmount;
        alert('You won £' + finalAmount);
    }
    location.reload();
}

window.onload = () => {
    shuffleCases();
    renderCases();
    document.getElementById('remaining').innerText = 'Pick your case.';
};
