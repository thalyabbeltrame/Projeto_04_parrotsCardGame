let numberOfCards;
let cardsToPlay;
let shuffledCards;
let timer;
let numberOfMoves = 0;
let seconds = 0;
let sec = 0;
let min = 0;

const parrots = [
  { name: "bobross", link: "./gifs/bobrossparrot.gif", status: "unselected" },
  { name: "explody", link: "./gifs/explodyparrot.gif", status: "unselected" },
  { name: "fiesta", link: "./gifs/fiestaparrot.gif", status: "unselected" },
  { name: "metal", link: "./gifs/metalparrot.gif", status: "unselected" },
  { name: "revestit", link: "./gifs/revertitparrot.gif", status: "unselected" },
  { name: "triplets", link: "./gifs/tripletsparrot.gif", status: "unselected" },
  { name: "unicorn", link: "./gifs/unicornparrot.gif", status: "unselected" },
];

askTheNumberOfCards();

function askTheNumberOfCards() {
  let isInputValid = false;
  while (!isInputValid) {
    numberOfCards = Number(prompt("Com quantas cartas você quer jogar?"));
    if (numberOfCards % 2 === 0 && numberOfCards >= 4 && numberOfCards <= 14) {
      isInputValid = true;
      startTheGame();
    } else {
      isInputValid = false;
      alert("Por favor, digite um número par entre 4 e 14");
    }
  }
}

function startTheGame() {
  shuffleArray();
  let cards = document.querySelector("section ul");
  shuffledCards.forEach((card) => {
    cards.innerHTML += `<li onclick="selectCard(this)">
    <div class="face front-face"><img src="./gifs/front.png" alt="front"></div>
    <div class="face back-face"><img src="${card.link}" alt="${card.name}"></div>
    </li>`;
  });
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    seconds++;
    min = Math.floor(seconds / 60);
    sec = seconds % 60;
    document.querySelector(".timer").innerHTML = `${min}min ${sec}s`;
  }, 1000);
}

function shuffleArray() {
  cardsToPlay = [...parrots].slice(0, numberOfCards / 2);
  shuffledCards = cardsToPlay.concat(cardsToPlay).sort(comparator);
}

function comparator() {
  return Math.random() - 0.5;
}

function selectCard(element) {
  numberOfMoves++;
  updateInformations(element);
  checkIfGameIsOver();
}

function updateInformations(element) {
  element.classList.add("selected");
  let objectSelected = cardsToPlay.find(
    (card) => card.name === element.children[1].querySelector("img").alt
  );
  let elementsSelected = document.querySelectorAll(".selected");
  if (objectSelected.status === "selected") {
    elementsSelected.forEach((item) => {
      item.classList.remove("selected");
      item.classList.add("matched");
    });
    objectSelected.status = "matched";
    element.removeAttribute("onclick");
  } else {
    if (elementsSelected.length === 1) {
      objectSelected.status = "selected";
    } else {
      cardsToPlay
        .filter((card) => card.status === "selected")
        .forEach((card) => {
          card.status = "unselected";
        });
      setTimeout(() => {
        elementsSelected.forEach((item) => {
          item.classList.remove("selected");
        });
      }, 1000);
    }
  }
}

function checkIfGameIsOver() {
  setTimeout(() => {
    let areCardsMatched = cardsToPlay.every(
      (card) => card.status === "matched"
    );
    if (areCardsMatched) {
      alert(`Você ganhou em ${min}min ${sec}s com ${numberOfMoves} jogadas!`);
      clearInterval(timer);
      checkNewGame();
    }
  }, 1000);
}

function checkNewGame() {
  let playAgain = prompt("Deseja jogar novamente?", "sim ou não");
  if (playAgain.toLowerCase() === "sim") {
    resetVariables();
    askTheNumberOfCards();
  } else {
    alert("Até a próxima!");
  }
}

function resetVariables() {
  numberOfCards = 0;
  cardsToPlay = [];
  shuffledCards = [];
  numberOfMoves = 0;
  seconds = 0;
  sec = 0;
  min = 0;
  document.querySelector("section ul").innerHTML = "";
  parrots.forEach((card) => {
    card.status = "unselected";
  });
}
