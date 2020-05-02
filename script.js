const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard', 'apple', 'query', 'bamboo'];

let selectedWord = words[Math.floor(Math.random() * words.length)];


const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `${selectedWord.split('').map(letter => `<span class="letters"> ${correctLetters.includes(letter) ? letter : ''}  </span>`).join('')}`;
  const innerWord = wordEl.innerText.replace(/\n/g,'')
  if(innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You Won!!";
    popup.style.display = "flex";
  }
}

function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

function updateWrongLettersElement() {
  wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''} ${wrongLetters.map(letter => `<span>${letter}</span>`)}`;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if(index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if(figureParts.length === wrongLetters.length) {
    finalMessage.innerText = 'Sorry! You Lost!!';
    popup.style.display = 'flex';
  }
}

//add event listner

window.addEventListener('keydown', e => {
  if(e.keyCode >= 65 && e.keyCode <= 90){
    const letter = e.key;
    if(selectedWord.includes(letter)) {
      if(!correctLetters.includes(letter)) {
        correctLetters.push(letter)
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if(!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersElement();
      } else {
        showNotification();
      }
    }
  }
})

playAgainBtn.addEventListener('click', () => window.location.reload());

displayWord();