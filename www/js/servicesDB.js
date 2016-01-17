angular.module('app.servicesDB', [])


.factory('PouchDB', [function () {
      return new PouchDB('offline');
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
  }]);

