var app = angular.module('app.controllers', []);
  
app.controller('mainCtrl', function($scope, $ionicNavBarDelegate) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = false;
		$scope.menuData.menuRightIconExit = false;
	});
     $ionicNavBarDelegate.showBackButton(false);

})
   
.controller('cadastro-Passo1Ctrl', function($scope, $state) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = false;
		$scope.menuData.menuRightIconExit = false;
	});
	$scope.proximo = function(user) {
		$state.go('cadastro-Passo2');
	};
	$scope.anterior = function(user) {
		$state.go('main');
	};

})
   
.controller('cadastro-Passo2Ctrl', function($scope, $state) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = false;
		$scope.menuData.menuRightIconExit = false;
	});
	$scope.proximo = function(user) {
		$state.go('cadastro-Passo3');
	};
	$scope.anterior = function(user) {
		$state.go('cadastro-Passo2');
	};

})
   
.controller('cadastro-Passo3Ctrl', function($scope, $state) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = false;
		$scope.menuData.menuRightIconExit = false;
	});
	$scope.salvar = function(user) {
		$state.go('sucesso');
	};
	$scope.anterior = function(user) {
		$state.go('cadastro-Passo3');
	};

})
   
.controller('loginCtrl', function($scope, $state) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = false;
		$scope.menuData.menuRightIconExit = false;
	});
	$scope.signIn = function(user) {
	    console.log('Sign-In', user.username, user.password);
		$state.go('tabsController.conta');
	};

})
   
.controller('sucessoCtrl', function($scope, $ionicNavBarDelegate) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = false;
		$scope.menuData.menuRightIconExit = false;
	});
     $ionicNavBarDelegate.showBackButton(false);

})
   
.controller('dadosUsuarioCtrl', function($scope, $state) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = true;
		$scope.menuData.menuRightIconExit = true;
	});
	$scope.voltar = function(user) {
		$state.go('tabsController.conta');
	};
	$scope.salvar = function(user) {
		$state.go('tabsController.conta');
	};
	$scope.active = 'pessoal';

    $scope.setActive = function(type) {
        $scope.active = type;
    };
    $scope.isActive = function(type) {
        return type === $scope.active;
    };  

})
  

  .controller('contaCtrl', ['ContaCorrenteListFactory','$scope', '$ionicModal',
    function(ContaCorrenteListFactory, $scope, $ionicModal) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = true;
		$scope.menuData.menuRightIconExit = true;
	});
	$scope.contaCorrente = ContaCorrenteListFactory.getContaCorrente();
}])
   
