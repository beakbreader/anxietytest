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

const questionsContainer = document.getElementById('questions-container');
const form = document.getElementById('anxiety-form');
const resultDiv = document.getElementById('result');

// Generate questions
questions.forEach((question, index) => {
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');
  
  const questionText = document.createElement('p');
  questionText.textContent = `${index + 1}. ${question}`;
  questionDiv.appendChild(questionText);
  
  const optionsDiv = document.createElement('div');
  optionsDiv.classList.add('options');
  
  options.forEach(option => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question${index}`;
    input.value = option.value;
    label.appendChild(input);
    label.appendChild(document.createTextNode(` ${option.text}`));
    optionsDiv.appendChild(label);
  });
  
  questionDiv.appendChild(optionsDiv);
  questionsContainer.appendChild(questionDiv);
});

// Handle form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  let totalScore = 0;
  let allAnswered = true;
  
  questions.forEach((_, index) => {
    const selected = document.querySelector(`input[name="question${index}"]:checked`);
    if (selected) {
      totalScore += parseInt(selected.value);
    } else {
      allAnswered = false;
    }
  });
  
  if (!allAnswered) {
    alert("Please answer all questions before submitting.");
    return;
  }
  
  let feedback = "";
  if (totalScore <= 4) {
    feedback = "Minimal anxiety.";
  } else if (totalScore <= 9) {
    feedback = "Mild anxiety.";
  } else if (totalScore <= 14) {
    feedback = "Moderate anxiety.";
  } else {
    feedback = "Severe anxiety.";
  }
  
  resultDiv.textContent = `Your total score is ${totalScore}. ${feedback}`;
  resultDiv.classList.remove('hidden');
});
