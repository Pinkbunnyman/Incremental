    var bugs = 0;
    var bugChance = 100;


    function createProgressBar(barName) {
        var container = document.createElement("div");
        container.id = barName + "Container";
        container.className = "progress-container";

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
        container.appendChild(bar);
        bar.appendChild(progressCounter);
        document.body.appendChild(container);
    }

    function increaseProgress(barName,incrementWhenFull) {
        var bar = document.getElementById(barName + "Bar");
        var progressCounter = document.getElementById(barName + "Counter");
        
        var currentWidth = parseFloat(bar.style.width) || 0;

        var newWidth = Math.min(currentWidth + 5, 100); 
        if(currentWidth==100)
        {
            newWidth = 0;
            currentWidth = 0;
            if(incrementWhenFull!==undefined){
                increaseProgress(incrementWhenFull);
            }
        }

        if(Math.floor(Math.random() * 100) <= bugChance)
        {
            bugs++;
        }
        const textElement = document.getElementById("bug counter"); textElement.textContent = `Bug count is: ${bugs}`;

        bar.style.width = newWidth + "%";
        progressCounter.textContent = newWidth + "%";
    }