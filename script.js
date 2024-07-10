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
        barBackground.className = "bar-background"

        var bar = document.createElement("div");
        bar.id = barName + "Bar";
        bar.className = "progress-bar";

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
            var newWidth = Math.min(currentWidth + progressAmount, 100); 
            if(newWidth>=100)
            {
                increaseProductProgress(Math.floor(newWidth/100));
                newWidth = 0;
                currentWidth = 0;
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


        var newWidth = Math.min(currentWidth + progressAmount, 100); 
        if(newWidth>=100)
        {
            additionalFeatures++;
        }
        
        bar.style.width = newWidth + "%";
        progressCounter.textContent = newWidth + "%";
        const textElement = document.getElementById("additionalFeature counter"); textElement.textContent = `Additional features completed: ${additionalFeatures}`;
    }

function changePage(page) {

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
    const intervalDuration = gameSpeed / (devs % 100);
    clearInterval(intervalId); // Clear existing interval (if any).
    if(devs % 100 !== 0){
        intervalId = setInterval(() => increaseFeatureProgress(1), intervalDuration);
    }
    setInterval(() => increaseProductProgress(Math.floor(devs/100)), gameSpeed)
  };
  
  function resetFeatureProgress(){
    const bar = document.getElementById("Feature ProgressBar");
    bar.style.width = "0%";
    const progressCounter = document.getElementById("Feature ProgressCounter");
    progressCounter.textContent = "0%";
  }