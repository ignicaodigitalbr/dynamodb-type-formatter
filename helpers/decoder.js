const _public = {};
const _private = {};

_private.decodeObject = function(data) {
  const decodedData = {};

  for(var key in data.M) {
    decodedData[key] = _public.decode(data.M[key]);
  }

  return decodedData;
}

_private.decoder = {
  array(data) { return data.L.map(item => _public.decode(item)); },
  string(data) { return data.S; },
  number(data) { return parseFloat(data.N); },
  boolean(data) { return data.BOOL; },
  object(data) { return _private.decodeObject(data); },
};

_public.decode = function(data) {
  if (!data) {
    return data;
  }

  if (typeof data.L !== 'undefined') {
    return _private.decoder.array(data);
  }

  if (typeof data.S !== 'undefined') {
    return _private.decoder.string(data);
  }

  if (typeof data.N !== 'undefined') {
    return _private.decoder.number(data);
  }

  if (typeof data.BOOL !== 'undefined') {
    return _private.decoder.boolean(data);
  }

  if (data.M) {
    return _private.decoder.object(data);
  }

  return data;
}

module.exports = _public;
