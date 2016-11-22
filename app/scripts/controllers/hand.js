'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:HandCtrl
 * @description
 * # HandCtrl
 * Controller of the blackjackApp
 */
angular.module('blackjackApp')
    .controller('HandCtrl', function (Dealer, $scope) {
        $scope.errorMessage = false;
        $scope.dealer = false;

        // if no player is passed from scope this means that the hand is from Dealer, and it will play itself
        if ($scope.player === undefined) {
            $scope.dealer = true;
            $scope.player = Dealer;
        }

        // Deal 2 cards for begin
        Dealer.deal(2, $scope.player.id);

        // If is player we set that the player is playing and calculate the score
        if (!$scope.dealer) {
            $scope.player.isPlaying();
            $scope.player.score();
        }

        // Ask a new card from Dealer
        $scope.hit = function () {
            Dealer.deal(1, $scope.player.id);
            $scope.player.score();
        };

        // The player will stand
        $scope.stand = function () {
            $scope.player.willStand();
        };
    });
