'use strict'
// making cards with values and points
const suits = ["S", "D", "C", "H"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const deck = [];
let deckForHand = [];
let moneyText = 'Money: 1000';
let betText = 'Bet: 0';
let gamePlText = '';
let gameDlText = '';
let endText = '';
let lastBet = 0;
const render = () => {
   moneyText = `Money: ${game.allMoney}`;
   betText = `Bet: ${game.bet}`;
   gamePlText = `Player Sum:${game.playerSum}`
   gameDlText = `Dealer Sum:${game.dealerSum}`
};

class Game {
   constructor() {
      this.allMoney = 1000
      this.bet = 0
      this.playerCards = []
      this.dealerCards = []
      this.playerSum = 0
      this.dealerSum = 0
   }
   Load() {
      suits.forEach(suit => {
         values.forEach(value => {
            deck.push({
               suit: suit,
               value: value,
            });
         });
      });
      deck.forEach(card => {
         if (card.value === 'A') {
            card.point = 11;
         } else if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
            card.point = 10
         } else {
            card.point = Number(card.value)
         };
      });
   }
   rebetAndDeal() {
      if (lastBet <= this.allMoney) {
         endText = '';
         this.playerCards = [];
         this.dealerCards = [];
         this.bet = lastBet;
         this.deal();
         render();
      } else {
         alert('you dont have enough money');
      };
   }
   newGame() {
      endText = '';
      this.playerCards = [];
      this.dealerCards = [];
      render();
   }
   double() {
      if (this.bet <= this.allMoney) {
         this.allMoney = this.allMoney - this.bet;
         this.bet *= 2
         this.hit();
         if (this.playerSum <= 21) {
            this.dealerHit();
         };
         render();
      } else {
         render();
         alert('you dont have enough movey');
      };
   }
   playerSumFunc() {
      let sum = 0;
      let boo = false;
      this.playerCards.forEach((card) => {
         sum += card.point;
      });
      this.playerCards.forEach((card) => {
         if (card.value === 'A') {
            boo = true;
         };
      });
      if (sum > 21 && boo) {
         this.playerSum = sum - 10;
      } else {
         this.playerSum = sum;
      }
      render();
   }
   dealerSumFunc() {
      let sum = 0;
      let boo = false
      this.dealerCards.forEach((card) => {
         sum += card.point
      });
      this.dealerSum = sum;
      this.dealerCards.forEach((card) => {
         if (card.value === 'A') {
            boo = true;
         };
      });
      if (boo) {
         this.dealerSum = sum - 10;
      };
      render();
   }
   deal() {
      deckForHand = [...deck];
      this.shuffle();
      if (this.bet > 0) {
         this.allMoney = this.allMoney - this.bet;
         this.playerCards.push(deckForHand[0], deckForHand[1]);
         this.dealerCards.push(deckForHand[2], deckForHand[3]);

         deckForHand.splice(0, 4);
         this.playerSumFunc();
         this.dealerSum = game.dealerCards[1].point;
         if (this.playerSum === 21) {
            this.dealerSumFunc();
            if (this.dealerSum === 21) {
               endText = 'Draw! Both Hava BJ';
               this.allMoney += this.bet;
               lastBet = this.bet;
               this.bet = 0;
            } else {
               endText = `BlackJack! you won:${this.bet * 1.5}$`
               this.allMoney += this.bet * 1.5 + this.bet;
               lastBet = this.bet;
               this.bet = 0;
            };
         };
         render();
      };
   }
   hit() {
      this.playerCards.push(deckForHand[0]);
      deckForHand.splice(0, 1);
      this.playerSumFunc();
      if (this.playerSum > 21) {
         endText = `You have exceeded 21, you lost:${this.bet}$`
         lastBet = this.bet;
         this.bet = 0;
      };
      render();
   }
   stand() {
      this.dealerHit();
      render();
   }
   surrender() {
      this.allMoney += this.bet / 2;
      lastBet = this.bet;
      endText = `You surrendered, you lost:${this.bet / 2}$`
      this.bet = 0;
      render();
   }
   dealerHit() {
      this.dealerSumFunc();
      while (this.dealerSum < 17) {
         this.dealerCards.push(deckForHand[0]);
         deckForHand.splice(0, 1);
         this.dealerSumFunc();
      };
      render();
      this.whoWon();
   }
   whoWon() {
      if (this.dealerSum >= 22) {
         endText = `Dealer card value exceeded 21, you won:${this.bet}$`;
         this.allMoney += this.bet * 2;
         lastBet = this.bet;
         this.bet = 0;
      } else {
         if (this.dealerSum > this.playerSum) {
            endText = `Dealer has better cards, you lost:${this.bet}$`;
            lastBet = this.bet;
            this.bet = 0;
         } else if (this.dealerSum < this.playerSum) {
            endText = `You Have better cards, you won:${this.bet}`;
            this.allMoney += this.bet * 2;
            lastBet = this.bet;
            this.bet = 0;
         } else {
            endText = 'draw';
            this.allMoney += this.bet;
            lastBet = this.bet;
            this.bet = 0;
         };
      };
   }
   shuffle() {
      for (let index = 0; index < 100; index++) {
         let a = Math.floor(Math.random() * deckForHand.length);
         let b = Math.floor(Math.random() * deckForHand.length);
         let fromLocation1 = deckForHand[a];
         let fromLocation2 = deckForHand[b];
         deckForHand[a] = fromLocation2;
         deckForHand[b] = fromLocation1;
      };
   }
}