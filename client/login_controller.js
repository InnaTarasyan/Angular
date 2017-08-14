
var app = angular.module('myApp', []);
var socket = io.connect( 'http://localhost:8081' );


app.controller('validateCtrl', ['$scope', '$document', function($scope, $document) {

    $scope.onFormSubmit = function () {
        var inputs = $document[0].querySelectorAll('#myForm input');
        var data = {};
        inputs.forEach(function(input) {
            data[input.name] = input.value;
        });

        socket.emit('login', data, function(data) {
            // console.log(data);
        });
    };

}]);
