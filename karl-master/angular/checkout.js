var app = angular.module('AppBanHang', []);
app.filter("formatCurrencyVND", function () {
    return function (input) {
        input = input * 1000;
        console.log(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(input) );
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(input) ;
    }
});
app.controller('HomeCtrl', function($scope, $http) {  
    var carts = JSON.parse(localStorage.getItem('cart'));
    $scope.totalPrice = function() {
      var total = 0;
      for (var i = 0; i < $scope.cart.length; i++) {
        total += $scope.cart[i].gia*$scope.cart[i].soluong;
      }
      return total;
    };
    $scope.loaddata = function (){
      $scope.cart = carts;
      console.log($scope.cart);
    };
    
    $scope.loaddata();
//  $scope.addData = function () {
//       var totalTongtien = 0; // Biến trung gian để tính tổng tiền
    
//       // Tính tổng tiền và tạo đối tượng cho Sanphamjson
//       var sanphamjson = $scope.cart.map(function(item) {
//         var tongtien = item.gia * item.soluong;
//         totalTongtien += tongtien; // Cộng tổng tiền
//         return {
//           Sanpham_id: item.sanpham_id,
//           Tensanpham: item.tensanpham,
//           Anh: item.anh,
//           Gia: item.gia,
//           Soluong: item.soluong,
//           Tongtien: tongtien
//         };
//       });
    
//       var currentDate = new Date();
//       var isoDateString = currentDate.toISOString();
    
//       var dataRequest = {
//         // Khachhang_id: $scope.Khachhang_id,
//         Hoten: $scope.Hoten,
//         Sdt: $scope.Sdt,
//         Email: $scope.Email,
//         Diachi: $scope.Diachi,
//         Ngaydat: isoDateString,
//         Tongtien: totalTongtien, // Gán tổng tiền cho Tongtien
    
//         Sanphamjson: sanphamjson
//       };
    
//       console.log(dataRequest); 
//     $http({
//       method: 'POST',
//       url: current_url + '/api/DonHang/DonHang_create',
//       data: dataRequest,
//     }).then(function (res) {
//       console.log(res);
//       if (res.data.msg == false) {
//         alert("Lỗi thêm bản ghi");
//       } else {
//         alert("Thêm bản ghi thành công");
        
//         // Truy vấn đơn hàng để lấy donhang_id
//         $http({
//           method: 'GET',
//           url: current_url + '/api/DonHang/DonHang_getbyid?id=' + res.data.donhang_id,
//         }).then(function (res) {
//           console.log(res);
//           var donhangId = res.data.donhang_id;
//           // Gọi API /api/SanPham/ThanhToanDonHang để cập nhật số lượng sản phẩm trong bảng SanPham
//           $http({
//             method: 'GET',
//             url: current_url + '/api/SanPham/ThanhToanDonHang?id=' + donhangId,
//           }).then(function (res) {
//             console.log(res);
//             // Xử lý kết quả trả về nếu cần
//           }).catch(function (err) {
//             console.log(err);
//             alert("Lỗi cập nhật số lượng sản phẩm trong bảng SanPham");
//           });
//         }).catch(function (err) {
//           console.log(err);
//           alert("Lỗi truy vấn đơn hàng");
//         });
        
//         $scope.cart.splice(0, $scope.cart.length);
//         localStorage.removeItem('cart'); // nếu sử dụng Local Storage
//         window.location.href = "index.html";
//       }
//     }).catch(function (err) {
//       console.log(err);
//       alert("Lỗi thêm bản ghi");
//     });
//   }
    
    
    
   
    
    
    $scope.addData = function () {
      var totalTongtien = 0; // Biến trung gian để tính tổng tiền
    
      // Tính tổng tiền và tạo đối tượng cho Sanphamjson
      var sanphamjson = $scope.cart.map(function(item) {
        var tongtien = item.gia * item.soluong;
        totalTongtien += tongtien; // Cộng tổng tiền
        return {
          Sanpham_id: item.sanpham_id,
          Tensanpham: item.tensanpham,
          Anh: item.anh,
          Gia: item.gia,
          Soluong: item.soluong,
          Tongtien: tongtien
        };
      });
    
      var currentDate = new Date();
      var isoDateString = currentDate.toISOString();
    
      var dataRequest = {
        // Khachhang_id: $scope.Khachhang_id,
        Hoten: $scope.Hoten,
        Sdt: $scope.Sdt,
        Email: $scope.Email,
        Diachi: $scope.Diachi,
        Ngaydat: isoDateString,
        Tongtien: totalTongtien, // Gán tổng tiền cho Tongtien
    
        Sanphamjson: sanphamjson
      };
    
      console.log(dataRequest); 
      $http({
        method: 'POST',
        url: current_url + '/api/DonHang/DonHang_create',
        data: dataRequest,
      }).then(function (res) {
        console.log(res);
        if (res.data.msg == false) {
          alert("Lỗi thêm bản ghi");
        } else {

          alert("Thêm bản ghi thành công");
          $scope.cart.splice(0, $scope.cart.length);
          localStorage.removeItem('cart'); // nếu sử dụng Local Storage
          window.location.href = "index.html";
        }
      }).catch(function (err) {
        console.log(err);
        alert("Lỗi thêm bản ghi");
      });
    };
});

    

