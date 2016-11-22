'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blackjackApp
 */
angular.module('blackjackApp')
    .controller('MainCtrl', function ($scope, Game, Dealer) {
        $scope.game = Game;
        $scope.game.dealer = Dealer;
        $scope.on = false;

        // Number of players
        $scope.players = 1;

        // Play a new game
        $scope.play = function () {
            Game.new($scope.players);
            $scope.on = true;
        };

        // Reset to no of players selection
        $scope.reset = function () {
            $scope.on = false;
        };
    });
