const type = require('./type');

const _public = {};
const _private = {};

_private.encodeObject = function(data) {
  const encodedData = {};

  for(var key in data) {
    encodedData[key] = _public.encode(data[key]);
  }

  return encodedData;
}

_private.encoder = {
  array(data) { return { L: data.map(item => _public.encode(item)) }; },
  string(data) { return { S: data }; },
  number(data) { return { N: data.toString() }; },
  boolean(data) { return { BOOL: data }; },
  object(data) { return { M: _private.encodeObject(data) }; },
};

_public.encode = function(data) {
  const dataType = type.get(data);

  if (_private.encoder[dataType]) {
    return _private.encoder[dataType](data);
  }

  return data;
}

module.exports = _public;
