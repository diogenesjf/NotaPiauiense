var app = angular.module('app.controllers', []);
  
app.controller('mainCtrl', function($scope, $ionicNavBarDelegate) {
	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = false;
		$scope.menuData.menuRightIconExit = false;
	});
     $ionicNavBarDelegate.showBackButton(false);

})
   
.controller('cadastroCtrl',['JsonFactory','MunicipioDataService','CadastroPFService','$scope', '$state','$filter','$ionicLoading','ionicToast', '$ionicNavBarDelegate',
	function(JsonFactory,MunicipioDataService,CadastroPFService,$scope, $state,$filter,$ionicLoading,ionicToast,$ionicNavBarDelegate) {
	var weekDaysList = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
	var monthList = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
	$scope.logradouros = JsonFactory.getLogradouros();
	$scope.ufs = JsonFactory.getUFs();
	$scope.cadastro = {};

	$scope.aaaErrorTips = {
      required: 'Razão social é obrigatória',
      minlength: 'This field does not match the min length',
      maxlength: 'This field does not match the max length',
      pattern: 'This field is not right',
      number: 'This field should be a number'
    };
	$scope.nomeErrorTips = {
      required: 'Nome é obrigatório'
    };
	$scope.nomeMaeErrorTips = {
      required: 'O nome da mãe é obrigatório'
    };
	$scope.cpfErrorTips = {
      required: 'O CPF é obrigatório',
      cpf: 'O CPF é inválido'
    };
	$scope.dataNascimentoErrorTips = {
      required: 'Data de nascimento é obrigatória'
    };
	$scope.telefoneErrorTips = {
      required: 'Telefone é obrigatório',
      pattern: 'O telefone é inválido'
    };
	$scope.celularErrorTips = {
      required: 'Celular é obrigatório',
      pattern: 'O celular é inválido'
    };
	$scope.whatsappErrorTips = {
      pattern: 'O Whatsapp é inválido'
    };
	$scope.cepErrorTips = {
      required: 'CEP é obrigatório'
    };
	$scope.logradouroErrorTips = {
      required: 'Logradouro é obrigatório'
    };
	$scope.enderecoErrorTips = {
      required: 'Endereço é obrigatório'
    };
	$scope.numeroErrorTips = {
      required: 'Número é obrigatório'
    };
	$scope.complementoErrorTips = {
      required: 'Complemento é obrigatório'
    };
	$scope.bairroErrorTips = {
      required: 'Bairro é obrigatório'
    };
	$scope.ufErrorTips = {
      required: 'UF é obrigatório'
    };
	$scope.emailErrorTips = {
      required: 'Email é obrigatório'
    };
	$scope.confirmaEmailErrorTips = {
      required: 'Confirma Email é obrigatório'
    };
	$scope.senhaErrorTips = {
      required: 'Senha é obrigatório',
      minlength: 'A senha não pode ser menor que 6 caracteres.',
    };
	$scope.confirmaSenhaErrorTips = {
      required: 'Confirma Senha é obrigatório',
      minlength: 'A confirmação da senha não pode ser menor que 6 caracteres.',
    };
	$scope.fraseSegurancaErrorTips = {
      required: 'Frase de Segurança é obrigatório'
    };
	$scope.lembreteSenhaErrorTips = {
      required: 'Lembrete da Senha é obrigatório'
    };
    $scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = false;
		$scope.menuData.menuRightIconExit = false;
	});
    $ionicNavBarDelegate.showBackButton(false);
	$scope.cadastroEscolha = function() {
		$state.go('cadastro-Escolha');
	};
	$scope.cadastroPF = function() {
		$state.go('cadastro-Passo1');
	};
	$scope.cadastroPJ = function() {
		$state.go('cadastroPJ-Passo1');
	};

	$scope.anterior = function(user) {
		$state.go('cadastro-Escolha');
	};
	$scope.passo1 = function() {
		$scope.cadastro = CadastroPFService.get();
		$state.go('cadastro-Passo1');
	};
	$scope.passo2voltar = function() {
		$scope.cadastro = CadastroPFService.get();
		$state.go('cadastro-Passo2');
	};
	$scope.passo2 = function(form) {
		if (form.telefoneCompl && form.telefoneCompl.length >= 10) {
			form.dddTelefone = form.telefoneCompl.substring(0,2);
			form.telefone = form.telefoneCompl.substring(2,form.telefoneCompl.length);
		} else if (form.telefoneCompl && form.telefoneCompl.length > 0) { 
			ionicToast.show('Telefone inválido', 'bottom', true, 2500);
//			$ionicLoading.show({ template: 'Telefone inválido', noBackdrop: true, duration: 2000 });
			return;
		}
		if (form.celularCompl && form.celularCompl.length >= 10) {
			form.dddCelular = form.celularCompl.substring(0,2);
			form.celular = form.celularCompl.substring(2,form.celularCompl.length);
		} else if (form.celularCompl && form.celularCompl.length > 0) {
			ionicToast.show('Celular inválido', 'bottom', true, 2500);
			return;
		}
		if (form.whatsappCompl && form.whatsappCompl.length >= 10) {
			form.dddWhatsapp = form.whatsappCompl.substring(0,2);
			form.whatsapp = form.whatsappCompl.substring(2,form.whatsappCompl.length);
		} else if (form.whatsappCompl && form.whatsappCompl.length > 0) {
			ionicToast.show('Whatsapp inválido', 'bottom', true, 2500);
			return;
		}
		if (!$scope.dataNascimentoSelected || typeof($scope.dataNascimentoSelected) === 'undefined' ) {
			ionicToast.show('Data de nascimento inválida', 'bottom', true, 2500);
			return;
		} else {
			form.dataNascimento = $filter('date')($scope.dataNascimentoSelected, 'dd/MM/yyyy');
		}
		CadastroPFService.merge(form);
		$scope.cadastro = CadastroPFService.get();
		$state.go('cadastro-Passo2');
	};
	$scope.passo3 = function(form) {
		CadastroPFService.merge(form);
		$scope.cadastro = CadastroPFService.get();
		$state.go('cadastro-Passo3');
	};
    //$scope.data = { "municipios" : [], "search" : '' };

	$scope.searchMunicipio = function(query,uf) {
		return MunicipioDataService.searchMunicipio(query,uf);/*.then(
			function(matches) {
				return matches;
			}
		);*/
	};
	$scope.$watch("cadastro.telefone", function(newValue, oldValue){

        if (newValue && newValue.length > 11){
            $scope.cadastro.telefone = oldValue;
        }
    });
	$scope.salvar = function(form) {
		if (form.email != form.confirmaEmail) {
			ionicToast.show('E-mail e confirmação de e-mail são diferentes', 'bottom', true, 2500);
			return;
		}
		if (form.senha != form.confirmaSenha) {
			ionicToast.show('Senha e confirmação de senha são diferentes', 'bottom', true, 2500);
			return;
		}
		CadastroPFService.merge(form);
		$scope.form = CadastroPFService.save($scope.sucessoSalvar,$scope.errorSalvar);
	};
	$scope.sucessoSalvar = function(responseData) {
		if (responseData.result) {
			$ionicLoading.show({ template: 'Operação realizada com sucesso!', noBackdrop: true, duration: 2000 });
			$state.go('sucesso');
		} else {
			$ionicLoading.show({ template: 'Falha ao salvar os dados.Mensagem:'+responseData.message[0], noBackdrop: true, duration: 2000 });
		}
	};
	$scope.errorSalvar = function(message) {
		$ionicLoading.show({ template: 'Falha ao salvar os dados.Mensagem:'+message, noBackdrop: true, duration: 2000 });
		return;
	};

	$scope.dataNascimento = {
      titleLabel: 'Data',  //Optional
      todayLabel: 'Hoje',  //Optional
      closeLabel: 'Fechar',  //Optional
      setLabel: 'Atribuir',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      //inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
//    disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList, //Optional
      monthList: monthList, //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(1900, 8, 2), //Optional
      to: new Date(2016, 8, 25),  //Optional
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
			$scope.dataNascimentoSelected = val;
			console.log('Selected date is : ', val);
		}
	};

}])
   
