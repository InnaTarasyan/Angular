var mongoose = require('mongoose');
var config = require('server/config');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

module.exports = mongoose;