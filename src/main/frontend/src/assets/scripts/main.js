(function() {

  angular
    .module('messenger', [
      'ngAnimate',
      'ngError',
      'ngMaterial'
    ])
    .config(function($mdThemingProvider) {
      $mdThemingProvider
        .theme('default')
        .primaryPalette('blue')
        .accentPalette('red');

      $mdThemingProvider
        .theme('toolbars')
        .primaryPalette('grey', {
          default: '100'
        })
        .accentPalette('blue-grey');
    })
    .controller('MessengerController', function() {

    });

})();
