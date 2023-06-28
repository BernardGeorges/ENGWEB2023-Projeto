var mongoose = require('mongoose');


var produtoSchema = new mongoose.Schema({
        _id: String,
        imagem: String,
        tipo: String,
        modelo: String,
        preco: Number,
        marca: String
});


module.exports = new mongoose.model('produtos',produtoSchema);