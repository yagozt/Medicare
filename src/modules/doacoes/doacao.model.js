const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const DoacaoSchema = new Schema({
    dataDoacao: {
        type: Date,
        default: Date.now
    },
    medicamento: {
        type: Schema.Types.ObjectId,
        ref: "Medicamento",
    },
    quantidade: Number,
    dataValidade: {
        type: Date,
        required: [true, "Data de validade é obrigatório."]
    }
});

module.exports = mongoose.model("Doacao", DoacaoSchema);