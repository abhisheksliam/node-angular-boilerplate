/**
 * Created by Shipra
 */
'use strict';

angular.module('automationApp.scriptor')
.factory('scriptorService', ['$rootScope', '$filter' , '$http', '$q', function($rootScope, $filter, $http, $q) {

        /***************** APIs ********************/

        var getGlobalContext = function() {
            var globalContext = $http.get('data/global_constants.json');

            var deferred = $q.defer();
            deferred.resolve(globalContext);
            return deferred.promise;
        }

        var getTaskJson = function(friendlyTaskId) {
            var taskData = $http.get('/api/tasks/' + friendlyTaskId);
            var deferred = $q.defer();
            deferred.resolve(taskData);
            return deferred.promise;
        };

        var getTriggers = function() {
            var triggers = $http.get('data/action_lib.json');

            var deferred = $q.defer();
            deferred.resolve(triggers);
            return deferred.promise;
        }

        var getTriggerSuggestions = function() {
            var triggerSuggestion = $http.get('data/trigger_suggestions.json');

            var deferred = $q.defer();
            deferred.resolve(triggerSuggestion);
            return deferred.promise;
        }

        var getTriggerForID = function(id) {
            var dest = {};
            var source = $filter('filter')($rootScope.triggers, {id:id})[0];
            angular.copy(source, dest);
            return dest;
        }

        var getKeyNameSuggestions = function() {
            return $rootScope.TriggerSuggestions.keyboardActions;
        }

        var getElementNameSuggestions = function() {
            return $rootScope.xpathArrayList;
        }


        var getXPathForElement = function(elementName) {
            var xpath = '';

            $rootScope.xpathList.data.forEach(function (item) {
                if(item.xpath.key === elementName) {
                    xpath = item.xpath.value;
                }
            });
            return xpath;
        }

        var saveTaskScript = function(app_key, scenario, task_id, copy_sle_id, template, username) {
            var saveTask = $http.post('/api/tasks/', {
                "app_key": app_key,
                "scenario": scenario,
                "task_id": task_id,
                "copy_sle_id": copy_sle_id,
                "template": template,
                "modified_by" : {
                                "name" : username
                            }
            });

            var deferred = $q.defer();
            deferred.resolve(saveTask);
            return deferred.promise;
        };

        var updateTaskScript = function(app_key, scenario, task_id, copy_sle_id, template, username) {
            var updateTask = $http.put('/api/tasks/', {
                "app_key" : app_key,
                "scenario" : scenario,
                "task_id" : task_id,
                "template" : template,
                "copy_sle_id": copy_sle_id,
                "modified_by" : {
                    "name" : username
                }
            });

            var deferred = $q.defer();
            deferred.resolve(updateTask);
            return deferred.promise;
        }

        var updateTaskJson = function(sle_id, task_json , username) {
            var updateTask = $http.put('/api/tasks/' + sle_id, {
                "task_json" : task_json,
                "modified_by" : {
                    "name" : username
                }
            });

            var deferred = $q.defer();
            deferred.resolve(updateTask);
            return deferred.promise;
        };

        var saveXpath = function(key, value, taskid, app_type) {
            var saveTask = $http.post('/api/xpaths/', {
                app_type: app_type,
                tags: [taskid],
                xpath: {
                    key: key,
                    value: value
                }
            });

            var deferred = $q.defer();
            deferred.resolve(saveTask);
            return deferred.promise;
        };

        var getApplicationXpathList = function(appType) {
            var xpathList = $http.get('/api/xpaths/'+appType);

            var deferred = $q.defer();
            deferred.resolve(xpathList);
            return deferred.promise;
        };

        var getXpathArrayList = function(appType) {
                var xpathArrayList = [];

                getApplicationXpathList(appType).then(function(xpathList) {
                    $rootScope.xpathList = xpathList;
                    xpathList.data.forEach(function (item) {
                        xpathArrayList.push(item.xpath.key);
                    });
                deferred.resolve(xpathArrayList);
            });

            var deferred = $q.defer();
            return deferred.promise;
        };

        return {
        "taskContent" : {},
        "getGlobalContext": getGlobalContext,
        "getTaskJson": getTaskJson,
        "saveTaskScript": saveTaskScript,
        "updateTaskScript": updateTaskScript,
        "updateTaskJson": updateTaskJson,
        "getTriggers":  getTriggers,
        "getTriggerForID": getTriggerForID,
        "getTriggerSuggestions": getTriggerSuggestions,
        "getKeyNameSuggestions":getKeyNameSuggestions,
        "getElementNameSuggestions":getElementNameSuggestions,
        "getXPathForElement" : getXPathForElement,
        "saveXpath": saveXpath,
        "getApplicationXpathList": getApplicationXpathList,
        "getXpathArrayList": getXpathArrayList
    };
}]);
