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

module.exports.updateProduto = l => {
    return Produto.updateOne({ _id: l._id }, l)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateStockById = (id, newStock) => {
    return Produto.updateOne({ _id: id }, { $set: { stock: newStock } })
        .then(resposta => {
            return resposta;
        })
        .catch(erro => {
            return erro;
        });
};

module.exports.deleteProduto = id => {
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

module.exports.addProduto = (id, prod) => {
    return Produto.updateOne({ _id: id },
        { $push: { "produtos": prod } })
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
    
      return Produto.updateMany({ $or: updates })
        .then(() => {
          console.log('Atualização concluída');
          return true;
        })
        .catch((error) => {
          console.error('Erro:', error);
          return false;
        });
    };


module.exports.deleteProduto = (id, prod) => {
    return Produto.updateOne({ "_id": id },
        { $pull: { "produtos": { _id: prod } } })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}