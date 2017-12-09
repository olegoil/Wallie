angular.module('starter.services', [])

.factory('Survey', function($rootScope, $cordovaSQLite, $http) {

  function sendAnsw(item, answer) {
    // console.log(item + ' ' + answer);
    // var asksUpd = "UPDATE asks SET asks_reply=? WHERE asks_id=?";
    // $cordovaSQLite.execute($rootScope.db, asksUpd, [answer, item]).then(function() {}, function(er) {});

    $http.post('http://www.olegtronics.com/appscripts/getappdata.php', JSON.stringify({device: $rootScope.model, device_id: $rootScope.uuid, device_version: $rootScope.version,device_os: $rootScope.platform, inst_id: $rootScope.institution, newusr:'asks', asks_id: item, asks_answ: answer, asks_vers: 2})).then(function(f) {

        var asksreq = f.data[0];
        if(asksreq.asksOK == 1) {
          var asksUpd = "UPDATE asks SET asks_reply=?, asks_active='1' WHERE asks_id=?";
          $cordovaSQLite.execute($rootScope.db, asksUpd, ['reply: '+answer, item]).then(function() {}, function(er) {});
        }
        asksreq.asksOK;

    }, function(er) {});

  }

  var quests = [];

  return {
    check: function() {
      quests = [];

      function questsPush(x) {
        if(x.asks_type == '0') {
          var answsplit = x.asks_answ.split(',');
          var answarr = [];
          for(var a=0;a<answsplit.length;a++) {
            answarr.push(answsplit[a]);
          }
          x.asks_answ = answarr;
          quests.push(x);
        }
        else {
          quests.push(x);
        }
        // console.log('=======================> '+x.asks_id)
          return quests;
      }

      var queryQuests = "SELECT * FROM asks WHERE asks_reply = ? AND asks_active='0' AND asks_del = '0' ORDER BY asks_id DESC, asks_chained ASC";
      return $cordovaSQLite.execute($rootScope.db, queryQuests, ['0']).then(function(suc) {
        // console.log('=======================> '+suc.rows.length)
          if(suc.rows.length > 0) {
            var ischained = 0;
            var istaken = 0;
            for(var i=0;i<suc.rows.length;i++) {
              // console.log('=======================> '+JSON.stringify(suc.rows.item(i).asks_id))
              if(suc.rows.item(i).asks_del == '0' && suc.rows.item(i).asks_active == '0') {
                if((suc.rows.item(i).asks_chained != '0' && istaken == '0') || (ischained != '0' && istaken == '0')) {

                  if(suc.rows.item(i).asks_chained != '0' && ischained == '0') {
                    ischained = suc.rows.item(i).asks_chained;
                    questsPush(suc.rows.item(i));
                  }
                  else if(ischained == suc.rows.item(i).asks_chained) {
                    questsPush(suc.rows.item(i));
                  }

                }
                else if(istaken == '0' && ischained == '0') {

                  istaken = 1;
                  if(suc.rows.item(i).asks_type == '0') {
                    questsPush(suc.rows.item(i));
                  }

                }
              }
            }
            return quests;
          }
          else {
            return quests;
          }
      }, function() {});
    },
    answer: function(questionId, answer) {

      var answers = {
        device: $rootScope.model,
        device_id: $rootScope.uuid,
        device_version: $rootScope.version,
        device_os: $rootScope.platform,
        inst_id: $rootScope.institution,
        newusr:'asks',
        asks_id: questionId,
        asks_answ: answer,
        asks_vers: 2
      }

      // var answerstr = JSON.stringify(answers);

      // alert(Object.keys(answers.asks_answ).length + ' | ' + answerstr + ' | ' + JSON.stringify(answers.asks_answ))
      
      if(Object.keys(answers.asks_answ).length > 0) {
        Object.keys(answers.asks_answ).forEach(function(item, index) {

          sendAnsw(item, answers.asks_answ[item]);

        });
      }
      
    }
  };

})

.factory('MenuCats', function($rootScope, $cordovaSQLite) {

  var cats = [];

  return {
    check: function() {
      if(cats.length == 0) {return false;} else {return true;}
    },
    all: function() {
      return cats;
    },
    get: function(catId) {
      for (var i = 0; i < cats.length; i++) {
        if (cats[i].cat_id === parseInt(catId)) {
          return cats[i];
        }
      }
      return null;
    },
    getcatsnew: function() {
      cats = [];
      var queryCatSel = "SELECT * FROM categories WHERE cat_del = ?";
      return $cordovaSQLite.execute($rootScope.db, queryCatSel, ['0']).then(function(suc) {
        if(suc.rows.length > 0) {
          for(var i=0;i<suc.rows.length;i++) {
            cats.push(suc.rows.item(i));
          }
          return cats;
        }
        else {
          return cats;
        }
      }, function(er) {});
    },
    getcatsold: function() {
      return cats;
    }
  };
})

.factory('Menu', function($rootScope, $cordovaSQLite) {

  var menu = [];

  return {
    check: function() {
      if(menu.length == 0) {return false;} else {return true;}
    },
    all: function() {
      return menu;
    },
    get: function(menuId) {
      for (var i = 0; i < menu.length; i++) {
        if (menu[i].menue_id === parseInt(menuId)) {
          return menu[i];
        }
      }
      return null;
    },
    getmenunew: function(catid) {
      menu = [];
      var queryMenuSel = "SELECT * FROM menue WHERE menue_cat = ? AND menue_del = '0'";
      return $cordovaSQLite.execute($rootScope.db, queryMenuSel, [catid]).then(function(suc) {
        if(suc.rows.length > 0) {
          for(var i=0;i<suc.rows.length;i++) {
            menu.push(suc.rows.item(i));
          }
          return menu;
        }
        else {
          return menu;
        }
      }, function(er) {});
    }
  };
})

.factory('Cart', function() {

  var carts = [];

  return {
    all: function() {
      return carts;
    },
    remove: function(cartId) {
      carts.splice(carts.indexOf(cartId), 1);
    },
    removeAll: function() {
      carts = [];
    },
    get: function(cart) {
      if(carts.length > 0) {
        for (var i = 0; i < carts.length; i++) {
          if (carts[i].menue_id === parseInt(cart.menue_id)) {
            return carts[i];
          }
          else if(carts[i].menue_id != parseInt(cart.menue_id) && i == carts.length - 1) {
            return {amount: 0};
          }
        }
      }
      else {
        return {amount: 0};
      }
    },
    add: function(cartItem) {
      if(carts.length > 0) {
        for (var i = 0; i < carts.length; i++) {
          if (carts[i].menue_id === parseInt(cartItem.menue_id)) {
            carts[i].amount = carts[i].amount + 1;
            break;
          }
          else if(carts[i].menue_id != parseInt(cartItem.menue_id) && i == carts.length-1) {
            cartItem.amount = 1;
            carts.push(cartItem);
            break;
          }
        }
      }
      else {
        cartItem.amount = 1;
        carts.push(cartItem);
      }
    },
    sub: function(cartItem) {
      if(carts.length > 0) {
        for (var i = 0; i < carts.length; i++) {
          if (carts[i].menue_id === parseInt(cartItem.menue_id) && carts[i].amount > 1) {
            carts[i].amount = carts[i].amount - 1;
            break;
          }
          else if(carts[i].menue_id === parseInt(cartItem.menue_id) && carts[i].amount == 1) {
            carts.splice(i, 1);
            break;
          }
        }
      }
    },
    sum: function() {
      var sum = 0;
      for (var i = 0; i < carts.length; i++) {
        sum += carts[i].menue_cost * carts[i].amount;
      }
      return sum;
    }
  };
  
})

.factory('Gifts', function($rootScope, $cordovaSQLite) {

  var gifts = [];

  return {
    check: function() {
      if(gifts.length == 0) {return false;} else {return true;}
    },
    all: function() {
      return gifts;
    },
    get: function(giftId) {
      for (var i = 0; i < gifts.length; i++) {
        if (gifts[i].gifts_id === parseInt(giftId)) {
          return gifts[i];
        }
      }
      return null;
    },
    getgiftnew: function() {
      gifts = [];
      var queryGiftSel = "SELECT * FROM gifts WHERE gifts_del = ?";
      return $cordovaSQLite.execute($rootScope.db, queryGiftSel, ['0']).then(function(suc) {
        if(suc.rows.length > 0) {
          for(var i=0;i<suc.rows.length;i++) {
            gifts.push(suc.rows.item(i));
          }
          return gifts;
        }
        else {
          return gifts;
        }
      }, function(er) {});
    },
    getgiftold: function() {
      return gifts;
    }
  };
})

