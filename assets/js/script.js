let gameInfo = [
  {
    id: 1,
    backgroundImgSrc: './assets/images/ScreenOne/BACKGROUND.svg',
    backgroundImgSrcSmall: './assets/images/ScreenOne/bg.png',
    questionHtml: `<div class="screen__one position-relative">
    <div class="screen__one__content">
      <div class="images">
        <div class="position-relative scale-in-center">
          <img src="./assets/images/ScreenOne/img-1.svg" alt="1" data-answer="0" class="img-fluid" />
          <span class="circle position-absolute top-0 start-50 translate-middle"></span>
        </div>
        <div class="position-relative scale-in-center">
          <img src="./assets/images/ScreenOne/img-2.svg" alt="2" data-answer="1" class="img-fluid" />
          <span class="circle position-absolute top-0 start-50 translate-middle"></span>
        </div>
      </div>
    </div>
    <div class="mic__icon position-absolute top-0 start-50 bg-white d-flex justify-content-center align-items-center scale-in-top">
      <img src="./assets/images/ScreenOne/mic.svg" alt="mic" />
    </div>
  </div>`,
    correctAnswer: 1
  }, {
    id: 2,
    backgroundImgSrc: './assets/images/ScreenTwo/bg.png',
    backgroundImgSrcSmall: './assets/images/ScreenTwo/bg-small.svg',
    audioSrc: './assets/audio/ScreenTwo/audio.mp3',
    correctAnswer: 1,
    questionHtml: `<div class="screen__two position-relative">
    <div class="screen__two__content">
      <div class="images">
        <div class="position-relative scale-in-center">
          <img src="./assets/images/ScreenTwo/img-0.svg" alt="1" data-answer="0" class="img-fluid clickable " />
          <span class="circle position-absolute top-0 start-50 translate-middle"></span>
        </div>
        <div class="position-relative scale-in-center">
        <img src="./assets/images/ScreenTwo/mic.svg" alt="Mic"class="img-fluid" />
        </div>
        <div class="position-relative scale-in-center">
          <img src="./assets/images/ScreenTwo/img-1.svg" alt="2" data-answer="1" class="img-fluid clickable " />
          <span class="circle position-absolute top-0 start-50 translate-middle"></span>
        </div>
      </div>
    `
  }, {
    id: 3,
    backgroundImgSrc: './assets/images/ScreenThree/bg.svg',
    backgroundImgSrcSmall: './assets/images/ScreenThree/bg-small.svg',
    questionHtml: `<div class="screen__three position-relative">
    <div class="screen__three__content">
      <div class="images d-flex algin-items-center justify-content-center">
        <div class="position-relative scale-in-center">
          <img src="./assets/images/ScreenThree/img-1.svg" alt="1" data-answer="0" class="img-fluid clickable " />
          <span class="circle position-absolute top-0 start-50 translate-middle"></span>
        </div>
        <div class="position-relative scale-in-center">
          <img src="./assets/images/ScreenThree/img-2.svg" alt="2" data-answer="1" class="img-fluid clickable " />
          <span class="circle position-absolute top-0 start-50 translate-middle"></span>
        </div>
        <div class="position-relative scale-in-center">
          <img src="./assets/images/ScreenThree/img-3.svg" alt="3" data-answer="2" class="img-fluid clickable " />
          <span class="circle position-absolute top-0 start-50 translate-middle"></span>
        </div>
      </div>
    </div>
    `,
    correctAnswer: 2
  }
];

let currentQuestionIndex = 0;
let gameWrapper = document.querySelector('.gameWrapper');
let resultWrapper = document.querySelector('.result');
let backdrop = document.querySelector('.backdrop');
let screenBackground = document.querySelector('.backGroundImageWrapper');
let backControl = document.querySelector('#backControl');

// Function to display the question
function displayQuestion(index) {
  let question = gameInfo[index];
  console.log(question);
  let backgroundImgSrc = window.matchMedia('(max-width: 768px) and (orientation: landscape)').matches ?
    question.backgroundImgSrcSmall :
    question.backgroundImgSrc;
  screenBackground.innerHTML = `
    <img src="${backgroundImgSrc}" alt="background" />
  `;
  gameWrapper.innerHTML = question.questionHtml;

  // Add event listeners to images
  let images = gameWrapper.querySelectorAll('.images img');
  images.forEach(img => {
    img.addEventListener('click', function () {
      let selectedAnswer = parseInt(this.getAttribute('data-answer'));
      if (selectedAnswer === question.correctAnswer) {
        this.nextElementSibling.style.backgroundColor = 'green';
        recordAnswer();
      } else {
        this.nextElementSibling.style.backgroundColor = 'red';
        setTimeout(() => {
          this.nextElementSibling.style.backgroundColor = '';
        }, 1000);
      }
    });
  });
}

// Event listener for backdrop
backdrop.addEventListener('click', function () {
  this.style.display = 'none'; // Hide the backdrop
  resultWrapper.style.display = 'none'; // Hide the result
});

// Event listener for back control
backControl.addEventListener('click', function () {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
  }
});

// Function to display the result
function displayResult() {
  resultWrapper.style.display = 'block'; // Show the result
  backdrop.style.display = 'block'; // Show the backdrop
}

// Function to record the answer
function recordAnswer() {
  currentQuestionIndex++;
  if (currentQuestionIndex < gameInfo.length) {
    // wait for 1 second before displaying the next question
    setTimeout(() => {
      displayQuestion(currentQuestionIndex);
    }, 1000);
  } else {
    displayResult();
  }
}

// Start the game
displayQuestion(currentQuestionIndex);
