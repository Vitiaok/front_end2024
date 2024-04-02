const quizData = {
  questions: [
    {
      question: "Копії якої книги продали найбільше разів?",
      answers: [
        { text: "Біблія", correct: true },
        { text: "Коран", correct: false },
        { text: "Гаррі Поттер і філософський камінь", correct: false },
        { text: "Дон Кіхот", correct: false }
      ]
    },
    {
      question: "Яка книга належить до жанру антиутопії?",
      answers: [
        { text: "'Тягар пристрастей людських' В.Сомерсет", correct: false },
        { text: "'Критика чистого розуму' І.Кант", correct: false },
        { text: "'Колгосп тварин' Дж.Оруелл", correct: false },
        { text: "'451 градус за фаренгейтом' Р.Бредбері", correct: true }
      ]
    },
    {
      question: "Хто написав п'єсу 'Наталка-Полтавка'?",
      answers: [
        { text: "Іван Франко", correct: false },
        { text: "Микола Гоголь", correct: false },
        { text: "Іван Котляревський", correct: true },
        { text: "Панас Мирний", correct: false }
      ]
    },
    {
      question: "Яка з книг розповідає про пригоди чотирьох друзів на службі у короля Франції?",
      answers: [
        { text: "'Пригода Тома Сойєра' М.Твен", correct: false },
        { text: "'Три мушкетера' А.Дюма", correct: true },
        { text: "'Острів скарбів' Р.Л.Стівенсон", correct: false },
        { text: "'Собор Паризької Богоматері' В.Гюго", correct: false }
      ]
    },
    {
        "question": "Хто відомий під прізвиськом 'короля жахів'?",
        "answers": [
          {"text": "Джоан Роулінг", "correct": false},
          {"text": "Стівен Кінг", "correct": true},
          {"text": "Джордж Оруелл", "correct": false},
          {"text": "Курт Воннеґут", "correct": false}
        ]
    }
  ]
};

const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');

let score = 0;

loadQuestions();

submitButton.addEventListener('click', () => {
  score = 0;
  quizData.questions.forEach((question, index) => {
    const selectedAnswer = document.querySelector(`input[name="answer-${index}"]:checked`);
    if (selectedAnswer) {
      const answerText = selectedAnswer.nextElementSibling.innerText;
      const correct = question.answers.find(answer => answer.text === answerText).correct;
      if (correct) {
        score++;
      }
    }
  });
  showResult();
});

function loadQuestions() {
  quizData.questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.innerText = question.question;
    quizContainer.appendChild(questionElement);

    const answerContainer = document.createElement('div');
    question.answers.forEach(answer => {
      const answerElement = document.createElement('div');
      answerElement.className = 'answer-option';
      answerElement.innerHTML = `
        <input type="radio" name="answer-${index}" id="${answer.text}-${index}">
        <label for="${answer.text}-${index}">${answer.text}</label>
      `;
      answerContainer.appendChild(answerElement);
    });
    quizContainer.appendChild(answerContainer);
  });
}

function showResult() {
  submitButton.style.display="none";
  quizContainer.style.display="none";
  
  if (score === 0){
    resultElement.innerText = `Ваш результат: ${score} з ${quizData.questions.length}
    Вам потрібно читати більше!!!`;
} else if(score <= 3 && score >= 1){
    resultElement.innerText = `Ваш результат: ${score} з ${quizData.questions.length}
    Непогано, але вам є ще чого навчитися`;
} else if(score > 3){
    resultElement.innerText = `Ваш результат: ${score} з ${quizData.questions.length}
    Ви справжній книголюб!`;
}


  resultElement.style.display = 'block'; 
}




  
  
  
  
  
  

  