.factory('News', function($rootScope, $cordovaSQLite) {

  var news = [];
  var firstgift = [];
  var menus = [];
  var points = [];

  return {
    get: function(newsId) {
      for (var i = 0; i < news.length; i++) {
        if (news[i].news_id === parseInt(newsId)) {
          return news[i];
        }
      }
      return null;
    },
    getnewsnew: function() {
      news = [];
      var queryNewsSel = "SELECT * FROM news WHERE news_state = ? AND news_del = '0'";
      return $cordovaSQLite.execute($rootScope.db, queryNewsSel, ['1']).then(function(suc) {
        if(suc.rows.length > 0) {
          for(var i=0;i<suc.rows.length;i++) {

            if(points.length > 0) {
              for(var a=0;a<points.length;a++) {
                if(points[a].points_check != suc.rows.item(i).news_menue_id) {
                  news.push(suc.rows.item(i));
                  break;
                }
              }
            }
            else {
              news.push(suc.rows.item(i));
            }

          }
          return news;
        }
        else {
          return news;
        }
      }, function(er) {});
    },
    firstgift: function() {
      firstgift = [];
      var queryFirstGifts = "SELECT * FROM gifts WHERE gifts_id != ? AND gifts_when = '2' AND gifts_del = '0' LIMIT 1";
      return $cordovaSQLite.execute($rootScope.db, queryFirstGifts, [0]).then(function(suc) {
          if(suc.rows.length > 0) {
            firstgift.push(suc.rows.item(0));
            return firstgift;
          }
          else {
            return firstgift;
          }
      }, function() {});
    },
    loadspecial: function() {
      menus = [];
      function getMenu(cats_id) {
        var queryMenuSel = "SELECT * FROM menue WHERE menue_cat = ? AND menue_del = '0'";
        return $cordovaSQLite.execute($rootScope.db, queryMenuSel, [parseInt(cats_id)]).then(function(suc) {
          if(suc.rows.length > 0) {
            for(var x=0;x<suc.rows.length;x++) {
              menus.push(suc.rows.item(x));
            }
          }
        }, function(er) {});
      }
      function getCats(goods_id) {
        var queryCatsSel = "SELECT * FROM categories WHERE cat_ingr = ? AND cat_del = '0'";
        return $cordovaSQLite.execute($rootScope.db, queryCatsSel, [parseInt(goods_id)]).then(function(suc) {
          if(suc.rows.length > 0) {
            for(var x=0;x<suc.rows.length;x++) {
              getMenu(suc.rows.item(x).cat_id);
            }
          }
        }, function(er) {});
      }
      var queryGoodsSel = "SELECT * FROM goods WHERE goods_type = '4' AND goods_del = '0'";
      return $cordovaSQLite.execute($rootScope.db, queryGoodsSel, []).then(function(suc) {
        if(suc.rows.length > 0) {
          for(var x=0;x<suc.rows.length;x++) {
            getCats(suc.rows.item(x).goods_id);
          }
        }
      }, function(er) {});
    },
    getspecial: function(menuId) {
      var menue = [];
      for(var i=0;i<menus.length;i++) {
        if(menus[i].menue_id == menuId) {
          menue.push(menus[i]);
        }
      }
      return menue;
    },
    getgotgifts: function(myid) {
      points = [];
      var queryPoints = "SELECT * FROM points WHERE points_user = ? AND points_comment = '12' AND points_del = '0' ORDER BY points_id DESC";
      return $cordovaSQLite.execute($rootScope.db, queryPoints, [myid]).then(function(suc) {
        if(suc.rows.length > 0) {
          for(var i=0;i<suc.rows.length;i++) {
            points.push(suc.rows.item(i));
          }
          return points;
        }
        else {
          return points;
        }
      }, function() {});
    }
  };
})

.factory('Inst', function($rootScope, $cordovaSQLite) {

  var mylocation = [];
  var inst = [];

  return {
    check: function() {
      if(inst.length == 0) {return false;} else {return true;}
    },
    getinstnew: function() {
      inst = [];
      var queryOfficeSel = "SELECT * FROM organizations_office WHERE office_del = '0'";
      return $cordovaSQLite.execute($rootScope.db, queryOfficeSel, []).then(function(suc) {
        if(suc.rows.length > 0) {
          for(var i=0;i<suc.rows.length;i++) {

            if(suc.rows.item(i).office_bus_hours != '0') {
              var obhsplit = suc.rows.item(i).office_bus_hours.split(',');
              var obharr = [];
              for(var a=0;a<obhsplit.length;a++) {
                obharr.push(obhsplit[a]);
              }
              suc.rows.item(i).office_bus_hours = obharr;
            }
            if(suc.rows.item(i).office_tel != '0') {
              var otelsplit = suc.rows.item(i).office_tel.split(',');
              var otelarr = [];
              for(var a=0;a<otelsplit.length;a++) {
                otelarr.push(otelsplit[a]);
              }
              suc.rows.item(i).office_tel = otelarr;
            }
            if(suc.rows.item(i).office_tel_n != '0') {
              var otelnsplit = suc.rows.item(i).office_tel_n.split(',');
              var otelnarr = [];
              for(var a=0;a<otelnsplit.length;a++) {
                otelnarr.push(otelnsplit[a]);
              }
              suc.rows.item(i).office_tel_n = otelnarr;
            }
            inst.push(suc.rows.item(i));

          }
          return inst;
        }
        else {
          return inst;
        }
      }, function(er) {});
    },
    getinstold: function() {
      return inst;
    },
    get: function(instId) {
      for (var i = 0; i < inst.length; i++) {
        if (inst[i].office_id === parseInt(instId)) {
          return inst[i];
        }
      }
      return null;
    },
    setloc: function(myloc) {
      mylocation = myloc;
    },
    getloc: function() {
      return mylocation;
    },
    setdistance: function(id, dist) {
      for (var i in inst) {
        if (inst[i].office_id == id) {
            inst[i].distance = dist;
            break;
        }
      }
    },
    setworktime: function(id, worktime) {
      for (var i in inst) {
        if (inst[i].office_id == id) {
            inst[i].worktime = worktime;
            break;
        }
      }
    },
    setworktimes: function(id, worktimes) {
      for (var i in inst) {
        if (inst[i].office_id == id) {
            inst[i].worktimes = worktimes;
            break;
        }
      }
    },
    setopncls: function(id, opnclsnum) {
      for (var i in inst) {
        if (inst[i].office_id == id) {
            inst[i].opncls = opnclsnum;
            break;
        }
      }
    }
  };
})

.factory('FAQ', function($rootScope, $cordovaSQLite, $http, $timeout, $ionicScrollDelegate) {

  var themes = [];

  var faq = [];

  var chats = [];

  var chathello = '';

  return {
    allthemes: function() {
      return themes;
    },
    allfaq: function() {
      return faq;
    },
    getfaq: function(faqId) {
      var faqarr = [];
      for (var i = 0; i < faq.length; i++) {
        if (faq[i].theme === parseInt(faqId)) {
          faqarr.push(faq[i]);
        }
      }
      return faqarr;
    },
    allchat: function(profile) {
      chats = [
        {
          chat_id: 0,
          chat_from: 1,
          chat_to: profile.user_real_id,
          chat_name: 'support',
          chat_message: chathello,
          chat_read: 0,
          chat_institution: $rootScope.institution,
          chat_answered: 0,
          chat_when: 0,
          chat_del: 0
        }
      ];
      chats.lastchat = 1;
      var queryChat = "SELECT * FROM chat ORDER BY chat_id ASC";
      return $cordovaSQLite.execute($rootScope.db, queryChat, []).then(function(suc) {
          if(suc.rows.length > 0) {
              for(var i=0;i<suc.rows.length;i++) {
                chats.lastchat = suc.rows.item(i).chat_when;
                chats.push(suc.rows.item(i));
              }
              return chats;
          }
          else {
            return chats;
          }
      }, function() {});
    },
    checkchat: function(lastchat) {
      var checkstr = {
        device: $rootScope.model,
        device_id: $rootScope.uuid,
        device_version: $rootScope.version,
        device_os: $rootScope.platform,
        inst_id: $rootScope.institution,
        getsend: 'get',
        lastchat: lastchat,
        newusr: 'chat'
      }
      checkstr = JSON.stringify(checkstr);
      return $http.post($rootScope.generalscript, checkstr).then(function(suc) {
        var data = suc.data;
        if(data) {
          if(data[0].chatOK) {
            if(data[0].chatOK == '1') {

                var chatArr = data[0].chatArr;
                if(chatArr.length > 0) {

                    var id = 0;
                    function chatArrFunc(id) {

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

                            chats.push({
                              chat_id: chat_id,
                              chat_from: chat_from,
                              chat_to: chat_to,
                              chat_name: chat_name,
                              chat_message: chat_message,
                              chat_read: chat_read,
                              chat_institution: chat_institution,
                              chat_answered: chat_answered,
                              chat_when: chat_when,
                              chat_del: chat_del
                            });
                            chats.lastchat = chat_when;

                            id++;
                            if(id < chatArr.length) {
                              chatArrFunc(id);
                            }
                          }, function() {});
                        }
                        else {
                          var chatIns = "INSERT INTO chat (chat_id, chat_from, chat_to, chat_name, chat_message, chat_read, chat_institution, chat_answered, chat_when, chat_del) VALUES (?,?,?,?,?,?,?,?,?,?)";
                          $cordovaSQLite.execute($rootScope.db, chatIns, [chat_id, chat_from, chat_to, chat_name, chat_message, chat_read, chat_institution, chat_answered, chat_when, chat_del]).then(function() {

                                chats.push({
                                  chat_id: chat_id,
                                  chat_from: chat_from,
                                  chat_to: chat_to,
                                  chat_name: chat_name,
                                  chat_message: chat_message,
                                  chat_read: chat_read,
                                  chat_institution: chat_institution,
                                  chat_answered: chat_answered,
                                  chat_when: chat_when,
                                  chat_del: chat_del
                                });
                                chats.lastchat = chat_when;
                                $timeout(function() {$ionicScrollDelegate.scrollBottom(true);}, 200);

                            id++;
                            if(id < chatArr.length) {
                              chatArrFunc(id);
                            }
                          }, function() {});

                        }

                      }, function() {});

                    }
                    $timeout(function() {chatArrFunc(0);}, 200);
                    return 1;

                }

            }
          }
        }

      }, function(er) {
        return 0;
      });
    },
    sendchat: function(profile, message) {
      var sendstr = {
        device: $rootScope.model,
        device_id: $rootScope.uuid,
        device_version: $rootScope.version,
        device_os: $rootScope.platform,
        inst_id: $rootScope.institution,
        getsend: 'send',
        name: 'support',
        txt: message,
        newusr: 'chat'
      }
      sendstr = JSON.stringify(sendstr);
      return $http.post($rootScope.generalscript, sendstr).then(function(suc) {
        var data = suc.data;
        if(data[0].chatOK > '1') {

          var chatIns = "INSERT INTO chat (chat_id, chat_from, chat_to, chat_name, chat_message, chat_read, chat_institution, chat_answered, chat_when, chat_del) VALUES (?,?,?,?,?,?,?,?,?,?)";
          $cordovaSQLite.execute($rootScope.db, chatIns, [data[0].chatID, profile.user_real_id, '1', 'support', message, '0', $rootScope.institution, '0', data[0].chatOK, '0']).then(function() {

            chats.push({
              chat_id: data[0].chatID,
              chat_from: profile.user_real_id,
              chat_to: '1',
              chat_name: 'support',
              chat_message: message,
              chat_read: '0',
              chat_institution: $rootScope.institution,
              chat_answered: '0',
              chat_when: data[0].chatOK,
              chat_del: '0'
            });
            chats.lastchat = data[0].chatOK;
            $timeout(function() {$ionicScrollDelegate.scrollBottom(true);}, 200);

          }, function() {});

        }
        return 1;

      }, function(er) {
        return 0;
      });

    },
    setlang: function(res) {
      chathello = res.support_chat_hello;
      themes = [{
        id: 0,
        name: res.faq_cat_points,
        desc: ''
      },
      {
        id: 1,
        name: res.faq_cat_other,
        desc: ''
      }];
      faq = [{
        id: 0,
        theme: 0,
        question: res.faq_ask_points_dont_see,
        answer: res.faq_ask_points_dont_see_answ
      },
      {
        id: 1,
        theme: 0,
        question: res.faq_ask_points_for_what,
        answer: res.faq_ask_points_for_what_answ + '<br/>' + res.faq_ask_points_for_what_answ1 + '<br/>' + res.faq_ask_points_for_what_answ2 + '<br/>' + res.faq_ask_points_for_what_answ3
      },
      {
        id: 2,
        theme: 0,
        question: res.faq_ask_points_shared_not_got,
        answer: res.faq_ask_points_shared_not_got_answ
      },
      {
        id: 3,
        theme: 0,
        question: res.faq_ask_points_promo,
        answer: res.faq_ask_points_promo_answ + '<br/>' + res.faq_ask_points_promo_answ1 + '<br/>' + res.faq_ask_points_promo_answ2 + '<br/>' + res.faq_ask_points_promo_answ3 
      },
      {
        id: 4,
        theme: 0,
        question: res.faq_ask_points_new_phone,
        answer: res.faq_ask_points_new_phone_answ 
      },
      {
        id: 5,
        theme: 0,
        question: res.faq_ask_points_expire,
        answer: res.faq_ask_points_expire_answ 
      },
      {
        id: 6,
        theme: 1,
        question: res.faq_ask_other_sms,
        answer: res.faq_ask_other_sms_answ 
      },
      {
        id: 7,
        theme: 1,
        question: res.faq_ask_other_prof_edit,
        answer: res.faq_ask_other_prof_edit_answ 
      }];
    }
  };
})

