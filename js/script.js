const clickableEl = document.querySelector(".clickable-element");
const scoreEl = document.querySelector(".score");
const upgradesListEl = document.querySelector(".upgrades");
const clicksPerClickDisplayEl = document.querySelector(".clicks-per-click")
const maxClicksPerSecondDisplayEl = document.querySelector(".max-clicks-per-second")

let currentScore = 0;
let clicksPerClick = 1;
let maxClicksPerSecond = 2;

clickableEl.addEventListener("click", _.throttle(() => {
  currentScore += clicksPerClick;
  scoreEl.textContent = `Your clicks: ${currentScore}`;
}, (1000/maxClicksPerSecond)));

upgradesListEl.addEventListener("click", (event) => {
  const currentClickedElement = event.target;
  if (currentClickedElement.nodeName === "BUTTON") {
    const updateCost = currentClickedElement.dataset.cost;
    if (currentScore >= Number(updateCost)) {
      const currentCallback = getUpdateCallback(currentClickedElement);
      currentCallback(currentClickedElement, updateCost);
    }
  }
});

function getUpdateCallback(element) {
  switch (element.dataset.updatenumber) {
    case "1": {
      return (element, cost) => {
        clicksPerClick += 1;
        currentScore -= cost;
        element.dataset.cost = Math.ceil(cost * 0.11)*10;
        element.textContent = `${element.dataset.cost} clicks`
        element.dataset.level = Number(element.dataset.level) + 1
        element.nextElementSibling.textContent = `Level ${element.dataset.level}`
        scoreEl.textContent = `Your clicks: ${currentScore}`;
        clicksPerClickDisplayEl.textContent = `Clicks per click: ${clicksPerClick}`
      };
      break;
    }
    case "2":{
      return (element, cost) => {
        maxClicksPerSecond = (parseFloat(maxClicksPerSecond) + 0.1).toFixed(1) 
        currentScore -= cost
        element.dataset.cost = Math.ceil(cost * 1.05);
        element.textContent = `${element.dataset.cost} clicks`
        element.dataset.level = Number(element.dataset.level) + 1
        element.nextElementSibling.textContent = `Level ${element.dataset.level}`
        scoreEl.textContent = `Your clicks: ${currentScore}`;
        maxClicksPerSecondDisplayEl.textContent = `Max clicks per second: ${maxClicksPerSecond}`
      }
    }
    case "3": {
      return (element, cost) => {
        clicksPerClick += 5;
        currentScore -= cost;
        element.dataset.cost = Math.ceil(cost * 0.11)*10;
        element.textContent = `${element.dataset.cost} clicks`
        element.dataset.level = Number(element.dataset.level) + 1
        element.nextElementSibling.textContent = `Level ${element.dataset.level}`
        scoreEl.textContent = `Your clicks: ${currentScore}`;
        clicksPerClickDisplayEl.textContent = `Clicks per click: ${clicksPerClick}`
        
      }
      break
    }
    case "4":{
      return (element, cost) => {
        maxClicksPerSecond =  (parseFloat(maxClicksPerSecond) + 0.5).toFixed(1) 
        currentScore -= cost
        element.dataset.cost = Math.ceil(cost * 1.05);
        element.textContent = `${element.dataset.cost} clicks`
        element.dataset.level = Number(element.dataset.level) + 1
        element.nextElementSibling.textContent = `Level ${element.dataset.level}`
        scoreEl.textContent = `Your clicks: ${currentScore}`;
        maxClicksPerSecondDisplayEl.textContent = `Max clicks per second: ${maxClicksPerSecond}`

      }
      break
    }
    default: {return () => {
      console.log("no")
    }} 
  }
}


/*
  Гра піцца клікер 
  прокачуючи швидкість кліку прокачується піцца
*/
