var mongoose = require('mongoose');


var fotoSchema = new mongoose.Schema({
        filename: String,
        image_data: Buffer,
});

var registoSchema = new mongoose.Schema({
        _id: String,
        nome: String,
        marca: String,
        preço: Number,
        tipo: String,
        foto: fotoSchema
});


module.exports = new mongoose.model('registo',treinoSchema);