.factory('Profile', function($rootScope, $cordovaSQLite) {

  var profile = [];

  return {
    check: function() {
      if(profile.length == 0) {return false;} else {return true;}
    },
    allnew: function() {
      var queryMeSel = "SELECT * FROM users WHERE user_id = ?";
      return $cordovaSQLite.execute($rootScope.db, queryMeSel, [1]).then(function(success) {
        if(success.rows.length > 0) {
          profile = success.rows.item(0);
          return profile;
        }
      }, function() {});
    },
    allold: function() {
      return profile;
    },
    set: function(field, value) {
      var queryMeUpd = "UPDATE users SET "+field+"=? WHERE user_id = ?";
      $cordovaSQLite.execute($rootScope.db, queryMeUpd, [value, 1]).then(function() {}, function() {});
    },
    setAll: function(profile, when) {
      var updateBio = "UPDATE users SET user_name=?, user_surname=?, user_middlename=?, user_email=?, user_mob=?, user_pic=?, user_gender=?, user_birthday=?, user_adress=?, user_upd=? WHERE user_id = ?";
      $cordovaSQLite.execute($rootScope.db, updateBio, [(profile.user_name != '' && profile.user_name != 0) ? profile.user_name : "0", (profile.user_surname != '' && profile.user_surname != 0) ? profile.user_surname : "0", (profile.user_middlename != '' && profile.user_middlename != 0) ? profile.user_middlename : "0", (profile.user_email != '' && profile.user_email != 0) ? profile.user_email : "0", profile.user_mob, (profile.user_pic != '' && profile.user_pic != 0) ? profile.user_pic : "0", (profile.user_gender != '' && profile.user_gender != 0) ? profile.user_gender : "0", profile.user_birthday, (profile.user_adress != '' && profile.user_adress != 0) ? profile.user_adress : "0", when, 1]).then(function() {}, function(er) {});
    }
  };

})

.factory('Phone', function() {

  var phonecodes = [{
    id: 22,
    name: 'Беларусь',
    short: 'BY',
    code: '375'
  },
  {
    id: 1,
    name: 'Россия',
    short: 'RU',
    code: '7'
  },
  {
    id: 53,
    name: 'Deutschland',
    short: 'DE',
    code: '49'
  }];

  return {
    all: function() {
      return phonecodes;
    },
    get: function(phoneCode) {
      for (var i = 0; i < phonecodes.length; i++) {
        if (phonecodes[i].code === phoneCode) {
          return phonecodes[i].name;
        }
      }
      return 'Выбор страны';
    },
    getShort: function(phone) {
      // CHECK IF 3 CHARS COUNTRY
      var phone = phone.toString();
      var shortcode = phone.substring(0,3);
      for (var i = 0; i < phonecodes.length; i++) {
        if (phonecodes[i].code == shortcode) {
          return phonecodes[i].code;
        }
        else if(i == phonecodes.length-1) {
          // CHECK IF 2 CHARS COUNTRY
          shortcode = phone.substring(0,2);
          for (var a = 0; a < phonecodes.length; a++) {
            if (phonecodes[a].code == shortcode) {
              return phonecodes[a].code;
            }
            else if(a == phonecodes.length-1) {
              // CHECK IF 1 CHAR COUNTRY
              shortcode = phone.substring(0,1);
              for (var b = 0; b < phonecodes.length; b++) {
                if (phonecodes[b].code == shortcode) {
                  return phonecodes[b].code;
                }
                else if(b == phonecodes.length-1) {
                  return '0';
                }
              }
            }
          }
        }
      }
      return '0';
    }
  };
})

