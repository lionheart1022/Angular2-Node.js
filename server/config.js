const host = 'http://darkwebsuite.ddns.net/';
// const host = 'http://wolverine.dynns.com/';
const config = {
  server: process.env.SERVER || host
}
exports.get = function get(env) {
 return config[env] || config.default;
}
