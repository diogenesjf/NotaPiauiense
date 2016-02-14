angular.module('app.services', ['app.constants'])

.factory('BlankFactory', [function(){

}])
  
  .factory('ContaCorrenteListFactory',['$http','ApiEndpoint',function($http, ApiEndpoint){

    var listSrv = {
      getContaCorrente: function(loginP,tokenSessaoP,callback,callbackError){
//        $http.defaults.headers.post["Content-Type"] = "application/json";
        var parameter = { "login" : loginP,
                          "tokenSessao": tokenSessaoP };
        return $http.post(ApiEndpoint.url + '/contaCorrente', parameter, {headers: {'Content-Type': 'application/json',
                                                                                                                 'Access-Control-Allow-Origin':'*'} })
        .then(function(data) {
                // success
                return callback(data.data.data.conta);
        },
        function(data, status) { // optional
                // failed
                return callbackError(status);
        });
    }
    };
    return listSrv;
  }])

  .factory('NotasListFactory',['$http','ApiEndpoint',function($http, ApiEndpoint){

    var list = [];
    var listStore = localStorage.getItem("list");
    if (listStore !== null && listStore !== '' && angular.isArray(angular.fromJson(listStore))) {
      list = angular.fromJson(listStore);
    }
    var listSrv = {
      setList: function(newList) {
        list = newList;
        localStorage.setItem("list", angular.toJson(list));
        return true;
      },
      getList: function() {
        if (list !== null) {
          return list;
        } else {
          return [];
        }
      },
      getNotas: function(login,tokenSessao,callback,callbackError){
//        $http.defaults.headers.post["Content-Type"] = "application/json";
        var parameter = { "login" : login,
                          "tokenSessao": tokenSessao };
//        $http.defaults.headers.post["Content-Type"] = "application/json";
        /*return $http({
            url: ApiEndpoint.url + '/notas/list',
            method: "POST",
            data: { "login" : login,
                    "tokenSessao": tokenSessao }
        })*/
        return $http.post(ApiEndpoint.url + '/notas/list', parameter, {headers: {'Content-Type': 'application/json', 'Accept': 'application/json',
                                                                                                                 'Access-Control-Allow-Origin':'*'} })
        .then(function(response) {
                var responseData =   {
                    "filter" : '',
                    "notas": response.data.data.notas,
                };
                // success
                return callback(responseData);
        },
        function(data, status) { // optional
                // failed
                return callbackError(status);
        });
      },
      findNotas: function(login,tokenSessao,findObject,callback,callbackError){
        var parameter = { "login" : login,
                          "tokenSessao": tokenSessao,
                          "cpfCnpj": findObject.cpfCnpj,
                          "numSerie": findObject.numSerie,
                          "razaoSocial": findObject.razaoSocial,
                          "tipoDocumento": findObject.tipoDocumento,
                          "numDocumento": findObject.numDocumento,
                          "data": findObject.dataNota };
        return $http.post(ApiEndpoint.url + '/notas/find', parameter, {headers: {'Content-Type': 'application/json',
                                                                                                                 'Access-Control-Allow-Origin':'*'} })
        .then(function(response) {
                var responseData =   {
                    "filter" : '',
                    "notas": response.data.data.notas,
                };
                // success
                return callback(responseData);
        },
        function(data, status) { // optional
                // failed
                return callbackError(status);
        });
      },
      newNota: function(login,tokenSessao,notaObject,callback,callbackError){
        var parameter = { "login" : login,
                          "tokenSessao": tokenSessao,
                          "cpfCnpj": notaObject.cpfCnpj,
                          "tipoDocumento": notaObject.tipoDocumento,
                          "numDocumento": notaObject.numDocumento,
                          "data": notaObject.dataNota,
                          "valor": notaObject.valor,
                          "anexo": notaObject.anexo };
        return $http.post(ApiEndpoint.url + '/notas/new', parameter, {headers: {'Content-Type': 'application/json',
                                                                                                                 'Access-Control-Allow-Origin':'*'} })
        .then(function(response) {
                var responseData =   {
                    "result" : response.data.success,
                    "message": response.data.messages,
                };
                // success
                return callback(responseData);
        },
        function(data, status) { // optional
                // failed
                return callbackError(status);
        });
      },
      reclamarNota: function(login,tokenSessao,notaObject,callback,callbackError){
        var parameter = { "login" : login,
                          "tokenSessao": tokenSessao,
                          "cpfCnpj": notaObject.cpfCnpj,
                          "tipoDocumento": notaObject.tipoDocumento,
                          "numDocumento": notaObject.numDocumento,
                          "data": notaObject.dataNota,
                          "valor": notaObject.valor,
                          "anexo": notaObject.anexo };
        return $http.post(ApiEndpoint.url + '/notas/reclamar', parameter, {headers: {'Content-Type': 'application/json',
                                                                                                                 'Access-Control-Allow-Origin':'*'} })
        .then(function(response) {
                var responseData =   {
                    "result" : response.data.success,
                    "message": response.data.messages,
                };
                // success
                return callback(responseData);
        },
        function(data, status) { // optional
                // failed
                return callbackError(status);
        });
      }
  };
    return listSrv;
  }])


  .factory('CuponsListFactory',['$http','ApiEndpoint',function($http, ApiEndpoint){

    var listSrv = {
      getCupons: function(login,tokenSessao,callback,callbackError){
        var parameter = { "login" : login,
                          "tokenSessao": tokenSessao};
        return $http.post(ApiEndpoint.url + '/cupons/list', parameter, {headers: {'Content-Type': 'application/json',
                                                                                                                 'Access-Control-Allow-Origin':'*'} })
        .then(function(response) {
                var responseData =   {
                    "filter" : '',
                    "cupons": response.data.data.cupons,
                };
                // success
                return callback(responseData);
        },
        function(data, status) { // optional
                // failed
                return callbackError(status);
        });
      }
  };
    return listSrv;
  }])

  .factory('SorteioListFactory',['$http','ApiEndpoint',function($http, ApiEndpoint){

    var listSrv = {
       getSorteios: function(login,tokenSessao,callback,callbackError){
        var parameter = { "login" : login,
                          "tokenSessao": tokenSessao};
        return $http.post(ApiEndpoint.url + '/sorteios/list', parameter, {headers: {'Content-Type': 'application/json',
                                                                                                                 'Access-Control-Allow-Origin':'*'} })
        .then(function(response) {
                var responseData =   {
                    "filter" : '',
                    "sorteios": response.data.data.sorteios,
                };
                // success
                return callback(responseData);
        },
        function(data, status) { // optional
                // failed
                return callbackError(status);
        });
    }
  };
    return listSrv;
  }])


