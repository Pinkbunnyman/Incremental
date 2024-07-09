    var bugs = 0;
    var bugChance = 50;


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

    function increaseProgress(barName,incrementWhenFull, autoresettable) {
        var bar = document.getElementById(barName + "Bar");
        var progressCounter = document.getElementById(barName + "Counter");
        
        var currentWidth = parseFloat(bar.style.width) || 0;
    if(Math.floor(Math.random() * 100) <= bugChance)
        {
            bugs++;
        }
    else
        {
            var newWidth = Math.min(currentWidth + 5, 100); 
            if(newWidth==100 && autoresettable == true)
            {
                newWidth = 0;
                currentWidth = 0;
                if(incrementWhenFull!==undefined){
                    increaseProgress(incrementWhenFull);
                }
            }
        }

       
        const textElement = document.getElementById("bug counter"); textElement.textContent = `Bug count is: ${bugs}`;

        bar.style.width = newWidth + "%";
        progressCounter.textContent = newWidth + "%";
    }