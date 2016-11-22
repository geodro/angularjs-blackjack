'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.Dealer
 * @description
 * # Dealer
 * Service in the blackjackApp.
 */
angular.module('blackjackApp')
    .service('Dealer', function ($rootScope, Game, Deck, User) {
        var user = new User(999);

        // Override the user name
        user.name = 'Dealer';

        // If the dealer is ready (has played)
        user.ready = false;

        // Deal cards to players
        user.deal = function (n, uid) {
            var player = Game.getPlayer(uid);
            if (player === undefined) {
                player = user;
            }
            if (n === undefined) {
                n = 1;
            }
            if (player.stand || player.busted || Deck.remaining() === 0) {
                return false;
            }
            for (var i = 0; i < n; i++) {
                player.cards.push(Deck.getCard());
            }
        };

        // Shuffle deck cards (reset deck)
        user.shuffle = function () {
            Deck.shuffle();
        };

        // Reset Dealer for new game
        user.new = function () {
            user.cards = [];
            user.busted = false;
            user.blackjack = false;
            user.stand = false;
            user.playing = false;
            user.ready = false;
            user.winner = false;
            user.tied = false;

            // Let the game know that dealer has been reset
            $rootScope.$emit('dealer-reset');
        };

        // Play Dealer hand
        user.play = function () {
            user.isPlaying();
            user.score();

            // Get new cards while score is bellow 17 points
            while (user.score() < 17) {
                user.deal();
            }

            // If the score is bigger than 17 and lower that 21, Dealer will stand
            if (user.score() < 21) {
                user.willStand();
            }
            user.ready = true;

            // Finish the game
            Game.finish();
        };
        return user;
    });
