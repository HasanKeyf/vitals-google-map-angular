;(function(app) {

	'use strict';

	app.controller('mapController',map);

	map.$inject = ['mapApi', '$scope'];

	function map(mapApi, $scope) {

        $scope.doctors = [];
        $scope.dataLoading=true;
        $scope.filterCities = [];
        $scope.doctor = {};


        // set defaults to Lyndhurst NJ
        $scope.map = { center: { latitude: 40.8103, longitude: -74.1162 }, zoom: 8 };
        // set defualt marker
        $scope.marker = {
            id: 0,
            coords: {
                latitude: 40.8103,
                longitude: -74.1162
            },
            options: { draggable: true}

        };


        $scope.windowOptions = {
            visible: true
        };

        $scope.selectDoctor = function (d) {

            $scope.doctor = d;

            var newLat = d.locations[0].address.latitude;
            var newLong = d.locations[0].address.longitude;
            $scope.map.center= {latitude: newLat , longitude:newLong };
            $scope.map.zoom=15;
            // set defualt marker
            $scope.marker = {
                id: 0,
                coords: {
                    latitude: newLat,
                    longitude: newLong
                }

            };
        }

        mapApi.getDoctors().then(function (doctors) {
           $scope.doctors = doctors.professionals;
            $scope.dataLoading=false;
            $scope.doctor=$scope.doctors[0];

        }, function (err) {
            alert("Something went wrong while data is loading!");
        }).then(function () {
            angular.forEach($scope.doctors, function(doc) {
               $scope.filterCities.push(doc.locations[0].address.city);

            });


        });


	}

})(angular.module('vitals.map'));