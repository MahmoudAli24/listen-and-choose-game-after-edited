let micIcon = document.querySelectorAll('.mic__icon img');
let images = document.querySelectorAll('.img-card img');
let currentQuestionIndex = 0;
let answer = 0;
let resultWrapper = document.querySelector('.result');
let backdrop = document.querySelector('.backdrop');
let backControl = document.querySelector('#backControl');
let ExclamationMark = document.querySelector('.ExclamationMark');
let ExclamationMarkText = document.querySelector('.ExclamationMarkText');
let progress = document.querySelector('.score__progress > span');
let audio = document.getElementById('success');
let wrong = document.getElementById('wrong');
let resultExit = document.querySelector('.result__exit');
let startGameBg = document.querySelector('.start-game-bg');
let gameBg = document.querySelector('.bg');
let startIcon = document.querySelector('.start-game-icon');
let circles = document.querySelectorAll('.circle');


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
console.log(slideCount);

if (slideCount > 1) {
  micIcon.forEach((icon) => {
    icon.style.display = 'flex';
  });
}

let owl = $('.owl-carousel');

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

owl.on('changed.owl.carousel', function (event) {
  console.log(event.item.index);
  if (event.item.index === 0) {
    micIcon.forEach((icon) => {
      icon.style.display = 'none';
    });
  } else {
    micIcon.forEach((icon) => {
      icon.style.display = 'block';
    });
  }
  if (event.item.index > 0) {
    startGameBg.style.display = 'none';
    gameBg.style.display = 'block';
  }
});


owl.on('changed.owl.carousel', function (event) {
  console.log(event.item.index);
  if (event.item.index > 0) {
    startGameBg.style.display = 'none';
    gameBg.style.display = 'block';
  }
});

startIcon.addEventListener('click', function () {
  owl.trigger('next.owl.carousel');
});
// Go to the next item
$('.owl-next').click(function () {
  // owl.trigger('next.owl.carousel');
  console.log('next');
})
// // Go to the previous item
$('.owl-prev').click(function () {
  // owl.trigger('prev.owl.carousel');
  console.log('prev');
})

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

let clickEnabled = true; // Add this flag

images.forEach((img, index) => {
  img.addEventListener('click', function () {
    if (!clickEnabled) return; // Check if clicking is enabled

    let selectedAnswer = parseInt(this.getAttribute('data-answer'));
    if (selectedAnswer === 1) {
      answer++;
      currentQuestionIndex++;
      if (currentQuestionIndex < slideCount) {
        progress.style.width = `${(100 / slideCount) * (currentQuestionIndex + 1)}%`;
      }
      audio.play();
      circles[index].style.backgroundColor = 'green'; // Change the style of the circle
      setTimeout(() => {
        circles[index].style.backgroundColor = ''; // Change the style of the circle
      }, 1000);
      owl.trigger('next.owl.carousel')
      clickEnabled = false; // Disable clicking temporarily
      setTimeout(() => {
        clickEnabled = true; // Enable clicking after a short delay
      }, 100);
      console.log("Answer: ", answer, "Slide Count: ", slideCount);
      if (answer === slideCount - 1) {
        displayResult(); // Display the result
      }
      // Additional code for your carousel or next question logic
    } else {
      wrong.play();
      circles[index].style.backgroundColor = 'red'; // Change the style of the circle
      setTimeout(() => {
        circles[index].style.backgroundColor = ''; // Change the style of the circle
      }, 1000);
    }
  });
});


resultExit.addEventListener('click', function () {
  resultWrapper.style.display = 'none';
  backdrop.style.display = 'none';
});

// Event listener for back control
backControl.addEventListener('click', function () {
  // owl.trigger('prev.owl.carousel');
  console.log('prev');
});

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

// POPUP MODAL

const popupModal = document.querySelector(".popup");
const popupOverlay = document.querySelector(".pop-overlay");

const checkScreen = () => {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  const isMobile = window.innerWidth < 768 && isPortrait;
  return isMobile;
};

const togglePopupVisibility = (isVisible) => {
  popupModal.style.visibility = isVisible ? "visible" : "hidden";
  popupOverlay.style.visibility = isVisible ? "visible" : "hidden";
};

const handleLoad = () => {
  const isMobile = checkScreen();
  togglePopupVisibility(isMobile);
};

const handleOrientationChange = () => {
  const isMobile = checkScreen();
  if (window.orientation === 90 || window.orientation === -90) {
    togglePopupVisibility(!isMobile);
  } else {
    togglePopupVisibility(true);
  }
};

window.addEventListener("load", handleLoad);
window.addEventListener("orientationchange", handleOrientationChange);
