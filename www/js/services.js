angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])
  
  .factory('ContaCorrenteListFactory',['$http',function($http){

    var listSrv = {
      getContaCorrente: function(login,tokenSessao,callback){
        $http.defaults.headers.post["Content-Type"] = "application/json";
        return $http({
            url: 'http://webas.sefaz.pi.gov.br/npservices/contaCorrente',
            method: "POST",
            data: { 'login' : login,
                    'tokenSessao': tokenSessao }
        })
        .then(function(data) {
                // success
                return callback(data.data.data.conta);
        },
        function(data, status) { // optional
                // failed
                return status;
        });
/*    var data =   {
		nome:'João da Silva',
		dataUltimoAcesso:'20/11/2015',
		saldo:'R$ 165,00',
		lancamentosFuturos:'R$ 75,00',
    itensConta:[
      { title: 'Créditos Liberados', value:'R$ 100,00' },
      { title: 'Créditos Doados', value:'R$ 90,00' },
      { title: 'Créditos Sorteio', value:'R$ 30,00' },
      { title: 'Estorno Conta Bancária', value:'R$ 0,00' },
      { title: 'Desbloqueio ICMS', value:'R$ 10,00' },
      { title: 'Débitos Transferência', value:'R$ 40,00' },
      { title: 'Débitos Doação', value:'R$ 5,00' },
      { title: 'Saldo Créditos Liberados', value:'R$ 165,00' }
    ]

	};
		return data;*/
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
      getNotas: function(login,tokenSessao,callback){
        $http.defaults.headers.post["Content-Type"] = "application/json";
        return $http({
            url: 'http://webas.sefaz.pi.gov.br/npservices/notas/list',
            method: "POST",
            data: { 'login' : login,
                    'tokenSessao': tokenSessao }
        })
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
                return status;
        });
      }
  };
    return listSrv;
  }])


  .factory('CuponsListFactory',['$http',function($http){

    var listSrv = {
      getCupons: function(login,tokenSessao,callback){
        $http.defaults.headers.post["Content-Type"] = "application/json";
        return $http({
            url: 'http://webas.sefaz.pi.gov.br/npservices/cupons/list',
            method: "POST",
            data: { 'login' : login,
                    'tokenSessao': tokenSessao }
        })
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
                return status;
        });
      }
  };
    return listSrv;
  }])

  .factory('SorteioListFactory',['$http',function($http){

    var listSrv = {
       getSorteios: function(login,tokenSessao,callback){
        $http.defaults.headers.post["Content-Type"] = "application/json";
        return $http({
            url: 'http://webas.sefaz.pi.gov.br/npservices/sorteios/list',
            method: "POST",
            data: { 'login' : login,
                    'tokenSessao': tokenSessao }
        })
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
                return status;
        });
    }
  };
    return listSrv;
  }])


.factory('PouchDB', [function () {
      return new PouchDB('offline');
}])


