var crypto = require('crypto');
var util = require('util');

var mongoose = require('server/libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    first_name: {
        type: String,
        unique: true,
        required: true
    },
    last_name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });

exports.User = mongoose.model('User', schema);