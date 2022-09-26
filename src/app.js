const express = require('express');

const app = express();
app.use(express.json());

// strings
const { sayHello, uppercase, lowercase, firstCharacters } = require('./lib/strings');

app.get('/strings/hello/:string', (req, res) => {
  res.status(200).json({ result: sayHello(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.status(200).json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.status(200).json({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  res.status(200).json({ result: firstCharacters(req.params.string, req.query.length || 1) });
});

// numbers
const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);

  return Number.isNaN(a) || Number.isNaN(b)
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: add(a, b) });
});

app.get('/numbers/subtract/:a/from/:b', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);

  return Number.isNaN(a) || Number.isNaN(b)
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: subtract(b, a) });
});

app.post('/numbers/multiply', (req, res) => {
  const { a, b } = req.body;

  if (a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  return Number.isNaN(parseInt(a, 10)) && Number.isNaN(parseInt(b, 10))
    ? res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' })
    : res.status(200).json({ result: multiply(a, b) });
});

app.post('/numbers/divide', (req, res) => {
  const { a, b } = req.body;

  if (b === 0 || b === '0') {
    return res.status(400).json({ error: 'Unable to divide by 0.' });
  }

  if (a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  return Number.isNaN(parseInt(a, 10)) && Number.isNaN(parseInt(b, 10))
    ? res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' })
    : res.status(200).json({ result: divide(a, b) });
});

app.post('/numbers/remainder', (req, res) => {
  const { a, b } = req.body;

  if (b === 0 || b === '0') {
    return res.status(400).json({ error: 'Unable to divide by 0.' });
  }

  if (a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  return Number.isNaN(parseInt(a, 10)) && Number.isNaN(parseInt(b, 10))
    ? res.status(400).json({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: remainder(a, b) });
});

// booleans

const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');

app.post('/booleans/negate', (req, res) => {
  res.status(200).json({ result: negate(req.body.value) });
});

app.post('/booleans/truthiness', (req, res) => {
  res.status(200).json({ result: truthiness(req.body.value) });
});

app.get('/booleans/is-odd/:number', (req, res) => {
  const number = parseInt(req.params.number, 10);

  return Number.isNaN(number)
    ? res.status(400).json({ error: 'Parameter must be a number.' })
    : res.status(200).json({ result: isOdd(parseInt(number, 10)) });
});

app.get('/booleans/:string/starts-with/:character', (req, res) => {
  const { string, character } = req.params;

  return character.length !== 1
    ? res.status(400).json({ error: 'Parameter "character" must be a single character.' })
    : res.status(200).json({ result: startsWith(character, string) });
});

// arrays
const {
  getNthElement,
  arrayToCSVString,
  addToArray2,
  removeNthElement2,
  elementsStartingWithAVowel,
} = require('./lib/arrays');

app.post('/arrays/element-at-index/:index', (req, res) => {
  const { index } = req.params;
  const { array } = req.body;

  res.status(200).json({ result: getNthElement(index, array) });
});

app.post('/arrays/to-string', (req, res) => {
  res.status(200).json({ result: arrayToCSVString(req.body.array) });
});

app.post('/arrays/append', (req, res) => {
  const { array, value } = req.body;

  res.status(200).json({ result: addToArray2(value, array) });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  res.status(200).json({ result: elementsStartingWithAVowel(req.body.array) });
});

app.post('/arrays/remove-element', (req, res) => {
  const index = parseInt(req.query.index, 10);
  const { array } = req.body;

  res.status(200).json({ result: removeNthElement2(index || 0, array) });
});

module.exports = app;
