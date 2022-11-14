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
		if (this.isGameOver) return

		this.check()

		let card = this.player.put()
		this.deck.put(card)

		this.player.draw(this.deck.draw())

		this.check()

		this.turn++
	}

	run() {

	}

	check() {
		if (this.player.won()) this.gameOver()
	}

	gameOver() {
		this.winner = this.player
	}

	get isGameOver() {
		return Boolean(this.winner)
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
	constructor(cards = [...numbersDeck, ...unoNumbersDeck]) {
		this.cards = cards
	}

	draw(count = 1) {
		const index = count * -1

		let drawn = this.cards.splice(index)

		return drawn.length > 1 ? drawn : drawn[0]
	}

	put(card) {
		this.cards.unshift(card)
	}

	reset() {
		this.cards = [...numbersDeck, ...unoNumbersDeck]
	}

}
