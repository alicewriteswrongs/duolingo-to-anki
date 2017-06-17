const fs = require('fs')
const translate = require('google-translate-api')
const { stringify } = require('csv')
const chalk = require('chalk')

let words = JSON.parse(String(fs.readFileSync('words.json')))

let translatedWords = []

Promise.all(words.map(word => {
  return translate(word, { to: 'en' })
    .then(res => {
      console.log(`translating ${chalk.magenta(word)} to ${chalk.blue(res.text)}`);
      return [word, res.text]
    })
    .catch(console.error);
})).then(translated => {
  console.log('done translating ✔\n');
  console.log('writing translations to disk...');

  fs.writeFileSync("translated_words.json", JSON.stringify(translated));

  stringify(translated, (err, output) => {
    fs.writeFileSync("translated_words.csv", output);
    console.log(chalk.green("done!"));
  })
});
