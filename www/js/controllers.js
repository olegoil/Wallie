angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {

})

.controller('CardCtrl', function($ionicPlatform, $rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicModal, $ionicPopup, $timeout, $translate, $http) {

  $scope.balance = 0;
  $scope.payrequest = [];
  $scope.paysend = [];
  $scope.currencies = [];
  var jsonedstr = [];

  $scope.$on('$ionicView.enter', function() {

    golos.config.set('websocket','wss://ws.testnet.golos.io');
    golos.config.set('address_prefix','GLS');
    golos.config.set('chain_id','5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
    // golos.api.getAccounts(['wallie','wallie2'], function(err, response){
      // console.log(JSON.stringify(err));
      // console.log(JSON.stringify(response));
      // $scope.currencies.push({golos: response});
      // $scope.currencies.bal_currency = response;
      // $scope.currencies.bal_balance = response;
    // });

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

      $scope.balanceRequest();

      jsonedstr = JSON.stringify({
        userId: $rootScope.user_id,
        userToken: 'xxx',
        getinfo: '1'
      });

      $scope.checkMessages();

    });

  });

  $scope.balanceRequest = function() {
    golos.api.getAccountBalances('wallie-test', [], function(err, response) {
      $scope.currencies = [];
      for(var i=0;i<response.length;i++) {
        var splitres = response[i].split(' ');
        $scope.currencies.push({bal_balance: splitres[0], bal_currency: splitres[1]});

        // console.log({bal_balance: splitres[0], bal_currency: splitres[1]})
      }
      // $scope.currencies.bal_balance = response[0];
    })
  }

  $scope.checkMessages = function() {
    $http.post($rootScope.generalscript, jsonedstr).then(function(suc) {
      if(suc) {
        if(suc.data.length > 0) {
          if(suc.data[0].payrequest.id > 0) {
            $scope.payrequest.push(suc.data[0].payrequest);
            $scope.openModal(1);
          }
          else if(suc.data[0].wallet_total) {
            $scope.balanceRequest();
            $scope.balance = suc.data[0].wallet_total;
            chatInter = $timeout(function () {
              $scope.checkMessages();
            }, 3000);
          }
          else {
            chatInter = $timeout(function () {
              $scope.balanceRequest();
              $scope.checkMessages();
            }, 3000);
          }
        }
        else {
          chatInter = $timeout(function () {
            $scope.balanceRequest();
            $scope.checkMessages();
          }, 3000);
        }
      }
      else {
        chatInter = $timeout(function () {
          $scope.balanceRequest();
          $scope.checkMessages();
        }, 3000);
      }
    },
    function(er) {
      chatInter = $timeout(function () {
        $scope.balanceRequest();
        $scope.checkMessages();
      }, 3000);
    });
  }

  $scope.fctRequest = function() {
    var jsonedstr2 = JSON.stringify({
      userId: $rootScope.user_id,
      userToken: 'xxx',
      placeorder: '1'
    });
    $http.post($rootScope.generalscript, jsonedstr2).then(function(suc) {
      // console.log(JSON.stringify(suc))
    }, function(er) {});
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

  $scope.sendMoney = function() {
    var wif = golos.auth.toWif($rootScope.golos_login, $rootScope.golos_pwd, "active");
    golos.broadcast.transfer(wif, $rootScope.golos_login, "wallie", "1.000 WALLIEUSDT", "", function(err, result) {
      $scope.closeModal(1);
      // alert(JSON.stringify(err));
      // alert(JSON.stringify(result));
    });
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
  $scope.payrequest = [];
  $scope.paysend = [];
  $scope.currencies = [];
  $scope.currency = 'WALLIEUSDT';
  $scope.getamount = '';
  var jsonedstr = [];
  $scope.golos_login = $rootScope.golos_login;

  $scope.qrcodeString = $rootScope.golos_login+' '+$scope.currency+' '+$scope.getamount;
  $scope.size = 150;
  $scope.correctionLevel = '';
  $scope.typeNumber = 0;
  $scope.inputMode = '';
  $scope.image = false;

  $scope.changeData = function(curr) {
    $scope.currency = curr;
    $scope.qrcodeString = $rootScope.golos_login+' '+curr+' '+$scope.getamount;
  }

  $scope.changeData2 = function() {
    $scope.qrcodeString = $rootScope.golos_login+' '+$scope.currency+' '+$scope.getamount;
  }

  $scope.$on('$ionicView.enter', function() {

    golos.config.set('websocket','wss://ws.testnet.golos.io');
    golos.config.set('address_prefix','GLS');
    golos.config.set('chain_id','5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
    // golos.api.getAccounts(['wallie','wallie2'], function(err, response){
      // console.log(JSON.stringify(err));
      // console.log(JSON.stringify(response));
      // $scope.currencies.push({golos: response});
      // $scope.currencies.bal_currency = response;
      // $scope.currencies.bal_balance = response;
    // });

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

      $scope.balanceRequest();

      jsonedstr = JSON.stringify({
        userId: $rootScope.user_id,
        userToken: 'xxx',
        getinfo: '1'
      });

      $scope.checkMessages();

    });

  });

  $scope.balanceRequest = function() {
    golos.api.getAccountBalances('wallie-test', [], function(err, response) {
      $scope.currencies = [];
      for(var i=0;i<response.length;i++) {
        var splitres = response[i].split(' ');
        $scope.currencies.push({bal_balance: splitres[0], bal_currency: splitres[1]});

        // console.log({bal_balance: splitres[0], bal_currency: splitres[1]})
      }
      // $scope.currencies.bal_balance = response[0];
    })
  }

  $scope.checkMessages = function() {
    $http.post($rootScope.generalscript, jsonedstr).then(function(suc) {
      if(suc) {
        if(suc.data.length > 0) {
          if(suc.data[0].payrequest.id > 0) {
            $scope.payrequest.push(suc.data[0].payrequest);
            $scope.openModal(1);
          }
          else if(suc.data[0].wallet_total) {
            $scope.balanceRequest();
            $scope.balance = suc.data[0].wallet_total;
            chatInter = $timeout(function () {
              $scope.checkMessages();
            }, 3000);
          }
          else {
            chatInter = $timeout(function () {
              $scope.balanceRequest();
              $scope.checkMessages();
            }, 3000);
          }
        }
        else {
          chatInter = $timeout(function () {
            $scope.balanceRequest();
            $scope.checkMessages();
          }, 3000);
        }
      }
      else {
        chatInter = $timeout(function () {
          $scope.balanceRequest();
          $scope.checkMessages();
        }, 3000);
      }
    },
    function(er) {
      chatInter = $timeout(function () {
        $scope.balanceRequest();
        $scope.checkMessages();
      }, 3000);
    });
  }

  $scope.fctRequest = function() {
    var jsonedstr2 = JSON.stringify({
      userId: $rootScope.user_id,
      userToken: 'xxx',
      placeorder: '1'
    });
    $http.post($rootScope.generalscript, jsonedstr2).then(function(suc) {
      // console.log(JSON.stringify(suc))
    }, function(er) {});
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

  $scope.sendMoney = function() {
    var wif = golos.auth.toWif($rootScope.golos_login, $rootScope.golos_pwd, "active");
    golos.broadcast.transfer(wif, $rootScope.golos_login, "wallie", "1.000 WALLIEUSDT", "", function(err, result) {
      $scope.closeModal(1);
      // alert(JSON.stringify(err));
      // alert(JSON.stringify(result));
    });
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

.controller('CoinssendCtrl', function($ionicPlatform, $rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicModal, $ionicPopup, $timeout, $translate, $http, $cordovaBarcodeScanner) {
  
  $scope.balance = 0;
  $scope.payrequest = [];
  $scope.paysend = [];
  $scope.currencies = [];
  var jsonedstr = [];
  $scope.currency = 'WALLIEUSDT';
  $scope.getamount = '';
  $scope.sendadress = "wallie";

  $scope.$on('$ionicView.enter', function() {

    golos.config.set('websocket','wss://ws.testnet.golos.io');
    golos.config.set('address_prefix','GLS');
    golos.config.set('chain_id','5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
    // golos.api.getAccounts(['wallie','wallie2'], function(err, response){
      // console.log(JSON.stringify(err));
      // console.log(JSON.stringify(response));
      // $scope.currencies.push({golos: response});
      // $scope.currencies.bal_currency = response;
      // $scope.currencies.bal_balance = response;
    // });

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

      $scope.balanceRequest();

      jsonedstr = JSON.stringify({
        userId: $rootScope.user_id,
        userToken: 'xxx',
        getinfo: '1'
      });

      $scope.checkMessages();

    });

  });

  $scope.changeData = function(curr) {
    $scope.currency = curr;
  }

  $scope.balanceRequest = function() {
    golos.api.getAccountBalances('wallie-test', [], function(err, response) {
      $scope.currencies = [];
      for(var i=0;i<response.length;i++) {
        var splitres = response[i].split(' ');
        $scope.currencies.push({bal_balance: splitres[0], bal_currency: splitres[1]});

        // console.log({bal_balance: splitres[0], bal_currency: splitres[1]})
      }
      // $scope.currencies.bal_balance = response[0];
    })
  }

  $scope.checkMessages = function() {
    $http.post($rootScope.generalscript, jsonedstr).then(function(suc) {
      if(suc) {
        if(suc.data.length > 0) {
          if(suc.data[0].payrequest.id > 0) {
            $scope.payrequest.push(suc.data[0].payrequest);
            $scope.openModal(1);
          }
          else if(suc.data[0].wallet_total) {
            $scope.balanceRequest();
            $scope.balance = suc.data[0].wallet_total;
            chatInter = $timeout(function () {
              $scope.checkMessages();
            }, 3000);
          }
          else {
            chatInter = $timeout(function () {
              $scope.balanceRequest();
              $scope.checkMessages();
            }, 3000);
          }
        }
        else {
          chatInter = $timeout(function () {
            $scope.balanceRequest();
            $scope.checkMessages();
          }, 3000);
        }
      }
      else {
        chatInter = $timeout(function () {
          $scope.balanceRequest();
          $scope.checkMessages();
        }, 3000);
      }
    },
    function(er) {
      chatInter = $timeout(function () {
        $scope.balanceRequest();
        $scope.checkMessages();
      }, 3000);
    });
  }

  $scope.fctRequest = function() {
    var jsonedstr2 = JSON.stringify({
      userId: $rootScope.user_id,
      userToken: 'xxx',
      placeorder: '1'
    });
    $http.post($rootScope.generalscript, jsonedstr2).then(function(suc) {
      // console.log(JSON.stringify(suc))
    }, function(er) {});
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

  $scope.sendMoney = function() {
    var wif = golos.auth.toWif($rootScope.golos_login, $rootScope.golos_pwd, "active");
    golos.broadcast.transfer(wif, $rootScope.golos_login, $scope.sendadress, ($scope.getamount).toFixed(3)+' '+$scope.currency, "", function(err, result) {
      $scope.closeModal(1);
      // alert(JSON.stringify(err));
      // alert(JSON.stringify(result));
    });
  }

  $scope.scanning = function() {
    
    $cordovaBarcodeScanner.scan().then(function(barcodeData) {

      var barCode = barcodeData.text.toString();

      alert(barCode+' | '+$scope.getamount+' | '+$scope.currency)

    }, 
    function(error) {

      var errPopup = $ionicPopup.alert({
        title: 'ERRoR',
        template: 'ERROR',
        scope: $scope,
        buttons: [
          {
            text: 'Ok',
            type: 'button-full button-clear darkgreentxt',
            onTap: function(e) {
                errPopup.close();
            }
          }
        ]
      });

    });

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

.controller('SettingsCtrl', function($ionicPlatform, $rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicModal, $ionicPopup, $timeout, $translate, $http) {
  
  $scope.balance = 0;
  $scope.payrequest = [];
  $scope.paysend = [];
  $scope.currencies = [];
  var jsonedstr = [];

  $scope.$on('$ionicView.enter', function() {

    golos.config.set('websocket','wss://ws.testnet.golos.io');
    golos.config.set('address_prefix','GLS');
    golos.config.set('chain_id','5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
    // golos.api.getAccounts(['wallie','wallie2'], function(err, response){
      // console.log(JSON.stringify(err));
      // console.log(JSON.stringify(response));
      // $scope.currencies.push({golos: response});
      // $scope.currencies.bal_currency = response;
      // $scope.currencies.bal_balance = response;
    // });

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

      $scope.balanceRequest();

      jsonedstr = JSON.stringify({
        userId: $rootScope.user_id,
        userToken: 'xxx',
        getinfo: '1'
      });

      $scope.checkMessages();

    });

  });

  $scope.balanceRequest = function() {
    golos.api.getAccountBalances('wallie-test', [], function(err, response) {
      $scope.currencies = [];
      for(var i=0;i<response.length;i++) {
        var splitres = response[i].split(' ');
        $scope.currencies.push({bal_balance: splitres[0], bal_currency: splitres[1]});

        // console.log({bal_balance: splitres[0], bal_currency: splitres[1]})
      }
      // $scope.currencies.bal_balance = response[0];
    })
  }

  $scope.checkMessages = function() {
    $http.post($rootScope.generalscript, jsonedstr).then(function(suc) {
      if(suc) {
        if(suc.data.length > 0) {
          if(suc.data[0].payrequest.id > 0) {
            $scope.payrequest.push(suc.data[0].payrequest);
            $scope.openModal(1);
          }
          else if(suc.data[0].wallet_total) {
            $scope.balanceRequest();
            $scope.balance = suc.data[0].wallet_total;
            chatInter = $timeout(function () {
              $scope.checkMessages();
            }, 3000);
          }
          else {
            chatInter = $timeout(function () {
              $scope.balanceRequest();
              $scope.checkMessages();
            }, 3000);
          }
        }
        else {
          chatInter = $timeout(function () {
            $scope.balanceRequest();
            $scope.checkMessages();
          }, 3000);
        }
      }
      else {
        chatInter = $timeout(function () {
          $scope.balanceRequest();
          $scope.checkMessages();
        }, 3000);
      }
    },
    function(er) {
      chatInter = $timeout(function () {
        $scope.balanceRequest();
        $scope.checkMessages();
      }, 3000);
    });
  }

  $scope.fctRequest = function() {
    var jsonedstr2 = JSON.stringify({
      userId: $rootScope.user_id,
      userToken: 'xxx',
      placeorder: '1'
    });
    $http.post($rootScope.generalscript, jsonedstr2).then(function(suc) {
      // console.log(JSON.stringify(suc))
    }, function(er) {});
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

  $scope.sendMoney = function() {
    var wif = golos.auth.toWif($rootScope.golos_login, $rootScope.golos_pwd, "active");
    golos.broadcast.transfer(wif, $rootScope.golos_login, "wallie", "1.000 WALLIEUSDT", "", function(err, result) {
      $scope.closeModal(1);
      // alert(JSON.stringify(err));
      // alert(JSON.stringify(result));
    });
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

;