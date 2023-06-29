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

router.get('/prod', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);

  axios.get("http://localhost:7012/tipos")
    .then(tipos => {
      axios.get("http://localhost:7012/produtos")
        .then(produtos => {
          res.render('products', { tipos: tipos.data, produtos: produtos.data, selectedTypes: []});
        })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro a obter lista de produtos" });
        });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro a obter lista de tipos" });
    });
});


router.get('/prod/precobaixo', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  axios.get("http://localhost:7012/tipos")
    .then(tipos => {
      axios.get("http://localhost:7012/precobaixo?tipos="+req.query.selectedTypes)
        .then(produtos => {
          res.render('products', { tipos: tipos.data, produtos: produtos.data, selectedTypes: req.query.selectedTypes.split(",") });
        })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro a obter lista de produtos" });
        });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro a obter lista de tipos" });
    });
});

router.get('/prod/precoalto', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);

  axios.get("http://localhost:7012/tipos")
    .then(tipos => {
      axios.get("http://localhost:7012/precoalto?tipos="+req.query.selectedTypes)
        .then(produtos => {
          res.render('products', { tipos: tipos.data, produtos: produtos.data, selectedTypes: req.query.selectedTypes.split(",") });
        })
        .catch(erro => {
          res.render('error', { error: erro, message: "Erro a obter lista de produtos" });
        });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro a obter lista de tipos" });
    });
});

router.post('/prod/filter', function(req, res, next) {
  const selectedTypes = Object.keys(req.body);
  const apiUrl = 'http://localhost:7012/prod/filter';

  axios.get("http://localhost:7012/tipos")
    .then(tipos => {  
      axios.post(apiUrl, { tipos: selectedTypes })
        .then(response => {
          const filteredProducts = response.data;
          res.render('products', { produtos: filteredProducts, tipos: tipos.data, selectedTypes: selectedTypes });
        })
        .catch(error => {
          res.render('error', { error: error, message: 'Erro ao obter produtos filtrados' });
        });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro a obter lista de tipos" });
    });
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

router.post('/add/form', function(req, res, next) {
  const tipo = req.body.tipo;
  const preco = req.body.preco;
  const marca = req.body.marca;

  console.log(tipo)
  console.log(preco)
  console.log(marca)

  res.send('Formulário recebido com sucesso!');
});

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
