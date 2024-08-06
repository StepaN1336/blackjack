const initialCards = {
    aceOfHearts: [1, 11],
    aceOfSpades: [1, 11],
    aceOfDiamonds: [1, 11],
    aceOfClubs: [1, 11],
    kingOfHearts: 10,
    kingOfSpades: 10,
    kingOfDiamonds: 10,
    kingOfClubs: 10,
    queenOfHearts: 10,
    queenOfSpades: 10,
    queenOfDiamonds: 10,
    queenOfClubs: 10,
    jackOfHearts: 10,
    jackOfSpades: 10,
    jackOfDiamonds: 10,
    jackOfClubs: 10,
    tenOfHearts: 10,
    tenOfSpades: 10,
    tenOfDiamonds: 10,
    tenOfClubs: 10,
    nineOfHearts: 9,
    nineOfSpades: 9,
    nineOfDiamonds: 9,
    nineOfClubs: 9,
    eightOfHearts: 8,
    eightOfSpades: 8,
    eightOfDiamonds: 8,
    eightOfClubs: 8,
    sevenOfHearts: 7,
    sevenOfSpades: 7,
    sevenOfDiamonds: 7,
    sevenOfClubs: 7,
    sixOfHearts: 6,
    sixOfSpades: 6,
    sixOfDiamonds: 6,
    sixOfClubs: 6,
    fiveOfHearts: 5,
    fiveOfSpades: 5,
    fiveOfDiamonds: 5,
    fiveOfClubs: 5,
    fourOfHearts: 4,
    fourOfSpades: 4,
    fourOfDiamonds: 4,
    fourOfClubs: 4,
    threeOfHearts: 3,
    threeOfSpades: 3,
    threeOfDiamonds: 3,
    threeOfClubs: 3,
    twoOfHearts: 2,
    twoOfSpades: 2,
    twoOfDiamonds: 2,
    twoOfClubs: 2
};
let cards = { ...initialCards };

let playerScore = 0;
let dealerScore = 0;
let playerCards = '';
let dealerCards = '';
let gameEndStatus = false;
let dealerAceInHandAmount = 0;
let playerAceInHandAmount = 0;

const startButton = document.querySelector('.start-button');
const passButton = document.querySelector('.pass-button');
const getCardButton = document.querySelector('.get-button');
const gameResultField = document.querySelector('.game-result');


startButton.addEventListener('click', () => {
    startNewGame();
});

passButton.addEventListener('click', () => {
    playerPass();
});

getCardButton.addEventListener('click', () => {
    playerGotCard()
})

function startNewGame() {
    cards = { ...initialCards };
    playerScore = 0;
    dealerScore = 0;
    playerCards = '';
    dealerCards = '';
    gameEndStatus = false;
    gameResultField.textContent = '';
    for (let i = 0; i < 2; i++) {
        addPlayerCard()
    }
    addDealerCard();
}

function gameOver() {
    if((dealerScore > playerScore) && dealerScore <= 21) {
        gameResultField.textContent = 'Dealer Won!';
    } else if(dealerScore === playerScore) {
        gameResultField.textContent = 'Tie! Your bet have been returned!';
    } else if(playerScore > 21){
        gameResultField.textContent = 'Dealer Won!';
    } else {
        gameResultField.textContent = 'Player Won!';
    }
};

function getRandomCard() {
    const keys = Object.keys(cards);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    const randomValue = cards[randomKey];

    delete cards[randomKey];

    return [randomKey, randomValue];
}

function addPlayerCard() {
    const playerCard = getRandomCard();
    playerCards += playerCard[0] + ', ';
    
    if(playerCards.includes('ace') && !playerCard[0].includes('ace') && playerScore + playerCard[1] > 21 && playerAceInHandAmount > 0) {
        playerScore -= 10;
    }
    if (playerCard[0].includes('ace')) {
        playerAceInHandAmount++;
        if (playerScore > 10) {
            playerScore += 1
        } else {
            playerScore += 11;
        }
        console.log('Test');
        cardAndScoreRender()
        return;
    }

    playerScore += playerCard[1];
    cardAndScoreRender()
}

function addDealerCard() {
    const dealerCard = getRandomCard();
    dealerCards += dealerCard[0] + ', ';

    if(dealerCards.includes('ace') && !dealerCard[0].includes('ace') && dealerScore + dealerCard[1] > 21 && dealerAceInHandAmount > 0) {
        dealerScore -= 10;
    }
    if (dealerCard[0].includes('ace')) {
        dealerAceInHandAmount++;
        if (dealerScore > 10) {
            dealerScore += 1
        } else {
            dealerScore += 11;
        }
        cardAndScoreRender()
        return;
    }
    dealerScore += dealerCard[1];
    cardAndScoreRender()
}

function cardAndScoreRender() {
    const dealerCardsField = document.querySelector('.dealer-cards');
    const dealerScoreField = document.querySelector('.dealer-score');
    const playerCardsField = document.querySelector('.player-cards');
    const playerScoreField = document.querySelector('.player-score');

    dealerCardsField.textContent = `Dealer Cards: ${dealerCards}`;
    dealerScoreField.textContent = `Dealer Score: ${dealerScore}`;
    playerCardsField.textContent = `Player Cards: ${playerCards}`;
    playerScoreField.textContent = `Player Score: ${playerScore}`;
}

function playerPass() {
    if(gameEndStatus === true) {
        alert('Game ended! Start a new one');
        return;
    }
    for (; ;) {
        setTimeout(1000);
        if(dealerScore < playerScore) addDealerCard();
        if(dealerScore > 21) {
            gameEndStatus = true;
            gameOver();
            break
        }
        if(dealerScore === playerScore) {
            gameEndStatus = true;
            gameOver();
            break;
        }
        if(dealerScore > playerScore) {
            gameEndStatus = true;
            gameOver();
            break;
        }
    }
}

function playerGotCard() {
    if(gameEndStatus === true) {
        alert('Game ended! Start a new one');
        return;
    }
    addPlayerCard();
    if(playerScore > 21) {
        gameEndStatus = true;
        gameOver();
    }
}