.factory('Order', function($rootScope, $cordovaSQLite, $http) {

  // var orders = [{
  //   id: 0,
  //   user: 10,
  //   name: 'Преческа',
  //   desc: 'Простая прическа',
  //   employee: 1,
  //   bill: 17,
  //   points: 20,
  //   points_status: 0,
  //   points_got_spend: 0,
  //   gift: 0,
  //   gift_state: 0,
  //   order: 12,
  //   pic: 'user.png',
  //   office: 7,
  //   goods: 3,
  //   cats: 5,
  //   start: 1488041421,
  //   end: 1488041521,
  //   status: 1,
  //   mobile: 375293803734,
  //   type: 'record',
  //   when: 1488041121
  // }, {
  //   id: 1,
  //   user: 10,
  //   name: 'Прическа',
  //   desc: 'Простая прическа',
  //   employee: 1,
  //   bill: 17,
  //   points: 20,
  //   points_status: 0,
  //   points_got_spend: 0,
  //   gift: 0,
  //   gift_state: 0,
  //   order: 12,
  //   pic: 'user.png',
  //   office: 7,
  //   goods: 3,
  //   cats: 5,
  //   start: 1488041421,
  //   end: 1488041521,
  //   status: 2,
  //   mobile: 375293803734,
  //   type: 'record',
  //   when: 1488041121
  // }, {
  //   id: 2,
  //   user: 10,
  //   name: 'Прическа',
  //   desc: 'Простая прическа',
  //   employee: 1,
  //   bill: 17,
  //   points: 20,
  //   points_status: 0,
  //   points_got_spend: 0,
  //   gift: 0,
  //   gift_state: 0,
  //   order: 12,
  //   pic: 'user.png',
  //   office: 7,
  //   goods: 3,
  //   cats: 5,
  //   start: 1488041421,
  //   end: 1488041521,
  //   status: 3,
  //   mobile: 375293803734,
  //   type: 'record',
  //   when: 1488041121
  // }, {
  //   id: 3,
  //   user: 10,
  //   name: 'Прическа',
  //   desc: 'Простая прическа',
  //   employee: 1,
  //   bill: 17,
  //   points: 20,
  //   points_status: 0,
  //   points_got_spend: 0,
  //   gift: 0,
  //   gift_state: 0,
  //   order: 12,
  //   pic: 'user.png',
  //   office: 7,
  //   goods: 3,
  //   cats: 5,
  //   start: 1488041421,
  //   end: 1488041521,
  //   status: 4,
  //   mobile: 375293803734,
  //   type: 'record',
  //   when: 1488041121
  // }, {
  //   id: 4,
  //   user: 10,
  //   name: 'Прическа',
  //   desc: 'Простая прическа',
  //   employee: 1,
  //   bill: 17,
  //   points: 20,
  //   points_status: 0,
  //   points_got_spend: 0,
  //   gift: 0,
  //   gift_state: 0,
  //   order: 12,
  //   pic: 'user.png',
  //   office: 7,
  //   goods: 3,
  //   cats: 5,
  //   start: 1488041421,
  //   end: 1488041521,
  //   status: 0,
  //   mobile: 375293803734,
  //   type: 'record',
  //   when: 1488041121
  // }, {
  //   id: 5,
  //   user: 10,
  //   name: 'Прическа',
  //   desc: 'Простая прическа',
  //   employee: 1,
  //   bill: 17,
  //   points: 20,
  //   points_status: 0,
  //   points_got_spend: 0,
  //   gift: 0,
  //   gift_state: 0,
  //   order: 12,
  //   pic: 'user.png',
  //   office: 7,
  //   goods: 3,
  //   cats: 5,
  //   start: 1488041421,
  //   end: 1488041521,
  //   status: 1,
  //   mobile: 375293803734,
  //   type: 'record',
  //   when: 1488041121
  // }, {
  //   id: 6,
  //   user: 10,
  //   name: 'Прическа',
  //   desc: 'Простая прическа',
  //   employee: 1,
  //   bill: 17,
  //   points: 20,
  //   points_status: 0,
  //   points_got_spend: 0,
  //   gift: 0,
  //   gift_state: 0,
  //   order: 12,
  //   pic: 'user.png',
  //   office: 7,
  //   goods: 3,
  //   cats: 5,
  //   start: 1488041421,
  //   end: 1488041521,
  //   status: 1,
  //   mobile: 375293803734,
  //   type: 'record',
  //   when: 1488041121
  // }];

  var orders = [];
  var purchases = [];
  var purchasez = [];

  function infouser(x) {

      var x = x;

      var queryUsers = "SELECT * FROM users WHERE user_real_id = ? AND user_del = '0'";
      return $cordovaSQLite.execute($rootScope.db, queryUsers, [x]).then(function(succ) {

        if(succ.rows.length > 0) {

          return succ.rows.item(0).user_name;

        }
        else {
          return true;
        }

      },function() {});

  };

  function menuepic(x) {

      var x = x;

      var queryMenueSel = "SELECT * FROM menue WHERE menue_id = ? AND menue_del = '0'";
      return $cordovaSQLite.execute($rootScope.db, queryMenueSel, [x]).then(function(success) {

        if(success.rows.length > 0) {

          return success.rows.item(0).menue_pic;

        }
        else {
          return true;
        }

      }, function() {});

  };

  function menuename(x) {

      var x = x;

      var queryMenueSel = "SELECT * FROM menue WHERE menue_when > ? AND menue_del = '0'";
      return $cordovaSQLite.execute($rootScope.db, queryMenueSel, [x]).then(function(success) {

        if(success.rows.length > 0) {

          return success.rows.item(0).menue_name;

        }
        else {
          return true;
        }

      }, function() {});

  };

  function timezoneAdd(thetime) {
    var thetime = parseInt(thetime);
    var tzoff = new Date().getTimezoneOffset();
    var nsec = tzoff*60*1000;
    var serverzone = 3*60*60*1000;
    var timediff = nsec+serverzone;
    return thetime + timediff;
  }

  function orderingpush(suc) {
    if(suc.order_worker > 0) {

        var order_id = suc.order_id;
        var order_name = suc.order_name;
        var order_user = suc.order_user;
        var order_office = suc.order_office;
        var order_goods = suc.order_goods;
        var order_cats = suc.order_cats;
        var order_start = suc.order_start;
        var order_end = suc.order_end;

        var order_desc = suc.order_desc;
        var order_bill = parseFloat(suc.order_bill/100).toFixed(2);
        var order_institution = suc.order_institution;
        var order_status = suc.order_status;

        var order_allday = suc.order_allday;
        var order_when = suc.order_when;
        var order_order = suc.order_order;
        var workerid = suc.order_worker;
        var order_mobile = suc.order_mobile;

        // console.log('1 =======================> '+order_id+' '+order_name)

        // alert(workerid)

        infouser(workerid).then(function(userdata) {

          // alert(JSON.stringify(userdata))

          menuepic(order_order).then(function(picdata) {

              // alert(JSON.stringify(picdata))

            menuename(order_order).then(function(namedata) {

              // alert(JSON.stringify(namedata))
              if(suc.order_status < 4) {

                orders.push({"order_id":order_id, "order_user":order_user, "order_name":order_name, "order_desc":order_desc, "order_worker":userdata, "order_bill":order_bill, "order_order":namedata, "order_pic":"http://www.olegtronics.com/admin/img/menu/"+order_institution+"/300/"+picdata, "order_office":order_office, "order_goods":order_goods, "order_cats":order_cats, "order_start":order_start, "order_end":order_end, "order_status":order_status, "order_allday":order_allday, "order_mobile":order_mobile, "order_when":order_when});

              }
              else if(suc.order_status == 5) {

                purchases.push({"order_id":order_id, "order_user":order_user, "order_name":order_name, "order_desc":order_desc, "order_worker":userdata, "order_bill":order_bill, "order_order":namedata, "order_pic":"http://www.olegtronics.com/admin/img/menu/"+order_institution+"/300/"+picdata, "order_office":order_office, "order_goods":order_goods, "order_cats":order_cats, "order_start":order_start, "order_end":order_end, "order_status":order_status, "order_allday":order_allday, "order_mobile":order_mobile, "order_when":order_when});

              }

            })

          })

        })

    }
    else {

      var order_id = suc.order_id;
      var order_name = suc.order_name;
      var order_user = suc.order_user;
      var order_office = suc.order_office;
      var order_goods = suc.order_goods;
      var order_cats = suc.order_cats;
      var order_start = suc.order_start;
      var order_end = suc.order_end;
      var order_desc = suc.order_desc;
      var order_bill = parseFloat(suc.order_bill/100).toFixed(2);
      var order_institution = suc.order_institution;
      var order_status = suc.order_status;

      var order_allday = suc.order_allday;
      var order_when = suc.order_when;
      var order_order = suc.order_order;
      var workerid = suc.order_worker;
      var order_mobile = suc.order_mobile;

      // console.log('2 =======================> '+order_id+' '+order_name)

      menuepic(order_order).then(function(picdata) {

        menuename(order_order).then(function(namedata) {

          if(suc.order_status < 4) {

            orders.push({"order_id":order_id, "order_user":order_user, "order_name":order_name, "order_desc":order_desc, "order_worker":"", "order_bill":order_bill, "order_order":namedata, "order_pic":"http://www.olegtronics.com/admin/img/menu/"+order_institution+"/300/"+picdata, "order_office":order_office, "order_goods":order_goods, "order_cats":order_cats, "order_start":order_start, "order_end":order_end, "order_status":order_status, "order_allday":order_allday, "order_mobile":order_mobile, "order_when":order_when});

          }
          else if(suc.order_status == 5) {

            purchases.push({"order_id":order_id, "order_user":order_user, "order_name":order_name, "order_desc":order_desc, "order_worker":"", "order_bill":order_bill, "order_order":namedata, "order_pic":"http://www.olegtronics.com/admin/img/menu/"+order_institution+"/300/"+picdata, "order_office":order_office, "order_goods":order_goods, "order_cats":order_cats, "order_start":order_start, "order_end":order_end, "order_status":order_status, "order_allday":order_allday, "order_mobile":order_mobile, "order_when":order_when});

          }

        })

      })

    }
  }

  return {
    check: function() {
      if(orders.length == 0) {return false;} else {return true;}
    },
    checkpurchases: function() {
      if(purchases.length == 0) {return false;} else {return true;}
    },
    checkpurchasez: function() {
      if(purchasez.length == 0) {return false;} else {return true;}
    },
    all: function() {
      return orders;
    },
    get: function(ordId) {
      var ordarr = [];
      for (var i = 0; i < orders.length; i++) {
        if (orders[i].id === parseInt(ordId)) {
          ordarr.push(orders[i]);
        }
      }
      return ordarr;
    },
    get10new: function(myid) {
      orders = [];
      var queryOrders = "SELECT * FROM ordering WHERE order_user = ? AND order_status < '4' AND order_del = '0' ORDER BY order_id DESC LIMIT 20";
      return $cordovaSQLite.execute($rootScope.db, queryOrders, [myid]).then(function(suc) {
          if(suc.rows.length > 0) {
              for(var i=0;i<suc.rows.length;i++) {
                suc.rows.item(i).order_start = timezoneAdd(suc.rows.item(i).order_start);
                suc.rows.item(i).order_end = timezoneAdd(suc.rows.item(i).order_end);
                orderingpush(suc.rows.item(i));
              }
              return orders;
          }
          else {
            return orders;
          }
      }, function() {});
    },
    get10old: function() {
      return orders;
    },
    get10Pnew: function(myid) {
      purchases = [];
      var queryOrders = "SELECT * FROM ordering WHERE order_user = ? AND order_status = '5' AND order_del = '0' ORDER BY order_id DESC LIMIT 10";
      return $cordovaSQLite.execute($rootScope.db, queryOrders, [myid]).then(function(suc) {
          if(suc.rows.length > 0) {
              for(var i=0;i<suc.rows.length;i++) {
                suc.rows.item(i).order_start = timezoneAdd(suc.rows.item(i).order_start);
                suc.rows.item(i).order_end = timezoneAdd(suc.rows.item(i).order_end);
                orderingpush(suc.rows.item(i));
              }
              return purchases;
          }
          else {
            return purchases;
          }
      }, function() {});
    },
    get10Pold: function() {
      return purchases;
    },
    get10Purchnew: function(myid) {
      purchasez = [];
      var queryOrders = "SELECT * FROM ordering WHERE order_user = ? AND order_status = '5' AND order_del = '0' ORDER BY order_id DESC LIMIT 10";
      return $cordovaSQLite.execute($rootScope.db, queryOrders, [myid]).then(function(suc) {
          if(suc.rows.length > 0) {
              for(var i=0;i<suc.rows.length;i++) {
                purchasez.push(suc.rows.item(i));
              }
              return purchasez;
          }
          else {
            return purchasez;
          }
      }, function() {});
    },
    get10Purchold: function() {
      return purchasez;
    },
    send: function(cart, cartsum, profile) {

      var purchase = {
        device: $rootScope.model,
        device_id: $rootScope.uuid,
        device_version: $rootScope.version,
        device_os: $rootScope.platform,
        inst_id: $rootScope.institution,
        userSurname: profile.user_surname,
        userName: profile.user_name,
        userMiddlename: profile.user_middlename,
        userMobile: profile.user_mobile,
        userEmail: profile.user_email,
        userCity: profile.user_city,
        userAdress: profile.user_adress,
        userComment: profile.comment,
        newusr:'purchase',
        cartsum: cartsum,
        mobilePurchase: cart
      }
      
      var orderstr = JSON.stringify(purchase);

      return $http.post($rootScope.generalscript, orderstr).then(function(f) {

        var orderreq = f.data;

        if(orderreq[0].orderOK == 1) {
          var orderIns = "INSERT INTO ordering (order_id, order_user, order_user_name_phone, order_user_surname_phone, order_user_middlename_phone, order_user_adress_phone, order_user_comment_phone, order_name, order_name_phone, order_user_phone_phone, order_user_email_phone, order_desc, order_worker, order_worker_name_phone, order_worker_pic_phone, order_worker_profession_phone, order_reminder_phone, order_institution, order_office, order_bill, order_goods, order_cats, order_order, order_status, order_start, order_start_name_phone, order_end, order_allday, order_mobile_confirm, order_mobile, order_when, order_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          $cordovaSQLite.execute($rootScope.db, orderIns, [orderreq[0].order_id, orderreq[0].order_user, profile.user_name, profile.user_surname, profile.user_middlename, profile.user_city + ' - ' + profile.user_adress, profile.user_comment, '0', '0', '0', '0', cart, '0', '0', '0', '0', '0', $rootScope.institution, '0', cartsum, '0', '0', '0', '5', '0', '0', '0', '0', '0', '0', orderreq[0].order_when, '0']).then(function(ins) {}, function() {});
        }
        return orderreq[0].orderOK;

      }, function(er) {
        return 3;
      });

    }
  };
})

