var app = angular.module('AppBanHang', []);
app.controller("HomeCtrl", function ($scope, $http) {
    $scope.listSanPhamMoi;
    $scope.listDanhMuc;
    $scope.LoadSanPhamMoi = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/Home/get-moi/20',
        }).then(function (response) {
            $scope.listSanPhamMoi = response.data;
            makeScript('js/main.js')
        });
    };
    $scope.LoadSanPham = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/sanpham_getall',
        }).then(function (response) {
            $scope.listSanPham = response.data;
            makeScript('js/main.js')
        });
    };

    $scope.LoadSanPham();

    $scope.addToCart = function (item) {
        var list = null;
        item.quantity = 1;       
        var list;
        if (localStorage.getItem('cart') == null) {
            list = [item];
        } else {
            list = JSON.parse(localStorage.getItem('cart')) || [];
            let ok = true;
            for (let x of list) {
                if (x.maSanPham == item.maSanPham) {
                    x.quantity += 1;
                    ok = false;
                    break;
                }
            }
            if (ok) {
                list.push(item);
            }
        }
        localStorage.setItem('cart', JSON.stringify(list));
        alert("Đã thêm giỏ hàng thành công!");
    }

    // $scope.LoadDanhMuc();
    $scope.LoadSanPhamMoi();
});

