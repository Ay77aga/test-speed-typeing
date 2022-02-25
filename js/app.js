// drop menu
let menu = document.querySelector('.menu'),
  lis = Array.from(document.querySelectorAll('.menu ul li')),
  level = document.querySelector('.level'),
  timer = document.querySelector('.time'),
  input = document.querySelector('input'),
  active_word = document.querySelector('.area_data h2'),
  words_area = document.querySelector('.words'),
  score = document.querySelector('.score>span'),
  words = ['html', 'css', 'js','cpp','programing','java','kotlin',
  'go','fkjs','code','wors','hello','world','brain','win','loser'],
  start_btn = document.querySelector('.btn.start'),
  reset_btn = document.querySelector('.btn.reset'),
  pop = document.querySelector('.pop');
// ###### ###### ###### ###### ###### ###### ######


level.setAttribute('data-time', 4);
menu.addEventListener('click', function() {
  this.classList.toggle('active');
  lis.forEach(li => {
    li.addEventListener('click', function() {
      lis.forEach(_ => _.classList.remove('active'));
      level.textContent = this.textContent;
      level.setAttribute('data-time', this.dataset.time)
      this.classList.add('active');
    });
  });
});

render_words(words);
// ###### ###### ###### ###### ###### ###### ######
get_word(words);
let game_area = document.querySelector('.area');

start_btn.onclick = function() {
  this.style.display = 'none';
  game_area.classList.add('active');
  start();
  timer.textContent = level.dataset.time;
}

reset_btn.onclick = function() {
  window.location.reload()

}


function check(c) {
  if (input.value == active_word.textContent) {
    score.textContent++;
    timer.textContent = level.dataset.time;
    get_word(words)
    input.value = '';
  }
  else {
    reset_btn.style.display = 'block';
    pop.style.display = 'block';
    pop.textContent = 'Loser';
    clearInterval(c);
  }
}

// get word
function get_word(arr) {
  let r = Math.floor(Math.random() * arr.length);
  let index = arr.indexOf(arr[r]);
  let word = arr[r];
  index > -1 ? arr.splice(index, 1) : '';
  render_words(arr);
  active_word.textContent = word;
}

function render_words(words) {
  words_area.textContent = '';
  for (let index = 0; index < words.length; index++) {
    let word = document.createElement('span');
    words_area.appendChild(word);
    word.textContent = words[index];
  }
}
//  start game
function start() {
  input.focus();
  pop.style.display = 'none';
  let count = setInterval(() => {
    timer.textContent--;
    if (timer.textContent == 0) {
      check(count);
    }
    if (active_word.textContent == '') {
      timer.textContent = 0;
      game_area.classList.remove('active');
      clearInterval(count);
      reset_btn.style.display = 'block';
      pop.style.display = 'block';
      pop.textContent = 'Winner';
    }
  }, 1000);
}