.controller('cadastroPJCtrl',['JsonFactory','MunicipioDataService','CadastroPJService','$scope', '$state','$ionicLoading','ionicToast','$ionicNavBarDelegate',
	function(JsonFactory,MunicipioDataService,CadastroPJService,$scope, $state,$ionicLoading,ionicToast,$ionicNavBarDelegate) {
	var weekDaysList = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
	var monthList = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
	$scope.logradouros = JsonFactory.getLogradouros();
	$scope.ufs = JsonFactory.getUFs();
	$scope.cadastro = {};
	$scope.razaoSocialErrorTips = {
      required: 'Razão social é obrigatória'
    };
	$scope.cnpjErrorTips = {
      required: 'CNPJ é obrigatório',
      cnpj: 'O CNPJ é inválido'
    };
	$scope.cpfErrorTips = {
      required: 'CPF do representante legal é obrigatório',
      cpf: 'O CPF é inválido'
    };
	$scope.representanteLegalErrorTips = {
      required: 'Representante legal é obrigatório'
    };
	$scope.telefoneErrorTips = {
      required: 'Telefone é obrigatório',
      pattern: 'O telefone é inválido'
    };
	$scope.celularErrorTips = {
      required: 'Celular é obrigatório',
      pattern: 'O celular é inválido'
    };
	$scope.whatsappErrorTips = {
      pattern: 'O Whatsapp é inválido'
    };
	$scope.cepErrorTips = {
      required: 'CEP é obrigatório'
    };
	$scope.logradouroErrorTips = {
      required: 'Logradouro é obrigatório'
    };
	$scope.enderecoErrorTips = {
      required: 'Endereço é obrigatório'
    };
	$scope.numeroErrorTips = {
      required: 'Número é obrigatório'
    };
	$scope.complementoErrorTips = {
      required: 'Complemento é obrigatório'
    };
	$scope.bairroErrorTips = {
      required: 'Bairro é obrigatório'
    };
	$scope.ufErrorTips = {
      required: 'UF é obrigatório'
    };
	$scope.emailErrorTips = {
      required: 'Email é obrigatório'
    };
	$scope.confirmaEmailErrorTips = {
      required: 'Confirma Email é obrigatório'
    };
	$scope.senhaErrorTips = {
      required: 'Senha é obrigatório',
      minlength: 'A senha não pode ser menor que 6 caracteres.',
    };
	$scope.confirmaSenhaErrorTips = {
      required: 'Confirma Senha é obrigatório',
      minlength: 'A confirmação da senha não pode ser menor que 6 caracteres.',
    };
	$scope.fraseSegurancaErrorTips = {
      required: 'Frase de Segurança é obrigatório'
    };
	$scope.lembreteSenhaErrorTips = {
      required: 'Lembrete da Senha é obrigatório'
    };

	$scope.$on('$ionicView.beforeEnter', function (e, data) {
		$scope.menuData.menuLeftIconOn = false;
		$scope.menuData.menuRightIconExit = false;
	});
    $ionicNavBarDelegate.showBackButton(false);
	$scope.anterior = function(user) {
		$state.go('cadastro-Escolha');
	};
	$scope.passo1 = function() {
		$scope.cadastro = CadastroPJService.cadastro;
		$state.go('cadastroPJ-Passo1');
	};
	$scope.passo2voltar = function() {
		$scope.cadastro = CadastroPJService.cadastro;
		$state.go('cadastroPJ-Passo2');
	};
	$scope.passo2 = function(form) {
		if (form.telefoneCompl && form.telefoneCompl.length >= 10) {
			form.dddTelefone = form.telefoneCompl.substring(0,2);
			form.telefone = form.telefoneCompl.substring(2,form.telefoneCompl.length);
		} else if (form.telefoneCompl && form.telefoneCompl.length > 0) { 
			ionicToast.show('Telefone inválido', 'bottom', true, 2500);
//			$ionicLoading.show({ template: 'Telefone inválido', noBackdrop: true, duration: 2000 });
			return;
		}
		if (form.celularCompl && form.celularCompl.length >= 10) {
			form.dddCelular = form.celularCompl.substring(0,2);
			form.celular = form.celularCompl.substring(2,form.celularCompl.length);
		} else if (form.celularCompl && form.celularCompl.length > 0) {
			ionicToast.show('Celular inválido', 'bottom', true, 2500);
			return;
		}
		if (form.whatsappCompl && form.whatsappCompl.length >= 10) {
			form.dddWhatsapp = form.whatsappCompl.substring(0,2);
			form.whatsapp = form.whatsappCompl.substring(2,form.whatsappCompl.length);
		} else if (form.whatsappCompl && form.whatsappCompl.length > 0) {
			ionicToast.show('Whatsapp inválido', 'bottom', true, 2500);
			return;
		}
		CadastroPJService.merge(form);
		$state.go('cadastroPJ-Passo2');
	};
	$scope.passo3 = function(form) {
		CadastroPJService.merge(form);
		$state.go('cadastroPJ-Passo3');
	};
    //$scope.data = { "municipios" : [], "search" : '' };

	$scope.searchMunicipio = function(query,uf) {
		return MunicipioDataService.searchMunicipio(query,uf);/*.then(
			function(matches) {
				return matches;
			}
		);*/
	};
	$scope.$watch("cadastro.telefone", function(newValue, oldValue){

        if (newValue && newValue.length > 11){
            $scope.cadastro.telefone = oldValue;
        }
    });
	$scope.salvar = function(form) {
		if (form.email != form.confirmaEmail) {
			ionicToast.show('E-mail e confirmação de e-mail são diferentes', 'bottom', true, 2500);
			return;
		}
		if (form.senha != form.confirmaSenha) {
			ionicToast.show('Senha e confirmação de senha são diferentes', 'bottom', true, 2500);
			return;
		}
		CadastroPJService.merge(form);
		$scope.form = CadastroPJService.save($scope.sucessoSalvar,$scope.errorSalvar);
	};
	$scope.sucessoSalvar = function(responseData) {
		if (responseData.result) {
			$ionicLoading.show({ template: 'Operação realizada com sucesso!', noBackdrop: true, duration: 2000 });
			$state.go('sucesso');
		} else {
			$ionicLoading.show({ template: 'Falha ao salvar os dados.Mensagem:'+responseData.message[0], noBackdrop: true, duration: 2000 });
		}
	};
	$scope.errorSalvar = function(message) {
		$ionicLoading.show({ template: 'Falha ao salvar os dados.Mensagem:'+message, noBackdrop: true, duration: 2000 });
		return;
	};


}])


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
   
