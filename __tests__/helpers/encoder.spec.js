const expect = require('chai').expect;
const encoder = require('../../helpers/encoder');

describe('helper encoder', () => {
  it('is a object', () => {
    expect(encoder).to.be.an.object;
  });

  it('has encode function', () => {
    expect(encoder.encode).to.be.a.function;
  });

  it('return encoded string', () => {
    expect(encoder.encode('test')).to.be.deep.equal({ S: 'test' });
  });

  it('return encoded number', () => {
    expect(encoder.encode(123)).to.be.deep.equal({ N: '123' });
  });

  it('return encoded boolean', () => {
    expect(encoder.encode(false)).to.be.deep.equal({ BOOL: false });
  });

  it('return encoded simple array', () => {
    expect(encoder.encode(['test1', 'test2']))
      .to.be.deep.equal({
        L: [
          { S: 'test1' },
          { S: 'test2' }
        ]});
  });

  it('return encoded complex array', () => {
    expect(encoder.encode([{ key1: 'test1'}, { key2: 'test2'}]))
      .to.be.deep.equal({
        L: [{
          M: {
            key1: { S: 'test1' }
          }
        }, {
          M: {
            key2: { S: 'test2' }
          }
        }
      ]
    });
  });

  it('return encoded simple object', () => {
    expect(encoder.encode({ key1: 'test1', key2: 'test2'}))
      .to.be.deep.equal({
        M: {
          key1: { S: 'test1' },
          key2: { S: 'test2' }
        }
      });
  });

  it('return encoded complex object', () => {
    expect(encoder.encode({
      key1: {
        str: 'test1',
        bool: false,
        num: 123,
      },
      key2: {
        str: 'test2',
        bool: true,
        num: 321,
      }
    }))
      .to.be.deep.equal({
        M: {
          key1: {
            M: {
              str: { S: 'test1' },
              bool: { BOOL: false },
              num: { N: '123' },
            }
          },
          key2: {
            M: {
              str: { S: 'test2' },
              bool: { BOOL: true },
              num: { N: '321' },
            }
          }
        }
    });
  });

  it('return data param value if the type is not recognized', () => {
    expect(encoder.encode(undefined)).to.be.undefined;
  });
});
