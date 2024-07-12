    var startingCash = 2000
    var bugs = 0;
    var bugChance = 10;
    var additionalFeatures = 0;
    var devs = 0;
    var cash = startingCash; //temporarily
    var devUpdateTime = 0;
    var intervalId;
    var projectIntervalId;
    var bugIntervalId;
    var gameSpeed = 1000;
    var testers = 0;
    var managers = 0;
    var baseProjectCash = 200;
    var additionalFeatureMultiplier = 10;
    var bugPenalty = 10;
    var managers = 0;
    var currentProductWidth;
    var newProductWidth;
    var paused = false;
    
    function createProgressBar(barName) {
        var container = document.createElement("div");
        container.id = barName + "Container";
        container.className = "progress-container";

        var barBackground = document.createElement("div");
        barBackground.id = barName + "BarBackground";
        barBackground.className = "progress"

        var bar = document.createElement("div");
        bar.id = barName + "Bar";
        bar.className = "progress-bar progress-bar-striped";
        bar.style.transition = "none"

        var title = document.createElement("h2");
        title.textContent = barName;

        var progressCounter = document.createElement("span");
        progressCounter.id = barName + "Counter";
        progressCounter.className = "progress-counter";
        progressCounter.textContent = "0%"; // Initial value

        container.appendChild(title);
        container.appendChild(barBackground);
        barBackground.appendChild(bar);
        bar.appendChild(progressCounter);
        document.getElementById("Projects").appendChild(container);
    }

    function increaseFeatureProgress(progressAmount) {
        var barName = "Feature Progress";
        var bar = document.getElementById(barName + "Bar");
        var progressCounter = document.getElementById(barName + "Counter");
        var currentWidth = parseFloat(bar.style.width) || 0;

        if(Math.floor(Math.random() * 100) < bugChance)
        {
            bugs++;
            newWidth = currentWidth
        }
        else
        {
            var newWidth = currentWidth + progressAmount; 
            if(newWidth>=100)
            {
                increaseProductProgress(Math.floor(newWidth/100));
                newWidth = newWidth % 100;
            }
        }
        bar.style.width = newWidth + "%";
        progressCounter.textContent = newWidth + "%";
        updateBugCounter();

    }

    function increaseProductProgress(progressAmount) {
        
        var barName = "Product Progress";
        var bar = document.getElementById(barName + "Bar");
        var progressCounter = document.getElementById(barName + "Counter");
        currentProductWidth = parseFloat(bar.style.width) || 0;


        newProductWidth = currentProductWidth + progressAmount; 
        if(newProductWidth>=100)
        {
            additionalFeatures = additionalFeatures + Math.floor(newProductWidth/100);
            newProductWidth=100;
        }
        
        bar.style.width = newProductWidth + "%";
        progressCounter.textContent = newProductWidth + "%";
        updateAdditionalFeatureCounter();
    }

function changePage(page) {
    var pages = document.querySelectorAll(".page")
    var newActivePage = document.getElementById(page)
    pages.forEach(element => {
        element.classList.add("d-none")
    });
    newActivePage.classList.remove("d-none")
}

function fillWithButtons(){
    
}

function buyCoders(){

    if(cash >= 100){
        devs += 1;
        cash -= 100

        resetFeatureProgress();
        autoFeatureProgress();
        updateDevCounter();
        updateCashCounter();
    }
    else{
        alert("Not enough cash to buy a coder");
    }
}

function buyTesters(){
    if(cash >= 500){
        testers += 1;
        cash -= 500
        updateTesterCounter();
        updateCashCounter();
        autoBugDecrease();
        }
    else{
        alert("Not enough cash to buy a tester");
    }
}

function buyManagers(){
    managers += 1;
    cash -= 10;
    updateManagerCounter();
    updateCashCounter();
}

function autoFeatureProgress(){

    clearInterval(intervalId); // Clear existing interval (if any).
    if(devs % 100 !== 0){
        intervalDuration = 1000 / (devs % 100);
        intervalId = setInterval(() => increaseFeatureProgress(1), intervalDuration);
    }

    if(devs >= 100)
    {
        completions = Math.floor(devs/100);
        clearInterval(projectIntervalId)
        projectIntervalId = setInterval(() => increaseProductProgress(1), gameSpeed/completions);   
    }
 
  };

  function decreaseBugCount(){
    bugs--;
    if(bugs < 0) bugs = 0;
    const textElement = document.getElementById("bug-counter"); textElement.textContent = `Bug count is: ${bugs}`;
  }
  
  function resetFeatureProgress(){
    const bar = document.getElementById("Feature ProgressBar");
    bar.style.width = "0%";
    const progressCounter = document.getElementById("Feature ProgressCounter");
    progressCounter.textContent = "0%";
  }

  function updateDevCounter(){
    const textElement = document.getElementById("dev-count"); textElement.textContent = `${devs}`;
  }

  function updateTesterCounter(){
    const textElement = document.getElementById("tester-count"); textElement.textContent = `${testers}`;
  }

  function updateManagerCounter(){
    const textElement = document.getElementById("manager-count"); textElement.textContent = `${managers}`;
  }

  function updateCashCounter(){
    const textElement = document.getElementById("cash-count"); textElement.textContent = `${cash}`;
  }

  function updateBugCounter(){
    const textElement = document.getElementById("bug-counter"); textElement.textContent = `Bug count is: ${bugs}`;
  }

  function updateAdditionalFeatureCounter(){
    const textElement = document.getElementById("additionalFeature counter"); textElement.textContent = `Additional features completed: ${additionalFeatures}`;
  }

  function releaseProduct(){
    var barName = "Product Progress";
    var bar = document.getElementById(barName + "Bar");
    var progressCounter = document.getElementById(barName + "Counter");

    if(bar.style.width === "100%"){
    cash = cash + baseProjectCash + additionalFeatures * additionalFeatureMultiplier - bugs * bugPenalty;
    updateCashCounter();
    additionalFeatures = 0;
    bar.style.width = 0 + "%";
    progressCounter.textContent = 0 + "%";
    }
    else{
        alert("Cannot release product before completion");
    }
  }

  function autoBugDecrease(){
    clearInterval(bugIntervalId);
    if(testers > 0){
        bugIntervalId = setInterval(() => decreaseBugCount(), gameSpeed/testers);
    }
  }

  function closeAlertBox()
  {
    document.getElementById("alert-box").classList.add("d-none")
  }

  function alert(message)
  {
    document.getElementById("alert-box-text").innerText = message
    document.getElementById("alert-box").classList.remove("d-none")
  }

  function pauseDevelopment(){
    if(paused == false){
        clearInterval(intervalId);
        clearInterval(projectIntervalId);
    }
    else if(paused == true){
        autoFeatureProgress();
    }

  }