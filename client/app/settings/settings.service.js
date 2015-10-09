'use strict';

angular.module('spmApp').factory('Settings', function(localStorageService) {
    var settings = localStorageService.get('settings') || {};

    function createGetterSetterFunction(key) {
        return function(value) {
            if (arguments.length) {
                settings[key] = value;
                localStorageService.set('settings', settings);
            }
            return settings[key];
        };
    }

    var availableSettings = ['fitInPage', 'horizontalLayout', 'findBlobsDynamically'];

    return _.transform(availableSettings, function(memo, settingName) {
        memo[settingName] = createGetterSetterFunction(settingName);
    }, {});
});