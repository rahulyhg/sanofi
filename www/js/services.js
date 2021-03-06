var adminurl = "http://ilead.api.empowerreward.com/api/";
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile";
var uploadurl = imgurl;
// var adminurl = "http://localhost:80/api/";
// var adminurl = adminbase + "/index.php/json/";
// var imgpath = adminbase + "/uploads/";


var foods = [];

angular.module('starter.services', [])
  .factory('MyServices', function ($http) {
    var loginDetail = $.jStorage.get("profile");
    if (!loginDetail) {
      loginDetail = {};
    }
    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      },
      setUser: function (data) {
        _.assignIn(loginDetail, data);
        $.jStorage.set("loginDetail", loginDetail);
        console.log("setuser 656", loginDetail);
      },

      getUser: function () {
        return loginDetail;
      },
      // login: function(input, callback) {
      //   console.log(input);

      //   return $http({
      //     url: adminurl + 'login',
      //     method: "POST",
      //     headers:{
      //       'Content-type':"application/json",
      //     }
      //     data: input
      //   }).success(callback);
      // },
      login: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'login', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
      profile: function (id, callback) {
        console.log(id);
        var id = {
          id: id
        };
        $http.post(adminurl + 'profile', id, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
      contactus: function (data, callback) {

        $http.post(adminurl + 'contactus', data, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
      //      profile: function (id, callback) {
      //        var data {
      //          id : id;
      //        };
      //    $http({
      //      url: adminurl + 'profile',
      //      method: 'POST',
      //      withCredentials: true,
      //      data: data
      //    }).success(callback);
      //  },

      rewardcategory: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'rewardcategory', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
      productdetails: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'productdetails', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },

      addtocart: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'addtocart', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },

      cart: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'cart', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },

      updateqty: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'updateqty', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },

      deletecartitem: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'deletecartitem', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
      shippingdetails: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'shippingdetails', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
      addshipping: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'addshipping', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
      summary: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'summary', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
      otp: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'otp', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
      placeorder: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'placeorder', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },


      UpdateProfilePic: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'UpdateProfilePic', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
      filters: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'filters/', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
      reward: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'reward', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },

      getpendingclaims: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'form', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },

      getpendingresponse: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'feedback', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },

      kpis: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'kpis', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
      updateprofile: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'updateprofile', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
      performance: function (formData, callback) {
        console.log(formData);
        $http.post(adminurl + 'performance', formData, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      },
          TopPerformer: function ({}, callback) {
        $http.post(adminurl + 'TopPerformer', {}, {
          headers: {
            'Content-Type': "application/json"
          }
        }).success(callback);
      }
    };
  });
