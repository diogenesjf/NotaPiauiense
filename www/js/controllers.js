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
   
.controller('cadastro-Passo2Ctrl',['JsonFactory','MunicipioDataService','$scope', '$state',
	function(JsonFactory,MunicipioDataService,$scope, $state) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = false;
		$scope.menuData.menuRightIconExit = false;
	});
	$scope.logradouros = JsonFactory.getLogradouros();
	$scope.ufs = JsonFactory.getUFs();
	$scope.proximo = function(user) {
		$state.go('cadastro-Passo3');
	};
	$scope.anterior = function(user) {
		$state.go('cadastro-Passo2');
	};
    //$scope.data = { "municipios" : [], "search" : '' };

	$scope.searchMunicipio = function(query,uf) {
		return MunicipioDataService.searchMunicipio(query,uf);/*.then(
			function(matches) {
				return matches;
			}
		);*/
	};

}])
   
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
   
.controller('loginCtrl', ['LoginService', 'sessionService', '$scope', '$ionicModal','$state', '$ionicLoading',
    function(LoginService,sessionService, $scope, $ionicModal, $state, $ionicLoading) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = false;
		$scope.menuData.menuRightIconExit = false;
	});
	$scope.signIn = function(user) {
		console.log('Sign-In', user.username, user.password);
		$ionicLoading.show();
		var userRetorno = LoginService.login(user.username, user.password,$scope.successLogin);
	};
	$scope.successLogin = function(user) {
		console.log('Sign-In', user);
		sessionService.store('user', user);
		$state.go('tabsController.conta');
		$ionicLoading.hide();
	};

}])
   
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
  

  .controller('contaCtrl', ['ContaCorrenteListFactory',   '$scope',
  '$state',
  'sessionService',
  '$ionicModal',
  'appDBBridge',
  '$timeout',
  '$ionicLoading', '$ionicPopup',
    function(ContaCorrenteListFactory, $scope, $state, sessionService,  $ionicModal, appDBBridge, $timeout, $ionicLoading, $ionicPopup) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = true;
		$scope.menuData.menuRightIconExit = true;
		$ionicLoading.show();
		$scope.user = sessionService.get('user');
		ContaCorrenteListFactory.getContaCorrente($scope.user.login,$scope.user.tokenSessao,$scope.successConta,$scope.errorConta);
	});


	$scope.successConta = function(conta) {
		$scope.contaCorrente = conta;
		$ionicLoading.hide();
		$scope.$broadcast('scroll.refreshComplete');
	};
    $scope.errorConta = function(notas) {
		$ionicLoading.hide();
		$scope.$broadcast('scroll.refreshComplete');
	};

}])
   
