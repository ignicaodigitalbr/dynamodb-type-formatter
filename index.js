const encoder = require('./helpers/encoder');
const decoder = require('./helpers/decoder');

const _public = {};

_public.encode = encoder.encode;
_public.decode = decoder.decode;

module.exports = _public;
