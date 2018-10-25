const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const DoacaoSchema = new Schema({
    dataDoacao: {
        type: Date,
        default: Date.now
    },
    nomeMedicamento: {
        type: String
    },
    tarja: String,
    quantidade: Number,
    dataValidade: {
        type: Date,
        required: [true, "Data de validade é obrigatório."]
    }
});

module.exports = mongoose.model("Doacao", DoacaoSchema);