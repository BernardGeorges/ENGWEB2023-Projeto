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
  res.render('contacts', {login: token});
});

router.get('/prod', function(req, res, next) {
  res.render('products', {});
});

router.get('/register', function(req, res, next) {
  res.render('register', {});
});

router.get('/login', function(req, res){
  res.render('loginForm')
})

router.post('/login', function(req, res){
  axios.post('http://localhost:7013/users/login', req.body)
    .then(response => {
      res.cookie('token', response.data.token, {expiresIn: 3600})
      res.redirect('/')
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})

router.post('/register', function(req, res){
  axios.post('http://localhost:7013/users/register', req.body)
    .then(response => {
      console.log(response)
      res.cookie('token', response.data.token, {expiresIn: 3600})
      res.redirect('/')
    })
    .catch(e =>{
      console.log(e)
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})

router.get('/logout', function(req, res){
  const expirationDate = new Date(0);
  res.cookie('token', '', { expiresIn: 0});
  res.redirect('/')
})

module.exports = router;
