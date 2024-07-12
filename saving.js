function saveGame() {
    const gameState = {
    bugs: bugs,
    bugChance: bugChance,
    additionalFeatures: additionalFeatures,
    devs: devs,
    cash: cash,
    devUpdateTime: devUpdateTime,
    intervalId: intervalId,
    projectIntervalId: projectIntervalId,
    bugIntervalId: bugIntervalId,
    gameSpeed: gameSpeed,
    testers: testers,
    managers: managers,
    baseProjectCash: baseProjectCash,
    additionalFeatureMultiplier: additionalFeatureMultiplier,
    bugPenalty: bugPenalty,
    newProductWidth: newProductWidth
    };

    console.log(gameState);

    saveData(gameState);
}

function saveData(data) {
  localStorage.setItem('gameData', JSON.stringify(data));
}

function loadData() {
  var gameData = JSON.parse(localStorage.getItem('gameData'));

  bugs = gameData.bugs;
  bugChance = gameData.bugChance;
  additionalFeatures = gameData.additionalFeatures;
  devs = gameData.devs;
  cash = gameData.cash;
  devUpdateTime = gameData.devUpdateTime;
  intervalId = gameData.intervalId;
  projectIntervalId = gameData.projectIntervalId;
  bugIntervalId = gameData.bugIntervalId;
  gameSpeed = gameData.gameSpeed;
  testers = gameData.testers;
  managers = gameData.managers;
  baseProjectCash = gameData.baseProjectCash;
  additionalFeatureMultiplier = gameData.additionalFeatureMultiplier;
  bugPenalty = gameData.bugPenalty;
  newProductWidth = gameData.newProductWidth;



  updateDevCounter();
  updateTesterCounter();
  updateManagerCounter();
  updateCashCounter();
  updateBugCounter();
  updateAdditionalFeatureCounter();

  if(devs > 0) {
    autoFeatureProgress();
  }

  if(testers > 0) {
    autoBugDecrease();
  }
  
  var barName = "Product Progress";
  var bar = document.getElementById(barName + "Bar");
  var progressCounter = document.getElementById(barName + "Counter");
  bar.style.width = newProductWidth + "%";
  progressCounter.textContent = newProductWidth + "%";

}

function saveData(data) {
  localStorage.setItem('gameData', JSON.stringify(data));
}

function loadGame() {
  var gameData = localStorage.getItem('gameData');
  if (gameData) {
    loadData()
  }
}

function resetGame() {
  localStorage.removeItem('gameData');
  location.reload();
}