.controller('minhasNotasCtrl', ['NotasListFactory','dataNotasLoad',
  '$scope',
  '$state',
  'sessionService',
  '$ionicModal',
  'appDBBridge',
  '$timeout',
  '$ionicLoading', '$ionicPopup',
    function(NotasListFactory, dataNotasLoad, $scope, $state, sessionService,  $ionicModal, appDBBridge, $timeout, $ionicLoading, $ionicPopup) {
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
			$ionicLoading.show();
			$scope.user = sessionService.get('user');
			appDBBridge.fetchAndSyncDataToScope('', 'NotasListFactory.getNotas', [$scope.user.login,$scope.user.tokenSessao,$scope.successNotas,$scope.errorNotas]);
        }
    };

    $scope.successNotas = function(notas) {
		var u = $timeout(function () {
			$scope.dataNotas = notas;
			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		}, 1000);
		$scope.$on('$destroy', function () {
			u.cancel();
		});
	};
    $scope.errorNotas = function(notas) {
		$ionicLoading.hide();
		$scope.$broadcast('scroll.refreshComplete');
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


      $ionicModal.fromTemplateUrl('templates/detalheNota.html', function(modal) {
        $scope.detailDialog = modal;
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
     $scope.showDetailDialog = function(action) {
        $scope.action = action;
        $scope.detailDialog.show();

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


      $scope.leaveDetailDialog = function() {
        // Remove dialog 
        $scope.detailDialog.remove();
        // Reload modal template to have cleared form
        $ionicModal.fromTemplateUrl('templates/detalheNota.html', function(modal) {
          $scope.detailDialog = modal;
        }, {
          scope: $scope,
          animation: 'slide-in-up',
    	  focusFirstInput: true
        });
      };

      $scope.addNota = function(e) {
        $scope.showAddChangeDialog('add');
      };

    $scope.detailNota = function(nota) {
        $scope.showDetailDialog('detail');
        $scope.notaDetalhe = nota;
    };  
	$scope.voltarLista = function(user) {
		$scope.leaveDetailDialog();
	};
	$scope.reclamar = function(form) {
		$scope.leaveDetailDialog();
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
   
.controller('consultaCtrl',  ['NotasListFactory',
							  '$scope', 
							  '$state',
							  'sessionService',
							  '$ionicModal',
							  'appDBBridge',
							  '$timeout',
							  '$ionicLoading', '$ionicPopup',
    function(NotasListFactory, $scope, $state, sessionService, $ionicModal, appDBBridge, $timeout, $ionicLoading, $ionicPopup) {
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

    $scope.getRemoteNotas = function(findObj) {
        if (!$scope.isOnline()) {
            $ionicPopup.alert({
                title: 'Oops!',
                template: 'Não foi possível estabelecer conexão com o servidor.'
            }).then(function() {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            });
        } else {
			$ionicLoading.show();        	
		    $scope.user = sessionService.get('user');
			appDBBridge.fetchAndSyncDataToScope('', 'NotasListFactory.findNotas', [$scope.user.login,$scope.user.tokenSessao,findObj,$scope.successNotas,$scope.errorNotas]);
        }
    };

      $ionicModal.fromTemplateUrl('templates/resultadoNotas.html', function(modal) {
        $scope.resultDialog = modal;
      }, {
        scope: $scope,
        animation: 'slide-in-up',
    	focusFirstInput: true
      });


    $scope.successNotas = function(notas) {
		var u = $timeout(function () {
			$scope.dataNotas = notas;
			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		}, 1000);
		$scope.$on('$destroy', function () {
			u.cancel();
		});
	};
    $scope.errorNotas = function(notas) {
		$ionicLoading.hide();
		$scope.$broadcast('scroll.refreshComplete');
	};

     $scope.showResultDialog = function(action) {
        $scope.action = action;
        $scope.resultDialog.show();

     };

      $scope.leaveResultDialog = function() {
        // Remove dialog 
        $scope.resultDialog.remove();
        // Reload modal template to have cleared form
        $ionicModal.fromTemplateUrl('templates/resultadoNotas.html', function(modal) {
          $scope.resultDialog = modal;
        }, {
          scope: $scope,
          animation: 'slide-in-up',
    	  focusFirstInput: true
        });
      };
	$scope.voltarLista = function(user) {
		$scope.leaveResultDialog();
	};

	$scope.saveEmpty = function(form) {
        $scope.form = angular.copy(form);
      }

      $scope.buscar = function(form) {
        var findObj = {};
        // Add values from form to object
        findObj.cpfCnpj = form.cpfCnpj.$modelValue;
        findObj.razaoSocial = form.razaoSocial.$modelValue;
        findObj.numDocumento = form.numDocumento.$modelValue;
        findObj.serie = form.serie.$modelValue;
        findObj.dataNota = $scope.dataNota.inputDate;
        findObj.tipoDocumento = form.tipoDocumento.$modelValue;
        // Save new list in scope and factory
        $scope.showResultDialog('result');
        $scope.getRemoteNotas(findObj);
//        NotasListFactory.setList($scope.list);
      };

}])
      
.controller('cuponsCtrl', ['CuponsListFactory','$scope', '$state',
							  'sessionService',
							  '$ionicModal',
							  'appDBBridge',
							  '$timeout',
							  '$ionicLoading', '$ionicPopup',
    function(CuponsListFactory, $scope, $state, sessionService, $ionicModal, appDBBridge, $timeout, $ionicLoading, $ionicPopup) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = true;
		$scope.menuData.menuRightIconExit = true;
	});
	$scope.$on('$ionicView.enter', function(e, data){
			$ionicLoading.show();
			$scope.user = sessionService.get('user');
			//appDBBridge.fetchAndSyncDataToScope('', 'NotasListFactory.getNotas', [$scope.user.login,$scope.user.tokenSessao,$scope.successNotas]);
			CuponsListFactory.getCupons($scope.user.login,$scope.user.tokenSessao,$scope.successCupons,$scope.errorCupons);
	  });

    $scope.successCupons = function(cupons) {
		var u = $timeout(function () {
			$scope.data = cupons;
			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		}, 1000);
		$scope.$on('$destroy', function () {
			u.cancel();
		});
	};
    $scope.errorCupons = function(status) {
		$ionicLoading.hide();
		$scope.$broadcast('scroll.refreshComplete');
	};

}])


.controller('sorteioCtrl', ['SorteioListFactory','$scope','$state', 
							  'sessionService',
							  '$ionicModal',
							  'appDBBridge',
							  '$timeout',
							  '$ionicLoading', '$ionicPopup',
    function(SorteioListFactory, $scope, $state, sessionService, $ionicModal, appDBBridge, $timeout, $ionicLoading, $ionicPopup) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = true;
		$scope.menuData.menuRightIconExit = true;
	});
	$scope.$on('$ionicView.enter', function(e, data){

		$ionicLoading.show();
		$scope.user = sessionService.get('user');
		//appDBBridge.fetchAndSyncDataToScope('', 'NotasListFactory.getNotas', [$scope.user.login,$scope.user.tokenSessao,$scope.successNotas]);
		SorteioListFactory.getSorteios($scope.user.login,$scope.user.tokenSessao,$scope.successSorteios,$scope.errorSorteios);
	  });

	$scope.voltar = function(user) {
		$state.go('tabsController.conta');
	};

	$scope.successSorteios = function(sorteios) {
		var u = $timeout(function () {
			$scope.data = sorteios;
			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		}, 1000);
		$scope.$on('$destroy', function () {
			u.cancel();
		});
	};

    $scope.errorSorteios = function(status) {
		$ionicLoading.hide();
		$scope.$broadcast('scroll.refreshComplete');
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
.controller('detalheNotaCtrl', function($scope, $state) {
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
 