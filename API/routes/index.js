var express = require('express');
var router = express.Router();
var Produto = require('../controler/produtos')

/* GET home page. */
router.get('/precobaixo', function(req, res, next) {  
    Produto.filterUser(req.query.tipos.split(","))
    .then(Produtos=>{
      res.json(Produtos)
    })
    .catch(erro=>{
      res.status(601).json({ message: "Erro a obter lista de Produtos",error:erro })
    })
});

router.get('/precoalto', function(req, res, next) {
  Produto.filter(req.query.tipos.split(","))
  .then(Produtos => {
      const ProdutosOrdenados = Produtos.reverse();
      res.json(ProdutosOrdenados);
    })
    .catch(erro => {
      res.status(601).json({ message: "Erro a obter lista de Produtos", error: erro });
    });
});


router.get('/produtos', function(req, res, next) {
  if(req.query.marca){
  Produto.getMarca(req.query.marca)
    .then(Produto=>{
      res.status(201).json(Produto)
    })
    .catch(erro=>{
      res.status(603).json({ message: "Erro a adicionar Produto",error:erro })
    })
  }
  else if(req.query.tipo){
    Produto.getTipo(req.query.tipo)
      .then(Produto=>{
        res.status(201).json(Produto)
      })
      .catch(erro=>{
        res.status(603).json({ message: "Erro a adicionar Produto",error:erro })
      })
  }
  else{
    Produto.list()
    .then(Produtos=>{
      res.json(Produtos)
    })
    .catch(erro=>{
      res.status(601).json({ message: "Erro a obter lista de Produtos",error:erro })
    })
  }
});

router.get('/marcas', function(req, res, next) {
  Produto.marcas()
  .then(Produtos=>{
    res.json(Produtos)
  })
  .catch(erro=>{
    res.status(601).json({ message: "Erro a obter lista de Produtos",error:erro })
  })
});

router.get('/tipos', function(req, res, next) {
  Produto.tipos()
  .then(Produtos=>{
    res.json(Produtos)
  })
  .catch(erro=>{
    res.status(601).json({ message: "Erro a obter lista de Produtos",error:erro })
  })
});

router.post('/prod/filter', function(req, res, next) {
  Produto.filter(req.body.tipos)
  .then(Produtos=>{
    res.json(Produtos)
  })
  .catch(erro=>{
    res.status(601).json({ message: "Erro a obter lista de Produtos",error:erro })
  })
});

router.put('/prod/checkout', function(req, res, next) {
  Produto.updateStockByIds(req.body.id, req.body.quant)
  .then(Produtos=>{
    res.json(Produtos)
  })
  .catch(erro=>{
    res.status(601).json({ message: "Erro a obter lista de Produtos",error:erro })
  })
});

router.post('/wishlist', function(req, res, next) {
  console.log(req.body)
  Produto.filterID(req.body)
  .then(Produtos=>{
    res.json(Produtos)
  })
  .catch(erro=>{
    res.status(601).json({ message: "Erro a obter lista de Produtos",error:erro })
  })
});


router.get('/:id', function(req, res, next) {
  Produto.getID(req.params.id)
    .then(Produto=>{
      res.json(Produto)
    })
    .catch(erro=>{
      res.status(602).json({ message: "Erro a obter Produto",error:erro })
    })
});



module.exports = router;
