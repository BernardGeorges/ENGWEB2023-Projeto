var express = require('express');
var router = express.Router();
var Treino = require('../controler/produtos')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.query.ano){
    Treino.getAno(req.query.ano)
    .then(treinos=>{
      res.json(treinos)
    })
    .catch(erro=>{
      res.status(601).json({ message: "Erro a obter lista de treinos",error:erro })
    })
  }else{
    Treino.bastimos()
    .then(treinos=>{
      res.json(treinos)
    })
    .catch(erro=>{
      res.status(601).json({ message: "Erro a obter lista de treinos",error:erro })
    })
  }
});

router.get('/api/batismos/:id', function(req, res, next) {
  Treino.getID(req.params.id)
    .then(treino=>{
      res.json(treino)
    })
    .catch(erro=>{
      res.status(602).json({ message: "Erro a obter treino",error:erro })
    })
});

router.get('/api/batismos/batisado', function(req, res, next) {
  Treino.nomes()
    .then(treino=>{
      res.status(201).json(treino)
    })
    .catch(erro=>{
      res.status(603).json({ message: "Erro a adicionar treino",error:erro })
    })
});

router.get('/api/batismos/progenitores', function(req, res, next) {
  Treino.progenitor()
    .then(treino=>{
      res.json(treino)
    })
    .catch(erro=>{
      res.status(604).json({ message: "Erro a atualizar treino",error:erro })
    })
});

router.get('/api/batismos/stats', function(req, res, next) {
  Treino.bastimosPorAno()
    .then(treino=>{
      res.json(treino)
    })
    .catch(erro=>{
      res.status(605).json({ message: "Erro a eliminar treino",error:erro })
    })
});

module.exports = router;
