angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {


})

.controller('CardCtrl', function($ionicPlatform, $rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicModal, $ionicPopup, $timeout, $translate, $http) {

  $scope.balance = 0;
  $scope.payrequest = [];
  var jsonedstr = [];

  $scope.$on('$ionicView.enter', function() {

    golos.config.set('websocket','wss://ws.testnet.golos.io');
    golos.config.set('address_prefix','GLS');
    golos.config.set('chain_id','5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
    golos.api.getAccounts(['wallie','wallie2'], function(err, response){
      // console.log(JSON.stringify(err));
      // console.log(JSON.stringify(response));
    });

    $translate(['card_ctrl_pop_tit', 'card_ctrl_pop_temp', 'card_ctrl_pop_btn1', 'blocked_title', 'blocked_body', 'blocked_cancel', 'card_pop_phone_tit', 'card_pop_phone_tmp', 'card_pop_phone_btn1', 'card_pop_phone_btn2']).then(function(res) {
      $scope.card_ctrl_pop_tit = res.card_ctrl_pop_tit;
      $scope.card_ctrl_pop_temp = res.card_ctrl_pop_temp;
      $scope.card_ctrl_pop_btn1 = res.card_ctrl_pop_btn1;
      $scope.blocked_title = res.blocked_title;
      $scope.blocked_body = res.blocked_body;
      $scope.blocked_cancel = res.blocked_cancel;
      $scope.card_pop_phone_tit = res.card_pop_phone_tit;
      $scope.card_pop_phone_tmp = res.card_pop_phone_tmp;
      $scope.card_pop_phone_btn1 = res.card_pop_phone_btn1;
      $scope.card_pop_phone_btn2 = res.card_pop_phone_btn2;
    });

    $ionicPlatform.ready(function() {

      jsonedstr = JSON.stringify({
        userId: $rootScope.user_id,
        userToken: 'xxx',
        getinfo: '1'
      });

      $scope.checkMessages();

    });

  });

  $scope.checkMessages = function() {
    $http.post($rootScope.generalscript, jsonedstr).then(function(suc) {
      console.log(JSON.stringify(suc))
      if(suc) {
        if(suc.data.length > 0) {
          if(suc.data[0].payrequest.length > 0) {
            payrequest = suc.data[0].payrequest;
            $scope.openModal(1);
          }
          else if(suc.data[0].wallet_total) {
            $scope.balance = suc.data[0].wallet_total;
            chatInter = $timeout(function () {
              $scope.checkMessages();
            }, 3000);
          }
          else {
            chatInter = $timeout(function () {
              $scope.checkMessages();
            }, 3000);
          }
        }
        else {
          chatInter = $timeout(function () {
            $scope.checkMessages();
          }, 3000);
        }
      }
      else {
        chatInter = $timeout(function () {
          $scope.checkMessages();
        }, 3000);
      }
    },
    function(er) {
      chatInter = $timeout(function () {
        $scope.checkMessages();
      }, 3000);
    });
  }

  $scope.$on("$ionicView.leave", function(event, data){
    $timeout.cancel(chatInter);
  });

  $scope.coinsget = function() {
    $state.go('coinsget');
  }

  $scope.coinssend = function() {
    $state.go('coinssend');
  }

  $scope.settings = function() {
    $state.go('settings');
  }

  $ionicModal.fromTemplateUrl('templates/paymentrequest.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalRequest = modal;
  });

  $scope.openModal = function(index) {
    if (index == 1) {
      $scope.oModalRequest.show();
      $timeout.cancel(chatInter);
    }
  };

  $scope.closeModal = function(index) {
    if (index == 1) {
      $scope.oModalRequest.hide();
      chatInter = $timeout(function () {
        $scope.checkMessages();
      }, 3000);
    }
  };

  $scope.$on('modal.shown', function(event, modal) {
    
  });

  $scope.$on('modal.hidden', function(event, modal) {

  });

  $scope.$on('$destroy', function() {
    $scope.oModalRequest.remove();
  });

})

