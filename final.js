//referances
const FINAL_SCORE_VALUE = document.getElementById("final-score-value");
const RESTART_BUTTON = document.getElementById("restart-button");
//
// const PARAMS = new URLSearchParams(window.location.search);
// const SCORE = params.get("score");
const SCORE = localStorage.getItem("score");

FINAL_SCORE_VALUE.textContent = SCORE;

const KEY_FRAMES = [
  { transform: "scale(1)", opacity: 0.5 },
  { transform: "scale(1.5)", opacity: 1 },
  { transform: "scale(1)", opacity: 0.5 },
];
const TIMING = {
  duration: 1000,
  iterations: Infinity,
  easing: "ease-in-out",
};
FINAL_SCORE_VALUE.animate(KEY_FRAMES, TIMING);
 

RESTART_BUTTON.addEventListener("click", () => {
  window.location.href = "index.html";
});

