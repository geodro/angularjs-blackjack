'use strict';

/**
 * @ngdoc directive
 * @name blackjackApp.directive:HandDirective
 * @description
 * # HandDirective
 */
angular.module('blackjackApp')
    .directive('hand', function () {
        return {
            templateUrl: 'views/directive/hand.html',
            restrict: 'E',
            controller: 'HandCtrl'
        };
    });
