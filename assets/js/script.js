// Quiz Questions, Multiple Choice, and Correct Answers
const quizContent = [
    {
        question: 'Which country is known as the Hermit Kingdom?',
        option: [
            'North Korea',
            'Senegal',
            'Myanmar',
            'China'
        ],
        answer: 'North Korea',
    },
    {
        question: 'What is the term for the political and economic theory of Karl Marx and Friedrich Engels that advocates for a classless society and the means of production owned by the community?',
        option: [
            'Fascism',
            'Capitalism',
            'Socialism',
            'Communism'
        ],
        answer: 'Communism',
    },
    {
        question: 'What is the international coalition of countries that opposes the use of chemical weapons and is known for its chemical weapons watchdog role?',
        option: [
            'NATO',
            'Interpol',
            'UNICEF',
            'OPCW'
        ],
        answer: 'OPCW',
    },
    {
        question: 'What is the name of the historic peace agreement between Israel and the United Arab Emirates signed in 2020?',
        option: [
            'Camp David Accords',
            'Oslo Accords',
            'Abraham Accords',
            'Peace of Paris'
        ],
        answer: 'Abraham Accords',
    },
    {
        question: 'Which city is considered the political and administrative capital of Saudi Arabia?',
        option: [
            'Mecca',
            'Medina',
            'Jeddah',
            'Riyadh'
        ],
        answer: 'Riyadh',
    },
    {
        question: 'Which treaty, signed in 1957, established the European Economic Community (EEC), a precursor to the EU?',
        option: [
            'Maastricht Treaty',
            'Lisbon Treaty',
            'Treaty of Rome',
            'Schengen Agreement'
        ],
        answer: 'Treaty of Rome',
    },
    {
        question: 'Who is the current President of the European Commission as of 2023?',
        option: [
            'Ursula von der Leyen',
            'Jean-Claude Juncker',
            'Angela Merkel',
            'Emmanuel Macron',
        ],
        answer: 'Ursula von der Leyen',
    },
    {
        question: 'What is the term for the peace agreement signed in 1998 that helped bring an end to the conflict in Northern Ireland?',
        option: [
            'Good Friday Agreement',
            'Bloody Sunday Agreement',
            'Cork Accord',
            'Lisbon Treaty',
        ],
        answer: 'Good Friday Agreement',
    },
    {
        question: 'What was the title of the famous document through which King Henry VIII sought an annulment of his marriage to Catherine of Aragon?',
        option: [
            'Declaration of Independence',
            'Magna Carta',
            'Act of Supremacy',
            'Act of Succession'
        ],
        answer: 'Act of Succession',
    },
    {
        question: 'Which amendment to the U.S. Constitution grants women the right to vote?',
        option: [
            '1st Amendment',
            '14th Amendment',
            '19th Amendment',
            '2nd Amendment'
        ],
        answer: '19th Amendment',
    },
];

// Variable refrences container for quiz
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitContainer = document.getElementById('submit');
const tryAgainContainer = document.getElementById('tryAgain');
const revealAnswerContainer = document.getElementById('revealAnswer');

// Track of the current question being displayed in the quiz
let currentQuestion = 0;

// Track the user's score in the quiz
let score = 0;

// Collate details of incorrect answers
let incorrectAnswers = [];

// Function to display the questions and answers
function showQuestion() {
    const questionContent = quizContent[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionContent.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    for (let i = 0; i < questionContent.option.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = questionContent.option[i];

        const optionText = document.createTextNode(questionContent.option[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

// Function to check the answer given and track scores
function answerCheck() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizContent[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizContent[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizContent[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizContent.length) {
            showQuestion();
        } else {
            showResult();
        }
    }
}
// Addition of display final results
function showResult() {
    quizContainer.style.display = 'none';
    submitContainer.style.display = 'none';
    revealAnswerContainer.style.display = 'inline-block';
    tryAgainContainer.style.display = 'inline-block';
    resultsContainer.innerHTML = `Your score: ${score} out of ${quizContent.length}!`;
}

// Addition of function to allow user to retry the quiz
function retry() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitContainer.style.display = 'inline-block';
    revealAnswerContainer.style.display = 'none';
    tryAgainContainer.style.display = 'none';
    resultsContainer.innerHTML = '';
    showQuestion();
}

// Addition of function to display the answers for the questions the user got wrong
function revealAnswer() {
    quizContainer.style.display = 'none';
    submitContainer.style.display = 'none';
    revealAnswerContainer.style.display = 'none';
    tryAgainContainer.style.display = 'inline-block';

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

    resultsContainer.innerHTML = `
    <p>Your score: ${score} out of ${quizContent.length}</p>
    <p>Wrong Answers:</p>
    ${incorrectAnswersHtml}
    `;
}

// Event listners for buttons
submitContainer.addEventListener('click', answerCheck);
tryAgainContainer.addEventListener('click', retry);
revealAnswerContainer.addEventListener('click', revealAnswer);

// Quiz begins with the first question displayed
showQuestion();