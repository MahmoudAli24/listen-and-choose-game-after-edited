let micIcon = document.querySelectorAll('.mic__icon img');
let images = document.querySelectorAll('.images img');
let currentQuestionIndex = 0;
let answer = 0;
let resultWrapper = document.querySelector('.result');
let backdrop = document.querySelector('.backdrop');
let backControl = document.querySelector('#backControl');
let ExclamationMark = document.querySelector('.ExclamationMark');
let ExclamationMarkText = document.querySelector('.ExclamationMarkText');
let progress = document.querySelector('.score__progress > span');
let audio = document.getElementById('success');
let resultExit = document.querySelector('.result__exit');

micIcon.forEach((icon) => {
  // ADD Class to the mic icon just one time
  icon.addEventListener('click', function () {
    icon.classList.add('jello-vertical');
    audio.play();
    setTimeout(() => {
      icon.classList.remove('jello-vertical');
    }, 1000);
  });
});

$('.owl-carousel').owlCarousel({
  items: 1,
  margin: 10,
  autoHeight: true,
  scrollPerPage: false,
  mouseDrag: false,
  pullDrag: false,
  touchDrag: false,
  animateIn: 'animate__zoomIn',
  animateOut: 'animate__fadeOut',
});

let slideCount = document.querySelectorAll('.owl-item').length;

let owl = $('.owl-carousel');
owl.owlCarousel();
// Go to the next item
// $('.owl-next').click(function () {
//   owl.trigger('next.owl.carousel');
// })
// // Go to the previous item
// $('.owl-prev').click(function () {
//   owl.trigger('prev.owl.carousel');
// })

// When Hover on the ExclamationMark show the ExclamationMarkText for 1 second
ExclamationMark.addEventListener('mouseover', function () {
  ExclamationMarkText.style.display = 'block';
  ExclamationMarkText.style.opacity = '1';
  ExclamationMarkText.style.visibility = 'visible';
  setTimeout(() => {
    ExclamationMarkText.style.display = 'none';
    ExclamationMarkText.style.opacity = '0';
    ExclamationMarkText.style.visibility = 'hidden';
  }, 6000);
});

images.forEach((img) => {
  img.addEventListener('click', function () {
    let selectedAnswer = parseInt(this.getAttribute('data-answer'));
    if (selectedAnswer === 1 && !this.classList.contains('answered')) {
      this.nextElementSibling.style.backgroundColor = 'green';
      this.classList.add('answered');
      answer++;
      currentQuestionIndex++;
      if (currentQuestionIndex < slideCount) {
        progress.style.width = `${(100 / slideCount) * (currentQuestionIndex + 1)}%`;
      }
      audio.play();

      owl.trigger('next.owl.carousel');

      if (answer === slideCount) {
        displayResult();
      }
    } else {
      this.nextElementSibling.style.backgroundColor = 'red';
      setTimeout(() => {
        this.nextElementSibling.style.backgroundColor = '';
      }, 1000);
    }
  });
});


resultExit.addEventListener('click', function () {
  resultWrapper.style.display = 'none';
  backdrop.style.display = 'none';
});

// Event listener for back control
// backControl.addEventListener('click', function () {
//   owl.trigger('prev.owl.carousel');
// });

// Event listener for backdrop
backdrop.addEventListener('click', function () {
  this.style.display = 'none'; // Hide the backdrop
  resultWrapper.style.display = 'none'; // Hide the result
});

// Function to display the result
function displayResult() {
  resultWrapper.style.display = 'block'; // Show the result
  backdrop.style.display = 'block'; // Show the backdrop
}

owl.on('changed.owl.carousel', function (event) {
  if (event.item.index === slideCount - 1 && answer === slideCount) {
    displayResult();
  }
});
