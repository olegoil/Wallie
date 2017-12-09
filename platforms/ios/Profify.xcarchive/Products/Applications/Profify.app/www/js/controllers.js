angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state) {

})

.controller('TabCtrl', function($scope, $state, $stateParams, $ionicHistory, $cordovaGlobalization, $translate, Cart, Profile, Points, HtmlEnt) {

  // TRANSLATOR
  $cordovaGlobalization.getPreferredLanguage().then(
  function(result) {
    var lang = result.value.split('-');
    $translate.use(lang[0]);
  },
  function(error) {})

  $scope.badgeData = {
    card: 0,
    menue: 0,
    news: 0,
    maps: 0,
    else: 0
  }

  $scope.goCard = function() {
    $ionicHistory.clearCache();
    $state.go('tab.card');
  }

  $scope.goMenu = function() {
    $ionicHistory.clearCache();
    $state.go('tab.menu-cats');
  }

  $scope.goNews = function() {
    $ionicHistory.clearCache();
    $state.go('tab.news');
  }

  $scope.goContact = function() {
    $ionicHistory.clearCache();
    $state.go('tab.contact-map');
  }

  $scope.goElse = function() {
    $ionicHistory.clearCache();
    $state.go('tab.else');
  }

  $scope.htmlEntities = function(toencode) {
    return HtmlEnt.decodeEntities(toencode);
  }

})

.controller('CardCtrl', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicModal, $ionicPopup, $timeout, $translate, Cart, Survey, Profile, Points) {

  $scope.$on('$ionicView.enter', function() {

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

    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
      if(Points.check()) {
        $scope.badgeData.card = Points.getmyold();
      }
      else {
        Points.getmynew($scope.profile).then(function(pdata) {
          $scope.badgeData.card = pdata;
        }, function() {});
      }
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
        if(Points.check()) {
          $scope.badgeData.card = Points.getmyold();
        }
        else {
          Points.getmynew($scope.profile).then(function(pdata) {
            $scope.badgeData.card = pdata;
          }, function() {});
        }
      }, function() {});
    }

    Survey.check().then(function(data) {
      
      $scope.surveys = data;

      if($scope.surveys.length > 0) {
        $timeout(function() {$scope.openModal(8);}, 500);
      }

    }, function() {});

    $scope.answers = {
      questionId: '',
      answer: ''
    }

  });

  $scope.smallscreen = $rootScope.smallscreen;

  $scope.badgeData = {
    gifts: 0,
    groups: 0,
    share: 0,
    card: 0
  }

  $scope.gogifts = function() {
    $state.go('tab.gifts');
  }

  $scope.gogroups = function() {
    $state.go('tab.groups');
  }

  $scope.goshares = function() {
    $state.go('tab.shares');
  }

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.alertPopup = function() {
    var myPopup = $ionicPopup.alert({
      title: '<img style="margin:10px;" src="img/signs/heartbubble.png" width="40%" />',
      template: '<h3 class="hh3"><strong>'+$scope.card_ctrl_pop_tit+'</strong></h3><h4 class="hh4">'+$scope.card_ctrl_pop_temp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.card_ctrl_pop_btn1+'</h3>',
          type: 'button-full button-clear darkgreentxt',
          onTap: function(e) {
              myPopup.close();
          }
        }
      ]
    });
  }

  $scope.gotoCard = function() {

      if($scope.profile.user_work_pos == '2' || $scope.profile.user_work_pos == '3' || $scope.profile.user_work_pos == '4') {

          var errPopup = $ionicPopup.alert({
            title: '<i class="icon ion-alert redtxt alerts" />',
            template: '<h3 class="hh3"><strong>'+$scope.blocked_title+'</strong></h3><h4 class="hh4">'+$scope.blocked_body+'</h4>',
            cssClass: 'gifterr',
            scope: $scope,
            buttons: [
              {
                text: '<h3>'+$scope.blocked_cancel+'</h3>',
                type: 'button-full button-clear darkgreentxt',
                onTap: function(e) {
                    errPopup.close();
                }
              }
            ]
          });

      }
      else {

          if($scope.profile.user_mob && $scope.profile.user_mob != '0' && $scope.profile.user_mob_confirm && $scope.profile.user_mob_confirm == '1') {
              $state.go('order-summ');
          }
          else {

            var errPopup = $ionicPopup.alert({
              title: '<i class="icon ion-alert redtxt alerts" />',
              template: '<h3 class="hh3"><strong>'+$scope.card_pop_phone_tit+'</strong></h3><h4 class="hh4">'+$scope.card_pop_phone_tmp+'</h4>',
              cssClass: 'gifterr',
              scope: $scope,
              buttons: [
                {
                  text: '<b>'+$scope.card_pop_phone_btn1+'</b>',
                  type: 'button-full button-clear darkgreentxt',
                  onTap: function(e) {
                      errPopup.close();
                      $timeout(function() {$state.go('profile-edit');}, 100);
                  }
                },
                {
                  text: $scope.card_pop_phone_btn2,
                  type: 'button-full button-clear darkgreentxt',
                  onTap: function(e) {
                      errPopup.close();
                  }
                }
              ]
            });

          }

      }

  }

  $ionicModal.fromTemplateUrl('templates/modal-survey-radio.html', {
    id: '6',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalSurveyRadio = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-survey-text.html', {
    id: '7',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalSurveyText = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-survey-both.html', {
    id: '8',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalSurveyBoth = modal;
  });

  $scope.openModal = function(index) {
    if (index == 6) {$scope.oModalSurveyRadio.show();}
    else if (index == 7) {$scope.oModalSurveyText.show();}
    else if (index == 8) {$scope.oModalSurveyBoth.show();}
  };

  $scope.closeModal = function(index) {
    if (index == 6) {$scope.oModalSurveyRadio.hide();}
    else if (index == 7) {$scope.oModalSurveyText.hide();}
    else if (index == 8) {$scope.oModalSurveyBoth.hide();}
  };

  $scope.$on('modal.shown', function(event, modal) {
    
  });

  $scope.$on('modal.hidden', function(event, modal) {

  });

  $scope.$on('$destroy', function() {
    $scope.oModalSurveyRadio.remove();
    $scope.oModalSurveyText.remove();
  });

  $scope.sendAnswer = function(num) {
    
    Survey.answer($scope.answers.questionId, $scope.answers.answer);
    
    $scope.closeModal(num);

    $timeout(function() {$scope.alertPopup()}, 500);

  }

})

.controller('MenuCatsCtrl', function($scope, $state, $stateParams, $ionicHistory, MenuCats, Cart, Profile) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  if(MenuCats.check()) {
    $scope.cats = MenuCats.getcatsold();
  }
  else {
    MenuCats.getcatsnew().then(function(data) {
      $scope.cats = data;
    }, function() {});
  }

  $scope.$on('$ionicView.enter', function() {

    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
      }, function() {});
    }

  });

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.acceptStyle = function() {
      $scope.myStyle = {'background-repeat': 'no-repeat', 'background-position': 'center center', 'background-size': 'cover'};
  }

})

.controller('MenuCtrl', function($scope, $state, $stateParams, $ionicHistory, Menu, Cart, Profile) {

  $scope.goback = function() {
    $state.go('tab.menu-cats');
  }

  $scope.$on('$ionicView.enter', function() {

    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
      }, function() {});
    }

    Menu.getmenunew($stateParams.menuCat).then(function(data) {
      $scope.menus = data;
    }, function() {});

  });

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.acceptStyle = function() {
    $scope.myStyle = {'background-repeat': 'no-repeat', 'background-position': 'center center', 'background-size': 'cover', 'position':'relative','padding':'0','margin-top':'7px','margin-bottom':'7px'};
  }

})

.controller('MenuDetailCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, Menu, Cart, Profile) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.menu = Menu.get($stateParams.menuId);

  $scope.$on('$ionicView.enter', function() {

    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
      }, function() {});
    }

  });

  $scope.add = function(item) {
    Cart.add(item);
    $scope.cartsum = Cart.sum();
  }

  $scope.sub = function(item) {
    Cart.sub(item);
    $scope.cartsum = Cart.sum();
  }

  $scope.getAmount = function(item) {
    var cartamount = Cart.get(item);
    return cartamount.amount;
  }

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.acceptStyle = function() {
      $scope.myStyle = {'background-repeat': 'no-repeat', 'background-position': 'center center', 'background-size': 'auto 100%'};
  }

})

.controller('CartCtrl', function($scope, $state, $stateParams, $ionicHistory, Menu, Cart) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.allcart = [];

  $scope.$on('$ionicView.enter', function(){

    $scope.allcart = Cart.all();

    $scope.cartsum = Cart.sum();

  });

  $scope.add = function(item) {
    Cart.add(item);
    $scope.cartsum = Cart.sum();
  }

  $scope.sub = function(item) {
    Cart.sub(item);
    $scope.cartsum = Cart.sum();
  }

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.acceptStyle = function() {
      $scope.myStyle = {'background-repeat': 'no-repeat', 'background-position': 'center center', 'background-size': 'cover'};
  }

})

.controller('CartSendCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, $timeout, $ionicLoading, $translate, Profile, Cart, Order, Inst) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.$on('$ionicView.enter', function() {
  
    $translate(['conn_err_tit', 'conn_err_tmp', 'cart_cntr_pop_tit', 'conn_err_close', 'cart_cntr_pop_tmp', 'cart_cntr_pop_send_ord_tit', 'cart_cntr_pop_send_ord_tmp', 'cart_cntr_pop_send_ord_btn1', 'cart_cntr_pop_send_ord_btn2', 'cart_cntr_pop_send_ord_send', 'cart_cntr_pop_err1_tit', 'cart_cntr_pop_err1_tmp', 'cart_cntr_pop_err2_tit', 'cart_cntr_pop_err2_tmp', 'cart_cntr_pop_nottake_ord_tit', 'cart_cntr_pop_nottake_ord_tmp', 'cart_cntr_pop_nottake_ord_btn1']).then(function(res) {
        $scope.conn_err_tit = res.conn_err_tit;
        $scope.conn_err_tmp = res.conn_err_tmp;
        $scope.conn_err_close = res.conn_err_close;
        $scope.cart_cntr_pop_tit = res.cart_cntr_pop_tit;
        $scope.cart_cntr_pop_tmp = res.cart_cntr_pop_tmp;
        $scope.cart_cntr_pop_send_ord_tit = res.cart_cntr_pop_send_ord_tit;
        $scope.cart_cntr_pop_send_ord_tmp = res.cart_cntr_pop_send_ord_tmp;
        $scope.cart_cntr_pop_send_ord_btn1 = res.cart_cntr_pop_send_ord_btn1;
        $scope.cart_cntr_pop_send_ord_btn2 = res.cart_cntr_pop_send_ord_btn2;
        $scope.cart_cntr_pop_send_ord_send = res.cart_cntr_pop_send_ord_send;
        $scope.cart_cntr_pop_err1_tit = res.cart_cntr_pop_err1_tit;
        $scope.cart_cntr_pop_err1_tmp = res.cart_cntr_pop_err1_tmp;
        $scope.cart_cntr_pop_err2_tit = res.cart_cntr_pop_err2_tit;
        $scope.cart_cntr_pop_err2_tmp = res.cart_cntr_pop_err2_tmp;
        $scope.cart_cntr_pop_nottake_ord_tit = res.cart_cntr_pop_nottake_ord_tit;
        $scope.cart_cntr_pop_nottake_ord_tmp = res.cart_cntr_pop_nottake_ord_tmp;
        $scope.cart_cntr_pop_nottake_ord_btn1 = res.cart_cntr_pop_nottake_ord_btn1;
    });

    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
      $scope.profile.user_surname = $scope.profile.user_surname != '0' ? $scope.profile.user_surname : '';
      $scope.profile.user_name = $scope.profile.user_name != '0' ? $scope.profile.user_name : '';
      $scope.profile.user_middlename = $scope.profile.user_middlename != '0' ? $scope.profile.user_middlename : '';
      $scope.profile.user_mobile = $scope.profile.user_mobile != '0' ? $scope.profile.user_mobile : '';
      $scope.profile.user_email = $scope.profile.user_email != '0' ? $scope.profile.user_email : '';
      $scope.profile.user_city = $scope.profile.user_city != '0' ? $scope.profile.user_city : '';
      $scope.profile.user_adress = $scope.profile.user_adress != '0' ? $scope.profile.user_adress : '';
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
        $scope.profile.user_surname = $scope.profile.user_surname != '0' ? $scope.profile.user_surname : '';
        $scope.profile.user_name = $scope.profile.user_name != '0' ? $scope.profile.user_name : '';
        $scope.profile.user_middlename = $scope.profile.user_middlename != '0' ? $scope.profile.user_middlename : '';
        $scope.profile.user_mobile = $scope.profile.user_mobile != '0' ? $scope.profile.user_mobile : '';
        $scope.profile.user_email = $scope.profile.user_email != '0' ? $scope.profile.user_email : '';
        $scope.profile.user_city = $scope.profile.user_city != '0' ? $scope.profile.user_city : '';
        $scope.profile.user_adress = $scope.profile.user_adress != '0' ? $scope.profile.user_adress : '';
      }, function() {});
    }

    if(Inst.check()) {
      $scope.inst = Inst.getinstold();
    }
    else {
      Inst.getinstnew().then(function(data) {
        $scope.inst = data;
      }, function() {});
    }

  });

  $scope.connectionErr = function() {
    var errPopup = $ionicPopup.alert({
      title: '<i class="icon ion-alert redtxt alerts" />',
      template: '<h3 class="hh3"><strong>'+$scope.conn_err_tit+'</strong></h3><h4 class="hh4">'+$scope.conn_err_tmp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.conn_err_close+'</h3>',
          type: 'button-full button-clear darkgreentxt',
          onTap: function(e) {
              errPopup.close();
          }
        }
      ]
    });
  }

  $scope.alertPopup = function() {
    var myPopup = $ionicPopup.alert({
      title: '<img style="margin:10px;" src="img/signs/heartbubble.png" width="40%" />',
      template: '<h3 class="hh3"><strong>'+$scope.cart_cntr_pop_tit+'!</strong></h3><h4 class="hh4">'+$scope.cart_cntr_pop_tmp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>Закрыть</h3>',
          type: 'button-full button-clear darkgreentxt',
          onTap: function(e) {
              myPopup.close();
              $timeout(function() {$state.go('tab.card');}, 200);
          }
        }
      ]
    });
  }

  $scope.send = function() {
    if($scope.inst[0].office_orders != '1') {
      var errPopup = $ionicPopup.alert({
        title: '<i class="icon ion-alert redtxt alerts" />',
        template: '<h3 class="hh3"><strong>'+$scope.cart_cntr_pop_nottake_ord_tit+'</strong></h3><h4 class="hh4">'+$scope.cart_cntr_pop_nottake_ord_tmp+'</h4>',
        cssClass: 'gifterr',
        scope: $scope,
        buttons: [
          {
            text: '<h3>'+$scope.cart_cntr_pop_nottake_ord_btn1+'</h3>',
            type: 'button-full button-clear darkgreentxt',
            onTap: function(e) {
                errPopup.close();
            }
          }
        ]
      });
    }
    else {
      var orderPopup = $ionicPopup.alert({
        title: '<img style="margin:10px;" src="img/signs/pig.png" width="40%" />',
        template: '<h3 class="hh3"><strong>'+$scope.cart_cntr_pop_send_ord_tit+'?</strong></h3><h4 class="hh4">'+$scope.cart_cntr_pop_send_ord_tmp+'?</h4>',
        cssClass: 'gifterr',
        scope: $scope,
        buttons: [
          {
            text: '<h3>'+$scope.cart_cntr_pop_send_ord_btn1+'</h3>',
            type: 'button-full button-clear',
            onTap: function(e) {

              orderPopup.close();
              $timeout(function() {
                $ionicLoading.show({
                  template: '<ion-spinner icon="android" class="spinner-positive"></ion-spinner> '+$scope.cart_cntr_pop_send_ord_send+'...',
                  duration: 0
                }).then(function(){
                  // console.log("The loading indicator is now displayed");
                });
                Order.send(Cart.all(), $scope.cartsum, $scope.profile).then(function(res) {

                  $ionicLoading.hide().then(function() {});
                  
                  if(res == 1) {
                    $ionicHistory.nextViewOptions({
                      disableAnimate: false,
                      disableBack: true
                    });
                    Cart.removeAll();
                    $scope.alertPopup();
                  }
                  else if(res == 2) {
                    var errPopup = $ionicPopup.alert({
                      title: '<i class="icon ion-alert redtxt alerts" />',
                      template: '<h3 class="hh3"><strong>'+$scope.cart_cntr_pop_err1_tit+'</strong></h3><h4 class="hh4">'+$scope.cart_cntr_pop_err1_tmp+'</h4>',
                      cssClass: 'gifterr',
                      scope: $scope,
                      buttons: [
                        {
                          text: '<h3>'+$scope.conn_err_close+'</h3>',
                          type: 'button-full button-clear darkgreentxt',
                          onTap: function(e) {
                              errPopup.close();
                          }
                        }
                      ]
                    });
                  }
                  else if(res == 3) {
                    var errPopup = $ionicPopup.alert({
                      title: '<i class="icon ion-alert redtxt alerts" />',
                      template: '<h3 class="hh3"><strong>'+$scope.cart_cntr_pop_err2_tit+'</strong></h3><h4 class="hh4">'+$scope.cart_cntr_pop_err2_tmp+'</h4>',
                      cssClass: 'gifterr',
                      scope: $scope,
                      buttons: [
                        {
                          text: '<h3>'+$scope.conn_err_close+'</h3>',
                          type: 'button-full button-clear darkgreentxt',
                          onTap: function(e) {
                              errPopup.close();
                          }
                        }
                      ]
                    });
                  }
                  
                }, function(er) {
                  $ionicLoading.hide().then(function() {});
                  $scope.connectionErr();
                });
              }, 1000);
              
            }
          },
          {
            text: '<h3>'+$scope.cart_cntr_pop_send_ord_btn2+'</h3>',
            type: 'button-full button-clear',
            onTap: function(e) {
                orderPopup.close();
            }
          }
        ]
      });
    }
  }

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

})

.controller('NewsCtrl', function($scope, $state, $stateParams, $ionicHistory, $timeout, News, Cart, Gifts, Profile, Bill) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  News.firstgift().then(function(data) {
    $scope.firstgift = data;

    if(data) {
      if(Gifts.check()) {} else {Gifts.getgiftnew();}
    }

  }, function() {});

  News.loadspecial();

  $scope.$on('$ionicView.enter', function(){
    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
      }, function() {});
    }

    $timeout(function() {
      News.getgotgifts($scope.profile.user_real_id).then(function() {
        News.getnewsnew().then(function(data) {
          $scope.allnews = data;
        }, function() {});
      }, function() {});
    }, 300);

  });

  $scope.goNewsDetail = function(news) {
    if(news.news_menue_id && news.news_menue_id != '' && news.news_menue_id != '0' && news.news_cost && news.news_cost != '' && news.news_cost != '0') {
      Bill.setbill(news.news_cost, 'news&'+news.news_id+'&'+news.news_menue_id+'&'+$scope.profile.user_device_id);
      $timeout(function() {$state.go('tab.news-detail', {newsId: news.news_id});}, 100);
    }
    else {
      $state.go('tab.news-detail', {newsId: news.news_id});
    }
  }

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.acceptStyle = function() {
      $scope.myStyle = {'background-repeat': 'no-repeat', 'background-position': 'center center', 'background-size': '100% auto'};
  }

})

.controller('NewsDetailCtrl', function($scope, $state, $stateParams, $ionicHistory, News, Cart, Bill, timezoneAdd, timezoneSub) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.news = News.get($stateParams.newsId);

  $scope.$on('$ionicView.enter', function(){

    $scope.cartsum = Cart.sum();

  });

  $scope.timecalc = function(x) {
    // ОПРЕДЕЛЕНИЕ ВРЕМЯ
    var nowtime = new Date();
    var gottime = timezoneAdd.get(x * 1000);
    var nowtimediff = nowtime.getTime() - gottime;
    var onltime = new Date(gottime);
    var onlDateTime;
    var onlMonth;
    var onlDay;
    var onlHour;
    var onlMin;

    // DAYS AGO
    if(nowtimediff > 86400) {
      if(onltime.getMonth() < 9) {
          onlMonth = '0' + (onltime.getMonth() + 1);
      } else {
          onlMonth = onltime.getMonth() + 1;
      }

      if(onltime.getDate() < 10) {
          onlDay = '0' + onltime.getDate();
      } else {
          onlDay = onltime.getDate();
      }

      if(onltime.getHours() < 10) {
          onlHour = '0' + onltime.getHours();
      } else {
          onlHour = onltime.getHours();
      }
      if(onltime.getMinutes() < 10) {
          onlMin = '0' + onltime.getMinutes();
      } else {
          onlMin = onltime.getMinutes();
      }

      onlDateTime = onlDay + '.' + onlMonth + '.' + onltime.getFullYear() + ' ' + onlHour + ':' + onlMin;
    }
    // HOURS AND MINUTES AGO
    else {
      if(onltime.getHours() < 10) {
          onlHour = '0' + onltime.getHours();
      } else {
          onlHour = onltime.getHours();
      }
      if(onltime.getMinutes() < 10) {
          onlMin = '0' + onltime.getMinutes();
      } else {
          onlMin = onltime.getMinutes();
      }

      onlDateTime =  onlHour + ':' + onlMin;
    }

    return onlDateTime;
  }
  
  $scope.qrcodeString = Bill.getbill();
  $scope.size = 150;
  $scope.correctionLevel = '';
  $scope.typeNumber = 0;
  $scope.inputMode = '';
  $scope.image = false;

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.acceptStyle = function() {
      $scope.myStyle = {'background-repeat': 'no-repeat', 'background-position': 'center center', 'background-size': 'auto 100%'};
  }

})

