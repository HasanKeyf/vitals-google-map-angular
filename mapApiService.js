;(function(app) {

	'use strict';

	app.factory('mapApi',mapApi);

	mapApi.$inject = ['$q', '$http'];

	function mapApi($q, $http) {

    var getDoctors = function () {
     var d = $q.defer();

        $http.get('./search.json').
            success(function(data) {
                d.resolve(data);
            }).
            error(function(data) {
                d.reject(data)
            });

        return d.promise;

    }


    return {
            getDoctors:getDoctors
           }

	}

})(angular.module('vitals.map'));
