const mongoose = require('mongoose');

var DoacaoSchema = new mongoose.Schema({
    dataDoacao: {
        type: Date,
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

DoacaoSchema.statics = {
    list({ skip = 0, limit = 5} = {}) {
        return this.find()
    },
    createDoacao(args, user) {
        return this.create({
            ...args,
            user
        })
    }
}

module.exports = mongoose.model("Doacao", DoacaoSchema);