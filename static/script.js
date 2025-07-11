const PRIZES = [0.01,1,5,10,25,50,75,100,200,300,400,500,750,1000,5000,10000,25000,50000,75000,100000,200000,300000,400000,500000,750000,1000000];
const PALETTE = ["#c7647e","#317452","#51784d","#8e9755","#4c96d7","#7b67c5","#398489","#538282","#969696","#343637"];
let shuffledCases=[],playerCase=null,remainingCases=[],round=0,casesToOpen=[6,5,4,3,2],offers=[];

function shuffleCases(){
    shuffledCases = PRIZES.slice().sort(()=>Math.random()-0.5);
}

function renderCases(){
    const container=document.getElementById('cases');
    container.innerHTML='';
    shuffledCases.forEach((_,i)=>{
        const div=document.createElement('div');
        div.className='case';
        div.id='case-'+(i+1);
        div.innerText=i+1;
        div.style.backgroundColor=PALETTE[i%PALETTE.length];
        div.onclick=()=>chooseCase(i);
        container.appendChild(div);
    });
}

function chooseCase(index){
    if(playerCase===null){
        playerCase=index;
        document.getElementById('case-'+(index+1)).classList.add('opened');
        remainingCases=shuffledCases.map((_,i)=>i).filter(i=>i!==index);
        nextRound();
    }else if(remainingCases.includes(index)){
        openCase(index);
    }
}

function openCase(index){
    const value=shuffledCases[index];
    const div=document.getElementById('case-'+(index+1));
    div.innerText=value;
    div.classList.add('opened');
    div.onclick=null;
    remainingCases=remainingCases.filter(i=>i!==index);
    updateRemaining();
    checkRoundCompletion();
}

function updateRemaining(){
    const values=remainingCases.map(i=>shuffledCases[i]);
    document.getElementById('remaining').innerText='Remaining amounts: '+values.join(', ');
}

function bankerOffer(){
    const values=remainingCases.map(i=>shuffledCases[i]);
    const mean=values.reduce((a,b)=>a+b,0)/values.length;
    const offer=Math.round(mean*(0.5+round*0.05));
    offers.push(offer);
    const bankDiv=document.getElementById('bank-offer');
    bankDiv.innerHTML=`Bank offers £${offer} <button onclick="deal()">Deal</button> <button onclick="noDeal()">No Deal</button>`;
    bankDiv.classList.remove('hidden');
}

function deal(){
    alert('You won £'+offers[offers.length-1]);
    location.reload();
}

function noDeal(){
    document.getElementById('bank-offer').classList.add('hidden');
    nextRound();
}

function checkRoundCompletion(){
    const opened=PRIZES.length-1-remainingCases.length;
    if(opened>=casesToOpen[round]) bankerOffer();
}

function nextRound(){
    if(round>=casesToOpen.length){
        if(remainingCases.length<=1){
            endGame();
        }else{
            casesToOpen.push(1);
            round++;
        }
    }else{
        round++;
    }
}

function endGame(){
    const otherIndex=remainingCases[0];
    const playerAmount=shuffledCases[playerCase];
    const otherAmount=shuffledCases[otherIndex];
    const finalOffer=Math.round((playerAmount+otherAmount)/2);
    const dealNow=confirm(`Final offer £${finalOffer}. Deal?`);
    if(dealNow){
        alert('You won £'+finalOffer);
    }else{
        const swap=confirm('Swap your case?');
        const amount=swap?otherAmount:playerAmount;
        alert('You won £'+amount);
    }
    location.reload();
}

function setupScroll(){
    const arrow=document.querySelector('.scroll-down');
    arrow.addEventListener('click',()=>{
        document.getElementById('game').scrollIntoView({behavior:'smooth'});
    });
}

function setupTheme(){
    const toggle=document.querySelector('.theme-toggle');
    toggle.addEventListener('click',()=>{
        const body=document.body;
        body.classList.toggle('dark');
        body.classList.toggle('light');
        const icon=toggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
}

window.onload=()=>{
    shuffleCases();
    renderCases();
    updateRemaining();
    setupScroll();
    setupTheme();
    document.getElementById('remaining').innerText='Pick your case.';
};
