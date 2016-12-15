'use strict';

angular.module('msApp')
        .constant("baseURL", "http://localhost:3000/")

        .service('menuFactory',['$resource','baseURL', function($resource, baseURL) {
    
               
            this.getProducts = function(){
                    
                return $resource(baseURL+"products/:id",null,  {'update':{method:'PUT' }});
                
            };
                // implement a function named getPromotion
                // that returns a selected promotion.
                this.getPromotion = function(){
                    
                    return $resource(baseURL +"promotions/:id", null, {'update':{method: 'PUT'}});
                };
                        
        }])

        .service('corporateFactory',['$resource', 'baseURL', function($resource, baseURL) {
     
        this.getLeaders = function (){

                return $resource(baseURL+"leadership/:id", null, {'update':{method: 'PUT' }});
            }
            
        }])

        .service('feedbackFactory', ['$resource', 'baseURL',function($resource, baseURL){
            
            this.getFeedback = function(){
                
                return $resource(baseURL+"feedback/:id", null,{'update':{method: 'PUT'}});
            }
        }])
;
