angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('main', {
      url: '/main',
      templateUrl: 'templates/main.html',
      controller: 'mainCtrl'
    })
        
      
    .state('cadastro-Escolha', {
      url: '/cadEscolha',
      templateUrl: 'templates/cadastroEscolha.html',
      controller: 'cadastroCtrl'
    })
    
      
        
    .state('cadastro-Passo1', {
      url: '/cadPasso1',
      templateUrl: 'templates/cadastro-Passo1.html',
      controller: 'cadastroCtrl'
    })
        
      
    
      
        
    .state('cadastro-Passo2', {
      url: '/cadPasso2',
      templateUrl: 'templates/cadastro-Passo2.html',
      controller: 'cadastroCtrl'
    })
        
      
    .state('cadastro-Passo3', {
      url: '/cadPasso3',
      templateUrl: 'templates/cadastro-Passo3.html',
      controller: 'cadastroCtrl'
    })
  
      
        
        
    .state('cadastroPJ-Passo1', {
      url: '/cadPJPasso1',
      templateUrl: 'templates/cadastroPJ-Passo1.html',
      controller: 'cadastroPJCtrl'
    })
        
      
    
      
        
    .state('cadastroPJ-Passo2', {
      url: '/cadPJPasso2',
      templateUrl: 'templates/cadastroPJ-Passo2.html',
      controller: 'cadastroPJCtrl'
    })
        
      
    .state('cadastroPJ-Passo3', {
      url: '/cadPJPasso3',
      templateUrl: 'templates/cadastroPJ-Passo3.html',
      controller: 'cadastroPJCtrl'
    })
    
      
        
      
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('sucesso', {
      url: '/sucesso',
      templateUrl: 'templates/sucesso.html',
      controller: 'sucessoCtrl'
    })
        
      
    .state('meusDados', {
      url: '/meusDados',
      templateUrl: 'templates/dadosUsuario.html',
      controller: 'dadosUsuarioCtrl'
    })
    
    .state('sorteios', {
      url: '/sorteios',
      templateUrl: 'templates/sorteios.html',
      controller: 'sorteioCtrl'
    })
      
    .state('utilizacaoCreditos', {
      url: '/utilizacaoCreditos',
      templateUrl: 'templates/utilizacaoCreditos.html',
      controller: 'utilizacaoCreditosCtrl'
    })
        
    .state('detalheNota', {
      url: '/detalheNota',
      templateUrl: 'templates/detalheNota.html',
      controller: 'minhasNotasCtrl',
          resolve: {
              dataNotasLoad: function (appDBBridge) {
                return appDBBridge.selectOneDoc({}, 'NotasListFactory.getNotas');
              }
          }
    })

    .state('tabsController.conta', {
      url: '/conta',
      views: {
        'tab1': {
          templateUrl: 'templates/conta.html',
          controller: 'contaCtrl'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.minhasNotas', {
      url: '/minhasNotas',
      views: {
        'tab4': {
          templateUrl: 'templates/minhasNotas.html',
          controller: 'minhasNotasCtrl',
          resolve: {
              dataNotasLoad: function (appDBBridge) {
                return appDBBridge.selectOneDoc({}, 'NotasListFactory.getNotas');
              }
          }
        }
      }
    })
        
        
    .state('tabsController.consulta', {
      url: '/consulta',
      views: {
        'tab3': {
          templateUrl: 'templates/consulta.html',
          controller: 'consultaCtrl'
        }
      }
    })
        
      
    
      
    .state('tabsController', {
      url: '/tabs',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
      
    
      
        
    .state('tabsController.cupons', {
      url: '/cupons',
      views: {
        'tab2': {
          templateUrl: 'templates/cupons.html',
          controller: 'cuponsCtrl'
        }
      }
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main');

});