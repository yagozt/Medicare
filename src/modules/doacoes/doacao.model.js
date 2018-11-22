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
    status: {
        type: String,
        enum: ['PENDENTE', 'RECUSADO', 'ACEITO', 'CANCELADO'],
        default: 'PENDENTE'
    },
    dataValidacao: Date,
    dataCadastro: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Doacao", DoacaoSchema);