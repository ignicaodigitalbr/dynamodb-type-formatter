const expect = require('chai').expect;
const type = require('../../helpers/type');

describe('helper type', () => {
  it('is a object', () => {
    expect(type).to.be.an.object;
  });

  it('has get function', () => {
    expect(type.get).to.be.a.function;
  });

  it('return "array" for Array type', () => {
    expect(type.get(['test1', 'test2'])).to.be.equal('array');
  });

  it('return "object" for Object type', () => {
    expect(type.get({ test: 'test'})).to.be.equal('object');
  });

  it('return "string" for String type', () => {
    expect(type.get('test')).to.be.equal('string');
  });

  it('return "number" for Number type', () => {
    expect(type.get(123)).to.be.equal('number');
  });

  it('return "boolean" for Boolean type', () => {
    expect(type.get(false)).to.be.equal('boolean');
  });
});
