// Service Workerの登録
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('/multi-point-system-generated-by-ai/service-worker.js')
          .then(function(registration) {
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
          }, function(err) {
              console.log('ServiceWorker registration failed: ', err);
          });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const openingScreen = document.getElementById('opening-screen');
  const gameScreen = document.getElementById('game-screen');
  const playerForm = document.getElementById('player-form');
  const player1NameInput = document.getElementById('player1-name');
  const player2NameInput = document.getElementById('player2-name');
  const player1Display = document.getElementById('player1-display');
  const player2Display = document.getElementById('player2-display');

  // Load player names from localStorage if available
  player1NameInput.value = localStorage.getItem('player1_name') || '';
  player2NameInput.value = localStorage.getItem('player2_name') || '';

  playerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const player1Name = player1NameInput.value;
      const player2Name = player2NameInput.value;
      
      // Save player names to localStorage
      localStorage.setItem('player1_name', player1Name);
      localStorage.setItem('player2_name', player2Name);

      player1Display.textContent = player1Name;
      player2Display.textContent = player2Name;
      
      openingScreen.style.display = 'none';
      gameScreen.style.display = 'block';
      
      initializeCounters();
  });

  function initializeCounters() {
      const counters = document.querySelectorAll('.counter');
      const decrementBtns = document.querySelectorAll('.decrement');
      const incrementBtns = document.querySelectorAll('.increment');

      counters.forEach((counter, index) => {
          const storageKey = `player${index + 1}_count`;
          let count = parseInt(localStorage.getItem(storageKey)) || 0;
          counter.textContent = count;

          decrementBtns[index].addEventListener('click', function() {
              if (count > 0) {
                  count--;
                  updateCounter(counter, storageKey, count);
              }
          });

          incrementBtns[index].addEventListener('click', function() {
              count++;
              updateCounter(counter, storageKey, count);
          });
      });
  }

  function updateCounter(counterElement, storageKey, count) {
      counterElement.textContent = count;
      localStorage.setItem(storageKey, count.toString());
  }

  // Initialize game screen if player names are already set
  if (localStorage.getItem('player1_name') && localStorage.getItem('player2_name')) {
      player1Display.textContent = localStorage.getItem('player1_name');
      player2Display.textContent = localStorage.getItem('player2_name');
      openingScreen.style.display = 'none';
      gameScreen.style.display = 'block';
      initializeCounters();
  }
});