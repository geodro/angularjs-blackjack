'use strict';

/**
 * @ngdoc service
 * @name blackjackApp.Game
 * @description
 * # Game
 * Service in the blackjackApp.
 */
angular.module('blackjackApp')
    .service('Game', function (User, $rootScope) {
        // Store the Dealer service
        this.dealer = undefined;

        // Game players
        this.players = [];

        // Active game players; default to 1 becouse it contains the dealer
        this.activePlayers = 1;

        // If game is playing
        this.play = false;

        // If game is over
        this.gameover = false;

        // Game highscore
        this.highscore = 0;

        // Return the player from game
        this.getPlayer = function (uid) {
            return this.players[uid];
        };

        // Resets the game to a new one
        this.new = function (players) {
            this.dealer.shuffle();
            this.players = [];
            this.activePlayers = 1;
            this.play = false;
            this.gameover = false;
            this.highscore = 0;
            for (var i = 0; i < players; i++) {
                this.activePlayers++;
                this.players.push(new User(i));
            }
            this.play = true;
            this.dealer.new();
        };

        // Finish the game and set winners
        this.finish = function () {
            this.gameover = true;
            setWinners();
        };

        var game = this;

        // When all players are ready, Dealer should play his hand
        var playersReady = function () {
            if (game.activePlayers === 1 && !game.dealer.ready) {
                game.dealer.play();
            }
        };

        // Set the acctive players count
        var playerFinished = function () {
            game.activePlayers--;
            playersReady();
        };

        // Get highest score
        var getHighScore = function () {
            if (game.highscore !== 0) {
                return game.highscore;
            }
            if (!game.dealer.busted) {
                game.highscore = game.dealer.score();
            }
            for (var uid in game.players) {
                var player = game.players[uid];
                if (!player.busted && player.score() > game.highscore) {
                    game.highscore = player.score();
                }
            }
            return game.highscore;
        };

        // Get the number of players having the same highscore
        var getWinnersCount = function () {
            getHighScore();
            var winners = 0;
            if (game.dealer.score() === game.highscore) {
                winners++;
            }
            for (var uid in game.players) {
                var player = game.players[uid];
                if (!player.busted && player.score() === game.highscore) {
                    winners++;
                }
            }
            return winners;
        };

        // Set the winners
        var setWinners = function() {
            var winners = getWinnersCount();
            var uid, player;
            if (winners === 1) {
                if (game.dealer.score() === game.highscore) {
                    game.dealer.winner = true;
                } else {
                    for (uid in game.players) {
                        player = game.players[uid];
                        if (!player.busted && player.score() === game.highscore) {
                            player.winner = true;
                        }
                    }
                }
            }
            if (winners > 1) {
                if (game.dealer.score() === game.highscore) {
                    game.dealer.tied = true;
                }
                for (uid in game.players) {
                    player = game.players[uid];
                    if (!player.busted && player.score() === game.highscore) {
                        player.tied = true;
                    }
                }
            }
        };

        $rootScope.$on('player-finished', playerFinished);
    });