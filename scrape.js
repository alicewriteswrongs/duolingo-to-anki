// the goal is to return a list of [ word, [ definitions ] ] lists
//
// eh, well, I think that will work anyway

let scrape = () => {
  let table = document.querySelector("#vocab-rows")

  return [...table.querySelectorAll(".word-cell")].map(
    node => node.querySelector(".hidden").textContent
  )
}

let words = JSON.stringify(scrape())
console.log(words)
