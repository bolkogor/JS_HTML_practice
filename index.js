var openCards = [];
var timerIsStarted = false;
function randomizeCards() {
    var cards = document.getElementsByClassName('card');
    for (var i =0; i<cards.length;i++){
        cards[i].style.order = getRandom0to11();
    }
}
function getRandom0to11() {
    var rand = Math.floor(Math.random()*12);
    return rand.toString();
}
function touchCard(e) {
    if (e.target.tagName === "SPAN")
        e = e.target.parentElement;
    else e = e.target;
    if (!timerIsStarted) {
        startTimer();
        timerIsStarted = true;
    }
    if (e.classList.contains('card-correct') || e.classList.contains('card-wrong'))
        return;
    resetPair(openCards);
    e.classList.add('card-animation');
    var pic = e.querySelector('.emoji');
    setTimeout( function () {
        e.classList.remove('card-closed');
        e.classList.add('card-open');
        pic.classList.remove('emoji-closed');
        pic.classList.add('emoji-open');
    }, 200)
    console.log(e.textContent)
    openPair(e);

}
function openPair(card) {
    if (!card.classList.contains('card-open')) {
        openCards.push(card);
        console.log(openCards)
    }
    if (openCards.length === 2) {
        checkPair(openCards);
    }
}

function checkPair(cards) {
    if (cards[0].textContent === cards[1].textContent){
        cards[0].classList.add('card-correct');
        cards[1].classList.add('card-correct');
        openCards = [];
    }
    else {
        cards[0].classList.add('card-wrong');
        cards[1].classList.add('card-wrong');
    }
}

function resetPair(cards) {
    if (openCards.length===2) {
        defaultCard(cards[0]);
        defaultCard(cards[1]);
        openCards = [];
    }
}
function defaultCard(card) {
    var emoji = card.firstChild;
    card.classList.remove('card-animation')
    setTimeout(function () {
        card.classList.remove('card-wrong');
        card.classList.remove('card-correct');
        card.classList.remove('card-open');
        card.classList.add('card-closed');
        emoji.classList.remove('emoji-open');
        emoji.classList.add('emoji-closed')
    },200)
}

function startTimer() {
    var time = 60;
    var timer = document.querySelector('.timer');
    var timeCounter = setInterval(function () {
        if (time>9)
            timer.textContent = `00:${time}`;
        else
            timer.textContent = `00:0${time}`;
        --time;
        if (time<0 || checkGame()){
            clearInterval(timeCounter);
            gameOver(checkGame());
        }
    },1000)
}

function gameOver(result) {
var game = document.querySelector('.game-over');
    game.classList.remove('game-over-hidden');
    var text = document.querySelector('.game-over-text div');
    var button = document.querySelector('.game-over-text button');
    if (!result) {
        text.querySelector(':nth-child(1)').textContent = 'L'
        text.querySelector(':nth-child(2)').textContent = 'o'
        text.querySelector(':nth-child(3)').textContent = 's'
        text.querySelector(':nth-child(4)').textContent = 'e'
        button.textContent = 'Try again';
    } else {
        text.innerHTML = '<span>W</span><span>i</span><span>n</span>';
        button.textContent = 'Play again';
    }
}

function checkGame() {
    var cards = document.querySelectorAll('.card')
    var correctCards = 0;
    for (var i=0;i<cards.length;i++){
        if (cards[i].classList.contains('card-correct'))
            correctCards++;
    }
    return correctCards === 12
}
function resetGame() {
     var cards = document.getElementsByClassName('card');
     for (var i=0;i<cards.length;i++){
         defaultCard(cards[i]);
     }
     document.querySelector('.game-over').classList.add('game-over-hidden');
     setTimeout(function () {
         randomizeCards();
     },600)
     timerIsStarted = false;
     openCards = [];
}

randomizeCards();
var game = document.querySelector('#game')
game.addEventListener('click',function (e) {
    if (e.target.tagName === "DIV" ||e.target.tagName === "SPAN"){
        touchCard(e);
    }
})
document.querySelector('#new-game').addEventListener('click', function () {
    resetGame();
})
