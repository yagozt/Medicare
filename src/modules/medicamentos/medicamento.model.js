const mongoose = require("mongoose");

var MedicamentoSchema = new mongoose.Schema({
    nomeMedicamento: String
});

module.exports = mongoose.model("Medicamento", MedicamentoSchema);