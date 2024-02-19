        var app = angular.module('AppBanHang', []);
        app.filter("formatCurrencyVND", function () {
            return function (input) {
                input = input * 1000;
                console.log(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(input) );
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(input) ;
            }
        });
        app.controller("HomeCtrl", function ($scope, $http) {
            $scope.listSanPhamMoi;
            $scope.listDanhMuc;

            // $scope.LoadLoaiSanPham = function () {
            //     $http({
            //         method: 'GET',
            //         url: current_url + '/api/LoaiSanPham/sanpham_getall',
            //     }).then(function (response) {
            //         $scope.listLoaiSanPham = response.data;
                    
            //     });
            // };
            // $scope.LoadLoaiSanPham();
            // 
            $scope.LoadSanPham = function () {
                $http({
                    method: 'GET',
                    url: current_url + '/sp',
                }).then(function (response) {
                    $scope.listSanPham = response.data;
                    
                });
            };

            $scope.LoadSanPham();

            $scope.productbycategory = productbycategory;
            function productbycategory(id) {
                    
                $http({
                    url: current_url + '/api/SanPham/sanpham_getbyid?id=' + id,
                    method: "GET"
                }).then(function (res) {
                    $scope.productcategory = res.data;                 
                    console.log($scope.productcategory)
        
                });
            }

            $scope.productall = productall;

            function productall() {
                $scope.numberProduct = 9;
                $http({
                    url: current_url + '/sp',
                    method: "GET"
                }).then(function (res) {
                    $scope.productcategory = res.data;
                    $scope.productcategory = $scope.productcategory.slice(0, $scope.numberProduct);
                    console.log($scope.productcategory)

                });
            }

            $scope.productall();

            $scope.sanphambybanchay = sanphambybanchay;
            function sanphambybanchay(id) {                
                $http({
                    url: current_url + '/api/SanPham/SanPhamBanChay?id=' + id,
                    method: "GET"
                }).then(function (res) {
                    $scope.sanphambybanchay = res.data;                 
                    console.log($scope.sanphambybanchay)
        
                });
            }
            $scope.sanphambybanchay(3);

            $scope.sanphambymoive = sanphambymoive;
            function sanphambymoive(id) {                
                $http({
                    url: current_url + '/api/SanPham/GetSanPhamMoiVe?id=' + id,
                    method: "GET"
                }).then(function (res) {
                    $scope.sanphambymoive = res.data;                 
                    console.log($scope.sanphambymoive)
        
                });
            }
            $scope.sanphambymoive(10);

            $scope.sanphambyview = sanphambyview;
            function sanphambyview(id) {                
                $http({
                    url: current_url + '/api/SanPham/GetSanPhamByViewCount?id=' + id,
                    method: "GET"
                }).then(function (res) {
                    $scope.sanphambyview = res.data;                 
                    console.log($scope.sanphambyview)
        
                });
            }
            $scope.sanphambyview(60);

            $scope.sanpham;  
            $scope.LoadSanPhambyID = function () { 
                var key = 'id';
                var value = window.location.search.substring(window.location.search.indexOf(key) + key.length + 1);		 
                $http({
                    method: 'GET', 
                    url: current_url + '/api/SanPham/sanpham_getbyid?id=' + value,
                }).then(function (response) { 
                    $scope.sanpham = response.data;
            
                    // Gọi API để tăng ViewCount lên 1
                    $http({
                        method: 'GET',  // Sử dụng HTTP POST
                        url: current_url + '/api/SanPham/sanpham_updateviewcount?id='+ value,  // Địa chỉ API của sanpham_updateviewcount
                        // data: { Sanpham_id: value }  // Dữ liệu truyền vào là id của sản phẩm
                    }).then(function (response) {
                        // Khi gọi API thành công, bạn có thể xử lý kết quả trả về ở đây (nếu cần)
                    }, function (error) {
                        // Xử lý lỗi nếu có
                    });
            
                    // makeScript('js/main.js')
                });
            };
            
            // $scope.LoadSanPhambyID = function () { 
            //     var key = 'id';
            //     var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);		 
            //     $http({
            //         method: 'GET', 
            //         url: current_url + '/api/SanPham/sanpham_getbyid?id='  +value,
            //     }).then(function (response) { 
            //         $scope.sanpham = response.data;
            //         // makeScript('js/main.js')
            //     });
            // };  

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
              
                // Add to cart function
                // $scope.addToCart = function(product) {
                //   // Check if product already exists in cart
                //   var existingProduct = $scope.cart.find(function(item) {
                //     return item.sanpham_id === product.sanpham_id;
                //   });
              
                //   if (existingProduct) {
                //     // Increment the quantity if product already exists
                //     existingProduct.quantity++;
                //   } else {
                //     // Add product to cart if it does not exist
                //     product.quantity = 1;
                //     $scope.cart.push(product);
                //     console.log('Thêm sản phẩm vào giỏ hàng:', product);
                //   }
                // };
              
              
        

          

            // $scope.LoadDanhMuc();
            // $scope.LoadSanPhamMoi();

            
        });


