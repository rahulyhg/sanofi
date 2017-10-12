// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

// (function() {
//   'use strict';
//   angular.module('ionic-ratings', ['ionic'])
//     .directive('ionicRatings', ionicRatings);

//   function ionicRatings() {
//     return {
//       restrict: 'AE',
//       replace: true,
//       template: '<div class="text-center ionic_ratings">' +
//         '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(1)" ng-if="rating < 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
//         '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(1)" ng-if="rating > 0" ng-class="{\'read_only\':(readOnly)}"></span>' +
//         '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(2)" ng-if="rating < 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
//         '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(2)" ng-if="rating > 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
//         '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(3)" ng-if="rating < 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
//         '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(3)" ng-if="rating > 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
//         '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(4)" ng-if="rating < 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
//         '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(4)" ng-if="rating > 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
//         '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(5)" ng-if="rating < 5" ng-class="{\'read_only\':(readOnly)}"></span>' +
//         '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(5)" ng-if="rating > 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
//         '</div>',
//       scope: {
//         ratingsObj: '=ratingsobj',
//         index: '=index'
//       },
//       link: function(scope, element, attrs) {

//         //Setting the default values, if they are not passed
//         scope.iconOn = scope.ratingsObj.iconOn || 'ion-ios-star';
//         scope.iconOff = scope.ratingsObj.iconOff || 'ion-ios-star-outline';
//         scope.iconOnColor = scope.ratingsObj.iconOnColor || 'rgb(200, 200, 100)';
//         scope.iconOffColor = scope.ratingsObj.iconOffColor || 'rgb(200, 100, 100)';
//         scope.rating = scope.ratingsObj.rating || 0;
//         scope.minRating = scope.ratingsObj.minRating || 0;
//         scope.readOnly = scope.ratingsObj.readOnly || false;
//         scope.index = scope.index || 0;

//         //Setting the color for the icon, when it is active
//         scope.iconOnColor = {
//           color: scope.iconOnColor
//         };

//         //Setting the color for the icon, when it is not active
//         scope.iconOffColor = {
//           color: scope.iconOffColor
//         };

//         //Setting the rating
//         scope.rating = (scope.rating > scope.minRating) ? scope.rating : scope.minRating;

//         //Setting the previously selected rating
//         scope.prevRating = 0;

//         scope.$watch('ratingsObj.rating', function(newValue, oldValue) {
//           setRating(newValue);
//         });

//         function setRating(val, uiEvent) {
//           if (scope.minRating !== 0 && val < scope.minRating) {
//             scope.rating = scope.minRating;
//           } else {
//             scope.rating = val;
//           }
//           scope.prevRating = val;
//           if (uiEvent) scope.ratingsObj.callback(scope.rating, scope.index);
//         }

//         //Called when he user clicks on the rating
//         scope.ratingsClicked = function(val) {
//           setRating(val, true);
//         };
        
//         //Called when he user un clicks on the rating
//         scope.ratingsUnClicked = function(val) {
//           if (scope.minRating !== 0 && val < scope.minRating) {
//             scope.rating = scope.minRating;
//           } else {
//             scope.rating = val;
//           }
//           if (scope.prevRating == val) {
//             if (scope.minRating !== 0) {
//               scope.rating = scope.minRating;
//             } else {
//               scope.rating = 0;
//             }
//           }
//           scope.prevRating = val;
//           scope.ratingsObj.callback(scope.rating, scope.index);
//         };
//       }
//     };
//   }

// })()


.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(2);
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'

    })
    .state('total-point', {
      url: '/total-point/:id',
      templateUrl: 'templates/total-point.html',
      controller: 'TotalPointCtrl'

    })
    .state('splash', {
      url: '/splash',
      templateUrl: 'templates/splash.html',
      controller: 'SplashCtrl'

    })

  .state('app.reward-category', {
      url: '/reward-category',
      views: {
        'menuContent': {
          templateUrl: 'templates/reward-category.html',
          controller: 'RewardCategoryCtrl'
        }
      }
    })
    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html',
          controller: 'AboutCtrl'
        }
      }
    })