.factory('appDBBridge', [
    '$q',
    '$injector',
    'PouchDB',
    function (Q, $injector, PouchDB) {
    return {
      /**
       * returns a document saved in the db
       * @param  {[type]} query          [description]
       * @param  {[type]} collectionName Usually a string which should be a dot-notation representation
       * of the serice/factory name and the method to call.
       * @return {[type]}                Promise
       */
      selectOneDoc: function selectOneDoc (query, collectionName) {
          collectionName = _.kebabCase(collectionName);
          var q = Q.defer(), docid = '';
          if (query.id || query._id) {
            docid = query.id || query._id;
          }

          //query
          PouchDB.get(collectionName + docid)
          .then(function (doc) {
            //return the first result.
            q.resolve(doc);

          }, function (err) {
            //if the document isnt found,
            //i use a resolve so the state
            //transitions successfully allowing the
            //controllers to initialize. we can call
            //for data from the server in our controller
            //which will update our db for subsequent
            //queries.
            if (err.status === 404) {
              q.resolve(null);
            } else {
              q.reject(err);
            }
          })
          .catch(function (err) {
            console.log(err);
            q.reject(err);
          });

          return q.promise;
      },
      /**
       * invokes a angularjs module service or factory method, using
       * the $injector service .get method and passing arguments with
       * .apply()
       * @param  {[type]} serviceMethod expects a string with dot-notation,
       * which is the name of the service / factory and the method it should
       * execute.
       * @param  {[type]} args          arguments to be passed to the factory
       * @return {[type]}               [description]
       */
      callServiceMethod: function callServiceMethod (serviceMethod, args) {
        var $_service;
        var service_name = serviceMethod.split('.')[0];
        var service_method = serviceMethod.split('.')[1];
        $_service = $_service || $injector.get(service_name);
        return $_service[service_method].apply(null, args);
      },
      fetchAndSyncDataToScope: function fetchAndSyncDataToScope (docId, serviceMethod, args) {
          // var q = Q.defer();
          var self = this;

          //check for data if docId is supplied
          //fetch data using the service and argument, callServiceMethod.
          //this expects a thennable promise is returned.
          return self.callServiceMethod(serviceMethod, args)
                .then(function(returnedDoc) {
                    var q = Q.defer();

                    //there's a chance our result is a $http promise object.
                    //which means the data we need is on the .data property
                    if (returnedDoc) {
                      var saveThisDoc = returnedDoc.data || returnedDoc;
                      // var service_name = serviceMethod.split('.')[0];
                      if (_.isArray(saveThisDoc)) {
                        saveThisDoc = self.prepArraytoObject(saveThisDoc);
                      }
                      return self.updateDBCollection(serviceMethod, saveThisDoc);
                    }
                    q.reject(new Error('no document fetched'));
                    return q.promise;
                });
                // .then(self.syncScope(), function (err) {
                //   return q.reject(err);
                // })
                // .catch(function (err) {
                //   return q.reject(err);
                // });


          // //might not come this far,
          // //fallback promise
          // return q.promise;
      },
      updateDBCollection: function updateDBCollection (collectionName, doc, upsert) {
          var q = Q.defer(),
              docid = '',
              self = this;
          collectionName = _.kebabCase(collectionName);
          if (doc.id || doc._id) {
            docid = doc.id || doc._id;
            doc.remoteid = docid;
          }

          function retryUntilWritten(doc) {

              return PouchDB.put(doc)
              .catch(function (err) {
                if (err.status === 409) {
                  return retryUntilWritten(doc);
                } else { // new doc
                  return PouchDB.put(doc);
                }
              });
          }

          //find the update
          self.selectOneDoc(doc, collectionName)
          .then(function (foundDoc) {
            //create a new entry
            if (upsert || !foundDoc) {
              doc._id = collectionName + docid;
            }
            if (foundDoc){
            //using lodash omit to remove the _id
              doc._id = foundDoc._id;
              doc._rev = foundDoc._rev;
            }

            // console.log(JSON.stringify(doc));
            // return PouchDB.put(doc);
            return retryUntilWritten(doc, foundDoc);
          })

          .then(function () {
            q.resolve(doc);
          }, function (err) {
            // i use a resolve here, its kind of a fail safe,
            // since pouchdb gets to throw errors
            // reject promise when there are document conflicts
            console.log(err);
            q.resolve(doc);
          })
          .catch(function (errFindnDoc) {
            console.log(errFindnDoc);
            q.resolve(doc);
          });

          return q.promise;
      },
      /**
       * converts an array to an object that can be saved
       * using PouchDB. each or
       * @param  {[type]} queueData array containing values to be saved.
       * @return {[type]}           [description]
       */
      prepArraytoObject:  function prepArraytoObject (queueData) {
        var endObject = {};
        for (var i = queueData.length - 1; i >= 0; i--) {
          endObject[i] = queueData[i];
        }
        return endObject;
      },
      prepObjectToArray: function prepObjectToArray (queueObject, iterator) {
        var endArray = [], values = _.values(queueObject);
        for (var i = values.length - 1; i >= 0; i--) {
          endArray.push(iterator(values[i]));
        }
        return endArray;
      }

    };
  }])


.factory('LoginService', ['$http', function($http){
   return {
      /**
       * [thisUserFiles request for files belonging to this user]
       * @param  {[type]}   param
       * @param  {Function} callback
       * @return {[type]}
       */
      login : function login (cpf,password,callback){
        $http.defaults.headers.post["Content-Type"] = "application/json";
        return $http({
            url: 'http://webas.sefaz.pi.gov.br/npservices/login',
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
                return status;
        });
        /*return $http.post('http://webas.sefaz.pi.gov.br/npservices/login', param)
                .then(function(data) {
                  return data;
                }, function (data, status) {
                  return status;
                });*/
      }
   };
   
 }])

.service('sessionService', ['$cookieStore', function ($cookieStore) {
    var localStoreAvailable = typeof (Storage) !== "undefined";
    this.store = function (name, details) {
        if (localStoreAvailable) {
            if (angular.isUndefined(details)) {
                details = null;
            } else if (angular.isObject(details) || angular.isArray(details) || angular.isNumber(+details || details)) {
                details = angular.toJson(details);
            }
            sessionStorage.setItem(name, details);
        } else {
            $cookieStore.put(name, details);
        }
    };

    this.persist = function(name, details) {
        if (localStoreAvailable) {
            if (angular.isUndefined(details)) {
                details = null;
            } else if (angular.isObject(details) || angular.isArray(details) || angular.isNumber(+details || details)) {
                details = angular.toJson(details);
            }
            localStorage.setItem(name, details);
        } else {
            $cookieStore.put(name, details);
        }
    };

    this.get = function (name) {
        if (localStoreAvailable) {
            return getItem(name);
        } else {
            return $cookieStore.get(name);
        }
    };

    this.destroy = function (name) {
        if (localStoreAvailable) {
            localStorage.removeItem(name);
            sessionStorage.removeItem(name);
        } else {
            $cookieStore.remove(name);
        }
    };

    var getItem = function (name) {
        var data;
        var localData = localStorage.getItem(name);
        var sessionData = sessionStorage.getItem(name);

        if (sessionData) {
            data = sessionData;
        } else if (localData) {
            data = localData;
        } else {
            return null;
        }

        if (data === '[object Object]') { return null; }
        if (!data.length || data === 'null') { return null; }

        if (data.charAt(0) === "{" || data.charAt(0) === "[" || angular.isNumber(data)) {
            return angular.fromJson(data);
        }

        return data;
    };

    return this;
}])


.service('BlankService', [function(){

}]);