.factory('Points', function($rootScope, $cordovaSQLite) {

  var points = [];

  var mypoints = [];

  var promopoints = [];

  return {
    check: function() {
      if(mypoints.length == 0) {return false;} else {return true;}
    },
    checkpoints: function() {
      if(points.length == 0) {return false;} else {return true;}
    },
    all: function() {
      return points;
    },
    get: function(pointId) {
      var pointarr = [];
      for (var i = 0; i < points.length; i++) {
        if (points[i].id === parseInt(pointId)) {
          ordarr.push(points[i]);
        }
      }
      return pointarr;
    },
    get10new: function(myid) {
      points = [];
      var queryPoints = "SELECT * FROM points WHERE points_user = ? AND points_del = '0' ORDER BY points_id DESC LIMIT 20";
      return $cordovaSQLite.execute($rootScope.db, queryPoints, [myid]).then(function(suc) {
          if(suc.rows.length > 0) {
              for(var i=0;i<suc.rows.length;i++) {
                points.push(suc.rows.item(i));
              }
              return points;
          }
          else {
            return points;
          }
      }, function() {});
    },
    get10old: function() {
      return points;
    },
    get10Promonew: function(myid) {
      promopoints = [];
      var queryPoints = "SELECT * FROM points WHERE points_user = ? AND points_comment > '4' AND points_comment < '9' AND points_comment != '6' AND points_del = '0' ORDER BY points_id DESC LIMIT 20";
      return $cordovaSQLite.execute($rootScope.db, queryPoints, [myid]).then(function(suc) {
          if(suc.rows.length > 0) {
              for(var i=0;i<suc.rows.length;i++) {
                promopoints.push(suc.rows.item(i));
              }
              return promopoints;
          }
          else {
            return promopoints;
          }
      }, function() {});
    },
    get10Promoold: function() {
      return promopoints;
    },
    getmynew: function(profile) {
      var queryMeSel = "SELECT * FROM wallet WHERE wallet_user = ? AND wallet_del = '0'";
      return $cordovaSQLite.execute($rootScope.db, queryMeSel, [profile.user_real_id]).then(function(suc) {
        if(suc.rows.length > 0) {
          mypoints = suc.rows.item(0).wallet_total;
          return mypoints;
        }
      }, function(er) {});
    },
    getmyold: function() {
      return mypoints;
    }
  };
})

.factory('Bill', function() {

  var billsums = 0;
  var billmem = '';

  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  return {
    getbill: function() {
      return billmem;
    },
    setbill: function(billsum, uiid) {
      var newdate = new Date();
      var datetime = Math.round(newdate.getTime() / 1000);
      // var securecode = datetime + makeid();

      billsums = billsum;
      billmem = uiid + '&' + datetime + '&' + makeid() + '&' + billsum + '&';
    },
    getsum: function() {
      return billsums;
    }
  }

})

.factory('Reservation', function($rootScope, $cordovaSQLite, $http) {

  function timezoneSub(thetime) {
    if(thetime) {
      var thetime = parseInt(thetime);
          thetime = thetime*1000;
      var tzoff = new Date().getTimezoneOffset();
      var nsec = tzoff*60*1000;
      var serverzone = 3*60*60*1000;
      var timediff = nsec+serverzone;
      return ((thetime - timediff)/1000).toFixed(0);
    }
  }

  return {
    allTimes: function() {
      var times = [];
      for (var i = 0; i < 24; i++) {
        if(i < 10) {
          var h1 = '0' + i.toString() + ':00';
          var h2 = '0' + i.toString() + ':30';
          times.push({val: h1, txt: h1});
          times.push({val: h2, txt: h2});
        }
        else {
          var h1 = i.toString() + ':00';
          var h2 = i.toString() + ':30';
          times.push({val: h1, txt: h1});
          times.push({val: h2, txt: h2});
        }
      }
      return times;
    },
    allGuests: function() {
      var guests = [];
      for (var i = 1; i < 21; i++) {
        guests.push({val: i, txt: i});
      }
      return guests;
    },
    send: function(reservation) {
      
      var datesplit = 0;
      var resdate = new Date(reservation.date);
      var resY = resdate.getFullYear();
      var resM = resdate.getMonth()-1;
      var resD = resdate.getDate();
      var timesplit = reservation.time.split(':');
      var timerecalced = new Date(resY,resM,resD,timesplit[0],timesplit[1]);
      var timesecs = (timerecalced.getTime()/1000).toFixed(0);
                  
      var sendstr = {
        device: $rootScope.model,
        device_id: $rootScope.uuid,
        device_version: $rootScope.version,
        device_os: $rootScope.platform,
        inst_id: $rootScope.institution,
        name: reservation.name,
        surname: reservation.surname,
        phone: reservation.user_mobile,
        orderHour: timezoneSub(timesecs),
        orderHourName: reservation.time,
        orderDayName: reservation.date,
        comments: reservation.amount + ' чел - ' + reservation.comment,
        getset: 3,
        newusr: 'calender'
      }
      sendstr = JSON.stringify(sendstr);
      
      return $http.post($rootScope.generalscript, sendstr).then(function(suc) {
        
        var data = suc.data;
        
        return 1;

      }, function(er) {
        return 0;
      });
    }
  };
})

