const mongoose = require("mongoose"),
Schema = mongoose.Schema;

const PedidoSchema = new Schema({
    nomeRemedio: String,
    tamanho: Number,
    quantidade: Number,
    nomeMedico: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    },
    dataValidacao: Date,
    status: {
        type: String,
        enum: ['PENDENTE', 'RECUSADO', 'ACEITO', 'ENTREGUE', 'CANCELADO'],
        default: 'PENDENTE'
    }
});

PedidoSchema.statics = {
    list({ skip = 0, limit = 5} = {}) {
        return this.find()
    },
    createPedido(args, user) {
        return this.create({
            ...args,
            user
        })
    }
}

module.exports = mongoose.model("Pedido", PedidoSchema);