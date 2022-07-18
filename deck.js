
const SUITS = ['♣', '♠', '♦', '♥'];                                                             //release 5                                           //release 5
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];              //all possible values of card

export default class Deck {                                                                     //constructor function that would be reusable
    constructor(cards = freshDeck()) {                                                            //give the new deck (point 6 from milestone repo)
        this.cards = cards
    }

    get numberOfCards() {                                                                         //getter return a total number of cards
        return this.cards.length
    }


    pop() {
        return this.cards.shift()
    }

    push(card) {
        this.cards.push(card)
    }

    shuffle() {                                                                      //shuffle the cards (point 7 from milestone repo)
        for (let i = this.numberOfCards - 1; i > 0; i--) {                                //to flip the card
            const newIndex = Math.floor(Math.random() * (i + 1))                            //give random number at i
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

class Card {                                                                        //(point 6 from milestone repo)
    constructor(suit, value) {                                                        //function that takes in 2 arrays(suits and values), give 52 cards
        this.suit = suit
        this.value = value
    }

    get color() {                                                                        //change the color of card
        return this.suit === "♣" || this.suit === "♠" ? "black" : "red"
    }

    getHTML() {                                                                      //(point 11 from ms repo)
        const cardDiv = document.createElement("div")                                  //creating a div el for render the card
        cardDiv.innerText = this.suit
        cardDiv.classList.add("card", this.color)
        cardDiv.dataset.value = `${this.value} ${this.suit}`
        return cardDiv
    }
}

function freshDeck() {                                                            //combines both array into fresh deck (point 6 from ms repo)
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)                                                 //return new card for every element 
        })
    })
}