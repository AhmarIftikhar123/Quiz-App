const questions = [
  {
    question: "What is the capital of France?",
    options: [
      { text: "Paris", isCorrect: true },
      { text: "London", isCorrect: false },
      { text: "Berlin", isCorrect: false },
      { text: "Madrid", isCorrect: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: [
      { text: "Mars", isCorrect: true },

      { text: "Venus", isCorrect: false },
      { text: "Jupiter", isCorrect: false },
      { text: "Mercury", isCorrect: false },
    ],
  },
  {
    question: "What is the largest mammal on Earth?",
    options: [
      { text: "Elephant", isCorrect: false },
      { text: "Blue Whale", isCorrect: true },
      { text: "Giraffe", isCorrect: false },
      { text: "Kangaroo", isCorrect: false },
    ],
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: [
      { text: "Oxygen", isCorrect: false },
      { text: "Carbon Dioxide", isCorrect: true },
      { text: "Nitrogen", isCorrect: false },
      { text: "Methane", isCorrect: false },
    ],
  },
  {
    question: "What is the closest star to Earth?",
    options: [
      { text: "Mars", isCorrect: false },
      { text: "Venus", isCorrect: false },
      { text: "Jupiter", isCorrect: false },
      { text: "Sun", isCorrect: true },
    ],
  },
  {
    question: "Which element has the chemical symbol 'H'?",
    options: [
      { text: "Hydrogen", isCorrect: true },
      { text: "Helium", isCorrect: false },
      { text: "Carbon", isCorrect: false },
      { text: "Oxygen", isCorrect: false },
    ],
  },
];

const question_heading = document.getElementById("question");

const question_btns_container = document.querySelector(".btn_box");

const next_Btn = document.getElementById("next_Btn");

let current_question_index = 0;

let score = 0;

function startQuiz() {
  current_question_index = 0;

  score = 0;

  next_Btn.style.display = "block";

  next_Btn.textContent = "Next";

  Show_question();
}

function Show_question() {
  resetState();

  let current_question = questions[current_question_index];

  let question_no = current_question_index + 1;

  question_heading.textContent = question_no + ". " + current_question.question;

  current_question.options.forEach((option) => {
    let button = document.createElement("button");

    question_btns_container.appendChild(button);

    button.textContent = option.text;

    if (option.isCorrect) {
      button.dataset.isCorrect = option.isCorrect;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  next_Btn.style.display = "none";

  while (question_btns_container.firstChild) {
    question_btns_container.removeChild(question_btns_container.firstChild);
  }
}

function selectAnswer(e) {
  let selected_btn = e.target;

  let Correct = selected_btn.dataset.isCorrect === "true";

  if (Correct) {
    selected_btn.classList.add("correct");
    score++;
  } else {
    selected_btn.classList.add("incorrect");
  }

  Array.from(question_btns_container.children).forEach((button) => {
    if (button.dataset.isCorrect === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
    next_Btn.style.display = "block";
    next_Btn.textContent = "Next";
  });
}

function show_score() {
  resetState();
  question_heading.textContent = `You Scored ${score} Out of ${questions.length}`;
  next_Btn.style.display = "block";
  next_Btn.textContent = "Play Again";
}

function handleNextBtn() {
  current_question_index++;
  if (current_question_index < questions.length) {
    Show_question();
  } else {
    show_score();
  }
}

next_Btn.addEventListener("click", () => {
  if (current_question_index < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

Show_question();