.controller('ContactMapCtrl', function($rootScope, $cordovaDevice, $scope, $state, $stateParams, $ionicHistory, $ionicModal, $cordovaGeolocation, $timeout, $translate, Inst, Cart) {

  $scope.inst = [];

  $scope.$on('$ionicView.enter', function() {

    $translate(['day_mo', 'day_tu', 'day_we', 'day_th', 'day_fr', 'day_st', 'day_su', 'contact_map_opened', 'contact_map_closed', 'contact_map_reserved']).then(function(res) {
      $scope.day_mo = res.day_mo;
      $scope.day_tu = res.day_tu;
      $scope.day_we = res.day_we;
      $scope.day_th = res.day_th;
      $scope.day_fr = res.day_fr;
      $scope.day_st = res.day_st;
      $scope.day_su = res.day_su;
      $scope.contact_map_opened = res.contact_map_opened;
      $scope.contact_map_closed = res.contact_map_closed;
      $scope.contact_map_reserved = res.contact_map_reserved;
    });

    $scope.cartsum = Cart.sum();

    if(Inst.check()) {
      $scope.inst = Inst.getinstold();
    }
    else {
      Inst.getinstnew().then(function(data) {
        $scope.inst = data;
      }, function() {});
    }

  });

  $scope.goContactList = function() {
    $state.go('tab.contact-list');
  }

  var myMap;
  var placemark;
  var today = new Date();
  var onlHour;
  var onlMin;
  // HOURS AND MINUTES AGO
  if(today.getHours() < 10) {
      onlHour = '0' + today.getHours();
  } else {
      onlHour = today.getHours();
  }
  if(today.getMinutes() < 10) {
      onlMin = '0' + today.getMinutes();
  } else {
      onlMin = today.getMinutes();
  }

  if($rootScope.platform == 'iOS') {
    $scope.StyleL = {'z-index':'20','margin-right':'-5px','margin-top':'16px','border-radius':'4px 0px 0px 4px','padding':'0px 24px','max-height': '44px'};
    $scope.StyleR = {'z-index':'20','margin-left':'-5px','margin-top':'16px','border-radius':'0px 4px 4px 0px','background':'rgba(0,0,0,0)','color':'#fff','padding':'0px 24px','max-height': '44px'};
  }
  else if($rootScope.platform == 'Android') {
    $scope.StyleL = {'z-index':'20','margin-right':'-5px','margin-top':'0px','border-radius':'4px 0px 0px 4px','padding':'0px 24px','max-height': '44px'};
    $scope.StyleR = {'z-index':'20','margin-left':'-5px','margin-top':'0px','border-radius':'0px 4px 4px 0px','background':'rgba(0,0,0,0)','color':'#fff','padding':'0px 24px','max-height': '44px'};
  }

  var hourmins =  onlHour.toString() +''+ onlMin.toString();

  function formatPhone(text) {
    var text = text.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3-$4-$5");
    return text;
  }

  $scope.showListBtn = false;

  $scope.distanceTo = 0;

  function addPlacemark(inst) {

    var placemarkx = new ymaps.Placemark([inst.office_lat, inst.office_lon], {
      // streetName: inst.name
    }, {
      iconImageHref: 'img/signs/location.png',
      iconImageSize: [50, 50],
      iconImageOffset: [-3, -50],
      hideIconOnBalloonOpen: false
    });

    var mylat = Inst.getloc()[0] ? Inst.getloc()[0] : inst.office_lat;
    var mylon = Inst.getloc()[1] ? Inst.getloc()[1] : inst.office_lon;

    $scope.distanceTo = $scope.getDistanceFromLatLonInKm(mylat, mylon, inst.office_lat, inst.office_lon);
    
    var opncls = ' ('+$scope.contact_map_closed+')';
    var opnclsnum = 0;
    var indicat = '<span class="indicatclose"></span>';
    var worktime = '';
    var busHours = [];
    var todayday = today.getDay()-1;
        todayday = inst.office_bus_hours[todayday];
    
    if(todayday > 0) {

      if(todayday.substr(0,4) > todayday.substr(4,8)) {
        if(todayday.substr(0,4) <= hourmins && hourmins <= 2359) {
          // open
          opncls = ' ('+$scope.contact_map_opened+')';
          opnclsnum = 1;
          indicat = '<span class="indicatopen"></span>';
        }
        else if(hourmins >= 0000 && hourmins <= todayday.substr(4,8)) {
          // open
          opncls = ' ('+$scope.contact_map_opened+')';
          opnclsnum = 1;
          indicat = '<span class="indicatopen"></span>';
        }
      }
      else if(todayday.substr(0,4) == todayday.substr(4,8)) {
        // open
        opncls = ' ('+$scope.contact_map_opened+')';
        opnclsnum = 1;
        indicat = '<span class="indicatopen"></span>';
      }
      else if(todayday.substr(0,4) < todayday.substr(4,8)) {
        if(todayday.substr(0,4) <= hourmins && hourmins <= todayday.substr(4,8)) {
          // open
          opncls = ' ('+$scope.contact_map_opened+')';
          opnclsnum = 1;
          indicat = '<span class="indicatopen"></span>';
        }
      }
    
      worktime += todayday.substr(0, 2)+':'+todayday.substr(2, 2);
      worktime += ' - '+todayday.substr(4, 2)+':'+todayday.substr(6, 2);

    }

    for(var z=0;z<inst.office_bus_hours.length;z++) {

      if(inst.office_bus_hours[z] != '0') {
        var worktimes = inst.office_bus_hours[z].substr(0, 2)+':'+inst.office_bus_hours[z].substr(2, 2)+' - '+inst.office_bus_hours[z].substr(4, 2)+':'+inst.office_bus_hours[z].substr(6, 2);
        busHours.push(worktimes);
      }
      else {
        busHours.push(0);
      }

    }

    Inst.setworktimes(inst.office_id, busHours);
    Inst.setdistance(inst.office_id, $scope.distanceTo);
    Inst.setworktime(inst.office_id, worktime);
    Inst.setopncls(inst.office_id, opnclsnum);

    // if(!$scope.showListBtn) {
    //   $scope.showListBtn = true;
    // }

    placemarkx.events.add('click', function () {

      // var myPosition = [];
      myMap.geoObjects.each(function(obj) {
        if(obj.properties.get('hintContent') != 'Я') {
          obj.options.set('iconImageHref', 'img/signs/location.png');
          // myPosition = obj.geometry.getCoordinates();
        }
      });
      placemarkx.options.set('iconImageHref', 'img/signs/location_.png');

      var modaltemp = '<ion-modal-view class="modalviewmap"><ion-header-bar><h1 class="title"></h1><button class="button button-clear button-small" ng-click="modal.remove()" style="color:#006C30;"><i class="icon ion-close"></i></button></ion-header-bar><ion-content><div class="row"><div class="col col-75"><h3 class="hh3"><strong>'+inst.office_adress+'</strong></h3>'+indicat+'<span>'+worktime+opncls+'</span></div><div class="col" style="text-align:right;"><img src="img/signs/navigate.png" height="15" /><small style="color:#006C30 !important;">'+$scope.distanceTo+' м</small></div></div><div class="row" style="border-top:1px solid rgba(0,0,0,0.2);"><div class="col"><button ng-click="modal.remove()" ui-sref="tab.reservation" class="button button-balanced button-block" style="background-color:#7ED321;">'+$scope.contact_map_reserved+'</button></div></div><div class="row" style="border-top:1px solid rgba(0,0,0,0.2);"><div class="col" style="vertical-align:middle;" onclick="window.open(\'tel:'+formatPhone(inst.office_tel[0])+'\', \'_system\', \'location=yes\')"><h3 class="hh3" style="display:inline-block;margin:10px;">'+formatPhone(inst.office_tel[0])+'</h3><img src="img/btn/btncall.png" style="height:40px;float:right;" /></div></div><div class="row" style="border-top:1px solid rgba(0,0,0,0.2);"><div class="col" style="vertical-align:middle;" onclick="window.open(\'http://website.com\', \'_system\')"><h3 class="hh3" style="display:inline-block;margin:10px;">'+inst.office_site+'</h3><img src="img/btn/btnwww.png" style="height:40px;float:right;" /></div></div></ion-content></ion-modal-view>';

      $scope.modal = $ionicModal.fromTemplate(modaltemp, function(modal) {
        $scope.modal = modal;
      }, {
        animation: 'slide-in-up',
        backdropClickToClose: true,
        hardwareBackButtonClose: true
      });

      $scope.modal.show();
      
    });
    myMap.geoObjects.add(placemarkx);

  }

  function updPlacemark(inst) {
    
    var mylat = Inst.getloc()[0] ? Inst.getloc()[0] : inst.office_lat;
    var mylon = Inst.getloc()[1] ? Inst.getloc()[1] : inst.office_lon;

    // alert(Inst.getloc()[0] + ' ' + Inst.getloc()[1])

    $scope.distanceTo = $scope.getDistanceFromLatLonInKm(mylat, mylon, inst.office_lat, inst.office_lon);

    Inst.setdistance(inst.office_id, $scope.distanceTo);

  }

  function getLocation() {

    if($scope.inst.length > 0) {
      for(var x=0;x<$scope.inst.length;x++) {
        addPlacemark($scope.inst[x]);
      }
    }

    if(!$scope.showListBtn) {
      $scope.showListBtn = true;
    }

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(
      function(position) {

        Inst.setloc([position.coords.latitude, position.coords.longitude]);

        myMap.setCenter([position.coords.latitude, position.coords.longitude], 15);

        placemark = new ymaps.Placemark([position.coords.latitude, position.coords.longitude], {
          hintContent: 'Я'
        }, {
          iconImageHref: 'img/signs/my_location.png',
          iconImageSize: [42, 42],
          iconImageOffset: [-3, -42]
        });

        myMap.geoObjects.add(placemark);

        if($scope.inst.length > 0) {
          for(var x=0;x<$scope.inst.length;x++) {
            updPlacemark($scope.inst[x]);
          }
        }

      },
      function(er) {
        if($scope.inst.length > 0) {
          for(var x=0;x<$scope.inst.length;x++) {
            addPlacemark($scope.inst[x]);
          }
        }
        // alert("============================> error: "+JSON.stringify(er));
      }
    );
  }

  function movePlacemark() {
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(
      function(position) {
        myMap.setCenter([position.coords.latitude, position.coords.longitude]);
        placemark.geometry.setCoordinates([position.coords.latitude, position.coords.longitude]);
      },
      function(er) {
        // console.log("error: "+JSON.stringify(er));
      }
    );
  }

  function yainit() {

      myMap = new ymaps.Map('map', {
          center: [0, 0],
          zoom: 17
      });

      getLocation();

      ZoomLayout = ymaps.templateLayoutFactory.createClass('<img id="zoom-in" src="img/btn/zoomin.png" width="50" /><br/><br/><img id="zoom-out" src="img/btn/zoomout.png" width="50" /><br/><br/><br/><br/><img id="get-location" src="img/btn/getlocation.png" width="50" />', {
        build: function () {
            ZoomLayout.superclass.build.call(this);
            document.getElementById('zoom-in').onclick = function(){myMap.setZoom( myMap.getZoom() + 1 );};
            document.getElementById('zoom-out').onclick = function(){myMap.setZoom( myMap.getZoom() - 1 );};
            document.getElementById('get-location').onclick = function(){movePlacemark();};
        }
      }),

      zoomControl = new ymaps.control.SmallZoomControl({
          layout: ZoomLayout
      });

      myMap.controls.add(zoomControl, {
        right : 10,
        top : 150
      });

      // POLYGON
      // var myPolygon = new ymaps.Polygon([[
      //      [53.8595, 27.6819],
      //      [53.8692, 27.6472],
      //      [53.8807, 27.6563],
      //      [53.9037, 27.6359],
      //      [53.9070, 27.6305],
      //      [53.9071, 27.6132],
      //      [53.9153, 27.6040],
      //      [53.9231, 27.6003],
      //      [53.9247, 27.5982],
      //      [53.9315, 27.5766],
      //      [53.9320, 27.5486],
      //      [53.9298, 27.5342],
      //      [53.9287, 27.5108],
      //      [53.9280, 27.5084],
      //      [53.9167, 27.4952],
      //      [53.8952, 27.4977],
      //      [53.8835, 27.5050],
      //      [53.8801, 27.4995],
      //      [53.8687, 27.4910],
      //      [53.8574, 27.4778],
      //      [53.8425, 27.4697],
      //      [53.8352, 27.5333],
      //      [53.8328, 27.5554],
      //      [53.8337, 27.6422],
      //      [53.8360, 27.6544],
      //      [53.8407, 27.6634],
      //      [53.8595, 27.6819]
      //  ]]);

      //  myMap.geoObjects.add(myPolygon);

      // GEOOBJECT WITH IMAGE
      // var rest1 = new ymaps.GeoObject({
      // geometry: {
      //     type: "Point",
      //     coordinates: [53.9018, 27.5827]
      // },
      // properties: {
      //     iconContent: '<div style="background-color:#fff;"><img src="img/signs/check.png" width="70px"></div><p style="font-size:10px; text-align:center;color:#000;">ул. Улица, 1</p>',
      //     balloonContent: '<strong>Моя компания</strong><br>Город, ул. Улица<br>тел. +375 17 1234567'
      // }
      // }, {
      //     preset: 'twirl#redStretchyIcon',
      //     draggable: false
      // });
      // myMap.geoObjects.add(rest1);

      // BALOON
      // myMap.balloon.open([53.8627, 27.5537], "Зона доставки", {
      //     closeButton: false
      // });

      // myPlacemark.balloon.open();

  }

  ymaps.ready(yainit);

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = $scope.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = $scope.deg2rad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos($scope.deg2rad(lat1)) * Math.cos($scope.deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return (d).toFixed(2);
  }

  $scope.deg2rad = function(deg) {
    return deg * (Math.PI/180);
  }

})

.controller('ContactListCtrl', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicModal, $timeout, $cordovaGeolocation, $cordovaDevice, $translate, Inst, Cart) {

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true

  $scope.goContactMap = function() {
    $state.go('tab.contact-map');
  }

  $scope.$on('$ionicView.enter', function(){

    $translate(['day_mo', 'day_tu', 'day_we', 'day_th', 'day_fr', 'day_st', 'day_su', 'contact_list_phones', 'blocked_cancel']).then(function(res) {
      $scope.day_mo = res.day_mo;
      $scope.day_tu = res.day_tu;
      $scope.day_we = res.day_we;
      $scope.day_th = res.day_th;
      $scope.day_fr = res.day_fr;
      $scope.day_st = res.day_st;
      $scope.day_su = res.day_su;
      $scope.contact_list_phones = res.contact_list_phones;
      $scope.blocked_cancel = res.blocked_cancel;

      $scope.days = [$scope.day_mo, $scope.day_tu, $scope.day_we, $scope.day_th, $scope.day_fr, $scope.day_st, $scope.day_su];

    });

    $scope.cartsum = Cart.sum();

    if(Inst.check()) {
      $scope.institutions = Inst.getinstold();
    }
    else {
      Inst.getinstnew().then(function(data) {
        $scope.institutions = data;
      }, function() {});
    }

  });

  if($rootScope.platform == 'iOS') {
    $scope.StyleL = {'z-index':'20','margin-right':'-5px','margin-top':'16px','border-radius':'4px 0px 0px 4px','padding':'0px 24px','max-height': '44px','background':'rgba(0,0,0,0)','color':'#fff'};
    $scope.StyleR = {'z-index':'20','margin-left':'-5px','margin-top':'16px','border-radius':'0px 4px 4px 0px','padding':'0px 24px','max-height': '44px'};
  }
  else if($rootScope.platform == 'Android') {
    $scope.StyleL = {'z-index':'20','margin-right':'-5px','margin-top':'0px','border-radius':'4px 0px 0px 4px','padding':'0px 24px','max-height': '44px','background':'rgba(0,0,0,0)','color':'#fff'};
    $scope.StyleR = {'z-index':'20','margin-left':'-5px','margin-top':'0px','border-radius':'0px 4px 4px 0px','padding':'0px 24px','max-height': '44px'};
  }

  var myMap2;
  var myCollection;

  function yandinit() {
    myMap2 = new ymaps.Map('map2', {
        center: [0, 0],
        zoom: 17,
        controls: []
    });
    myCollection = new ymaps.GeoObjectCollection();
  }

  ymaps.ready(yandinit);

  function formatPhone(text) {
    var text = text.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3-$4-$5");
    return text;
  }

  $scope.call = function(inst) {
    var callbtns = [];
    for(var x=0;x<inst.office_tel.length;x++) {
      var phonname = '&nbsp;';
      if(inst.office_tel_n[x]) {
        phonname = inst.office_tel_n[x];
      }
      callbtns += '<div class="row" style="border-top:1px solid rgba(0,0,0,0.2);"><div class="col" style="vertical-align:middle;" onclick="window.open(\'tel:'+inst.office_tel[x]+'\', \'_system\', \'location=yes\')"><h3 class="hh3" style="display:inline-block;margin:10px;">'+formatPhone(inst.office_tel[x])+'</h3><img src="img/btn/btncall.png" style="height:40px;float:right;" /><p style="margin-left:10px;color:#6D6D72;">'+phonname+'</p></div></div>';
    }

    var modaltemp = '<ion-modal-view class="modalview" style="border-radius:0px;"><ion-header-bar align-title="left"><h1 class="title" style="color:#6D6D72;font-size:14px;">'+$scope.contact_list_phones+'</h1><button class="button button-clear button-small" ng-click="modal.remove()" style="color:#006C30;">'+$scope.blocked_cancel+'</button></ion-header-bar><ion-content>'+callbtns+'</ion-content></ion-modal-view>';

      $scope.modal = $ionicModal.fromTemplate(modaltemp, function(modal) {
        $scope.modal = modal;
      }, {
        animation: 'slide-in-up',
        backdropClickToClose: true,
        hardwareBackButtonClose: true
      });

      $scope.modal.show();
  }

  $scope.addPlacemark = function(coords) {
    myCollection.removeAll();
    myMap2.setCenter(coords, 15);
    var placemark = new ymaps.Placemark(coords, {
      // streetName: inst.name
    }, {
      iconImageHref: 'img/signs/location.png',
      iconImageSize: [50, 50],
      iconImageOffset: [-3, -50],
      hideIconOnBalloonOpen: false
    });
    myCollection.add(placemark);
    myMap2.geoObjects.add(myCollection);
  }

  document.getElementById('map2').style.display = 'none';

  $scope.shownav = false;

  $scope.toggleGroup = function(institution) {
    if ($scope.isGroupShown(institution)) {
      $scope.shownGroup = null;
      document.getElementById('map2').style.display = 'none';
      $scope.shownav = false;
    } else {
      $scope.shownGroup = institution;
      $scope.addPlacemark([institution.office_lat, institution.office_lon]);
      document.getElementById('map2').style.display = 'block';
      $scope.shownav = true;
    }
  };

  $scope.isGroupShown = function(institution) {
    return $scope.shownGroup === institution;
  };

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }
  
})