.factory('Entry', function($rootScope, $cordovaSQLite, $timeout) {

  var logtime = 0;

  function timezoneAdd(thetime) {
    if(thetime) {
      var thetime = parseInt(thetime);
          thetime = thetime*1000;
      var tzoff = new Date().getTimezoneOffset();
      var nsec = tzoff*60*1000;
      var serverzone = 3*60*60*1000;
      var timediff = nsec+serverzone;
      return ((thetime + timediff)/1000).toFixed(0);
    }
  }

  function timezoneSub(thetime) {
    if(thetime) {
      var thetime = parseInt(thetime);
          thetime = thetime*1000;
      var tzoff = new Date().getTimezoneOffset();
      var nsec = tzoff*60*1000;
      var serverzone = 3*60*60*1000;
      var timediff = nsec+serverzone;
      return ((thetime - timediff)/1000).toFixed(0);
    }
  }

  var profs = [];
  var waiterschedule = [];
  var order = {
    inst_id: $rootScope.institution,
    newusr: 'calender',
    device_id: $rootScope.uuid,
    getset: 1,
    menueId: '',
    menueName: '',
    menueCost: '',
    workerId: '',
    workerName: '',
    workerPic: '',
    workerProfession: '',
    orderHour: '',
    orderHourName: '',
    orderDayName: '',
    ordercats: '',
    ordgood: '',
    name: '',
    phone: '',
    email: '',
    comments: '',
    reminder: '',
    smsconf: ''
  }

  // BS
  var finalorder = [];

  // BS
  var checkedOrder = [];

  // BS
  var order_bs = {
    inst_id: $rootScope.institution,
    newusr: 'calender',
    device_id: $rootScope.uuid,
    getset: 1,
    menueId: '',
    menueName: '',
    menueCost: '',
    menueDesc: '',
    workerId: '',
    workerName: '',
    workerPic: '',
    workerProfession: '',
    orderHour: '',
    orderHourName: '',
    orderDayName: '',
    ordercats: '',
    ordgood: '',
    name: '',
    phone: '',
    email: '',
    comments: '',
    reminder: '',
    smsconf: ''
  }

  // BS
  var waiters = [];

  var queryProfSel = "SELECT * FROM professions WHERE prof_when > ? AND prof_del = '0'";
  $cordovaSQLite.execute($rootScope.db, queryProfSel, [1]).then(function(success) {

    if(success.rows.length > 0) {

      for (i = 0; i < success.rows.length; i++) {

        profs.push(success.rows.item(i));

      }

    }

  }, function() {});

  // GET SCHEDULE
  var querySchedule = "SELECT * FROM schedule WHERE schedule_when > ? AND schedule_del = '0'";
  $cordovaSQLite.execute($rootScope.db, querySchedule, [1]).then(function(suc) {
    // console.log('length '+suc.rows.length)
    if(suc.rows.length > 0) {
      for (i = 0; i < suc.rows.length; i++) {
        // console.log('SCHEDULE: '+JSON.stringify(suc.rows.item(i)))
        // suc.rows.item(i).schedule_start = timezoneAdd(suc.rows.item(i).schedule_start);
        // suc.rows.item(i).schedule_stop = timezoneAdd(suc.rows.item(i).schedule_stop);
        waiterschedule.push(suc.rows.item(i));
        // alert('ok: '+new Date(suc.rows.item(i).schedule_start*1000)+' '+new Date(suc.rows.item(i).schedule_stop*1000))
      }
    }
  },
  function() {});

  // GET LOG
  var queryLog = "SELECT * FROM users WHERE user_id = ? AND user_del = '0'";
  $cordovaSQLite.execute($rootScope.db, queryLog, [1]).then(function(suc) {
    if(suc.rows.length > 0) {
      logtime = suc.rows.item(0).user_log;
      // console.log('FFFF: '+logtime);
    }
  },
  function() {});

  var days = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];

  return {
    setDays: function(dayz) {
      days = dayz;
    },
    getCategories: function() {

      var categories = [];

      var queryCatSel = "SELECT * FROM categories WHERE cat_when > ? AND cat_del = '0'";
      return $cordovaSQLite.execute($rootScope.db, queryCatSel, [1]).then(function(success) {

        if(success.rows.length > 0) {

          for (var i = 0; i < success.rows.length; i++) {

            if(success.rows.item(i).cat_when > 1) {

              categories.push(success.rows.item(i));

            }

          }
          return categories;

        }
        else {
          return categories;
        }

      }, function() {
        return null;
      });

    },
    // BS
    getOrderBSCategories: function() {

      var categories = [];

      var queryCatSel = "SELECT * FROM categories WHERE cat_when > ? AND cat_del = '0'";
      return $cordovaSQLite.execute($rootScope.db, queryCatSel, [1]).then(function(success) {

        if(success.rows.length > 0) {

          for (var i = 0; i < success.rows.length; i++) {

            // console.log("YES ------------------------------------> "+success.rows.item(i).cat_order)

            if(success.rows.item(i).cat_order == '1' && success.rows.item(i).cat_when > 1) {

              // console.log('KPSS ========================================>')

              categories.push(success.rows.item(i));

            }

          }
          return categories;

        }
        else {
          return categories;
        }

      }, function() {
        return null;
      });

    },
    // BS
    getOrderBSMenue: function(catId, goodId) {

      order_bs.ordercats = catId;
      order_bs.ordgood = goodId;

      var categories = [];

      function getSubcat(catitem) {

        var queryMenueSel = "SELECT * FROM menue WHERE menue_cat = ? AND menue_del = '0'";
        return $cordovaSQLite.execute($rootScope.db, queryMenueSel, [parseInt(catitem.cat_id)]).then(function(success) {

          catitem.category = true;
          catitem.checked = false;
          categories.push(catitem);

          if(success.rows.length > 0) {

            for (i = 0; i < success.rows.length; i++) {

              // console.log('GET MENUE ===========================> '+success.rows.item(i).menue_when +' '+ success.rows.item(i).menue_interval +' '+ success.rows.item(i).menue_cost);
              
              if (success.rows.item(i).menue_when > 1 && success.rows.item(i).menue_interval > 0 && success.rows.item(i).menue_cost > 0) {

                var successcat = success.rows.item(i);

                if(checkedOrder.length > 0) {
                  for(var a = 0;a<checkedOrder.length;a++) {
                    // console.log('====================> '+checkedOrder[a].menue_id + ' ' + success.rows.item(i).menue_id)
                    if(checkedOrder[a].menue_id == success.rows.item(i).menue_id) {
                      successcat.checked = true;
                      successcat.category = false;
                      categories.push(successcat);
                      break;
                    }
                    else if(a == checkedOrder.length-1) {
                      successcat.checked = false;
                      successcat.category = false;
                      categories.push(successcat);
                    }
                  }
                }
                else {
                  successcat.checked = false;
                  successcat.category = false;
                  categories.push(successcat);
                }

              }

            }
            return categories;

          }
          else {
            return categories;
          }

        }, function() {});

      }

      var queryCatSel = "SELECT * FROM categories WHERE cat_when > ? AND cat_del = '0'";
      return $cordovaSQLite.execute($rootScope.db, queryCatSel, [1]).then(function(success) {

        if(success.rows.length > 0) {

          for (var i = 0; i < success.rows.length; i++) {

            // console.log("CATEGORIES ------------------------------------> "+success.rows.item(i).cat_order+' '+success.rows.item(i).cat_id+' '+catId)

            if(success.rows.item(i).cat_order == '1' && parseInt(success.rows.item(i).cat_id) == parseInt(catId)) {

              // console.log('KPSS ========================================>')

              var catobject = success.rows.item(i);
              catobject.menue_name = success.rows.item(i).cat_name;
              catobject.menue_desc = '';
              catobject.menue_interval = '';
              getSubcat(catobject);

            }

          }
          return categories;

        }
        else {
          return categories;
        }

      }, function() {
        return null;
      });

    },
    // BS
    getCheckedOrder: function() {
      return checkedOrder;
    },
    // BS
    setCheckedOrder: function(order) {
      // console.log(JSON.stringify(order))
      if(checkedOrder.length > 0) {
        for(var i=0;i<checkedOrder.length;i++) {
          // console.log('=================> '+checkedOrder[i].menue_id+' ================> '+order.menue_id)
          if(checkedOrder[i].menue_id == order.menue_id) {
            break;
          }
          else if(i == checkedOrder.length-1) {
            checkedOrder.push(order);
            // console.log('=================> PUSHED')
            // console.log('ORDER =================> '+JSON.stringify(order))
          }
        }
      }
      else {
        checkedOrder.push(order);
        // console.log('=================> PUSHED 2')
      }
        // console.log('================================> '+JSON.stringify(checkedOrder));
    },
    // BS
    removeCheckedOrder: function(menueid) {
      // REMOVE FROM PREPARE ORDER
      if(checkedOrder.length > 0) {
        for(var i=0;i<checkedOrder.length;i++) {
          // console.log('================================> '+checkedOrder[i].menue_id+' '+menueid);
          if(checkedOrder[i].menue_id == menueid) {
            // console.log('=================> REMOVE')
            checkedOrder.splice(i, 1);
            break;
          }
        }
      }
      // REMOVE FROM FINAL ORDER
      if(finalorder.length > 0) {
        for(var i=0;i<finalorder.length;i++) {
          // console.log('================================> '+checkedOrder[i].menue_id+' '+menueid);
          if(finalorder[i].menueId == menueid) {
            // console.log('=================> REMOVE')
            finalorder.splice(i, 1);
            break;
          }
        }
      }
      // console.log('================================> '+JSON.stringify(checkedOrder));
    },
    // BS
    getBSWorker: function(menue, nosense, notshowed) {
      
      waiters = [];

      if(menue) {

        var zeroadded = 0;

        var queryUsers = "SELECT * FROM users WHERE user_id > ? AND user_del = '0'";
        $cordovaSQLite.execute($rootScope.db, queryUsers, [1]).then(function(suc) {
          // alert('length '+suc.rows.length)
          if(suc.rows.length > 0) {

            if(zeroadded == 0) {
              waiters.push({"user_id": "0", "user_real_id": "0", "user_name": nosense, "user_surname": "", "user_middlename": "", "user_email": "0", "user_email_confirm": "0", "user_pwd": "0", "user_tel": "0", "user_info": "0", "user_mob_confirm": "0", "user_mob": "0", "user_work_pos": "0", "user_menue_exe": "0", "user_institution": "0", "user_pic": "user.png", "user_gender": "0", "user_birthday": "0", "user_country": "0", "user_region": "0", "user_city": "0", "user_adress": "0", "user_install_where": "0", "user_log_key": "0", "user_gcm": "0", "user_device": "0", "user_device_id": "0", "user_device_version": "0", "user_device_os": "0", "user_discount": "0", "user_promo": "0", "user_log": "0", "user_upd": "0", "user_reg": "0", "prof_name": notshowed});
              zeroadded = 1;
            }

            for (var i = 0; i < suc.rows.length; i++) {
              // console.log("==================> SERVICE WORKER: "+JSON.stringify(suc.rows.item(i)))
              var exevar = suc.rows.item(i).user_menue_exe.split(',');
              var xstr = menue.toString();

              if(exevar.indexOf(xstr) != -1) {

                for (var a=0; a<profs.length; a++) {

                  if (+profs[a].prof_id == +suc.rows.item(i).user_work_pos) {

                    if(suc.rows.item(i).user_name == '' || suc.rows.item(i).user_name == 0) {
                      suc.rows.item(i)['user_name'] = 'Не указано';
                      suc.rows.item(i)['user_surname'] = '';
                      suc.rows.item(i)['user_middlename'] = '';
                    }
                    if(suc.rows.item(i).user_surname == '' || suc.rows.item(i).user_surname == 0) {
                      suc.rows.item(i)['user_surname'] = '';
                    }
                    if(suc.rows.item(i).user_middlename == '' || suc.rows.item(i).user_middlename == 0) {
                      suc.rows.item(i)['user_middlename'] = '';
                    }
                    if(suc.rows.item(i).user_pic == '' || suc.rows.item(i).user_pic == 0) {
                      suc.rows.item(i)['user_pic'] = 'user.png';
                    }
                    if(suc.rows.item(i).user_work_pos == '' || suc.rows.item(i).user_work_pos == 0) {
                      suc.rows.item(i)['prof_name'] = 'Не указано';
                    }
                    else {
                      suc.rows.item(i)['prof_name'] = profs[a]['prof_name'];
                    }
                    // console.log("==================> SERVICE WORKER: "+JSON.stringify(suc.rows.item(i)))
                    waiters.push(suc.rows.item(i));

                  }

                }

              }

            }
            // return waiters;

          }
        },
        function() {
          // return waiters;
        });

      }
      else {

        var queryUsers = "SELECT * FROM users WHERE user_id > ? AND user_del = '0'";
        $cordovaSQLite.execute($rootScope.db, queryUsers, [1]).then(function(suc) {
          // alert('length '+suc.rows.length)
          for (i = 0; i < suc.rows.length; i++) {
            waiters.push(suc.rows.item(i));
            // alert('ok: '+JSON.stringify(suc.rows.item(0)))
          }
          // return waiters;
        },
        function() {
          // return waiters;
        });

      }

    },
    // BS
    getBSWorkerNext: function() {
      return waiters;
    },
    // BS
    setBSWorker: function(workerId, workerName, workerPic, workerProfession) {
      order_bs.workerId = workerId;
      order_bs.workerName = workerName;
      order_bs.workerPic = workerPic;
      order_bs.workerProfession = workerProfession;
    },
    // BS
    getBSDates: function(menId, workId) {

      // console.log("GET DATES ================================> menId: "+menId+" work: "+workId);

      var menueid = parseInt(menId);
      var workerid = parseInt(workId);
      var logtmz = timezoneAdd(logtime);
      var when = (new Date(logtmz*1000).getTime()).toFixed(0);
      
      var waiterschedulelength = waiterschedule.length;

      // GET TIMETABLE
      var date1 = new Date(logtmz*1000);
          date1.setHours(0,0,0,0);
      var date1end = new Date(logtmz*1000);
          date1end.setHours(23,59,59,999);
      // TIME TWO WEEKS IN FUTURE
      var date2 = new Date((logtmz*1000) + 12096e5);
      var day;
      var day2;
      var onlMonth;
      var onlDay;
      var between = [];

      // console.log("GET DATES ================================> date1: "+logtmz);
      
      function checkschedule(x, y) {

        if(workerid > 0) {
          for(var u=0;u<waiterschedulelength;u++) {

            if(x.getDate() < 10) {
                  onlDay = '0' + x.getDate();
              } else {
                  onlDay = x.getDate();
              }
              if(x.getMonth() < 9) {
                  onlMonth = '0' + (x.getMonth() + 1);
              } else {
                  onlMonth = x.getMonth() + 1;
              }
              var pushday1 = days[x.getDay()];

              if(waiterschedule[u].schedule_employee == workerid && Math.round(x.getTime()/1000) <= timezoneAdd(waiterschedule[u].schedule_start) && Math.round(y.getTime()/1000) > timezoneAdd(waiterschedule[u].schedule_stop) && waiterschedule[u].schedule_when > 1) {

                // console.log(waiterschedule[u].schedule_id + ' | ' + waiterschedule[u].schedule_employee + ' = ' + workerid + ' | ' + x + ' <= ' + new Date(timezoneAdd(waiterschedule[u].schedule_start)) + ' | ' + y + ' > ' + new Date(timezoneAdd(waiterschedule[u].schedule_stop)) + ' | ' + new Date(waiterschedule[u].schedule_when*1000))

                var pushitem = {'workdayname': pushday1, 'workday': onlDay, 'workmonth': onlMonth, 'workyear': x.getFullYear(), 'items': []};

                // console.log(JSON.stringify(pushitem))
        
                between.push(pushitem);
        
              }

          }
        }
        else if(workerid == 0) {

          var currentworker = 0;
          for(var u=0;u<waiterschedulelength;u++) {

            if(x.getDate() < 10) {
                onlDay = '0' + x.getDate();
            } else {
                onlDay = x.getDate();
            }
            if(x.getMonth() < 9) {
                onlMonth = '0' + (x.getMonth() + 1);
            } else {
                onlMonth = x.getMonth() + 1;
            }
            var pushday1 = days[x.getDay()];

            if(currentworker == 0 && Math.round(x.getTime()/1000) <= timezoneAdd(waiterschedule[u].schedule_start) && Math.round(y.getTime()/1000) >= timezoneAdd(waiterschedule[u].schedule_stop) && waiterschedule[u].schedule_when > 1) {

              currentworker = waiterschedule[u].schedule_employee;

              var pushitem = {'workdayname': pushday1, 'workday': onlDay, 'workmonth': onlMonth, 'workyear': x.getFullYear(), 'items': []};
    
              between.push(pushitem);

            }

          }

        }

      }

      while(date2 >= date1) {
        
        day = date1.getDate();
        day2 = date1end.getDate();

        checkschedule(date1, date1end);

        // console.log("date1 ============> "+date1+' date1end ============> '+date1end+" date2 ============> "+date2);

        date1 = new Date(date1.setDate(++day));
        date1end = new Date(date1end.setDate(++day2));

      }

      return between;

    },
    // BS
    getBSTimes: function(day, menId, workId) {

      // console.log("GET TIMES START =================================> "+day+ ' | '+menId+ ' | '+workId+' | '+logtime);

      var menueid = parseInt(menId);
      var workerid = parseInt(workId);
      if(workerid == 0) {workerid = '%';}
      var when = (new Date(timezoneAdd(logtime)*1000).getTime()/1000).toFixed(0);

      var newworkday = parseInt(day.workday);
      var newworkmonth = parseInt(day.workmonth)-1;
      var newworkyear = parseInt(day.workyear);

      var whenstart = (new Date(newworkyear, newworkmonth, newworkday, 0, 0, 0, 0).getTime()/1000).toFixed(0);
      var whenend = (new Date(newworkyear, newworkmonth, newworkday, 23, 59, 59, 0).getTime()/1000).toFixed(0);
      var starts = [];
      var orders = [];
      var schedules = [];
      var interval = 30*60;
      var scheduleslength = 0;

      var nowsecs = (new Date().getTime() / 1000).toFixed(0);

      var starttime = whenstart;

      var starttimestay = whenstart;
      var stoptimestay = whenend;

      // GET MENUE (GETTING THE INTERVAL OF SELECTED ITEM)
      var queryMenue = "SELECT * FROM menue WHERE menue_id = ? AND menue_del = '0'";
      $cordovaSQLite.execute($rootScope.db, queryMenue, [menueid]).then(function(suc) {
        // console.log('2: '+suc.rows.length+' '+suc.rows.item(0).menue_name)
        if(suc.rows.length > 0) {
          if(suc.rows.item(0).menue_interval>0) {
            // interval = suc.rows.item(0).menue_interval*60;
          }
          // console.log('3: '+interval)
        }
      },
      function() {});

      // GET SCHEDULE (IF EMPLOYEE IS WORKING AT THIS TIME)
      var querySchedule2 = "SELECT * FROM schedule WHERE schedule_employee LIKE ? AND schedule_del = '0'";
      return $cordovaSQLite.execute($rootScope.db, querySchedule2, [workerid]).then(function(succ) {
        scheduleslength = succ.rows.length-1;
        // console.log('SCHEDULE ===========================> '+succ.rows.length+' '+workerid)
        if(succ.rows.length > 0 && workerid != '%') {
          // console.log('SCHEDULE NOT ZERO ===========================> ')

          for(var i=0;i<succ.rows.length;i++) {

            // console.log(succ.rows.item(i).schedule_start +'>='+ whenstart +' '+ succ.rows.item(i).schedule_start +'<'+ whenend + ' END: ' + succ.rows.item(i).schedule_stop)
            // SCHEDULE START IS BETWEEN BEGIN AND END OF DAY
            if(timezoneAdd(succ.rows.item(i).schedule_start) >= whenstart && timezoneAdd(succ.rows.item(i).schedule_start) < whenend && succ.rows.item(i).schedule_when > 1) {
              // console.log('==================> SCHEDULE EMPLOYEE 1: '+new Date(succ.rows.item(i).schedule_start*1000)+' '+new Date(succ.rows.item(i).schedule_stop*1000))
              starttimestay = timezoneAdd(succ.rows.item(i).schedule_start);
              stoptimestay = timezoneAdd(succ.rows.item(i).schedule_stop);
              // console.log('==================> SCHEDULE EMPLOYEE 2: '+new Date(starttimestay*1000)+' '+new Date(stoptimestay*1000))
              // schedules[starttimestay] = stoptimestay;
              var scheduleobj = {};
              scheduleobj[starttimestay] = stoptimestay;
              schedules.push(scheduleobj);

              // console.log('======================> schl: '+schedules.length)
              if(schedules.length > 0) {

                // GET ORDERING (CHECK IF IS ALREADY ORDERED AT THIS TIME)
                var queryOrder = "SELECT * FROM ordering WHERE order_worker = ? AND order_status != '3' AND order_status != '4' AND order_del = '0'";
                return $cordovaSQLite.execute($rootScope.db, queryOrder, [workerid]).then(function(succc) {

                    function pushinterval(a, b) {

                      // PUSH INTERVAL EXCEPT IF IS IN ORDER
                      var y = 0;
                      var sttm = starttime;
                      var intervalslength = (stoptimestay - starttimestay) / interval;
                      // console.log('===========================> '+intervalslength+' '+starttimestay+ ' ' +stoptimestay)
                      function intervals(y, a, b) {

                        // console.log('======================> INTERVAL '+starttime+' '+a+' | '+b)
                        // IF STARTTIME POINTS WITH SCHEDULE
                        if(starttime <= a && starttime < b) {



                          
                          // LOOP ORDERS AND COMPARE WITH INTERVAL
                          // console.log('ORDERS: '+a + ' ' + y+ ' '+JSON.stringify(orders[k]))
                          var k = 0;
                          function orderloop(k, a, y) {

                            // CHECK 1 ORDER WITH KEY-VALUE
                            for(okey in orders[k]) {

                              // console.log('okeyf '+sttm+' '+parseInt(okey)+' '+orders[k][okey])

                              if(parseInt(okey) <= sttm && sttm < orders[k][okey]) {
                                // console.log('OKEY!!!!!!!!!')
                                // IF IS ORDER AT THIS INTERVAL THE ENDTIME OF THE ORDER WILL BE TAKEN
                                sttm = orders[k][okey];
                                // starts.push(sttm);
                              }

                            }

                            k++;
                            if(k < orders.length) {
                              orderloop(k, a, y);
                            }
                            else {
                              // IF NO ORDER AT THIS INTERVAL
                              if(y == 0) {
                                // IF STARTTIME IS GREATER THAN NOW
                                // console.log(new Date(sttm*1000) + ' ' + new Date(stoptimestay*1000) + ' ' + new Date(a*1000) + ' ' + new Date(when*1000));
                                if(parseInt(a) > when && parseInt(a) < stoptimestay) {
                                  // console.log('NOKEY 1 !!!!!!!!!')
                                  starts.push(parseInt(a));
                                  // sttm = parseInt(a) + parseInt(interval);
                                }
                                // else if(parseInt(a) < when && parseInt(a) < stoptimestay) {
                                //   starts.push(when);
                                //   sttm = when + parseInt(interval);
                                // }
                                // else {
                                //   sttm = parseInt(a) + parseInt(interval);
                                // }
                                
                                  sttm = parseInt(a) + parseInt(interval);
                              }
                              else {
                                // IF STARTTIME IS GREATER THAN NOW
                                // console.log(new Date(sttm*1000) + ' ' + new Date(stoptimestay*1000) + ' ' + new Date(a*1000) + ' ' + new Date(when*1000));
                                if(sttm > when && sttm < stoptimestay) {
                                  // console.log('NOKEY 2 !!!!!!!!!')
                                  starts.push(parseInt(sttm));
                                }
                                  sttm = parseInt(sttm) + parseInt(interval);
                              }
                            }
                          }
                          orderloop(0, a, y);





                        }

                        y++;
                        if(y < intervalslength) {
                          intervals(y, a, b);
                        }
                      }
                      intervals(0, a, b);

                    }

                    function skeyf(x) {
                      // WHICH SCHEDULES ARE IN SELECTED TIMEPERIOD
                      for(skey in x) {
                        // console.log("======================> SKEY: "+new Date(skey*1000) + ' ' + new Date(whenstart*1000) + ' | ' + new Date(x[skey]*1000) + ' ' + new Date(whenend*1000))
                        if(skey >= whenstart && x[skey] < whenend) {

                          pushinterval(skey, x[skey]);

                        }

                      }

                    }

                    // IF THERE ARE ORDERS FOR THIS WORKER
                    // console.log('ORDERING LENGTH ====================> '+succc.rows.length)
                    if(succc.rows.length > 0) {

                      for(var x=0;x<succc.rows.length;x++) {

                        if(succc.rows.item(x).order_del == 0) {

                          // PUSH ORDER START AND END-TIME TO ARRAY AS KEY-VALUE PAIRS
                          var key = timezoneAdd(succc.rows.item(x).order_start);
                          var value = timezoneAdd(succc.rows.item(x).order_end);
                          var ordersobj = {};
                          ordersobj[key] = value;
                          orders.push(ordersobj);

                          // console.log('XXX '+key + ' ' + value)

                        }

                        if(x==succc.rows.length-1) {

                          // console.log(starttime +'>='+ starttimestay +' '+ starttime +'<='+ stoptimestay)
                          // LOOP SCHEDULE
                          for (var s=0;s<schedules.length;s++) {

                            // console.log('schedulebegin '+s+' scheduleend '+JSON.stringify(schedules[s]))
                            skeyf(schedules[s]);

                          }

                        }

                      }
                      // console.log(JSON.stringify(starts))
                      return starts;

                    }
                    else {
                      // LOOP SCHEDULE
                      for (var s=0;s<schedules.length;s++) {

                        // console.log('schedulebegin '+s+' scheduleend '+JSON.stringify(schedules[s]))
                        skeyf(schedules[s]);

                      }
                    }
                    // console.log(JSON.stringify(starts))
                    return starts;

                },
                function() {});

              }

            }

          }

        }
        else if(succ.rows.length > 0 && workerid == '%') {
          // console.log('SCHEDULE ZERO ===========================> ')
          
          // GET MIN STARTTIME AND MAX ENDTIME
          var mintime = 0;
          var maxtime = 0;
          for(var i=0;i<succ.rows.length;i++) {

            // console.log(succ.rows.item(i).schedule_start +'>='+ whenstart +' '+ succ.rows.item(i).schedule_start +'<'+ whenend + ' END: ' + succ.rows.item(i).schedule_stop)


            if(timezoneAdd(succ.rows.item(i).schedule_start) >= whenstart && timezoneAdd(succ.rows.item(i).schedule_start) < whenend && succ.rows.item(i).schedule_when > 1) {

              if(mintime == 0) {
                mintime = timezoneAdd(succ.rows.item(i).schedule_start);
              }
              else if(mintime > timezoneAdd(succ.rows.item(i).schedule_start)) {
                mintime = timezoneAdd(succ.rows.item(i).schedule_start);
              }

              if(maxtime < timezoneAdd(succ.rows.item(i).schedule_stop)) {
                maxtime = timezoneAdd(succ.rows.item(i).schedule_stop);
              }

            }

            if(i == succ.rows.length-1) {

              // console.log("============================================> "+mintime+' '+maxtime);

              // PUSH INTERVAL
              var y = 0;
              var sttm = mintime;
              var intervalslength = (maxtime - mintime) / interval;
              function intervals(y) {

                // console.log("============================================> "+intervalslength+' '+y+' '+sttm);

                // IF STARTTIME POINTS WITH SCHEDULE
                if(mintime <= sttm && maxtime > sttm) {

                  if(sttm > when) {
                    starts.push(parseInt(sttm)); 
                  }
                  sttm = parseInt(sttm) + parseInt(interval);

                }

                y++;
                if(y < intervalslength) {
                  intervals(y);
                }

              }
              intervals(0);

            }

          }
          return starts;

        }

      },
      function() {});

    },
    // BS
    setBSOrderHour: function(orderHour, orderHourName, day) {

      // console.log('------------------> '+JSON.stringify(checkedOrder));
      // console.log('==================> '+JSON.stringify(finalorder));

      order_bs.orderHour = orderHour;
      order_bs.orderHourName = orderHourName;
      order_bs.orderDayName = day.workdayname+', '+day.workday+'.'+day.workmonth+'.'+day.workyear;

      if(checkedOrder.length > 0) {
        var checkorderlength = checkedOrder.length;
        // console.log('LENGTH ==========================> '+checkorderlength);
        for(var i =0;i<checkorderlength;i++) {
          // console.log('CHECKORDER ==========================> '+i);
          if(finalorder.length > 0) {
            var finalorderlength = finalorder.length;
            // console.log('LENGTH 2 =========================> '+a);
            for(var a=0;a<finalorderlength;a++) {
              // console.log('COMPARE ===============================> '+checkedOrder[i].menue_id + ' ' + finalorder[a].menueId);
              if(checkedOrder[i].menue_id == finalorder[a].menueId) {
                // finalorder[a].orderHour = orderHour;
                // finalorder[a].orderHourName = orderHourName;
                // finalorder[a].orderDayName = day.workdayname+', '+day.workday+'.'+day.workmonth+'.'+day.workyear;
                // console.log('UPDATE ==================> '+finalorder[a].menueId);
                break;
              }
              else if(a == finalorder.length-1) {
                finalorder.push({
                  inst_id: $rootScope.institution,
                  newusr: 'calender',
                  device_id: $rootScope.uuid,
                  getset: 1,
                  menueId: checkedOrder[i].menue_id,
                  menueName: checkedOrder[i].menue_name,
                  menueCost: checkedOrder[i].menue_cost,
                  menueDesc: checkedOrder[i].menue_desc,
                  workerId: order_bs.workerId,
                  workerName: order_bs.workerName,
                  workerPic: order_bs.workerPic,
                  workerProfession: order_bs.workerProfession,
                  orderHour: timezoneSub(order_bs.orderHour),
                  orderHourName: order_bs.orderHourName,
                  orderDayName: order_bs.orderDayName,
                  ordercats: order_bs.ordercats,
                  ordgood: order_bs.ordgood,
                  name: '',
                  phone: '',
                  email: '',
                  comments: '',
                  reminder: '',
                  smsconf: ''
                });

                // console.log('INSERT ==================> '+checkedOrder[i].menue_id);

              }

            }
          }
          else {
            finalorder.push({
              inst_id: $rootScope.institution,
              newusr: 'calender',
              device_id: $rootScope.uuid,
              getset: 1,
              menueId: checkedOrder[i].menue_id,
              menueName: checkedOrder[i].menue_name,
              menueCost: checkedOrder[i].menue_cost,
              menueDesc: checkedOrder[i].menue_desc,
              workerId: order_bs.workerId,
              workerName: order_bs.workerName,
              workerPic: order_bs.workerPic,
              workerProfession: order_bs.workerProfession,
              orderHour: timezoneSub(order_bs.orderHour),
              orderHourName: order_bs.orderHourName,
              orderDayName: order_bs.orderDayName,
              ordercats: order_bs.ordercats,
              ordgood: order_bs.ordgood,
              name: '',
              phone: '',
              email: '',
              comments: '',
              reminder: '',
              smsconf: ''
            });
            // console.log('INSERT 2 ==================> '+checkedOrder[i].menue_id);
          }

        }
        // console.log('==================----------------> '+JSON.stringify(finalorder));
      }

    },
    // BS
    setBSOrder: function(name, phone, email, comments, reminder) {
      if(finalorder.length>0) {
        for(var i=0;i<finalorder.length;i++) {
          finalorder[i].name = name;
          finalorder[i].phone = phone;
          finalorder[i].email = email;
          finalorder[i].comments = comments;
          finalorder[i].reminder = reminder;
        }
      }
    },
    // BS
    setBSSMSconf: function(smsconf) {
      order_bs.smsconf = parseInt(smsconf);
    },
    // BS
    getBSOrder: function() {
      // console.log(JSON.stringify(finalorder))
      return finalorder;
    },
    // BS
    emptyBSOrder: function() {

      order_bs = {
        inst_id: $rootScope.institution,
        newusr: 'calender',
        device_id: $rootScope.uuid,
        getset: 1,
        menueId: '',
        menueName: '',
        menueCost: '',
        workerId: '',
        workerName: '',
        workerPic: '',
        workerProfession: '',
        orderHour: '',
        orderHourName: '',
        orderDayName: '',
        ordercats: '',
        ordgood: '',
        name: '',
        phone: '',
        email: '',
        comments: '',
        reminder: '',
        smsconf: ''
      }

      // BS
      finalorder = [];

      // BS
      checkedOrder = [];

    }
  }

})