.controller('minhasNotasCtrl', ['JsonFactory','NotasListFactory','dataNotasLoad',
  '$scope',
  '$state',
  'sessionService',
  '$ionicModal',
  'appDBBridge',
  '$timeout',
  '$ionicLoading','ionicToast', '$ionicPopup','$filter',
    function(JsonFactory,NotasListFactory, dataNotasLoad, $scope, $state, sessionService,  $ionicModal, appDBBridge, $timeout, $ionicLoading,ionicToast, $ionicPopup,$filter) {
	$scope.dataNotas = [];
	$scope.cadastroNota = {};
	$scope.dataSelected = '';

	$scope.cnpjErrorTips = {
      required: 'O CNPJ é obrigatório',
      cnpj: 'O CNPJ é inválido'
    };
	$scope.numDocumentoErrorTips = {
      required: 'O Número do documento é obrigatório'
    };
	$scope.tipoDocumentoErrorTips = {
      required: 'O Tipo de documento é obrigatório'
    };
	$scope.valorErrorTips = {
      required: 'O Valor é obrigatório',
      pattern: 'O Valor é inválido'
    };
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
		$scope.tipos = JsonFactory.getTipoNotas();
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
			$scope.dataSelected = val;
			console.log('Selected date is : ', val);
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
        var newItem = {};
        // Add values from form to object
        newItem.cpfCnpj = form.cnpj.replace(/[^0-9 ]/g, "");
        newItem.numDocumento = form.docNumber;
        newItem.tipoDocumento = form.type;
        newItem.dataNota = form.date;
        newItem.valor = form.value;
         // Save new list in scope and factory
        NotasListFactory.reclamarNota($scope.user.login,$scope.user.tokenSessao,newItem, $scope.successSaveNotas,$scope.errorSaveNotas);
	};

      // Define item buttons
      // Get list from storage
      $scope.list = NotasListFactory.getList();

      // Used to cache the empty form for Edit Dialog
      $scope.saveEmpty = function(form) {
        $scope.form = angular.copy(form);
      };

      $scope.addItem = function(form) {
        var newItem = {};
		if (!$scope.dataSelected || typeof($scope.dataSelected) === 'undefined' ) {
			ionicToast.show('Data  inválida', 'bottom', true, 2500);
			return;
		} else {
			newItem.dataNota = $filter('date')($scope.dataSelected, 'dd/MM/yyyy');
		}
        // Add values from form to object
        newItem.cpfCnpj = form.cpfCnpj.$modelValue;
        newItem.numDocumento = form.numDocumento.$modelValue;
        newItem.tipoDocumento = form.tipoDocumento.$modelValue;
        newItem.valor = form.valor.$$rawModelValue;
         // Save new list in scope and factory
        NotasListFactory.newNota($scope.user.login,$scope.user.tokenSessao,newItem, $scope.successSaveNotas,$scope.errorSaveNotas);
      };

	$scope.successSaveNotas = function(responseData) {
		if (responseData.result) {
			ionicToast.show('Operação realizada com sucesso!', 'bottom', true, 2500);
			$scope.leaveAddChangeDialog();
			$scope.leaveDetailDialog();
		} else {
			ionicToast.show('Falha ao salvar os dados.Mensagem:'+responseData.message[0], 'bottom', true, 2500);
		}
	};
	$scope.errorSaveNotas = function(message) {
		ionicToast.show('Falha ao salvar os dados.Mensagem:'+message, 'bottom', true, 2500);
		return;
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
 