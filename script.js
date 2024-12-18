//Base de dados das perguntas
const quizData = [
    {
        question: "Quem fundou o movimento de software livre?",
        options: [
            { answer: "Richard Stallman", correct: true },
            { answer: "Linus Torvalds", correct: false },
            { answer: "Steve Jobs", correct: false },
            { answer: "Bill Gates", correct: false }
        ],
        type: "radio"
    },
    {
        question: "Quais destas são vantagens do software livre?",
        options: [
            { answer: "Código aberto", correct: true },
            { answer: "Baixo custo", correct: true },
            { answer: "Uso exclusivo", correct: false },
            { answer: "Dependência de fornecedor", correct: false }
        ],
        type: "checkbox"
    },
    {
        question: "Qual desses é um sistema operacional de software livre?",
        options: [
            { answer: "Linux", correct: true },
            { answer: "Windows", correct: false },
            { answer: "macOS", correct: false },
            { answer: "Solaris", correct: false }
        ],
        type: "radio"
    },
    {
        question: "Quais linguagens são frequentemente usadas em projetos de software livre?",
        options: [
            { answer: "Python", correct: true },
            { answer: "JavaScript", correct: true },
            { answer: "C++", correct: true },
            { answer: "VBA", correct: false }
        ],
        type: "checkbox"
    },
    {
        question: "O que significa GPL?",
        options: [
            { answer: "General Public License", correct: true },
            { answer: "Global Private License", correct: false },
            { answer: "General Personal License", correct: false },
            { answer: "Global Public License", correct: false }
        ],
        type: "radio"
    },
    {
        question: "Quais das opções abaixo NÃO é uma licença de software livre?",
        options: [
            { answer: "Apache", correct: false },
            { answer: "GPL", correct: false },
            { answer: "MIT", correct: false },
            { answer: "Proprietária", correct: true }
        ],
        type: "radio"
    },
    {
        question: "Quais dessas são distribuições Linux?",
        options: [
            { answer: "Ubuntu", correct: true },
            { answer: "Debian", correct: true },
            { answer: "Red Hat", correct: true },
            { answer: "Windows", correct: false }
        ],
        type: "checkbox"
    },
    {
        question: "Quais características definem um software livre?",
        options: [
            { answer: "Código aberto", correct: true },
            { answer: "Gratuidade", correct: true },
            { answer: "Fechado para modificações", correct: false },
            { answer: "Transparência", correct: true }
        ],
        type: "checkbox"
    },
    {
        question: "Quem é o criador do kernel Linux?",
        options: [
            { answer: "Linus Torvalds", correct: true },
            { answer: "Richard Stallman", correct: false },
            { answer: "Dennis Ritchie", correct: false },
            { answer: "Ken Thompson", correct: false }
        ],
        type: "radio"
    },
    {
        question: "O que significa FOSS?",
        options: [
            { answer: "Free and Open Source Software", correct: true },
            { answer: "Fast Operating System Solution", correct: false },
            { answer: "Free Organization Software Solution", correct: false },
            { answer: "Fast Open Source Solution", correct: false }
        ],
        type: "radio"
    },
    {
        question: "Qual das opções abaixo é um navegador de código aberto?",
        options: [
            { answer: "Mozilla Firefox", correct: true },
            { answer: "Internet Explorer", correct: false },
            { answer: "Safari", correct: false },
            { answer: "Microsoft Edge", correct: false }
        ],
        type: "radio"
    },
    {
        question: "Quais são exemplos de licenças de software livre?",
        options: [
            { answer: "GPL", correct: true },
            { answer: "MIT", correct: true },
            { answer: "Apache", correct: true },
            { answer: "Microsoft", correct: false }
        ],
        type: "checkbox"
    },
    {
        question: "O software livre é geralmente caracterizado por qual conceito?",
        options: [
            { answer: "Liberdade de uso e modificação", correct: true },
            { answer: "Uso restrito por licença", correct: false },
            { answer: "Desenvolvimento fechado", correct: false },
            { answer: "Código-fonte secreto", correct: false }
        ],
        type: "radio"
    },
    {
        question: "Qual software de manipulação de imagem é considerado software livre?",
        options: [
            { answer: "Photoshop", correct: false},
            { answer: "Corel PaintShop Pro", correct: false},
            { answer: "Capture One", correct: false},
            { answer: "GIMP", correct: true}
        ],
        type: "radio"
    },
    {
        question: "Qual sistema operacional motivou o projeto GNU?",
        options: [
            { answer: "Unix", correct: true},
            { answer: "Linux", correct: false},
            { answer: "Windows", correct: false},
            { answer: "Fedora", correct: false}
        ],
        type: "radio"
    }

];

