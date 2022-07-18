$(document).ready(function () {
    getData();
})

function getData() {
    $.ajax({
        url: 'index.html',
        type: 'GET',
        dataType: 'text',
        success: successFn,
        error: errorFn,
        complete: function (xhr, status) {
            console.log('the request is completed');
        }
    })
}

function successFn() {
    console.log('Success');
}

function errorFn() {
    console.log('Success');
}

import Deck from "./deck.js"

const CARD_VALUE_MAP = {                                               //give the value to every element of array values
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
}

let playerDeck, computerDeck, inRound, stop

$("#draw").click(() => {                                                 //click on draw btn so it show random card to both players
    if (stop) {                                                          //to start the game
        startGame()
        return
    }

    if (inRound) {                                                        //want to clean between the round
        cleanBeforeRound()
    } else {
        flipCards()                                                       //for flip a cards
    }
})

startGame()                                                               //start a game
function startGame() {
    const deck = new Deck()
    deck.shuffle()

    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)                                //equally distribution of card
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))                              //new deck start from 0 to 26
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))           //new deck with last 26 cards
    inRound = false                                                                       //
    stop = false

    cleanBeforeRound()
}

function cleanBeforeRound() {                                               //clean before every round
    inRound = false
    $(".computer-card-slot").html('')
    $(".player-card-slot").html('')
    $(".text").html('')

    updateDeckCount()                                                        //update the count with every round
}

function flipCards() {                                                                   //flip a card
    inRound = true

    const playerCard = playerDeck.pop()                                                  //delete one card from player's deck
    const computerCard = computerDeck.pop()                                              //delete one card from computer's deck

    $(".player-card-slot").append(playerCard.getHTML())                                  //render the player card
    $(".computer-card-slot").append(computerCard.getHTML())

    updateDeckCount()

    if (isRoundWinner(playerCard, computerCard)) {                                       //check winner   
        $(".text").html(" You Win🥳")                                                     //if player wins
        playerDeck.push(playerCard)                                                      //push the player card to computer deck
        playerDeck.push(computerCard)
    } else if (isRoundWinner(computerCard, playerCard)) {                                //if the computer wins
        $(".text").html(" You Lose😕")
        computerDeck.push(playerCard)                                                     //push the computer card to player deck
        computerDeck.push(computerCard)
    } else {
        $(".text").html(" Draw😌")
        playerDeck.push(playerCard)                                                      //for draw card remains same
        computerDeck.push(computerCard)
    }

    if (isGameOver(playerDeck)) {                                                        //checking the winner
        $(".text").html("🤕Computer Win🤕!!")
        stop = true
    } else if (isGameOver(computerDeck)) {
        $(".text").html("🤠You Win🤠!!")
        stop = true
    }
}

function updateDeckCount() {                                                             //update every action/count 
    $(".computer-deck").html(computerDeck.numberOfCards)
    $(".player-deck").html(playerDeck.numberOfCards)
}

function isRoundWinner(cardOne, cardTwo) {                                               //check every round winner
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck) {
    return deck.numberOfCards === 0                                                      //if any players deck card become 0 than game is over
}

