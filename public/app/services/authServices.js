angular.module('authService',[])

.factory('Auth',function($http, AuthToken){


	var authFactory={};

	// user.create(regData)
	authFactory.login = function(loginData){
		return $http.post('/api/authenticate', loginData).then(function(data) {
				
				AuthToken.setToken(data.data.token);
				return data;

		});
	}

	authFactory.isLogedIn = function(){
			if (Auth.getToken()){
				return true;
			}
			else{
				return false;
			}
	};

	authFactory.facebook = function(token){
		AuthToken.setToken(token);
	};

	authFactory.getUser =function () {
		if(AuthToken.getToken()){
			return $http.post('/api/me');
		}else {
			$q.reject({message: 'User has no token'});
		}
	};

	authFactory.logout =  function() {
			AuthToken.setToken();
	};


	return authFactory;

}); 

.factory('AuthToken', function($window) {
	
	var authTokenFactory = {};

	// AuthToken.setToken(token);
	authTokenFactory.setToken = function(token) {
		if(token){
			$window.localStorage.setItem('token', token);
		}else{
			$window.localStorage.removeItem('token');
		}
	}

	return authTokenFactory;

});

.factory('AuthToken', function() {
	
	var authTokenFactory = {};

	// AuthToken.getToken(token);
	authTokenFactory.getToken = function(token) {
		$window.localStorage.getItem('token', token);
	}

	return authTokenFactory;

})
.factory('AuthInterceptors', function(AuthToken) {
	var authInterceptorsFactory = {};

	authInterceptorsFactory.request = function(config) {
		var token = AuthToken.getToken();

		if (token){
			config.headers['x-access-token'] = token;

			return config;
		}
	};

	return authInterceptorsFactory;
})