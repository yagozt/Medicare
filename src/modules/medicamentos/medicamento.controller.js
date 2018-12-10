const Medicamento = require('./medicamento.model');
const MedicamentoComercial = require('./medicamentoComercial.model');
const HTTPStatus = require('http-status');

module.exports = {
    async cadastrar(req, res) {
        try {
            const medicamento = await Medicamento.create(req.body);
            return res.status(HTTPStatus.OK).json(medicamento);
        }
        catch (error) {
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },

    async cadastrarComercial(req, res) {
        try {
            const medicamentoApresentacao = await MedicamentoComercial.create(req.body);
            return res.status(HTTPStatus.OK).json(medicamentoApresentacao);
        } catch (error) {
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },

    async listarTodos(req, res) {
        try {
            const medicamentos = await Medicamento.find({});
            return res.status(HTTPStatus.OK).json(medicamentos);
        } catch (error) {
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },

    async listarMedicamentosComercial(req, res) {
        try {
            const medicamentos = await MedicamentoComercial.find({}).populate('medicamento', 'nomeMedicamento');
            return res.status(HTTPStatus.OK).json(medicamentos);
        } catch (error) {
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },

    async atualizarSituacaoMedicamento(req, res) {
        try {
            const medicamento = await Medicamento.findByIdAndUpdate(req.params.id, { status: req.body.status, dataValidacao: Date.now() }, { runValidators: true });
            if (!medicamento) {
                return res.sendStatus(HTTPStatus.NOT_FOUND);
            }

            res.status(HTTPStatus.OK).json(medicamento);
        } catch (error) {
            console.log(error);
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },

    async remover(req, res) {
        try {
            const medicamento = await Medicamento.findById(req.params.id);
            if (!medicamento._id.equals(req.user._id)) {
                return res.sendStatus(HTTPStatus.UNAUTHORIZED);
            }
            medicamento.remove();

            return res.sendStatus(HTTPStatus.NO_CONTENT);
        } catch (error) {
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },
}