.controller('ElseCtrl', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicModal, $ionicPopup, $ionicActionSheet, $cordovaSQLite, $cordovaDevice, $timeout, $translate, $ionicLoading, $http, $cordovaNetwork, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaImagePicker, $cordovaBarcodeScanner, Inst, Cart, Bill, Profile, HtmlEnt, FAQ) {

  $scope.$on('$ionicView.enter', function(){

    $translate(['conn_err_tit', 'conn_err_tmp', 'conn_err_close', 'else_push_thank', 'else_push_thank_text', 'else_push_btn_close', 'review_ctrl_pop_thanks_tit', 'review_ctrl_pop_thanks_temp', 'review_ctrl_pop_thanks_btn1', 'else_review_choise', 'else_review_choose_pic', 'else_review_make_pic', 'else_review_take_pic', 'else_review_cancel', 'blocked_title', 'blocked_body', 'blocked_cancel', 'else_pop_phone_tit', 'else_pop_phone_tmp', 'else_pop_phone_btn1', 'else_pop_phone_btn2', 'promo_modal_pop_tit', 'promo_modal_pop_tmp', 'promo_modal_pop_btn', 'promo_modal_pop_succ_tit', 'promo_modal_pop_succ_tmp', 'promo_modal_pop_succ_btn', 'promo_modal_pop_wrong_tit', 'promo_modal_pop_wrong_tmp', 'promo_modal_pop_wrong_btn', 'discount_modal_pop_tit', 'discount_modal_pop_tmp', 'discount_modal_pop_btn1', 'discount_modal_pop_btn2', 'discount_modal_exists_pop_tit', 'discount_modal_exists_pop_tmp', 'discount_modal_exists_pop_btn', 'discount_modal_wrong_pop_tit', 'discount_modal_wrong_pop_tmp', 'discount_modal_wrong_pop_btn1', 'discount_modal_wrong_pop_btn2', 'discount_modal_err_pop_tit', 'discount_modal_err_pop_tmp', 'discount_modal_err_pop_btn']).then(function(res) {
      $scope.conn_err_tit = res.conn_err_tit;
      $scope.conn_err_tmp = res.conn_err_tmp;
      $scope.conn_err_close = res.conn_err_close;
      $scope.else_push_thank = res.else_push_thank;
      $scope.else_push_thank_text = res.else_push_thank_text;
      $scope.else_push_btn_close = res.else_push_btn_close;
      $scope.review_ctrl_pop_thanks_tit = res.review_ctrl_pop_thanks_tit;
      $scope.review_ctrl_pop_thanks_temp = res.review_ctrl_pop_thanks_temp;
      $scope.review_ctrl_pop_thanks_btn1 = res.review_ctrl_pop_thanks_btn1;
      $scope.review_ctrl_pop_review_tit = res.review_ctrl_pop_review_tit;
      $scope.review_ctrl_pop_review_temp = res.review_ctrl_pop_review_temp;
      $scope.review_ctrl_pop_review_btn1 = res.review_ctrl_pop_review_btn1;
      $scope.review_ctrl_pop_review_btn2 = res.review_ctrl_pop_review_btn2;
      $scope.review_ctrl_pop_tooften_tit = res.review_ctrl_pop_tooften_tit;
      $scope.review_ctrl_pop_tooften_temp = res.review_ctrl_pop_tooften_temp;
      $scope.else_review_choise = res.else_review_choise;
      $scope.else_review_choose_pic = res.else_review_choose_pic;
      $scope.else_review_make_pic = res.else_review_make_pic;
      $scope.else_review_take_pic = res.else_review_take_pic;
      $scope.else_review_cancel = res.else_review_cancel;
      $scope.blocked_title = res.blocked_title;
      $scope.blocked_body = res.blocked_body;
      $scope.blocked_cancel = res.blocked_cancel;
      $scope.else_pop_phone_tit = res.else_pop_phone_tit;
      $scope.else_pop_phone_tmp = res.else_pop_phone_tmp;
      $scope.else_pop_phone_btn1 = res.else_pop_phone_btn1;
      $scope.else_pop_phone_btn2 = res.else_pop_phone_btn2;
      $scope.promo_modal_pop_tit = res.promo_modal_pop_tit;
      $scope.promo_modal_pop_tmp = res.promo_modal_pop_tmp;
      $scope.promo_modal_pop_btn = res.promo_modal_pop_btn;
      $scope.promo_modal_pop_succ_tit = res.promo_modal_pop_succ_tit;
      $scope.promo_modal_pop_succ_tmp = res.promo_modal_pop_succ_tmp;
      $scope.promo_modal_pop_succ_btn = res.promo_modal_pop_succ_btn;
      $scope.promo_modal_pop_wrong_tit = res.promo_modal_pop_wrong_tit;
      $scope.promo_modal_pop_wrong_tmp = res.promo_modal_pop_wrong_tmp;
      $scope.promo_modal_pop_wrong_btn = res.promo_modal_pop_wrong_btn;

      $scope.discount_modal_pop_tit = res.discount_modal_pop_tit;
      $scope.discount_modal_pop_tmp = res.discount_modal_pop_tmp;
      $scope.discount_modal_pop_btn1 = res.discount_modal_pop_btn1;
      $scope.discount_modal_pop_btn2 = res.discount_modal_pop_btn2;
      $scope.discount_modal_exists_pop_tit = res.discount_modal_exists_pop_tit;
      $scope.discount_modal_exists_pop_tmp = res.discount_modal_exists_pop_tmp;
      $scope.discount_modal_exists_pop_btn = res.discount_modal_exists_pop_btn;
      $scope.discount_modal_wrong_pop_tit = res.discount_modal_wrong_pop_tit;
      $scope.discount_modal_wrong_pop_tmp = res.discount_modal_wrong_pop_tmp;
      $scope.discount_modal_wrong_pop_btn1 = res.discount_modal_wrong_pop_btn1;
      $scope.discount_modal_wrong_pop_btn2 = res.discount_modal_wrong_pop_btn2;
      $scope.discount_modal_err_pop_tit = res.discount_modal_err_pop_tit;
      $scope.discount_modal_err_pop_tmp = res.discount_modal_err_pop_tmp;
      $scope.discount_modal_err_pop_btn = res.discount_modal_err_pop_btn;

      $scope.reviewselected = {
        device_id: $rootScope.uuid,
        inst_id: $rootScope.institution,
        location: $scope.else_review_choise,
        rating: 5,
        snapshot: '<span>'+$scope.else_review_choose_pic+'</span>',
        pic: '',
        ratingtxt: '',
        newusr: 'rate'
      }

    });

    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
      }, function() {});
    }

  });

  $scope.connectionErr = function() {
    var errPopup = $ionicPopup.alert({
      title: '<i class="icon ion-alert redtxt alerts" />',
      template: '<h3 class="hh3"><strong>'+$scope.conn_err_tit+'</strong></h3><h4 class="hh4">'+$scope.conn_err_tmp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.conn_err_close+'</h3>',
          type: 'button-full button-clear darkgreentxt',
          onTap: function(e) {
              errPopup.close();
          }
        }
      ]
    });
  }

  $scope.htmlEntities = function(toencode) {
    return HtmlEnt.decodeEntities(toencode);
  }

  var permissions = cordova.plugins.permissions;
  
  var list = [
      permissions.READ_EXTERNAL_STORAGE,
      permissions.WRITE_EXTERNAL_STORAGE
  ];

  $scope.calculated = 0;

  $scope.ratingmax = 5;

  var myPopup;

  $scope.qrcodeString = '0';
  $scope.size = 150;
  $scope.correctionLevel = '';
  $scope.typeNumber = 0;
  $scope.inputMode = '';
  $scope.image = false;

  $ionicModal.fromTemplateUrl('templates/modal-bonus.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalBonus = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-review.html', {
    id: '2',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalReview = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-contact.html', {
    id: '3',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalContact = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-promo.html', {
    id: '4',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalPromo = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-discount.html', {
    id: '5',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalDiscount = modal;
  });

  $scope.openModal = function(index) {
    if (index == 1) {$scope.oModalBonus.show();}
    else if(index == 2) {$scope.oModalReview.show();}
    else if(index == 3) {$scope.oModalContact.show();}
    else if(index == 4) {$scope.oModalPromo.show();}
    else if(index == 5) {$scope.oModalDiscount.show();}
  };

  $scope.closeModal = function(index) {
    if (index == 1) {$scope.oModalBonus.hide();}
    else if(index == 2) {$scope.oModalReview.hide();}
    else if(index == 3) {$scope.oModalContact.hide();}
    else if(index == 4) {$scope.oModalPromo.hide();}
    else if(index == 5) {$scope.oModalDiscount.hide();}
  };

  $scope.$on('modal.shown', function(event, modal) {
    if(modal.id == 3 && $scope.calculated == 0) {

      var today = new Date();
      var onlHour;
      var onlMin;
      
      if(today.getHours() < 10) {
          onlHour = '0' + today.getHours();
      } else {
          onlHour = today.getHours();
      }
      if(today.getMinutes() < 10) {
          onlMin = '0' + today.getMinutes();
      } else {
          onlMin = today.getMinutes();
      }
      var hourmins =  onlHour.toString() +''+ onlMin.toString();

      function inststart() {
        if($scope.institutions.length > 0) {
          for(var x=0;x<$scope.institutions.length;x++) {

            var inst = $scope.institutions[x];
            
            var opncls = ' (закрыто)';
            var opnclsnum = 0;
            var indicat = '<span class="indicatclose"></span>';
            var worktime = '';
            var todayday = today.getDay()-1;
                todayday = inst.office_bus_hours[todayday];

            if(todayday > 0) {

              if(todayday.substr(0,4) > todayday.substr(4,8)) {
                if(todayday.substr(0,4) <= hourmins && hourmins <= 2359) {
                  // open
                  opncls = ' (открыто)';
                  opnclsnum = 1;
                  indicat = '<span class="indicatopen"></span>';
                }
                else if(hourmins >= 0000 && hourmins <= todayday.substr(4,8)) {
                  // open
                  opncls = ' (открыто)';
                  opnclsnum = 1;
                  indicat = '<span class="indicatopen"></span>';
                }
              }
              else if(todayday.substr(0,4) == todayday.substr(4,8)) {
                // open
                opncls = ' (открыто)';
                opnclsnum = 1;
                indicat = '<span class="indicatopen"></span>';
              }
              else if(todayday.substr(0,4) < todayday.substr(4,8)) {
                if(todayday.substr(0,4) <= hourmins && hourmins <= todayday.substr(4,8)) {
                  // open
                  opncls = ' (открыто)';
                  opnclsnum = 1;
                  indicat = '<span class="indicatopen"></span>';
                }
              }

              worktime += todayday.substr(0, 2)+':'+todayday.substr(2, 2);
              worktime += ' - '+todayday.substr(4, 2)+':'+todayday.substr(6, 2);

            }

            Inst.setworktime(inst.office_id, worktime);
            Inst.setopncls(inst.office_id, opnclsnum);

          }
        }
      }

      if(Inst.check()) {
        $scope.institutions = Inst.getinstold();
        inststart();
      }
      else {
        Inst.getinstnew().then(function(data) {
          $scope.institutions = data;
          inststart();
        }, function() {});
      }

      $scope.calculated = 1;

    }
    else if(modal.id == 5) {
      $scope.qrcodeString = Bill.getbill();
    }
  });

  $scope.$on('modal.hidden', function(event, modal) {

  });

  $scope.$on('$destroy', function() {
    $scope.oModalBonus.remove();
    $scope.oModalReview.remove();
    $scope.oModalContact.remove();
    $scope.oModalPromo.remove();
    $scope.oModalDiscount.remove();
  });

  $scope.takeInst = function(institution) {
    $scope.reviewselected.location = institution.office_adress;
    $scope.closeModal(3);
  }

  $scope.showImageMaker = function() {

    $ionicActionSheet.show({
      buttons: [
        { text: '<span class="darkgreentxt">'+$scope.else_review_make_pic+'</span>' },
        { text: '<span class="darkgreentxt">'+$scope.else_review_take_pic+'</span>' }
      ],
      cancelText: '<b class="darkgreentxt">'+$scope.else_review_cancel+'</b>',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        if(index == 0) {
          $scope.reviewSelfie();
        }
        else if(index == 1) {
          $scope.reviewSelPic();
        }
        return true;
      }
    });

  }

  $scope.alertPopup = function() {
    myPopup = $ionicPopup.alert({
      title: '<img style="margin:10px;" src="img/signs/heartbubble.png" width="40%" />',
      template: '<h3 class="hh3"><strong>'+$scope.else_push_thank+'!</strong></h3><h4 class="hh4">'+$scope.else_push_thank_text+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.review_ctrl_pop_thanks_btn1+'</h3>',
          type: 'button-full button-clear darkgreentxt',
          onTap: function(e) {
              myPopup.close();
              $timeout(function() {
                $ionicHistory.nextViewOptions({
                  disableAnimate: false,
                  disableBack: true
                });
                $state.go('tab.card');
              }, 500);
          }
        }
      ]
    });
  }

  $scope.popupClose = function() {
    myPopup.close();
  }

  $scope.notSendReview = function() {
    $scope.closeModal(2);
  }

  $scope.reviewAsk = function() {
    $ionicHistory.nextViewOptions({
      disableAnimate: false,
      disableBack: true
    });
    var alertPopup = $ionicPopup.alert({
      title: '<img style="margin:10px;" src="img/signs/pig.png" width="40%" />',
      template: '<h3 class="hh3"><strong>'+$scope.review_ctrl_pop_review_tit+'</strong></h3><h4 class="hh4">'+$scope.review_ctrl_pop_review_temp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.review_ctrl_pop_review_btn1+'</h3>',
          type: 'button-full button-clear',
          onTap: function(e) {
            alertPopup.close();
            $timeout(function() {
              $scope.openModal(2);
            }, 1000);
          }
        },
        {
          text: '<h3>'+$scope.review_ctrl_pop_review_btn2+'</h3>',
          type: 'button-full button-clear',
          onTap: function(e) {
              alertPopup.close();
              $timeout(function() {
                $state.go('tab.card');
              }, 500);
          }
        }
      ]
    });
  }

  // НАСТРОЙКИ СЕЛФИ
  var optionsselfie = {
      quality: 70,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      targetWidth: 700,
      targetHeight: 700,
      correctOrientation: true
  };

  // НАСТРОЙКИ ВЫБОРА ФОТО
  var optionsImg = {
    maximumImagesCount: 1,
    width: 800,
    height: 800,
    quality: 80
  };

  $scope.loadingpercent = 0;

  $scope.selfieBtn = true;
  
  // СДЕЛАТЬ СЕЛФИ
  $scope.reviewSelfie = function() {

      if($cordovaNetwork.isOnline()) {

        permissions.hasPermission(list, function(persucc) {
          
          permissions.requestPermissions(list, function(status) {
    
            if(!status.hasPermission) {
                // alert('ERROR PERMISSION NOT GRANTED ==================================> ')
            }
            else {

              if($scope.selfieBtn) {

                  $scope.selfieBtn = false;
                  
                  $scope.picPrev = 1;

                  $cordovaCamera.getPicture(optionsselfie).then(function(imageURI) {

                      // DATE - TIME IN SECONDS
                      var when = Math.floor(new Date().getTime() / 1000);

                      var randpicname = $scope.profile.user_real_id + '_' + when;

                      var namefilesplit = imageURI.split('/');
                      var namefile = namefilesplit[namefilesplit.length-1];
                      var oldurlsplit = imageURI.split(namefile);
                      var oldurl = oldurlsplit[0];
                      var topath = cordova.file.dataDirectory + $rootScope.inst_dir + '/' + randpicname + '.jpg';
                      var tourl = cordova.file.dataDirectory + $rootScope.inst_dir + '/';

                      $cordovaFile.moveFile(oldurl, namefile, tourl, randpicname + '.jpg').then(function(success) {
                          // console.log("OK ==============================> "+JSON.stringify(success))
                          $scope.reviewSavePic(topath, randpicname);

                      }, function(er) {
                          // console.log("ERROR ==============================> "+JSON.stringify(er))
                      });


                  }, function(err) {
                      $scope.selfieBtn = true;
                  });

              }

            }
            
          }, function(pererror) {
              $ionicLoading.hide().then(function() {});
              // alert('ERROR PERMISSION PLUGIN ==================================> '+JSON.stringify(pererror))
          })

        }, null);

      }
      else {
        $scope.connectionErr();
      }
  }

  // ВЫБРАТЬ ФОТО
  $scope.reviewSelPic = function() {

      if($cordovaNetwork.isOnline()) {

        permissions.hasPermission(list, function(persucc) {
          
          permissions.requestPermissions(list, function(status) {
    
            if(!status.hasPermission) {
                // alert('ERROR PERMISSION NOT GRANTED ==================================> ')
            }
            else {

              if($scope.selfieBtn) {

                  $scope.selfieBtn = false;

                    $cordovaImagePicker.getPictures(optionsImg)
                      .then(function (results) {

                          $scope.selfieBtn = true;

                          if(results.length > 0) {

                            for (var i = 0; i < results.length; i++) {

                              // DATE - TIME IN SECONDS
                              var when = Math.floor(new Date().getTime() / 1000);

                              var randpicname = $scope.profile.user_real_id + '_' + when;

                              var namefilesplit = results[i].split('/');
                              var namefile = namefilesplit[namefilesplit.length-1];
                              var oldurlsplit = results[i].split(namefile);
                              var oldurl = oldurlsplit[0];
                              var topath = cordova.file.dataDirectory + $rootScope.inst_dir + '/' + randpicname + '.jpg';
                              var tourl = cordova.file.dataDirectory + $rootScope.inst_dir + '/';

                              $cordovaFile.copyFile(oldurl, namefile, tourl, randpicname + '.jpg').then(function(success) {

                                $scope.reviewSavePic(topath, randpicname);

                              }, function(er) {});
                              
                            }

                          }

                      }, function(error) {
                          $scope.selfieBtn = true;
                      });

              }

            }
            
          }, function(pererror) {
              $ionicLoading.hide().then(function() {});
              // alert('ERROR PERMISSION PLUGIN ==================================> '+JSON.stringify(pererror))
          })

        }, null);

      } else {
          $scope.connectionErr();
      }

  }

  // ЗАГРУЗКА СЕЛФИ
  $scope.reviewSavePic = function(imgpath, randpicname) {

      // Setup the loader
      $ionicLoading.show({
          content: '<ion-spinner icon="android" class="spinner-positive"></ion-spinner> '+$scope.loadingpercent+'</span>',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 50,
          showDelay: 0
      });

      // UPLOADING SOUND
      var options = {
          fileKey: "file",
          fileName: randpicname + '.jpg',
          chunkedMode: false,
          mimeType: 'image/jpeg'
      }

      $cordovaFileTransfer.upload("http://www.olegtronics.com/admin/coms/upload.php?usrupl=1&preview=1&user_id=" + $scope.profile.user_real_id, imgpath, options).then(function(result) {
          
          var srtringify = JSON.stringify(result.response);
          var parsingres = JSON.parse(JSON.parse(srtringify));

          var messent = parsingres.user_upd;

          if(messent > 0) {

            $scope.reviewselected.pic = randpicname + '.jpg';
            $scope.reviewselected.snapshot = '<img src="http://www.olegtronics.com/admin/img/user/'+$scope.profile.user_institution+'/pic/'+$scope.reviewselected.pic+'" height="50" />';

          }

          $ionicLoading.hide().then(function() {});

      }, function(err) {

          $ionicLoading.hide().then(function() {
            $scope.connectionErr();
          });

      }, function (progress) {
          $scope.loadingpercent = Math.round((progress.loaded / progress.total) * 100) + ' %';
      });

  }

  $scope.sendReview = function() {
      
      $scope.reviewselected.ratingtxt += ' - ' + $scope.reviewselected.location;

      $http.post($rootScope.generalscript, JSON.stringify($scope.reviewselected)).then(function(e) {

          var data = e.data;

          // console.log('======================> YES: '+JSON.stringify(data))

          if(data[0].reviewOK == '0') {

          }
          else if(data[0].reviewOK == '1') {

              $scope.closeModal(2);
              $timeout(function() {$scope.alertPopup()}, 1000);

          }
          else if(data[0].reviewOK == '2') {
              var errPopup = $ionicPopup.alert({
                title: '<i class="icon ion-alert redtxt alerts" />',
                template: '<h3 class="hh3"><strong>'+$scope.conn_err_tit+'</strong></h3><h4 class="hh4">'+$scope.review_ctrl_pop_tooften_temp+'</h4>',
                cssClass: 'gifterr',
                scope: $scope,
                buttons: [
                  {
                    text: '<h3>'+$scope.conn_err_close+'</h3>',
                    type: 'button-full button-clear darkgreentxt',
                    onTap: function(e) {
                        errPopup.close();
                    }
                  }
                ]
              });
          }

      }, function(er) {
          // console.log('======================> ERROR: '+JSON.stringify(er))
          $timeout(function() {
            $ionicHistory.nextViewOptions({
              disableAnimate: false,
              disableBack: true
            });
            $state.go('tab.card');
          }, 500);
      });
      
  }

  $scope.goshares = function() {
    $state.go('tab.share');
  }

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.changeLang = function(lang){
      $translate.use(lang);
  }

  $scope.sendPromo = function() {

    var promostr = JSON.stringify({
        device_id: $scope.profile.user_device_id,
        inst_id: $scope.profile.user_institution,
        promo: $scope.profile.user_promo,
        newusr: 'promo'
    });

    // console.log('======================> 12YES: '+promostr)

    $http.post($rootScope.generalscript, promostr).then(function(e) {

        var data = e.data;

        // console.log('======================> YES: '+JSON.stringify(data))

        if(data[0].promoOK == '0') {

        }
        else if(data[0].promoOK == $scope.profile.user_promo) {

            var queryUsrPromoUpd = "UPDATE users SET user_promo=? WHERE user_id=?";
            $cordovaSQLite.execute($rootScope.db, queryUsrPromoUpd, [$scope.profile.user_promo, 1]).then(function(suc) {

              $scope.closeModal(4);

              var myPopup = $ionicPopup.alert({
                title: '<img style="margin:10px;" src="img/signs/heartbubble.png" width="40%" />',
                template: '<h3 class="hh3"><strong>'+$scope.promo_modal_pop_succ_tit+'</strong></h3><h4 class="hh4">'+$scope.promo_modal_pop_succ_tmp+'</h4>',
                cssClass: 'gifterr',
                scope: $scope,
                buttons: [
                  {
                    text: '<h3>'+$scope.promo_modal_pop_succ_btn+'</h3>',
                    type: 'button-full button-clear darkgreentxt',
                    onTap: function(e) {
                        myPopup.close();
                    }
                  }
                ]
              });

            }, function() {});

        }
        else if(data[0].promoOK == '2') {

          $scope.closeModal(4);

          var errPopup = $ionicPopup.alert({
            title: '<i class="icon ion-alert redtxt alerts" />',
            template: '<h3 class="hh3"><strong>'+$scope.blocked_title+'</strong></h3><h4 class="hh4">'+$scope.blocked_body+'</h4>',
            cssClass: 'gifterr',
            scope: $scope,
            buttons: [
              {
                text: '<h3>'+$scope.blocked_cancel+'</h3>',
                type: 'button-full button-clear darkgreentxt',
                onTap: function(e) {
                    errPopup.close();
                }
              }
            ]
          });

        }
        else if(data[0].promoOK == '3') {

            var errPopup = $ionicPopup.alert({
              title: '<i class="icon ion-alert redtxt alerts" />',
              template: '<h3 class="hh3"><strong>'+$scope.promo_modal_pop_wrong_tit+'</strong></h3><h4 class="hh4">'+$scope.promo_modal_pop_wrong_tmp+'</h4>',
              cssClass: 'gifterr',
              scope: $scope,
              buttons: [
                {
                  text: '<h3>'+$scope.promo_modal_pop_wrong_btn+'</h3>',
                  type: 'button-full button-clear darkgreentxt',
                  onTap: function(e) {
                      errPopup.close();
                  }
                }
              ]
            });

        }

    }, function(er) {
      $scope.connectionErr();
    });

  }

  $scope.beforePromoSend = function() {
    if($scope.profile.user_promo == '0' || $scope.profile.user_promo == '') {
      if($scope.profile.user_work_pos == '2' || $scope.profile.user_work_pos == '3' || $scope.profile.user_work_pos == '4') {

          var errPopup = $ionicPopup.alert({
            title: '<i class="icon ion-alert redtxt alerts" />',
            template: '<h3 class="hh3"><strong>'+$scope.blocked_title+'</strong></h3><h4 class="hh4">'+$scope.blocked_body+'</h4>',
            cssClass: 'gifterr',
            scope: $scope,
            buttons: [
              {
                text: '<h3>'+$scope.blocked_cancel+'</h3>',
                type: 'button-full button-clear darkgreentxt',
                onTap: function(e) {
                    errPopup.close();
                }
              }
            ]
          });

      }
      else {

          if($scope.profile.user_mob && $scope.profile.user_mob != '0' && $scope.profile.user_mob_confirm && $scope.profile.user_mob_confirm == '1') {
              
            $scope.openModal(4);

          }
          else {

            var errPopup = $ionicPopup.alert({
              title: '<i class="icon ion-alert redtxt alerts" />',
              template: '<h3 class="hh3"><strong>'+$scope.else_pop_phone_tit+'</strong></h3><h4 class="hh4">'+$scope.else_pop_phone_tmp+'</h4>',
              cssClass: 'gifterr',
              scope: $scope,
              buttons: [
                {
                  text: '<b>'+$scope.else_pop_phone_btn1+'</b>',
                  type: 'button-full button-clear darkgreentxt',
                  onTap: function(e) {
                      errPopup.close();
                      $timeout(function() {$state.go('profile-edit');}, 100);
                  }
                },
                {
                  text: $scope.else_pop_phone_btn2,
                  type: 'button-full button-clear darkgreentxt',
                  onTap: function(e) {
                      errPopup.close();
                  }
                }
              ]
            });

          }

      }
    }
    else {
      var errPopup = $ionicPopup.alert({
        title: '<i class="icon ion-alert redtxt alerts" />',
        template: '<h3 class="hh3"><strong>'+$scope.promo_modal_pop_tit+'</strong></h3><h4 class="hh4">'+$scope.promo_modal_pop_tmp+'</h4>',
        cssClass: 'gifterr',
        scope: $scope,
        buttons: [
          {
            text: '<h3>'+$scope.promo_modal_pop_btn+'</h3>',
            type: 'button-full button-clear darkgreentxt',
            onTap: function(e) {
                errPopup.close();
            }
          }
        ]
      });
    }
  }

  $scope.beforeDiscountSend = function() {

      if($scope.profile.user_work_pos == '2' || $scope.profile.user_work_pos == '3' || $scope.profile.user_work_pos == '4') {

        var errPopup = $ionicPopup.alert({
          title: '<i class="icon ion-alert redtxt alerts" />',
          template: '<h3 class="hh3"><strong>'+$scope.blocked_title+'</strong></h3><h4 class="hh4">'+$scope.blocked_body+'</h4>',
          cssClass: 'gifterr',
          scope: $scope,
          buttons: [
            {
              text: '<h3>'+$scope.blocked_cancel+'</h3>',
              type: 'button-full button-clear darkgreentxt',
              onTap: function(e) {
                  errPopup.close();
              }
            }
          ]
        });

      }
      else {
        if($scope.profile.user_mob && $scope.profile.user_mob != '0' && $scope.profile.user_mob_confirm && $scope.profile.user_mob_confirm == '1') {

          if($scope.profile.user_discount != "" && $scope.profile.user_discount != undefined && $scope.profile.user_discount != 0 && $scope.profile.user_discount.length != undefined) {

              Bill.setbill('0&'+$scope.profile.user_discount, 'discount&'+$scope.profile.user_device_id);

              $timeout(function() {$scope.openModal(5);}, 200);

          }
          else {

            var errPopup = $ionicPopup.alert({
              title: '<i class="icon ion-alert redtxt alerts" />',
              template: '<h3 class="hh3"><strong>'+$scope.discount_modal_pop_tit+'</strong></h3><h4 class="hh4">'+$scope.discount_modal_pop_tmp+'</h4>',
              cssClass: 'gifterr',
              scope: $scope,
              buttons: [
                {
                  text: '<h3>'+$scope.discount_modal_pop_btn1+'</h3>',
                  type: 'button-full button-clear darkgreentxt',
                  onTap: function(e) {
                      errPopup.close();
                      $scope.scanning();
                  }
                },
                {
                  text: '<h3>'+$scope.discount_modal_pop_btn2+'</h3>',
                  type: 'button-full button-clear darkredtxt',
                  onTap: function(e) {
                      errPopup.close();
                  }
                }
              ]
            });

          }

        }
        else {
            var errPopup = $ionicPopup.alert({
              title: '<i class="icon ion-alert redtxt alerts" />',
              template: '<h3 class="hh3"><strong>'+$scope.else_pop_phone_tit+'</strong></h3><h4 class="hh4">'+$scope.else_pop_phone_tmp+'</h4>',
              cssClass: 'gifterr',
              scope: $scope,
              buttons: [
                {
                  text: '<b>'+$scope.else_pop_phone_btn1+'</b>',
                  type: 'button-full button-clear darkgreentxt',
                  onTap: function(e) {
                      errPopup.close();
                      $timeout(function() {$state.go('profile-edit');}, 100);
                  }
                },
                {
                  text: $scope.else_pop_phone_btn2,
                  type: 'button-full button-clear darkgreentxt',
                  onTap: function(e) {
                      errPopup.close();
                  }
                }
              ]
            });
        }
      }

  }

  $scope.sendDiscount = function(x) {

    $scope.profile.user_discount = x;

    var discountstr = JSON.stringify({
        device_id: $scope.profile.user_device_id,
        inst_id: $scope.profile.user_institution,
        discount: x,
        newusr: 'discount'
    });

    $http.post($rootScope.generalscript, discountstr).then(function(e) {

      var data = e.data;

      if(data[0].discountOK == '0') {

      }
      else if(data[0].discountOK == '1') {

        var queryUsrUpd = "UPDATE users SET user_discount = ?, user_upd = ? WHERE user_id = ?";
        $cordovaSQLite.execute($rootScope.db, queryUsrUpd, [x, data[0].discount_when, 1]).then(function() {

            Bill.setbill('0&'+$scope.profile.user_discount, 'discount&'+$scope.profile.user_device_id);

            $timeout(function() {$scope.openModal(5);}, 200);

        }, function() {});

      }
      else if(data[0].discountOK == '2') {
          var errPopup = $ionicPopup.alert({
            title: '<i class="icon ion-alert redtxt alerts" />',
            template: '<h3 class="hh3"><strong>'+$scope.discount_modal_exists_pop_tit+'</strong></h3><h4 class="hh4">'+$scope.discount_modal_exists_pop_tmp+'</h4>',
            cssClass: 'gifterr',
            scope: $scope,
            buttons: [
              {
                text: '<h3>'+$scope.discount_modal_exists_pop_btn+'</h3>',
                type: 'button-full button-clear darkgreentxt',
                onTap: function(e) {
                    errPopup.close();
                    $scope.scanning();
                }
              }
            ]
          });
      }

    }, function(er) {
      $scope.connectionErr();
    });
    
  }

  $scope.scanning = function() {

    $cordovaBarcodeScanner.scan().then(function(barcodeData) {

      var barCode = barcodeData.text.toString();

      if(barCode.length >= 12 && barCode.length <= 13) {

          $scope.sendDiscount(barCode);

      }
      else {

        var errScanPopup = $ionicPopup.alert({
          title: '<i class="icon ion-alert redtxt alerts" />',
          template: '<h3 class="hh3"><strong>'+$scope.discount_modal_wrong_pop_tit+'</strong></h3><h4 class="hh4">'+$scope.discount_modal_wrong_pop_tmp+'</h4>',
          cssClass: 'gifterr',
          scope: $scope,
          buttons: [
            {
              text: '<h3>'+$scope.discount_modal_wrong_pop_btn1+'</h3>',
              type: 'button-full button-clear darkgreentxt',
              onTap: function(e) {
                  errScanPopup.close();
                  $timeout(function() {$scope.scanning();}, 200);
              }
            },
            {
              text: '<h3>'+$scope.discount_modal_wrong_pop_btn2+'</h3>',
              type: 'button-full button-clear darkredtxt',
              onTap: function(e) {
                  errScanPopup.close();
              }
            }
          ]
        });

      }

    }, 
    function(error) {

      var errPopup = $ionicPopup.alert({
        title: '<i class="icon ion-alert redtxt alerts" />',
        template: '<h3 class="hh3"><strong>'+$scope.discount_modal_err_pop_tit+'</strong></h3><h4 class="hh4">'+$scope.discount_modal_err_pop_tmp+'</h4>',
        cssClass: 'gifterr',
        scope: $scope,
        buttons: [
          {
            text: '<h3>'+$scope.discount_modal_err_pop_btn+'</h3>',
            type: 'button-full button-clear darkgreentxt',
            onTap: function(e) {
                errPopup.close();
            }
          }
        ]
      });

    });

  }

  $scope.goToSupport = function() {
    $translate(['faq_cat_points', 'faq_cat_other', 'faq_ask_points_dont_see', 'faq_ask_points_dont_see_answ', 'faq_ask_points_for_what', 'faq_ask_points_for_what_answ', 'faq_ask_points_for_what_answ1', 'faq_ask_points_for_what_answ2', 'faq_ask_points_for_what_answ3', 'faq_ask_points_shared_not_got', 'faq_ask_points_shared_not_got_answ', 'faq_ask_points_promo', 'faq_ask_points_promo_answ', 'faq_ask_points_promo_answ1', 'faq_ask_points_promo_answ2', 'faq_ask_points_promo_answ3', 'faq_ask_points_new_phone', 'faq_ask_points_new_phone_answ', 'faq_ask_points_expire', 'faq_ask_points_expire_answ', 'faq_ask_other_sms', 'faq_ask_other_sms_answ', 'faq_ask_other_prof_edit', 'faq_ask_other_prof_edit_answ', 'support_chat_hello']).then(function(res) {
      FAQ.setlang(res);
      $timeout(function() {$state.go('tab.support');}, 10);
    });
  }

})

.controller('SupportCtrl', function($scope, $state, $stateParams, $ionicHistory, $translate, FAQ, Cart) {

  $scope.goback = function() {
    $state.go('tab.else');
  }

  $scope.allthemes = FAQ.allthemes();

  $scope.$on('$ionicView.enter', function(){

    $scope.cartsum = Cart.sum();

  });

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

})

.controller('SupportDetailsCtrl', function($scope, $state, $stateParams, $ionicHistory, FAQ, Cart) {

  $scope.goback = function() {
    $state.go('tab.support');
  }
  
  $scope.getfaq = FAQ.getfaq($stateParams.supportId);

  $scope.toggleGroup = function(faq) {
    if ($scope.isGroupShown(faq)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = faq;
    }
  };

  $scope.isGroupShown = function(faq) {
    return $scope.shownGroup === faq;
  };

  $scope.$on('$ionicView.enter', function(){

    $scope.cartsum = Cart.sum();

  });

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

})

.controller('SupportChatCtrl', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicScrollDelegate, $timeout, $ionicPopup, $translate, FAQ, Profile, Cart) {

  var chatInter;

  $scope.$on("$ionicView.leave", function(event, data){
    $timeout.cancel(chatInter);
  });

  $scope.$on('$ionicView.afterEnter', function (event, viewData) {

    FAQ.allchat($scope.profile).then(function(data) {
      $scope.messages = data;
      $timeout(function() {$ionicScrollDelegate.scrollBottom(true);}, 200);
    }, function() {});

    $scope.data = [{
      message: ''
    }];

    $scope.canmessage = true;

  });

  $scope.$on('$ionicView.enter', function() {

    $translate(['support_chat_call_ctrl_pop_btn1', 'support_chat_call_ctrl_pop_btn2']).then(function(res) {
      $scope.support_chat_call_ctrl_pop_btn1 = res.support_chat_call_ctrl_pop_btn1;
      $scope.support_chat_call_ctrl_pop_btn2 = res.support_chat_call_ctrl_pop_btn2;
    });

    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
      }, function() {});
    }

  });

  chatInter = $timeout(function () {
    $scope.checkMessages();
  }, 3000);

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.canmessage = true;

  $scope.sendMessage = function() {

      if($scope.canmessage) {

          if($scope.data.message != '' && typeof $scope.data.message != 'undefined') {

              $scope.canmessage = false;

              FAQ.sendchat($scope.profile, $scope.data.message).then(function() {
                $scope.data.message = '';
                $ionicScrollDelegate.scrollBottom(true);
                $timeout(function() {$scope.canmessage = true;}, 500);
              }, function() {
                $scope.canmessage = true;
              });
                          
          }

      }

  }

  $scope.checkMessages = function() {
    FAQ.checkchat($scope.messages.lastchat).then(function(data) {
      chatInter = $timeout(function () {
          $scope.checkMessages();
      }, 3000);
    }, function() {
      chatInter = $timeout(function () {
          $scope.checkMessages();
      }, 3000);
    });
  }

  $scope.call = function() {
    var alertPopup = $ionicPopup.alert({
      title: '<img style="margin:20px;" src="img/signs/callask.png" width="35%" />',
      template: '<h3 style="margin-bottom:0px;">+375 29 123-45-67</h3>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h4 class="darkgreentxt">'+$scope.support_chat_call_ctrl_pop_btn1+'</h4>',
          type: 'button-full button-clear',
          onTap: function(e) {
              alertPopup.close();
          }
        },
        {
          text: '<h4 class="darkgreentxt">'+$scope.support_chat_call_ctrl_pop_btn2+'</h4>',
          type: 'button-full button-clear',
          onTap: function(e) {
              window.open('tel:+375291234567', '_system', 'location=yes');
          }
        }
      ]
    });
  }

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

})

.controller('AboutCtrl', function($scope, $state, $stateParams, $ionicHistory, Cart) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.$on('$ionicView.enter', function(){

    $scope.cartsum = Cart.sum();

  });

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

})

.controller('AboutUsCtrl', function($scope, $state, $stateParams, $ionicHistory, Cart) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.$on('$ionicView.enter', function(){

    $scope.cartsum = Cart.sum();

  });

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

})

.controller('ReservationCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, $translate, $timeout, $ionicPickerI18n, ionicDatePicker, Cart, Profile, Reservation, timezoneAdd, timezoneSub) {

  $scope.showform = false;

  $scope.$on('$ionicView.enter', function(){

    $translate(['support_chat_call_ctrl_pop_btn1', 'support_chat_call_ctrl_pop_btn2', 'reservation_ctrl_pop_tit', 'reservation_ctrl_pop_temp', 'reservation_ctrl_pop_btn1','day_mo', 'day_tu', 'day_we', 'day_th', 'day_fr', 'day_st', 'day_su', 'month_jan', 'month_feb', 'month_mar', 'month_apr', 'month_may', 'month_jun', 'month_jul', 'month_aug', 'month_sep', 'month_okt', 'month_nov', 'month_dez', 'day_month_accept', 'day_month_cancel', 'reservation_date']).then(function(res) {
      $scope.support_chat_call_ctrl_pop_btn1 = res.support_chat_call_ctrl_pop_btn1;
      $scope.support_chat_call_ctrl_pop_btn2 = res.support_chat_call_ctrl_pop_btn2;
      $scope.reservation_ctrl_pop_tit = res.reservation_ctrl_pop_tit;
      $scope.reservation_ctrl_pop_temp = res.reservation_ctrl_pop_temp;
      $scope.reservation_ctrl_pop_btn1 = res.reservation_ctrl_pop_btn1;
      $scope.day_mo = res.day_mo;
      $scope.day_tu = res.day_tu;
      $scope.day_we = res.day_we;
      $scope.day_th = res.day_th;
      $scope.day_fr = res.day_fr;
      $scope.day_st = res.day_st;
      $scope.day_su = res.day_su;
      $scope.month_jan = res.month_jan;
      $scope.month_feb = res.month_feb;
      $scope.month_mar = res.month_mar;
      $scope.month_apr = res.month_apr;
      $scope.month_may = res.month_may;
      $scope.month_jun = res.month_jun;
      $scope.month_jul = res.month_jul;
      $scope.month_aug = res.month_aug;
      $scope.month_sep = res.month_sep;
      $scope.month_okt = res.month_okt;
      $scope.month_nov = res.month_nov;
      $scope.month_dez = res.month_dez;
      $scope.day_month_accept = res.day_month_accept;
      $scope.day_month_cancel = res.day_month_cancel;
      $scope.reservation_date = res.reservation_date;
    });

    if(Profile.check()) {
      $scope.profile = Profile.allold();
      $scope.resTime = Reservation.allTimes();

      $scope.resGuest = Reservation.allGuests();

      $scope.reservationtime = [];

      $scope.reservationdate = new Date();

      $scope.reservation = {
        userid: $scope.profile.user_real_id,
        surname: $scope.profile.user_surname != '0' ? $scope.profile.user_surname : '',
        name: $scope.profile.user_name != '0' ? $scope.profile.user_name : '',
        middlename: '',
        mobile: $scope.profile.user_mobile,
        amount: $scope.resGuest[0],
        date: $scope.reservationdate,
        time: $scope.resTime[0],
        comment: ''
      }
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
        $scope.resTime = Reservation.allTimes();

        $scope.resGuest = Reservation.allGuests();

        $scope.reservationtime = [];

        $scope.reservationdate = new Date();

        $scope.reservation = {
          userid: $scope.profile.user_real_id,
          surname: $scope.profile.user_surname,
          name: $scope.profile.user_name,
          middlename: '',
          mobile: $scope.profile.user_mobile,
          amount: $scope.resGuest[0],
          date: $scope.reservationdate,
          time: $scope.resTime[0],
          comment: ''
        }
      }, function() {});
    }

  });

  $scope.$on('$ionicView.afterEnter', function(){
    $timeout(function() {
      $scope.showform = true;
    }, 300);
  });

  var myPopup;

  $scope.reservation = {
    userid: '',
    surname: '',
    name: '',
    middlename: '',
    mobile: '',
    amount: '',
    date: '',
    time: '',
    comment: ''
  }

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.alertPopup = function() {
    myPopup = $ionicPopup.alert({
      title: '<img style="margin:10px;" src="img/signs/heartbubble.png" width="40%" />',
      template: '<h3 class="hh3"><strong>'+$scope.reservation_ctrl_pop_tit+'</strong></h3><h4 class="hh4">'+$scope.reservation_ctrl_pop_temp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.reservation_ctrl_pop_btn1+'</h3>',
          type: 'button-full button-clear darkgreentxt',
          onTap: function(e) {
              myPopup.close();
              $state.go('tab.else');
          }
        }
      ]
    });
  }

  $scope.sendReservation = function() {
    $scope.reservation.amount = $scope.reservation.amount['val'];
    $scope.reservation.time = $scope.reservation.time['val'];
    Reservation.send($scope.reservation);
    $scope.alertPopup();
  }

  $scope.openDatePicker = function() {

    var nowDate = new Date();
    var nowY1 = nowDate.getFullYear();
    var nowM = nowDate.getMonth();
    var nowD = nowDate.getDate();
    var dateTo = new Date(nowY1, nowM, nowD);

    ionicDatePicker.openDatePicker({
      callback: function (val) {
        var gotDate = new Date(val);
        var timezoneval = timezoneSub.get(val);
        var dy = gotDate.getFullYear();
        var dm = gotDate.getMonth()+1;
        var dd = gotDate.getDate();
        var reservformat = dy + '-' + dm + '-' + dd;
        $scope.reservation.date = reservformat;
        $scope.reservationdate = timezoneval;
      },
      weeksList: [$scope.day_mo, $scope.day_tu, $scope.day_we, $scope.day_th, $scope.day_fr, $scope.day_st, $scope.day_su],
      monthsList: [$scope.month_jan, $scope.month_feb, $scope.month_mar, $scope.month_apr, $scope.month_may, $scope.month_jun, $scope.month_jul, $scope.month_aug, $scope.month_sep, $scope.month_okt, $scope.month_nov, $scope.month_dez],
      setLabel: $scope.day_month_accept,
      closeLabel: $scope.day_month_cancel,
      titleLabel: $scope.reservation_date,
      inputDate: $scope.reservation.date == 'Дата' ? dateTo : new Date($scope.reservation.date),
      from: nowDate,
      to: new Date(nowY1+1, nowM, nowD),
      mondayFirst: true,
      templateType: 'modal',
      showTodayButton: false,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: true
    });

  };

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

})

