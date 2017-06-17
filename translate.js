const fs = require('fs')
const translate = require('google-translate-api')
const { stringify } = require('csv')
const chalk = require('chalk')

const csvFilename = jsonFilename => (
  `${jsonFilename.replace(/\..+$/, "")}.csv`
);

if (process.argv.length < 3) {
  console.log("no arguments provided, usage is:\n");
  console.log("\tnode translate.js word_file.json\n");
} else {
  let words = JSON.parse(String(fs.readFileSync(process.argv[2])));

  Promise.all(words.map(word => {
    return translate(word, { to: 'en' })
      .then(res => {
        console.log(`translating ${chalk.magenta(word)} to ${chalk.blue(res.text)}`);
        return [word, res.text]
      })
      .catch(console.error);
  })).then(translated => {
    console.log('done translating ✔\n');

    let newFilename = csvFilename(process.argv[2]);
    console.log(`writing translations to ${newFilename}...`);

    stringify(translated, (err, output) => {
      fs.writeFileSync(newFilename, output);
      console.log(chalk.green("done!"));
    })
  });
}
