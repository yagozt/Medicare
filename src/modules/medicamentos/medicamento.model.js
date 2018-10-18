const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const MedicamentoSchema = new Schema({
    nome: String,
    tarja: String,
    principioAtivo: String
})

module.exports = mongoose.model("Medicamento", MedicamentoSchema);