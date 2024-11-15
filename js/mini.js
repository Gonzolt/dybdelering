const questions = [
    {
        question: "What's my name?",
        answers: ["Thomas", "Fredrik", "Frida"],
        correct: 0
    },
    {
        question: "Which year was I born?",
        answers: ["1814", "2008", "1945"],
        correct: 1
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;

const introContainer = document.querySelector('.intro-container');
const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const scoreElement = document.getElementById('score');
const imageElement = document.getElementById('quiz-image');
const nextButton = document.getElementById('next-btn');
const startButton = document.getElementById('start-btn');

// Show the image and text on page load
window.onload = function() {
    imageElement.classList.remove('hidden'); // Make the image visible
    setTimeout(() => {
        startButton.classList.remove('hidden'); // Show start button after a delay
    }, 6000); // Adjust the delay to match the intro animation timing
};

startButton.addEventListener('click', startGame);

function startGame() {
    introContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    scoreElement.textContent = `Score: ${score}`; // Show initial score
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = ''; // Clear previous answers

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => handleAnswer(index));
        answersElement.appendChild(button);
    });
}

function handleAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correct) {
        score++;
        shakeImage();
        scoreElement.textContent = `Score: ${score}`; // Update score

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setTimeout(showQuestion, 1000); // Show next question after a short delay
        } else {
            endGame(true); // Game won
        }
    } else {
        endGame(false); // Game lost
    }
}

function shakeImage() {
    imageElement.classList.add('shake');
    setTimeout(() => {
        imageElement.classList.remove('shake');
    }, 500); // Remove shake effect after 500ms
}

function endGame(won) {
    questionElement.classList.add('hidden');
    answersElement.classList.add('hidden');
    nextButton.classList.add('hidden');

    // Fade out image
    imageElement.style.opacity = "0";
    setTimeout(() => {
        document.body.style.backgroundColor = "#000"; // Darken the background
        
        if (won) {
            showWinningOutro();
        } else {
            showLosingOutro();
        }
    }, 2000);
}

function showWinningOutro() {
    // Display winning message
    const winMessage = document.createElement('div');
    winMessage.textContent = "Congratulations! You've won!";
    winMessage.style.marginTop = "20px";
    winMessage.style.fontSize = "24px"; // Bigger font for emphasis
    winMessage.style.color = "rgba(0, 255, 0, 1)"; // Green text
    document.body.appendChild(winMessage);

    // Shake the image
    shakeImage();

    // Fade out image
    setTimeout(() => {
        imageElement.style.opacity = "0"; // Fade out image
        setTimeout(() => {
            winMessage.remove(); // Remove winning message after fade
            showRestartButton(); // Show restart option after fade out
        }, 2000); // Wait for fade out
    }, 1000); // Wait before starting shake animation
}

function showLosingOutro() {
    // Show losing message
    questionElement.textContent = "Game Over! Your score: " + score; // Display final score
    const outroMessage = document.createElement('div');
    outroMessage.textContent = "Thanks for playing! Want to try again?";
    outroMessage.style.marginTop = "20px"; // Add some spacing
    document.body.appendChild(outroMessage);

    // Create Restart Button
    const restartButton = document.createElement('button');
    restartButton.textContent = "Restart Game"; // Restart button text
    restartButton.style.marginTop = "10px"; // Add some spacing
    restartButton.style.backgroundColor = "rgba(255, 0, 0, 0.8)"; // Red background
    restartButton.style.color = "#fff"; // White text
    restartButton.style.border = "none"; // No border
    restartButton.style.padding = "10px 20px"; // Padding for the button
    restartButton.style.borderRadius = "5px"; // Rounded corners
    restartButton.style.cursor = "pointer"; // Pointer cursor
    document.body.appendChild(restartButton); // Add button to the body

    // Restart game when button is clicked
    restartButton.addEventListener('click', resetGame);
}

function showRestartButton() {
    const restartButton = document.createElement('button');
    restartButton.textContent = "Restart Game"; // Restart button text
    restartButton.style.marginTop = "10px"; // Add some spacing
    restartButton.style.backgroundColor = "rgba(255, 0, 0, 0.8)"; // Red background
    restartButton.style.color = "#fff"; // White text
    restartButton.style.border = "none"; // No border
    restartButton.style.padding = "10px 20px"; // Padding for the button
    restartButton.style.borderRadius = "5px"; // Rounded corners
    restartButton.style.cursor = "pointer"; // Pointer cursor
    document.body.appendChild(restartButton); // Add button to the body

    // Restart game when button is clicked
    restartButton.addEventListener('click', resetGame);
}

function resetGame() {
    // Reset the game state
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Score: ${score}`; // Reset score display
    imageElement.style.opacity = "1"; // Make image visible again
    document.body.innerHTML = ''; // Clear the body
    introContainer.classList.remove('hidden'); // Show the intro again
    quizContainer.classList.add('hidden'); // Hide the quiz container
    startButton.classList.remove('hidden'); // Show the start button

    // Show the intro image and text again
    const newImage = document.createElement('img');
    newImage.id = 'quiz-image';
    newImage.src = 'bilder/IMG_3516.jpeg'; // Make sure to use the correct image path
    newImage.alt = "Eye";
    newImage.classList.remove('hidden'); // Make the image visible
    document.body.appendChild(newImage);

    const newIntroText = document.createElement('h1');
    newIntroText.id = 'intro-text';
    newIntroText.textContent = "You shouldn't have let your curiosity get you.";
    document.body.appendChild(newIntroText);

    // Show the start button again
    const newStartButton = document.createElement('button');
    newStartButton.id = 'start-btn';
    newStartButton.textContent = "Start Game";
    newStartButton.classList.remove('hidden'); // Make start button visible
    document.body.appendChild(newStartButton);

    newStartButton.addEventListener('click', startGame);
}