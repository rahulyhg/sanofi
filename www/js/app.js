// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider) {
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
    .state('app.contact', {
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact.html',
        controller: 'ContactCtrl'
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
    url: '/kpi/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/kpi.html',
        controller: 'KpiCtrl'
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
.filter('uploadpath', function() {
    return function(input, width, height, style) {
      console.log('input',input);
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
