var Treino = require('../models/produtos')

// Treino list
module.exports.batismos = () =>{
    return Treino.find({},{'_id':1,'date':1,'title':1,'ref':1})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.getID = id =>{
    return Treino.findOne({_id:id})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.nomes = () => {
    return Treino.collection.find({},{Nome:1}).sort("Nome")
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
  }

module.exports.progenitor = ()=>{
    return Treino.find({},{_id:1,Pai:1,Mae:1})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.getAno = ano =>{
    return Treino.find({Ano: ano})
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

module.exports.bastimosPorAno = () =>{
    return Treino.aggregate([{$group: {_id:"$ano", count: {$sum: 1}}}])
                .then(dados=>{
                    return dados
                }
                )
                .catch(erro=>{
                   return erro
                })
}

