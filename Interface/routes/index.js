var express = require('express');
var router = express.Router();
var axios = require('axios');
const { response } = require('../../API/app');

/* GET home page. */
router.get('/', function(req, res, next) {
  var signedin = true
  if(req.cookies != null && req.cookies.token){
    signedin = false
  }
  res.render('home', {login: signedin});
});

router.get('/perfil', function(req, res, next) {  
  axios.get("http://localhost:7013/users/admin?token="+req.cookies.token)
    .then(tipos => {
      console.log(tipos.data.dados.admin)
      if(tipos.data.dados.admin){
        res.render('perfilAdmin',{perfil: tipos.data.dados})
      }else{
        res.render('perfilUser',{perfil: tipos.data.dados})
      }
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro ao obter o user" });
    });
});

router.get('/prod', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  axios.get("http://localhost:7012/tipos")
    .then(tipos => {
      axios.get("http://localhost:7012/produtos")
        .then(produtos => {
          if(req.cookies && req.cookies.perfilUser && req.cookies.token){
            if(req.cookies.perfilUser.admin){
              res.render('productsAdmin', { tipos: tipos.data, produtos: produtos.data, selectedTypes: tipos.data , perfil: req.cookies.perfilUser, login: false});
            }else{
              res.render('productsUser', { tipos: tipos.data, produtos: produtos.data, selectedTypes: tipos.data , perfil: req.cookies.perfilUser, login: false});
            }
          }else{
            res.render('productsUser', { tipos: tipos.data, produtos: produtos.data, selectedTypes: tipos.data, perfil: {}, login: true});
          }
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
          res.render('productsUser', { tipos: tipos.data, produtos: produtos.data, selectedTypes: req.query.selectedTypes.split(","), perfil: req.cookies.perfilUser});
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
          res.render('productsUser', { tipos: tipos.data, produtos: produtos.data, selectedTypes: req.query.selectedTypes.split(","), perfil: req.cookies.perfilUser});
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
          const filteredproducts = response.data;
          res.render('productsUser', { produtos: filteredproducts, tipos: tipos.data, selectedTypes: selectedTypes, perfil: req.cookies.perfilUser});
        })
        .catch(error => {
          res.render('error', { error: error, message: 'Erro ao obter produtos filtrados' });
        });
    })
    .catch(erro => {
      res.render('error', { error: erro, message: "Erro a obter lista de tipos" });
    });
});

router.get('/prod/removeFavorite/:id', function(req, res, next) {
    req.cookies.perfilUser.wishlist.splice(req.cookies.perfilUser.wishlist.indexOf(req.params.id), 1);
    res.cookie('perfilUser',req.cookies.perfilUser)
    axios.put('http://localhost:7013/users/prod/updateUser/'+req.cookies.perfilUser._id+'?token='+req.cookies.token, req.cookies.perfilUser)
    .then(response => {
      res.redirect('/prod');
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Erro ao adicionar o produto aos favoritos"})
    })
});

router.get('/prod/addCart/:id', function(req, res, next) {
  if(req.cookies && req.cookies.token && req.cookies.perfilUser){
    console.log(req.cookies.perfilUser)
    req.cookies.perfilUser.cart.push(req.params.id)
    res.cookie('perfilUser',req.cookies.perfilUser)
    console.log(req.cookies.perfilUser)
    axios.put('http://localhost:7013/users/prod/updateUser/'+req.cookies.perfilUser._id+'?token='+req.cookies.token, req.cookies.perfilUser)
    .then(response => {
      res.redirect('/prod');
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Erro ao adicionar o produto ao carrinho"})
    })
  }else{
    res.redirect('/login');
  }
});

router.get('/prod/addFavorite/:id', function(req, res, next) {
  if(req.cookies && req.cookies.token && req.cookies.perfilUser){
    console.log(req.cookies.perfilUser)
    req.cookies.perfilUser.wishlist.push(req.params.id)
    res.cookie('perfilUser',req.cookies.perfilUser)
    console.log(req.cookies.perfilUser)
    axios.put('http://localhost:7013/users/prod/updateUser/'+req.cookies.perfilUser._id+'?token='+req.cookies.token, req.cookies.perfilUser)
    .then(response => {
      res.redirect('/prod');
    })
    .catch(e =>{
      res.render('error', {error: e, message: "Erro ao adicionar o produto aos favoritos"})
    })
  }else{
    res.redirect('/login');
  }
});

router.get('/contacts', function(req, res, next) {
  var signedin = true
  if(req.cookies && req.cookies.token){
    signedin = false
  }
  res.render('contacts', {login: signedin});
});

router.get('/prod', function(req, res, next) {
  res.render('productsUser', {});
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
      perfilUser = response.data.dados
      res.cookie('perfilUser', response.data.dados, {expires:  new Date(Date.now() + 900000)})
      console.log("user")
      console.log(req.cookies.perfilUser)
      res.cookie('token', response.data.token, {expires:  new Date(Date.now() + 900000)})
      res.redirect('/')
    })
    .catch(e =>{
      console.log(e)
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})

router.post('/register', function(req, res){
  axios.post('http://localhost:7013/users/register', req.body)
    .then(response => {
      res.cookie('perfilUser', response.data.dados, {expires: 3600})
      console.log("user")
      console.log(req.cookies.perfilUser)
      res.cookie('token', response.data.token, {expires: 3600})
      res.redirect('/')
    })
    .catch(e =>{
      console.log(e)
      res.render('error', {error: e, message: "Credenciais inválidas"})
    })
})

router.get('/logout', function(req, res){
  const expirationDate = new Date(0);
  res.clearCookie('token');
  res.clearCookie('perfilUser')
  res.redirect('/')
})

module.exports = router;
