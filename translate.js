const fs = require('fs')

const translate = require('google-translate-api')

let words = JSON.parse(String(fs.readFileSync('words.json')))

let translatedWords = []

Promise.all(words.map(word => {
  console.log(`translating ${word}`);
  return translate(word, { to: 'en' })
    .then(res => [word, res.text])
    .catch(console.error);
})).then(translated => {
  console.log('done translating');
  fs.writeFileSync("translated_words.json", JSON.stringify(translated));
});
