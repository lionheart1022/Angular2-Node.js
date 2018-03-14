const host = 'http://darkwebsuite.ddns.net';
// const host = 'http://wolverine.dynns.com';
const productionURL = `${host}/rest-api/`;
const productionLoginURL = `${host}/`;

const isLocalhost = window.location.href.includes('local');

export const config = {
  url: isLocalhost ? 'http://localhost:8001/rest-api/' : productionURL,
  loginUrl: isLocalhost ? 'http://localhost:8001/' : productionLoginURL,
  username: 'vinculumscientific',
  password: 'Pass1234',
};
