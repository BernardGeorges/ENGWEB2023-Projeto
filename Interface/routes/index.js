var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  var token = true
  if(req.cookies && req.cookies.token)
    token = false
  res.render('home', {login: token});
});

router.get('/contacts', function(req, res, next) {
  res.render('contacts', {});
});

router.get('/services', function(req, res, next) {
  res.render('contacts', {});
});

router.get('/prod', function(req, res, next) {
  res.render('contacts', {});
});

router.get('/login', function(req, res){
  res.render('loginForm')
})

router.post('/login', function(req, res){
  axios.post('http://localhost:7013/users/login', req.body)
    .then(response => {
      res.cookie('token', response.data.token)
      res.redirect('/')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})

module.exports = router;
