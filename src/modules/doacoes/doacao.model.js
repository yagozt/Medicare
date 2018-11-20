const mongoose = require('mongoose');

var DoacaoSchema = new mongoose.Schema({
    dataDoacao: {
        type: Date,
        default: Date.now(),
    },
    quantidade: Number,
    dataValidade: {
        type: Date,
        required: true,
    },
    nomeMedicamento: {
        type: String,
        required: true,
    },
    tamanho: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Doacao", DoacaoSchema);