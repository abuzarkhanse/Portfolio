const crypto = require('crypto');
const qs = require('qs');

exports.generateSignature = (data) => {
  const sorted = qs.stringify(data, { encode: false, format: 'RFC1738' });
  const signature = crypto.createHash('md5').update(sorted).digest('hex');
  return signature;
};