'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.Deck
 * @description
 * # Deck
 * Service in the blackjackApp.
 */
angular.module('blackjackApp')
    .service('Deck', function (Card) {
        // Record the extracted cards id (from 1 to 52);
        var extracted = [];

        // Record the cards object
        var cards = [];

        // Calculate the remaining cards in deck
        this.remaining = function () {
            return 52 - extracted.length;
        };

        // Shuffle the deck (reset)
        this.shuffle = function () {
            extracted = [];
            cards = [];
        };

        // Return a random card from deck
        this.getCard = function () {
            // Get random card id from 1 to 52
            var n = Math.floor(Math.random() * 52 + 1);
            // Make sure is not an extracted card id
            while (extracted.includes(n)) {
                n = Math.floor(Math.random() * 52 + 1);
            }
            // Store extracted card id in deck
            extracted.push(n);
            // Instantiate the card object
            var card = new Card(n);
            // Store extracted card object in deck
            cards.push(card);
            return card;
        };
    });
