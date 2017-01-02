
var adminurl = "http://ilead.api.empowerreward.com/api/";
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile";
var uploadurl = imgurl;
// var adminurl = "http://localhost:80/api/";
// var adminurl = adminbase + "/index.php/json/";
// var imgpath = adminbase + "/uploads/";


var foods = [];

angular.module('starter.services', [])
  .factory('MyServices', function($http) {
    var loginDetail = $.jStorage.get("profile");
if (!loginDetail) {
  loginDetail = {};
}
    return {
      all: function() {
        return chats;
      },
      remove: function(chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function(chatId) {
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
               profile : function (id, callback) {
                console.log(id);
                var id={id:id};
            $http.post(adminurl + 'profile', id , {
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

        rewardcategory : function (formData, callback) {
                console.log(formData);
            $http.post(adminurl + 'rewardcategory', formData, {
                headers: {
                    'Content-Type': "application/json"
                }
            }).success(callback);
        },
        filters : function (formData, callback) {
                console.log(formData);
            $http.post(adminurl + 'filters/', formData, {
                headers: {
                    'Content-Type': "application/json"
                }
            }).success(callback);
        },
        reward : function (formData, callback) {
                console.log(formData);
            $http.post(adminurl + 'reward', formData, {
                headers: {
                    'Content-Type': "application/json"
                }
            }).success(callback);
        },
        kpis : function (formData, callback) {
                console.log(formData);
            $http.post(adminurl + 'kpis', formData, {
                headers: {
                    'Content-Type': "application/json"
                }
            }).success(callback);
        },
    };
  });
