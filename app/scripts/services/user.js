'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.User
 * @description
 * # User
 * Factory in the blackjackApp.
 */
angular.module('blackjackApp')
    .factory('User', function ($rootScope) {
        return function (id) {
            // Player id
            this.id = id;

            // Player name
            this.name = 'Player ' + id;

            // Player cards
            this.cards = [];

            // If player is busted
            this.busted = false;

            // If player has blackjack
            this.blackjack = false;

            // If player has stand
            this.stand = false;

            // If player is playing
            this.playing = false;

            // If player has tied
            this.tied = false;

            // If player has won
            this.winner = false;

            // Set the flag for user when playing
            this.isPlaying = function () {
                this.playing = true;
            };

            // Set the Player to stand
            this.willStand = function () {
                if (!this.stand) {
                    this.stand = true;
                    // Emit event to Game to let it know that a user has finised
                    $rootScope.$emit('player-finished');
                }
            };

            // Calculate player score
            this.score = function () {
                var aces = 0;
                var total = 0;
                for (var key in this.cards) {
                    var card = this.cards[key];
                    var cardValue = card.getValue();

                    // Aces have 2 values: 1 or 11; by default we sum the score with 11 and record how many aces has
                    if (cardValue === 11) {
                        aces++;
                    }
                    total += cardValue;
                }

                // If the score is above 21 and the user has aces we revert the calculation with the value 1 until the score is below 21
                while (total > 21 && aces > 0) {
                    aces -= 1;
                    total -= 10;
                }

                // If user score is above 21 then player is busted
                if (total > 21) {
                    isBusted();
                }

                // If user score is 21 then user has blackjack
                if (total === 21) {
                    hasBlackJack();
                }

                return total;
            };

            var user = this;

            var isBusted = function () {
                if (!user.busted) {
                    user.busted = true;
                    // Emit event to Game to let it know that a user has finised
                    $rootScope.$emit('player-finished');
                }
            };

            var hasBlackJack = function () {
                if (!user.blackjack) {
                    user.blackjack = true;
                    // Emit event to Game to let it know that a user has finised
                    $rootScope.$emit('player-finished');
                }
            };
        };
    });
