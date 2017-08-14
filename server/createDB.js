var mongoose = require('server/libs/mongoose');
var async = require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function(err) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('server/models/user');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {

    var users = [
        {first_name: 'Вася', last_name: 'Петров', email: 'vas@aa.com', password: 'supervasya'},
        {first_name: 'Петя', last_name: 'Васильев', email: 'vaspet@dd.com', password: '123'},
        {first_name: 'admin', last_name: 'admin', email: 'admin@admin.com', password: 'thetruehero'}
    ];

    async.each(users, function(userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}