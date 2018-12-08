const mongoose = require('mongoose'),
schema = mongoose.Schema;

const MedicamentoComercialSchema = new mongoose.Schema({
    nome: { 
        type: String,
        required: true
    },
    medicamento: {
        type: schema.Types.ObjectId,
        ref: 'Medicamento'
    },
});

module.exports = mongoose.model('MedicamentoComercial', MedicamentoComercialSchema, 'MedicamentosComercial');