.state('app.performers', {
      url: '/performers',
      views: {
        'menuContent': {
          templateUrl: 'templates/performers.html',
          controller: 'PerformersCtrl'
        }
      }
    })

    .state('app.feedback', {
      url: '/feedback',
      views: {
        'menuContent': {
          templateUrl: 'templates/feedback.html',
          controller: 'FeedbackCtrl'
        }
      }
    })

    .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'templates/contact.html',
          controller: 'ContactCtrl'
        }
      }
    })
    .state('app.product-detail', {
      url: '/product-detail/:productId',
      views: {
        'menuContent': {
          templateUrl: 'templates/product-detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    })
    .state('app.management', {
      url: '/management',
      views: {
        'menuContent': {
          templateUrl: 'templates/management.html',
          controller: 'ManagementCtrl'
        }
      }
    })
    .state('app.filter-reward', {
      url: '/filter-reward/:catalogueId/:categoryId',

      views: {
        'menuContent': {
          templateUrl: 'templates/filter-reward.html',
          controller: 'FilterRewardCtrl'
        }
      }
    })
    .state('app.terms', {
      url: '/terms',
      views: {
        'menuContent': {
          templateUrl: 'templates/terms.html',
          controller: 'TermsCtrl'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',

      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })

  .state('app.mycart', {
    url: '/mycart',
    views: {
      'menuContent': {
        templateUrl: 'templates/myCart.html',
        controller: 'MyCartCtrl'
      }
    }
  })

  .state('app.shippingdetails', {
    url: '/shippingdetails',
    views: {
      'menuContent': {
        templateUrl: 'templates/shippingdetails.html',
        controller: 'ShippingDetailsCtrl'
      }
    }
  })

  .state('app.confirmorder', {
    url: '/confirmorder',
    views: {
      'menuContent': {
        templateUrl: 'templates/confirm-order.html',
        controller: 'ConfirmOrderCtrl'
      }
    }
  })

  .state('app.otpValidation', {
    url: '/otpvalidation',
    views: {
      'menuContent': {
        templateUrl: 'templates/otpvalidation.html',
        controller: 'OtpValidationCtrl'
      }
    }
  })

  .state('home-menu', {
      url: '/home-menu',
      templateUrl: 'templates/home-menu.html',
      controller: 'HomeMenuCtrl'

    })
    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html'
        }
      }
    })

  .state('app.playlists', {
    url: '/playlists',

    templateUrl: 'templates/playlists.html',
    controller: 'PlaylistsCtrl'

  })

  .state('app.kpi', {
      url: '/kpi',
      views: {
        'menuContent': {
          templateUrl: 'templates/kpi.html',
          controller: 'KpiCtrl'
        }
      }
    })
    .state('app.performance', {
      url: '/performance',
      views: {
        'menuContent': {
          templateUrl: 'templates/performance.html',
          controller: 'PerformanceCtrl'
        }
      }
    })

  .state('app.reward', {
    url: '/reward/:catalogueId/:categoryId/:filterId',
    views: {
      'menuContent': {
        templateUrl: 'templates/reward.html',
        controller: 'RewardCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})




.directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        var digits;

        function inputValue(val) {
          if (val) {
            if (attr.type == "tel") {
              digits = val.replace(/[^0-9\+\\]/g, '');
            } else {
              digits = val.replace(/[^0-9\-\\]/g, '');
            }


            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits, 10);
          }
          return undefined;
        }
        ctrl.$parsers.push(inputValue);
      }
    };
  })
  .filter('uploadpath', function () {
    return function (input, width, height, style) {
      console.log('input', input);
      var other = "";
      if (width && width != "") {
        other += "&width=" + width;
      }
      if (height && height != "") {
        other += "&height=" + height;
      }
      if (style && style != "") {
        other += "&style=" + style;
      }
      if (input) {
        if (input.indexOf('https://') == -1) {
          return imgpath + "?file=" + input + other;
        } else {
          return input;
        }
      }
    };
  });
