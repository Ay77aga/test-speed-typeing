import words from './words.js';

const query = (element) => document.querySelector(element);

let words_area = query('.words');
let current_word = query('.area_data h2');
let input = query('input');
let count_dowen = query('.time');
let current_score = query('.current_score span');
let height_score = query('.height_score span');
let select = query('select');
let start_btn = query('.start');

let level = 0;
let count_score = 0;


if (window.localStorage.Height_score) {
  height_score.textContent = window.localStorage.Height_score;
}

start_btn.onclick = function() {
  level = select.value;
  this.remove();
  query('section').classList.add('active');
  start(words);
};

query('.again').onclick = () => window.location.reload();


function render_words(arr) {
  words_area.innerHTML = '';
  get_word(arr)
  arr.forEach(word => {
    let span = document.createElement('span');
    span.textContent = word;
    words_area.appendChild(span)
  });
}

function get_word(arr) {
  let rand = Math.floor(Math.random() * arr.length);
  let index = arr.indexOf(arr[rand]);
  let word = arr.splice(index, 1);

  current_word.textContent = word.toString();
  return word.toString();
}

function start(arr) {
  input.focus();
  render_words(arr);
  let time = setInterval(() => {
    level--;
    count_dowen.textContent = level;
    if (level === 0) {
      check(time);
    }
  }, 1000)
}


function check(t) {
  if (input.value == current_word.textContent) {
    update_score();
    win(t);
    input.value = '';
    level = 4;
    render_words(words)
  } else {
    lose();
    clearInterval(t)
  }

}

function win(t) {
  if (words.length === 0) {
    console.log('win');
    msg('Winner');
    clearInterval(t);
  }
}

function lose() {
  console.log('lose')
  msg('Loser')
  input.setAttribute('disabled', '');
}

function update_score() {
  count_score++
  console.log(count_score);
  current_score.textContent = count_score;
  if (count_score > height_score.textContent) {
    height_score.textContent = count_score;
    window.localStorage.Height_score = count_score;
  }

}

function msg(str) {
  query('.stats').classList.add('active');
  query('.stats .s').textContent = count_score;
  query('.stats .p').textContent = str;
}