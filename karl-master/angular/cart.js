var app = angular.module('AppBanHang', []);
app.filter("formatCurrencyVND", function () {
    return function (input) {
        input = input * 1000;
        console.log(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(input) );
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(input) ;
    }
});
app.controller("HomeCtrl", function ($scope, $http) {
    var carts = JSON.parse(localStorage.getItem('cart'));

    $scope.loaddata = function (){
        $scope.cart = carts;
        console.log($scope.cart);
    }
    $scope.loaddata();
    
    // $scope.removeFromCart = function(product) {
    //     var index = $scope.cart.indexOf(product);
    //     if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
    //       $scope.cart.splice(index, 1);
    //     }
    // };
    $scope.removeFromCart = function(product) {
        var index = $scope.cart.indexOf(product);
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
          $scope.cart.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify($scope.cart));
        }
      };
      
      $scope.totalPrice = function() {
        var total = 0;
        for (var i = 0; i < $scope.cart.length; i++) {
          total += $scope.cart[i].gia*$scope.cart[i].soluong;
        }
        return total;
      };

      $scope.removeAllFromCart = function() {
        if (confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?")) {
          $scope.cart.splice(0, $scope.cart.length);
          localStorage.removeItem('cart'); // nếu sử dụng Local Storage
        }
      };
      $scope.updateCart = function(product) {
        localStorage.setItem('cart', JSON.stringify($scope.cart)); // Lưu giỏ hàng vào Local Storage
      
        // Tính lại tổng giá trị giỏ hàng
        $scope.totalPrice();
      
        // Cập nhật dữ liệu giỏ hàng
        // Tìm sản phẩm trong giỏ hàng và cập nhật số lượng
        var existingProduct = $scope.cart.find(function(item) {
          return item.sanpham_id === product.sanpham_id;
        });
      
        if (existingProduct) {
          existingProduct.soluong = product.soluong;
        }
      
        localStorage.setItem('cart', JSON.stringify($scope.cart)); // Lưu giỏ hàng đã cập nhật vào Local Storage
      };
      
     

      

      
      
            
    
});


