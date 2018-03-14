const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const parseUrlencoded = bodyParser.urlencoded({extended: false});
const unirest = require("unirest");
const config = require('./../config.js');
const server = config.get('server');
router.use(bodyParser.json());
router.use(cookieParser());

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, GET, HEAD, POST, PUT, OPTIONS, TRACE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie, JSESSIONID");
  next();
});

router
  .post('/login', parseUrlencoded, (req, res) => {
    const login = unirest("POST", server + "login");
    login.query({
      "username": req.query.username,
      "password": req.query.password
    });
    const CookieJar = unirest.jar();
    login.end((loginRes) => {
      CookieJar.add(unirest.cookie('JSESSIONID=' + loginRes.cookies.JSESSIONID));
      const reqVal = unirest("GET", server + "validate")
        .headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cookie': 'JSESSIONID=' + loginRes.cookies.JSESSIONID
        });
      reqVal.end((resVal) => {
        console.log(resVal);
        res.statusCode = resVal.statusCode;
        try {
          let bodyObject = JSON.parse(resVal.raw_body);
          bodyObject.JSESSIONID = loginRes.cookies.JSESSIONID;
          res.json(bodyObject);
        } catch (err) {
          console.error(err);
          throw new Error(err);
        }
      });
    });
  })
  .options('*', (req, res) => {
    res.send();
  })
  .all('*', parseUrlencoded, (req, res) => {
    const route = unirest(req.method, server + req.originalUrl)
      .headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': 'JSESSIONID=' + req.headers.jsessionid
      });
    route.query(req.query);
    if (['POST', 'PUT', 'PATCH'].indexOf(req.method) > -1) {
      route.send(req.body);
    }
    route.end((routeRes) => {
      res.statusCode = routeRes.statusCode;
      res.send(routeRes.raw_body);
    });
  });

module.exports = router;




