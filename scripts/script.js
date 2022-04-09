let cardsNumber;
let gifsToPlay;
let shuffledCards;
let numberOfMoves = 0;
let seconds = 0;
let timer;

const gifs = [
  {
    name: "bobross",
    link: "./gifs/bobrossparrot.gif",
    status: "unselected",
  },
  {
    name: "explody",
    link: "./gifs/explodyparrot.gif",
    status: "unselected",
  },
  {
    name: "fiesta",
    link: "./gifs/fiestaparrot.gif",
    status: "unselected",
  },
  {
    name: "metal",
    link: "./gifs/metalparrot.gif",
    status: "unselected",
  },
  {
    name: "revestit",
    link: "./gifs/revertitparrot.gif",
    status: "unselected",
  },
  {
    name: "triplets",
    link: "./gifs/tripletsparrot.gif",
    status: "unselected",
  },
  {
    name: "unicorn",
    link: "./gifs/unicornparrot.gif",
    status: "unselected",
  },
];

askForCardsNumber();

function askForCardsNumber() {
  let isNumberValid = false;
  while (!isNumberValid) {
    cardsNumber = Number(prompt("Com quantas cartas você quer jogar?"));
    if (cardsNumber % 2 === 0 && cardsNumber >= 4 && cardsNumber <= 14) {
      isNumberValid = true;
      startTheGame();
    } else {
      isNumberValid = false;
      alert("Por favor, digite um número par entre 4 e 14");
    }
  }
}

function startTheGame() {
  startTimer();
  shuffleArray();
  let cards = document.querySelector("section ul");
  shuffledCards.forEach((card) => {
    cards.innerHTML += `<li onclick="selectCard(this)">
    <div class="face front-face"><img src="./gifs/front.png" alt="front"></div>
    <div class="face back-face"><img src="${card.link}" alt="${card.name}"></div>
    </li>`;
  });
}

 function startTimer() {
   setInterval(() => {
     seconds++;
     document.querySelector(".timer").innerHTML = `${seconds} segundos`;
   }, 1000)
 }

function shuffleArray() {
  gifsToPlay = gifs.slice(0, cardsNumber / 2);
  shuffledCards = gifsToPlay.concat(gifsToPlay).sort(comparator);
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
  let objectSelected = gifsToPlay.find(
    (card) => card.name === element.children[1].querySelector("img").alt
  );
  let elementsSelected = document.querySelectorAll(".selected");
  if (objectSelected.status === "selected") {
    elementsSelected.forEach((item) => {
      item.classList.remove("selected");
      item.classList.add("matched");
    });
    objectSelected.status = "matched";
  } else {
    if (elementsSelected.length === 1) {
      objectSelected.status = "selected";
    } else {
      gifsToPlay
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
    if (gifsToPlay.every((card) => card.status === "matched")) {
      alert(`Parabéns! Você ganhou em ${numberOfMoves} jogadas e ${seconds} segundos!`);
      clearInterval(timer);
      checkNewGame();
    }
  }, 1000);
}

function checkNewGame() {
  let answer = prompt("Deseja jogar novamente?", "sim ou não");
  if (answer.toLowerCase() === "sim") {
    location.reload();
  } else {
    alert("Até a próxima!");
  }
}