.factory('LoginService', ['$http','ApiEndpoint', function($http, ApiEndpoint){
   return {
      /**
       * [thisUserFiles request for files belonging to this user]
       * @param  {[type]}   param
       * @param  {Function} callback
       * @return {[type]}
       */
      login : function login (cpf,password,callback,callbackError){
/*        $http.defaults.headers.post["Content-Type"] = "application/json";
        return $http({
            url: ApiEndpoint.url + '/login',
            method: "POST",
            data: { 'usuario' : cpf,
                    'senha': password }
        })*/
        var headers = {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        };
        var parameter = { "usuario" : cpf,
                          "senha": password};
        return $http.post(ApiEndpoint.url + '/login', parameter, headers)
        .then(function(data) {
                // success
                return callback(data.data.data.usuario);
        },
        function(data, status) { // optional
                // failed
                return callbackError(status);
        });
        /*return $http.post('http://webas.sefaz.pi.gov.br/npservices-homolog/login', param)
                .then(function(data) {
                  return data;
                }, function (data, status) {
                  return status;
                });*/
      }
   };
   
 }])

.factory('CadastroPFService', ['$http','ApiEndpoint', function($http, ApiEndpoint){
    var cadastroPFService = {};

    cadastroPFService.cadastro = {};

    var listSrv = {
      merge: function (value) {

         cadastroPFService.cadastro = angular.extend(cadastroPFService.cadastro, value);
      },
      get: function() {
        return cadastroPFService.cadastro;
      },
      save: function(callback,callbackError){
        var parameter = { "nome": cadastroPFService.cadastro.nome,
                          "nomeMae": cadastroPFService.cadastro.nomeMae,
                          "CPF": cadastroPFService.cadastro.CPF,
                          "dataNascimento": cadastroPFService.cadastro.dataNascimento,
                          "dddFone": cadastroPFService.cadastro.dddTelefone,
                          "telefone": cadastroPFService.cadastro.telefone,
                          "dddCelular": cadastroPFService.cadastro.dddCelular,
                          "celular": cadastroPFService.cadastro.celular,
                          "dddWhatsapp": cadastroPFService.cadastro.dddWhatsapp,
                          "whatsapp": cadastroPFService.cadastro.whatsapp,
                          "CEP": cadastroPFService.cadastro.CEP,
                          "logradouro": cadastroPFService.cadastro.logradouro,
                          "endereco": cadastroPFService.cadastro.endereco,
                          "numero": cadastroPFService.cadastro.numero,
                          "complemento": cadastroPFService.cadastro.complemento,
                          "bairro": cadastroPFService.cadastro.bairro,
                          "municipio": cadastroPFService.cadastro.municipio[0],
                          "UF": cadastroPFService.cadastro.uf,
                          "senha": cadastroPFService.cadastro.senha,
                          "confirmaSenha": cadastroPFService.cadastro.confirmaSenha,
                          "fraseSeguranca": cadastroPFService.cadastro.fraseSeguranca,
                          "lembreteSenha": cadastroPFService.cadastro.lembreteSenha };
        return $http.post(ApiEndpoint.url + '/usuarioPF/new', parameter, {headers: {'Content-Type': 'application/json',
                                                                                                                 'Access-Control-Allow-Origin':'*'} })
        .then(function(response) {
                var responseData =   {
                    "result" : response.data.success,
                    "message": response.data.messages,
                };
                // success
                return callback(responseData);
        },
        function(data, status) { // optional
                // failed
                return callbackError(status);
        });
      }
    };



    return listSrv;
}])