.factory('FifthGift', function($rootScope, $cordovaSQLite) {

  return {
    all: function(myid) {
      var fifth = 0;
      var queryFifth = "SELECT * FROM points WHERE points_user = ? AND points_comment = '13' AND points_del = '0' ORDER BY points_id DESC LIMIT 5";
      return $cordovaSQLite.execute($rootScope.db, queryFifth, [myid]).then(function(suc) {
          if(suc.rows.length > 0) {
            for(var i=0;i<suc.rows.length;i++) {
              if(suc.rows.item(i).points_got_spend == 1) {
                return fifth;
              }
              else {
                fifth++;
              }
            }
            return fifth;
          }
          else {
            return fifth;
          }
      }, function() {});
    }
  };

})

.factory('Share', function($rootScope, $http) {

  return {
    send: function(social) {
      var sendstr = {
        device: $rootScope.model,
        device_id: $rootScope.uuid,
        device_version: $rootScope.version,
        device_os: $rootScope.platform,
        inst_id: $rootScope.institution,
        social: social,
        newusr: 'share'
      }
      sendstr = JSON.stringify(sendstr);
      return $http.post($rootScope.generalscript, sendstr).then(function(suc) {

        var data = suc.data;

        return 1;

      }, function(er) {
        return 0;
      });

    }
  };
})

