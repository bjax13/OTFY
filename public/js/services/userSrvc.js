angular.module('app')
	.service('userSrvc', function($http) {

		this.createUser = function(user) {
			return $http({
				method: 'POST',
				url: '/api/user',
				data: user
			});
		};
		this.login = function(user) {
			return $http({
				method: 'POST',
				url: '/login',
				data: user
			});
		};


	});
