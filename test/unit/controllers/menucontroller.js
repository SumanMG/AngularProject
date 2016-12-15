describe('Controller: MenuController', function () {

  // load the controller's module
  beforeEach(module('confusionApp'));
    
    beforeEach(module(function ($urlRouterProvider) {

$urlRouterProvider.otherwise(function(){return false;});

}));

  var MenuController, scope, $httpBackend;
    
      // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$httpBackend_,  $rootScope, menuFactory) {

          // place here mocked dependencies
      $httpBackend = _$httpBackend_;

      $httpBackend.expectGET("http://localhost:3000/products").respond([
        {
      "id": 0,
      "name": "Product1",
      "image": "images/product.png",
      "category": "mains",
      "label": "Hot",
      "price": "4.99",
      "description": "A",
      "comments":[{}]
      },
      {
      "id": 1,
      "name": "Product2",
      "image": "images/product.png",
      "category": "mains",
      "label": "New",
      "price": "4.99",
      "description": "A",
      "comments":[{}]
      }
      ]);

    scope = $rootScope.$new();
    MenuController = $controller('MenuController', {
      $scope: scope, menuFactory: menuFactory
    });
            $httpBackend.flush();

  }));
    
    it('should have showDetails as false', function () {

    expect(scope.showDetails).toBeFalsy();

  });

  it('should create "products" with 2 products fetched from xhr', function(){

      expect(scope.showMenu).toBeTruthy();
      expect(scope.products).toBeDefined();
      expect(scope.products.length).toBe(2);

  });

  it('should have the correct data order in the products', function() {

      expect(scope.products[0].name).toBe("Product");
      expect(scope.products[1].label).toBe("New");

  });

  it('should change the tab selected based on tab clicked', function(){

      expect(scope.tab).toEqual(1);

      scope.select(3);

      expect(scope.tab).toEqual(3);
      expect(scope.filtText).toEqual('mains');

  });

});