const expect = require('chai').expect;
const index = require('../index');

describe('index', () => {
  it('is a object', () => {
    expect(index).to.be.an.object;
  });

  it('has encode function', () => {
    expect(index.encode).to.be.a.function;
  });

  it('has decode function', () => {
    expect(index.decode).to.be.a.function;
  });
});
