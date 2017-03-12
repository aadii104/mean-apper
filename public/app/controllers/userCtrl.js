angular.module('userControllers', ['userServices'])


.contrller('mainCtrl', function(Auth, $location, $timeout) {

	var app =  this;

	this.doLogin = function(loginData){
		app.loading = true;
		app.errorMsg = false;

		Auth.login(app.loginData).then(function(data){
			if (data.data.success){
				app.loading = false;
				app.successMsg = data.data.message + '...Redirecting';

				$Timeout(function() {
					$location.path('/about');
				}, 2000);
			}
			else{
				app.loading = false;
				app.errorMsg = data.data.message;
			}
		});
	};
}) 

.controller('facebookCtrl', function ($route, Auth, $location) {
	
	var app = this;
	if($window.location.pathname == '/facebook'){
		app.errorMsg ='facebook email not found';

	}else{
		Auth.facebook($routeParams.token);
		$location.path('/');	
	}

});