.controller('EntryCatCtrl', function($scope, $state, $ionicScrollDelegate, $ionicHistory, $timeout, Entry, HtmlEnt) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.categories = [];

  Entry.getOrderBSCategories().then(function(data) {
      $scope.categories = data;
      $timeout(function() {$ionicScrollDelegate.resize();}, 50);
  });

  $scope.htmlEntities = function(toencode) {
    return HtmlEnt.decodeEntities(toencode);
  }

})

.controller('EntryStartCtrl', function($scope, $state, $stateParams, $timeout, $ionicScrollDelegate, $ionicHistory, $translate, Entry, HtmlEnt) {
  
  $scope.$on('$ionicView.enter', function(){

    $translate(['day_full_mo', 'day_full_tu', 'day_full_we', 'day_full_th', 'day_full_fr', 'day_full_st', 'day_full_su', 'order_bs_worker_x_top', 'order_bs_worker_x_sub']).then(function(res) {
      $scope.day_full_mo = res.day_full_mo;
      $scope.day_full_tu = res.day_full_tu;
      $scope.day_full_we = res.day_full_we;
      $scope.day_full_th = res.day_full_th;
      $scope.day_full_fr = res.day_full_fr;
      $scope.day_full_st = res.day_full_st;
      $scope.day_full_su = res.day_full_su;
      $scope.order_bs_worker_x_top = res.order_bs_worker_x_top;
      $scope.order_bs_worker_x_sub = res.order_bs_worker_x_sub;

      var days = [res.day_full_su, res.day_full_mo, res.day_full_tu, res.day_full_we, res.day_full_th, res.day_full_fr, res.day_full_st];

      Entry.setDays(days);

    });

  });

  $scope.goback = function() {
    // $state.go('tab.entry-category');
    $ionicHistory.goBack();
  }

  var cart = [];
  $scope.categories = [];

  $scope.checks = false;

  Entry.getOrderBSMenue($stateParams.catId, $stateParams.goodId).then(function(data) {
      $scope.categories = data;
      $timeout(function() {
          // console.log('--------------------------->'+JSON.stringify(data));

          var cartlength = data.length;
          // console.log('==========================> DATA LENGTH '+cartlength)
          if(cartlength > 0) {
              for (var i = 0;i < cartlength; i++) {
                  // console.log('==========================> CHECKED '+data[i].checked)
                  if(data[i].checked) {
                      cart.push(data[i]);
                      $scope.checks = true;
                  }
              }
          }

          $timeout(function() {$ionicScrollDelegate.resize();}, 50);

      }, 200);
  });

  $scope.checking = function(cat) {
      if(!cat.category) {
          if(cat.checked) {
              var cartlength = cart.length;
              if(cartlength > 0) {
                  for (var i = 0;i < cartlength; i++) {
                      if(parseInt(cart[i].menue_id) == parseInt(cat.menue_id)) {
                          Entry.removeCheckedOrder(cat.menue_id);
                          if(cartlength == 1) {
                              $scope.checks = false;
                              cart.splice(i, 1);
                          }
                          else {
                              cart.splice(i, 1);
                              break;
                          }
                      }
                  }
              }
              return cat.checked = false;
          }
          else {
              cart.push(cat);
              $scope.checks = true;
              return cat.checked = true;
          }
      }
  }

  $scope.checkout = function() {
      if(cart.length > 0) {
          for(var i=0;i<cart.length;i++) {
              // console.log(JSON.stringify(cart[i]));
              Entry.setCheckedOrder(cart[i]);
          }
          Entry.getBSWorker(cart[0].menue_id, $scope.order_bs_worker_x_top, $scope.order_bs_worker_x_sub);
          $timeout(function() {
            $state.go('tab.entry-worker', {menId: cart[0].menue_id});
          }, 100);
      }
  }

  $scope.htmlEntities = function(toencode) {
    return HtmlEnt.decodeEntities(toencode);
  }

  $scope.backImage = function(cat) {
    if(!cat.category) {
      return 'http://www.olegtronics.com/admin/img/menu/'+cat.menue_institution+'/300/'+cat.menue_pic;
    }
  }

  $scope.myStyle = {};

  $scope.acceptStyle = function() {
      $scope.myStyle = {'background-size':'100%','background-position':'center center','background-repeat':'no-repeat','padding-right':'0'};
  }

})

.controller('EntryWorkerCtrl', function($rootScope, $scope, $state, $stateParams, $timeout, $ionicScrollDelegate, $ionicHistory, Entry, HtmlEnt) {

  $scope.goback = function() {
    // $state.go('tab.entry-start');
    $ionicHistory.goBack();
  }

  $scope.institution = $rootScope.institution;

  $scope.menId = $stateParams.menId;

  $scope.workers = Entry.getBSWorkerNext();

  $scope.$on('$ionicView.afterEnter', function (event, viewData) {
    $timeout(function() {
      $ionicScrollDelegate.resize();
      // $state.go($state.current, {}, {reload: true});
    }, 50);
  });

  $scope.setBSWorker = function(workerId, workerName, workerPic, workerProfession) {
      // console.log("==================> WORKER: "+workerId + ' | ' + workerName + ' | ' + workerPic + ' | ' + workerProfession)
      Entry.setBSWorker(workerId, workerName, workerPic, workerProfession);
  }

  $scope.htmlEntities = function(toencode) {
    return HtmlEnt.decodeEntities(toencode);
  }

})

.controller('EntryTimeCtrl', function($scope, $state, $stateParams, $timeout, $ionicScrollDelegate, $ionicHistory, Entry) {

  $scope.goback = function() {
    // $state.go('tab.entry-worker');
    $ionicHistory.goBack();
  }

  $scope.$on('$ionicView.afterEnter', function (event, viewData) {
    $timeout(function() {
      $ionicScrollDelegate.resize();
    }, 100);
  });

  $scope.days7 = Entry.getBSDates($stateParams.menId, $stateParams.workId);

  // console.log('7DAYS ===========================> '+JSON.stringify($scope.days7));

  $scope.indexid = 0;

  $scope.isGroupShown = 0;

  $scope.toggleGroup = function(day, id) {
      $scope.indexid = id;
      $scope.days7[id].items = [];
      if ($scope.isGroupShown == day) {
        $scope.isGroupShown = null;
        $scope.days7[$scope.indexid].items = [];
      } else {
        $scope.isGroupShown = day;
        Entry.getBSTimes(day, $stateParams.menId, $stateParams.workId).then(function(data) {
          $scope.days7[id].items = data;
          $timeout(function() {$ionicScrollDelegate.resize();}, 50);
          // console.log('TOGGLE ===========================> '+JSON.stringify($scope.days7[id]));
        }, function() {});
      }
  };

  $scope.timecalc = function(x) {

      // ОПРЕДЕЛЕНИЕ ВРЕМЯ
      var nowtime = new Date();
      var gottime = x * 1000;
      var nowtimediff = nowtime.getTime() - gottime;
      var onltime = new Date(gottime);
      var onlDateTime;
      var onlHour;
      var onlMin;

      // HOURS AND MINUTES AGO
      if(onltime.getHours() < 10) {
          onlHour = '0' + onltime.getHours();
      } else {
          onlHour = onltime.getHours();
      }
      if(onltime.getMinutes() < 10) {
          onlMin = '0' + onltime.getMinutes();
      } else {
          onlMin = onltime.getMinutes();
      }

      onlDateTime =  onlHour + ':' + onlMin;

      return onlDateTime;
  }

  $scope.setOrderHour = function(orderHour, orderHourName, day) {
    Entry.setBSOrderHour(orderHour, orderHourName, day);
    $timeout(function() {
      // console.log('=======================> GO '+$stateParams.menId+' | '+$stateParams.workId+' | '+JSON.stringify(day))
      $state.go('tab.entry', {menId: $stateParams.menId, workId: $stateParams.workId, orderHour: day});
    }, 200);
  }

})

.controller('EntryCtrl', function($rootScope, $scope, $state, $stateParams, $timeout, $ionicScrollDelegate, $http, $ionicLoading, $ionicHistory, $cordovaSQLite, $ionicNavBarDelegate, $ionicPopup, $ionicPlatform, $translate, Entry, HtmlEnt, Profile) {

  $scope.$on('$ionicView.enter', function (event, viewData) {

      $translate(['conn_err_tit', 'conn_err_tmp', 'conn_err_close', 'order_bs_ctrl_pop_tit', 'order_bs_ctrl_pop_temp', 'order_bs_ctrl_pop_btn1', 'order_bs_ctrl_pop_err5min_tit', 'order_bs_ctrl_pop_err5min_temp', 'order_bs_ctrl_pop_err5min_btn1', 'order_bs_ctrl_pop_errphone_tit', 'order_bs_ctrl_pop_errphone_temp', 'order_bs_ctrl_pop_errphone_btn1', 'order_bs_ctrl_pop_erralready_tit', 'order_bs_ctrl_pop_erralready_temp', 'order_bs_ctrl_pop_erralready_btn1', 'order_bs_ctrl_pop_errempty_tit', 'order_bs_ctrl_pop_errempty_temp', 'order_bs_ctrl_pop_errempty_btn1']).then(function(res) {
          $scope.order_bs_ctrl_pop_tit = res.order_bs_ctrl_pop_tit;
          $scope.order_bs_ctrl_pop_temp = res.order_bs_ctrl_pop_temp;
          $scope.order_bs_ctrl_pop_btn1 = res.order_bs_ctrl_pop_btn1;
          $scope.order_bs_ctrl_pop_err5min_tit = res.order_bs_ctrl_pop_err5min_tit;
          $scope.order_bs_ctrl_pop_err5min_temp = res.order_bs_ctrl_pop_err5min_temp;
          $scope.order_bs_ctrl_pop_err5min_btn1 = res.order_bs_ctrl_pop_err5min_btn1;
          $scope.order_bs_ctrl_pop_errphone_tit = res.order_bs_ctrl_pop_errphone_tit;
          $scope.order_bs_ctrl_pop_errphone_temp = res.order_bs_ctrl_pop_errphone_temp;
          $scope.order_bs_ctrl_pop_errphone_btn1 = res.order_bs_ctrl_pop_errphone_btn1;
          $scope.order_bs_ctrl_pop_erralready_tit = res.order_bs_ctrl_pop_erralready_tit;
          $scope.order_bs_ctrl_pop_erralready_temp = res.order_bs_ctrl_pop_erralready_temp;
          $scope.order_bs_ctrl_pop_erralready_btn1 = res.order_bs_ctrl_pop_erralready_btn1;
          $scope.order_bs_ctrl_pop_errempty_tit = res.order_bs_ctrl_pop_errempty_tit;
          $scope.order_bs_ctrl_pop_errempty_temp = res.order_bs_ctrl_pop_errempty_temp;
          $scope.order_bs_ctrl_pop_errempty_btn1 = res.order_bs_ctrl_pop_errempty_btn1;
          $scope.conn_err_tit = res.conn_err_tit;
          $scope.conn_err_tmp = res.conn_err_tmp;
          $scope.conn_err_close = res.conn_err_close;
      });

      // Disable BACK button on home
      $ionicPlatform.registerBackButtonAction(function (event) {
          if($state.current.name=="tab.entry"){
              
          }
          else {
              navigator.app.backHistory();
          }
      }, 100);

      if(Profile.check()) {
        $scope.profile = Profile.allold();
        $scope.data.name = $scope.profile.user_name;
        $scope.data.email = $scope.profile.user_email;
        $scope.data.phone = $scope.profile.user_mob;
      }
      else {
        Profile.allnew().then(function(data) {
          $scope.profile = data;
          $scope.data.name = $scope.profile.user_name;
          $scope.data.email = $scope.profile.user_email;
          $scope.data.phone = $scope.profile.user_mob;
        }, function() {});
      }

      $ionicScrollDelegate.resize();

  });

  $scope.connectionErr = function() {
    var errPopup = $ionicPopup.alert({
      title: '<i class="icon ion-alert redtxt alerts" />',
      template: '<h3 class="hh3"><strong>'+$scope.conn_err_tit+'</strong></h3><h4 class="hh4">'+$scope.conn_err_tmp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.conn_err_close+'</h3>',
          type: 'button-full button-clear darkgreentxt',
          onTap: function(e) {
              errPopup.close();
          }
        }
      ]
    });
  }

  $ionicNavBarDelegate.showBackButton(false);

  $scope.orderHour = $stateParams.orderHour;

  $scope.notphone = false;

  $scope.institution = $rootScope.institution;

  $scope.data = {
      name: '',
      phone: '',
      email: '',
      comments: '',
      reminder: '',
      barSelected: 0
  }

  $scope.finalOrder = Entry.getBSOrder();

  $scope.onlyNumbers = /^[0-9]+$/;

  function orderArrFuncIns(gotdata) {

      var order_id = gotdata['order_id'];
      var order_user = gotdata['order_user'];
      var order_name = gotdata['order_name'];
      var order_desc = gotdata['order_desc'];
      var order_worker = gotdata['order_worker'];
      var order_institution = gotdata['order_institution'];
      var order_office = gotdata['order_office'];
      var order_bill = gotdata['order_bill'];
      var order_goods = gotdata['order_goods'];
      var order_cats = gotdata['order_cats'];
      var order_order = gotdata['order_order'];
      var order_status = gotdata['order_status'];
      var order_start = gotdata['order_start'];
      var order_end = gotdata['order_end'];
      var order_allday = gotdata['order_allday'];
      var order_mobile = gotdata['order_mobile'];
      var order_when = gotdata['order_when'];
      var order_del = gotdata['order_del'];

      var queryOrdering = "SELECT * FROM ordering WHERE order_id = ?";
      $cordovaSQLite.execute($rootScope.db, queryOrdering, [order_id]).then(function(suc) {
          if(suc.rows.length > 0) {

              // DB ORDERS
              var orderingUpd = "UPDATE ordering SET order_user=?, order_name=?, order_desc=?, order_worker=?, order_institution=?, order_office=?, order_bill=?, order_goods=?, order_cats=?, order_order=?, order_status=?, order_start=?, order_end=?, order_allday=?, order_mobile=?, order_when=?, order_del=? WHERE order_id=?";
              $cordovaSQLite.execute($rootScope.db, orderingUpd, [order_user, order_name, order_desc, order_worker, order_institution, order_office, order_bill, order_goods, order_cats, order_order, order_status, order_start, order_end, order_allday, order_mobile, order_when, order_del, order_id]).then(function() {}, function() {});

          }
          else {

              var orderIns = "INSERT INTO ordering (order_id, order_user, order_name, order_desc, order_worker, order_institution, order_office, order_bill, order_goods, order_cats, order_order, order_status, order_start, order_end, order_allday, order_mobile, order_when, order_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
              $cordovaSQLite.execute($rootScope.db, orderIns, [order_id, order_user, order_name, order_desc, order_worker, order_institution, order_office, order_bill, order_goods, order_cats, order_order, order_status, order_start, order_end, order_allday, order_mobile, order_when, order_del]).then(function(ins) {}, function() {});

          }
      }, function() {});

  }

  function uploadOrder(x, y) {

      var xjson = JSON.stringify(x);

      $http.post($rootScope.generalscript, xjson).then(function(ordsuc) {

          // console.log(JSON.stringify(ordsuc))

          $ionicLoading.hide();
          var orderdata = ordsuc.data;

          if(orderdata[0].orderOK == '3' && y == 1) {
              var errPopup = $ionicPopup.alert({
                title: '<i class="icon ion-alert redtxt alerts" />',
                template: '<h3 class="hh3"><strong>'+$scope.order_bs_ctrl_pop_err5min_tit+'</strong></h3><h4 class="hh4">'+$scope.order_bs_ctrl_pop_err5min_temp+'</h4>',
                cssClass: 'gifterr',
                scope: $scope,
                buttons: [
                  {
                    text: '<h3>'+$scope.order_bs_ctrl_pop_err5min_btn1+'</h3>',
                    type: 'button-full button-clear darkgreentxt',
                    onTap: function(e) {
                        errPopup.close();
                    }
                  }
                ]
              });
          }
          else if(orderdata[0].orderOK == '1' && y == 1) {
              // alert('success android: '+JSON.stringify(orderdata));
              // $scope.smssent = true;

              orderArrFuncIns(orderdata[0]);

              var myPopup = $ionicPopup.alert({
                title: '<img style="margin:10px;" src="img/signs/heartbubble.png" width="40%" />',
                template: '<h3 class="hh3"><strong>'+$scope.order_bs_ctrl_pop_tit+'</strong></h3><h4 class="hh4">'+$scope.order_bs_ctrl_pop_temp+'</h4>',
                cssClass: 'gifterr',
                scope: $scope,
                buttons: [
                  {
                    text: '<h3>'+$scope.order_bs_ctrl_pop_btn1+'</h3>',
                    type: 'button-full button-clear darkgreentxt',
                    onTap: function(e) {
                        myPopup.close();
                        Entry.emptyBSOrder();
                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });
                        $state.go('tab.else');
                    }
                  }
                ]
              });
          }
          else if(orderdata[0].orderOK == '1') {
              orderArrFuncIns(orderdata[0]);
          }
          else if(orderdata[0].orderOK == '5' && y == 1) {
              var errPopup = $ionicPopup.alert({
                title: '<i class="icon ion-alert redtxt alerts" />',
                template: '<h3 class="hh3"><strong>'+$scope.order_bs_ctrl_pop_errphone_tit+'</strong></h3><h4 class="hh4">'+$scope.order_bs_ctrl_pop_errphone_temp+'</h4>',
                cssClass: 'gifterr',
                scope: $scope,
                buttons: [
                  {
                    text: '<h3>'+$scope.order_bs_ctrl_pop_errphone_btn1+'</h3>',
                    type: 'button-full button-clear darkgreentxt',
                    onTap: function(e) {
                        errPopup.close();
                    }
                  }
                ]
              });
          }
          else if(orderdata[0].orderOK == '2' && y == 1) {
              var errPopup = $ionicPopup.alert({
                title: '<i class="icon ion-alert redtxt alerts" />',
                template: '<h3 class="hh3"><strong>'+$scope.order_bs_ctrl_pop_erralready_tit+'</strong></h3><h4 class="hh4">'+$scope.order_bs_ctrl_pop_erralready_temp+'</h4>',
                cssClass: 'gifterr',
                scope: $scope,
                buttons: [
                  {
                    text: '<h3>'+$scope.order_bs_ctrl_pop_erralready_btn1+'</h3>',
                    type: 'button-full button-clear darkgreentxt',
                    onTap: function(e) {
                        errPopup.close();
                    }
                  }
                ]
              });
          }
          else if(orderdata[0].orderOK == '4' && y == 1) {
              var errPopup = $ionicPopup.alert({
                title: '<i class="icon ion-alert redtxt alerts" />',
                template: '<h3 class="hh3"><strong>'+$scope.order_bs_ctrl_pop_erralready_tit+'</strong></h3><h4 class="hh4">'+$scope.order_bs_ctrl_pop_erralready_temp+'</h4>',
                cssClass: 'gifterr',
                scope: $scope,
                buttons: [
                  {
                    text: '<h3>'+$scope.order_bs_ctrl_pop_erralready_btn1+'</h3>',
                    type: 'button-full button-clear darkgreentxt',
                    onTap: function(e) {
                        errPopup.close();
                    }
                  }
                ]
              });
          }
          
      }, 
      function(er) {
          if(y == 1) {
              $scope.connectionErr();
              // alert('error: '+JSON.stringify(er));
              $ionicLoading.hide();
          }
      });

  }

  $scope.sendOrder = function() {

      var orderstr = Entry.getBSOrder();

      if(orderstr.length > 0) {

          $ionicLoading.show({
              content: '<i class="icon ion-loading-c"></i>',
              animation: 'fade-in',
              showBackdrop: false,
              maxWidth: 50,
              showDelay: 0
          });

          // console.log(orderstr);

          for(var i=0;i<orderstr.length;i++) {
              if(i == orderstr.length-1) {
                  // console.log('===================> ORDER STR 1: '+JSON.stringify(orderstr[i]));
                  uploadOrder(orderstr[i], 1);
              }
              else {
                  // console.log('===================> ORDER STR 0: '+JSON.stringify(orderstr[i]));
                  uploadOrder(orderstr[i], 0);
              }
          }

      }
      else {
          var errPopup = $ionicPopup.alert({
            title: '<i class="icon ion-alert redtxt alerts" />',
            template: '<h3 class="hh3"><strong>'+$scope.order_bs_ctrl_pop_errempty_tit+'</strong></h3><h4 class="hh4">'+$scope.order_bs_ctrl_pop_errempty_temp+'</h4>',
            cssClass: 'gifterr',
            scope: $scope,
            buttons: [
              {
                text: '<h3>'+$scope.order_bs_ctrl_pop_errempty_btn1+'</h3>',
                type: 'button-full button-clear darkgreentxt',
                onTap: function(e) {
                    errPopup.close();
                }
              }
            ]
          });
      }

  }

  $scope.setSelected = function(x) {
      $scope.data.barSelected = parseInt(x);
      switch(x) {
          case 0:
              $scope.data.reminder = 'Нет';
              break;
          case 1:
              $scope.data.reminder = 'SMS';
              break;
          case 2:
              $scope.data.reminder = 'Email';
              break;
          default:
              $scope.data.reminder = 'Нет';
              break;
      }
  }

  $scope.placeOrder = function() {
      $scope.notphone = false;
      var numbersOnly = /^[0-9]+$/;
      var mobconf = document.getElementById('phone');
      if(mobconf.value.match(numbersOnly) && mobconf.value.length >= 10) {
          // console.log($scope.data.name + ' ' + $scope.data.phone + ' ' + $scope.data.email + ' ' + $scope.data.comments + ' ' + $scope.data.reminder);
          Entry.setBSOrder($scope.data.name, $scope.data.phone, $scope.data.email, $scope.data.comments, $scope.data.reminder);
          $timeout(function() {$scope.sendOrder();}, 500);
      }
      else {
          var lengthPopup = $ionicPopup.show({
              title: "Номер телефона",
              template: 'Неправильный номер.<br/>Пример: 71234567890',
              scope: $scope,
              buttons: [
                {
                  text: '<b>ОК</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                    lengthPopup.close();
                  }
                }
              ]
          });
          $scope.notphone = true;
      }
  }

  $scope.removeOrder = function(order) {
      Entry.removeCheckedOrder(order);
  }

})

.controller('FifthGiftCtrl', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $timeout, Cart, FifthGift, Bill, Profile) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.purchases = {
    max: 5,
    lastfifth: 0
  }

  $scope.smallscreen = $rootScope.smallscreen;

  $scope.readOnly = true;

  $scope.qrcodeString = '0';
  $scope.size = 150;
  $scope.correctionLevel = '';
  $scope.typeNumber = 0;
  $scope.inputMode = '';
  $scope.image = false;

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.cartsum = Cart.sum();
    if(Profile.check()) {
      $scope.profile = Profile.allold();
      Bill.setbill(0, 'fifth&'+$scope.profile.user_device_id);
      $timeout(function() {
        $scope.qrcodeString = Bill.getbill();
      }, 200);
      
      FifthGift.all($scope.profile.user_real_id).then(function(data) {
        $scope.purchases.lastfifth = parseInt(data);
      }, function() {});
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
        Bill.setbill(0, 'fifth&'+$scope.profile.user_device_id);
        $timeout(function() {
          $scope.qrcodeString = Bill.getbill();
        }, 200);
        FifthGift.all($scope.profile.user_real_id).then(function(data) {
          $scope.purchases.lastfifth = parseInt(data);
        }, function() {});
      }, function() {});
    }
  });

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

})

.controller('ProfileCtrl', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicActionSheet, $ionicModal, $ionicPopup, $ionicLoading, $http, $cordovaSQLite, $translate, Profile, Order, Cart, HtmlEnt, timezoneAdd, timezoneSub) {

  $scope.goelse = function() {
    $state.go('tab.else');
  }

  $scope.timecalc = function(x) {
    // ОПРЕДЕЛЕНИЕ ВРЕМЯ
    var nowtime = new Date();
    var gottime = timezoneAdd.get(x * 1000);
    var nowtimediff = nowtime.getTime() - gottime;
    var onltime = new Date(gottime);
    var onlDateTime;
    var onlMonth;
    var onlDay;
    var onlHour;
    var onlMin;

    // DAYS AGO
    if(nowtimediff > 86400) {
      if(onltime.getMonth() < 9) {
          onlMonth = '0' + (onltime.getMonth() + 1);
      } else {
          onlMonth = onltime.getMonth() + 1;
      }

      if(onltime.getDate() < 10) {
          onlDay = '0' + onltime.getDate();
      } else {
          onlDay = onltime.getDate();
      }

      if(onltime.getHours() < 10) {
          onlHour = '0' + onltime.getHours();
      } else {
          onlHour = onltime.getHours();
      }
      if(onltime.getMinutes() < 10) {
          onlMin = '0' + onltime.getMinutes();
      } else {
          onlMin = onltime.getMinutes();
      }

      onlDateTime = onlDay + '.' + onlMonth + '.' + onltime.getFullYear() + ' ' + onlHour + ':' + onlMin;
    }
    // HOURS AND MINUTES AGO
    else {
      if(onltime.getHours() < 10) {
          onlHour = '0' + onltime.getHours();
      } else {
          onlHour = onltime.getHours();
      }
      if(onltime.getMinutes() < 10) {
          onlMin = '0' + onltime.getMinutes();
      } else {
          onlMin = onltime.getMinutes();
      }

      onlDateTime =  onlHour + ':' + onlMin;
    }

    return onlDateTime;
  }

  $scope.$on('$ionicView.enter', function() {

    $translate(['reservation_ctrl_pop_canc_tit', 'reservation_ctrl_pop_canc_temp', 'reservation_ctrl_pop_canc_btn1', 'reservation_ctrl_pop_canc_btn2', 'profile_ctrl_pop_canc_tit', 'profile_ctrl_pop_canc_temp', 'profile_ctrl_pop_canc_btn1', 'profile_ctrl_pop_canc_btn2']).then(function(res) {
      $scope.reservation_ctrl_pop_canc_tit = res.reservation_ctrl_pop_canc_tit;
      $scope.reservation_ctrl_pop_canc_temp = res.reservation_ctrl_pop_canc_temp;
      $scope.reservation_ctrl_pop_canc_btn1 = res.reservation_ctrl_pop_canc_btn1;
      $scope.reservation_ctrl_pop_canc_btn2 = res.reservation_ctrl_pop_canc_btn2;
      $scope.profile_ctrl_pop_canc_tit = res.profile_ctrl_pop_canc_tit;
      $scope.profile_ctrl_pop_canc_temp = res.profile_ctrl_pop_canc_temp;
      $scope.profile_ctrl_pop_canc_btn1 = res.profile_ctrl_pop_canc_btn1;
      $scope.profile_ctrl_pop_canc_btn2 = res.profile_ctrl_pop_canc_btn2;
    });

    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
      if(Order.check()) {
        $scope.ordersAll = Order.get10old();
      }
      else {
        Order.get10new($scope.profile.user_real_id).then(function(odata) {
          $scope.ordersAll = odata;
        }, function() {});
      }
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
        if(Order.check()) {
          $scope.ordersAll = Order.get10old();
        }
        else {
          Order.get10new($scope.profile.user_real_id).then(function(odata) {
            $scope.ordersAll = odata;
          }, function() {});
        }
      }, function() {});
    }

  });

  $scope.showImageMaker = function() {

    $state.go('profile-edit');

  }

  $scope.beforeCancelOrder = function(id) {
    var alertPopup = $ionicPopup.alert({
      title: '<img style="margin:20px;" src="img/signs/clean.png" width="35%" />',
      template: '<h3 class="hh3"><strong>'+$scope.profile_ctrl_pop_canc_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_ctrl_pop_canc_temp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h4 class="darkgreentxt">'+$scope.profile_ctrl_pop_canc_btn1+'</h4>',
          type: 'button-full button-clear',
          onTap: function(e) {
              alertPopup.close();
          }
        },
        {
          text: '<h4 class="darkgreentxt">'+$scope.profile_ctrl_pop_canc_btn2+'</h4>',
          type: 'button-full button-clear',
          onTap: function(e) {
              alertPopup.close();
          }
        }
      ]
    });
  }

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.htmlEntities = function(toencode) {
    return HtmlEnt.decodeEntities(toencode);
  }

  $scope.acceptStyle = function() {
      $scope.myStyle = {'background-repeat': 'no-repeat', 'background-position': 'center center', 'background-size': 'cover'};
  }

})

