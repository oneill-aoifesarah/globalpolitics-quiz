// Quiz Questions, Multiple Choice, and Correct Answers
const quizData = [
  {
    question: 'Which country is known as the Hermit Kingdom?',
    options: ['North Korea', 'Senegal', 'Myanmar', 'China'],
    answer: 'North Korea',
  },
  {
    question: 'What is the term for the political and economic theory of Karl Marx and Friedrich Engels that advocates for a classless society and the means of production owned by the community?',
    options: ['Fascism', 'Capitalism', 'Socialism', 'Communism'],
    answer: 'Communism',
  },
  {
    question: 'What is the international coalition of countries that opposes the use of chemical weapons and is known for its chemical weapons watchdog role?',
    options: ['NATO', 'Interpol', 'UNICEF', 'OPCW'],
    answer: 'OPCW',
  },
  {
    question: 'What is the name of the historic peace agreement between Israel and the United Arab Emirates signed in 2020?',
    options: ['Camp David Accords', 'Oslo Accords', 'Abraham Accords', 'Peace of Paris'],
    answer: 'Abraham Accords',
  },
  {
    question: 'Which city is considered the political and administrative capital of Saudi Arabia?',
    options: ['Mecca', 'Medina', 'Jeddah','Riyadh'],
    answer: 'Riyadh',
  },
  {
    question: 'Which treaty, signed in 1957, established the European Economic Community (EEC), a precursor to the EU?',
    options: ['Maastricht Treaty', 'Lisbon Treaty', 'Treaty of Rome', 'Schengen Agreement'],
    answer: 'Treaty of Rome',
  },
  {
    question: 'Who is the current President of the European Commission as of 2023?',
    options: [
      'Ursula von der Leyen',
      'Jean-Claude Juncker',
      'Angela Merkel',
      'Emmanuel Macron',
    ],
    answer: 'Ursula von der Leyen',
  },
  {
    question: 'What is the term for the peace agreement signed in 1998 that helped bring an end to the conflict in Northern Ireland?',
    options: [
      'Good Friday Agreement',
      'Bloody Sunday Agreement',
      'Cork Accord',
      'Lisbon Treaty',
    ],
    answer: 'Good Friday Agreement',
  },
  {
    question: 'What was the title of the famous document through which King Henry VIII sought an annulment of his marriage to Catherine of Aragon?',
    options: ['Declaration of Independence', 'Magna Carta', 'Act of Supremacy', 'Act of Succession'],
    answer: 'Act of Succession',
  },
    {
    question: 'Which amendment to the U.S. Constitution grants women the right to vote?',
    options: ['1st Amendment', '14th Amendment', '19th Amendment', '2nd Amendment'],
    answer: '19th Amendment',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

// Addition of shuffle function to shuffle order of available answers

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// Addition of display function to display the question and answers 
function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}
// Addition of function to check the answer given and track scores
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}
// Addition of function to display the final result
function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}
// Addition of function to allow user to retry the quiz
function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}
// Addition of function to display the answers for the questions the user got wrong
function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}
// Event listeners for buttons
submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

// Quiz begins with the first question displayed
displayQuestion();