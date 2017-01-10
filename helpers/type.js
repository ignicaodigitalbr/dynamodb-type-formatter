const _public = {};

_public.get = function(data) {
  if (Array.isArray(data)) {
    return 'array';
  }

  return typeof data;
}

module.exports = _public;