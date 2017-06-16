// the goal is to return a list of [ word, [ definitions ] ] lists
// 
// eh, well, I think that will work anyway

let scrape = () => {
  let table = document.querySelector('#vocab-rows');

  let words = [];

  table.querySelectorAll('.word-cell').forEach(node => {
    words.push(node.querySelector('.hidden').textContent);
  })
  return words;
}

let words = JSON.stringify(scrape());
