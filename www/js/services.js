angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])
  
  .factory('ContaCorrenteListFactory',['$http',function($http){

    var listSrv = {
      getContaCorrente: function(){ 
/*	    return $http.get("path/to/resource").then(function(response){
	        people = response;
	        return response;
	    });*/
  		var data =   {
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
		return data;		
    }
  };  
    return listSrv;
  }])

  .factory('NotasListFactory',['$http',function($http){

    var list = [];
    var listStore = localStorage.getItem("list");
    if (listStore != null && listStore != '' && angular.isArray(angular.fromJson(listStore))) {
      list = angular.fromJson(listStore);
    }
    var listSrv = {
      setList: function(newList) {
        list = newList;
        localStorage.setItem("list", angular.toJson(list));
        return true;
      },
      getList: function() {
        if (list != null) {
          return list;
        } else {
          return [];
        }
      },
      getNotas: function(){ 
	    return $http.get("http://localhost:3000/notas").then(function(response){
	  		var data =   {
				    "filter" : '',
				    "notas": response.data,
				};
	        return data;
	    });
  		/*var data =   {
				    "filter" : '',
				    "notas": [
				      {
				        type : "01L",
				        title : "Supermercado A",
				        date : "12/11/2015",
				        value : "R$ 80,00",
				        status : "Lançada"
				      },
				      {
				        type : "01L",
				        title : "Supermercado B",
				        date : "13/11/2015",
				        value : "R$ 55,12",
				        status : "Lançada"
				      },
				      {
				        type : "02P",
				        title : "Farmácia",
				        date : "13/11/2015",
				        value : "R$ 80,00",
				        status : "Pendente"
				      },
				      {
				        type : "01L",
				        title : "Posto de gasolina",
				        date : "14/11/2015",
				        value : "R$ 120,00",
				        status : "Lançada"
				      },
				      {
				        type : "02P",
				        title : "Restaurante",
				        date : "12/11/2015",
				        value : "R$ 90,00",
				        status : "Pendente"
				      },
				      {
				        type : "02P",
				        title : "Supermercado C",
				        date : "12/11/2015",
				        value : "R$ 87,00",
				        status : "Pendente"
				      },
				      {
				        type : "01L",
				        title : "Posto de gasolina",
				        date : "15/11/2015",
				        value : "R$ 50,00",
				        status : "Lançada"
				      },
				    ]
				};
		return data;*/		
    }
  };  
    return listSrv;
  }])


.factory('NotasList', ['$http', function($http){
   return {
      /**
       * [thisUserFiles request for files belonging to this user]
       * @param  {[type]}   param
       * @param  {Function} callback
       * @return {[type]}
       */
      getNotas : function getNotas (param){
        return $http.get('http://localhost:3000/notas', param)
                .then(function(data) {
                  return data;
                }, function (data, status) {
                  return status;
                });
      }     
   }
   
 }])

  .factory('CuponsListFactory',['$http',function($http){

    var listSrv = {
      getCupons: function(){ 
/*	    return $http.get("path/to/resource").then(function(response){
	        people = response;
	        return response;
	    });*/
  		var data =   {
				    "filter" : '',
				    "cupons": [
				      {
				        id : "9187836786786378682",
				        date : "12/11/2015",
				        status : "Expirado"
				      },
				      {
				        id : "9187836786786378683",
				        date : "13/11/2015",
				        status : "Válido"
				      },
				      {
				        id : "9187836786786378684",
				        date : "13/11/2015",
				        status : "Expirado"
				      },
				      {
				        id : "9187836786786378685",
				        date : "14/11/2015",
				        status : "Válido"
				      },
				      {
				        id : "9187836786786378686",
				        date : "12/11/2015",
				        status : "Válido"
				      }
				    ]
				};
		return data;		
    }
  };  
    return listSrv;
  }])

  .factory('SorteioListFactory',['$http',function($http){

    var listSrv = {
      getSorteios: function(){ 
/*	    return $http.get("path/to/resource").then(function(response){
	        people = response;
	        return response;
	    });*/
  		var data =  {
					  success: true,
					  data:{
					    "filter" : '',
					    "sorteios": [
					      {
					        id : "9187836786786378682",
					        date : "12/11/2015",
					        value : "R$ 100.000,00",
					        status : "Realizado"
					      },
					      {
					        id : "9187836786786378683",
					        date : "13/11/2015",
					        value : "R$ 100.000,00",
					        status : "A Realizar"
					      },
					      {
					        id : "9187836786786378684",
					        date : "13/11/2015",
					        value : "R$ 200.000,00",
					        status : "Realizado"
					      },
					      {
					        id : "9187836786786378685",
					        date : "14/11/2015",
					        value : "R$ 100.000,00",
					        status : "Realizado"
					      },
					      {
					        serie : "9187836786786378686",
					        date : "12/11/2015",
					        value : "R$ 100.000,00",
					        status : "Realizado"
					      }
					    ]
					}
				};
		return data;		
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

.service('BlankService', [function(){

}]);