const submiteQuiz = document.getElementById("submite");
const nextQuestion = document.getElementById("next-question-btn");
const currentQuestionValue = document.getElementById("current-question");
const totalQuestions = document.getElementById("total-questions");
const answerCorrect = document.getElementById("answer-correct");
const quizBox = document.getElementById("quiz-box");
const result = document.getElementById("result");


let currentQuestion = 0;
let score= 0;

//Função para carregar o quiz
const loadQuiz=()=>{
    const questions = quizData[currentQuestion];
    const numbQuestion = document.getElementById("question-number");
    const descriptionQuestion = document.getElementById("description-question");
    const alternativeBox = document.getElementById("alternative-box");
    

    numbQuestion.textContent = currentQuestion + 1;
    descriptionQuestion.textContent = questions.question;
    currentQuestionValue.innerHTML = currentQuestion + 1;
    totalQuestions.innerHTML=`${quizData.length}`;
    
    //Gera as perguntas
    let alternativesQuestions = '';
    questions.options.forEach((options, index) => {
        alternativesQuestions += `
        <div class="box">
        <input type="${questions.type === "radio" ? "radio" : "checkbox"}" name="question${currentQuestion}" id="q${currentQuestion}_${index}" value="${index}" required hidden>
        <label for="q${currentQuestion}_${index}" class="answer-label">${options.answer}</label>
        </div>
        `;
    });

    alternativeBox.innerHTML = alternativesQuestions;
}

//função para checar as respostas
const checkAnswer = () =>{
    //Recebe as respostas selecionadas
    const selectedAnswaers = document.querySelectorAll(`input[name="question${currentQuestion}"]:checked`);
    //Recebe as repostas true da base de dados
    const correctAnswers = quizData[currentQuestion].options.filter(option => option.correct);

    //Compara se o tamanho da resposta do jogador e corretas são as mesmas
    //AND transforma a NodeList de selectedAnswaers em array para comparar com as resposta da base de dados
    const isCorrect = correctAnswers.length === selectedAnswaers.length && Array.from(selectedAnswaers).every(input => quizData[currentQuestion].options[input.value].correct);

    //Incrementa a pontuação
    if(isCorrect){
        score++;
    }
}

//Botão para avançar a questão
nextQuestion.addEventListener("click", ()=>{
    const selectedAnswaers = document.querySelectorAll(`input[name="question${currentQuestion}"]:checked`);
    if(selectedAnswaers.length === 0){
        alert("Selecione uma resposta");
        return;
    }

    checkAnswer();

    

    if(currentQuestion < quizData.length - 1){
        currentQuestion++;
        loadQuiz();
        if(currentQuestion === quizData.length - 1){
            nextQuestion.innerText="Finalizar";
        }
    }else{
       submiteQuiz.style.display="block";
       nextQuestion.style.display="none";
    }
})

//Botão para enviar a questão
submiteQuiz.addEventListener("click", ()=>{
    quizBox.style.display="none";
    result.style.display="block";
    answerCorrect.innerHTML=`Você acertou ${score} de ${quizData.length} perguntas. Então... `;
    const imageBox = document.getElementById("image");
    if(score <= 4) {
        imageBox.src = "assests/img4.png"; 
    }else if(score <= 7){
        imageBox.src = "assests/img3.png"; 
    }else if(score <= 10){
        imageBox.src = "assests/img2.png";
    }else{
        imageBox.src = "assests/img1.png";
    }
})

loadQuiz();


