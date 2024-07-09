//referances

const COUNTERIES = [
  {
    image: "assets/image1.avif",
    answer: "Germany",
    hint: "The capital is Berlin",
  },
  {
    image: "assets/image2.avif",
    answer: "France",
    hint: "The capital is Paris",
  },
  {
    image: "assets/image3.avif",
    answer: "Japan",
    hint: "The capital is Tokyo",
  },
  {
    image: "assets/image4.avif",
    answer: "Italy",
    hint: "The capital is Rome",
  },
  {
    image: "assets/image5.avif",
    answer: "Holland",
    hint: "The capital is Amsterdam",
  },
  {
    image: "assets/image6.avif",
    answer: "Egypt",
    hint: "The capital is Cairo",
  },
  {
    image: "assets/image7.avif",
    answer: "Greece",
    hint: "The capital is Athens",
  },
  {
    image: "assets/image8.avif",
    answer: "Turkey",
    hint: "The capital is Istanbul",
  },
  {
    image: "assets/image9.avif",
    answer: "Morocco",
    hint: "The capital is Rabat",
  },
  {
    image: "assets/image10.avif",
    answer: "china",
    hint: "The capital is Shanghai",
  },
];
let indexOfImageShownOnScreen = 0;
let score = 0;
let attempt = 0;
let hintUsed = false;
let currentCountryIndex = 0;

const CHANCE_REMAINING = document.getElementById("chance-remaining");
const COUNTRY_IMAGE = document.getElementById("country-image");
const HINT_BUTTON = document.getElementById("hint-button");
const HINT_ELEMENT = document.getElementById("hint");
const ANSWER_FORM = document.getElementById("answer-form");
const ANSWER_INPUT = document.getElementById("answer");
const SCORE_ELEMENT = document.getElementById("score");
const IMAGE_COUNT_ELEMENT = document.getElementById("image-count");
const FINAL_SCORE_ELEMENT = document.getElementById("final-score");
const FINAL_SCORE_VALUE = document.getElementById("final-score-value");
const RESTART_button = document.getElementById("restart-button");
const QUIZ_Container = document.getElementById("quiz-container");
const MESSAGE_ERROR = document.getElementById("error-message");
const MESSAGE_SUCCESS = document.getElementById("success-message");
const SCORE_MAX_PER_IMAGE = 10;

const MAX_TRIES_PER_IMAGE = 3;

//listeners dom events
document.addEventListener("DOMContentLoaded", function () {
  //function to start the game
  function loadCountry() {
    const COUNTRY = COUNTERIES[currentCountryIndex];
    COUNTRY_IMAGE.src = COUNTRY.image;
    HINT_ELEMENT.textContent = "";
    ANSWER_INPUT.value = "";
    hintUsed = false;
    attempt = 0;
    IMAGE_COUNT_ELEMENT.textContent = currentCountryIndex + 1;
  }
  //function to show the hint
  HINT_BUTTON.addEventListener("click", () => {
    if (!hintUsed) {
      HINT_ELEMENT.textContent = COUNTERIES[currentCountryIndex].hint;
      hintUsed = true;
    }
  });
  //function to validate the answer
  ANSWER_FORM.addEventListener("submit", function (event) {
    event.preventDefault();
    const USER_ANSWER = ANSWER_INPUT.value.trim().toLowerCase();
    const CORRECT_ANSWER = COUNTERIES[currentCountryIndex].answer.toLowerCase();

    if (USER_ANSWER === CORRECT_ANSWER) {
      MESSAGE_ERROR.textContent = "";
      MESSAGE_SUCCESS.textContent = "Bravo, c'est la bonne reponse !";
      score += hintUsed ? SCORE_MAX_PER_IMAGE / 2 : SCORE_MAX_PER_IMAGE;
      SCORE_ELEMENT.textContent = score;
      nextCountry();
    } else {
      MESSAGE_SUCCESS.textContent = "";
      MESSAGE_ERROR.textContent = "Dommage, c'est la mauvaise reponse !";
      attempt++;
     
      const KEY_FRAMES = [{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }];
      const TIMING = {
        duration: 1000,
        iterations: Infinity,
        easing: "ease-in-out",
      };
      CHANCE_REMAINING.animate(KEY_FRAMES, TIMING);
       CHANCE_REMAINING.textContent = `Chance restante :  ${
         MAX_TRIES_PER_IMAGE - attempt
       } `;

      if (attempt >= MAX_TRIES_PER_IMAGE) {
        nextCountry();
        MESSAGE_ERROR.textContent = "";
        MESSAGE_SUCCESS.textContent = "";
        CHANCE_REMAINING.textContent = "";
      }
    }
  });
  //function to go to the next country
  function nextCountry() {
    currentCountryIndex++;
    if (currentCountryIndex < COUNTERIES.length) {
      loadCountry();
    } else {
      endGame();
    }
  }
  //function to end the game
  function endGame() {
    QUIZ_Container.style.display = "none";
    FINAL_SCORE_ELEMENT.style.display = "block";
    FINAL_SCORE_VALUE.textContent = score;
    // window.location.href = `score.html?score=${score}`;
    window.location.href = `score.html`;
    localStorage.setItem("score", score);
  }

  //function to restart the game
  RESTART_button.addEventListener("click", function () {
    score = 0;
    currentCountryIndex = 0;
    SCORE_ELEMENT.textContent = score;
    QUIZ_Container.style.display = "flex";
    FINAL_SCORE_ELEMENT.style.display = "none";
    loadCountry();
  });
  // call the function
  loadCountry();
});