.controller('ProfileEditCtrl', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicActionSheet, $ionicModal, $ionicPopup, $ionicLoading, $http, $cordovaSQLite, $cordovaDevice, $timeout, $cordovaNetwork, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaImagePicker, $translate, $ionicPickerI18n, ionicDatePicker, Profile, Phone, HtmlEnt, timezoneAdd, timezoneSub) {

  var permissions = cordova.plugins.permissions;
  
  var list = [
      permissions.READ_EXTERNAL_STORAGE,
      permissions.WRITE_EXTERNAL_STORAGE
  ];

  $scope.goback = function() {
    Profile.allnew().then(function(data) {
      $scope.profile = data;
      $scope.profile.user_mob_code = Phone.getShort($scope.profile.user_mob);
      var replaceCode = $scope.profile.user_mob_code.toString();
      $scope.profile.user_mob_no_code = $scope.profile.user_mob.toString().replace(replaceCode, '');
      $scope.userbirthday = $scope.profile.user_birthday;
      $timeout(function() {
        $ionicHistory.goBack();
      }, 200);
    }, function() {});
  }

  $scope.$on('$ionicView.enter', function() {

    $translate(['conn_err_tit', 'conn_err_tmp', 'conn_err_close', 'profile_edit_ctrl_pop_proofed_tit', 'profile_edit_ctrl_pop_proofed_temp', 'profile_edit_ctrl_pop_caution_tit', 'profile_edit_ctrl_pop_caution_tmp', 'profile_edit_ctrl_pop_5minagain_tit', 'profile_edit_ctrl_pop_5minagain_tmp', 'profile_edit_ctrl_pop_numagain_tit', 'profile_edit_ctrl_pop_numagain_tmp', 'profile_edit_ctrl_pop_reqerr_tit', 'profile_edit_ctrl_pop_reqerr_tmp', 'profile_edit_ctrl_pop_answerr_tit', 'profile_edit_ctrl_pop_answerr_tmp', 'profile_edit_ctrl_pop_discount_tit', 'profile_edit_ctrl_pop_discount_tmp', 'profile_edit_ctrl_pop_block_tit', 'profile_edit_ctrl_pop_block_tmp', 'profile_edit_ctrl_pop_deblock_tit', 'profile_edit_ctrl_pop_deblock_tmp', 'profile_edit_ctrl_pop_numconf_tit', 'profile_edit_ctrl_pop_numconf_tmp', 'profile_edit_ctrl_pop_numconf_btn1', 'profile_edit_ctrl_pop_erransw_tit', 'profile_edit_ctrl_pop_erransw_tmp', 'profile_edit_ctrl_pop_errcode_tit', 'profile_edit_ctrl_pop_errcode_tmp', 'profile_edit_ctrl_pop_errconf_tit', 'profile_edit_ctrl_pop_errconf_tmp', 'day_mo', 'day_tu', 'day_we', 'day_th', 'day_fr', 'day_st', 'day_su', 'month_jan', 'month_feb', 'month_mar', 'month_apr', 'month_may', 'month_jun', 'month_jul', 'month_aug', 'month_sep', 'month_okt', 'month_nov', 'month_dez', 'day_month_accept', 'day_month_cancel', 'profile_edit_birthday', 'profile_review_pic_delete', 'profile_review_choise', 'profile_review_choose_pic', 'profile_review_make_pic', 'profile_review_take_pic', 'profile_review_cancel']).then(function(res) {
      $scope.conn_err_tit = res.conn_err_tit;
      $scope.conn_err_tmp = res.conn_err_tmp;
      $scope.conn_err_close = res.conn_err_close;
      $scope.profile_edit_ctrl_pop_proofed_tit = res.profile_edit_ctrl_pop_proofed_tit;
      $scope.profile_edit_ctrl_pop_proofed_temp = res.profile_edit_ctrl_pop_proofed_temp;
      $scope.profile_edit_ctrl_pop_caution_tit = res.profile_edit_ctrl_pop_caution_tit;
      $scope.profile_edit_ctrl_pop_caution_tmp = res.profile_edit_ctrl_pop_caution_tmp;
      $scope.profile_edit_ctrl_pop_5minagain_tit = res.profile_edit_ctrl_pop_5minagain_tit;
      $scope.profile_edit_ctrl_pop_5minagain_tmp = res.profile_edit_ctrl_pop_5minagain_tmp;
      $scope.profile_edit_ctrl_pop_numagain_tit = res.profile_edit_ctrl_pop_numagain_tit;
      $scope.profile_edit_ctrl_pop_numagain_tmp = res.profile_edit_ctrl_pop_numagain_tmp;
      $scope.profile_edit_ctrl_pop_reqerr_tit = res.profile_edit_ctrl_pop_reqerr_tit;
      $scope.profile_edit_ctrl_pop_reqerr_tmp = res.profile_edit_ctrl_pop_reqerr_tmp;
      $scope.profile_edit_ctrl_pop_answerr_tit = res.profile_edit_ctrl_pop_answerr_tit;
      $scope.profile_edit_ctrl_pop_answerr_tmp = res.profile_edit_ctrl_pop_answerr_tmp;
      $scope.profile_edit_ctrl_pop_discount_tit = res.profile_edit_ctrl_pop_discount_tit;
      $scope.profile_edit_ctrl_pop_discount_tmp = res.profile_edit_ctrl_pop_discount_tmp;
      $scope.profile_edit_ctrl_pop_block_tit = res.profile_edit_ctrl_pop_block_tit;
      $scope.profile_edit_ctrl_pop_block_tmp = res.profile_edit_ctrl_pop_block_tmp;
      $scope.profile_edit_ctrl_pop_deblock_tit = res.profile_edit_ctrl_pop_deblock_tit;
      $scope.profile_edit_ctrl_pop_deblock_tmp = res.profile_edit_ctrl_pop_deblock_tmp;
      $scope.profile_edit_ctrl_pop_numconf_tit = res.profile_edit_ctrl_pop_numconf_tit;
      $scope.profile_edit_ctrl_pop_numconf_tmp = res.profile_edit_ctrl_pop_numconf_tmp;
      $scope.profile_edit_ctrl_pop_numconf_btn1 = res.profile_edit_ctrl_pop_numconf_btn1;
      $scope.profile_edit_ctrl_pop_erransw_tit = res.profile_edit_ctrl_pop_erransw_tit;
      $scope.profile_edit_ctrl_pop_erransw_tmp = res.profile_edit_ctrl_pop_erransw_tmp;
      $scope.profile_edit_ctrl_pop_errcode_tit = res.profile_edit_ctrl_pop_errcode_tit;
      $scope.profile_edit_ctrl_pop_errcode_tmp = res.profile_edit_ctrl_pop_errcode_tmp;
      $scope.profile_edit_ctrl_pop_errconf_tit = res.profile_edit_ctrl_pop_errconf_tit;
      $scope.profile_edit_ctrl_pop_errconf_tmp = res.profile_edit_ctrl_pop_errconf_tmp;
      $scope.day_mo = res.day_mo;
      $scope.day_tu = res.day_tu;
      $scope.day_we = res.day_we;
      $scope.day_th = res.day_th;
      $scope.day_fr = res.day_fr;
      $scope.day_st = res.day_st;
      $scope.day_su = res.day_su;
      $scope.month_jan = res.month_jan;
      $scope.month_feb = res.month_feb;
      $scope.month_mar = res.month_mar;
      $scope.month_apr = res.month_apr;
      $scope.month_may = res.month_may;
      $scope.month_jun = res.month_jun;
      $scope.month_jul = res.month_jul;
      $scope.month_aug = res.month_aug;
      $scope.month_sep = res.month_sep;
      $scope.month_okt = res.month_okt;
      $scope.month_nov = res.month_nov;
      $scope.month_dez = res.month_dez;
      $scope.day_month_accept = res.day_month_accept;
      $scope.day_month_cancel = res.day_month_cancel;
      $scope.profile_edit_birthday = res.profile_edit_birthday;
      $scope.profile_review_pic_delete = res.profile_review_pic_delete;
      $scope.profile_review_choise = res.profile_review_choise;
      $scope.profile_review_choose_pic = res.profile_review_choose_pic;
      $scope.profile_review_make_pic = res.profile_review_make_pic;
      $scope.day_month_accept = res.day_month_accept;
      $scope.profile_review_take_pic = res.profile_review_take_pic;
      $scope.profile_review_cancel = res.profile_review_cancel;
    });

    if(Profile.check()) {
      $scope.profile = Profile.allold();
      $scope.profile.user_mob_code = Phone.getShort($scope.profile.user_mob);
      var replaceCode = $scope.profile.user_mob_code.toString();
      $scope.profile.user_mob_no_code = $scope.profile.user_mob.toString().replace(replaceCode, '');
      $scope.userbirthday = $scope.profile.user_birthday;
      $scope.profile.user_country_name = Phone.get($scope.profile.user_mob_code);
      $scope.profile.user_surname = ($scope.profile.user_surname != '0') ? $scope.profile.user_surname : '';
      $scope.profile.user_name = ($scope.profile.user_name != '0') ? $scope.profile.user_name : '';
      $scope.profile.user_middlename = ($scope.profile.user_middlename != '0') ? $scope.profile.user_middlename : '';
      $scope.profile.user_email = ($scope.profile.user_email != '0') ? $scope.profile.user_email : '';
      $scope.profile.user_mob_code = ($scope.profile.user_mob_code != '0') ? $scope.profile.user_mob_code : '';
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
        $scope.profile.user_mob_code = Phone.getShort($scope.profile.user_mob);
        var replaceCode = $scope.profile.user_mob_code.toString();
        $scope.profile.user_mob_no_code = $scope.profile.user_mob.toString().replace(replaceCode, '');
        $scope.userbirthday = $scope.profile.user_birthday;
        $scope.profile.user_country_name = Phone.get($scope.profile.user_mob_code);
        $scope.profile.user_surname = ($scope.profile.user_surname != '0') ? $scope.profile.user_surname : '';
        $scope.profile.user_name = ($scope.profile.user_name != '0') ? $scope.profile.user_name : '';
        $scope.profile.user_middlename = ($scope.profile.user_middlename != '0') ? $scope.profile.user_middlename : '';
        $scope.profile.user_email = ($scope.profile.user_email != '0') ? $scope.profile.user_email : '';
        $scope.profile.user_mob_code = ($scope.profile.user_mob_code != '0') ? $scope.profile.user_mob_code : '';
      }, function() {});
    }

  });

  $scope.showImageMaker = function() {
    $ionicActionSheet.show({
      buttons: [
        { text: '<span class="redtxt SFUITR">'+$scope.profile_review_pic_delete+'</span>' },
        { text: '<span class="darkgreentxt SFUITR">'+$scope.profile_review_make_pic+'</span>' },
        { text: '<span class="darkgreentxt SFUITR">'+$scope.profile_review_take_pic+'</span>' }
      ],
      titleText: $scope.profile_review_choise,
      cancelText: '<b class="darkgreentxt SFUITR">'+$scope.profile_review_cancel+'</b>',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        if(index == 0) {
          $scope.profile.user_pic = 'user.png';
        }
        else if(index == 1) {
          $scope.selfie();
        }
        else if(index == 2) {
          $scope.selPic();
        }
        return true;
      }
    });
  }

  $scope.connectionErr = function() {
    var errPopup = $ionicPopup.alert({
      title: '<i class="icon ion-alert redtxt alerts" />',
      template: '<h3 class="hh3"><strong>'+$scope.conn_err_tit+'</strong></h3><h4 class="hh4">'+$scope.conn_err_tmp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.conn_err_close+'</h3>',
          type: 'button-full button-clear darkgreentxt',
          onTap: function(e) {
              errPopup.close();
          }
        }
      ]
    });
  }

  $scope.mobileCodeAll = Phone.all();

  $scope.setCountryCode = function(shortcode) {
    $scope.profile.user_mob_code = shortcode;
    $scope.profile.user_country_name = Phone.get(shortcode);
  }
  
  $scope.askConfirm = function(confagain) {

    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-positive"></ion-spinner>',
      duration: 0
    }).then(function(){
      // console.log("The loading indicator is now displayed");
    });
    
    var updstr = JSON.stringify({
        device: $scope.profile.user_device,
        device_id: $scope.profile.user_device_id,
        device_version: $scope.profile.user_device_version,
        device_os: $scope.profile.user_device_os,
        user_name: ($scope.profile.user_name != '' && $scope.profile.user_name != 0) ? $scope.profile.user_name : "0",
        user_surname: ($scope.profile.user_surname != '' && $scope.profile.user_surname != 0) ? $scope.profile.user_surname : "0",
        user_middlename: ($scope.profile.user_middlename != '' && $scope.profile.user_middlename != 0) ? $scope.profile.user_middlename : "0",
        user_email: ($scope.profile.user_email != '' && $scope.profile.user_email != 0) ? $scope.profile.user_email : "0",
        user_mob: ($scope.profile.user_mob_no_code != '' && $scope.profile.user_mob_no_code != 0) ? $scope.profile.user_mob_code+''+$scope.profile.user_mob_no_code : "0",
        user_gender: ($scope.profile.user_gender != '' && $scope.profile.user_gender != 0) ? $scope.profile.user_gender : "0",
        user_birthday: $scope.profile.user_birthday,
        inst_id: $scope.profile.user_institution,
        newusr: 'upd'
    });

    $http.post($rootScope.generalscript, updstr).then(function(f) {

        var dataapp = f.data;

        if(dataapp[0].upd == '1') {

          Profile.setAll($scope.profile, dataapp[0].when);

          var smsstr = JSON.stringify({
            device_id: $scope.profile.user_device_id,
            inst_id: $scope.profile.user_institution,
            sms: '0',
            newusr: 'sms'
          });

          $http.post($rootScope.generalscript, smsstr).then(function(e) {

            $ionicLoading.hide().then(function() {});

            var data = e.data;

            if(data[0].smsOK == 1) {

                var errPopup = $ionicPopup.alert({
                  title: '<i class="icon ion-alert redtxt alerts" />',
                  template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_caution_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_caution_tmp+'</h4>',
                  cssClass: 'gifterr',
                  scope: $scope,
                  buttons: [
                    {
                      text: '<h3>'+$scope.conn_err_close+'</h3>',
                      type: 'button-full button-clear darkgreentxt',
                      onTap: function(e) {
                          errPopup.close();
                      }
                    }
                  ]
                });

            }
            else if(data[0].smsOK == 2) {

              var errPopup = $ionicPopup.alert({
                title: '<i class="icon ion-alert redtxt alerts" />',
                template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_5minagain_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_5minagain_tmp+'</h4>',
                cssClass: 'gifterr',
                scope: $scope,
                buttons: [
                  {
                    text: '<h3>'+$scope.conn_err_close+'</h3>',
                    type: 'button-full button-clear darkgreentxt',
                    onTap: function(e) {
                        errPopup.close();
                    }
                  }
                ]
              });

              if(!confagain) {
                $scope.openModal(5);
              }

            }
            else if(data[0].smsOK == 3) {

              if(!confagain) {
                $scope.openModal(5);
              }

            }
            else if(data[0].smsOK == 4) {

              var errPopup = $ionicPopup.alert({
                title: '<i class="icon ion-alert redtxt alerts" />',
                template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_numagain_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_numagain_tmp+'</h4>',
                cssClass: 'gifterr',
                scope: $scope,
                buttons: [
                  {
                    text: '<h3>'+$scope.conn_err_close+'</h3>',
                    type: 'button-full button-clear darkgreentxt',
                    onTap: function(e) {
                        errPopup.close();
                    }
                  }
                ]
              });

            }
            else {
              var errPopup = $ionicPopup.alert({
                title: '<i class="icon ion-alert redtxt alerts" />',
                template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_reqerr_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_reqerr_tmp+'</h4>',
                cssClass: 'gifterr',
                scope: $scope,
                buttons: [
                  {
                    text: '<h3>'+$scope.conn_err_close+'</h3>',
                    type: 'button-full button-clear darkgreentxt',
                    onTap: function(e) {
                        errPopup.close();
                    }
                  }
                ]
              });
            }

          },function(er) {
            $ionicLoading.hide().then(function() {
              $scope.connectionErr();
            });
          });

        }
        else {
          $ionicLoading.hide().then(function() {
              var errPopup = $ionicPopup.alert({
                title: '<i class="icon ion-alert redtxt alerts" />',
                template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_answerr_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_answerr_tmp+'</h4>',
                cssClass: 'gifterr',
                scope: $scope,
                buttons: [
                  {
                    text: '<h3>'+$scope.conn_err_close+'</h3>',
                    type: 'button-full button-clear darkgreentxt',
                    onTap: function(e) {
                        errPopup.close();
                    }
                  }
                ]
              });
          });
        }

    }, function(er) {
      $ionicLoading.hide().then(function() {
          $scope.connectionErr();
      });
    });

  }

  $scope.sms = [];

  $scope.smsConfirm = function() {

    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-positive"></ion-spinner>',
      duration: 0
    }).then(function(){
      // console.log("The loading indicator is now displayed");
    });

    var confstr = JSON.stringify({
        device_id: $scope.profile.user_device_id,
        inst_id: $scope.profile.user_institution,
        sms: $scope.sms.confirmation,
        newusr: 'sms'
    });

    $http.post($rootScope.generalscript, confstr).then(function(e) {

      $ionicLoading.hide().then(function() {});

      var data = e.data;

      if(data[0].smsOK == '5') {

          var whens = data[0].when;

          var updateMob = "UPDATE users SET user_mob_confirm = ?, user_upd=? WHERE user_id = ?";
          $cordovaSQLite.execute($rootScope.db, updateMob, ['1', whens, '1']).then(function() {

              $ionicLoading.hide().then(function() {});

              if(data[0].oldUsr) {
                var oldUsr = data[0].oldUsr;
                if(oldUsr.length > 0) {
                  if(typeof oldUsr !== 'undefined' && oldUsr !== null) {

                      // USER DISCOUNT
                      if(oldUsr.usrData.user_discount) {
                          if(oldUsr.usrData.user_discount != '0' && oldUsr.usrData.user_discount !== 'undefined') {

                            var usrdiscount = oldUsr.usrData.user_discount;

                            var queryUsrDiscount = "SELECT * FROM users WHERE user_id=? AND user_discount=? AND user_del='0' LIMIT 1";
                            $cordovaSQLite.execute($rootScope.db, queryUsrDiscount, [1, usrdiscount]).then(function(suc) {
                              if(suc.rows.length == 0) {
                                
                                var queryUsrDiscountUpd = "UPDATE users SET user_discount=? WHERE user_id=?";
                                $cordovaSQLite.execute($rootScope.db, queryUsrDiscountUpd, [usrdiscount, 1]).then(function(suc) {

                                  var errPopup = $ionicPopup.alert({
                                    title: '<i class="icon ion-alert redtxt alerts" />',
                                    template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_discount_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_discount_tmp+'</h4>',
                                    cssClass: 'gifterr',
                                    scope: $scope,
                                    buttons: [
                                      {
                                        text: '<h3>'+$scope.conn_err_close+'</h3>',
                                        type: 'button-full button-clear darkgreentxt',
                                        onTap: function(e) {
                                            errPopup.close();
                                        }
                                      }
                                    ]
                                  });

                                }, function() {});

                              }
                            }, function() {});

                          }
                      }

                      // USER WORK POSITION
                      if(oldUsr.usrData.user_work_pos) {
                          if(oldUsr.usrData.user_work_pos == '2' || oldUsr.usrData.user_work_pos == '3' || oldUsr.usrData.user_work_pos == '4') {

                            var user_work_pos = oldUsr.usrData.user_work_pos;

                            var queryUsrWP = "SELECT * FROM users WHERE user_id=? AND user_work_pos=? AND user_del='0' LIMIT 1";
                            $cordovaSQLite.execute($rootScope.db, queryUsrWP, [1, user_work_pos]).then(function(suc) {
                              if(suc.rows.length == 0) {
                                
                                var queryUsrWPUpd = "UPDATE users SET user_work_pos=? WHERE user_id=?";
                                $cordovaSQLite.execute($rootScope.db, queryUsrWPUpd, [user_work_pos, 1]).then(function(suc) {

                                  var errPopup = $ionicPopup.alert({
                                    title: '<i class="icon ion-alert redtxt alerts" />',
                                    template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_block_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_block_tmp+'</h4>',
                                    cssClass: 'gifterr',
                                    scope: $scope,
                                    buttons: [
                                      {
                                        text: '<h3>'+$scope.conn_err_close+'</h3>',
                                        type: 'button-full button-clear darkgreentxt',
                                        onTap: function(e) {
                                            errPopup.close();
                                        }
                                      }
                                    ]
                                  });

                                }, function() {});

                              }
                            }, function() {});

                          }
                          // IF NO CONNECTION TO DB OR SERVER IS DOWN
                          else if(oldUsr.usrData.user_work_pos != '1000') {

                            var user_work_pos = oldUsr.usrData.user_work_pos;

                            var queryUsrWP = "SELECT * FROM users WHERE user_id=? AND user_work_pos=? AND user_del='0' LIMIT 1";
                            $cordovaSQLite.execute($rootScope.db, queryUsrWP, [1, user_work_pos]).then(function(suc) {
                              if(suc.rows.length == 0) {
                                
                                var queryUsrWPUpd = "UPDATE users SET user_work_pos=? WHERE user_id=?";
                                $cordovaSQLite.execute($rootScope.db, queryUsrWPUpd, [user_work_pos, 1]).then(function(suc) {

                                  var errPopup = $ionicPopup.alert({
                                    title: '<i class="icon ion-alert redtxt alerts" />',
                                    template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_deblock_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_deblock_tmp+'</h4>',
                                    cssClass: 'gifterr',
                                    scope: $scope,
                                    buttons: [
                                      {
                                        text: '<h3>'+$scope.conn_err_close+'</h3>',
                                        type: 'button-full button-clear darkgreentxt',
                                        onTap: function(e) {
                                            errPopup.close();
                                        }
                                      }
                                    ]
                                  });

                                }, function() {});

                              }
                            }, function() {});

                          }
                      }

                      // DB POINTS
                      var pointsArr = oldUsr.pointsArr;

                      if(pointsArr.length > 0) {

                        var id = 0;

                        function pointsArrFunc(id) {

                          var points_id = pointsArr[id]['points_id'];
                          var points_user = pointsArr[id]['points_user'];
                          var points_bill = pointsArr[id]['points_bill'];
                          var points_discount = pointsArr[id]['points_discount'];
                          var points_points = pointsArr[id]['points_points'];
                          var points_got_spend = pointsArr[id]['points_got_spend'];
                          var points_waiter = pointsArr[id]['points_waiter'];
                          var points_institution = pointsArr[id]['points_institution'];
                          var points_office = pointsArr[id]['points_office'];
                          var points_status = pointsArr[id]['points_status'];
                          var points_comment = pointsArr[id]['points_comment'];
                          var points_proofed = pointsArr[id]['points_proofed'];
                          var points_gift = pointsArr[id]['points_gift'];
                          var points_check = pointsArr[id]['points_check'];
                          var points_waitertime = pointsArr[id]['points_waitertime'];
                          var points_usertime = pointsArr[id]['points_usertime'];
                          var points_when = pointsArr[id]['points_when'];
                          var points_time = pointsArr[id]['points_time'];
                          var points_del = pointsArr[id]['points_del'];

                          var queryPoints = "SELECT * FROM points WHERE points_id = ?";
                          $cordovaSQLite.execute($rootScope.db, queryPoints, [points_id]).then(function(suc) {
                            if(suc.rows.length > 0) {
                              var pointsUpd = "UPDATE points SET points_status=?, points_proofed=?, points_when=?, points_del=? WHERE points_id=?";
                              $cordovaSQLite.execute($rootScope.db, pointsUpd, [points_status, points_proofed, points_when, points_del, points_id]).then(function() {
                                id++;
                                if(id < pointsArr.length) {
                                  pointsArrFunc(id);
                                }
                              }, function() {});
                            }
                            else {
                              var pointsIns = "INSERT INTO points (points_id, points_user, points_bill, points_discount, points_points, points_got_spend, points_waiter, points_institution, points_office, points_status, points_comment, points_proofed, points_gift, points_check, points_waitertime, points_usertime, points_when, points_time, points_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                              $cordovaSQLite.execute($rootScope.db, pointsIns, [points_id, points_user, points_bill, points_discount, points_points, points_got_spend, points_waiter, points_institution, points_office, points_status, points_comment, points_proofed, points_gift, points_check, points_waitertime, points_usertime, points_when, points_time, points_del]).then(function() {
                                id++;
                                if(id < pointsArr.length) {
                                  pointsArrFunc(id);
                                }
                              }, function() {});
                            }
                          }, function() {});

                        }
                        pointsArrFunc(0);

                      }

                      // DB WALLET
                      var walletArr = oldUsr.walletArr;

                      if(walletArr.length > 0) {

                          var wallet_user = data[0].walletArr[0]['wallet_user'];
                          var wallet_institution = data[0].walletArr[0]['wallet_institution'];
                          var wallet_total = data[0].walletArr[0]['wallet_total'];
                          var wallet_warn = data[0].walletArr[0]['wallet_warn'];
                          var wallet_when = data[0].walletArr[0]['wallet_when'];
                          var wallet_del = data[0].walletArr[0]['wallet_del'];

                          var queryWallet = "SELECT * FROM wallet WHERE wallet_when < ?";
                          $cordovaSQLite.execute($rootScope.db, queryWallet, [wallet_when]).then(function(suc) {
                            if(suc.rows.length > 0) {
                              var walletUpd = "UPDATE wallet SET wallet_total=?, wallet_when=?, wallet_warn=?, wallet_del=?";
                              $cordovaSQLite.execute($rootScope.db, walletUpd, [wallet_total, wallet_when, wallet_warn,wallet_del]).then(function() {}, function() {});
                            }
                          },
                          function() {});

                      }

                      // DB CHAT
                      var chatArr = oldUsr.chatArr;
                      
                      if(chatArr.length > 0) {

                        var id = 0;

                        $scope.chatArrFunc = function(id) {

                          var chat_id = chatArr[id]['chat_id'];
                          var chat_from = chatArr[id]['chat_from'];
                          var chat_to = chatArr[id]['chat_to'];
                          var chat_name = chatArr[id]['chat_name'];
                          var chat_message = chatArr[id]['chat_message'];
                          var chat_read = chatArr[id]['chat_read'];
                          var chat_institution = chatArr[id]['chat_institution'];
                          var chat_answered = chatArr[id]['chat_answered'];
                          var chat_when = chatArr[id]['chat_when'];
                          var chat_del = chatArr[id]['chat_del'];
                
                          var queryChat = "SELECT * FROM chat WHERE chat_id = ?";
                          $cordovaSQLite.execute($rootScope.db, queryChat, [chat_id]).then(function(suc) {
                          if(suc.rows.length > 0) {
                              var chatUpd = "UPDATE chat SET chat_read=?, chat_answered=?, chat_when=?, chat_del=? WHERE chat_id=?";
                              $cordovaSQLite.execute($rootScope.db, chatUpd, [chat_read, chat_answered, chat_when, chat_del, chat_id]).then(function() {
                                id++;
                                if(id < chatArr.length) {
                                  $scope.chatArrFunc(id);
                                }
                              }, function() {});
                            }
                            else {
                              var chatIns = "INSERT INTO chat (chat_id, chat_from, chat_to, chat_name, chat_message, chat_read, chat_institution, chat_answered, chat_when, chat_del) VALUES (?,?,?,?,?,?,?,?,?,?)";
                              $cordovaSQLite.execute($rootScope.db, chatIns, [chat_id, chat_from, chat_to, chat_name, chat_message, chat_read, chat_institution, chat_answered, chat_when, chat_del]).then(function() {
                                id++;
                                if(id < chatArr.length) {
                                  $scope.chatArrFunc(id);
                                }
                              }, function() {});
                            }
                          }, function() {});

                        }
                        $scope.chatArrFunc(0);

                      }

                      // DB ORDER
                      var orderArr = oldUsr.orderArr;
                      
                      if(orderArr.length > 0) {

                        var id = 0;

                        function orderArrFunc(id) {

                          var order_id = orderArr[id]['order_id'];
                          var order_user = orderArr[id]['order_user'];
                          var order_user_name_phone = orderArr[id]['order_user_name_phone'];
                          var order_user_surname_phone = orderArr[id]['order_user_surname_phone'];
                          var order_user_middlename_phone = orderArr[id]['order_user_middlename_phone'];
                          var order_user_adress_phone = orderArr[id]['order_user_adress_phone'];
                          var order_user_comment_phone = orderArr[id]['order_user_comment_phone'];
                          var order_name = orderArr[id]['order_name'];
                          var order_name_phone = orderArr[id]['order_name_phone'];
                          var order_user_phone_phone = orderArr[id]['order_user_phone_phone'];
                          var order_user_email_phone = orderArr[id]['order_user_email_phone'];
                          var order_desc = orderArr[id]['order_desc'];
                          var order_worker = orderArr[id]['order_worker'];
                          var order_worker_name_phone = orderArr[id]['order_worker_name_phone'];
                          var order_worker_pic_phone = orderArr[id]['order_worker_pic_phone'];
                          var order_worker_profession_phone = orderArr[id]['order_worker_profession_phone'];
                          var order_reminder_phone = orderArr[id]['order_reminder_phone'];
                          var order_institution = orderArr[id]['order_institution'];
                          var order_office = orderArr[id]['order_office'];
                          var order_bill = orderArr[id]['order_bill'];
                          var order_goods = orderArr[id]['order_goods'];
                          var order_cats = orderArr[id]['order_cats'];
                          var order_order = orderArr[id]['order_order'];
                          var order_status = orderArr[id]['order_status'];
                          var order_start = orderArr[id]['order_start'];
                          var order_start_name_phone = orderArr[id]['order_start_name_phone'];
                          var order_end = orderArr[id]['order_end'];
                          var order_allday = orderArr[id]['order_allday'];
                          var order_mobile_confirm = orderArr[id]['order_mobile_confirm'];
                          var order_mobile = orderArr[id]['order_mobile'];
                          var order_when = orderArr[id]['order_when'];
                          var order_del = orderArr[id]['order_del'];

                          var queryOrdering = "SELECT * FROM ordering WHERE order_id = ?";
                          $cordovaSQLite.execute($rootScope.db, queryOrdering, [order_id]).then(function(suc) {
                            if(suc.rows.length > 0) {

                              // DB ORDERS
                              var orderingUpd = "UPDATE ordering SET order_user=?, order_user_name_phone=?, order_user_surname_phone=?, order_user_middlename_phone=?, order_user_adress_phone=?, order_user_comment_phone=?, order_name=?, order_name_phone=?, order_user_phone_phone=?, order_user_email_phone=?, order_desc=?, order_worker=?, order_worker_name_phone=?, order_worker_pic_phone=?, order_worker_profession_phone=?, order_reminder_phone=?, order_institution=?, order_office=?, order_bill=?, order_goods=?, order_cats=?, order_order=?, order_status=?,  order_start=?, order_start_name_phone=?, order_end=?, order_allday=?, order_mobile_confirm=?, order_mobile=?, order_when=?, order_del=? WHERE order_id=?";
                              $cordovaSQLite.execute($rootScope.db, orderingUpd, [order_user, user_name_phone, order_user_surname_phone, order_user_middlename_phone, order_user_adress_phone, order_user_comment_phone, order_name, order_name_phone, order_user_phone_phone, order_user_email_phone, order_desc, order_worker, order_worker_name_phone, order_worker_pic_phone, order_worker_profession_phone, order_reminder_phone, order_institution, order_office, order_bill, order_goods, order_cats, order_order, order_status, order_start, order_start_name_phone, order_end, order_allday, order_mobile_confirm, order_mobile, order_when, order_del, order_id]).then(function() {
                                id++;
                                if(id < orderArr.length) {
                                orderArrFunc(id);
                                }
                              }, function() {});

                            }
                            else {

                              var orderIns = "INSERT INTO ordering (order_id, order_user, user_name_phone, order_user_surname_phone, order_user_middlename_phone, order_user_adress_phone, order_user_comment_phone, order_name, order_name_phone, order_user_phone_phone, order_user_email_phone, order_desc, order_worker, order_worker_name_phone, order_worker_pic_phone, order_worker_profession_phone, order_reminder_phone, order_institution, order_office, order_bill, order_goods, order_cats, order_order, order_status, order_start, order_start_name_phone, order_end, order_allday, order_mobile_confirm, order_mobile, order_when, order_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                              $cordovaSQLite.execute($rootScope.db, orderIns, [order_id, order_user, user_name_phone, order_user_surname_phone, order_user_middlename_phone, order_user_adress_phone, order_user_comment_phone, order_name, order_name_phone, order_user_phone_phone, order_user_email_phone, order_desc, order_worker, order_worker_name_phone, order_worker_pic_phone, order_worker_profession_phone, order_reminder_phone, order_institution, order_office, order_bill, order_goods, order_cats, order_order, order_status, order_start, order_start_name_phone, order_end, order_allday, order_mobile_confirm, order_mobile, order_when, order_del]).then(function(ins) {
                                id++;
                                if(id < orderArr.length) {
                                orderArrFunc(id);
                                }
                              }, function() {});

                            }
                          }, function() {});

                        };
                        orderArrFunc(0);

                      }

                      var user_name = oldUsr.usrData['user_name'];
                      var user_surname = oldUsr.usrData['user_surname'];
                      var user_middlename = oldUsr.usrData['user_middlename'];
                      var user_email = oldUsr.usrData['user_email'];
                      var user_email_confirm = oldUsr.usrData['user_email_confirm'];
                      var user_pwd = oldUsr.usrData['user_pwd'];
                      var user_tel = oldUsr.usrData['user_tel'];
                      var user_pic = oldUsr.usrData['user_pic'];
                      var user_gender = oldUsr.usrData['user_gender'];
                      var user_birthday = oldUsr.usrData['user_birthday'];
                      var user_country = oldUsr.usrData['user_country'];
                      var user_region = oldUsr.usrData['user_region'];
                      var user_city = oldUsr.usrData['user_city'];
                      var user_adress = oldUsr.usrData['user_adress'];
                      var user_install_where = oldUsr.usrData['user_install_where'];
                      var user_log_key = oldUsr.usrData['user_log_key'];
                      var user_promo = oldUsr.usrData['user_promo'];
                      var user_del = oldUsr.usrData['user_del'];

                      // DB USER
                      var usrUpd = "UPDATE users SET user_name=?, user_surname=?, user_middlename=?, user_email=?, user_email_confirm=?, user_pwd=?, user_tel=?, user_pic=?, user_gender=?, user_birthday=?, user_country=?, user_region=?, user_city=?, user_adress=?, user_install_where=?, user_log_key=?, user_promo=?, user_del=? WHERE user_id=?";
                      $cordovaSQLite.execute($rootScope.db, usrUpd, [user_name, user_surname, user_middlename, user_email, user_email_confirm, user_pwd, user_tel, user_pic, user_gender, user_birthday, user_country, user_region, user_city, user_adress, user_install_where, user_log_key, user_promo, user_del, 1]).then(function() {}, function() {});

                  }

                  var errPopup = $ionicPopup.alert({
                    title: '<img style="margin:10px;" src="img/signs/heartbubble.png" width="40%" />',
                    template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_numconf_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_numconf_tmp+'</h4>',
                    cssClass: 'gifterr',
                    scope: $scope,
                    buttons: [
                      {
                        text: '<h3>'+$scope.profile_edit_ctrl_pop_numconf_btn1+'</h3>',
                        type: 'button-full button-clear darkgreentxt',
                        onTap: function(e) {
                            $scope.closeModal(5);
                            $timeout(function () {
                                $scope.closeModal(2);

                                Profile.allnew().then(function(profdata) {
                                  $scope.profile = profdata;
                                  $scope.profile.user_mob_code = Phone.getShort($scope.profile.user_mob);
                                  var replaceCode = $scope.profile.user_mob_code.toString();
                                  $scope.profile.user_mob_no_code = $scope.profile.user_mob.toString().replace(replaceCode, '');
                                  $scope.profile.user_surname = ($scope.profile.user_surname != '0') ? $scope.profile.user_surname : '';
                                  $scope.profile.user_name = ($scope.profile.user_name != '0') ? $scope.profile.user_name : '';
                                  $scope.profile.user_middlename = ($scope.profile.user_middlename != '0') ? $scope.profile.user_middlename : '';
                                  $scope.profile.user_email = ($scope.profile.user_email != '0') ? $scope.profile.user_email : '';
                                  $scope.profile.user_mob_code = ($scope.profile.user_mob_code != '0') ? $scope.profile.user_mob_code : '';
                                  errPopup.close();
                                }, function() {});

                            }, 100);
                        }
                      }
                    ]
                  });

                }
                else if(oldUsr.length == 0) {
                  var errPopup = $ionicPopup.alert({
                    title: '<img style="margin:10px;" src="img/signs/heartbubble.png" width="40%" />',
                    template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_numconf_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_numconf_tmp+'</h4>',
                    cssClass: 'gifterr',
                    scope: $scope,
                    buttons: [
                      {
                        text: '<h3>'+$scope.profile_edit_ctrl_pop_numconf_btn1+'</h3>',
                        type: 'button-full button-clear darkgreentxt',
                        onTap: function(e) {
                            errPopup.close();
                            $timeout(function () {
                                Profile.allnew().then(function(profdata) {
                                  $scope.profile = profdata;
                                  $scope.profile.user_mob_code = Phone.getShort($scope.profile.user_mob);
                                  var replaceCode = $scope.profile.user_mob_code.toString();
                                  $scope.profile.user_mob_no_code = $scope.profile.user_mob.toString().replace(replaceCode, '');
                                  $scope.profile.user_surname = ($scope.profile.user_surname != '0') ? $scope.profile.user_surname : '';
                                  $scope.profile.user_name = ($scope.profile.user_name != '0') ? $scope.profile.user_name : '';
                                  $scope.profile.user_middlename = ($scope.profile.user_middlename != '0') ? $scope.profile.user_middlename : '';
                                  $scope.profile.user_email = ($scope.profile.user_email != '0') ? $scope.profile.user_email : '';
                                  $scope.profile.user_mob_code = ($scope.profile.user_mob_code != '0') ? $scope.profile.user_mob_code : '';
                                  errPopup.close();
                                }, function() {});
                                $scope.closeModal(5);
                                $scope.closeModal(2);
                            }, 100);
                        }
                      }
                    ]
                  });
                }
              }
              else {
                var errPopup = $ionicPopup.alert({
                  title: '<i class="icon ion-alert redtxt alerts" />',
                  template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_erransw_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_erransw_tmp+'</h4>',
                  cssClass: 'gifterr',
                  scope: $scope,
                  buttons: [
                    {
                      text: '<h3>'+$scope.conn_err_close+'</h3>',
                      type: 'button-full button-clear darkgreentxt',
                      onTap: function(e) {
                          errPopup.close();
                      }
                    }
                  ]
                });
              }

          }, function(er) {
            $ionicLoading.hide().then(function() {
                $scope.connectionErr();
            });
          });

      }
      else if(data[0].smsOK == '6') {
          var errPopup = $ionicPopup.alert({
            title: '<i class="icon ion-alert redtxt alerts" />',
            template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_errcode_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_errcode_tmp+'</h4>',
            cssClass: 'gifterr',
            scope: $scope,
            buttons: [
              {
                text: '<h3>'+$scope.conn_err_close+'</h3>',
                type: 'button-full button-clear darkgreentxt',
                onTap: function(e) {
                    errPopup.close();
                }
              }
            ]
          });
      }
      else {
        var errPopup = $ionicPopup.alert({
          title: '<i class="icon ion-alert redtxt alerts" />',
          template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_errconf_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_errconf_tmp+'</h4>',
          cssClass: 'gifterr',
          scope: $scope,
          buttons: [
            {
              text: '<h3>'+$scope.conn_err_close+'</h3>',
              type: 'button-full button-clear darkgreentxt',
              onTap: function(e) {
                  errPopup.close();
              }
            }
          ]
        });
      }

    }, function() {
      $ionicLoading.hide().then(function() {
          $scope.connectionErr();
      });
    });

  }

  $scope.updateData = function() {

      $ionicLoading.show({
        template: '<ion-spinner icon="android" class="spinner-positive"></ion-spinner>',
        duration: 0
      }).then(function(){
        // console.log("The loading indicator is now displayed");
      });
      
      var updstr = JSON.stringify({
          device: $scope.profile.user_device,
          device_id: $scope.profile.user_device_id,
          device_version: $scope.profile.user_device_version,
          device_os: $scope.profile.user_device_os,
          user_name: ($scope.profile.user_name != '' && $scope.profile.user_name != 0) ? $scope.profile.user_name : "0",
          user_surname: ($scope.profile.user_surname != '' && $scope.profile.user_surname != 0) ? $scope.profile.user_surname : "0",
          user_middlename: ($scope.profile.user_middlename != '' && $scope.profile.user_middlename != 0) ? $scope.profile.user_middlename : "0",
          user_email: ($scope.profile.user_email != '' && $scope.profile.user_email != 0) ? $scope.profile.user_email : "0",
          user_mob: ($scope.profile.user_mob != '' && $scope.profile.user_mob != 0) ? $scope.profile.user_mob : "0",
          user_gender: ($scope.profile.user_gender != '' && $scope.profile.user_gender != 0) ? $scope.profile.user_gender : "0",
          user_birthday: $scope.profile.user_birthday,
          user_pic: $scope.profile.user_pic,
          inst_id: $scope.profile.user_institution,
          newusr: 'upd'
      });

      $http.post($rootScope.generalscript, updstr).then(function(e) {

          var data = e.data;

          if(data[0].upd == '1') {

            Profile.setAll($scope.profile, data[0].when);

            $ionicLoading.hide().then(function(){});

            $state.go('tab.else');

          }

      }, function() {
        $ionicLoading.hide().then(function() {
            $scope.connectionErr();
        });
      });

  }

  $scope.openDatePicker = function() {

    var nowDate = new Date();
    var nowY1 = nowDate.getFullYear() - 6;
    var nowM = nowDate.getMonth();
    var nowD = nowDate.getDate();
    var dateTo = new Date(nowY1, nowM, nowD);

    ionicDatePicker.openDatePicker({
      callback: function (val) {
        var gotDate = new Date(val);
        var timezoneval = timezoneSub.get(val);
        var dy = gotDate.getFullYear();
        var dm = gotDate.getMonth()+1;
        var dd = gotDate.getDate();
        var birthformat = dy + '-' + dm + '-' + dd;
        $scope.profile.user_birthday = birthformat;
        $scope.userbirthday = timezoneval;
      },
      weeksList: [$scope.day_mo, $scope.day_tu, $scope.day_we, $scope.day_th, $scope.day_fr, $scope.day_st, $scope.day_su],
      monthsList: [$scope.month_jan, $scope.month_feb, $scope.month_mar, $scope.month_apr, $scope.month_may, $scope.month_jun, $scope.month_jul, $scope.month_aug, $scope.month_sep, $scope.month_okt, $scope.month_nov, $scope.month_dez],
      setLabel: $scope.day_month_accept,
      closeLabel: $scope.day_month_cancel,
      titleLabel: $scope.profile_edit_birthday,
      inputDate: $scope.profile.user_birthday == '0000-00-00' ? dateTo : new Date($scope.profile.user_birthday),
      mondayFirst: true,
      templateType: 'modal',
      showTodayButton: false,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: true
    });

  };

  $scope.htmlEntities = function(toencode) {
    return HtmlEnt.decodeEntities(toencode);
  }

  // НАСТРОЙКИ СЕЛФИ
  var optionsselfie = {
      quality: 70,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      targetWidth: 700,
      targetHeight: 700,
      correctOrientation: true
  };

  $scope.selfieBtn = true;
  
  // СДЕЛАТЬ СЕЛФИ
  $scope.selfie = function() {

      if($cordovaNetwork.isOnline()) {

        permissions.hasPermission(list, function(persucc) {
          
          permissions.requestPermissions(list, function(status) {

              if(!status.hasPermission) {
                  // alert('ERROR PERMISSION NOT GRANTED ==================================> ')
              }
              else {

                if($scope.selfieBtn) {

                    $scope.selfieBtn = false;

                    $cordovaCamera.getPicture(optionsselfie).then(function(imageURI) {

                        $scope.selfieBtn = true;

                        // DATE - TIME IN SECONDS
                        var when = Math.floor(new Date().getTime() / 1000);

                        var randpicname = $scope.profile.user_real_id + '_' + when;

                        var namefilesplit = imageURI.split('/');
                        var namefile = namefilesplit[namefilesplit.length-1];
                        var oldurlsplit = imageURI.split(namefile);
                        var oldurl = oldurlsplit[0];
                        var topath = cordova.file.dataDirectory + $rootScope.inst_dir + '/' + randpicname + '.jpg';
                        var tourl = cordova.file.dataDirectory + $rootScope.inst_dir + '/';

                        $cordovaFile.moveFile(oldurl, namefile, tourl, randpicname + '.jpg').then(function(success) {

                            $scope.savePic(topath, randpicname);

                        }, function(er) {});


                    }, function(err) {
                        $scope.selfieBtn = true;
                    });

                }
                
              }

          }, function(pererror) {
              $ionicLoading.hide().then(function() {});
              // alert('ERROR PERMISSION PLUGIN ==================================> '+JSON.stringify(pererror))
          })

        }, null);

      } else {
       $scope.connectionErr();
      }

  }

  // НАСТРОЙКИ ВЫБОРА ФОТО
  var optionsImg = {
    maximumImagesCount: 1,
    width: 800,
    height: 800,
    quality: 80
  };

  $scope.loadingpercent = 0;
  
  // ВЫБРАТЬ ФОТО
  $scope.selPic = function() {

      if($cordovaNetwork.isOnline()) {

        permissions.hasPermission(list, function(persucc) {
          
          permissions.requestPermissions(list, function(status) {

            if(!status.hasPermission) {
                // alert('ERROR PERMISSION NOT GRANTED ==================================> ')
            }
            else {

              if($scope.selfieBtn) {

                  $scope.selfieBtn = false;

                    $cordovaImagePicker.getPictures(optionsImg)
                      .then(function (results) {

                          $scope.selfieBtn = true;

                          if(results.length > 0) {

                            for (var i = 0; i < results.length; i++) {

                              // DATE - TIME IN SECONDS
                              var when = Math.floor(new Date().getTime() / 1000);

                              var randpicname = $scope.profile.user_real_id + '_' + when;

                              var namefilesplit = results[i].split('/');
                              var namefile = namefilesplit[namefilesplit.length-1];
                              var oldurlsplit = results[i].split(namefile);
                              var oldurl = oldurlsplit[0];
                              var topath = cordova.file.dataDirectory + $rootScope.inst_dir + '/' + randpicname + '.jpg';
                              var tourl = cordova.file.dataDirectory + $rootScope.inst_dir + '/';

                              $cordovaFile.copyFile(oldurl, namefile, tourl, randpicname + '.jpg').then(function(success) {

                                $scope.savePic(topath, randpicname);

                              }, function(er) {});
                              
                            }

                          }

                      }, function(error) {
                          $scope.selfieBtn = true;
                      });

              }

            }
              
          }, function(pererror) {
              $ionicLoading.hide().then(function() {});
              // alert('ERROR PERMISSION PLUGIN ==================================> '+JSON.stringify(pererror))
          })

        }, null);

      } else {
          $scope.connectionErr();
      }

  }

  // ЗАГРУЗКА СЕЛФИ
  $scope.savePic = function(imgpath, randpicname) {

      // Setup the loader
      $ionicLoading.show({
          content: '<ion-spinner icon="android" class="spinner-positive"></ion-spinner> <span>'+$scope.loadingpercent+'</span>',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 50,
          showDelay: 0
      });

      // UPLOADING
      var options = {
          fileKey: "file",
          fileName: randpicname + '.jpg',
          chunkedMode: false,
          mimeType: 'image/jpeg'
      }

      $cordovaFileTransfer.upload("http://www.olegtronics.com/admin/coms/upload.php?usrupl=1&preview=1&user_id=" + $scope.profile.user_real_id, imgpath, options).then(function(result) {
          
          var srtringify = JSON.stringify(result.response);
          var parsingres = JSON.parse(JSON.parse(srtringify));

          var messent = parsingres.user_upd;

          if(messent > 0) {

              $scope.profile.user_pic = randpicname + '.jpg';

          }
          
          $ionicLoading.hide().then(function() {});

      }, function(err) {

          $ionicLoading.hide().then(function() {
            $scope.connectionErr();
          });

      }, function (progress) {
          $scope.loadingpercent = Math.round((progress.loaded / progress.total) * 100) + ' %';
      });

  }

  $ionicModal.fromTemplateUrl('templates/modal-gender.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalGender = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-mobile.html', {
    id: '2',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalMobile = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-email.html', {
    id: '3',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalEmail = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-mobile-code.html', {
    id: '4',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalMobileCode = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-mobile-confirm.html', {
    id: '5',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalMobileConfirm = modal;
  });

  $scope.openModal = function(index) {
    if (index == 1) {$scope.oModalGender.show();}
    else if(index == 2) {
      if($scope.profile.user_mob_confirm != 1) {$scope.oModalMobile.show();} else {
        var errPopup = $ionicPopup.alert({
          title: '<i class="icon ion-alert redtxt alerts" />',
          template: '<h3 class="hh3"><strong>'+$scope.profile_edit_ctrl_pop_proofed_tit+'</strong></h3><h4 class="hh4">'+$scope.profile_edit_ctrl_pop_proofed_temp+'</h4>',
          cssClass: 'gifterr',
          scope: $scope,
          buttons: [
            {
              text: '<h3>'+$scope.conn_err_close+'</h3>',
              type: 'button-full button-clear darkgreentxt',
              onTap: function(e) {
                  errPopup.close();
              }
            }
          ]
        });
      }
    }
    else if(index == 3) {$scope.oModalEmail.show();}
    else if(index == 4) {$scope.oModalMobileCode.show();}
    else if(index == 5) {$scope.oModalMobileConfirm.show();}
  };

  $scope.closeModal = function(index) {
    if (index == 1) {$scope.oModalGender.hide();}
    else if(index == 2) {$scope.oModalMobile.hide();}
    else if(index == 3) {$scope.oModalEmail.hide();}
    else if(index == 4) {$scope.oModalMobileCode.hide();}
    else if(index == 5) {$scope.oModalMobileConfirm.hide();}
  };

  $scope.$on('modal.shown', function(event, modal) {
    
  });

  $scope.$on('modal.hidden', function(event, modal) {

  });

  $scope.$on('$destroy', function() {
    $scope.oModalGender.remove();
    $scope.oModalMobile.remove();
    $scope.oModalEmail.remove();
    $scope.oModalMobileCode.remove();
  });

  $scope.acceptStyle = function() {
      $scope.myStyle = {'background-repeat': 'no-repeat', 'background-position': 'center center', 'background-size': 'cover'};
  }

})