.controller('CoinsgetCtrl', function($ionicPlatform, $rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicModal, $ionicPopup, $timeout, $translate, $http) {

  $scope.balance = 0;
  
  var jsonedstr = JSON.stringify({
    userId: $rootScope.user_id,
    userToken: 'xxx',
    getinfo: '1'
  });

  $scope.$on('$ionicView.enter', function() {

    golos.config.set('websocket','wss://ws.testnet.golos.io');
    golos.config.set('address_prefix','GLS');
    golos.config.set('chain_id','5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
    golos.api.getAccounts(['wallie','wallie2'], function(err, response){
      // console.log(JSON.stringify(err));
      // console.log(JSON.stringify(response));
    });

    $translate(['card_ctrl_pop_tit', 'card_ctrl_pop_temp', 'card_ctrl_pop_btn1', 'blocked_title', 'blocked_body', 'blocked_cancel', 'card_pop_phone_tit', 'card_pop_phone_tmp', 'card_pop_phone_btn1', 'card_pop_phone_btn2']).then(function(res) {
      $scope.card_ctrl_pop_tit = res.card_ctrl_pop_tit;
      $scope.card_ctrl_pop_temp = res.card_ctrl_pop_temp;
      $scope.card_ctrl_pop_btn1 = res.card_ctrl_pop_btn1;
      $scope.blocked_title = res.blocked_title;
      $scope.blocked_body = res.blocked_body;
      $scope.blocked_cancel = res.blocked_cancel;
      $scope.card_pop_phone_tit = res.card_pop_phone_tit;
      $scope.card_pop_phone_tmp = res.card_pop_phone_tmp;
      $scope.card_pop_phone_btn1 = res.card_pop_phone_btn1;
      $scope.card_pop_phone_btn2 = res.card_pop_phone_btn2;
    });

    $ionicPlatform.ready(function() {

      $scope.checkMessages();

    });

  });

  $scope.checkMessages = function() {
    $http.post($rootScope.generalscript, jsonedstr).then(function(suc) {
      $scope.balance = suc.data[0].wallet_total;
      chatInter = $timeout(function () {
        $scope.checkMessages();
      }, 3000);
    },
    function(er) {
      chatInter = $timeout(function () {
        $scope.checkMessages();
      }, 3000);
    });
  }

  $scope.$on("$ionicView.leave", function(event, data){
    $timeout.cancel(chatInter);
  });

  $scope.sendMoney = function() {
    var wif = golos.auth.toWif("wallie", "P5J2ZkEEoWQHrfaawJhAqgfgsjQR1cLe1TqLFEFhhbUNHaF5XBzh", "active");
    golos.broadcast.transfer(wif, "wallie", "wallie2", "1.000 TESTTESTTESTA", "", function(err, result) {
      alert(JSON.stringify(err));
      alert(JSON.stringify(result));
    });
  }

})

.controller('CoinssendCtrl', function($ionicPlatform, $rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicModal, $ionicPopup, $timeout, $translate, $http) {
  
  $scope.balance = 0;
  
  var jsonedstr = JSON.stringify({
    userId: $rootScope.user_id,
    userToken: 'xxx',
    getinfo: '1'
  });

  $scope.$on('$ionicView.enter', function() {

    golos.config.set('websocket','wss://ws.testnet.golos.io');
    golos.config.set('address_prefix','GLS');
    golos.config.set('chain_id','5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
    golos.api.getAccounts(['wallie','wallie2'], function(err, response){
      // console.log(JSON.stringify(err));
      // console.log(JSON.stringify(response));
    });

    $translate(['card_ctrl_pop_tit', 'card_ctrl_pop_temp', 'card_ctrl_pop_btn1', 'blocked_title', 'blocked_body', 'blocked_cancel', 'card_pop_phone_tit', 'card_pop_phone_tmp', 'card_pop_phone_btn1', 'card_pop_phone_btn2']).then(function(res) {
      $scope.card_ctrl_pop_tit = res.card_ctrl_pop_tit;
      $scope.card_ctrl_pop_temp = res.card_ctrl_pop_temp;
      $scope.card_ctrl_pop_btn1 = res.card_ctrl_pop_btn1;
      $scope.blocked_title = res.blocked_title;
      $scope.blocked_body = res.blocked_body;
      $scope.blocked_cancel = res.blocked_cancel;
      $scope.card_pop_phone_tit = res.card_pop_phone_tit;
      $scope.card_pop_phone_tmp = res.card_pop_phone_tmp;
      $scope.card_pop_phone_btn1 = res.card_pop_phone_btn1;
      $scope.card_pop_phone_btn2 = res.card_pop_phone_btn2;
    });

    $ionicPlatform.ready(function() {

      $scope.checkMessages();

    });

  });

  $scope.checkMessages = function() {
    $http.post($rootScope.generalscript, jsonedstr).then(function(suc) {
      $scope.balance = suc.data[0].wallet_total;
      chatInter = $timeout(function () {
        $scope.checkMessages();
      }, 3000);
    },
    function(er) {
      chatInter = $timeout(function () {
        $scope.checkMessages();
      }, 3000);
    });
  }

  $scope.$on("$ionicView.leave", function(event, data){
    $timeout.cancel(chatInter);
  });

  $scope.sendMoney = function() {
    var wif = golos.auth.toWif("wallie", "P5J2ZkEEoWQHrfaawJhAqgfgsjQR1cLe1TqLFEFhhbUNHaF5XBzh", "active");
    golos.broadcast.transfer(wif, "wallie", "wallie2", "1.000 TESTTESTTESTA", "", function(err, result) {
      alert(JSON.stringify(err));
      alert(JSON.stringify(result));
    });
  }

})

.controller('SettingsCtrl', function($ionicPlatform, $rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicModal, $ionicPopup, $timeout, $translate, $http) {
  
  $scope.balance = 0;
  
  var jsonedstr = JSON.stringify({
    userId: $rootScope.user_id,
    userToken: 'xxx',
    getinfo: '1'
  });

  $scope.$on('$ionicView.enter', function() {

    golos.config.set('websocket','wss://ws.testnet.golos.io');
    golos.config.set('address_prefix','GLS');
    golos.config.set('chain_id','5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
    golos.api.getAccounts(['wallie','wallie2'], function(err, response){
      // console.log(JSON.stringify(err));
      // console.log(JSON.stringify(response));
    });

    $translate(['card_ctrl_pop_tit', 'card_ctrl_pop_temp', 'card_ctrl_pop_btn1', 'blocked_title', 'blocked_body', 'blocked_cancel', 'card_pop_phone_tit', 'card_pop_phone_tmp', 'card_pop_phone_btn1', 'card_pop_phone_btn2']).then(function(res) {
      $scope.card_ctrl_pop_tit = res.card_ctrl_pop_tit;
      $scope.card_ctrl_pop_temp = res.card_ctrl_pop_temp;
      $scope.card_ctrl_pop_btn1 = res.card_ctrl_pop_btn1;
      $scope.blocked_title = res.blocked_title;
      $scope.blocked_body = res.blocked_body;
      $scope.blocked_cancel = res.blocked_cancel;
      $scope.card_pop_phone_tit = res.card_pop_phone_tit;
      $scope.card_pop_phone_tmp = res.card_pop_phone_tmp;
      $scope.card_pop_phone_btn1 = res.card_pop_phone_btn1;
      $scope.card_pop_phone_btn2 = res.card_pop_phone_btn2;
    });

    $ionicPlatform.ready(function() {

      $scope.checkMessages();

    });

  });

  $scope.checkMessages = function() {
    $http.post($rootScope.generalscript, jsonedstr).then(function(suc) {
      $scope.balance = suc.data[0].wallet_total;
      chatInter = $timeout(function () {
        $scope.checkMessages();
      }, 3000);
    },
    function(er) {
      chatInter = $timeout(function () {
        $scope.checkMessages();
      }, 3000);
    });
  }

  $scope.$on("$ionicView.leave", function(event, data){
    $timeout.cancel(chatInter);
  });

  $scope.sendMoney = function() {
    var wif = golos.auth.toWif("wallie", "P5J2ZkEEoWQHrfaawJhAqgfgsjQR1cLe1TqLFEFhhbUNHaF5XBzh", "active");
    golos.broadcast.transfer(wif, "wallie", "wallie2", "1.000 TESTTESTTESTA", "", function(err, result) {
      alert(JSON.stringify(err));
      alert(JSON.stringify(result));
    });
  }

})

;