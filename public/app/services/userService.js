angular.module('userServices', [])

.factory('User',function($http){


	var userFactory={};

	// user.create(regData)
	userFactory.create = function(regData){
		return $http.post('/api/users', regData);
	}

	userFactory.checkUsername = function(regData){
		return $http.post('/api/checkusername', regData);
	}

	userFactory.checkEmail = function(regData){
		return $http.post('/api/checkemail', regData);
	}
	userFactory.activateAccount = function (token) {
		return $http.put('/api/activate/' + token);
	}

	return userFactory;

});