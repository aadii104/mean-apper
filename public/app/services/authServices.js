angular.module('authServices', [])

.factory('Auth',function ($http) {
	authFactory  =  [];


	userFactory.login = function (regData) {
		return $http.post('/api/users', regData);
	}
	return userFactory;
});	