.controller('minhasNotasCtrl', ['NotasListFactory','dataNotasLoad',
  '$scope', 
  '$ionicModal',
  'appDBBridge',
  '$timeout',
  '$ionicLoading', '$ionicPopup',
    function(NotasListFactory, dataNotasLoad, $scope, $ionicModal, appDBBridge, $timeout, $ionicLoading, $ionicPopup) {
	$scope.dataNotas = [];

	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = true;
		$scope.menuData.menuRightIconExit = false;
	});

	$scope.$on('$ionicView.enter', function(e, data){
		$scope.getRemoteNotas();
	});

	$scope.active = 'all';

   /**
     * Called on "pull to refresh" action
     */
    $scope.refreshNotas = function() {
    	$scope.getRemoteNotas();
    };
    $scope.getRemoteNotas = function() {
        if (!$scope.isOnline()) {
            $ionicPopup.alert({
                title: 'Oops!',
                template: 'Não foi possível estabelecer conexão com o servidor.'
            }).then(function() {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            });
        } else {
		    appDBBridge.fetchAndSyncDataToScope('', 'NotasListFactory.getNotas', [])
		    .then(function (updatedDoc) {
		      var u = $timeout(function () {
		        $scope.dataNotas = updatedDoc;
	            $ionicLoading.hide();
	            $scope.$broadcast('scroll.refreshComplete');
		      }, 1000);
		      $scope.$on('$destroy', function () {
		        u.cancel();
		      });
		    }, function() {
	        }, function() {
	            $ionicLoading.hide();
	            $scope.$broadcast('scroll.refreshComplete');
	        });
        }
    };

    $scope.setActive = function(type) {
        $scope.active = type;
    };
    $scope.isActive = function(type) {
        return type === $scope.active;
    };  

	$scope.isOnline = function() {
        var networkState = null;

        if (navigator.connection) {
            networkState = navigator.connection.type;
        }

        if (networkState && networkState === Connection.NONE) {
            return false;
        }
        if (navigator.onLine) {
            return true;
        } else {
            return false;
        }
    };


	  if (dataNotasLoad) {
	    $scope.dataNotas = dataNotasLoad;
	  }

	  

      $ionicModal.fromTemplateUrl('templates/addNotasModal.html', function(modal) {
        $scope.addDialog = modal;
      }, {
        scope: $scope,
        animation: 'slide-in-up',
    	focusFirstInput: true
      });


 		var weekDaysList = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
 		var monthList = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
 		$scope.dataNota = {
	      titleLabel: 'Data',  //Optional
	      todayLabel: 'Hoje',  //Optional
	      closeLabel: 'Fechar',  //Optional
//	      setLabel: 'Set',  //Optional
	      setButtonType : 'button-assertive',  //Optional
	      todayButtonType : 'button-assertive',  //Optional
	      closeButtonType : 'button-assertive',  //Optional
	      inputDate: new Date(),  //Optional
	      mondayFirst: true,  //Optional
//	      disabledDates: disabledDates, //Optional
	      weekDaysList: weekDaysList, //Optional
	      monthList: monthList, //Optional
	      templateType: 'popup', //Optional
	      showTodayButton: 'true', //Optional
	      modalHeaderColor: 'bar-positive', //Optional
	      modalFooterColor: 'bar-positive', //Optional
	      from: new Date(2012, 8, 2), //Optional
	      to: new Date(2018, 8, 25),  //Optional
	      callback: function (val) {  //Mandatory
	        $scope.datePickerCallback(val);
	      },
	      dateFormat: 'dd/MM/yyyy', //Optional
	      closeOnSelect: true, //Optional
	    };

		$scope.datePickerCallback = function (val) {
		  if (typeof(val) === 'undefined') {
		    console.log('No date selected');
		  } else {
		    console.log('Selected date is : ', val)
		  }
		};

      $scope.showAddChangeDialog = function(action) {
        $scope.action = action;
        $scope.addDialog.show();

     };

      $scope.leaveAddChangeDialog = function() {
        // Remove dialog 
        $scope.addDialog.remove();
        // Reload modal template to have cleared form
        $ionicModal.fromTemplateUrl('templates/addNotasModal.html', function(modal) {
          $scope.addDialog = modal;
        }, {
          scope: $scope,
          animation: 'slide-in-up',
    	  focusFirstInput: true
        });
      };

      $scope.addNota = function(e) {
        $scope.showAddChangeDialog('add');
      };

      // Define item buttons
      // Get list from storage
      $scope.list = NotasListFactory.getList();

      // Used to cache the empty form for Edit Dialog
      $scope.saveEmpty = function(form) {
        $scope.form = angular.copy(form);
      }

      $scope.addItem = function(form) {
        var newItem = {};
        // Add values from form to object
        newItem.cpfCnpj = form.cpfCnpj.$modelValue;
        newItem.razaoSocial = form.razaoSocial.$modelValue;
        newItem.numDocumento = form.numDocumento.$modelValue;
        newItem.serie = form.serie.$modelValue;
        newItem.dataNota = $scope.dataNota.inputDate;
        // Save new list in scope and factory
        $scope.list.push(newItem);
        NotasListFactory.setList($scope.list);
        // Close dialog
        $scope.leaveAddChangeDialog();
      };


}])
   