.controller('TransactionsCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicActionSheet, $ionicPopup, $translate, Profile, Order, timezoneAdd, timezoneSub) {

  $scope.$on('$ionicView.enter', function() {

    $translate(['reservation_ctrl_pop_canc_tit', 'reservation_ctrl_pop_canc_temp', 'reservation_ctrl_pop_canc_btn1', 'reservation_ctrl_pop_canc_btn2', 'profile_ctrl_pop_canc_tit', 'profile_ctrl_pop_canc_temp', 'profile_ctrl_pop_canc_btn1', 'profile_ctrl_pop_canc_btn2']).then(function(res) {
      $scope.reservation_ctrl_pop_canc_tit = res.reservation_ctrl_pop_canc_tit;
      $scope.reservation_ctrl_pop_canc_temp = res.reservation_ctrl_pop_canc_temp;
      $scope.reservation_ctrl_pop_canc_btn1 = res.reservation_ctrl_pop_canc_btn1;
      $scope.reservation_ctrl_pop_canc_btn2 = res.reservation_ctrl_pop_canc_btn2;
      $scope.profile_ctrl_pop_canc_tit = res.profile_ctrl_pop_canc_tit;
      $scope.profile_ctrl_pop_canc_temp = res.profile_ctrl_pop_canc_temp;
      $scope.profile_ctrl_pop_canc_btn1 = res.profile_ctrl_pop_canc_btn1;
      $scope.profile_ctrl_pop_canc_btn2 = res.profile_ctrl_pop_canc_btn2;
    });

    if(Profile.check()) {
      $scope.profile = Profile.allold();
      if(Order.check()) {
        $scope.ordersAll = Order.get10old();
      }
      else {
        Order.get10new($scope.profile.user_real_id).then(function(odata) {
          $scope.ordersAll = odata;
        }, function() {});
      }
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
        if(Order.check()) {
          $scope.ordersAll = Order.get10old();
        }
        else {
          Order.get10new($scope.profile.user_real_id).then(function(odata) {
            $scope.ordersAll = odata;
          }, function() {});
        }
      }, function() {});
    }

  });

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.timecalc = function(x) {
    // ОПРЕДЕЛЕНИЕ ВРЕМЯ
    var nowtime = new Date();
    var gottime = timezoneAdd.get(x * 1000);
    var nowtimediff = nowtime.getTime() - gottime;
    var onltime = new Date(gottime);
    var onlDateTime;
    var onlMonth;
    var onlDay;
    var onlHour;
    var onlMin;

    // DAYS AGO
    if(nowtimediff > 86400) {
      if(onltime.getMonth() < 9) {
          onlMonth = '0' + (onltime.getMonth() + 1);
      } else {
          onlMonth = onltime.getMonth() + 1;
      }

      if(onltime.getDate() < 10) {
          onlDay = '0' + onltime.getDate();
      } else {
          onlDay = onltime.getDate();
      }

      if(onltime.getHours() < 10) {
          onlHour = '0' + onltime.getHours();
      } else {
          onlHour = onltime.getHours();
      }
      if(onltime.getMinutes() < 10) {
          onlMin = '0' + onltime.getMinutes();
      } else {
          onlMin = onltime.getMinutes();
      }

      onlDateTime = onlDay + '.' + onlMonth + '.' + onltime.getFullYear() + ' ' + onlHour + ':' + onlMin;
    }
    // HOURS AND MINUTES AGO
    else {
      if(onltime.getHours() < 10) {
          onlHour = '0' + onltime.getHours();
      } else {
          onlHour = onltime.getHours();
      }
      if(onltime.getMinutes() < 10) {
          onlMin = '0' + onltime.getMinutes();
      } else {
          onlMin = onltime.getMinutes();
      }

      onlDateTime =  onlHour + ':' + onlMin;
    }

    return onlDateTime;
  }

  $scope.beforeCancelOrder = function(id) {
    var alertPopup = $ionicPopup.alert({
      title: '<img style="margin:20px;" src="img/signs/clean.png" width="35%" />',
      template: '<h3 class="hh3"><strong>'+$scope.trans_ctrl_pop_canc_tit+'</strong></h3><h4 class="hh4">'+$scope.trans_ctrl_pop_canc_tmp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h4 class="darkgreentxt">'+$scope.trans_ctrl_pop_canc_btn1+'</h4>',
          type: 'button-full button-clear',
          onTap: function(e) {
              alertPopup.close();
          }
        },
        {
          text: '<h4 class="darkgreentxt">'+$scope.trans_ctrl_pop_canc_btn2+'</h4>',
          type: 'button-full button-clear',
          onTap: function(e) {
              alertPopup.close();
          }
        }
      ]
    });
  }

})

