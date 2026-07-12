// ===== DATA =====
// Array of objects — each object is one question.
// "answer" stores the INDEX of the correct option in the "options" array.
const quizData = [
  {
    question: "Which HTML tag is used to link a JavaScript file?",
    options: ["<js>", "<script>", "<javascript>", "<link>"],
    answer: 1
  },
  {
    question: "Which keyword declares a variable that CANNOT be reassigned?",
    options: ["var", "let", "const", "static"],
    answer: 2
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Document Order Model",
      "Digital Object Model"
    ],
    answer: 0
  },
  {
    question: "Which method converts a JSON string into a JS object?",
    options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "Object.parse()"],
    answer: 1
  },
  {
    question: "Which array method adds an item to the END of an array?",
    options: ["shift()", "unshift()", "pop()", "push()"],
    answer: 3
  }
];

// ===== STATE =====
// create state variables need to track:
// - current question index (starts at 0)
let currentIndex = 0;
// - user's score (starts at 0)
let score = 0;
// - whether the current question has been answered yet (to prevent double-clicking)
let isAnswered = false;


// ===== DOM ELEMENTS =====
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");


// ===== RENDER CURRENT QUESTION =====
function loadQuestion() {
  // reset "answered" state to false, and disable the Next button
  isAnswered = false;
  nextBtn.disabled = true;

  // get the current question object from quizData using your index state
  const currentQuestion = quizData[currentIndex];

  // update questionText.textContent with the question
  questionText.textContent = currentQuestion.question;


  // update progress
  progress.textContent = `Question ${currentIndex +1} of ${quizData.length}`;

  // clear optionsContainer
  optionsContainer.innerHTML = "";

   //   clear -> loop -> append)

  // loop through currentQuestion.options and for each one:

  currentQuestion.options.forEach((option, index) => {
    //   - create a <button> with class "option-btn"
    const button = document.createElement("button");
    button.classList.add("option-btn");
    //   - set its textContent to the option string
    button.textContent = option;
    //   - add a click listener that calls selectAnswer(index, button)
    button.addEventListener("click", () => selectAnswer(index, button));
    //     - append it to optionsContainer
    optionsContainer.appendChild(button);
  });

};

 

// ===== HANDLE ANSWER SELECTION =====
function selectAnswer(selectedIndex, selectedButton) {
  // if the question has already been answered, do nothing (return early)
  // this stops the user from clicking multiple options
  if (isAnswered) return ;

  // mark question as answered
  isAnswered = true;

  // get the current question object again
  const currentQuestion = quizData[currentIndex];


  // compare selectedIndex to currentQuestion.answer

  //   - if correct, increase score and add "correct" class to selectedButton
  if (selectedIndex === currentQuestion.answer) {
    score++;
    selectedButton.classList.add("correct");
  } else {
    //   - if wrong, add "wrong" class to selectedButton, AND find the button
    //     that WAS correct and add "correct" class to it too (so user sees
    //     the right answer highlighted in green)
    selectedButton.classList.add("wrong");
    const correctButton = optionsContainer.children[currentQuestion.answer];
    correctButton.classList.add("correct");

  
  };
  

  // TODO 5: disable ALL option buttons so user can't change their answer
  optionsContainer.querySelectorAll(".option-btn").forEach((button) => {
    button.disabled = true;
  });
  //   Hint: optionsContainer has multiple .option-btn children — how do you
  //   select all of them and loop over each to set .disabled = true?

  // TODO 6: enable the Next button
  nextBtn.disabled = false;
}


// ===== NEXT BUTTON =====
nextBtn.addEventListener("click", () => {
  // increase current question index
  currentIndex++;

  // Tif there are still questions left (index < quizData.length),
  if (currentIndex < quizData.length) {
    //   call loadQuestion() again
    loadQuestion();
  } else {
    // otherwise, call showResult()
    showResult();
  }
  

  
});


// ===== SHOW FINAL RESULT =====
function showResult() {
  // hide the quiz question UI (question, options, next button)
  questionText.classList.add("hidden");
  optionsContainer.classList.add("hidden");
  nextBtn.classList.add("hidden");
  progress.classList.add("hidden");


  // show resultContainer (remove "hidden" class)
  resultContainer.classList.remove("hidden");

  // set scoreText.textContent to something like "You scored 3 out of 5!":
  scoreText.textContent = `You scored ${score} out of ${quizData.length}!`;
 
}


// ===== RESTART BUTTON =====
restartBtn.addEventListener("click", () => {
  // reset state variables (index back to 0, score back to 0)
  currentIndex = 0;
  score = 0;

  // hide resultContainer, show quiz UI elements again
  resultContainer.classList.add("hidden");
  questionText.classList.remove("hidden");
  optionsContainer.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  progress.classList.remove("hidden");

  // call loadQuestion() to start over
  loadQuestion();
});


// ===== INITIALIZE =====
// call loadQuestion() once at the bottom so the quiz starts on page load
loadQuestion();