.controller('consultaCtrl', function($scope) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = true;
		$scope.menuData.menuRightIconExit = true;
	});
 		var weekDaysList = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
 		var monthList = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
 		$scope.dataNota = {
	      titleLabel: 'Data',  //Optional
	      todayLabel: 'Hoje',  //Optional
	      closeLabel: 'Fechar',  //Optional
//	      setLabel: 'Set',  //Optional
	      setButtonType : 'button-assertive',  //Optional
	      todayButtonType : 'button-assertive',  //Optional
	      closeButtonType : 'button-assertive',  //Optional
	      inputDate: new Date(),  //Optional
	      mondayFirst: true,  //Optional
//	      disabledDates: disabledDates, //Optional
	      weekDaysList: weekDaysList, //Optional
	      monthList: monthList, //Optional
	      templateType: 'popup', //Optional
	      showTodayButton: 'true', //Optional
	      modalHeaderColor: 'bar-positive', //Optional
	      modalFooterColor: 'bar-positive', //Optional
	      from: new Date(2012, 8, 2), //Optional
	      to: new Date(2018, 8, 25),  //Optional
	      callback: function (val) {  //Mandatory
	        $scope.datePickerCallback(val);
	      },
	      dateFormat: 'dd/MM/yyyy', //Optional
	      closeOnSelect: true, //Optional
	    };

		$scope.datePickerCallback = function (val) {
		  if (typeof(val) === 'undefined') {
		    console.log('No date selected');
		  } else {
		    console.log('Selected date is : ', val)
		  }
		};

      $scope.saveEmpty = function(form) {
        $scope.form = angular.copy(form);
      }

      $scope.buscar = function(form) {
        var newItem = {};
        // Add values from form to object
        newItem.cpfCnpj = form.cpfCnpj.$modelValue;
        newItem.razaoSocial = form.razaoSocial.$modelValue;
        newItem.numDocumento = form.numDocumento.$modelValue;
        newItem.serie = form.serie.$modelValue;
        newItem.dataNota = $scope.dataNota.inputDate;
        // Save new list in scope and factory
//        NotasListFactory.setList($scope.list);
      };

})
      
.controller('cuponsCtrl', ['CuponsListFactory','$scope', '$ionicModal',
  'appDBBridge',
  '$timeout',
    function(CuponsListFactory, $scope, $ionicModal, appDBBridge, $timeout) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = true;
		$scope.menuData.menuRightIconExit = true;
	});
	$scope.$on('$ionicView.enter', function(e, data){

	    //appDBBridge.fetchAndSyncDataToScope('', 'NotasListFactory.getNotas', [])
	    CuponsListFactory.getCupons().then(function (updatedDoc) {
	      var u = $timeout(function () {
	        $scope.data = updatedDoc;
//	        $scope.dataNotas = _.values(_.omit(updatedDoc, ['filter', 'notas']));
	      }, 1000);
	      $scope.$on('$destroy', function () {
	        u.cancel();
	      });
	    });
	  });

}])


.controller('sorteioCtrl', ['SorteioListFactory','$scope','$state', '$ionicModal',
  'appDBBridge',
  '$timeout',
    function(SorteioListFactory, $scope, $state, $ionicModal, appDBBridge, $timeout) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = true;
		$scope.menuData.menuRightIconExit = true;
	});
	$scope.$on('$ionicView.enter', function(e, data){

	    //appDBBridge.fetchAndSyncDataToScope('', 'NotasListFactory.getNotas', [])
	    SorteioListFactory.getSorteios().then(function (updatedDoc) {
	      var u = $timeout(function () {
	        $scope.data = updatedDoc;
//	        $scope.dataNotas = _.values(_.omit(updatedDoc, ['filter', 'notas']));
	      }, 1000);
	      $scope.$on('$destroy', function () {
	        u.cancel();
	      });
	    });
	  });

	$scope.voltar = function(user) {
		$state.go('tabsController.conta');
	};

}])


.controller('utilizacaoCreditosCtrl', function($scope, $state) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = true;
		$scope.menuData.menuRightIconExit = true;
	});
	$scope.voltar = function(user) {
		$state.go('tabsController.conta');
	};
	$scope.salvar = function(user) {
		$state.go('tabsController.conta');
	};

})
.controller('NavCtrl', function($scope,$state, $ionicSideMenuDelegate) {
	 $scope.menuData = {
        menuLeftIconOn: false,
        menuRightIconExit: false
    };
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.exitMenu = function () {
	$state.go('main');
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
 