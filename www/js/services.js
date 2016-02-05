angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])
  
  .factory('ContaCorrenteListFactory',['$http',function($http){

    var listSrv = {
      getContaCorrente: function(loginP,tokenSessaoP,callback,callbackError){
//        $http.defaults.headers.post["Content-Type"] = "application/json";
        var parameter = { "login" : loginP,
                          "tokenSessao": tokenSessaoP };
        return $http.post('http://webas.sefaz.pi.gov.br/npservices-homolog/contaCorrente', parameter, {headers: {'Content-Type': 'application/json'} })
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

  .factory('NotasListFactory',['$http',function($http){

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
        return $http.post('http://webas.sefaz.pi.gov.br/npservices-homolog/notas/list', parameter, {headers: {'Content-Type': 'application/json'} })
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
        return $http.post('http://webas.sefaz.pi.gov.br/npservices-homolog/notas/find', parameter, {headers: {'Content-Type': 'application/json'} })
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
      }
  };
    return listSrv;
  }])


  .factory('CuponsListFactory',['$http',function($http){

    var listSrv = {
      getCupons: function(login,tokenSessao,callback,callbackError){
        var parameter = { "login" : login,
                          "tokenSessao": tokenSessao};
        return $http.post('http://webas.sefaz.pi.gov.br/npservices-homolog/cupons/list', parameter, {headers: {'Content-Type': 'application/json'} })
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

  .factory('SorteioListFactory',['$http',function($http){

    var listSrv = {
       getSorteios: function(login,tokenSessao,callback,callbackError){
        var parameter = { "login" : login,
                          "tokenSessao": tokenSessao};
        return $http.post('http://webas.sefaz.pi.gov.br/npservices-homolog/sorteios/list', parameter, {headers: {'Content-Type': 'application/json'} })
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


.factory('LoginService', ['$http', function($http){
   return {
      /**
       * [thisUserFiles request for files belonging to this user]
       * @param  {[type]}   param
       * @param  {Function} callback
       * @return {[type]}
       */
      login : function login (cpf,password,callback,callbackError){
        $http.defaults.headers.post["Content-Type"] = "application/json";
        return $http({
            url: 'http://webas.sefaz.pi.gov.br/npservices-homolog/login',
            method: "POST",
            data: { 'usuario' : cpf,
                    'senha': password }
        })
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

.factory('CadastroPFService', ['$http', function($http){
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
        return $http.post('http://webas.sefaz.pi.gov.br/npservices-homolog/usuarioPF/new', parameter, {headers: {'Content-Type': 'application/json',
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



.factory('CadastroPJService',['$http', function($http){
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
        return $http.post('http://webas.sefaz.pi.gov.br/npservices-homolog/usuarioPJ/new', parameter, {headers: {'Content-Type': 'application/json',
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

