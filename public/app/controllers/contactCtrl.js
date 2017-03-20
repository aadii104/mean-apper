angular.module('contactCtrl',['mailServices'])



.controller('contactCtrl',function ($http,$location,$timeout,Email) {

	var app = this;
	app.sub_email = function (a_email) {

		app.loading  = true;
		app.errorMsg = false;

		Email.create(app.a_email).then(function(data) {
			if(data.data.success){
				app.loading  = false;
				app.successMsg = data.data.message + "....redirecting";

				$timeout(function() {
					$location.path('/thank');
				}, 2000);



			}else{
				app.loading  = false;
				app.errorMsg   = data.data.message; 
			}
		});
	};
});
// data.data.message