.factory('CadastroPJService',['$http','ApiEndpoint', function($http, ApiEndpoint){
    var cadastroPJService = {};

    cadastroPJService.cadastro = {};

    var listSrv = {
      merge: function (value) {

         cadastroPJService.cadastro = angular.extend(cadastroPJService.cadastro, value);
      },
      get: function() {
        return cadastroPJService.cadastro;
      },
      save: function(callback,callbackError){
        var parameter = { "razaoSocial": cadastroPJService.cadastro.razaoSocial,
                          "CNPJ": cadastroPJService.cadastro.CNPJ,
                          "representanteLegal": cadastroPJService.cadastro.representanteLegal,
                          "CPFrepresentante": cadastroPJService.cadastro.CPFrepresentante,
                          "dddFone": cadastroPJService.cadastro.dddTelefone,
                          "telefone": cadastroPJService.cadastro.telefone,
                          "dddCelular": cadastroPJService.cadastro.dddCelular,
                          "celular": cadastroPJService.cadastro.celular,
                          "dddWhatsapp": cadastroPJService.cadastro.dddWhatsapp,
                          "whatsapp": cadastroPJService.cadastro.whatsapp,
                          "CEP": cadastroPJService.cadastro.CEP,
                          "logradouro": cadastroPJService.cadastro.logradouro,
                          "endereco": cadastroPJService.cadastro.endereco,
                          "numero": cadastroPJService.cadastro.numero,
                          "complemento": cadastroPJService.cadastro.complemento,
                          "bairro": cadastroPJService.cadastro.bairro,
                          "municipio": cadastroPJService.cadastro.municipio[0],
                          "UF": cadastroPJService.cadastro.uf,
                          "senha": cadastroPJService.cadastro.senha,
                          "confirmaSenha": cadastroPJService.cadastro.confirmaSenha,
                          "fraseSeguranca": cadastroPJService.cadastro.fraseSeguranca,
                          "lembreteSenha": cadastroPJService.cadastro.lembreteSenha };
        return $http.post(ApiEndpoint.url + '/usuarioPJ/new', parameter, {headers: {'Content-Type': 'application/json',
                                                                                                                 'Access-Control-Allow-Origin':'*'} })
        .then(function(response) {
                var responseData =   {
                    "result" : response.data.data.status,
                    "message": response.data.data.messages,
                };
                // success
                return callback(responseData);
        },
        function(data, status) { // optional
                // failed
                return callbackError(status);
        });
      }
    };



    return listSrv;
}])

.service('BlankService', [function(){

}]);

