var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var passport = require('passport')
var userModel = require('../models/users')
var auth = require('../auth/auth')

var User = require('../controllers/users')

router.get('/', auth.verificaAcesso, function(req, res){
  User.list()
    .then(dados => res.status(200).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

router.get('/admin', function(req, res){
  var myToken = req.query.token || req.body.token
  if(myToken){
    jwt.verify(myToken, "EWProjeto2023", function(e, payload){
      if(e){
        res.status(401).jsonp({error: e})
      }
      else{
        User.getUserByName(payload.username)
            .then(dados => res.status(200).jsonp({dados: dados}))
            .catch(e => res.status(500).jsonp({error: e}))
      }
    })
  }
  else{
    res.status(401).jsonp({error: "Token inexistente!"})
  }
})

router.get('/perfil', auth.verificaAcesso, function(req, res){
  User.getUserWishList(req.params.id)
    .then(dados => res.status(200).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

router.get('/:id', auth.verificaAcesso, function(req, res){
  User.getUser(req.params.id)
    .then(dados => res.status(200).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

router.post('/', auth.verificaAcesso, function(req, res){
  User.addUser(req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

router.post('/register', function(req, res) {
  var user = new userModel({username: req.body.username, name: req.body.name,active: true,admin: false,dateCreated: d })
  var d = new Date().toISOString().substring(0,19)
  userModel.register(user, 
                req.body.password, 
                function(err, user) {
                  if (err) 
                    res.jsonp({error: err, message: "Register error: " + err})
                  else{
                    passport.authenticate("local")(req,res,function(){
                      jwt.sign({ username: req.user.username, 
                        sub: 'Projeto de EngWeb2023'}, 
                        "EWProjeto2023",
                        {expiresIn: 36000},
                        function(e, token) {
                          if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
                          else User.getUserByName(req.user.username)
                                   .then(dados => res.status(201).jsonp({token: token, dados: dados}))
                                   .catch(e => res.status(500).jsonp({error: e})) 
                        });
                    })
                  }     
  })   
})
  
router.post('/login', passport.authenticate('local'), function(req, res){
  jwt.sign({ username: req.user.username, sub: 'Projeto de EngWeb2023'}, 
    "EWProjeto2023",
    {expiresIn: 36000},
    function(e, token) {
      if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e}) 
      else User.getUserByName(req.user.username)
      .then(dados => res.status(201).jsonp({token: token, dados: dados}))
      .catch(e => res.status(500).jsonp({error: e})) 
});
})

router.put('/prod/updateUser/:id', auth.verificaAcesso, function(req, res) {
  User.updateUser(req.params.id, req.body)
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(erro => {
      res.status(404).jsonp({error: erro, message: "Erro na alteração do utilizador"})
    })
})

router.put('/:id/desativar', auth.verificaAcesso, function(req, res) {
  User.updateUserStatus(req.params.id, false)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})

router.put('/:id/ativar', auth.verificaAcesso, function(req, res) {
  User.updateUserStatus(req.params.id, true)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})

router.put('/:id/password', auth.verificaAcesso, function(req, res) {
  User.updateUserPassword(req.params.id, req.body)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do utilizador"})
    })
})

router.delete('/:id', auth.verificaAcesso, function(req, res) {
  User.deleteUser(req.params.id)
    .then(dados => {
      res.jsonp(dados)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na remoção do utilizador"})
    })
})

module.exports = router;