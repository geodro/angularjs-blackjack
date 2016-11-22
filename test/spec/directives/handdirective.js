'use strict';

describe('Directive: HandDirective', function () {

  // load the directive's module
  beforeEach(module('blackjackApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-hand-directive></-hand-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the HandDirective directive');
  }));
});
