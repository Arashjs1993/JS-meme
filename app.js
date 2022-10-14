//Grabs things
let playerLivesCount = document.querySelector("span");
const section = document.querySelector("section");
let playerLives = 6;

//Link text


playerLivesCount.innerText = playerLives;

//get images
const getData = () => 
  [
  {imgSrc: "./images/beatles.jpeg", name: "beatles"},
  {imgSrc: "./images/blink182.jpeg", name: "blink182"},
  {imgSrc: "./images/card.jpeg", name: "card"},
  {imgSrc: "./images/fkatwigs.jpeg", name: "fkatwigs"},
  {imgSrc: "./images/fleetwood.jpeg", name: "fleetwood"},
  {imgSrc: "./images/joy-division.jpeg", name: "joy-diviosion"},
  {imgSrc: "./images/ledzep.jpeg", name: "ledzep"},
  {imgSrc: "./images/metallica.jpeg", name: "metallica"}, 
  {imgSrc: "./images/pinkfloyd.jpeg", name: "pinkfloyd"},
  {imgSrc: "./images/pinkfloyd.jpeg", name: "pinkfloyd"},
  {imgSrc: "./images/fkatwigs.jpeg", name: "fkatwigs"},
  {imgSrc: "./images/beatles.jpeg", name: "beatles"},
  {imgSrc: "./images/joy-division.jpeg", name: "joy-diviosion"},
  {imgSrc: "./images/metallica.jpeg", name: "metallica"},
  ];

  //Randomizing images
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
}
 
//Generating cards
const generateCard = () =>
{
  const cardData = randomize();
  //HTML element generation
  cardData.forEach(item => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attach the info to the card.
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    //Attach the cards to the section in HTML
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click', (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};
  

//Check cards
const checkCards = (e) => {
  //target is the element that we clicked on.
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll('.flipped');
  console.log(clickedCard);
  /*logic, the flippedCards variable holds all the
  cards that has the flipped class added to it (means
    the card has been clicked and flipped). Then
    in the if section below we check if the name property 
    of the two flipped cards we have saved matches, in that 
    case we console log "match".
  */
  if(flippedCards.length === 2){
    if(
      flippedCards[0].getAttribute("name") === 
      flippedCards[1].getAttribute("name")
      ){
        console.log("match");
        flippedCards.forEach(card => {
          card.classList.remove("flipped");
          /*If the flipped cards match, we do
          not remove the toggle anymore like in the case 
          of the wrong match*/
          card.style.pointerEvents = 'none';
        });
      } else {
        console.log("wrong");
        /*After knowing the result if the flipped
        card match or not, we need to remove flipped 
        class to revert the cards to unflipped mode.
        */
        flippedCards.forEach(card => {
          card.classList.remove('flipped');
          /*delay the animation to flipp the cards
          after the result*/
          setTimeout(() => card.classList.remove('toggleCard'), 1000);
        });
        /*Every time we are young take a live and
        update the element value*/
        playerLives-= 1;
        playerLivesCount.innerText = playerLives;
        if(playerLives === 0){
          restart("Try again");
        }
      }
    } 
    if(toggleCard.length === 16) {
      restart("You won!");
    }
};


//Restart 
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  /*Hereby we get all the cards */
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  /*we remove the toggleCard from all
  the newly random cards and reset the player lives. */
  cardData.forEach((item , index) => {
    cards[index].classList.remove("toggleCard");
    //Randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      //update the src and name after reset
      faces[index].src = item.imgSrc;
      cards[index].setAttribute('name', item.name); 
      //wait for all the cards to flip back and then randomize
      section.style.pointerEvents = "all";
    }, 1000)
  });
  playerLives = 6;
  playerLivesCount.innerText = playerLives;
  setTimeout(() => window.alert(text), 100);
};

generateCard();
