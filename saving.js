saveGame()


function saveGame() {
    const gameState = {
      //add all data here
    };
    saveData(gameState);
}

function loadGame() {
    const gameData = loadData();
    if (gameData) {
      loadData()
    } else {
      
    }
}

function saveData(data) {
  localStorage.setItem('gameData', JSON.stringify(data));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem('gameData'));
  return data;
}