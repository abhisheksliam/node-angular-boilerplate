'use strict';

angular.module('automationApp.scriptor')
	.controller('NewScriptController', ['$rootScope', '$scope','$location', '$state', 'scriptorService',
		function($rootScope, $scope, $location, $state, scriptorService) {

            $scope.taskId = "";
            $scope.copy_sle_id = "";
            scriptorService.taskContent = {};

                scriptorService.getGlobalContext().then(function (res) {
                    $rootScope.globalConstants = res.data;
                });

		}]);
