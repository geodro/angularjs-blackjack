'use strict';

describe('Service: Dealer', function () {

  // load the service's module
  beforeEach(module('blackjackApp'));

  // instantiate service
  var Dealer;
  beforeEach(inject(function (_Dealer_) {
    Dealer = _Dealer_;
  }));

  it('should do something', function () {
    expect(!!Dealer).toBe(true);
  });

});
