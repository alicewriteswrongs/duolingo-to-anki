const fs = require('fs')
const translate = require('google-translate-api')
const { stringify } = require('csv')
const chalk = require('chalk')
const program = require('commander')

const csvFilename = jsonFilename => (
  `${jsonFilename.replace(/\..+$/, '')}.csv`
)

program
  .description('translate your duolingo words and output a CSV for anki!')
  .option('-t, --to <code>', 'target language (defaults to English)')
  .option('-f, --from <code>', 'source language (defaults to guessing)')
  .option('-j, --json <path>', 'path to JSON file containing words to translate')
  .parse(process.argv)

if (!program.json) {
  program.help()
} else {
  let words = JSON.parse(String(fs.readFileSync(program.json)))

  let translateOptions = { to: 'en' }

  if (program.to) {
    translateOptions.to = program.to
  }

  if (program.from) {
    translateOptions.from = program.from
  }

  console.log('translating...')

  ;(async () => {
    let translated = await Promise.all(words.map(async word => {
      try {
        let res = await translate(word, translateOptions)
        console.log(`translated ${chalk.magenta(word)} to ${chalk.blue(res.text)}`)
        return [word, res.text]
      } catch (e) {
        console.error(e)
      }
    }))

    console.log('done translating ✔\n')

    let newFilename = csvFilename(program.json)
    console.log(`writing translations to ${newFilename}...`)

    stringify(translated, (err, output) => { // eslint-disable-line
      fs.writeFileSync(newFilename, output)
      console.log(chalk.green('done!'))
    })
  })()
}