.controller('PointsCtrl', function($scope, $state, $stateParams, $ionicHistory, Points, Cart, Profile, timezoneAdd, timezoneSub) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.$on('$ionicView.enter', function() {
    
    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
      if(Points.checkpoints()) {
        $scope.points = Points.get10old();
        if($scope.points.length > 0) {
          $scope.pointStyle = {'background-color':'#fff','width':'100%','padding-top':'20px','border-radius':'20px 20px 0 0'};
        }
      }
      else {
        Points.get10new($scope.profile.user_real_id).then(function(odata) {
          $scope.points = odata;
          if($scope.points.length > 0) {
            $scope.pointStyle = {'background-color':'#fff','width':'100%','padding-top':'20px','border-radius':'20px 20px 0 0'};
          }
        }, function() {});
      }
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
        if(Points.checkpoints()) {
          $scope.points = Points.get10old();
        }
        else {
          Points.get10new($scope.profile.user_real_id).then(function(odata) {
            $scope.points = odata;
          }, function() {});
        }
      }, function() {});
    }

  });

  $scope.timecalc = function(x) {
    // ОПРЕДЕЛЕНИЕ ВРЕМЯ
    var nowtime = new Date();
    var gottime = timezoneAdd.get(x * 1000);
    var nowtimediff = nowtime.getTime() - gottime;
    var onltime = new Date(gottime);
    var onlDateTime;
    var onlMonth;
    var onlDay;
    var onlHour;
    var onlMin;

    // DAYS AGO
    if(nowtimediff > 86400) {
      if(onltime.getMonth() < 9) {
          onlMonth = '0' + (onltime.getMonth() + 1);
      } else {
          onlMonth = onltime.getMonth() + 1;
      }

      if(onltime.getDate() < 10) {
          onlDay = '0' + onltime.getDate();
      } else {
          onlDay = onltime.getDate();
      }

      if(onltime.getHours() < 10) {
          onlHour = '0' + onltime.getHours();
      } else {
          onlHour = onltime.getHours();
      }
      if(onltime.getMinutes() < 10) {
          onlMin = '0' + onltime.getMinutes();
      } else {
          onlMin = onltime.getMinutes();
      }

      onlDateTime = onlDay + '.' + onlMonth + '.' + onltime.getFullYear() + ' ' + onlHour + ':' + onlMin;
    }
    // HOURS AND MINUTES AGO
    else {
      if(onltime.getHours() < 10) {
          onlHour = '0' + onltime.getHours();
      } else {
          onlHour = onltime.getHours();
      }
      if(onltime.getMinutes() < 10) {
          onlMin = '0' + onltime.getMinutes();
      } else {
          onlMin = onltime.getMinutes();
      }

      onlDateTime =  onlHour + ':' + onlMin;
    }

    return onlDateTime;
  }

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.htmlEntities = function(toencode) {
    return HtmlEnt.decodeEntities(toencode);
  }

  $scope.pointStyle = {};

})

.controller('PurchaseCtrl', function($scope, $state, $stateParams, $ionicHistory, Order, Cart, Profile, timezoneAdd, timezoneSub, HtmlEnt) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.$on('$ionicView.enter', function() {
    
    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
      if(Order.checkpurchasez()) {
        $scope.purchases = Order.get10Purchold();
        if($scope.purchases.length > 0) {
          $scope.purchStyle = {'background-color':'#fff','width':'100%','padding-top':'20px','border-radius':'20px 20px 0 0'};
        }
      }
      else {
        Order.get10Purchnew($scope.profile.user_real_id).then(function(odata) {
          $scope.purchases = odata;
          if($scope.purchases.length > 0) {
            $scope.purchStyle = {'background-color':'#fff','width':'100%','padding-top':'20px','border-radius':'20px 20px 0 0'};
          }
        }, function() {});
      }
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
        if(Order.checkpurchasez()) {
          $scope.purchases = Order.get10Purchold();
        }
        else {
          Order.get10Purchnew($scope.profile.user_real_id).then(function(odata) {
            $scope.purchases = odata;
          }, function() {});
        }
      }, function() {});
    }

  });

  $scope.timecalc = function(x) {
    // ОПРЕДЕЛЕНИЕ ВРЕМЯ
    var nowtime = new Date();
    var gottime = timezoneAdd.get(x * 1000);
    var nowtimediff = nowtime.getTime() - gottime;
    var onltime = new Date(gottime);
    var onlDateTime;
    var onlMonth;
    var onlDay;
    var onlHour;
    var onlMin;

    // DAYS AGO
    if(nowtimediff > 86400) {
      if(onltime.getMonth() < 9) {
          onlMonth = '0' + (onltime.getMonth() + 1);
      } else {
          onlMonth = onltime.getMonth() + 1;
      }

      if(onltime.getDate() < 10) {
          onlDay = '0' + onltime.getDate();
      } else {
          onlDay = onltime.getDate();
      }

      if(onltime.getHours() < 10) {
          onlHour = '0' + onltime.getHours();
      } else {
          onlHour = onltime.getHours();
      }
      if(onltime.getMinutes() < 10) {
          onlMin = '0' + onltime.getMinutes();
      } else {
          onlMin = onltime.getMinutes();
      }

      onlDateTime = onlDay + '.' + onlMonth + '.' + onltime.getFullYear() + ' ' + onlHour + ':' + onlMin;
    }
    // HOURS AND MINUTES AGO
    else {
      if(onltime.getHours() < 10) {
          onlHour = '0' + onltime.getHours();
      } else {
          onlHour = onltime.getHours();
      }
      if(onltime.getMinutes() < 10) {
          onlMin = '0' + onltime.getMinutes();
      } else {
          onlMin = onltime.getMinutes();
      }

      onlDateTime =  onlHour + ':' + onlMin;
    }

    return onlDateTime;
  }

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.htmlEntities = function(toencode) {
    return HtmlEnt.decodeEntities(toencode);
  }

  $purchStyle = {};;

})

.controller('GiftsCtrl', function($scope, $state, $stateParams, $ionicHistory, Gifts, Cart, Profile) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  if(Gifts.check()) {
    $scope.gifts = Gifts.getgiftold();
  }
  else {
    Gifts.getgiftnew().then(function(data) {
      $scope.gifts = data;
    }, function() {});
  }

  $scope.$on('$ionicView.enter', function(){

    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
      }, function() {});
    }

  });

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.myStyle = {'background-repeat': 'no-repeat', 'background-position': 'center center', 'background-size': 'cover'};

  $scope.acceptStyle = function() {
    $scope.myStyle = {'background-repeat': 'no-repeat', 'background-position': 'center center', 'background-size': 'cover'};
  }

})

.controller('GiftsDetailCtrl', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $ionicPopup, $translate, $timeout, Gifts, Cart, Profile, Points, Bill) {

  $scope.$on('$ionicView.enter', function(){

    $translate(['gifts_detail_ctrl_pop_tit', 'gifts_detail_ctrl_pop_tmp1', 'gifts_detail_ctrl_pop_tmp2', 'gifts_detail_ctrl_pop_tmp3', 'gifts_detail_ctrl_pop_btn1', 'blocked_title', 'blocked_body', 'blocked_cancel', 'gifts_detail_pop_phone_tit', 'gifts_detail_pop_phone_tmp', 'gifts_detail_pop_phone_btn1', 'gifts_detail_pop_phone_btn2']).then(function(res) {
      $scope.gifts_detail_ctrl_pop_tit = res.gifts_detail_ctrl_pop_tit;
      $scope.gifts_detail_ctrl_pop_tmp1 = res.gifts_detail_ctrl_pop_tmp1;
      $scope.gifts_detail_ctrl_pop_tmp2 = res.gifts_detail_ctrl_pop_tmp2;
      $scope.gifts_detail_ctrl_pop_tmp3 = res.gifts_detail_ctrl_pop_tmp3;
      $scope.gifts_detail_ctrl_pop_btn1 = res.gifts_detail_ctrl_pop_btn1;
      $scope.blocked_title = res.blocked_title;
      $scope.blocked_body = res.blocked_body;
      $scope.blocked_cancel = res.blocked_cancel;
      $scope.gifts_detail_pop_phone_tit = res.gifts_detail_pop_phone_tit;
      $scope.gifts_detail_pop_phone_tmp = res.gifts_detail_pop_phone_tmp;
      $scope.gifts_detail_pop_phone_btn1 = res.gifts_detail_pop_phone_btn1;
      $scope.gifts_detail_pop_phone_btn2 = res.gifts_detail_pop_phone_btn2;
    });

    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
      if(Points.checkpoints()) {
        $scope.points = Points.get10old();
      }
      else {
        Points.get10new($scope.profile.user_real_id).then(function(odata) {
          $scope.points = odata;
        }, function() {});
      }
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
        if(Points.checkpoints()) {
          $scope.points = Points.get10old();
        }
        else {
          Points.get10new($scope.profile.user_real_id).then(function(odata) {
            $scope.points = odata;
          }, function() {});
        }
      }, function() {});
    }

  });

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.gift = Gifts.get($stateParams.giftId);

  $scope.getGift = function() {

    if($scope.profile.user_work_pos == '2' || $scope.profile.user_work_pos == '3' || $scope.profile.user_work_pos == '4') {

        var errPopup = $ionicPopup.alert({
          title: '<i class="icon ion-alert redtxt alerts" />',
          template: '<h3 class="hh3"><strong>'+$scope.blocked_title+'</strong></h3><h4 class="hh4">'+$scope.blocked_body+'</h4>',
          cssClass: 'gifterr',
          scope: $scope,
          buttons: [
            {
              text: '<h3>'+$scope.blocked_cancel+'</h3>',
              type: 'button-full button-clear darkgreentxt',
              onTap: function(e) {
                  errPopup.close();
              }
            }
          ]
        });

    }
    else if($scope.profile.user_mob && $scope.profile.user_mob != '0' && $scope.profile.user_mob_confirm && $scope.profile.user_mob_confirm == '1') {

        if($scope.gift.points > $scope.points) {

          var needpoints = $scope.gift.points - $scope.points;

          var alertPopup = $ionicPopup.alert({
            title: '<img style="margin:10px;width:40%;max-width:200px;" src="img/signs/pig.png" />',
            template: '<h3 class="hh3"><strong>'+$scope.gifts_detail_ctrl_pop_tit+'</strong></h3><h4 class="hh4">'+$scope.gifts_detail_ctrl_pop_tmp1+'<br/><span style="color:#7ED321;">'+needpoints+' '+$scope.gifts_detail_ctrl_pop_tmp2+'</span> '+$scope.gifts_detail_ctrl_pop_tmp3+'</h4>',
            cssClass: 'gifterr',
            scope: $scope,
            buttons: [
              {
                text: '<h3>'+$scope.gifts_detail_ctrl_pop_btn1+'</h3>',
                type: 'button-full button-clear',
                onTap: function(e) {
                    alertPopup.close();
                }
              }
            ]
          });

        }
        else {

          var otherstring = 'gifts&' + $scope.gift.gifts_id + '&' + $rootScope.uuid;

          Bill.setbill($scope.gift.gifts_points, otherstring);

          $timeout(function() {$state.go('gifts-get', {giftId: $stateParams.giftId});}, 100);
        }

    }
    else {

        var errPopup = $ionicPopup.alert({
          title: '<i class="icon ion-alert redtxt alerts" />',
          template: '<h3 class="hh3"><strong>'+$scope.gifts_detail_pop_phone_tit+'</strong></h3><h4 class="hh4">'+$scope.gifts_detail_pop_phone_tmp+'</h4>',
          cssClass: 'gifterr',
          scope: $scope,
          buttons: [
            {
              text: '<b>'+$scope.gifts_detail_pop_phone_btn1+'</b>',
              type: 'button-full button-clear darkgreentxt',
              onTap: function(e) {
                  errPopup.close();
                  $timeout(function() {$state.go('profile-edit');}, 100);
              }
            },
            {
              text: $scope.gifts_detail_pop_phone_btn2,
              type: 'button-full button-clear darkgreentxt',
              onTap: function(e) {
                  errPopup.close();
              }
            }
          ]
        });

    }
          
  }

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

  $scope.acceptStyle = function() {
      $scope.myStyle = {'background-repeat': 'no-repeat', 'background-position': 'center center', 'background-size': 'auto 100%'};
  }

})

.controller('GiftsGetCtrl', function($rootScope, $scope, $state, $stateParams, $ionicPopup, $ionicModal, $ionicActionSheet, $cordovaSQLite, $cordovaDevice, $timeout, $ionicLoading, $http, $cordovaNetwork, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaImagePicker, $ionicHistory, $translate, Gifts, Inst, Profile, Bill, HtmlEnt) {

  $scope.$on('$ionicView.enter', function(){

    $translate(['conn_err_tit', 'conn_err_tmp', 'conn_err_close', 'gifts_get_ctrl_pop_rev_tit', 'gifts_get_ctrl_pop_rev_tmp', 'gifts_get_ctrl_pop_rev_btn1', 'gifts_get_ctrl_pop_review_tit', 'gifts_get_ctrl_pop_review_temp', 'gifts_get_ctrl_pop_review_btn1', 'gifts_get_ctrl_pop_review_btn2', 'gifts_get_ctrl_pop_tooften_tit', 'gifts_get_ctrl_pop_tooften_temp', 'gifts_review_choise', 'gifts_review_choose_pic', 'gifts_review_make_pic', 'gifts_review_take_pic', 'gifts_review_cancel']).then(function(res) {
      $scope.conn_err_tit = res.conn_err_tit;
      $scope.conn_err_tmp = res.conn_err_tmp;
      $scope.conn_err_close = res.conn_err_close;
      $scope.gifts_get_ctrl_pop_rev_tit = res.gifts_get_ctrl_pop_rev_tit;
      $scope.gifts_get_ctrl_pop_rev_tmp = res.gifts_get_ctrl_pop_rev_tmp;
      $scope.gifts_get_ctrl_pop_rev_btn1 = res.gifts_get_ctrl_pop_rev_btn1;
      $scope.gifts_get_ctrl_pop_review_tit = res.gifts_get_ctrl_pop_review_tit;
      $scope.gifts_get_ctrl_pop_review_temp = res.gifts_get_ctrl_pop_review_temp;
      $scope.gifts_get_ctrl_pop_review_btn1 = res.gifts_get_ctrl_pop_review_btn1;
      $scope.gifts_get_ctrl_pop_review_btn2 = res.gifts_get_ctrl_pop_review_btn2;
      $scope.gifts_get_ctrl_pop_tooften_tit = res.gifts_get_ctrl_pop_tooften_tit;
      $scope.gifts_get_ctrl_pop_tooften_temp = res.gifts_get_ctrl_pop_tooften_temp;
      $scope.gifts_review_choise = res.gifts_review_choise;
      $scope.gifts_review_choose_pic = res.gifts_review_choose_pic;
      $scope.gifts_review_make_pic = res.gifts_review_make_pic;
      $scope.gifts_review_take_pic = res.gifts_review_take_pic;
      $scope.gifts_review_cancel = res.gifts_review_cancel;

      $scope.reviewselected = {
        device_id: $rootScope.uuid,
        inst_id: $rootScope.institution,
        location: $scope.gifts_review_choise,
        rating: 5,
        snapshot: '<span>'+$scope.gifts_review_choose_pic+'</span>',
        pic: '',
        ratingtxt: '',
        newusr: 'rate'
      }

    });

    if(Profile.check()) {
      $scope.profile = Profile.allold();
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
      }, function() {});
    }

  });

  $scope.connectionErr = function() {
    var errPopup = $ionicPopup.alert({
      title: '<i class="icon ion-alert redtxt alerts" />',
      template: '<h3 class="hh3"><strong>'+$scope.conn_err_tit+'</strong></h3><h4 class="hh4">'+$scope.conn_err_tmp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.conn_err_close+'</h3>',
          type: 'button-full button-clear darkgreentxt',
          onTap: function(e) {
              errPopup.close();
          }
        }
      ]
    });
  }

  $scope.htmlEntities = function(toencode) {
    return HtmlEnt.decodeEntities(toencode);
  }

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  var permissions = cordova.plugins.permissions;
  
  var list = [
      permissions.READ_EXTERNAL_STORAGE,
      permissions.WRITE_EXTERNAL_STORAGE
  ];

  $scope.gift = Gifts.get($stateParams.giftId);

  $scope.qrcodeString = Bill.getbill();
  $scope.size = 150;
  $scope.correctionLevel = '';
  $scope.typeNumber = 0;
  $scope.inputMode = '';
  $scope.image = false;

  $scope.calculated = 0;

  $scope.ratingmax = 5;

  var myPopup;

  $ionicModal.fromTemplateUrl('templates/modal-bonus.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalBonus = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-review.html', {
    id: '2',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalReview = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-contact.html', {
    id: '3',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalContact = modal;
  });

  $scope.openModal = function(index) {
    if (index == 1) {$scope.oModalBonus.show();}
    else if(index == 2) {$scope.oModalReview.show();}
    else if(index == 3) {$scope.oModalContact.show();}
  };

  $scope.closeModal = function(index) {
    if (index == 1) {$scope.oModalBonus.hide();}
    else if(index == 2) {$scope.oModalReview.hide();}
    else if(index == 3) {$scope.oModalContact.hide();}
  };

  $scope.$on('modal.shown', function(event, modal) {
    if(modal.id == 3 && $scope.calculated == 0) {

      var today = new Date();
      var onlHour;
      var onlMin;
      
      if(today.getHours() < 10) {
          onlHour = '0' + today.getHours();
      } else {
          onlHour = today.getHours();
      }
      if(today.getMinutes() < 10) {
          onlMin = '0' + today.getMinutes();
      } else {
          onlMin = today.getMinutes();
      }
      var hourmins =  onlHour.toString() +''+ onlMin.toString();

      function inststart() {
        if($scope.institutions.length > 0) {
          for(var x=0;x<$scope.institutions.length;x++) {

            var inst = $scope.institutions[x];
            
            var opncls = ' (закрыто)';
            var opnclsnum = 0;
            var indicat = '<span class="indicatclose"></span>';
            var worktime = '';
            var todayday = today.getDay()-1;
                todayday = inst.office_bus_hours[todayday];

            if(todayday > 0) {

              if(todayday.substr(0,4) > todayday.substr(4,8)) {
                if(todayday.substr(0,4) <= hourmins && hourmins <= 2359) {
                  // open
                  opncls = ' (открыто)';
                  opnclsnum = 1;
                  indicat = '<span class="indicatopen"></span>';
                }
                else if(hourmins >= 0000 && hourmins <= todayday.substr(4,8)) {
                  // open
                  opncls = ' (открыто)';
                  opnclsnum = 1;
                  indicat = '<span class="indicatopen"></span>';
                }
              }
              else if(todayday.substr(0,4) == todayday.substr(4,8)) {
                // open
                opncls = ' (открыто)';
                opnclsnum = 1;
                indicat = '<span class="indicatopen"></span>';
              }
              else if(todayday.substr(0,4) < todayday.substr(4,8)) {
                if(todayday.substr(0,4) <= hourmins && hourmins <= todayday.substr(4,8)) {
                  // open
                  opncls = ' (открыто)';
                  opnclsnum = 1;
                  indicat = '<span class="indicatopen"></span>';
                }
              }

              worktime += todayday.substr(0, 2)+':'+todayday.substr(2, 2);
              worktime += ' - '+todayday.substr(4, 2)+':'+todayday.substr(6, 2);

            }

            Inst.setworktime(inst.office_id, worktime);
            Inst.setopncls(inst.office_id, opnclsnum);

          }
        }
      }

      if(Inst.check()) {
        $scope.institutions = Inst.getinstold();
        inststart();
      }
      else {
        Inst.getinstnew().then(function(data) {
          $scope.institutions = data;
          inststart();
        }, function() {});
      }

      $scope.calculated = 1;

    }
  });

  $scope.$on('modal.hidden', function(event, modal) {

  });

  $scope.$on('$destroy', function() {
    $scope.oModalBonus.remove();
    $scope.oModalReview.remove();
    $scope.oModalContact.remove();
  });

  $scope.takeInst = function(institution) {
    $scope.reviewselected.location = institution.office_adress;
    $scope.closeModal(3);
  }

  $scope.showImageMaker = function() {

    $ionicActionSheet.show({
      buttons: [
        { text: '<span class="darkgreentxt">'+$scope.gifts_review_make_pic+'</span>' },
        { text: '<span class="darkgreentxt">'+$scope.gifts_review_take_pic+'</span>' }
      ],
      cancelText: '<b class="darkgreentxt">'+$scope.gifts_review_cancel+'</b>',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        if(index == 0) {
          $scope.reviewSelfie();
        }
        else if(index == 1) {
          $scope.reviewSelPic();
        }
        return true;
      }
    });

  }

  $scope.alertPopup = function() {
    myPopup = $ionicPopup.alert({
      title: '<img style="margin:10px;" src="img/signs/heartbubble.png" width="40%" />',
      template: '<h3 class="hh3"><strong>'+$scope.gifts_get_ctrl_pop_rev_tit+'</strong></h3><h4 class="hh4">'+$scope.gifts_get_ctrl_pop_rev_tmp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.gifts_get_ctrl_pop_rev_btn1+'</h3>',
          type: 'button-full button-clear darkgreentxt',
          onTap: function(e) {
              myPopup.close();
              $timeout(function() {
                $ionicHistory.nextViewOptions({
                  disableAnimate: false,
                  disableBack: true
                });
                $state.go('tab.card');
              }, 500);
          }
        }
      ]
    });
  }

  $scope.popupClose = function() {
    myPopup.close();
  }

  $scope.notSendReview = function() {
    $scope.closeModal(2);
    $timeout(function() {
      $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
      });
      $state.go('tab.card');
    }, 500);
  }

  $scope.reviewAsk = function() {
    $ionicHistory.nextViewOptions({
      disableAnimate: false,
      disableBack: true
    });
    var alertPopup = $ionicPopup.alert({
      title: '<img style="margin:10px;" src="img/signs/pig.png" width="40%" />',
      template: '<h3 class="hh3"><strong>'+$scope.gifts_get_ctrl_pop_review_tit+'</strong></h3><h4 class="hh4">'+$scope.gifts_get_ctrl_pop_review_temp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.gifts_get_ctrl_pop_review_btn1+'</h3>',
          type: 'button-full button-clear',
          onTap: function(e) {
            alertPopup.close();
            $timeout(function() {
              $scope.openModal(2);
            }, 1000);
          }
        },
        {
          text: '<h3>'+$scope.gifts_get_ctrl_pop_review_btn2+'</h3>',
          type: 'button-full button-clear',
          onTap: function(e) {
              alertPopup.close();
              $timeout(function() {
                $state.go('tab.card');
              }, 500);
          }
        }
      ]
    });
  }

  // НАСТРОЙКИ СЕЛФИ
  var optionsselfie = {
      quality: 70,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      targetWidth: 700,
      targetHeight: 700,
      correctOrientation: true
  };

  // НАСТРОЙКИ ВЫБОРА ФОТО
  var optionsImg = {
    maximumImagesCount: 1,
    width: 800,
    height: 800,
    quality: 80
  };

  $scope.loadingpercent = 0;

  $scope.selfieBtn = true;
  
  // СДЕЛАТЬ СЕЛФИ
  $scope.reviewSelfie = function() {

      if($cordovaNetwork.isOnline()) {

        permissions.hasPermission(list, function(persucc) {
          
          permissions.requestPermissions(list, function(status) {

            if(!status.hasPermission) {
                // alert('ERROR PERMISSION NOT GRANTED ==================================> ')
            }
            else {

              if($scope.selfieBtn) {

                  $scope.selfieBtn = false;
                  
                  $scope.picPrev = 1;

                  $cordovaCamera.getPicture(optionsselfie).then(function(imageURI) {

                      // DATE - TIME IN SECONDS
                      var when = Math.floor(new Date().getTime() / 1000);

                      var randpicname = $scope.profile.user_real_id + '_' + when;

                      var namefilesplit = imageURI.split('/');
                      var namefile = namefilesplit[namefilesplit.length-1];
                      var oldurlsplit = imageURI.split(namefile);
                      var oldurl = oldurlsplit[0];
                      var topath = cordova.file.dataDirectory + $rootScope.inst_dir + '/' + randpicname + '.jpg';
                      var tourl = cordova.file.dataDirectory + $rootScope.inst_dir + '/';

                      $cordovaFile.moveFile(oldurl, namefile, tourl, randpicname + '.jpg').then(function(success) {
                          // console.log("OK ==============================> "+JSON.stringify(success))
                          $scope.reviewSavePic(topath, randpicname);

                      }, function(er) {
                          // console.log("ERROR ==============================> "+JSON.stringify(er))
                      });


                  }, function(err) {
                      $scope.selfieBtn = true;
                  });

              }

            }
            
          }, function(pererror) {
              $ionicLoading.hide().then(function() {});
              // alert('ERROR PERMISSION PLUGIN ==================================> '+JSON.stringify(pererror))
          })

        }, null);

      }
      else {
        $scope.connectionErr();
      }
  }

  // ВЫБРАТЬ ФОТО
  $scope.reviewSelPic = function() {

      if($cordovaNetwork.isOnline()) {

        permissions.hasPermission(list, function(persucc) {
          
          permissions.requestPermissions(list, function(status) {

            if(!status.hasPermission) {
                // alert('ERROR PERMISSION NOT GRANTED ==================================> ')
            }
            else {

              if($scope.selfieBtn) {

                  $scope.selfieBtn = false;

                    $cordovaImagePicker.getPictures(optionsImg)
                      .then(function (results) {

                          $scope.selfieBtn = true;

                          if(results.length > 0) {

                            for (var i = 0; i < results.length; i++) {

                              // DATE - TIME IN SECONDS
                              var when = Math.floor(new Date().getTime() / 1000);

                              var randpicname = $scope.profile.user_real_id + '_' + when;

                              var namefilesplit = results[i].split('/');
                              var namefile = namefilesplit[namefilesplit.length-1];
                              var oldurlsplit = results[i].split(namefile);
                              var oldurl = oldurlsplit[0];
                              var topath = cordova.file.dataDirectory + $rootScope.inst_dir + '/' + randpicname + '.jpg';
                              var tourl = cordova.file.dataDirectory + $rootScope.inst_dir + '/';

                              $cordovaFile.copyFile(oldurl, namefile, tourl, randpicname + '.jpg').then(function(success) {

                                $scope.reviewSavePic(topath, randpicname);

                              }, function(er) {});
                              
                            }

                          }

                      }, function(error) {
                          $scope.selfieBtn = true;
                      });

              }

            }
            
          }, function(pererror) {
              $ionicLoading.hide().then(function() {});
              // alert('ERROR PERMISSION PLUGIN ==================================> '+JSON.stringify(pererror))
          })

        }, null);

      } else {
          $scope.connectionErr();
      }

  }

  // ЗАГРУЗКА СЕЛФИ
  $scope.reviewSavePic = function(imgpath, randpicname) {

      // Setup the loader
      $ionicLoading.show({
          content: '<ion-spinner icon="android" class="spinner-positive"></ion-spinner> <span>'+$scope.loadingpercent+'</span>',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 50,
          showDelay: 0
      });

      // UPLOADING SOUND
      var options = {
          fileKey: "file",
          fileName: randpicname + '.jpg',
          chunkedMode: false,
          mimeType: 'image/jpeg'
      }

      $cordovaFileTransfer.upload("http://www.olegtronics.com/admin/coms/upload.php?usrupl=1&preview=1&user_id=" + $scope.profile.user_real_id, imgpath, options).then(function(result) {
          
          var srtringify = JSON.stringify(result.response);
          var parsingres = JSON.parse(JSON.parse(srtringify));

          var messent = parsingres.user_upd;

          if(messent > 0) {

            $scope.reviewselected.pic = randpicname + '.jpg';
            $scope.reviewselected.snapshot = '<img src="http://www.olegtronics.com/admin/img/user/'+$scope.profile.user_institution+'/pic/'+$scope.reviewselected.pic+'" height="50" />';

          }

          $ionicLoading.hide().then(function() {});

      }, function(err) {

          $ionicLoading.hide().then(function() {
            $scope.connectionErr();
          });

      }, function (progress) {
          $scope.loadingpercent = Math.round((progress.loaded / progress.total) * 100) + ' %';
      });

  }

  $scope.sendReview = function() {
      
      $scope.reviewselected.ratingtxt += ' - ' + $scope.reviewselected.location;

      $http.post($rootScope.generalscript, JSON.stringify($scope.reviewselected)).then(function(e) {

          var data = e.data;

          // console.log('======================> YES: '+JSON.stringify(data))

          if(data[0].reviewOK == '0') {

          }
          else if(data[0].reviewOK == '1') {

              $scope.closeModal(2);
              $timeout(function() {$scope.alertPopup()}, 1000);

          }
          else if(data[0].reviewOK == '2') {
            var errPopup = $ionicPopup.alert({
              title: '<i class="icon ion-alert redtxt alerts" />',
              template: '<h3 class="hh3"><strong>'+$scope.gifts_get_ctrl_pop_tooften_tit+'</strong></h3><h4 class="hh4">'+$scope.gifts_get_ctrl_pop_tooften_temp+'</h4>',
              cssClass: 'gifterr',
              scope: $scope,
              buttons: [
                {
                  text: '<h3>'+$scope.conn_err_close+'</h3>',
                  type: 'button-full button-clear darkgreentxt',
                  onTap: function(e) {
                      errPopup.close();
                  }
                }
              ]
            });
          }

      }, function(er) {
          // console.log('======================> ERROR: '+JSON.stringify(er))
          $timeout(function() {
            $ionicHistory.nextViewOptions({
              disableAnimate: false,
              disableBack: true
            });
            $state.go('tab.card');
          }, 500);
      });
      
  }

  $scope.acceptStyle = function() {
      $scope.myStyle = {'background-repeat': 'no-repeat', 'background-position': 'center center', 'background-size': 'cover'};
  }

})

