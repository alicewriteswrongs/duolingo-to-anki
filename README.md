# Duolingo -> Anki

[Duolingo](https://www.duolingo.com/) is nice, but
[anki](https://apps.ankiweb.net/index.html) is nice too! Wouldn't it be
great if they would play well together?

Well, now they sort of can. This repo contains a little function to scrape
all the words you've seen off of Duolingo and dump them into JSON, and
a simple node.js script that will translate all the words and write them
into a CSV which can be imported into Anki. Hooray!

## Setup and usage

Do this:

```
yarn install --pure-lockfile
```

### Getting words from Duolingo

The first thing is to scrape words from Duolingo. Go to the [words
page](https://www.duolingo.com/words), which lets you view all the words
you've seen so far. Then, copy and paste this into the JavaScript console:

```js
let scrape = () => {
  let table = document.querySelector('#vocab-rows')

  return [...table.querySelectorAll('.word-cell')]
    .map(node => node.querySelector('.hidden').textContent)
}

let words = JSON.stringify(scrape())
console.log(words)
```

Then `words` will contain a JSON string of all the words you've seen.
Nifty! Now you need to get that JSON out of the browser somehow - the
easiest way I know in Chrome is probably to right-click on the console,
click 'save as', and save the logfile. Then you can open it in your editor
and get the JSON out. Save it to a file in this repo called `words.json`
or something similar.

### Translating and Converting JSON to CSV

Then, assuming you've had no issues with the above, you should be able to
just do:

```sh
node translate.js --json words.json
```

And it will write a file called `words.csv` to the current directory. This
can be directly imported in Anki, by doing file -> import. Make sure you
add it to a new deck! The default setup (first field as front of card,
second field as back) should be fine.

By default `translate.js` will guess the source language and will use
`'en'` as the target language. Google translate is pretty good at guessing
the source language, but you will usually get better translations if you
specify it manually, and of course if you want a language other than
English as the target you will need to do that too! The `--from` and
`--to` CLI flags will let you do that:

```js
node translate.js --from fr --to en --json words.json
```

Happy studying!

Note: Anki by default will refuse to add duplicate words to an existing
deck, so as you continue on your duolingo journey you should be able to
re-run this whole process and add only the new words to your existing
deck.
