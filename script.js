const questions = [
  "I feel nervous or anxious frequently.",
  "I have trouble controlling my worries.",
  "I find it hard to relax.",
  "I feel restless or on edge.",
  "I get easily irritated or annoyed.",
  "I have difficulty concentrating.",
  "I experience muscle tension.",
  "I have trouble sleeping due to anxiety.",
  "I feel afraid as if something awful might happen.",
  "I avoid situations that make me anxious."
];

const options = [
  { text: "Not at all", value: 0 },
  { text: "Several days", value: 1 },
  { text: "More than half the days", value: 2 },
  { text: "Nearly every day", value: 3 }
];

let currentIndex = 0;
const answers = new Array(questions.length).fill(null);

const questionContainer = document.getElementById("question-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resultDiv = document.getElementById("result");

function showQuestion(index) {
  questionContainer.innerHTML = "";

  const questionText = document.createElement("p");
  questionText.textContent = `${index + 1}. ${questions[index]}`;
  questionContainer.appendChild(questionText);

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options");

  options.forEach(option => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "question";
    input.value = option.value;
    input.checked = answers[index] === option.value;
    input.addEventListener("change", () => {
      answers[index] = parseInt(input.value);
      nextBtn.disabled = false;
    });
    label.appendChild(input);
    label.append(` ${option.text}`);
    optionsDiv.appendChild(label);
  });

  questionContainer.appendChild(optionsDiv);

  prevBtn.disabled = index === 0;
  nextBtn.disabled = answers[index] === null;
  nextBtn.textContent = index === questions.length - 1 ? "Finish" : "Next →";
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion(currentIndex);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showQuestion(currentIndex);
  } else {
    showResults();
  }
});

function showResults() {
  const score = answers.reduce((sum, val) => sum + val, 0);
  let feedback = "", likelihood = "";

  if (score <= 4) {
    feedback = "Minimal anxiety";
    likelihood = "Very unlikely";
  } else if (score <= 9) {
    feedback = "Mild anxiety";
    likelihood = "Somewhat unlikely";
  } else if (score <= 14) {
    feedback = "Moderate anxiety";
    likelihood = "Somewhat likely";
  } else {
    feedback = "Severe anxiety";
    likelihood = "Very likely";
  }

  document.getElementById("anxiety-form").classList.add("hidden");
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `
    <h2>Assessment Results</h2>
    <p>Your total score is <strong>${score}</strong></p>
    <p><strong>${feedback}</strong></p>
    <p>Probability of having anxiety: <strong>${likelihood}</strong></p>
  `;
}

showQuestion(currentIndex);
