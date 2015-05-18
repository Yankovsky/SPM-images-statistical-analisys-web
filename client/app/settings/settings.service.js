'use strict';

angular.module('spmApp').factory('Settings', function(localStorageService) {
	var settings = localStorageService.get('settings') || {};

	return {
		get: function(key) {
			return settings[key];
		},
		set: function(key, value) {
			settings[key] = value;
			localStorageService.set('settings', settings);
		}
	};
});