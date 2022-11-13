const numbersDeck = [
	2, 3, 4, 5, 6, 7, 8, 9, 10,
	2, 3, 4, 5, 6, 7, 8, 9, 10,
	2, 3, 4, 5, 6, 7, 8, 9, 10,
	2, 3, 4, 5, 6, 7, 8, 9, 10,
]

const unoNumbersDeck = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
]

export class Game {
	turn = 0

	constructor({ numberOfPlayers, deck } = { numberOfPlayers: 0 }) {
		this.numberOfPlayers = numberOfPlayers
		this.deck = deck || new Deck()
	}

	start() {
		this.players = Array.from({length: this.numberOfPlayers}).map(i => new Player(this.deck.draw(4)))
	}

	progress() {
		if (this.winner) return

		this.check()

		this.player.put()
		this.player.draw(this.draw())

		this.check()

		this.turn++
	}

	check() {
		if (this.player.won()) this.gameOver()
	}

	draw() {
		return this.deck.draw()
	}

	gameOver() {
		this.winner = this.player
	}

	get player() {
		return this.players[this.turn]
	}
}

export class Player {
	constructor(cards) {
		this.cards = cards
	}

	put() {
		return this.cards.pop()
	}

	draw(card) {
		this.cards.push(card)
	}

	won() {
		return this.cards.every(card => card === this.cards[0])
	}
}

export class Deck {
	constructor(availableToDraw = [...numbersDeck, ...unoNumbersDeck]) {
		this.availableToDraw = availableToDraw
	}

	draw(count = 1) {
		const index = count * -1

		let drawn = this.availableToDraw.splice(index)

		return drawn.length > 1 ? drawn : drawn[0]
	}

	reset() {
		this.availableToDraw = [...numbersDeck, ...unoNumbersDeck]
	}
}