.factory('Org', function($rootScope, $cordovaSQLite) {
  
  var org = [];

  return {
    check: function() {
      if(org.length == 0) {return false;} else {return true;}
    },
    all: function() {
      return org;
    },
    get: function(orgId) {
      for (var i = 0; i < org.length; i++) {
        if (org[i].org_id === parseInt(orgId)) {
          return org[i];
        }
      }
      return null;
    },
    getorgnew: function() {
      org = [];
      var orgSel = "SELECT * FROM organizations WHERE org_del = ?";
      return $cordovaSQLite.execute($rootScope.db, orgSel, ['0']).then(function(suc) {
        if(suc.rows.length > 0) {
          for(var i=0;i<suc.rows.length;i++) {
            org.push(suc.rows.item(i));
          }
          return org;
        }
        else {
          return org;
        }
      }, function(er) {});
    },
    getorgold: function() {
      return org;
    }
  };
})

.factory('timezoneAdd', function() {

  // CHECK TIMEZONE (ARGUMENTS ACCEPTING: SECONDS, MILLISECONDS, NOTHING)

  return {
    get: function(thetime) {
      if(thetime) {
        var thetime = parseInt(thetime);
        var tzoff = new Date().getTimezoneOffset();
        var nsec = tzoff*60*1000;
        var serverzone = 3*60*60*1000;
        var timediff = nsec+serverzone;
        return thetime + timediff;
      }
      else {
        var tzoff = new Date().getTimezoneOffset();
        var nsec = tzoff*60*1000;
        var serverzone = 3*60*60*1000;
        var timediff = nsec+serverzone;
        return timediff;
      }
    }
  };
})

.factory('timezoneSub', function() {

  // CHECK TIMEZONE (ARGUMENTS ACCEPTING: SECONDS, MILLISECONDS, NOTHING)

  return {
    get: function(thetime) {
      if(thetime) {
        var thetime = parseInt(thetime);
        var tzoff = new Date().getTimezoneOffset();
        var nsec = tzoff*60*1000;
        var serverzone = 3*60*60*1000;
        var timediff = nsec+serverzone;
        return thetime - timediff;
      }
      else {
        var tzoff = new Date().getTimezoneOffset();
        var nsec = tzoff*60*1000;
        var serverzone = 3*60*60*1000;
        var timediff = nsec+serverzone;
        return timediff;
      }
    }
  };
})

.factory('ServerTime', function() {

  var servertime = 1488041121;

  return {
    get: function() {
      return servertime;
    }
  };
})

.factory('HtmlEnt', function() {

  return {
    decodeEntities: function(str) {
      var element = document.getElementById('htmlentitydecodediv');
      if(str && typeof str === 'string' && str !== null) {
        // strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
      }
      return str;
    }
  }

})

;
