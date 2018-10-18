const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const ApresentacaoSchema = new Schema({
    ggrem: String,
    tamanho: String,
    laboratorio: String,
    complemento: String
})

module.exports = mongoose.model("Apresentacao", ApresentacaoSchema);