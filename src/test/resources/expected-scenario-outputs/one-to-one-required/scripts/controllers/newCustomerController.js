
angular.module('test').controller('NewCustomerController', function ($scope, $location, locationParser, CustomerResource , AddressResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.customer = $scope.customer || {};
    
    $scope.shippingAddressList = AddressResource.queryAll(function(items){
        $scope.shippingAddressSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("shippingAddressSelection", function(selection) {
        if ( typeof selection != 'undefined') {
            $scope.customer.shippingAddress = {};
            $scope.customer.shippingAddress.id = selection.value;
        }
    });
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            $location.path('/Customers/edit/' + id);
            $scope.displayError = false;
        };
        var errorCallback = function() {
            $scope.displayError = true;
        };
        CustomerResource.save($scope.customer, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Customers");
    };
});