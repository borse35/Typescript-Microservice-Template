const { assert, expect, should } = require('chai');
should();

describe('Assertion examples', function () {
  it('Addition should work', () => {
    assert.deepEqual(3 + 3, 5);
  });

  it ('toLowerCase should work', () => {
    expect('Abc'.toLowerCase()).to.be.equals('abc');
  });

  it('Array length should match', () => {
    Array(4).should.have.lengthOf(4);
  });
});