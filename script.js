document.addEventListener('DOMContentLoaded', function() {
  const nameInputScreen = document.getElementById('name-input-screen');
  const gameScreen = document.getElementById('game-screen');
  const playerForm = document.getElementById('player-form');
  const player1Input = document.getElementById('player1-input');
  const player2Input = document.getElementById('player2-input');
  const player1Name = document.getElementById('player1-name');
  const player2Name = document.getElementById('player2-name');
  const counter1 = document.getElementById('counter1');
  const counter2 = document.getElementById('counter2');
  const decrementBtns = document.querySelectorAll('.decrement');
  const incrementBtns = document.querySelectorAll('.increment');

  // ローカルストレージからデータを読み込む
  let player1 = JSON.parse(localStorage.getItem('player1')) || { name: '', points: 0 };
  let player2 = JSON.parse(localStorage.getItem('player2')) || { name: '', points: 0 };

  // 保存されたデータがあれば、ゲーム画面を表示
  if (player1.name && player2.name) {
      showGameScreen();
  } else {
      nameInputScreen.style.display = 'block';
  }

  playerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      player1.name = player1Input.value.trim();
      player2.name = player2Input.value.trim();
      
      if (player1.name && player2.name) {
          saveToLocalStorage();
          showGameScreen();
      }
  });

  function showGameScreen() {
      player1Name.textContent = player1.name;
      player2Name.textContent = player2.name;
      counter1.textContent = player1.points;
      counter2.textContent = player2.points;
      nameInputScreen.style.display = 'none';
      gameScreen.style.display = 'block';
  }

  function updateCounter(playerObj, counter) {
      counter.textContent = playerObj.points;
      saveToLocalStorage();
  }

  function saveToLocalStorage() {
      localStorage.setItem('player1', JSON.stringify(player1));
      localStorage.setItem('player2', JSON.stringify(player2));
  }

  decrementBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
          let playerObj = index === 0 ? player1 : player2;
          let counterElement = index === 0 ? counter1 : counter2;
          if (playerObj.points > 0) {
              playerObj.points--;
              updateCounter(playerObj, counterElement);
          }
      });
  });

  incrementBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
          let playerObj = index === 0 ? player1 : player2;
          let counterElement = index === 0 ? counter1 : counter2;
          playerObj.points++;
          updateCounter(playerObj, counterElement);
      });
  });
});