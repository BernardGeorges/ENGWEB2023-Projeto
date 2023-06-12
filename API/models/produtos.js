var mongoose = require('mongoose');


var fotoSchema = new mongoose.Schema({
        filename: String,
        filepath: String,
});

var produtoSchema = new mongoose.Schema({
        _id: String,
        nome: String,
        marca: String,
        preço: Number,
        tipo: String,
        foto: fotoSchema
});


module.exports = new mongoose.model('produtos',produtoSchema);