.controller('GroupsCtrl', function($scope, $state, $stateParams, $ionicHistory, Cart) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.$on('$ionicView.enter', function(){

    $scope.cartsum = Cart.sum();

  });

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

})

.controller('SharesCtrl', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $timeout, $cordovaSocialSharing, $cordovaInstagram, $cordovaCamera, $cordovaFile, $ionicPopup, $q, $translate, Cart, Profile, Share) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.$on('$ionicView.enter', function() {

    $translate(['share_txt_1', 'share_txt_1_1', 'share_txt_1_2', 'share_promo']).then(function(res) {
      $scope.share_txt_1 = res.share_txt_1;
      $scope.share_txt_1_1 = res.share_txt_1_1;
      $scope.share_txt_1_2 = res.share_txt_1_2;
      $scope.share_promo = res.share_promo;
    });

    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
      }, function() {});
    }

  });

  var permissions = cordova.plugins.permissions;
  
  var list = [
      permissions.READ_EXTERNAL_STORAGE,
      permissions.WRITE_EXTERNAL_STORAGE
  ];

  if($rootScope.platform == 'iOS') {$scope.applink = $rootScope.iosLink;} else if($rootScope.platform == 'Android') {$scope.applink = $rootScope.androidLink;}

  $scope.selfieBtn = true;

  $scope.socialSharing = function () {
      if($scope.selfieBtn) {
        $scope.selfieBtn = false;
        $cordovaSocialSharing.share($scope.share_txt_1+' "'+$rootScope.appName+'" '+$scope.share_txt_1_1+' '+$scope.profile.user_real_id, $rootScope.appName, $rootScope.companyicon, $scope.applink) // Share via native share sheet
          .then(function(result) {

              $scope.selfieBtn = true;
              Share.send('social');

          }, function(err) {
              $scope.selfieBtn = true;
          });
      }
  }

  $scope.shareTwitter = function() {
      if($scope.selfieBtn) {
        $scope.selfieBtn = false;
        $cordovaSocialSharing.shareViaTwitter($scope.share_txt_1+' "'+$rootScope.appName+'" '+$scope.share_txt_1_1+' '+$scope.profile.user_real_id, $scope.applink)
            .then(function(result) {
              $scope.selfieBtn = true;
              Share.send('twitter');
            }, function(err) {
                $scope.selfieBtn = true;
            });
      }
  }

  $scope.shareWhatsApp = function() {
      if($scope.selfieBtn) {
      $scope.selfieBtn = false;
      $cordovaSocialSharing.shareViaWhatsApp($scope.share_txt_1+' "'+$rootScope.appName+'" '+$scope.share_txt_1_1+' '+$scope.profile.user_real_id, $rootScope.companyicon, $scope.applink)
          .then(function(result) {
             
            $scope.selfieBtn = true;
            Share.send('social');

          }, function(err) {
              $scope.selfieBtn = true;
          });
      }
  }

  var buildImage = function() {
      var deferred = $q.defer();
      // create the canvas
      var canvas = document.createElement('canvas');
      canvas.width = 700;
      canvas.height = 220;
      var context = canvas.getContext('2d');
      // draw a rectangular white frame for our content
      context.beginPath();
      context.fillStyle = "white";
      context.rect(1, 1, 698, 218);
      context.fill();
      context.stroke();
      // draw some text, leaving space for the avatar image
      context.fillStyle = "black";
      context.font = "20px Arial";
      context.fillText($scope.share_txt_1+' "'+$rootScope.appName+'"', 220, 40, 450);
      context.font = "20px Arial";
      context.fillText($scope.share_txt_1_1, 220, 80, 450);
      context.font = "72px Arial";
      context.fillStyle = "red";
      context.fillText($scope.profile.user_real_id, 300, 170, 450);
      // draw avatar image on the left
      var avatar = new Image();
      avatar.onload = function() {
          context.drawImage(avatar, 10, 10, 200, 200);
          deferred.resolve(canvas);
      };
      avatar.src = "img/icon.png";
      return deferred.promise;
  };

  $scope.shareFacebook = function() {
      if($scope.selfieBtn) {

          $scope.selfieBtn = false;

          buildImage().then(function(canvas) {
              return $cordovaSocialSharing.share(null, null, canvas.toDataURL());
          })
          .then(function(result) {

              $scope.selfieBtn = true;
              Share.send('facebook');

          }, function(err) {
              $scope.selfieBtn = true;
          });

      }
  }

  $scope.shareSMS = function () {
      if($scope.selfieBtn) {
        $scope.selfieBtn = false;
        // access multiple numbers in a string like: '0612345678,0687654321'
        $cordovaSocialSharing.shareViaSMS($scope.share_txt_1+' "'+$rootScope.appName+'" '+$scope.share_txt_1_1+' '+$scope.profile.user_real_id, null)
            .then(function(result) {

                $scope.selfieBtn = true;
                Share.send('sms');

            }, function(err) {
                $scope.selfieBtn = true;
            });
      }
  }

  $scope.shareEmail = function() {
      if($scope.selfieBtn) {
      $scope.selfieBtn = false;
      // toArr, ccArr and bccArr must be an array, file can be either null, string or array
      $cordovaSocialSharing.shareViaEmail($scope.share_txt_1+' "'+$rootScope.appName+'" '+$scope.share_txt_1_1+' '+$scope.profile.user_real_id, $rootScope.appName, null, null, null, $rootScope.companyicon)
          .then(function(result) {

              $scope.selfieBtn = true;
              Share.send('email');

          }, function(err) {
              $scope.selfieBtn = true;
          });
      }
  }

	var optionsselfie = {
		quality: 70,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,
    allowEdit: false,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 700,
    targetHeight: 700,
    // popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false,
    correctOrientation:true
	};
	
	$scope.makeInstaPic = function() {

    permissions.hasPermission(list, function(persucc) {
      
      permissions.requestPermissions(list, function(status) {

        if(!status.hasPermission) {
            // alert('ERROR PERMISSION NOT GRANTED ==================================> ')
        }
        else {

          if($scope.selfieBtn) {

              $scope.selfieBtn = false;

              $cordovaCamera.getPicture(optionsselfie).then(function(imageData) {

                  $scope.selfieBtn = true;

                  var img = "data:image/jpeg;base64," + imageData;
                  $scope.shareInstagram(img);

              }, function(err) {
                  $scope.selfieBtn = true;
              });

          }

        }
        
      }, function(pererror) {
          $ionicLoading.hide().then(function() {});
          // alert('ERROR PERMISSION PLUGIN ==================================> '+JSON.stringify(pererror))
      })

    }, null);

	}
	
  $scope.shareInstagram = function(imageData) {
      $cordovaInstagram.share({image: imageData, caption: "#"+$rootScope.appName}).then(function(suc) {
        Share.send('instagram');
      }, function(err) {});
  }

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

})

.controller('PromoCtrl', function($scope, $state, $stateParams, $ionicHistory, Points, Cart, Profile) {

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.$on('$ionicView.enter', function(){

    $scope.cartsum = Cart.sum();

    if(Profile.check()) {
      $scope.profile = Profile.allold();
      if(Points.check()) {
        $scope.points = Points.get10Promoold();
      }
      else {
        Points.get10Promonew($scope.profile.user_real_id).then(function(odata) {
          $scope.points = odata;
        }, function() {});
      }
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
        if(Points.check()) {
          $scope.points = Points.get10Promoold();
        }
        else {
          Points.get10Promonew($scope.profile.user_real_id).then(function(odata) {
            $scope.points = odata;
          }, function() {});
        }
      }, function() {});
    }

  });

  $scope.recalc = function(sum) {
    return (sum/100).toFixed(2);
  }

})

.controller('OrderSummCtrl', function($scope, $state, $stateParams, $ionicHistory, $ionicPopup, $timeout, $translate, Bill, Profile) {

  $scope.$on('$ionicView.enter', function(){

    $translate(['order_summ_ctrl_pop_tit', 'order_summ_ctrl_pop_tmp', 'conn_err_close']).then(function(res) {
      $scope.order_summ_ctrl_pop_tit = res.order_summ_ctrl_pop_tit;
      $scope.order_summ_ctrl_pop_tmp = res.order_summ_ctrl_pop_tmp;
      $scope.conn_err_close = res.conn_err_close;
    });

    if(Profile.check()) {
      $scope.profile = Profile.allold();
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
      }, function() {});
    }

  });

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  $scope.realexpression = 0;
  $scope.expression = (0).toFixed(2);

  $scope.add = function(value) {
      if($scope.realexpression === "" || $scope.realexpression === undefined || $scope.realexpression === 0) {
          $scope.realexpression = value;
          $scope.expression = ($scope.realexpression / 100).toFixed(2);
      } else if($scope.realexpression.length === undefined || $scope.realexpression.length <= 7) {
          $scope.realexpression = $scope.realexpression + "" + value;
          $scope.expression = (parseInt($scope.realexpression) / 100).toFixed(2);
      }
  }

  $scope.removeText = function() {

      if($scope.realexpression != "" && $scope.realexpression != undefined && $scope.realexpression != 0 && $scope.realexpression.length != undefined) {

          if($scope.realexpression.length == 1) {
              $scope.realexpression = 0;
              $scope.expression = (0).toFixed(2);
          }
          else {
              $scope.realexpression = $scope.realexpression.slice(0, -1);
              $scope.expression = ($scope.realexpression / 100).toFixed(2);
          }
          
      } else {
          $scope.realexpression = 0;
          $scope.expression = (0).toFixed(2);
      }
  }

  $scope.calcbill = function() {

      if($scope.realexpression != "" && $scope.realexpression != undefined && $scope.realexpression != 0 && $scope.realexpression.length != undefined) {

          $scope.setPoints();

      }
      else {
        var errPopup = $ionicPopup.alert({
          title: '<i class="icon ion-alert redtxt alerts" />',
          template: '<h3 class="hh3"><strong>'+$scope.order_summ_ctrl_pop_tit+'</strong></h3><h4 class="hh4">'+$scope.order_summ_ctrl_pop_tmp+'</h4>',
          cssClass: 'gifterr',
          scope: $scope,
          buttons: [
            {
              text: '<h3>'+$scope.conn_err_close+'</h3>',
              type: 'button-full button-clear darkgreentxt',
              onTap: function(e) {
                  errPopup.close();
              }
            }
          ]
        });
      }

  }

  $scope.setPoints = function() {

      Bill.setbill($scope.realexpression, 'points&'+$scope.profile.user_device_id);

      $timeout(function() {$state.go('order-qr');}, 500);

  }

})

.controller('OrderQRCtrl', function($rootScope, $scope, $state, $stateParams, $ionicPopup, $ionicModal, $ionicActionSheet, $cordovaSQLite, $cordovaDevice, $timeout, $ionicLoading, $http, $cordovaNetwork, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaImagePicker, $ionicHistory, $translate, Inst, Bill, Profile, HtmlEnt) {

  $scope.$on('$ionicView.enter', function() {

    $translate(['conn_err_tit', 'conn_err_tmp', 'conn_err_close', 'order_qr_pop_thanks_tit', 'order_qr_pop_thanks_temp', 'order_qr_pop_thanks_btn1', 'order_qr_pop_review_tit', 'order_qr_pop_review_temp', 'order_qr_pop_review_btn1', 'order_qr_pop_review_btn2', 'order_qr_pop_tooften_tit', 'order_qr_pop_tooften_temp', 'order_qr_review_choise', 'order_qr_review_choose_pic', 'order_qr_review_make_pic', 'order_qr_review_take_pic', 'order_qr_review_cancel']).then(function(res) {
      $scope.conn_err_tit = res.conn_err_tit;
      $scope.conn_err_tmp = res.conn_err_tmp;
      $scope.conn_err_close = res.conn_err_close;
      $scope.order_qr_pop_thanks_tit = res.order_qr_pop_thanks_tit;
      $scope.order_qr_pop_thanks_temp = res.order_qr_pop_thanks_temp;
      $scope.order_qr_pop_thanks_btn1 = res.order_qr_pop_thanks_btn1;
      $scope.order_qr_pop_review_tit = res.order_qr_pop_review_tit;
      $scope.order_qr_pop_review_temp = res.order_qr_pop_review_temp;
      $scope.order_qr_pop_review_btn1 = res.order_qr_pop_review_btn1;
      $scope.order_qr_pop_review_btn2 = res.order_qr_pop_review_btn2;
      $scope.order_qr_pop_tooften_tit = res.order_qr_pop_tooften_tit;
      $scope.order_qr_pop_tooften_temp = res.order_qr_pop_tooften_temp;
      $scope.order_qr_review_choise = res.order_qr_review_choise;
      $scope.order_qr_review_choose_pic = res.order_qr_review_choose_pic;
      $scope.order_qr_review_make_pic = res.order_qr_review_make_pic;
      $scope.order_qr_review_take_pic = res.order_qr_review_take_pic;
      $scope.order_qr_review_cancel = res.order_qr_review_cancel;

      $scope.reviewselected = {
        device_id: $rootScope.uuid,
        inst_id: $rootScope.institution,
        location: $scope.order_qr_review_choise,
        rating: 5,
        snapshot: '<span>'+$scope.order_qr_review_choose_pic+'</span>',
        pic: '',
        ratingtxt: '',
        newusr: 'rate'
      }

    });

    if(Profile.check()) {
      $scope.profile = Profile.allold();
    }
    else {
      Profile.allnew().then(function(data) {
        $scope.profile = data;
      }, function() {});
    }

  });

  $scope.connectionErr = function() {
    var errPopup = $ionicPopup.alert({
      title: '<i class="icon ion-alert redtxt alerts" />',
      template: '<h3 class="hh3"><strong>'+$scope.conn_err_tit+'</strong></h3><h4 class="hh4">'+$scope.conn_err_tmp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.conn_err_close+'</h3>',
          type: 'button-full button-clear darkgreentxt',
          onTap: function(e) {
              errPopup.close();
          }
        }
      ]
    });
  }

  $scope.htmlEntities = function(toencode) {
    return HtmlEnt.decodeEntities(toencode);
  }

  $scope.goback = function() {
    $ionicHistory.goBack();
  }

  var permissions = cordova.plugins.permissions;
  
  var list = [
      permissions.READ_EXTERNAL_STORAGE,
      permissions.WRITE_EXTERNAL_STORAGE
  ];

  $scope.qrcodeString = Bill.getbill();
  $scope.size = 150;
  $scope.correctionLevel = '';
  $scope.typeNumber = 0;
  $scope.inputMode = '';
  $scope.image = false;

  $scope.billsum = (Bill.getsum()/100).toFixed(2);

  $scope.calculated = 0;

  $scope.ratingmax = 5;

  var myPopup;

  $ionicModal.fromTemplateUrl('templates/modal-bonus.html', {
    id: '1',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalBonus = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-review.html', {
    id: '2',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalReview = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-contact.html', {
    id: '3',
    scope: $scope,
    backdropClickToClose: false,
    hardwareBackButtonClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.oModalContact = modal;
  });

  $scope.openModal = function(index) {
    if (index == 1) {$scope.oModalBonus.show();}
    else if(index == 2) {$scope.oModalReview.show();}
    else if(index == 3) {$scope.oModalContact.show();}
  };

  $scope.closeModal = function(index) {
    if (index == 1) {$scope.oModalBonus.hide();}
    else if(index == 2) {$scope.oModalReview.hide();}
    else if(index == 3) {$scope.oModalContact.hide();}
  };

  $scope.$on('modal.shown', function(event, modal) {
    if(modal.id == 3 && $scope.calculated == 0) {

      var today = new Date();
      var onlHour;
      var onlMin;
      
      if(today.getHours() < 10) {
          onlHour = '0' + today.getHours();
      } else {
          onlHour = today.getHours();
      }
      if(today.getMinutes() < 10) {
          onlMin = '0' + today.getMinutes();
      } else {
          onlMin = today.getMinutes();
      }
      var hourmins =  onlHour.toString() +''+ onlMin.toString();

      function inststart() {
        if($scope.institutions.length > 0) {
          for(var x=0;x<$scope.institutions.length;x++) {

            var inst = $scope.institutions[x];
            
            var opncls = ' (закрыто)';
            var opnclsnum = 0;
            var indicat = '<span class="indicatclose"></span>';
            var worktime = '';
            var todayday = today.getDay()-1;
                todayday = inst.office_bus_hours[todayday];

            if(todayday > 0) {

              if(todayday.substr(0,4) > todayday.substr(4,8)) {
                if(todayday.substr(0,4) <= hourmins && hourmins <= 2359) {
                  // open
                  opncls = ' (открыто)';
                  opnclsnum = 1;
                  indicat = '<span class="indicatopen"></span>';
                }
                else if(hourmins >= 0000 && hourmins <= todayday.substr(4,8)) {
                  // open
                  opncls = ' (открыто)';
                  opnclsnum = 1;
                  indicat = '<span class="indicatopen"></span>';
                }
              }
              else if(todayday.substr(0,4) == todayday.substr(4,8)) {
                // open
                opncls = ' (открыто)';
                opnclsnum = 1;
                indicat = '<span class="indicatopen"></span>';
              }
              else if(todayday.substr(0,4) < todayday.substr(4,8)) {
                if(todayday.substr(0,4) <= hourmins && hourmins <= todayday.substr(4,8)) {
                  // open
                  opncls = ' (открыто)';
                  opnclsnum = 1;
                  indicat = '<span class="indicatopen"></span>';
                }
              }

              worktime += todayday.substr(0, 2)+':'+todayday.substr(2, 2);
              worktime += ' - '+todayday.substr(4, 2)+':'+todayday.substr(6, 2);

            }

            Inst.setworktime(inst.office_id, worktime);
            Inst.setopncls(inst.office_id, opnclsnum);

          }
        }
      }

      if(Inst.check()) {
        $scope.institutions = Inst.getinstold();
        inststart();
      }
      else {
        Inst.getinstnew().then(function(data) {
          $scope.institutions = data;
          inststart();
        }, function() {});
      }

      $scope.calculated = 1;

    }
  });

  $scope.$on('modal.hidden', function(event, modal) {

  });

  $scope.$on('$destroy', function() {
    $scope.oModalBonus.remove();
    $scope.oModalReview.remove();
    $scope.oModalContact.remove();
  });

  $scope.takeInst = function(institution) {
    $scope.reviewselected.location = institution.office_adress;
    $scope.closeModal(3);
  }

  $scope.showImageMaker = function() {

    $ionicActionSheet.show({
      buttons: [
        { text: '<span class="darkgreentxt">'+$scope.order_qr_review_make_pic+'</span>' },
        { text: '<span class="darkgreentxt">'+$scope.order_qr_review_take_pic+'</span>' }
      ],
      cancelText: '<b class="darkgreentxt">'+$scope.order_qr_review_cancel+'</b>',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        if(index == 0) {
          $scope.reviewSelfie();
        }
        else if(index == 1) {
          $scope.reviewSelPic();
        }
        return true;
      }
    });

  }

  $scope.alertPopup = function() {
    myPopup = $ionicPopup.alert({
      title: '<img style="margin:10px;" src="img/signs/heartbubble.png" width="40%" />',
      template: '<h3 class="hh3"><strong>'+$scope.order_qr_pop_thanks_tit+'!</strong></h3><h4 class="hh4">'+$scope.order_qr_pop_thanks_temp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.order_qr_pop_thanks_btn1+'</h3>',
          type: 'button-full button-clear darkgreentxt',
          onTap: function(e) {
              myPopup.close();
              $timeout(function() {
                $ionicHistory.nextViewOptions({
                  disableAnimate: false,
                  disableBack: true
                });
                $state.go('tab.card');
              }, 500);
          }
        }
      ]
    });
  }

  $scope.popupClose = function() {
    myPopup.close();
  }

  $scope.notSendReview = function() {
    $scope.closeModal(2);
    $timeout(function() {
      $ionicHistory.nextViewOptions({
        disableAnimate: false,
        disableBack: true
      });
      $state.go('tab.card');
    }, 500);
  }

  $scope.reviewAsk = function() {
    $ionicHistory.nextViewOptions({
      disableAnimate: false,
      disableBack: true
    });
    var alertPopup = $ionicPopup.alert({
      title: '<img style="margin:10px;" src="img/signs/pig.png" width="40%" />',
      template: '<h3 class="hh3"><strong>'+$scope.order_qr_pop_review_tit+'</strong></h3><h4 class="hh4">'+$scope.order_qr_pop_review_temp+'</h4>',
      cssClass: 'gifterr',
      scope: $scope,
      buttons: [
        {
          text: '<h3>'+$scope.order_qr_pop_review_btn1+'</h3>',
          type: 'button-full button-clear',
          onTap: function(e) {
            alertPopup.close();
            $timeout(function() {
              $scope.openModal(2);
            }, 1000);
          }
        },
        {
          text: '<h3>'+$scope.order_qr_pop_review_btn2+'</h3>',
          type: 'button-full button-clear',
          onTap: function(e) {
              alertPopup.close();
              $timeout(function() {
                $state.go('tab.card');
              }, 500);
          }
        }
      ]
    });
  }

  // НАСТРОЙКИ СЕЛФИ
  var optionsselfie = {
      quality: 70,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      targetWidth: 700,
      targetHeight: 700,
      correctOrientation: true
  };

  // НАСТРОЙКИ ВЫБОРА ФОТО
  var optionsImg = {
    maximumImagesCount: 1,
    width: 800,
    height: 800,
    quality: 80
  };

  $scope.loadingpercent = 0;

  $scope.selfieBtn = true;
  
  // СДЕЛАТЬ СЕЛФИ
  $scope.reviewSelfie = function() {

      if($cordovaNetwork.isOnline()) {

        permissions.hasPermission(list, function(persucc) {
          
          permissions.requestPermissions(list, function(status) {
    
            if(!status.hasPermission) {
                // alert('ERROR PERMISSION NOT GRANTED ==================================> ')
            }
            else {

              if($scope.selfieBtn) {

                  $scope.selfieBtn = false;
                  
                  $scope.picPrev = 1;

                  $cordovaCamera.getPicture(optionsselfie).then(function(imageURI) {

                      // DATE - TIME IN SECONDS
                      var when = Math.floor(new Date().getTime() / 1000);

                      var randpicname = $scope.profile.user_real_id + '_' + when;

                      var namefilesplit = imageURI.split('/');
                      var namefile = namefilesplit[namefilesplit.length-1];
                      var oldurlsplit = imageURI.split(namefile);
                      var oldurl = oldurlsplit[0];
                      var topath = cordova.file.dataDirectory + $rootScope.inst_dir + '/' + randpicname + '.jpg';
                      var tourl = cordova.file.dataDirectory + $rootScope.inst_dir + '/';

                      $cordovaFile.moveFile(oldurl, namefile, tourl, randpicname + '.jpg').then(function(success) {
                          // console.log("OK ==============================> "+JSON.stringify(success))
                          $scope.reviewSavePic(topath, randpicname);

                      }, function(er) {
                          // console.log("ERROR ==============================> "+JSON.stringify(er))
                      });


                  }, function(err) {
                      $scope.selfieBtn = true;
                  });

              }

            }
            
          }, function(pererror) {
              $ionicLoading.hide().then(function() {});
              // alert('ERROR PERMISSION PLUGIN ==================================> '+JSON.stringify(pererror))
          })

        }, null);

      }
      else {
        $scope.connectionErr();
      }
  }

  // ВЫБРАТЬ ФОТО
  $scope.reviewSelPic = function() {

      if($cordovaNetwork.isOnline()) {

        permissions.hasPermission(list, function(persucc) {
          
          permissions.requestPermissions(list, function(status) {
    
            if(!status.hasPermission) {
                // alert('ERROR PERMISSION NOT GRANTED ==================================> ')
            }
            else {

              if($scope.selfieBtn) {

                  $scope.selfieBtn = false;

                    $cordovaImagePicker.getPictures(optionsImg)
                      .then(function (results) {

                          $scope.selfieBtn = true;

                          if(results.length > 0) {

                            for (var i = 0; i < results.length; i++) {

                              // DATE - TIME IN SECONDS
                              var when = Math.floor(new Date().getTime() / 1000);

                              var randpicname = $scope.profile.user_real_id + '_' + when;

                              var namefilesplit = results[i].split('/');
                              var namefile = namefilesplit[namefilesplit.length-1];
                              var oldurlsplit = results[i].split(namefile);
                              var oldurl = oldurlsplit[0];
                              var topath = cordova.file.dataDirectory + $rootScope.inst_dir + '/' + randpicname + '.jpg';
                              var tourl = cordova.file.dataDirectory + $rootScope.inst_dir + '/';

                              $cordovaFile.copyFile(oldurl, namefile, tourl, randpicname + '.jpg').then(function(success) {

                                $scope.reviewSavePic(topath, randpicname);

                              }, function(er) {});
                              
                            }

                          }

                      }, function(error) {
                          $scope.selfieBtn = true;
                      });

              }

            }
            
          }, function(pererror) {
              $ionicLoading.hide().then(function() {});
              // alert('ERROR PERMISSION PLUGIN ==================================> '+JSON.stringify(pererror))
          })

        }, null);

      } else {
          $scope.connectionErr();
      }

  }

  // ЗАГРУЗКА СЕЛФИ
  $scope.reviewSavePic = function(imgpath, randpicname) {

      // Setup the loader
      $ionicLoading.show({
          content: '<ion-spinner icon="android" class="spinner-positive"></ion-spinner> <span>'+$scope.loadingpercent+'</span>',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 50,
          showDelay: 0
      });

      // UPLOADING SOUND
      var options = {
          fileKey: "file",
          fileName: randpicname + '.jpg',
          chunkedMode: false,
          mimeType: 'image/jpeg'
      }

      $cordovaFileTransfer.upload("http://www.olegtronics.com/admin/coms/upload.php?usrupl=1&preview=1&user_id=" + $scope.profile.user_real_id, imgpath, options).then(function(result) {
          
          var srtringify = JSON.stringify(result.response);
          var parsingres = JSON.parse(JSON.parse(srtringify));

          var messent = parsingres.user_upd;

          if(messent > 0) {

            $scope.reviewselected.pic = randpicname + '.jpg';
            $scope.reviewselected.snapshot = '<img src="http://www.olegtronics.com/admin/img/user/'+$scope.profile.user_institution+'/pic/'+$scope.reviewselected.pic+'" height="50" />';

          }

          $ionicLoading.hide().then(function() {});

      }, function(err) {

          $ionicLoading.hide().then(function() {
            $scope.connectionErr();
          });

      }, function (progress) {
          $scope.loadingpercent = Math.round((progress.loaded / progress.total) * 100) + ' %';
      });

  }

  $scope.sendReview = function() {
      
      $scope.reviewselected.ratingtxt += ' - ' + $scope.reviewselected.location;

      $http.post($rootScope.generalscript, JSON.stringify($scope.reviewselected)).then(function(e) {

          var data = e.data;

          // console.log('======================> YES: '+JSON.stringify(data))

          if(data[0].reviewOK == '0') {

          }
          else if(data[0].reviewOK == '1') {

              $scope.closeModal(2);
              $timeout(function() {$scope.alertPopup()}, 1000);

          }
          else if(data[0].reviewOK == '2') {
            var errPopup = $ionicPopup.alert({
              title: '<i class="icon ion-alert redtxt alerts" />',
              template: '<h3 class="hh3"><strong>'+$scope.order_qr_pop_tooften_tit+'</strong></h3><h4 class="hh4">'+$scope.order_qr_pop_tooften_temp+'</h4>',
              cssClass: 'gifterr',
              scope: $scope,
              buttons: [
                {
                  text: '<h3>'+$scope.conn_err_close+'</h3>',
                  type: 'button-full button-clear darkgreentxt',
                  onTap: function(e) {
                      errPopup.close();
                  }
                }
              ]
            });
          }

      }, function(er) {
          // console.log('======================> ERROR: '+JSON.stringify(er))
          $timeout(function() {
            $ionicHistory.nextViewOptions({
              disableAnimate: false,
              disableBack: true
            });
            $state.go('tab.card');
          }, 500);
      });
      
  }

})

;