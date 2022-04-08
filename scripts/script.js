let cardsNumber;
let shuffledCards;

const gifs = [
  { name: "bobross", link: "./gifs/bobrossparrot.gif" },
  { name: "explody", link: "./gifs/explodyparrot.gif" },
  { name: "fiesta", link: "./gifs/fiestaparrot.gif" },
  { name: "metal", link: "./gifs/metalparrot.gif" },
  { name: "revestit", link: "./gifs/revertitparrot.gif" },
  { name: "triplets", link: "./gifs/tripletsparrot.gif" },
  { name: "unicorn", link: "./gifs/unicornparrot.gif" },
];

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

function startTheGame() {
  shuffleArray();
  let cards = document.querySelector("section ul");
  shuffledCards.forEach((card) => {
    cards.innerHTML += `<li><img src="${card.link}" alt="${card.name}"></li>`;
  });
}

function shuffleArray() {
  let gifsToPlay = gifs.slice(0, cardsNumber / 2);
  shuffledCards = gifsToPlay.concat(gifsToPlay).sort(comparator);
}

function comparator() {
  return Math.random() - 0.5;
}
