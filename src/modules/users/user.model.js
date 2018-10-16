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
    firstName: {
        type: String,
        required: [true, 'FirstName is required!'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'LastName is required!'],
        trim: true,
    },
    userName: {
        type: String,
        required: [true, 'UserName is required!'],
        trim: true,
        unique: true,
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
    }
});

UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }
    return next();
});
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
            userName: this.userName,
            token: `Bearer ${this.createToken()}`,
        };
    },
    toJSON() {
        return {
            _id: this._id,
            userName: this.userName,
        };
    }
};
module.exports = mongoose.model('User', UserSchema);