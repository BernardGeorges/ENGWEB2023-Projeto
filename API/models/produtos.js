var mongoose = require('mongoose');


var fotoSchema = new mongoose.Schema({
        date: String,
        name: String,
        mimetype: String,
        size: Number
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