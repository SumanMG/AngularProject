'use strict';

angular.module('msApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails =false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
           
           menuFactory.getProducts().query(
                                function(response) {
                    $scope.products = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "category2";
                }
                else if (setTab === 3) {
                    $scope.filtText = "category1";
                }
                else if (setTab === 4) {
                    $scope.filtText = "category3";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope','feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                   feedbackFactory.getFeedback().save({id:$scope.feedback.id},$scope.feedback);
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }

            };
        }])

        .controller('ProductDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            
            $scope.product = {};
            $scope.showProdcut = false;
            $scope.message="Loading ...";
                        $scope.product = menuFactory.getProducts().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.product = response;
                                $scope.showProdcut = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
        }])

        .controller('ProductCommentController', ['$scope','menuFactory', function($scope,menuFactory) {
            
            $scope.newComment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                                $scope.newComment.date = new Date().toISOString();
                console.log($scope.newComment);
                                $scope.product.comments.push($scope.newComment);

                menuFactory.getProducts().update({id:$scope.product.id},$scope.product);
                                $scope.commentsForm.$setPristine();
                                $scope.newComment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory){

                        $scope.showProdcut = false;
                        $scope.message="Loading ...";
                        $scope.product = menuFactory.getProducts().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.product = response;
                                $scope.showProdcut = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
                        
                        $scope.showPromotion = false;
                        $scope.promotion = menuFactory.getPromotion().get({id:0})
                        .$promise.then(
                        
                        function(response){
                            $scope.promotion = response;
                            $scope.showPromotion = true;
                        },
                            function(response){
                                $scope.message = "Error: "+ response.status + " "+ response.statusText;
                            }
                        );
                        
                        $scope.showLeader = false;
                        $scope.leader = corporateFactory.getLeaders().get({id:1})
                        .$promise.then(
                            function(response){
                                $scope.leader = response;
                                $scope.showLeader = true;
                            },
                            function(response){
                                $scope.message = "Error: "+response.status+ " "+ response.statusText;
                            }
                        
                        );
                         
    }])
    
    .controller('AboutController', ['$scope','corporateFactory', function($scope, corporateFactory ){
        
        $scope.showLeader = false;
        $scope.message="Loading ...";
        
    corporateFactory.getLeaders().query(
         function(response) {             
                    $scope.leadership = response;
                    $scope.showLeader = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
        
    }])


;
