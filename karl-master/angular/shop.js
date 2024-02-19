var app = angular.module('AppBanHang', []);
app.filter("formatCurrencyVND", function () {
    return function (input) {
        input = input * 1000;
        console.log(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(input) );
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(input) ;
    }
});
app.controller("ShopCtrl", function ($scope, $http) {

                $scope.numberProduct = 12;
            $http({
                url: current_url + '/api/SanPham/sanpham_getall',
                method: "GET"
            }).then(function (res) {
    
                $scope.productcategory = res.data;
                $scope.productcategory = $scope.productcategory.slice(0, $scope.numberProduct);
                console.log($scope.productcategory)
    
            });                       
            $scope.LoadMoreProduct = LoadMoreProduct;
            
            function LoadMoreProduct() {
                $scope.numberProduct += 3;
                $http({
                    url: current_url + '/api/SanPham/sanpham_getall',
                    method: "GET"
                }).then(function (res) {
    
                    $scope.productcategory = res.data;
                    $scope.productcategory = $scope.productcategory.slice(0, $scope.numberProduct);
                    console.log($scope.productcategory)
    
                });         
                console.log($scope.numberProduct)
            }
    

    // $scope.LoadLoaiSanPham = function () {
    //     $http({
    //         method: 'GET',
    //         url: current_url + '/api/LoaiSanPham/sanpham_getall',
    //     }).then(function (response) {
    //         $scope.listLoaiSanPham = response.data;
            
    //     });
    // };
    // $scope.LoadLoaiSanPham();

    $scope.LoadLoaiSanPham = LoadLoaiSanPham;

    function LoadLoaiSanPham() {
        
        $http({
            url: current_url + '/api/LoaiSanPham/sanpham_getall',
            method: "GET"
        }).then(function (res) {
            $scope.listLoaiSanPham = response.data;
            console.log($scope.listLoaiSanPham)

        });
    }
    
    $scope.LoadSanPham = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/sanpham_getall',
        }).then(function (response) {
            $scope.listSanPham = response.data;
            
        });
    };

    $scope.LoadSanPham();

    $scope.productbycategory = productbycategory;
    function productbycategory(id) {
            
        $http({
            url: current_url + '/api/SanPham/sanpham_getallloai?id=' + id,
            method: "GET"
        }).then(function (res) {
            $scope.productcategory = res.data;
            $scope.productcategory = $scope.productcategory.slice(0, $scope.numberProduct);
            console.log($scope.productcategory)

        });
    }


    $scope.productall = productall;

    function productall() {
        $scope.numberProduct = 9;
        $http({
            url: current_url + '/api/SanPham/sanpham_getall',
            method: "GET"
        }).then(function (res) {
            $scope.productcategory = res.data;
            $scope.productcategory = $scope.productcategory.slice(0, $scope.numberProduct);
            console.log($scope.productcategory)

        });
    }

    $scope.productall();
   

    $scope.addToCart = function (item) {
        // var list = null;
        item.soluong = 1;       
        var list;
        if (localStorage.getItem('cart') == null) {
            list = [item];
        } else {
            list = JSON.parse(localStorage.getItem('cart')) || [];
            let ok = true;
            for (let sp of list) {
                if (sp.sanpham_id == item.sanpham_id) {
                    sp.soluong += 1;
                    ok = false;
                    break;
                }
            }
            if (ok) {
                list.push(item);
            }
        }
        localStorage.setItem('cart', JSON.stringify(list));
        localStorage.setItem('lastAddedProduct', JSON.stringify(item));
        alert("Đã thêm giỏ hàng thành công!");
    }

   
      

   
        // Initialize an empty cart
        $scope.cart = [];


        $scope.TimKiemSanPham = function () {
            var searchName = $scope.searchName;
            var minPrice = $scope.minPrice;
            var maxPrice = $scope.maxPrice;
            
            var params = {
            ten: searchName,
            gia1: minPrice,
            gia2: maxPrice
            };
            
            $http({
            method: 'GET',
            url: current_url + '/api/SanPham/SearchProducts',
            params: params
            }).then(function (response) {
            $scope.productcategory = response.data;
            console.log($scope.productcategory);
            }, function (error) {
            console.error('Error:', error);
            });
            };
          
    
});


