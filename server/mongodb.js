var mongoose = require('server/libs/mongoose');
var async = require('async');


async.series([
    open,
    requireModels
], function(err) {
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function requireModels(callback) {
    require('server/models/user');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

exports.createUser = function(user, callback) {
    var users = [
        {first_name: user['first_name'], last_name: user['last_name'], email: user['email'], password: user['password']}
    ];

    async.each(users, function(userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
};
