'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.Card
 * @description
 * # Card
 * Factory in the blackjackApp.
 */
angular.module('blackjackApp')
    .factory('Card', function () {
        // The cards are from 1 to 52;
        return function (n) {
            // We get the number of card from the deck; 0 is King; 1 Ace; 11 Knight; 12 Queen;
            var number = n % 13;
            // We get the suit number; Heart cards are from 1-13; Diamond 14-26; Cub 27 - 39; Spade 40 - 52;
            var suit = Math.floor((n - 1) / 13) + 1;

            // Value of card;
            var v = null;

            // We get the value of card; all face cards have 10 points; aces have 1 or 11;
            this.getValue = function () {
                if (v !== null) {
                    return v;
                }
                if (number === 1) {
                    return 11;
                }
                if (number < 1 || number > 10) {
                    return 10;
                }
                v = number;
                return number;
            };

            // Set the name of the card for player
            this.getName = function () {
                switch (number) {
                    case 1:
                        n = 'Ace';
                        break;
                    case 11:
                        n = 'Knight';
                        break;
                    case 12:
                        n = 'Queen';
                        break;
                    case 0:
                        n = 'King';
                        break;
                    default:
                        n = number;
                        break;
                }
                return n;
            };

            // Set the suit name for player
            this.getSuitName = function () {
                switch (suit) {
                    case 1:
                        n = 'Heart';
                        break;
                    case 2:
                        n = 'Diamond';
                        break;
                    case 3:
                        n = 'Cub';
                        break;
                    case 4:
                        n = 'Spade';
                        break;
                    default:
                        n = '';
                        break;
                }
                return n;
            };

            // Full name of card
            this.n = this.getName() + ' of ' + this.getSuitName();
        };
    });
