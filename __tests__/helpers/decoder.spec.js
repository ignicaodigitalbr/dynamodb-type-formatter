const expect = require('chai').expect;
const decoder = require('../../helpers/decoder');

describe('helper decoder', () => {
  it('is a object', () => {
    expect(decoder).to.be.an.object;
  });

  it('has decode function', () => {
    expect(decoder.decode).to.be.a.function;
  });

  it('return decoded string', () => {
    expect(decoder.decode({ S: 'test' })).to.be.deep.equal('test');
  });

  it('return decoded number', () => {
    expect(decoder.decode({ N: '123' })).to.be.deep.equal(123);
  });

  it('return decoded boolean', () => {
    expect(decoder.decode({ BOOL: false })).to.be.deep.equal(false);
  });

  it('return decoded simple array', () => {
    expect(decoder.decode({
        L: [
          { S: 'test1' },
          { S: 'test2' }
        ]}))
      .to.be.deep.equal(['test1', 'test2']);
  });

  it('return decoded complex array', () => {
    expect(decoder.decode({
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
    }))
      .to.be.deep.equal([{ key1: 'test1'}, { key2: 'test2'}]);
  });

  it('return decoded simple object', () => {
    expect(decoder.decode({
        M: {
          key1: { S: 'test1' },
          key2: { S: 'test2' }
        }
      }))
      .to.be.deep.equal({ key1: 'test1', key2: 'test2'});
  });

  it('return decoded complex object', () => {
    expect(decoder.decode({
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
    }))
      .to.be.deep.equal({
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
    });
  });

  it('return undefined if the data param value is undefined', () => {
    expect(decoder.decode(undefined)).to.be.undefined;
  });

  it('return data param value if the type is not recognized', () => {
    const subject = { O: { key: 'value' }};
    expect(decoder.decode(subject)).to.be.equal(subject);
  });
});
