// Controlador para o modelo User

var User = require('../models/users')

// Devolve a lista de Users
module.exports.list = () => {
    return User
            .find()
            .sort('name')
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getUser = id => {
    return User.findOne({_id:id},{name:1,carrinho:1,historico:1,wishlist:1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getUserByName = nome => {
    return User.findOne({username: nome},{username: 1,name:1,cart:1,history:1,wishlist:1,admin:1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addUser = u => {
    return User.insertMany(u)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


module.exports.updateUser = (id, info) => {
    return User.updateOne({_id:id}, info)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUserCart = (id, carrinho) => {
    return User.updateOne({_id:id}, {cart: carrinho})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUserHistory = (id, historico) => {
    return User.updateOne({_id:id}, {history: historico})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUserWishlist = (id, list) => {
    return User.updateOne({_id:id}, {wishlist: list})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUserStatus = (id, status) => {
    return User.updateOne({_id:id}, {active: status})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUserPassword = (id, pwd) => {
    return User.updateOne({_id:id}, pwd)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteUser = id => {
    return User.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}