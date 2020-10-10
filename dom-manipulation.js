'use strict';
const game = new Game;
const gameDiv1 = document.querySelector('#div1');
const gameDiv2 = document.querySelector('#div2');
const gameDiv3 = document.querySelector('#div3');
const gameDiv4 = document.querySelector('#div4');
const gameDiv5 = document.querySelector('#div5');
const dealDiv = document.querySelector('#dealDiv');
const money = document.createElement('h3');
const bet = document.createElement('h3');
const putMoney = document.createElement('button');
const moneyForm = document.createElement('form');
const betForm = document.createElement('form');
const betInput = document.createElement('input');
const moneyInput = document.createElement('input');
const placeBetButton = document.createElement('button');
const clearButton = document.createElement('button');
const button5 = document.createElement('button');
const button10 = document.createElement('button');
const button50 = document.createElement('button');
const button100 = document.createElement('button');
const button500 = document.createElement('button');
const buttonnss = [button5, button10, button50, button100, button500]
const dealButton = document.createElement('button');
const gamePl = document.createElement('p');
const gameDl = document.createElement('p');
const end = document.createElement('p');
const standButton = document.createElement('button');
const surrenderButton = document.createElement('button');
const doubleButton = document.createElement('button');
const hitButton = document.createElement('button');
const rebetButton = document.createElement('button');
const rebetdealButton = document.createElement('button');
putMoney.innerHTML = 'Put Money';
standButton.innerHTML = 'Stand';
surrenderButton.innerHTML = 'Surrender';
doubleButton.innerHTML = 'Double';
hitButton.innerHTML = 'Hit';
rebetButton.innerHTML = 'Rebet'
rebetdealButton.innerHTML = 'Rebet & Deal'
dealButton.innerHTML = 'Deal';
money.innerHTML = 'Money: 1000';
bet.innerHTML = 'Bet: 0';
placeBetButton.innerHTML = 'Place Bet';
clearButton.innerHTML = 'Clear Bet';
button5.innerHTML = '5';
button10.innerHTML = '10';
button50.innerHTML = '50';
button100.innerHTML = '100';
button500.innerHTML = '500';
gameDiv1.appendChild(money);
gameDiv1.appendChild(bet);
gameDiv2.appendChild(moneyForm);
gameDiv2.appendChild(betForm);
gameDiv2.appendChild(button5);
gameDiv2.appendChild(button10);
gameDiv2.appendChild(button50);
gameDiv2.appendChild(button100);
gameDiv2.appendChild(button500);
gameDiv2.appendChild(clearButton);
gameDiv3.appendChild(gamePl);
gameDiv3.appendChild(gameDl);
gameDiv3.appendChild(end);
gameDiv5.appendChild(hitButton);
gameDiv4.appendChild(rebetButton);
gameDiv4.appendChild(rebetdealButton);
gameDiv5.appendChild(doubleButton);
gameDiv5.appendChild(standButton);
gameDiv5.appendChild(surrenderButton);
dealDiv.appendChild(dealButton);
moneyForm.appendChild(putMoney);
moneyForm.appendChild(moneyInput);
betForm.appendChild(placeBetButton);
betForm.appendChild(betInput);
moneyInput.setAttribute('type', 'number');
moneyInput.setAttribute('title', 'Enter Money');
betInput.setAttribute('type', 'number');
betInput.setAttribute('title', 'Bet');
moneyForm.style.padding = "0px 0px 7px 0px"
betForm.style.padding = "0px 0px 7px 0px"
const renderDOM = () => {
   money.innerHTML = moneyText;
   bet.innerHTML = betText;
   gamePl.innerHTML = gamePlText;
   gameDl.innerHTML = gameDlText;
   end.innerHTML = endText;
};
///
renderDOM();
game.Load()
gameDiv3.style.display = 'none';
gameDiv4.style.display = 'none';
gameDiv5.style.display = 'none';
rebetButton.addEventListener('click', () => {
   game.newGame();
   gameDiv3.style.display = 'none';
   gameDiv2.style.display = 'block';
   gameDiv4.style.display = 'none';
   dealDiv.style.display = 'block';
   renderDOM();
});
rebetdealButton.addEventListener('click', () => {
   game.rebetAndDeal();
   gameDiv4.style.display = 'none';
   gameDiv5.style.display = 'block';
   renderDOM();
});
hitButton.addEventListener('click', () => {
   if (endText == '') {
      game.hit();
      render();
      renderDOM();
   };
});
standButton.addEventListener('click', () => {
   if (endText == '') {
      game.stand();
      render();
      renderDOM();
   };
});
surrenderButton.addEventListener('click', () => {
   if (endText == '') {
      game.surrender();
      render();
      renderDOM();
   };
});
doubleButton.addEventListener('click', () => {
   if (endText == '') {
      game.double();
      render();
      renderDOM();
   };
});
moneyForm.addEventListener('submit', (e) => {
   e.preventDefault();
   game.allMoney = Number(moneyInput.value);
   moneyInput.value = '';
   render();
   renderDOM();
});
betForm.addEventListener('submit', (e) => {
   e.preventDefault();
   if (Number(betInput.value) <= game.allMoney) {
      game.bet = Number(betInput.value);
      betInput.value = '';
      render();
      renderDOM();
   }
});
buttonnss.forEach(button => {
   button.addEventListener('click', () => {
      if (game.bet + Number(button.innerHTML) <= game.allMoney) {
         game.bet += Number(button.innerHTML);
         render();
         renderDOM();
      };
   });
});
clearButton.addEventListener('click', () => {
   game.bet = 0
   render();
   renderDOM();
});
dealButton.addEventListener('click', () => {
   if (game.bet > 0) {
      game.deal();
      gameDiv2.style.display = 'none';
      dealDiv.style.display = 'none';
      gameDiv3.style.display = 'block';
      gameDiv5.style.display = 'block';
      render();
      renderDOM();
   };
});
window.addEventListener('click', () => {
   if (endText !== '') {
      gameDiv4.style.display = 'block';
      gameDiv5.style.display = 'none';
   };
});


