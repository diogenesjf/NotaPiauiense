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
/*	    return $http.get("path/to/resource").then(function(response){
	        people = response;
	        return response;
	    });*/
  		var data =   {
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
		return data;		
    }
  };  
    return listSrv;
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

.service('BlankService', [function(){

}]);
