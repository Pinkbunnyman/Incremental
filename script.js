    var bugs = 0;
    var bugChance = 0;
    var additionalFeatures = 0;
    var devs = 0;
    var cash = 0; //temporarily
    var devUpdateTime = 0;
    var intervalId;
    var gameSpeed = 1000;

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
        const textElement = document.getElementById("bug counter"); textElement.textContent = `Bug count is: ${bugs}`;

    }

    function increaseProductProgress(progressAmount) {
        
        var barName = "Product Progress";
        var bar = document.getElementById(barName + "Bar");
        var progressCounter = document.getElementById(barName + "Counter");
        var currentWidth = parseFloat(bar.style.width) || 0;


        var newWidth = currentWidth + progressAmount; 
        if(newWidth>=100)
        {
            additionalFeatures = additionalFeatures + Math.floor(newWidth/100);
            newWidth=100;
        }
        
        bar.style.width = newWidth + "%";
        progressCounter.textContent = newWidth + "%";
        const textElement = document.getElementById("additionalFeature counter"); textElement.textContent = `Additional features completed: ${additionalFeatures}`;
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
    devs += 1;
    cash -= 100

    resetFeatureProgress();
    autoFeatureProgress();
}

function autoFeatureProgress(){
    const intervalDuration = gameSpeed / (devs % gameSpeed);
    clearInterval(intervalId); // Clear existing interval (if any).
    if(devs % 100 !== 0){
        intervalId = setInterval(() => increaseFeatureProgress(1), intervalDuration);
    }
    else
    {
        setInterval(() => increaseProductProgress(Math.floor(devs/gameSpeed)), gameSpeed)
    }
    
  };
  
  function resetFeatureProgress(){
    const bar = document.getElementById("Feature ProgressBar");
    bar.style.width = "0%";
    const progressCounter = document.getElementById("Feature ProgressCounter");
    progressCounter.textContent = "0%";
  }