const game = {
  // options
  width: 6,
  height: 6,
  // state
  playing: false, // are we playing?
  lastNumber: 0, // last number player picked from the field
}
const playfield = document.querySelector('.playfield')

// Knuth shuffle
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
}

// make playfield card from a number
// returns a HTML-string
function makeElement(number, width) {
  return `<div data-number="${number}" class="playcard playcard-${width}">${number}</div>`
}

function createField() {
  const size = game.width * game.height
  // create numbers
  const numbers = []
  for (let i = 1; i <= size; i++) {
    numbers.push(i)
  }

  // scramble numbers
  shuffle(numbers)

  // turn numbers into elements
  const elements = []
  for (let number of numbers) {
    elements.push(makeElement(number, game.width))
  }

  // string representation of the field
  return elements.join('')
}

// starts new game
function startGame() {
  // create a new field
  const fieldString = createField()
  playfield.innerHTML = fieldString

  // reset gamestate
  game.playing = true
  game.lastNumber = 0
}

// handler for clicking on the field
function handlePlayfieldClick(e) {
  // if we are not playing, no effect
  if (!game.playing) {
    return
  }

  // get the card & its number
  const card = e.target.closest('.playcard')
  // proofcheck, just in case
  if (!card) {
    return
  }
  const number = +card.dataset.number

  // if card already hit, do nothing
  if (number <= game.lastNumber) {
    return
  }

  if (game.lastNumber + 1 === number) {
    // if we hit
    card.classList.add('hit')
    game.lastNumber += 1
  } else {
    // if we miss
    console.log('miss!')
  }
}
playfield.addEventListener('click', handlePlayfieldClick)

startGame()
