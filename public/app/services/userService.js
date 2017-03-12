angular.module('userServices', [])

.factory('User',function($http){


	var userFactory={};

	// user.create(regData)
	userFactory.create = function(regData){
		return $http.post('/api/users', regData);
	}

	return userFactory;

});