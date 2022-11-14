import test from 'node:test';
import assert from 'assert'
import {Player, Game, Deck} from "./index.js"

test('each player gets 4 cards to start', (t) => {
	const game = new Game({numberOfPlayers: 2})

	game.start()

	assert.deepStrictEqual(game.players[0].cards.length, 4)
	assert.deepStrictEqual(game.players[1].cards.length, 4)
});

test('a player puts a card and draws a card', (t) => {
	const deck = new Deck(
		[
			1, 2, 3, 4,
		 	1, 2, 3, 4,
		 	0,
		]
	)

	const game = new Game({numberOfPlayers: 2, deck})
	game.start()

	const cardsBeforeDraw = [...game.players[0].cards]
	game.progress()
	const cardsAfterDraw = [...game.players[0].cards]

	assert.notDeepStrictEqual(cardsBeforeDraw, cardsAfterDraw)
});

test('a player wins if they have 4 identical numbers', (t) => {
	const deck = new Deck(
		[
			1, 1, 1, 1,
			1, 1, 1, 1,
		]
	)

	const game = new Game({numberOfPlayers: 2, deck })

	game.start()
	game.progress()

	const winner = game.players[0]

	assert.deepStrictEqual(game.winner, winner)
});

test('each player gets their turn', (t) => {
	const deck = new Deck(
		[
			3, 3,
			2, 1, 1, 1,
			2, 1, 1, 1,
		]
	)

	const game = new Game({numberOfPlayers: 2, deck })
	game.start()

	game.progress()
	assert.deepStrictEqual(game.players[0].cards, [2, 1, 1, 3])

	game.progress()
	assert.deepStrictEqual(game.players[1].cards, [2, 1, 1, 3])
});

test('put cards go to the bottom of the deck', (t) => {
	const deck = new Deck(
		[
			2, 2, 2, 2,
			1, 1, 1, 1,
		]
	)

	const game = new Game({numberOfPlayers: 1, deck })

	game.start()
	game.progress()

	assert.deepStrictEqual(game.deck.cards, [1, 2, 2, 2])
});
