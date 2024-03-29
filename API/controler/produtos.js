var Produto = require('../models/produtos')



// Shop list
module.exports.list = () => {
    return Produto.find().sort("preco")
        .then(resposta => {
            return resposta;
        })
        .catch(erro => {
            return erro;
        });
};

module.exports.listUser = () => {
    return Produto.find({ stock: { $gt: 0 } }).sort("preco")
        .then(resposta => {
            return resposta;
        })
        .catch(erro => {
            return erro;
        });
};


module.exports.getProduto = id => {
    return Produto.findOne({ _id: id })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getMarca = marca => {
    return Produto.find({ marca: marca })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getTipo = tipo => {
    return Produto.find({ tipo: tipo })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.filterID = function (ids) {
    return Produto.find({ _id: { $in: ids } })
        .sort('preco')
        .then(resposta => {
            return resposta;
        })
        .catch(erro => {
            return erro;
        });
};



module.exports.marcas = () => {
    return Produto.distinct("marca")
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.tipos = () => {
    return Produto.distinct("tipo")
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.filter = function (tipos) {
    return Produto.find({ tipo: { $in: tipos } })
        .sort('preco')
        .then(resposta => {
            return resposta;
        })
        .catch(erro => {
            return erro;
        });
};

module.exports.filterUser = function (tipos) {
    return Produto.find({ tipo: { $in: tipos }, stock: { $gt: 0 } })
        .sort('preco')
        .then(resposta => {
            return resposta;
        })
        .catch(erro => {
            return erro;
        });
};

module.exports.addProduto = l => {
    return Produto.create(l)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateProduto = (id,l) => {
    return Produto.updateOne({ _id: id }, l)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}


module.exports.deleteProduto = id => {
    console.log(id)
    return Produto.deleteOne({ _id: id })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.categorias = () => {
    return Produto.distinct("produtos.categoria")
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.prodsByCateg = (id) => {
    return Produto.aggregate([{ $unwind: "$produtos" }, { $match: { "produtos.categoria": id } }, { $project: { "produtos.designacao": 1, _id: 0 } }])
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}


module.exports.updateStockByIds = (ids, stockList) => {
    const updates = ids.map((id, index) => {
      const newStock = stockList[index];
      return { _id: id, $inc: { stock: -newStock } };
    });
    

    const promises = updates.map((update) => {
      console.log(update)
      const { _id, $inc } = update;
      return Produto.updateOne({ _id }, { $inc })
      .then(resposta => {
        console.log(resposta)
        return resposta
    })
    .catch(erro => {
        console.log(resposta)
        return erro
    })
    });
  
    return Promise.all(promises)
      .then(() => {
        console.log('Atualização concluída');
        return true;
      })
      .catch((error) => {
        console.error('Erro:', error);
        return false;
      });
  };


