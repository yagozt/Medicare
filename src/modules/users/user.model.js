const mongoose = require('mongoose'),
Schema = mongoose.Schema,
validator = require('validator'),
hashSync = require('bcrypt-nodejs').hashSync,
compareSync = require('bcrypt-nodejs').compareSync,
passwordReg = require('./user.validations').passwordReg;

const jwt = require('jsonwebtoken'),
constants = require('../../config/constants');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required!'],
        trim: true,
        validate: {
            validator(email) {
                return validator.isEmail(email);
            },
            message: '{VALUE} is not a valid email!',
        },
    },
    nome: {
        type: String,
        required: [true, 'FirstName is required!'],
        trim: true,
    },
    nomeMae: {
        type: String,
        required: [true, 'LastName is required!'],
        trim: true,
    },
    dataNascimento: {
        type: Date,
        required: [true, 'Data de nascimento é necessário!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minlength: [6, 'Password need to be longer!'],
        validate: {
            validator(password) {
                return passwordReg.test(password);
            },
            message: '{VALUE} is not a valid password!',
        },
    },
    rg: {
        type: String,
        trim: true
    },
    endereco: {
        type: String
    },
    tipo: {
        type: String,
        enum: ['CLIENTE', 'FARMACEUTICO', 'ADMIN'],
        required: [true, 'Tipo do usuário é obrigatório']
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }
    return next();
});

UserSchema.statics = {
    createUsuario(args) {
        if(!isNaN(args.tipo)) {
            const values = UserSchema.path('tipo').enumValues;
            args.tipo = values[args.tipo];
        }
        return this.create(args);
    }
}
UserSchema.methods = {
    _hashPassword(password) {
        return hashSync(password);
    },
    authenticateUser(password) {
        return compareSync(password, this.password);
    },

    createToken() {
        return jwt.sign({
            _id: this._id,
        },
        constants.JWT_SECRET,
        );
    },
    toAuthJSON() {
        return {
            _id: this._id,
            email: this.email,
            token: `Bearer ${this.createToken()}`,
            tipo: this.tipo,
        };
    },
    toJSON() {
        return {
            _id: this._id,
            email: this.email,
            tipo: this.tipo,
            dataCadastro: this.dataCadastro
        };
    }
};
module.exports = mongoose.model('User', UserSchema);