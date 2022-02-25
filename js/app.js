// drop menu
const menu = document.querySelector('.menu'),
  lis = document.querySelectorAll('.menu ul li'),
  level = document.querySelector('.level');

menu.addEventListener('click', function() {
  this.classList.toggle('active');
  lis.forEach(li => {
    li.addEventListener('click', function() {
      lis.forEach(_ => _.classList.remove('active'));
      level.textContent = this.textContent;
      this.classList.add('active');
    });
  });
});
// ###### ###### ###### ###### ###### ###### ######
//  Render Wordes
const words = ['html', 'css', 'js', 'php', 'java', 'python',
 'react', 'javascript', 'programming', 'math', 'go', 'cpp',
 'arabic','english'];
const words_area = document.querySelector('.words');

for (let index = 0; index < words.length; index++) {
  let word = document.createElement('span');
  words_area.appendChild(word);
  word.textContent = words[index];
}
