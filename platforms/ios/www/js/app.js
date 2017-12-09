angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ionic.rating', 'ionic-datepicker', 'ngIOS9UIWebViewPatch', 'pascalprecht.translate', 'ja.qr', 'ionic-cache-src', 'ion-datetime-picker', 'ion-autocomplete'])

.run(function($ionicPlatform, $state, $cordovaSQLite, $http, $cordovaDevice, $timeout, $rootScope, $cordovaPushV5, $ionicSlideBoxDelegate, $ionicConfig, $cordovaFile, $window, $ionicHistory, $ionicPopup, $localStorage, $ionicLoading) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      // cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if (ionic.Platform.grade.toLowerCase()!='a') {
        $ionicConfig.views.transition('none');
    }

    var testing = false;

    $rootScope.db;

    $rootScope.uuid = $cordovaDevice.getUUID();
    $rootScope.model = $cordovaDevice.getModel();
    $rootScope.platform = $cordovaDevice.getPlatform();
    $rootScope.version = $cordovaDevice.getVersion();

    if($rootScope.platform == 'Android') {
      // Works on Android
      $rootScope.db = $cordovaSQLite.openDB({name: "theone.db", iosDatabaseLocation: 'default'});
    }
    else if($rootScope.platform == 'iOS') {
      // Works on iOS 
      $rootScope.db = $cordovaSQLite.openDB({name: "theone.db", location: 2, createFromLocation: 1});
    }

    $rootScope.institution = 6;
    $rootScope.inst_dir = 'myapp';
    var gcm_android = '597748602860';

    $rootScope.generalscript = 'http://www.olegtronics.com/appscripts/getappdata.php';
    var pushgotlink = 'http://www.olegtronics.com/admin/coms/pushgot.php';

    $rootScope.appName = 'MyCompany';
    $rootScope.iosLink = 'https://play.google.com/store/apps/details?id=com.olegtronics.companyapp';
    $rootScope.androidLink = 'https://play.google.com/store/apps/details?id=com.olegtronics.companyapp';
    $rootScope.companyicon = 'http://www.olegtronics.com/admin/img/icons/mania.png';

    $rootScope.smallscreen = ((window.innerHeight <= 480) ? true : false);

    $rootScope.intconnect = true;
    $rootScope.intconnectupd = true;

    $rootScope.firststart = 0;

    var points = 0;
    var wallet = 0;
    var goods = 0;
    var cat = 0;
    var menue = 0;
    var ingrs = 0;
    var news = 0;
    var revs = 0;
    var asks = 0;
    var gifts = 0;
    var chat = 1;
    var order = 0;
    var room = 0;
    var waves = 0;

    var fifthgift = 0;
    var reservs = 0;
    var organization = 0;

    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-positive"></ion-spinner>',
      duration: 0,
      animation: 'fade-in'
    }).then(function(){
      // console.log("The loading indicator is now displayed");
    });

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function ifNotExists(tablename, columnname, columntype, defaultvalue) {
      // FOR OLDER VERSION OF APP - ADD SOME NEW MENUE COLUMNS
      var queryAlter = "SELECT * FROM "+tablename+" WHERE "+columnname+"=?";
      $cordovaSQLite.execute($rootScope.db, queryAlter, [0]).then(function(suc) {}, function(er) {

          var queryAdd = "ALTER TABLE "+tablename+" ADD COLUMN "+columnname+" "+columntype;
          $cordovaSQLite.execute($rootScope.db, queryAdd, []).then(function() {

            // alert('added')

            var queryUpd = "UPDATE "+tablename+" SET "+columnname+"="+defaultvalue;
            $cordovaSQLite.execute($rootScope.db, queryUpd, []).then(function() {
              // alert('updated')
            }, function(er) {
              // alert('not updated '+JSON.stringify(er))
            });

          }, function(error) {
            // alert(JSON.stringify(error))
          });

      });
    }

    $rootScope.getCalender = function(data) {
      
      var dataorders = data;

			// DB ORDER
			var orderArr = dataorders[0].ordersArr;
			if(orderArr.length > 0) {

			  var id = 0;
        
				function orderArrFuncIns(id) {

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
					var order_room = orderArr[id]['order_room'];
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
							var orderingUpd = "UPDATE ordering SET order_user=?, order_user_name_phone=?, order_user_surname_phone=?, order_user_middlename_phone=?, order_user_adress_phone=?, order_user_comment_phone=?, order_name=?, order_name_phone=?, order_user_phone_phone=?, order_user_email_phone=?, order_desc=?, order_worker=?, order_worker_name_phone=?, order_worker_pic_phone=?, order_worker_profession_phone=?, order_reminder_phone=?, order_institution=?, order_office=?, order_room=?, order_bill=?, order_goods=?, order_cats=?, order_order=?, order_status=?,  order_start=?, order_start_name_phone=?, order_end=?, order_allday=?, order_mobile_confirm=?, order_mobile=?, order_when=?, order_del=? WHERE order_id=?";
							$cordovaSQLite.execute($rootScope.db, orderingUpd, [order_user, order_user_name_phone, order_user_surname_phone, order_user_middlename_phone, order_user_adress_phone, order_user_comment_phone, order_name, order_name_phone, order_user_phone_phone, order_user_email_phone, order_desc, order_worker, order_worker_name_phone, order_worker_pic_phone, order_worker_profession_phone, order_reminder_phone, order_institution, order_office, order_room, order_bill, order_goods, order_cats, order_order, order_status, order_start, order_start_name_phone, order_end, order_allday, order_mobile_confirm, order_mobile, order_when, order_del, order_id]).then(function() {
							  id++;
							  if(id < orderArr.length) {
								orderArrFuncIns(id);
							  }
							}, function() {});

						}
						else {

							var orderIns = "INSERT INTO ordering (order_id, order_user, order_user_name_phone, order_user_surname_phone, order_user_middlename_phone, order_user_adress_phone, order_user_comment_phone, order_name, order_name_phone, order_user_phone_phone, order_user_email_phone, order_desc, order_worker, order_worker_name_phone, order_worker_pic_phone, order_worker_profession_phone, order_reminder_phone, order_institution, order_office, order_room, order_bill, order_goods, order_cats, order_order, order_status, order_start, order_start_name_phone, order_end, order_allday, order_mobile_confirm, order_mobile, order_when, order_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
							$cordovaSQLite.execute($rootScope.db, orderIns, [order_id, order_user, order_user_name_phone, order_user_surname_phone, order_user_middlename_phone, order_user_adress_phone, order_user_comment_phone, order_name, order_name_phone, order_user_phone_phone, order_user_email_phone, order_desc, order_worker, order_worker_name_phone, order_worker_pic_phone, order_worker_profession_phone, order_reminder_phone, order_institution, order_office, order_room, order_bill, order_goods, order_cats, order_order, order_status, order_start, order_start_name_phone, order_end, order_allday, order_mobile_confirm, order_mobile, order_when, order_del]).then(function(ins) {
							  id++;
							  if(id < orderArr.length) {
								orderArrFuncIns(id);
							  }
							}, function() {});

						}
					}, function() {});

				};
				orderArrFuncIns(0);

			}

			$timeout(function() {

				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				
        $ionicLoading.hide().then(function(){
          // $cordovaSplashscreen.hide();
          $state.go('tab.card');
        });

			}, 2000);
		  
		};
		
		$rootScope.getWaiter = function(data) {
			
			var dataworkers = data;

			// DB WAITERS
			var usrArr = dataworkers[0].usrArr;
			if(usrArr.length > 0) {

				var id = 0;

				function usrArrFunc(id) {

				  var user_id = usrArr[id]['user_id'];
				  var user_name = usrArr[id]['user_name'];
				  var user_surname = usrArr[id]['user_surname'];
				  var user_middlename = usrArr[id]['user_middlename'];
				  var user_mob = usrArr[id]['user_mob'];
				  var user_work_pos = usrArr[id]['user_work_pos'];
				  var user_menue_exe = usrArr[id]['user_menue_exe'];
				  var user_pic = usrArr[id]['user_pic'];
				  var user_gender = usrArr[id]['user_gender'];
				  var user_institution = usrArr[id]['user_institution'];
          var user_office = usrArr[id]['user_office'];
				  var user_reg = usrArr[id]['user_reg'];
				  var user_del = usrArr[id]['user_del'];

				  var queryWaiters = "SELECT * FROM users WHERE user_real_id = ?";
				  $cordovaSQLite.execute($rootScope.db, queryWaiters, [user_id]).then(function(suc) {

						if(suc.rows.length > 0) {
							// DB WAITERS
							var usrUpd = "UPDATE users SET user_name=?, user_surname=?, user_middlename=?, user_mob=?, user_work_pos=?, user_menue_exe=?, user_pic=?, user_gender=?, user_institution=?, user_office=?, user_reg=?, user_del=? WHERE user_real_id=?";
							$cordovaSQLite.execute($rootScope.db, usrUpd, [user_name, user_surname, user_middlename, user_mob, user_work_pos, user_menue_exe, user_pic, user_gender, user_institution, user_office, user_reg, user_del, user_id]).then(function() {
							  id++;
							  if(id < usrArr.length) {
							  usrArrFunc(id);
							  }
							}, function() {});
						}
						else {
							// DB WAITERS
							var usrIns = "INSERT INTO users (user_real_id, user_name, user_surname, user_middlename, user_mob, user_work_pos, user_menue_exe, user_pic, user_gender, user_institution, user_office, user_reg, user_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
							$cordovaSQLite.execute($rootScope.db, usrIns, [user_id, user_name, user_surname, user_middlename, user_mob, user_work_pos, user_menue_exe, user_pic, user_gender, user_institution, user_office, user_reg, user_del]).then(function() {
							  // alert('ins ok')
							  id++;
							  if(id < usrArr.length) {
							  usrArrFunc(id);
							  }
							}, function() {});
						}

				  }, function() {});

				}
				usrArrFunc(0);

			}

			// DB PROFESSIONS
			var profArr = dataworkers[0].profArr;
			if(profArr.length > 0) {

				var id = 0;

				function profArrFunc(id) {

				  var prof_id = profArr[id]['prof_id'];
				  var prof_name = profArr[id]['prof_name'];
				  var prof_desc = profArr[id]['prof_desc'];
				  var prof_institution = profArr[id]['prof_institution'];
				  var prof_when = profArr[id]['prof_when'];
				  var prof_del = profArr[id]['prof_del'];

				  var queryProfs = "SELECT * FROM professions WHERE prof_id = ?";
				  $cordovaSQLite.execute($rootScope.db, queryProfs, [prof_id]).then(function(suc) {
					if(suc.rows.length > 0) {
					// DB PROFESSIONS
					var profUpd = "UPDATE professions SET prof_name=?, prof_desc=?, prof_institution=?, prof_when=?, prof_del=? WHERE prof_id=?";
					$cordovaSQLite.execute($rootScope.db, profUpd, [prof_name, prof_desc, prof_institution, prof_when, prof_del, prof_id]).then(function() {
					  // alert('upd ok')
					  id++;
					  if(id < profArr.length) {
					  profArrFunc(id);
					  }
					}, function() {});
					}
					else {
					// DB PROFESSIONS
					var profIns = "INSERT INTO professions (prof_id, prof_name, prof_desc, prof_institution, prof_when, prof_del) VALUES (?,?,?,?,?,?)";
					$cordovaSQLite.execute($rootScope.db, profIns, [prof_id, prof_name, prof_desc, prof_institution, prof_when, prof_del]).then(function() {
					  // alert('ins ok')
					  id++;
					  if(id < profArr.length) {
					  profArrFunc(id);
					  }
					}, function() {});
					}
				  }, function() {});

				}
				profArrFunc(0);

			}

			// DB OFFICE
			var offArr = dataworkers[0].offArr;
			if(offArr.length > 0) {

				var id = 0;

				function offArrFunc(id) {

				  var office_id = offArr[id]['office_id'];
				  var office_name = offArr[id]['office_name'];
				  var office_start = offArr[id]['office_start'];
				  var office_stop = offArr[id]['office_stop'];
				  var office_bus_hours = offArr[id]['office_bus_hours'];
				  var office_country = offArr[id]['office_country'];
				  var office_city = offArr[id]['office_city'];
				  var office_adress = offArr[id]['office_adress'];
				  var office_lat = offArr[id]['office_lat'];
				  var office_lon = offArr[id]['office_lon'];
				  var office_desc = offArr[id]['office_desc'];
				  var office_timezone = offArr[id]['office_timezone'];
				  var office_tel = offArr[id]['office_tel'];
				  var office_tel_n = offArr[id]['office_tel_n'];
				  var office_fax = offArr[id]['office_fax'];
				  var office_mob = offArr[id]['office_mob'];
				  var office_email = offArr[id]['office_email'];
				  var office_orders = offArr[id]['office_orders'];
				  var office_skype = offArr[id]['office_skype'];
				  var office_site = offArr[id]['office_site'];
				  var office_logo = offArr[id]['office_logo'];
				  var office_institution = offArr[id]['office_institution'];
				  var office_del = offArr[id]['office_del'];

				  var queryOffice = "SELECT * FROM organizations_office WHERE office_id = ?";
				  $cordovaSQLite.execute($rootScope.db, queryOffice, [office_id]).then(function(suc) {
					if(suc.rows.length > 0) {
            // DB OFFICE
            var officeUpd = "UPDATE organizations_office SET office_name=?, office_start=?, office_stop=?, office_bus_hours=?, office_country=?, office_city=?, office_adress=?, office_lat=?, office_lon=?, office_desc=?, office_timezone=?, office_tel=?, office_tel_n=?, office_fax=?, office_mob=?, office_email=?, office_orders=?, office_skype=?, office_site=?, office_logo=?, office_institution=?, office_del=? WHERE office_id=?";
            $cordovaSQLite.execute($rootScope.db, officeUpd, [office_name, office_start, office_stop, office_bus_hours, office_country, office_city, office_adress, office_lat, office_lon, office_desc, office_timezone, office_tel, office_tel_n, office_fax, office_mob, office_email, office_orders, office_skype, office_site, office_logo, office_institution, office_del, office_id]).then(function() {
              // alert('upd ok')
              id++;
              if(id < offArr.length) {
              offArrFunc(id);
              }
            }, function() {});
					}
					else {
            // DB OFFICE
            var officeIns = "INSERT INTO organizations_office (office_id, office_name, office_start, office_stop, office_bus_hours, office_country, office_city, office_adress, office_lat, office_lon, office_desc, office_timezone, office_tel, office_tel_n, office_fax, office_mob, office_email, office_orders, office_skype, office_site, office_logo, office_institution, office_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            $cordovaSQLite.execute($rootScope.db, officeIns, [office_id, office_name, office_start, office_stop, office_bus_hours, office_country, office_city, office_adress, office_lat, office_lon, office_desc, office_timezone, office_tel, office_tel_n, office_fax, office_mob, office_email, office_orders, office_skype, office_site, office_logo, office_institution, office_del]).then(function() {
              // alert('ins ok')
              id++;
              if(id < offArr.length) {
              offArrFunc(id);
              }
            }, function() {});
					}
				  }, function() {});

				}
				offArrFunc(0);

			}

			// DB SCHEDULE
			var schArr = dataworkers[0].schArr;
			if(schArr.length > 0) {

				var id = 0;

				function schArrFunc(id) {

				  var schedule_id = schArr[id]['schedule_id'];
				  var schedule_employee = schArr[id]['schedule_employee'];
				  var schedule_menue = schArr[id]['schedule_menue'];
				  var schedule_office = schArr[id]['schedule_office'];
				  var schedule_start = schArr[id]['schedule_start'];
				  var schedule_stop = schArr[id]['schedule_stop'];
				  var schedule_institution = schArr[id]['schedule_institution'];
				  var schedule_when = schArr[id]['schedule_when'];
				  var schedule_del = schArr[id]['schedule_del'];

				  var querySchedule = "SELECT * FROM schedule WHERE schedule_id = ?";
				  $cordovaSQLite.execute($rootScope.db, querySchedule, [schedule_id]).then(function(suc) {
					if(suc.rows.length > 0) {
					// DB SCHEDULE
					var scheduleUpd = "UPDATE schedule SET schedule_employee=?, schedule_menue=?, schedule_office=?, schedule_start=?, schedule_stop=?, schedule_institution=?, schedule_when=?, schedule_del=? WHERE schedule_id=?";
					$cordovaSQLite.execute($rootScope.db, scheduleUpd, [schedule_employee, schedule_menue, schedule_office, schedule_start, schedule_stop, schedule_institution, schedule_when, schedule_del, schedule_id]).then(function() {
					  // alert('upd ok')
					  id++;
					  if(id < schArr.length) {
					  schArrFunc(id);
					  }
					}, function() {});
					}
					else {
					// DB SCHEDULE
					var scheduleIns = "INSERT INTO schedule (schedule_id, schedule_employee, schedule_menue, schedule_office, schedule_start, schedule_stop, schedule_institution, schedule_when, schedule_del) VALUES (?,?,?,?,?,?,?,?,?)";
					$cordovaSQLite.execute($rootScope.db, scheduleIns, [schedule_id, schedule_employee, schedule_menue, schedule_office, schedule_start, schedule_stop, schedule_institution, schedule_when, schedule_del]).then(function() {
					  // alert('ins ok')
					  id++;
					  if(id < schArr.length) {
					  schArrFunc(id);
					  }
					}, function() {});
					}
				  }, function() {});

				}
				schArrFunc(0);

      }
      
      // DB ROOMS
      var roomArr = dataworkers[0].roomArr;
      if(roomArr.length > 0) {

        var id = 0;

        function roomArrFunc(id) {

          var room_id = roomArr[id]['room_id'];
          var room_name = offArr[id]['room_name'];
          var room_desc = offArr[id]['room_desc'];
          var room_employee = offArr[id]['room_employee'];
          var room_menue_exe = offArr[id]['room_menue_exe'];
          var room_priority = offArr[id]['room_priority'];
          var room_institution = offArr[id]['room_institution'];
          var room_office = offArr[id]['room_office'];
          var room_upd = offArr[id]['room_upd'];
          var room_when = offArr[id]['room_when'];

          var queryRooms = "SELECT * FROM rooms WHERE room_id = ?";
          $cordovaSQLite.execute($rootScope.db, queryRooms, [room_id]).then(function(suc) {
          if(suc.rows.length > 0) {
            // DB ROOMS
            var roomUpd = "UPDATE rooms SET room_name=?, room_desc=?, room_employee=?, room_menue_exe=?, room_priority=?, room_institution=?, room_office=?, room_upd=?, room_when=?, room_del=? WHERE room_id=?";
            $cordovaSQLite.execute($rootScope.db, roomUpd, [room_name, room_desc, room_employee, room_menue_exe, room_priority, room_institution, room_office, room_upd, room_when, room_del, room_id]).then(function() {
              // alert('upd ok')
              id++;
              if(id < roomArr.length) {
              offArrFunc(id);
              }
            }, function() {});
          }
          else {
            // DB ROOMS
            var roomIns = "INSERT INTO rooms (room_id, room_name, room_desc, room_employee, room_menue_exe, room_priority, room_institution, room_office, room_upd, room_when, room_del) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            $cordovaSQLite.execute($rootScope.db, roomIns, [room_id, room_name, room_desc, room_employee, room_menue_exe, room_priority, room_institution, room_office, room_upd, room_when, room_del]).then(function() {
              // alert('ins ok')
              id++;
              if(id < roomArr.length) {
              roomArrFunc(id);
              }
            }, function() {});
          }
          }, function() {});

        }
        roomArrFunc(0);

      }

			var calendstr = JSON.stringify({
			  device: $rootScope.model,
				device_id: $rootScope.uuid,
				device_version: $rootScope.version,
				device_os: $rootScope.platform,
				inst_id: $rootScope.institution,
				newusr: 'calender'
			});
			  
			$http.post($rootScope.generalscript, calendstr).then(function(calendsuc) {

				var calenddata = calendsuc.data;
				$rootScope.getCalender(calenddata);

			}, 
			function(er) {
				// alert('error Calendar: '+JSON.stringify(er));
			});
			  
		};
		
		$rootScope.getNew = function(data) {
			
			// DB USER
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS users (user_id integer primary key, user_real_id integer, user_name text, user_surname text, user_middlename text, user_email text, user_email_confirm text, user_pwd text, user_tel integer, user_mob_confirm text, user_mob integer, user_work_pos integer, user_menue_exe text, user_institution integer, user_office integer, user_pic text, user_gender integer, user_birthday text, user_country integer, user_region integer, user_city integer, user_adress text, user_install_where integer, user_log_key text, user_gcm text, user_device text, user_device_id text, user_device_version text, user_device_os text, user_discount text, user_promo integer, user_conf_req integer, user_log integer, user_upd integer, user_reg integer, user_del integer)").then(function() {

        if(data[0].newusr == '1') {

          var user_id = data[0].usrData['user_id'];
          var user_name = data[0].usrData['user_name'];
          var user_surname = data[0].usrData['user_surname'];
          var user_middlename = data[0].usrData['user_middlename'];
          var user_email = data[0].usrData['user_email'];
          var user_email_confirm = data[0].usrData['user_email_confirm'];
          var user_pwd = data[0].usrData['user_pwd'];
          var user_tel = data[0].usrData['user_tel'];
          var user_mob_confirm = data[0].usrData['user_mob_confirm'];
          var user_mob = data[0].usrData['user_mob'];
          var user_work_pos = data[0].usrData['user_work_pos'];
          var user_menue_exe = data[0].usrData['user_menue_exe'];
          var user_institution = data[0].usrData['user_institution'];
          var user_office = data[0].usrData['user_office'];
          var user_pic = data[0].usrData['user_pic'];
          var user_gender = data[0].usrData['user_gender'];
          var user_birthday = data[0].usrData['user_birthday'];
          var user_country = data[0].usrData['user_country'];
          var user_region = data[0].usrData['user_region'];
          var user_city = data[0].usrData['user_city'];
          var user_adress = data[0].usrData['user_adress'];
          var user_install_where = data[0].usrData['user_install_where'];
          var user_log_key = data[0].usrData['user_log_key'];
          var user_gcm = data[0].usrData['user_gcm'];
          var user_device = data[0].usrData['user_device'];
          var user_device_id = data[0].usrData['user_device_id'];
          var user_device_version = data[0].usrData['user_device_version'];
          var user_device_os = data[0].usrData['user_device_os'];
          var user_discount = data[0].usrData['user_discount'];
          var user_promo = data[0].usrData['user_promo'];
          var user_conf_req = data[0].usrData['user_conf_req'];
          var user_log = data[0].usrData['user_log'];
          var user_upd = data[0].usrData['user_upd'];
          var user_reg = data[0].usrData['user_reg'];
          var user_del = data[0].usrData['user_del'];

          // DB USER
          var usrIns = "INSERT INTO users (user_real_id, user_name, user_surname, user_middlename, user_email, user_email_confirm, user_pwd, user_tel, user_mob_confirm, user_mob, user_work_pos, user_menue_exe, user_institution, user_office, user_pic, user_gender, user_birthday, user_country, user_region, user_city, user_adress, user_install_where, user_log_key, user_gcm, user_device, user_device_id, user_device_version, user_device_os, user_discount, user_promo, user_conf_req, user_log, user_upd, user_reg, user_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          $cordovaSQLite.execute($rootScope.db, usrIns, [user_id, user_name, user_surname, user_middlename, user_email, user_email_confirm, user_pwd, user_tel, user_mob_confirm, user_mob, user_work_pos, user_menue_exe, user_institution, user_office, user_pic, user_gender, user_birthday, user_country, user_region, user_city, user_adress, user_install_where, user_log_key, user_gcm, user_device, user_device_id, user_device_version, user_device_os, user_discount, user_promo, user_conf_req, user_log, user_upd, user_reg, user_del]).then(function() {

            $timeout(function() {
              
              var waiterstr = JSON.stringify({
                inst_id: $rootScope.institution,
                newusr: 'waiter'
              });
                
              $http.post($rootScope.generalscript, waiterstr).then(function(waitsuc) {

                var waitdata = waitsuc.data;
                $rootScope.getWaiter(waitdata);

              }, 
              function(er) {
              });

            }, 2000);

          }, function() {});

        }

		  }, function() {});

		  // DB COUNTRY
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS country (id_country integer primary key, name text, country_del integer)").then(function() {}, function() {});

		  // DB REGION
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS region (id_region integer primary key, id_country integer, name text, region_del integer)").then(function() {}, function() {});

		  // DB CITY
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS city (id_city integer primary key, id_region integer, id_country integer, name text, city_del integer)").then(function() {}, function() {});

		  // DB POINTS
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS points (points_id integer primary key, points_user integer, points_bill integer, points_discount integer, points_points integer, points_got_spend integer, points_waiter integer, points_institution integer, points_office integer,points_status integer, points_comment integer, points_proofed integer, points_gift integer, points_check integer, points_waitertime integer, points_usertime integer, points_when integer, points_time integer, points_del integer)").then(function() {

		  	if(data[0].newusr == '1') {

				  	// DB POINTS
					var pointsArr = data[0].pointsArr;
          
					if(pointsArr.length > 0) {

					  var id = 0;

					  function pointsArrFuncIns(id) {

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

              var pointsIns = "INSERT INTO points (points_id, points_user, points_bill, points_discount, points_points, points_got_spend, points_waiter, points_institution, points_office, points_status, points_comment, points_proofed, points_gift, points_check, points_waitertime, points_usertime, points_when, points_time, points_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
              $cordovaSQLite.execute($rootScope.db, pointsIns, [points_id, points_user, points_bill, points_discount, points_points, points_got_spend, points_waiter, points_institution, points_office, points_status, points_comment, points_proofed, points_gift, points_check, points_waitertime, points_usertime, points_when, points_time, points_del]).then(function() {
                id++;
                if(id < pointsArr.length) {
                  pointsArrFuncIns(id);
                }
              }, function() {});

					  }
					  pointsArrFuncIns(0);

					}

				}

		  }, function() {});

		  // DB WALLET
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS wallet (wallet_id integer primary key, wallet_user integer, wallet_institution integer, wallet_total integer, wallet_warn integer, wallet_when integer, wallet_del integer)").then(function() {
			  if(data[0].newusr == '1') {
			  		// DB WALLET
					var walletArr = data[0].walletArr;

					if(walletArr.length > 0) {

					  var wallet_user = data[0].walletArr[0]['wallet_user'];
					  var wallet_institution = data[0].walletArr[0]['wallet_institution'];
					  var wallet_total = data[0].walletArr[0]['wallet_total'];
					  var wallet_warn = data[0].walletArr[0]['wallet_warn'];
					  var wallet_when = data[0].walletArr[0]['wallet_when'];
					  var wallet_del = data[0].walletArr[0]['wallet_del'];

					  var walletIns = "INSERT INTO wallet (wallet_user, wallet_institution, wallet_total, wallet_warn, wallet_when, wallet_del) VALUES (?,?,?,?,?,?)";
					  $cordovaSQLite.execute($rootScope.db, walletIns, [wallet_user, wallet_institution, wallet_total, wallet_warn, wallet_when, wallet_del]).then(function() {}, function() {});

					}
			  }
		  }, function() {});

		  // DB GOODS
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS goods (goods_id integer primary key, goods_name text, goods_desc text, goods_pic text, goods_type integer, goods_institution integer, goods_when integer, goods_del integer)").then(function() {
        if(data[0].newusr == '1') {
          // DB GOODS
          var goodsArr = data[0].goodsArr;

          if(goodsArr.length > 0) {

            var id = 0;

            function goodsArrFuncIns(id) {

              var goods_id = goodsArr[id]['goods_id'];
              var goods_when = goodsArr[id]['goods_when'];
              var goods_name = goodsArr[id]['goods_name'];
              var goods_desc = goodsArr[id]['goods_desc'];
              var goods_pic = goodsArr[id]['goods_pic'];
              var goods_type = goodsArr[id]['goods_type'];
              var goods_institution = goodsArr[id]['goods_institution'];
              var goods_del = goodsArr[id]['goods_del'];

              var goodsIns = "INSERT INTO goods (goods_id, goods_name, goods_desc, goods_pic, goods_type, goods_institution, goods_when, goods_del) VALUES (?,?,?,?,?,?,?,?)";
              $cordovaSQLite.execute($rootScope.db, goodsIns, [goods_id, goods_name, goods_desc, goods_pic, goods_type, goods_institution, goods_when, goods_del]).then(function() {
                id++;
                if(id < goodsArr.length) {
                  goodsArrFuncIns(id);
                }
              }, function() {});

            }
            goodsArrFuncIns(0);

          }
        }
		  }, function() {});

		  // DB CATEGORIES
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS categories (cat_id integer primary key, cat_xid text, cat_name text, cat_desc text, cat_pic text, cat_ingr integer, cat_order integer, cat_institution integer, cat_when integer, cat_del integer)").then(function() {
			  	if(data[0].newusr == '1') {
			  		// DB CATEGORIES
            var catArr = data[0].catArr;

            if(catArr.length > 0) {

              var id = 0;

              function catArrFuncIns(id) {

                var cat_id = catArr[id]['cat_id'];
                var cat_xid = catArr[id]['cat_xid'];
                var cat_name = catArr[id]['cat_name'];
                var cat_desc = catArr[id]['cat_desc'];
                var cat_pic = catArr[id]['cat_pic'];
                var cat_ingr = catArr[id]['cat_ingr'];
                var cat_order = catArr[id]['cat_order'];
                var cat_institution = catArr[id]['cat_institution'];
                var cat_when = catArr[id]['cat_when'];
                var cat_del = catArr[id]['cat_del'];

                var catsIns = "INSERT INTO categories (cat_id, cat_xid, cat_name, cat_desc, cat_pic, cat_ingr, cat_order, cat_institution, cat_when, cat_del) VALUES (?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, catsIns, [cat_id, cat_xid, cat_name, cat_desc, cat_pic, cat_ingr, cat_order, cat_institution, cat_when, cat_del]).then(function() {
                  id++;
                  if(id < catArr.length) {
                    catArrFuncIns(id);
                  }
                }, function() {});

              }
              catArrFuncIns(0);

            }
			  	}
		  }, function() {});

		  // DB MENUE
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS menue (menue_id integer primary key, menue_xid text, menue_cat_xid text, menue_cat integer, menue_name text, menue_desc text, menue_size integer, menue_cost integer, menue_costs text, menue_ingr text, menue_addition text, menue_addition_auto integer, menue_package text, menue_weight integer, menue_interval integer, menue_discount integer, menue_action text, menue_code text, menue_pic text, menue_institution integer, menue_when integer, menue_del integer)").then(function() {
        if(data[0].newusr == '1') {
          // DB MENU
          var menueArr = data[0].menueArr;
          
          if(menueArr.length > 0) {

            var id = 0;

            function menueArrFuncIns(id) {

              var menue_id = menueArr[id]['menue_id'];
              var menue_xid = menueArr[id]['menue_xid'];
              var menue_cat_xid = menueArr[id]['menue_cat_xid'];
              var menue_cat = menueArr[id]['menue_cat'];
              var menue_name = menueArr[id]['menue_name'];
              var menue_desc = menueArr[id]['menue_desc'];
              var menue_size = menueArr[id]['menue_size'];
              var menue_cost = menueArr[id]['menue_cost'];
              var menue_costs = menueArr[id]['menue_costs'];
              var menue_ingr = menueArr[id]['menue_ingr'];
              var menue_addition = menueArr[id]['menue_addition'];
              var menue_addition_auto = menueArr[id]['menue_addition_auto'];
              var menue_package = menueArr[id]['menue_package'];
              var menue_weight = menueArr[id]['menue_weight'];
              var menue_interval = menueArr[id]['menue_interval'];
              var menue_discount = menueArr[id]['menue_discount'];
              var menue_action = menueArr[id]['menue_action'];
              var menue_code = menueArr[id]['menue_code'];
              var menue_pic = menueArr[id]['menue_pic'];
              var menue_institution = menueArr[id]['menue_institution'];
              var menue_when = menueArr[id]['menue_when'];
              var menue_del = menueArr[id]['menue_del'];

              var menueIns = "INSERT INTO menue (menue_id, menue_xid, menue_cat_xid, menue_cat, menue_name, menue_desc, menue_size, menue_cost, menue_costs, menue_ingr, menue_addition, menue_addition_auto, menue_package, menue_weight, menue_interval, menue_discount, menue_action, menue_code, menue_pic, menue_institution, menue_when, menue_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
              $cordovaSQLite.execute($rootScope.db, menueIns, [menue_id, menue_xid, menue_cat_xid, menue_cat, menue_name, menue_desc, menue_size, menue_cost, menue_costs, menue_ingr, menue_addition,menue_addition_auto, menue_package, menue_weight, menue_interval, menue_discount, menue_action, menue_code, menue_pic, menue_institution, menue_when, menue_del]).then(function() {
                id++;
                if(id < menueArr.length) {
                  menueArrFuncIns(id);
                }
              }, function() {});

            }
            menueArrFuncIns(0);

          }
			  }
		  }, function() {});
	
		   // DB GIFTS
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS gifts (gifts_id integer primary key, gifts_name text, gifts_desc text, gifts_points integer, gifts_pic text, gifts_institution integer, gifts_when integer, gifts_del integer)").then(function() {
		  		if(data[0].newusr == '1') {
		  			// DB GIFTS
            var giftsArr = data[0].giftsArr;
            
            if(giftsArr.length > 0) {

              var id = 0;

              function giftsArrFuncIns(id) {

                var gifts_id = giftsArr[id]['gifts_id'];
                var gifts_name = giftsArr[id]['gifts_name'];
                var gifts_desc = giftsArr[id]['gifts_desc'];
                var gifts_points = giftsArr[id]['gifts_points'];
                var gifts_pic = giftsArr[id]['gifts_pic'];
                var gifts_institution = giftsArr[id]['gifts_institution'];
                var gifts_when = giftsArr[id]['gifts_when'];
                var gifts_del = giftsArr[id]['gifts_del'];

                var giftsIns = "INSERT INTO gifts (gifts_id, gifts_name, gifts_desc, gifts_points, gifts_pic, gifts_institution, gifts_when, gifts_del) VALUES (?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, giftsIns, [gifts_id, gifts_name, gifts_desc, gifts_points, gifts_pic, gifts_institution, gifts_when, gifts_del]).then(function() {
                  id++;
                  if(id < giftsArr.length) {
                  giftsArrFuncIns(id);
                  }
                }, function() {});

              }
              giftsArrFuncIns(0);

            }
			  	}
		  }, function() {});

		  // DB INGREDIENTS
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS ingredients (ingr_id integer primary key, ingr_xid text, ingr_name text, ingr_desc text, ingr_cat integer, ingr_code text, ingr_pic text, ingr_size integer, ingr_cost integer, ingr_institution integer, ingr_when integer, ingr_del)").then(function() {
		  		if(data[0].newusr == '1') {
		  			// DB INGREDIENTS
            var ingrArr = data[0].ingrArr;

            if(ingrArr.length > 0) {

              var id = 0;

              function ingrArrFuncIns(id) {

                var ingr_id = ingrArr[id]['ingr_id'];
                var ingr_xid = ingrArr[id]['ingr_xid'];
                var ingr_name = ingrArr[id]['ingr_name'];
                var ingr_desc = ingrArr[id]['ingr_desc'];
                var ingr_cat = ingrArr[id]['ingr_cat'];
                var ingr_code = ingrArr[id]['ingr_code'];
                var ingr_pic = ingrArr[id]['ingr_pic'];
                var ingr_size = ingrArr[id]['ingr_size'];
                var ingr_cost = ingrArr[id]['ingr_cost'];
                var ingr_institution = ingrArr[id]['ingr_institution'];
                var ingr_when = ingrArr[id]['ingr_when'];
                var ingr_del = ingrArr[id]['ingr_del'];

                var ingrsIns = "INSERT INTO ingredients (ingr_id, ingr_xid, ingr_name, ingr_desc, ingr_cat, ingr_code, ingr_pic, ingr_size, ingr_cost, ingr_institution, ingr_when, ingr_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, ingrsIns, [ingr_id, ingr_xid, ingr_name, ingr_desc, ingr_cat, ingr_code, ingr_pic, ingr_size, ingr_cost, ingr_institution, ingr_when, ingr_del]).then(function() {
                  id++;
                  if(id < ingrArr.length) {
                  ingrArrFuncIns(id);
                  }
                }, function() {});

              }
              ingrArrFuncIns(0);

            }
			  	}
		  }, function() {});

		  // DB NEWS
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS news (news_id integer primary key, news_name text, news_message text, news_pic text, news_institution integer, news_state integer, news_menue_id integer, news_cost integer, news_user integer, news_used integer, news_begin integer, news_end integer, news_when integer, news_del integer)").then(function() {
		  		if(data[0].newusr == '1') {
		  			// DB NEWS
            var newsArr = data[0].newsArr;

            if(newsArr.length > 0) {

              var id = 0;

              function newsArrFuncIns(id) {

                var news_id = newsArr[id]['news_id'];
                var news_state = newsArr[id]['news_state'];
                var news_menue_id = 0;
                var news_cost = 0;
                var news_user = 0;
                var news_used = 0;
                var news_begin = 0;
                var news_end = 0;
                var news_when = newsArr[id]['news_when'];
                var news_del = newsArr[id]['news_del'];
                var news_name = 0;
                var news_message = 0;
                var news_pic = 0;
                var news_institution = 0;

                if(news_state == '1') {
                  news_name = newsArr[id]['news_name'];
                  news_message = newsArr[id]['news_message'];
                  news_pic = newsArr[id]['news_pic'];
                  news_institution = newsArr[id]['news_institution'];
                  news_menue_id = newsArr[id]['news_menue_id'];
                  news_cost = newsArr[id]['news_cost'];
                  news_user = newsArr[id]['news_user'];
                  news_used = newsArr[id]['news_used'];
                  news_begin = newsArr[id]['news_begin'];
                  news_end = newsArr[id]['news_end'];
                }

                var queryNews = "SELECT * FROM news WHERE news_id = ?";
                $cordovaSQLite.execute($rootScope.db, queryNews, [news_id]).then(function(suc) {
                  if(suc.rows.length > 0) {
                    var newsUpd = "UPDATE news SET news_name=?, news_message=?, news_pic=?, news_institution=?, news_state=?, news_menue_id=?, news_cost=?, news_user=?, news_used=?, news_begin=?, news_end=?, news_when=?, news_del=? WHERE news_id=?";
                    $cordovaSQLite.execute($rootScope.db, newsUpd, [news_name, news_message, news_pic, news_institution, news_state, news_menue_id, news_cost, news_user, news_used, news_begin, news_end, news_when, news_del, news_id]).then(function() {
                      id++;
                      if(id < newsArr.length) {
                      newsArrFuncIns(id);
                      }
                    }, function() {});
                  }
                  else {
                    var newsIns = "INSERT INTO news (news_id, news_name, news_message, news_pic, news_institution, news_state, news_menue_id, news_cost, news_user, news_used, news_begin, news_end, news_when, news_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    $cordovaSQLite.execute($rootScope.db, newsIns, [news_id, news_name, news_message, news_pic, news_institution, news_state, news_menue_id, news_cost, news_user, news_used, news_begin, news_end, news_when, news_del]).then(function() {
                      id++;
                      if(id < newsArr.length) {
                      newsArrFuncIns(id);
                      }
                    }, function() {});
                  }
                }, function() {});

              }
              newsArrFuncIns(0);

            }
			  	}
		  }, function() {});

		  // DB REVIEWS
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS reviews (reviews_id integer primary key, reviews_from integer, reviews_to integer, reviews_message text, reviews_pic text, reviews_institution integer, reviews_answered integer, reviews_opened integer, reviews_when integer, reviews_del integer)").then(function() {
		  		if(data[0].newusr == '1') {
		  			// DB REVIEWS
            var reviewsArr = data[0].reviewsArr;

            if(reviewsArr.length > 0) {

              var id = 0;

              function reviewsArrFuncIns(id) {

                var reviews_id = reviewsArr[id]['reviews_id'];
                var reviews_from = reviewsArr[id]['reviews_from'];
                var reviews_to = reviewsArr[id]['reviews_to'];
                var reviews_message = reviewsArr[id]['reviews_message'];
                var reviews_pic = reviewsArr[id]['reviews_pic'];
                var reviews_institution = reviewsArr[id]['reviews_institution'];
                var reviews_answered = reviewsArr[id]['reviews_answered'];
                var reviews_opened = reviewsArr[id]['reviews_opened'];
                var reviews_when = reviewsArr[id]['reviews_when'];
                var reviews_del = reviewsArr[id]['reviews_del'];

                var newsIns = "INSERT INTO reviews (reviews_id, reviews_from, reviews_to, reviews_message, reviews_pic, reviews_institution, reviews_answered, reviews_opened, reviews_when, reviews_del) VALUES (?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, newsIns, [reviews_id, reviews_from, reviews_to, reviews_message, reviews_pic, reviews_institution, reviews_answered, reviews_opened, reviews_when, reviews_del]).then(function() {
                  id++;
                  if(id < reviewsArr.length) {
                  reviewsArrFuncIns(id);
                  }
                }, function() {});

              }
              reviewsArrFuncIns(0);

            }
			  	}
		  }, function() {});

		  // DB ASKS
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS asks (asks_id integer primary key, asks_name text, asks_message text, asks_type integer, asks_chained integer, asks_active integer, asks_img text, asks_answ text, asks_yes integer, asks_no integer, asks_reply text, asks_institution integer, asks_when integer, asks_del integer)").then(function() {
		  		if(data[0].newusr == '1') {
		  			// DB ASKS
            var asksArr = data[0].asksArr;

            if(asksArr.length > 0) {

              var id = 0;

              function asksArrFuncIns(id) {

                var asks_id = asksArr[id]['asks_id'];
                var asks_name = asksArr[id]['asks_name'];
                var asks_message = asksArr[id]['asks_message'];
                var asks_type = asksArr[id]['asks_type'];
                var asks_chained = asksArr[id]['asks_chained'];
                var asks_active = asksArr[id]['asks_active'];
                var asks_img = asksArr[id]['asks_img'];
                var asks_answ = asksArr[id]['asks_answ'];
                var asks_yes = asksArr[id]['asks_yes'];
                var asks_no = asksArr[id]['asks_no'];
                var asks_institution = asksArr[id]['asks_institution'];
                var asks_when = asksArr[id]['asks_when'];
                var asks_del = asksArr[id]['asks_del'];

                var asksIns = "INSERT INTO asks (asks_id, asks_name, asks_message, asks_type, asks_chained, asks_active, asks_img, asks_answ, asks_yes, asks_no, asks_reply, asks_institution, asks_when, asks_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, asksIns, [asks_id, asks_name, asks_message, asks_type, asks_chained, asks_active, asks_img, asks_answ, asks_yes, asks_no, '0', asks_institution, asks_when, asks_del]).then(function() {
                  id++;
                  if(id < asksArr.length) {
                    asksArrFuncIns(id);
                  }
                }, function() {});

              }
              asksArrFuncIns(0);

            }
			  	}
		  }, function() {});

		  // DB CHAT
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS chat (chat_id integer primary key, chat_from integer, chat_to integer, chat_name text, chat_message text, chat_read integer, chat_institution integer, chat_answered integer, chat_when integer, chat_del integer)").then(function() {
		  		if(data[0].newusr == '1') {
		  			// DB CHAT
            var chatArr = data[0].chatArr;
            
            if(chatArr.length > 0) {

              var id = 0;

              function chatArrFuncIns(id) {

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

                var giftsIns = "INSERT INTO chat (chat_id, chat_from, chat_to, chat_name, chat_message, chat_read, chat_institution, chat_answered, chat_when, chat_del) VALUES (?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, giftsIns, [chat_id, chat_from, chat_to, chat_name, chat_message, chat_read, chat_institution, chat_answered, chat_when, chat_del]).then(function() {
                  id++;
                  if(id < chatArr.length) {
                  chatArrFuncIns(id);
                  }
                }, function() {});

              }
              chatArrFuncIns(0);

            }
			  	}
		  }, function() {});

		  // DB ORDER
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS ordering (order_id integer primary key, order_user text, order_user_name_phone text, order_user_surname_phone text, order_user_middlename_phone text, order_user_adress_phone text, order_user_comment_phone text, order_name text, order_name_phone text, order_user_phone_phone text, order_user_email_phone text, order_desc text, order_worker integer, order_worker_name_phone text, order_worker_pic_phone text, order_worker_profession_phone text, order_reminder_phone text, order_institution integer, order_office integer, order_room integer, order_bill integer, order_goods integer, order_cats integer, order_order text, order_status integer, order_start integer, order_start_name_phone text, order_end integer, order_allday integer, order_mobile integer, order_mobile_confirm text, order_when integer, order_del integer)").then(function() {
		  		if(data[0].newusr == '1') {

			  	}
		  }, function() {});

		  // DB PROFESSIONS
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS professions (prof_id integer primary key, prof_name text, prof_desc text, prof_institution integer, prof_when integer, prof_del integer)").then(function() {
		  		if(data[0].newusr == '1') {

			  	}
		  }, function() {});

		  // DB OFFICES
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS organizations_office (office_id integer primary key, office_name text, office_start text, office_stop text, office_bus_hours text, office_country integer, office_city text, office_adress text, office_lat text, office_lon text, office_desc text, office_timezone integer, office_tel text, office_tel_n text, office_fax integer, office_mob integer, office_email text, office_pwd text, office_orders integer, office_skype text, office_site text, office_tax_id text, office_logo text, office_institution integer, office_log integer, office_reg integer, office_del integer)").then(function() {
		  		if(data[0].newusr == '1') {

			  	}
		  }, function() {});

		  // DB SCHEDULE
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS schedule (schedule_id integer primary key, schedule_employee integer, schedule_menue integer, schedule_office integer, schedule_start integer, schedule_stop integer, schedule_institution integer, schedule_when integer, schedule_del integer)").then(function() {
		  		if(data[0].newusr == '1') {

			  	}
		  }, function() {});

		  // DB FIFTHGIFT
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS fifthgift (fifth_id integer primary key, fifth_name text, fifth_desc text, fifth_user integer, fifth_menue_id integer, fifth_bill integer, fifth_got_spend integer, fifth_institution integer, fifth_office integer, fifth_when integer, fifth_del integer)").then(function() {
        
        if(data[0].newusr == '1') {

          var fifthArr = data[0].fifthArr;
          
          if(fifthArr.length > 0) {

            var id = 0;

            function fifthArrFuncIns(id) {

              var fifth_id = fifthArr[id]['fifth_id'];
              var fifth_name = fifthArr[id]['fifth_name'];
              var fifth_desc = fifthArr[id]['fifth_desc'];
              var fifth_user = fifthArr[id]['fifth_user'];
              var fifth_menue_id = fifthArr[id]['fifth_menue_id'];
              var fifth_bill = fifthArr[id]['fifth_bill'];
              var fifth_got_spend = fifthArr[id]['fifth_got_spend'];
              var fifth_institution = fifthArr[id]['fifth_institution'];
              var fifth_office = fifthArr[id]['fifth_office'];
              var fifth_when = fifthArr[id]['fifth_when'];
              var fifth_del = fifthArr[id]['fifth_del'];
    
              var queryFifth = "SELECT * FROM fifthgift WHERE fifth_id = ?";
              $cordovaSQLite.execute($rootScope.db, queryFifth, [fifth_id]).then(function(suc) {
              if(suc.rows.length > 0) {
                  var fifthUpd = "UPDATE fifthgift SET fifth_name=?, fifth_desc=?, fifth_user=?, fifth_menue_id=?, fifth_bill=?, fifth_got_spend=?, fifth_institution=?, fifth_office=?, fifth_when=?, fifth_del=? WHERE fifth_id=?";
                  $cordovaSQLite.execute($rootScope.db, fifthUpd, [fifth_name, fifth_desc, fifth_user, fifth_menue_id, fifth_bill, fifth_got_spend, fifth_institution, fifth_office, fifth_when, fifth_del, fifth_id]).then(function() {
                    id++;
                    if(id < fifthArr.length) {
                      fifthArrFuncIns(id);
                    }
                  }, function() {});
                }
                else {
                  var fifthIns = "INSERT INTO fifthgift (fifth_id, fifth_name, fifth_desc, fifth_user, fifth_menue_id, fifth_bill, fifth_got_spend, fifth_institution, fifth_office, fifth_when, fifth_del) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                  $cordovaSQLite.execute($rootScope.db, fifthIns, [fifth_id, fifth_name, fifth_desc, fifth_user, fifth_menue_id, fifth_bill, fifth_got_spend, fifth_institution, fifth_office, fifth_when, fifth_del]).then(function() {
                    id++;
                    if(id < fifthArr.length) {
                      fifthArrFuncIns(id);
                    }
                  }, function() {});
                }
              }, function() {});

            }
            fifthArrFuncIns(0);

          }

        }

		  }, function() {});

		  // DB RESERVATION
		  $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS reservation (reservation_id integer primary key, reservation_userid integer, reservation_surname text, reservation_name text, reservation_middlename text, reservation_mobile integer, reservation_date integer, reservation_time integer, reservation_comment text, reservation_institution integer, reservation_when integer, reservation_del integer)").then(function() {
		  	if(data[0].newusr == '1') {

          var reservArr = data[0].reservArr;
          
          if(reservArr.length > 0) {

            var id = 0;

            function reservArrFuncIns(id) {

              var reservation_id = reservArr[id]['reservation_id'];
              var reservation_userid = reservArr[id]['reservation_userid'];
              var reservation_surname = reservArr[id]['reservation_surname'];
              var reservation_name = reservArr[id]['reservation_name'];
              var reservation_middlename = reservArr[id]['reservation_middlename'];
              var reservation_mobile = reservArr[id]['reservation_mobile'];
              var reservation_date = reservArr[id]['reservation_date'];
              var reservation_time = reservArr[id]['reservation_time'];
              var reservation_comment = reservArr[id]['reservation_comment'];
              var reservation_institution = reservArr[id]['reservation_institution'];
              var reservation_when = reservArr[id]['reservation_when'];
              var reservation_del = reservArr[id]['reservation_del'];
    
              var queryReserv = "SELECT * FROM reservation WHERE reservation_id = ?";
              $cordovaSQLite.execute($rootScope.db, queryReserv, [reservation_id]).then(function(suc) {
              if(suc.rows.length > 0) {
                  var fifthUpd = "UPDATE fifthgift SET reservation_userid=?, reservation_surname=?, reservation_name=?, reservation_middlename=?, reservation_mobile=?, reservation_date=?, reservation_time=?, reservation_comment=?, reservation_institution=?, reservation_when=?, reservation_del=? WHERE reservation_id=?";
                  $cordovaSQLite.execute($rootScope.db, fifthUpd, [reservation_userid, reservation_surname, reservation_name, reservation_middlename, reservation_mobile, reservation_date, reservation_time, reservation_comment, reservation_institution, reservation_when, reservation_del, reservation_id]).then(function() {
                    id++;
                    if(id < reservArr.length) {
                      reservArrFuncIns(id);
                    }
                  }, function() {});
                }
                else {
                  var reservIns = "INSERT INTO reservation (reservation_id, reservation_userid, reservation_surname, reservation_name, reservation_middlename, reservation_mobile, reservation_date, reservation_time, reservation_comment, reservation_institution, reservation_when, reservation_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
                  $cordovaSQLite.execute($rootScope.db, reservIns, [reservation_id, reservation_userid, reservation_surname, reservation_name, reservation_middlename, reservation_mobile, reservation_date, reservation_time, reservation_comment, reservation_institution, reservation_when, reservation_del]).then(function() {
                    id++;
                    if(id < reservArr.length) {
                      reservArrFuncIns(id);
                    }
                  }, function() {});
                }
              }, function() {});

            }
            reservArrFuncIns(0);

          }

        }

		  }, function() {});

      // DB ORGANIZATION
      $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS organizations (org_id integer primary key, org_name text, org_country integer, org_city integer, org_adress text, org_timezone integer, org_tel text, org_fax text, org_mob text, org_email text, org_skype text, org_site text, org_tax_id text, org_logo text, org_sound integer, org_development integer, org_money_points integer, org_starting_points integer, org_money_percent integer, org_points_points integer, org_promo_points_owner integer, org_promo_points_scan_owner integer, org_promo_points_involved integer, org_promo_points_scan_involved integer, org_max_points integer, org_risk_summ integer, org_autoaprove integer, org_appvers integer, org_appurl text, org_log integer, org_reg integer, org_del integer)").then(function() {
        if(data[0].newusr == '1') {

          // DB ORGANIZATION
          var orgArr = data[0].orgArr;
          if(orgArr.length > 0) {

            var id = 0;

            function orgArrFuncIns(id) {

              var org_id = orgArr[id]['org_id'];
              var org_name = orgArr[id]['org_name'];
              var org_country = orgArr[id]['org_country'];
              var org_city = orgArr[id]['org_city'];
              var org_adress = orgArr[id]['org_adress'];
              var org_timezone = orgArr[id]['org_timezone'];
              var org_tel = orgArr[id]['org_tel'];
              var org_fax = orgArr[id]['org_fax'];
              var org_mob = orgArr[id]['org_mob'];
              var org_email = orgArr[id]['org_email'];
              var org_skype = orgArr[id]['org_skype'];
              var org_site = orgArr[id]['org_site'];
              var org_tax_id = orgArr[id]['org_tax_id'];
              var org_logo = orgArr[id]['org_logo'];
              var org_sound = orgArr[id]['org_sound'];
              var org_development = orgArr[id]['org_development'];
              var org_money_points = orgArr[id]['org_money_points'];
              var org_starting_points = orgArr[id]['org_starting_points'];
              var org_money_percent = orgArr[id]['org_money_percent'];
              var org_points_points = orgArr[id]['org_points_points'];
              var org_promo_points_owner = orgArr[id]['org_promo_points_owner'];
              var org_promo_points_scan_owner = orgArr[id]['org_promo_points_scan_owner'];
              var org_promo_points_involved = orgArr[id]['org_promo_points_involved'];
              var org_promo_points_scan_involved = orgArr[id]['org_promo_points_scan_involved'];
              var org_max_points = orgArr[id]['org_max_points'];
              var org_risk_summ = orgArr[id]['org_risk_summ'];
              var org_autoaprove = orgArr[id]['org_autoaprove'];
              var org_appvers = orgArr[id]['org_appvers'];
              var org_appurl = orgArr[id]['org_appurl'];
              var org_log = orgArr[id]['org_log'];
              var org_reg = orgArr[id]['org_reg'];
              var org_del = orgArr[id]['org_del'];
    
              var queryOrg = "SELECT * FROM organizations WHERE org_id = ?";
              $cordovaSQLite.execute($rootScope.db, queryOrg, [org_id]).then(function(suc) {
                if(suc.rows.length > 0) {
                  var orgUpd = "UPDATE organizations SET org_name=?, org_country=?, org_city=?, org_adress=?, org_timezone=?, org_tel=?, org_fax=?, org_mob=?, org_email=?, org_skype=?, org_site=?, org_tax_id=?, org_logo=?, org_sound=?, org_development=?, org_money_points=?, org_starting_points=?, org_money_percent=?, org_points_points=?, org_promo_points_owner=?, org_promo_points_scan_owner=?, org_promo_points_involved=?, org_promo_points_scan_involved=?, org_max_points=?, org_risk_summ=?, org_autoaprove=?, org_appvers=?, org_appurl=?, org_log=?, org_reg=? org_del=? WHERE org_id=?";
                  $cordovaSQLite.execute($rootScope.db, orgUpd, [org_name, org_country, org_city, org_adress, org_timezone, org_tel, org_fax, org_mob, org_email, org_skype, org_site, org_tax_id, org_logo, org_sound, org_development, org_money_points, org_starting_points, org_money_percent, org_points_points, org_promo_points_owner, org_promo_points_scan_owner, org_promo_points_involved, org_promo_points_scan_involved, org_max_points, org_risk_summ, org_autoaprove, org_appvers, org_appurl, org_log, org_reg, org_del, org_id]).then(function() {
                    id++;
                    if(id < orgArr.length) {
                      orgArrFuncIns(id);
                    }
                  }, function() {});
                }
                else {
                  var orgIns = "INSERT INTO organizations (org_id, org_name, org_country, org_city, org_adress, org_timezone, org_tel, org_fax, org_mob, org_email, org_skype, org_site, org_tax_id, org_logo, org_sound, org_development, org_money_points, org_starting_points, org_money_percent, org_points_points, org_promo_points_owner, org_promo_points_scan_owner, org_promo_points_involved, org_promo_points_scan_involved, org_max_points, org_risk_summ, org_autoaprove, org_appvers, org_appurl, org_log, org_reg, org_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                  $cordovaSQLite.execute($rootScope.db, orgIns, [org_id, org_name, org_country, org_city, org_adress, org_timezone, org_tel, org_fax, org_mob, org_email, org_skype, org_site, org_tax_id, org_logo, org_sound, org_development, org_money_points, org_starting_points, org_money_percent, org_points_points, org_promo_points_owner, org_promo_points_scan_owner, org_promo_points_involved, org_promo_points_scan_involved, org_max_points, org_risk_summ, org_autoaprove, org_appvers, org_appurl, org_log, org_reg, org_del]).then(function() {
                    id++;
                    if(id < orgArr.length) {
                      orgArrFuncIns(id);
                    }
                  }, function() {});
                }
              }, function() {});

            }
            orgArrFuncIns(0);

          }

        }
      }, function() {});

      // DB ROOMS
      $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS rooms (room_id integer primary key, room_name text, room_desc text, room_employee integer, room_menue_exe text, room_priority integer, room_institution integer, room_office integer, room_upd integer, room_when integer, room_del integer)").then(function() {}, function() {});

      // DB WAVES
      $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS waves (wave_id integer primary key, wave_user integer, wave_token text, wave_publicKey text, wave_privateKey text, wave_seedPhrase text, wave_seedAddress text, wave_pass text, wave_institution integer, wave_priority integer, wave_when integer)").then(function() {
        if(data[0].newusr == '1') {
          
          // DB WAVES
          var wavesArr = data[0].wavesArr;
          
          if(wavesArr.length > 0) {

            var id = 0;

            function wavesArrFuncIns(id) {

              var wave_id = wavesArr[id]['wave_id'];
              var wave_user = wavesArr[id]['wave_user'];
              var wave_token = wavesArr[id]['wave_token'];
              var wave_publicKey = wavesArr[id]['wave_publicKey'];
              var wave_privateKey = wavesArr[id]['wave_privateKey'];
              var wave_seedPhrase = wavesArr[id]['wave_seedPhrase'];
              var wave_seedAddress = wavesArr[id]['wave_seedAddress'];
              var wave_pass = wavesArr[id]['wave_pass'];
              var wave_institution = wavesArr[id]['wave_institution'];
              var wave_priority = wavesArr[id]['wave_priority'];
              var wave_when = wavesArr[id]['wave_when'];
              var wave_del = wavesArr[id]['wave_del'];
    
              var queryWave = "SELECT * FROM waves WHERE wave_id = ?";
              $cordovaSQLite.execute($rootScope.db, queryWave, [wave_id]).then(function(suc) {
                if(suc.rows.length > 0) {
                  var waveUpd = "UPDATE waves SET wave_user=?, wave_token=?, wave_publicKey=?, wave_privateKey=?, wave_seedPhrase=?, wave_seedAddress=?, wave_pass=?, wave_institution=?, wave_priority=?, wave_when=?, wave_del=? WHERE wave_id=?";
                  $cordovaSQLite.execute($rootScope.db, waveUpd, [wave_user, wave_token, wave_publicKey, wave_privateKey, wave_seedPhrase, wave_seedAddress, wave_pass, wave_institution, wave_priority, wave_when, wave_del, wave_id]).then(function() {
                    id++;
                    if(id < wavesArr.length) {
                      wavesArrFuncIns(id);
                    }
                  }, function() {});
                }
                else {
                  var waveIns = "INSERT INTO waves (wave_id, wave_user, wave_token, wave_publicKey, wave_privateKey, wave_seedPhrase, wave_seedAddress, wave_pass, wave_institution, wave_priority, wave_when, wave_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
                  $cordovaSQLite.execute($rootScope.db, waveIns, [wave_id, wave_user, wave_token, wave_publicKey, wave_privateKey, wave_seedPhrase, wave_seedAddress, wave_pass, wave_institution, wave_priority, wave_when, wave_del]).then(function() {
                    id++;
                    if(id < wavesArr.length) {
                      wavesArrFuncIns(id);
                    }
                  }, function() {});
                }
              }, function() {});

            }
            wavesArrFuncIns(0);

          }

        }
      }, function() {});

		  // data = JSON.parse(e.data);
		  
		  // alert(JSON.stringify(data));

		};
		
		$rootScope.getUpdate = function(data, userupd) {

      if(data[0].check == '1') {

        // USER LOG
        if(data[0].user_log > '0') {

          var usrlog = data[0].user_log;

          var queryUsrLog = "SELECT * FROM users WHERE user_id=? AND user_log=? LIMIT 1";
          $cordovaSQLite.execute($rootScope.db, queryUsrLog, [1, usrlog]).then(function(suc) {
            if(suc.rows.length == 0) {
              
              var queryUsrLogUpd = "UPDATE users SET user_log=? WHERE user_id=?";
              $cordovaSQLite.execute($rootScope.db, queryUsrLogUpd, [usrlog, 1]).then(function(suc) {}, function() {});

            }
          }, function() {});

        }

        // USER DISCOUNT
        if(data[0].user_discount > '0') {

          var usrdiscount = data[0].user_discount;

          var queryUsrDiscount = "SELECT * FROM users WHERE user_id=? AND user_discount=? LIMIT 1";
          $cordovaSQLite.execute($rootScope.db, queryUsrDiscount, [1, usrdiscount]).then(function(suc) {
            if(suc.rows.length == 0) {
              
              var queryUsrDiscountUpd = "UPDATE users SET user_discount=? WHERE user_id=?";
              $cordovaSQLite.execute($rootScope.db, queryUsrDiscountUpd, [usrdiscount, 1]).then(function(suc) {

                $ionicPopup.alert({
                  title: 'Внимание',
                  template: 'Дисконтная карта добавленна!'
                });

              }, function() {});

            }
          }, function() {});

        }

        // USER WORK POSITION
        if(data[0].user_work_pos >= '2') {

          // alert(data[0].user_discount);

          var user_work_pos = data[0].user_work_pos;

          var queryUsrWP = "SELECT * FROM users WHERE user_id=? AND user_work_pos=? LIMIT 1";
          $cordovaSQLite.execute($rootScope.db, queryUsrWP, [1, user_work_pos]).then(function(suc) {
            if(suc.rows.length == 0) {
              
              var queryUsrWPUpd = "UPDATE users SET user_work_pos=? WHERE user_id=?";
              $cordovaSQLite.execute($rootScope.db, queryUsrWPUpd, [user_work_pos, 1]).then(function(suc) {

                $ionicPopup.alert({
                  title: 'Внимание',
                  template: 'Вы заблокированны!'
                });

              }, function() {});

            }
          }, function() {});

        }
        // IF NO CONNECTION TO DB OR SERVER IS DOWN
        else if(data[0].user_work_pos != '1000') {

          var user_work_pos = data[0].user_work_pos;

          var queryUsrWP = "SELECT * FROM users WHERE user_id=? AND user_work_pos=? LIMIT 1";
          $cordovaSQLite.execute($rootScope.db, queryUsrWP, [1, user_work_pos]).then(function(suc) {
            if(suc.rows.length == 0) {
              
              var queryUsrWPUpd = "UPDATE users SET user_work_pos=? WHERE user_id=?";
              $cordovaSQLite.execute($rootScope.db, queryUsrWPUpd, [user_work_pos, 1]).then(function(suc) {

                $ionicPopup.alert({
                  title: 'Внимание',
                  template: 'Вы разблокированны!'
                });

              }, function() {});

            }
          }, function() {});

        }
        
        // USER DATA UPDATE IF ON PHONE IS OLDER THAN ONLINE
        if(data[0].user_upd > userupd && data[0].user_id > 0) {

          var user_id = data[0].user_id;
          var user_name = data[0].user_name;
          var user_surname = data[0].user_surname;
          var user_middlename = data[0].user_middlename;
          var user_email = data[0].user_email;
          var user_email_confirm = data[0].user_email_confirm;
          var user_pwd = data[0].user_pwd;
          var user_tel = data[0].user_tel;
          var user_mob_confirm = data[0].user_mob_confirm;
          var user_mob = data[0].user_mob;
          var user_work_pos = data[0].user_work_pos;
          var user_menue_exe = data[0].user_menue_exe;
          var user_institution = data[0].user_institution;
          var user_office = data[0].user_office;
          var user_pic = data[0].user_pic;
          var user_gender = data[0].user_gender;
          var user_birthday = data[0].user_birthday;
          var user_country = data[0].user_country;
          var user_region = data[0].user_region;
          var user_city = data[0].user_city;
          var user_adress = data[0].user_adress;
          var user_install_where = data[0].user_install_where;
          var user_log_key = data[0].user_log_key;
          var user_gcm = data[0].user_gcm;
          var user_device = data[0].user_device;
          var user_device_id = data[0].user_device_id;
          var user_device_version = data[0].user_device_version;
          var user_device_os = data[0].user_device_os;
          var user_discount = data[0].user_discount;
          var user_promo = data[0].user_promo;
          var user_conf_req = data[0].user_conf_req;
          var user_log = data[0].user_log;
          var user_upd = data[0].user_upd;
          var user_reg = data[0].user_reg;
          var user_del = data[0].user_del;

          var queryUsrLog = "SELECT * FROM users WHERE user_id=? LIMIT 1";
          $cordovaSQLite.execute($rootScope.db, queryUsrLog, [1]).then(function(suc) {
            if(suc.rows.length > 0) {
              
              var queryUsrDataUpd = "UPDATE users SET user_real_id=?, user_name=?, user_surname=?, user_middlename=?, user_email=?, user_email_confirm=?, user_pwd=?, user_tel=?, user_mob_confirm=?, user_mob=?, user_work_pos=?, user_menue_exe=?, user_institution=?, user_office=?, user_pic=?, user_gender=?, user_birthday=?, user_country=?, user_region=?, user_city=?, user_adress=?, user_install_where=?, user_log_key=?, user_gcm=?, user_device=?, user_device_id=?, user_device_version=?, user_device_os=?, user_discount=?, user_promo=?, user_conf_req=?, user_log=?, user_upd=?, user_reg=?, user_del=? WHERE user_id=?";
              $cordovaSQLite.execute($rootScope.db, queryUsrDataUpd, [user_id, user_name, user_surname, user_middlename, user_email, user_email_confirm, user_pwd, user_tel, user_mob_confirm, user_mob, user_work_pos, user_menue_exe, user_institution, user_office, user_pic, user_gender, user_birthday, user_country, user_region, user_city, user_adress, user_install_where, user_log_key, user_gcm, user_device, user_device_id, user_device_version, user_device_os, user_discount, user_promo, user_conf_req, user_log, user_upd, user_reg, user_del, 1]).then(function(suc) {}, function() {});

            }
          }, function() {});

        }

        // DB POINTS
        var pointsArr = data[0].pointsArr;

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
        var walletArr = data[0].walletArr;

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

        // DB GOODS
        var goodsArr = data[0].goodsArr;

        if(goodsArr.length > 0) {

          var id = 0;

          function goodsArrFunc(id) {
            var goods_id = goodsArr[id]['goods_id'];
            var goods_when = goodsArr[id]['goods_when'];
            var goods_del = goodsArr[id]['goods_del'];
            var goods_name = 0;
            var goods_desc = 0;
            var goods_pic = 0;
            var goods_type = 0;
            var goods_institution = 0;

            if(goods_when != '1') {
              goods_name = goodsArr[id]['goods_name'];
              goods_desc = goodsArr[id]['goods_desc'];
              goods_pic = goodsArr[id]['goods_pic'];
              goods_type = goodsArr[id]['goods_type'];
              goods_institution = goodsArr[id]['goods_institution'];
            }

            var queryGoods = "SELECT * FROM goods WHERE goods_id = ?";
            $cordovaSQLite.execute($rootScope.db, queryGoods, [goods_id]).then(function(suc) {
              if(suc.rows.length > 0) {
                var goodsUpd = "UPDATE goods SET goods_name=?, goods_desc=?, goods_pic=?, goods_type=?, goods_institution=?, goods_when=?, goods_del=? WHERE goods_id=?";
                $cordovaSQLite.execute($rootScope.db, goodsUpd, [goods_name, goods_desc, goods_pic, goods_type, goods_institution, goods_when, goods_del, goods_id]).then(function() {
                  id++;
                  if(id < goodsArr.length) {
                    goodsArrFunc(id);
                  }
                }, function() {});
              }
              else {
                var goodsIns = "INSERT INTO goods (goods_id, goods_name, goods_desc, goods_pic, goods_type, goods_institution, goods_when, goods_del) VALUES (?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, goodsIns, [goods_id, goods_name, goods_desc, goods_pic, goods_type, goods_institution, goods_when, goods_del]).then(function() {
                  id++;
                  if(id < goodsArr.length) {
                    goodsArrFunc(id);
                  }
                }, function() {});
              }
            }, function() {});
          }
          goodsArrFunc(0);

        }

        // DB CATEGORIES
        var catArr = data[0].catArr;

        if(catArr.length > 0) {

          var id = 0;

          function catArrFunc(id) {
            var cat_id = catArr[id]['cat_id'];
            var cat_xid = 0;
            var cat_when = catArr[id]['cat_when'];
            var cat_del = catArr[id]['cat_del'];
            var cat_name = 0;
            var cat_desc = 0;
            var cat_pic = 0;
            var cat_ingr = 0;
            var cat_order = 0;
            var cat_institution = 0;

            if(cat_when != '1') {
              cat_xid = catArr[id]['cat_xid'];
              cat_name = catArr[id]['cat_name'];
              cat_desc = catArr[id]['cat_desc'];
              cat_pic = catArr[id]['cat_pic'];
              cat_ingr = catArr[id]['cat_ingr'];
              cat_order = catArr[id]['cat_order'];
              cat_institution = catArr[id]['cat_institution'];
            }

            var queryCats = "SELECT * FROM categories WHERE cat_id = ?";
            $cordovaSQLite.execute($rootScope.db, queryCats, [cat_id]).then(function(suc) {
              if(suc.rows.length > 0) {
                var catsUpd = "UPDATE categories SET cat_xid=?, cat_name=?, cat_desc=?, cat_pic=?, cat_ingr=?, cat_order=?, cat_institution=?, cat_when=?, cat_del=? WHERE cat_id=?";
                $cordovaSQLite.execute($rootScope.db, catsUpd, [cat_xid, cat_name, cat_desc, cat_pic, cat_ingr, cat_order, cat_institution, cat_when, cat_del, cat_id]).then(function() {
                  id++;
                  if(id < catArr.length) {
                    catArrFunc(id);
                  }
                }, function() {});
              }
              else {
                var catsIns = "INSERT INTO categories (cat_id, cat_xid, cat_name, cat_desc, cat_pic, cat_ingr, cat_order, cat_institution, cat_when, cat_del) VALUES (?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, catsIns, [cat_id, cat_xid, cat_name, cat_desc, cat_pic, cat_ingr, cat_order, cat_institution, cat_when, cat_del]).then(function() {
                  id++;
                  if(id < catArr.length) {
                    catArrFunc(id);
                  }
                }, function() {});
              }
            }, function() {});
          }
          catArrFunc(0);

        }

        // DB MENU
        var menueArr = data[0].menueArr;
        
        if(menueArr.length > 0) {

          var id = 0;

          function menueArrFunc(id) {

            var menue_id = menueArr[id]['menue_id'];
            var menue_xid = 0;
            var menue_cat_xid = 0;
            var menue_when = menueArr[id]['menue_when'];
            var menue_del = menueArr[id]['menue_del'];
            var menue_cat = 0;
            var menue_name = 0;
            var menue_desc = 0;
            var menue_size = 0;
            var menue_cost = 0;
            var menue_costs = 0;
            var menue_ingr = 0;
            var menue_addition = 0;
            var menue_addition_auto = 0;
            var menue_package = 0;
            var menue_weight = 0;
            var menue_interval = 0;
            var menue_discount = 0;
            var menue_action = 0;
            var menue_code = 0;
            var menue_pic = 0;
            var menue_institution = 0;

            if(menue_when != '1') {
              menue_xid = menueArr[id]['menue_xid'];
              menue_cat_xid = menueArr[id]['menue_cat_xid'];
              menue_cat = menueArr[id]['menue_cat'];
              menue_name = menueArr[id]['menue_name'];
              menue_desc = menueArr[id]['menue_desc'];
              menue_size = menueArr[id]['menue_size'];
              menue_cost = menueArr[id]['menue_cost'];
              menue_costs = menueArr[id]['menue_costs'];
              menue_ingr = menueArr[id]['menue_ingr'];
              menue_addition = menueArr[id]['menue_addition'];
              menue_addition_auto = menueArr[id]['menue_addition_auto'];
              menue_package = menueArr[id]['menue_package'];
              menue_weight = menueArr[id]['menue_weight'];
              menue_discount = menueArr[id]['menue_discount'];
              menue_action = menueArr[id]['menue_action'];
              menue_code = menueArr[id]['menue_code'];
              menue_interval = menueArr[id]['menue_interval'];
              menue_pic = menueArr[id]['menue_pic'];
              menue_institution = menueArr[id]['menue_institution'];
            }

            var queryMenue = "SELECT * FROM menue WHERE menue_id = ?";
            $cordovaSQLite.execute($rootScope.db, queryMenue, [menue_id]).then(function(suc) {
              if(suc.rows.length > 0) {
                var menueUpd = "UPDATE menue SET menue_xid=?, menue_cat_xid=?, menue_cat=?, menue_name=?, menue_desc=?, menue_size=?, menue_cost=?, menue_costs=?, menue_ingr=?, menue_addition=?, menue_addition_auto=?, menue_package=?, menue_weight=?, menue_discount=?, menue_action=?, menue_code=?, menue_interval=?, menue_pic=?, menue_institution=?, menue_when=?, menue_del=? WHERE menue_id=?";
                $cordovaSQLite.execute($rootScope.db, menueUpd, [menue_xid, menue_cat_xid, menue_cat, menue_name, menue_desc, menue_size, menue_cost, menue_costs, menue_ingr, menue_addition, menue_addition_auto, menue_package, menue_weight, menue_discount, menue_action, menue_code, menue_interval, menue_pic, menue_institution, menue_when, menue_del, menue_id]).then(function() {
                  id++;
                  if(id < menueArr.length) {
                    menueArrFunc(id);
                  }
                }, function() {});
              }
              else {
                var menueIns = "INSERT INTO menue (menue_id, menue_xid, menue_cat_xid, menue_cat, menue_name, menue_desc, menue_size, menue_cost, menue_costs, menue_ingr, menue_addition, menue_addition_auto, menue_package, menue_weight, menue_discount, menue_action, menue_code, menue_interval, menue_pic, menue_institution, menue_when, menue_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, menueIns, [menue_id, menue_xid, menue_cat_xid, menue_cat, menue_name, menue_desc, menue_size, menue_cost, menue_costs, menue_ingr, menue_addition, menue_addition_auto, menue_package, menue_weight, menue_discount, menue_action, menue_code, menue_interval, menue_pic, menue_institution, menue_when, menue_del]).then(function() {
                  id++;
                  if(id < menueArr.length) {
                    menueArrFunc(id);
                  }
                }, function() {});
              }
            }, function() {});

          }
          menueArrFunc(0);

        }

        // DB INGREDIENTS
        var ingrArr = data[0].ingrArr;

        if(ingrArr.length > 0) {

          var id = 0;

          function ingrArrFunc(id) {

            var ingr_id = ingrArr[id]['ingr_id'];
            var ingr_xid = 0;
            var ingr_when = ingrArr[id]['ingr_when'];
            var ingr_del = ingrArr[id]['ingr_del'];
            var ingr_name = 0;
            var ingr_desc = 0;
            var ingr_cat = 0;
            var ingr_code = 0;
            var ingr_pic = 0;
            var ingr_size = 0;
            var ingr_cost = 0;
            var ingr_institution = 0;

            if(ingr_when != '1') {
              ingr_xid = ingrArr[id]['ingr_xid'];
              ingr_name = ingrArr[id]['ingr_name'];
              ingr_desc = ingrArr[id]['ingr_desc'];
              ingr_cat = ingrArr[id]['ingr_cat'];
              ingr_code = ingrArr[id]['ingr_code'];
              ingr_pic = ingrArr[id]['ingr_pic'];
              ingr_size = ingrArr[id]['ingr_size'];
              ingr_cost = ingrArr[id]['ingr_cost'];
              ingr_institution = ingrArr[id]['ingr_institution'];
            }

            var queryIngrs = "SELECT * FROM ingredients WHERE ingr_id = ?";
            $cordovaSQLite.execute($rootScope.db, queryIngrs, [ingr_id]).then(function(suc) {
              if(suc.rows.length > 0) {
                var menueUpd = "UPDATE ingredients SET ingr_xid=?, ingr_name=?, ingr_desc=?, ingr_cat=?, ingr_code=?, ingr_pic=?, ingr_size=?, ingr_cost=?, ingr_institution=?, ingr_when=?, ingr_del=? WHERE ingr_id=?";
                $cordovaSQLite.execute($rootScope.db, menueUpd, [ingr_xid, ingr_name, ingr_desc, ingr_cat, ingr_code, ingr_pic, ingr_size, ingr_cost, ingr_institution, ingr_when, ingr_del, ingr_id]).then(function() {
                  id++;
                  if(id < ingrArr.length) {
                    ingrArrFunc(id);
                  }
                }, function() {});
              }
              else {
                var ingrsIns = "INSERT INTO ingredients (ingr_id, ingr_xid, ingr_name, ingr_desc, ingr_cat, ingr_code, ingr_pic, ingr_size, ingr_cost, ingr_institution, ingr_when, ingr_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, ingrsIns, [ingr_id, ingr_xid, ingr_name, ingr_desc, ingr_cat, ingr_code, ingr_pic, ingr_size, ingr_cost, ingr_institution, ingr_when, ingr_del]).then(function() {
                  id++;
                  if(id < ingrArr.length) {
                    ingrArrFunc(id);
                  }
                }, function() {});
              }
            }, function() {});

          }
          ingrArrFunc(0);

        }

        // DB NEWS
        var newsArr = data[0].newsArr;

        if(newsArr.length > 0) {

          var id = 0;

          function newsArrFunc(id) {

            var news_id = newsArr[id]['news_id'];
            var news_state = newsArr[id]['news_state'];
            var news_menue_id = 0;
            var news_cost = 0;
            var news_user = 0;
            var news_used = 0;
            var news_begin = 0;
            var news_end = 0;
            var news_when = newsArr[id]['news_when'];
            var news_del = newsArr[id]['news_del'];
            var news_name = 0;
            var news_message = 0;
            var news_pic = 0;
            var news_institution = 0;

            if(news_state == '1') {
              news_name = newsArr[id]['news_name'];
              news_message = newsArr[id]['news_message'];
              news_pic = newsArr[id]['news_pic'];
              news_institution = newsArr[id]['news_institution'];
              news_menue_id = newsArr[id]['news_menue_id'];
              news_cost = newsArr[id]['news_cost'];
              news_user = newsArr[id]['news_user'];
              news_used = newsArr[id]['news_used'];
              news_begin = newsArr[id]['news_begin'];
              news_end = newsArr[id]['news_end'];
            }

            var queryNews = "SELECT * FROM news WHERE news_id = ?";
            $cordovaSQLite.execute($rootScope.db, queryNews, [news_id]).then(function(suc) {
              if(suc.rows.length > 0) {
                var newsUpd = "UPDATE news SET news_name=?, news_message=?, news_pic=?, news_institution=?, news_state=?, news_menue_id=?, news_cost=?, news_user=?, news_used=?, news_begin=?, news_end=?, news_when=?, news_del=? WHERE news_id=?";
                $cordovaSQLite.execute($rootScope.db, newsUpd, [news_name, news_message, news_pic, news_institution, news_state, news_menue_id, news_cost, news_user, news_used, news_begin, news_end, news_when, news_del, news_id]).then(function() {
                  id++;
                  if(id < newsArr.length) {
                  newsArrFunc(id);
                  }
                }, function() {});
              }
              else {
                var newsIns = "INSERT INTO news (news_id, news_name, news_message, news_pic, news_institution, news_state, news_menue_id, news_cost, news_user, news_used, news_begin, news_end, news_when, news_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, newsIns, [news_id, news_name, news_message, news_pic, news_institution, news_state, news_menue_id, news_cost, news_user, news_used, news_begin, news_end, news_when, news_del]).then(function() {
                  id++;
                  if(id < newsArr.length) {
                  newsArrFunc(id);
                  }
                }, function() {});
              }
            }, function() {});

          }
          newsArrFunc(0);

        }

        // DB REVIEWS
        var reviewsArr = data[0].reviewsArr;

        if(reviewsArr.length > 0) {

          var id = 0;

          function reviewsArrFunc(id) {

            var reviews_id = reviewsArr[id]['reviews_id'];
            var reviews_from = reviewsArr[id]['reviews_from'];
            var reviews_to = reviewsArr[id]['reviews_to'];
            var reviews_message = reviewsArr[id]['reviews_message'];
            var reviews_pic = reviewsArr[id]['reviews_pic'];
            var reviews_institution = reviewsArr[id]['reviews_institution'];
            var reviews_answered = reviewsArr[id]['reviews_answered'];
            var reviews_opened = reviewsArr[id]['reviews_opened'];
            var reviews_when = reviewsArr[id]['reviews_when'];
            var reviews_del = reviewsArr[id]['reviews_del'];

            var queryReviews = "SELECT * FROM reviews WHERE reviews_id = ?";
            $cordovaSQLite.execute($rootScope.db, queryReviews, [reviews_id]).then(function(suc) {
              if(suc.rows.length > 0) {
                var reviewsUpd = "UPDATE reviews SET reviews_from=?, reviews_to=?, reviews_message=?, reviews_pic=?, reviews_institution=?, reviews_answered=?, reviews_opened=?, reviews_when=?, reviews_del=? WHERE reviews_id=?";
                $cordovaSQLite.execute($rootScope.db, reviewsUpd, [reviews_from, reviews_to, reviews_message, reviews_pic, reviews_institution, reviews_answered, reviews_opened, reviews_when, reviews_del, reviews_id]).then(function() {
                  id++;
                  if(id < reviewsArr.length) {
                    reviewsArrFunc(id);
                  }
                }, function() {});
              }
              else {
                var newsIns = "INSERT INTO reviews (reviews_id, reviews_from, reviews_to, reviews_message, reviews_pic, reviews_institution, reviews_answered, reviews_opened, reviews_when, reviews_del) VALUES (?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, newsIns, [reviews_id, reviews_from, reviews_to, reviews_message, reviews_pic, reviews_institution, reviews_answered, reviews_when, reviews_del]).then(function() {
                  id++;
                  if(id < reviewsArr.length) {
                    reviewsArrFunc(id);
                  }
                }, function() {});
              }
            }, function() {});

          }
          reviewsArrFunc(0);

        }

        // DB ASKS
        var asksArr = data[0].asksArr;

        if(asksArr.length > 0) {

          var id = 0;

          function asksArrFunc(id) {

            var asks_id = asksArr[id]['asks_id'];
            var asks_name = asksArr[id]['asks_name'];
            var asks_message = asksArr[id]['asks_message'];
            var asks_type = asksArr[id]['asks_type'];
            var asks_chained = asksArr[id]['asks_chained'];
            var asks_active = asksArr[id]['asks_active'];
            var asks_img = asksArr[id]['asks_img'];
            var asks_answ = asksArr[id]['asks_answ'];
            var asks_yes = asksArr[id]['asks_yes'];
            var asks_no = asksArr[id]['asks_no'];
            var asks_institution = asksArr[id]['asks_institution'];
            var asks_del = asksArr[id]['asks_del'];
            var asks_when = asksArr[id]['asks_when'];

            var queryAsks = "SELECT * FROM asks WHERE asks_id = ?";
            $cordovaSQLite.execute($rootScope.db, queryAsks, [asks_id]).then(function(suc) {
              if(suc.rows.length == 0) {
                var newsIns = "INSERT INTO asks (asks_id, asks_name, asks_message, asks_type, asks_chained, asks_active, asks_img, asks_answ, asks_yes, asks_no, asks_reply, asks_institution, asks_when, asks_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, newsIns, [asks_id, asks_name, asks_message, asks_type, asks_chained, asks_active, asks_img, asks_answ, asks_yes, asks_no, '0', asks_institution, asks_when, asks_del]).then(function() {
                  id++;
                  if(id < asksArr.length) {
                    asksArrFunc(id);
                  }
                }, function() {});
              }
              else {
                var asksIns = "UPDATE asks SET asks_name=?, asks_message=?, asks_type=?, asks_chained=?, asks_active=?, asks_img=?, asks_answ=?, asks_yes=?, asks_no=?, asks_institution=?, asks_when=?, asks_del=? WHERE asks_id=?";
                $cordovaSQLite.execute($rootScope.db, asksIns, [asks_name, asks_message, asks_type, asks_chained, asks_active, asks_img, asks_answ, asks_yes, asks_no, asks_institution, asks_when, asks_del, asks_id]).then(function(ins) {
                  id++;
                  if(id < asksArr.length) {
                    asksArrFunc(id);
                  }
                }, function() {});
              }
            }, function() {});

          }
          asksArrFunc(0);

        }

        // DB GIFTS
        var giftsArr = data[0].giftsArr;
        
        if(giftsArr.length > 0) {

          var id = 0;

          function giftsArrFunc(id) {

            var gifts_id = giftsArr[id]['gifts_id'];
            var gifts_name = giftsArr[id]['gifts_name'];
            var gifts_desc = giftsArr[id]['gifts_desc'];
            var gifts_points = giftsArr[id]['gifts_points'];
            var gifts_pic = giftsArr[id]['gifts_pic'];
            var gifts_institution = giftsArr[id]['gifts_institution'];
            var gifts_when = giftsArr[id]['gifts_when'];
            var gifts_del = giftsArr[id]['gifts_del'];
  
            var queryGifts = "SELECT * FROM gifts WHERE gifts_id = ?";
            $cordovaSQLite.execute($rootScope.db, queryGifts, [gifts_id]).then(function(suc) {
            if(suc.rows.length > 0) {
                var giftsUpd = "UPDATE gifts SET gifts_name=?, gifts_desc=?, gifts_points=?, gifts_pic=?, gifts_institution=?, gifts_when=?, gifts_del=? WHERE gifts_id=?";
                $cordovaSQLite.execute($rootScope.db, giftsUpd, [gifts_name, gifts_desc, gifts_points, gifts_pic, gifts_institution, gifts_when, gifts_del, gifts_id]).then(function() {
                  id++;
                  if(id < giftsArr.length) {
                    giftsArrFunc(id);
                  }
                }, function() {});
              }
              else {
                var giftsIns = "INSERT INTO gifts (gifts_id, gifts_name, gifts_desc, gifts_points, gifts_pic, gifts_institution, gifts_when, gifts_del) VALUES (?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, giftsIns, [gifts_id, gifts_name, gifts_desc, gifts_points, gifts_pic, gifts_institution, gifts_when, gifts_del]).then(function() {
                id++;
                if(id < giftsArr.length) {
                  giftsArrFunc(id);
                }
                }, function() {});
              }
            }, function() {});

          }
          giftsArrFunc(0);

        }

        // DB CHAT
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
                  id++;
                  if(id < chatArr.length) {
                    chatArrFunc(id);
                  }
                }, function() {});
              }
              else {
                var chatIns = "INSERT INTO chat (chat_id, chat_from, chat_to, chat_name, chat_message, chat_read, chat_institution, chat_answered, chat_when, chat_del) VALUES (?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, chatIns, [chat_id, chat_from, chat_to, chat_name, chat_message, chat_read, chat_institution, chat_answered, chat_when, chat_del]).then(function() {
                  id++;
                  if(id < chatArr.length) {
                    chatArrFunc(id);
                  }
                }, function() {});
              }
            }, function() {});

          }
          chatArrFunc(0);

        }

        // DB FIFTHGIFT
        var fifthArr = data[0].fifthArr;
        
        if(fifthArr.length > 0) {

          var id = 0;

          function fifthArrFunc(id) {

            var fifth_id = fifthArr[id]['fifth_id'];
            var fifth_name = fifthArr[id]['fifth_name'];
            var fifth_desc = fifthArr[id]['fifth_desc'];
            var fifth_user = fifthArr[id]['fifth_user'];
            var fifth_menue_id = fifthArr[id]['fifth_menue_id'];
            var fifth_bill = fifthArr[id]['fifth_bill'];
            var fifth_got_spend = fifthArr[id]['fifth_got_spend'];
            var fifth_institution = fifthArr[id]['fifth_institution'];
            var fifth_office = fifthArr[id]['fifth_office'];
            var fifth_when = fifthArr[id]['fifth_when'];
            var fifth_del = fifthArr[id]['fifth_del'];
  
            var queryFifth = "SELECT * FROM fifthgift WHERE fifth_id = ?";
            $cordovaSQLite.execute($rootScope.db, queryFifth, [fifth_id]).then(function(suc) {
            if(suc.rows.length > 0) {
                var chatUpd = "UPDATE fifthgift SET fifth_name=?, fifth_desc=?, fifth_user=?, fifth_menue_id=?, fifth_bill=?, fifth_got_spend=?, fifth_institution=?, fifth_office=?, fifth_when=?, fifth_del=? WHERE fifth_id=?";
                $cordovaSQLite.execute($rootScope.db, chatUpd, [fifth_name, fifth_desc, fifth_user, fifth_menue_id, fifth_bill, fifth_got_spend, fifth_institution, fifth_office, fifth_when, fifth_del, fifth_id]).then(function() {
                  id++;
                  if(id < fifthArr.length) {
                    fifthArrFunc(id);
                  }
                }, function() {});
              }
              else {
                var fifthIns = "INSERT INTO fifthgift (fifth_id, fifth_name, fifth_desc, fifth_user, fifth_menue_id, fifth_bill, fifth_got_spend, fifth_institution, fifth_office, fifth_when, fifth_del) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, fifthIns, [fifth_id, fifth_name, fifth_desc, fifth_user, fifth_menue_id, fifth_bill, fifth_got_spend, fifth_institution, fifth_office, fifth_when, fifth_del]).then(function() {
                  id++;
                  if(id < fifthArr.length) {
                    fifthArrFunc(id);
                  }
                }, function() {});
              }
            }, function() {});

          }
          fifthArrFunc(0);

        }

        // DB RESERVATION
        var reservArr = data[0].reservArr;
        
        if(reservArr.length > 0) {

          var id = 0;

          function reservArrFunc(id) {

            var reservation_id = reservArr[id]['reservation_id'];
            var reservation_userid = reservArr[id]['reservation_userid'];
            var reservation_surname = reservArr[id]['reservation_surname'];
            var reservation_name = reservArr[id]['reservation_name'];
            var reservation_middlename = reservArr[id]['reservation_middlename'];
            var reservation_mobile = reservArr[id]['reservation_mobile'];
            var reservation_date = reservArr[id]['reservation_date'];
            var reservation_time = reservArr[id]['reservation_time'];
            var reservation_comment = reservArr[id]['reservation_comment'];
            var reservation_institution = reservArr[id]['reservation_institution'];
            var reservation_when = reservArr[id]['reservation_when'];
            var reservation_del = reservArr[id]['reservation_del'];
  
            var queryReserv = "SELECT * FROM reservation WHERE reservation_id = ?";
            $cordovaSQLite.execute($rootScope.db, queryReserv, [chat_id]).then(function(suc) {
            if(suc.rows.length > 0) {
                var chatUpd = "UPDATE chat SET reservation_userid=?, reservation_surname=?, reservation_name=?, reservation_middlename=?, reservation_mobile=?, reservation_date=?, reservation_time=?, reservation_comment=?, reservation_institution=?, reservation_when=?, reservation_del=? WHERE reservation_id=?";
                $cordovaSQLite.execute($rootScope.db, chatUpd, [reservation_userid, reservation_surname, reservation_name, reservation_middlename, reservation_mobile, reservation_date, reservation_time, reservation_comment, reservation_institution, reservation_when, reservation_del, reservation_id]).then(function() {
                  id++;
                  if(id < reservArr.length) {
                    reservArrFunc(id);
                  }
                }, function() {});
              }
              else {
                var reservIns = "INSERT INTO reservation (reservation_id, reservation_userid, reservation_surname, reservation_name, reservation_middlename, reservation_mobile, reservation_date, reservation_time, reservation_comment, reservation_institution, reservation_when, reservation_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, reservIns, [reservation_id, reservation_userid, reservation_surname, reservation_name, reservation_middlename, reservation_mobile, reservation_date, reservation_time, reservation_comment, reservation_institution, reservation_when, reservation_del]).then(function() {
                  id++;
                  if(id < reservArr.length) {
                    reservArrFunc(id);
                  }
                }, function() {});
              }
            }, function() {});

          }
          reservArrFunc(0);

        }

        // DB ORGANIZATION
        var orgArr = data[0].orgArr;
        
        if(orgArr.length > 0) {

          var id = 0;

          function orgArrFunc(id) {

            var org_id = orgArr[id]['org_id'];
            var org_name = orgArr[id]['org_name'];
            var org_country = orgArr[id]['org_country'];
            var org_city = orgArr[id]['org_city'];
            var org_adress = orgArr[id]['org_adress'];
            var org_timezone = orgArr[id]['org_timezone'];
            var org_tel = orgArr[id]['org_tel'];
            var org_fax = orgArr[id]['org_fax'];
            var org_mob = orgArr[id]['org_mob'];
            var org_email = orgArr[id]['org_email'];
            var org_skype = orgArr[id]['org_skype'];
            var org_site = orgArr[id]['org_site'];
            var org_tax_id = orgArr[id]['org_tax_id'];
            var org_logo = orgArr[id]['org_logo'];
            var org_sound = orgArr[id]['org_sound'];
            var org_development = orgArr[id]['org_development'];
            var org_money_points = orgArr[id]['org_money_points'];
            var org_starting_points = orgArr[id]['org_starting_points'];
            var org_money_percent = orgArr[id]['org_money_percent'];
            var org_points_points = orgArr[id]['org_points_points'];
            var org_promo_points_owner = orgArr[id]['org_promo_points_owner'];
            var org_promo_points_scan_owner = orgArr[id]['org_promo_points_scan_owner'];
            var org_promo_points_involved = orgArr[id]['org_promo_points_involved'];
            var org_promo_points_scan_involved = orgArr[id]['org_promo_points_scan_involved'];
            var org_max_points = orgArr[id]['org_max_points'];
            var org_risk_summ = orgArr[id]['org_risk_summ'];
            var org_autoaprove = orgArr[id]['org_autoaprove'];
            var org_appvers = orgArr[id]['org_appvers'];
            var org_appurl = orgArr[id]['org_appurl'];
            var org_log = orgArr[id]['org_log'];
            var org_reg = orgArr[id]['org_reg'];
            var org_del = orgArr[id]['org_del'];
  
            var queryOrg = "SELECT * FROM organizations WHERE org_id = ?";
            $cordovaSQLite.execute($rootScope.db, queryOrg, [org_id]).then(function(suc) {
              if(suc.rows.length > 0) {
                var orgUpd = "UPDATE organizations SET org_name=?, org_country=?, org_city=?, org_adress=?, org_timezone=?, org_tel=?, org_fax=?, org_mob=?, org_email=?, org_skype=?, org_site=?, org_tax_id=?, org_logo=?, org_sound=?, org_development=?, org_money_points=?, org_starting_points=?, org_money_percent=?, org_points_points=?, org_promo_points_owner=?, org_promo_points_scan_owner=?, org_promo_points_involved=?, org_promo_points_scan_involved=?, org_max_points=?, org_risk_summ=?, org_autoaprove=?, org_appvers=?, org_appurl=?, org_log=?, org_reg=?, org_del=? WHERE org_id=?";
                $cordovaSQLite.execute($rootScope.db, orgUpd, [org_name, org_country, org_city, org_adress, org_timezone, org_tel, org_fax, org_mob, org_email, org_skype, org_site, org_tax_id, org_logo, org_sound, org_development, org_money_points, org_starting_points, org_money_percent, org_points_points, org_promo_points_owner, org_promo_points_scan_owner, org_promo_points_involved, org_promo_points_scan_involved, org_max_points, org_risk_summ, org_autoaprove, org_appvers, org_appurl, org_log, org_reg, org_id]).then(function() {
                  id++;
                  if(id < orgArr.length) {
                    orgArrFunc(id);
                  }
                }, function() {});
              }
              else {
                var orgIns = "INSERT INTO organizations (org_id, org_name, org_country, org_city, org_adress, org_timezone, org_tel, org_fax, org_mob, org_email, org_skype, org_site, org_tax_id, org_logo, org_sound, org_development, org_money_points, org_starting_points, org_money_percent, org_points_points, org_promo_points_owner, org_promo_points_scan_owner, org_promo_points_involved, org_promo_points_scan_involved, org_max_points, org_risk_summ, org_autoaprove, org_appvers, org_appurl, org_log, org_reg, org_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, orgIns, [org_id, org_name, org_country, org_city, org_adress, org_timezone, org_tel, org_fax, org_mob, org_email, org_skype, org_site, org_tax_id, org_logo, org_sound, org_development, org_money_points, org_starting_points, org_money_percent, org_points_points, org_promo_points_owner, org_promo_points_scan_owner, org_promo_points_involved, org_promo_points_scan_involved, org_max_points, org_risk_summ, org_autoaprove, org_appvers, org_appurl, org_log, org_reg, org_del]).then(function() {
                  id++;
                  if(id < orgArr.length) {
                    orgArrFunc(id);
                  }
                }, function() {});
              }
            }, function() {});

          }
          orgArrFunc(0);

        }

        // DB WAVES
        var wavesArr = data[0].wavesArr;
        
        if(wavesArr.length > 0) {

          var id = 0;

          function wavesArrFunc(id) {

            var wave_id = wavesArr[id]['wave_id'];
            var wave_user = wavesArr[id]['wave_user'];
            var wave_token = wavesArr[id]['wave_token'];
            var wave_publicKey = wavesArr[id]['wave_publicKey'];
            var wave_privateKey = wavesArr[id]['wave_privateKey'];
            var wave_seedPhrase = wavesArr[id]['wave_seedPhrase'];
            var wave_seedAddress = wavesArr[id]['wave_seedAddress'];
            var wave_pass = wavesArr[id]['wave_pass'];
            var wave_institution = wavesArr[id]['wave_institution'];
            var wave_priority = wavesArr[id]['wave_priority'];
            var wave_when = wavesArr[id]['wave_when'];
            var wave_del = wavesArr[id]['wave_del'];
  
            var queryWave = "SELECT * FROM waves WHERE wave_id = ?";
            $cordovaSQLite.execute($rootScope.db, queryWave, [wave_id]).then(function(suc) {
              if(suc.rows.length > 0) {
                var waveUpd = "UPDATE waves SET wave_user=?, wave_token=?, wave_publicKey=?, wave_privateKey=?, wave_seedPhrase=?, wave_seedAddress=?, wave_pass=?, wave_institution=?, wave_priority=?, wave_when=?, wave_del=? WHERE wave_id=?";
                $cordovaSQLite.execute($rootScope.db, waveUpd, [wave_user, wave_token, wave_publicKey, wave_privateKey, wave_seedPhrase, wave_seedAddress, wave_pass, wave_institution, wave_priority, wave_when, wave_del, wave_id]).then(function() {
                  id++;
                  if(id < wavesArr.length) {
                    wavesArrFunc(id);
                  }
                }, function() {});
              }
              else {
                var waveIns = "INSERT INTO waves (wave_id, wave_user, wave_token, wave_publicKey, wave_privateKey, wave_seedPhrase, wave_seedAddress, wave_pass, wave_institution, wave_priority, wave_when, wave_del) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
                $cordovaSQLite.execute($rootScope.db, waveIns, [wave_id, wave_user, wave_token, wave_publicKey, wave_privateKey, wave_seedPhrase, wave_seedAddress, wave_pass, wave_institution, wave_priority, wave_when, wave_del]).then(function() {
                  id++;
                  if(id < wavesArr.length) {
                    wavesArrFunc(id);
                  }
                }, function() {});
              }
            }, function() {});

          }
          wavesArrFunc(0);

        }

        $timeout(function() {

          var waiterstr = JSON.stringify({
            inst_id: $rootScope.institution,
            newusr: 'waiter'
          });
            
          $http.post($rootScope.generalscript, waiterstr).then(function(waitsuc) {

            var waitdata = waitsuc.data;
            // alert('success android Waiter: '+JSON.stringify(waitdata));
            $rootScope.getWaiter(waitdata);

          }, 
          function(er) {
            // alert('error Waiter: '+JSON.stringify(er));
            $ionicLoading.hide().then(function(){
              $state.go('tab.card');
            });
          });

        }, 2000);

      }

    };

		var queryMeSel = "SELECT * FROM users WHERE user_id = ?";
		$cordovaSQLite.execute($rootScope.db, queryMeSel, [1]).then(function(success) {

      // DB ROOMS
      $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS rooms (room_id integer primary key, room_name text, room_desc text, room_employee integer, room_menue_exe text, room_priority integer, room_institution integer, room_office integer, room_upd integer, room_when integer, room_del integer)").then(function() {}, function() {});

      ifNotExists('ordering', 'order_room', 'integer', 0);

      // CHECK AND CREATE DIRECTION
			$cordovaFile.checkDir(cordova.file.documentsDirectory, $rootScope.inst_dir).then(function () {}, function () {
			  $cordovaFile.createDir(cordova.file.documentsDirectory, $rootScope.inst_dir, false).then(function () {}, function () {});
			});
			// CHECK AND CREATE DIRECTION
			$cordovaFile.checkDir(cordova.file.dataDirectory, $rootScope.inst_dir).then(function () {}, function () {
			  $cordovaFile.createDir(cordova.file.dataDirectory, $rootScope.inst_dir, false).then(function () {}, function () {});
			});

      var queryPoints = "SELECT * FROM points ORDER BY points_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryPoints, []).then(function(suc) {
        if(suc.rows.length > 0) {
          points = suc.rows.item(0).points_when;
        }
      }, function() {});

      var queryWallet = "SELECT * FROM wallet ORDER BY wallet_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryWallet, []).then(function(suc) {
        if(suc.rows.length > 0) {
          wallet = suc.rows.item(0).wallet_when;
        }
      }, function() {});

      var queryGoods = "SELECT * FROM goods ORDER BY goods_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryGoods, []).then(function(suc) {
        if(suc.rows.length > 0) {
          goods = suc.rows.item(0).goods_when;
        }
      }, function() {});

      var queryCat = "SELECT * FROM categories ORDER BY cat_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryCat, []).then(function(suc) {
        if(suc.rows.length > 0) {
          cat = suc.rows.item(0).cat_when;
        }
      }, function() {});

      var queryMenue = "SELECT * FROM menue ORDER BY menue_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryMenue, []).then(function(suc) {
        if(suc.rows.length > 0) {
          menue = suc.rows.item(0).menue_when;
        }
      }, function() {});

      var queryIngrs = "SELECT * FROM ingredients ORDER BY ingr_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryIngrs, []).then(function(suc) {
        if(suc.rows.length > 0) {
          ingrs = suc.rows.item(0).ingr_when;
        }
      }, function() {});

      var queryNews = "SELECT * FROM news ORDER BY news_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryNews, []).then(function(suc) {
        if(suc.rows.length > 0) {
          news = suc.rows.item(0).news_when;
        }
      }, function() {});

      var queryRevs = "SELECT * FROM reviews ORDER BY reviews_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryRevs, []).then(function(suc) {
        if(suc.rows.length > 0) {
          revs = suc.rows.item(0).reviews_when;
        }
      }, function() {});

      var queryAsks = "SELECT * FROM asks ORDER BY asks_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryAsks, []).then(function(suc) {
        if(suc.rows.length > 0) {
          asks = suc.rows.item(0).asks_when;
        }
      }, function() {});

      var queryGifts = "SELECT * FROM gifts ORDER BY gifts_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryGifts, []).then(function(suc) {
        if(suc.rows.length > 0) {
          gifts = suc.rows.item(0).gifts_when;
        }
      }, function() {});

      var queryChats = "SELECT * FROM chat ORDER BY chat_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryChats, []).then(function(suc) {
        if(suc.rows.length > 0) {
          chat = suc.rows.item(0).chat_when;
        }
      }, function() {});

      var queryOrdering = "SELECT * FROM ordering ORDER BY order_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryOrdering, []).then(function(suc) {
        if(suc.rows.length > 0) {
          order = suc.rows.item(0).order_when;
        }
      }, function() {});

      var queryReservation = "SELECT * FROM rooms ORDER BY room_upd DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryReservation, []).then(function(suc) {
        if(suc.rows.length > 0) {
          room = suc.rows.item(0).room_upd;
        }
      }, function() {});

      var queryFifthGift = "SELECT * FROM fifthgift ORDER BY fifth_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryFifthGift, []).then(function(suc) {
        if(suc.rows.length > 0) {
          fifthgift = suc.rows.item(0).fifth_when;
        }
      }, function() {});

      var queryReservation = "SELECT * FROM reservation ORDER BY reservation_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryReservation, []).then(function(suc) {
        if(suc.rows.length > 0) {
          reservs = suc.rows.item(0).reservation_when;
        }
      }, function() {});
      
      var queryOrganization = "SELECT * FROM organizations ORDER BY org_log DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryOrganization, []).then(function(suc) {
        if(suc.rows.length > 0) {
          organization = suc.rows.item(0).org_log;
        }
      }, function() {

        // DB ORGANIZATION
        $cordovaSQLite.execute($rootScope.db, "CREATE TABLE IF NOT EXISTS organizations (org_id integer primary key, org_name text, org_country integer, org_city integer, org_adress text, org_timezone integer, org_tel text, org_fax text, org_mob text, org_email text, org_skype text, org_site text, org_tax_id text, org_logo text, org_sound integer, org_development integer, org_money_points integer, org_starting_points integer, org_money_percent integer, org_points_points integer, org_promo_points_owner integer, org_promo_points_scan_owner integer, org_promo_points_involved integer, org_promo_points_scan_involved integer, org_max_points integer, org_risk_summ integer, org_autoaprove integer, org_appvers integer, org_appurl text, org_log integer, org_reg integer, org_del integer)").then(function() {}, function() {});

      });

      var queryWaves = "SELECT * FROM waves ORDER BY wave_when DESC LIMIT 1";
      $cordovaSQLite.execute($rootScope.db, queryWaves, []).then(function(suc) {
        if(suc.rows.length > 0) {
          waves = suc.rows.item(0).wave_when;
        }
      }, function() {});

      $timeout(function() {

        if(!testing) {

          var pushConfig = {
            android: {
              senderID: gcm_android
            },
            ios: {
              alert: "true",
              badge: "true",
              clearBadge: "true",
              sound: "true"
            },
            windows: {}
          };

          $cordovaPushV5.initialize(pushConfig).then(function() {
            // sets Badge number to zero on iOS
            $cordovaPushV5.setBadgeNumber(0);
            // start listening for new notifications
            $cordovaPushV5.onNotification();
            // start listening for errors
            $cordovaPushV5.onError();
            // register to get registrationId
            $cordovaPushV5.register().then(function(data) {
                var gcmstr = JSON.stringify({
                  device: $rootScope.model,
                  device_id: $rootScope.uuid,
                  device_version: $rootScope.version,
                  device_os: $rootScope.platform,
                  inst_id: $rootScope.institution,
                  gcm: data,
                  newusr: 'gcmreg'
                });
                $http.post($rootScope.generalscript, gcmstr).then(function() {}, function(er) {});
            });
          }, function() {});

          $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data) {
            if(!data.additionalData.foreground) {
              $localStorage.push_id = data.additionalData.push_id;
            }
            if($localStorage.push_id) {
              var pushobj = {"push_usr": $rootScope.uuid, "push_inst": $rootScope.institution, "push_push": $localStorage.push_id, "push_open": 1};
              var pushjson = JSON.stringify(pushobj);
              $http.post(pushgotlink, pushjson).then(function(suc) {$localStorage.push_id = [];}, function(er) {});
            }
          });
          $rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e){
            // e.message
          });

        }

        var jsonedstr = JSON.stringify({
            device: $rootScope.model,
            device_id: $rootScope.uuid,
            device_version: $rootScope.version,
            device_os: $rootScope.platform,
            inst_id: $rootScope.institution,
            points: points,
            wallet: wallet,
            goods: goods,
            cat: cat,
            menue: menue,
            ingrs: ingrs,
            news: news,
            revs: revs,
            asks: asks,
            gifts: gifts,
            chat: chat,
            order: order,
            room: room,
            fifthgift: fifthgift,
            reservs: reservs,
            organization: organization,
            waves: waves,
            newusr: 'check'
        });

        $http.post($rootScope.generalscript, jsonedstr).then(function(suc) {
          $rootScope.getUpdate(suc.data, success.rows.item(0).user_upd);
        }, 
        function(er) {
            $rootScope.intconnectupd = false;
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });
            $ionicLoading.hide().then(function(){
              $state.go('tab.card');
            });
        });

      }, 1000);

		},
		function(error) {

			// CHECK AND CREATE DIRECTION
			$cordovaFile.checkDir(cordova.file.documentsDirectory, $rootScope.inst_dir).then(function () {}, function () {
			  $cordovaFile.createDir(cordova.file.documentsDirectory, $rootScope.inst_dir, false).then(function () {}, function () {});
			});
			// CHECK AND CREATE DIRECTION
			$cordovaFile.checkDir(cordova.file.dataDirectory, $rootScope.inst_dir).then(function () {}, function () {
			  $cordovaFile.createDir(cordova.file.dataDirectory, $rootScope.inst_dir, false).then(function () {}, function () {});
			});

			if(!testing) {

				var pushConfig = {
				  android: {
					senderID: gcm_android
				  },
				  ios: {
					alert: "true",
					badge: "true",
          clearBadge: "true",
					sound: "true"
				  },
				  windows: {}
				};

				$cordovaPushV5.initialize(pushConfig).then(function() {
				  // sets Badge number to zero on iOS
				  $cordovaPushV5.setBadgeNumber(0);
				  // start listening for new notifications
				  $cordovaPushV5.onNotification();
				  // start listening for errors
				  $cordovaPushV5.onError();
				  // register to get registrationId
				  $cordovaPushV5.register().then(function(data) {
            // `data.registrationId` save it somewhere;
            var gcmstr = JSON.stringify({
              device: $rootScope.model,
              device_id: $rootScope.uuid,
              device_version: $rootScope.version,
              device_os: $rootScope.platform,
              inst_id: $rootScope.institution,
              gcm: data,
              newusr: 'gcmreg'
            });
            
            $http.post($rootScope.generalscript, gcmstr).then(function(gcmsuc) {}, function(er) {});
					
				  })
				}, function() {});

				$rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data) {
				  if(!data.additionalData.foreground) {
            $localStorage.push_id = data.additionalData.push_id;
				  }
				  if($localStorage.push_id) {
            var pushobj = {"push_usr": $rootScope.uuid, "push_inst": $rootScope.institution, "push_push": $localStorage.push_id, "push_open": 1};
            var pushjson = JSON.stringify(pushobj);
            $http.post(pushgotlink, pushjson).then(function(suc) {$localStorage.push_id = [];}, function(er) {});
				  }
				});
				// triggered every time error occurs
				$rootScope.$on('$cordovaPushV5:errorOcurred', function(event, e){
				  // e.message
				});

			}

			var jsonedstr = JSON.stringify({
				device: $rootScope.model,
				device_id: $rootScope.uuid,
				device_version: $rootScope.version,
				device_os: $rootScope.platform,
				inst_id: $rootScope.institution,
				newusr: 'newusr'
			});

			$http.post($rootScope.generalscript, jsonedstr).then(function(suc) {
				$rootScope.getNew(suc.data);

			}, 
			function(er) {
				$rootScope.intconnectupd = false;
			});

		});

  });

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Turn off caching for demo simplicity's sake
  $ionicConfigProvider.views.maxCache(1);

  $ionicConfigProvider.scrolling.jsScrolling(true);

  $ionicConfigProvider.views.swipeBackEnabled(false);

  $ionicConfigProvider.tabs.position('bottom');

  $ionicConfigProvider.navBar.alignTitle('center');

  $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);

  // $ionicConfigProvider.views.transition('none');

  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    cache: false,
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.card', {
    cache: false,
    url: '/card',
    views: {
      'tab-card': {
        templateUrl: 'templates/tab-card.html',
        controller: 'CardCtrl'
      }
    }
  })

  .state('tab.menu-cats', {
    cache: false,
    url: '/menu-cats',
    views: {
      'tab-menu': {
        templateUrl: 'templates/tab-menu-cats.html',
        controller: 'MenuCatsCtrl'
      }
    }
  })

  .state('tab.menu', {
    cache: false,
    url: '/menu/:menuCat',
    views: {
      'tab-menu': {
        templateUrl: 'templates/tab-menu.html',
        controller: 'MenuCtrl'
      }
    }
  })
    
  .state('tab.menu-detail', {
    cache: false,
    url: '/menu/:menuId',
    views: {
      'tab-menu': {
        templateUrl: 'templates/tab-menu-detail.html',
        controller: 'MenuDetailCtrl'
      }
    }
  })

  .state('tab.news', {
    cache: false,
    url: '/news',
    views: {
      'tab-news': {
        templateUrl: 'templates/tab-news.html',
        controller: 'NewsCtrl'
      }
    }
  })

  .state('tab.news-detail', {
    cache: false,
    url: '/news/:newsId',
    views: {
      'tab-news': {
        templateUrl: 'templates/tab-news-detail.html',
        controller: 'NewsDetailCtrl'
      }
    }
  })

  .state('tab.contact-map', {
    // cache: false,
    url: '/contact-map',
    views: {
      'tab-contact-map': {
        templateUrl: 'templates/tab-contact-map.html',
        controller: 'ContactMapCtrl'
      }
    }
  })

  .state('tab.contact-list', {
    // cache: false,
    url: '/contact-list',
    views: {
      'tab-contact-map': {
        templateUrl: 'templates/tab-contact-list.html',
        controller: 'ContactListCtrl'
      }
    }
  })

  .state('tab.else', {
    cache: false,
    url: '/else',
    views: {
      'tab-else': {
        templateUrl: 'templates/tab-else.html',
        controller: 'ElseCtrl'
      }
    }
  })

  .state('tab.gifts', {
    cache: false,
    url: '/gifts',
    views: {
      'tab-card': {
        templateUrl: 'templates/tab-gifts.html',
        controller: 'GiftsCtrl'
      }
    }
  })

  .state('tab.gifts-detail', {
    cache: false,
    url: '/gifts/:giftId',
    views: {
      'tab-card': {
        templateUrl: 'templates/tab-gifts-detail.html',
        controller: 'GiftsDetailCtrl'
      }
    }
  })

  .state('tab.groups', {
    cache: false,
    url: '/groups',
    views: {
      'tab-card': {
        templateUrl: 'templates/tab-groups.html',
        controller: 'GroupsCtrl'
      }
    }
  })

  .state('tab.shares', {
    cache: false,
    url: '/shares',
    views: {
      'tab-card': {
        templateUrl: 'templates/tab-shares.html',
        controller: 'SharesCtrl'
      }
    }
  })

  .state('tab.share', {
    cache: false,
    url: '/share',
    views: {
      'tab-else': {
        templateUrl: 'templates/tab-shares.html',
        controller: 'SharesCtrl'
      }
    }
  })

  .state('tab.support', {
    cache: false,
    url: '/support',
    views: {
      'tab-else': {
        templateUrl: 'templates/tab-support.html',
        controller: 'SupportCtrl'
      }
    }
  })

  .state('tab.support-details', {
    cache: false,
    url: '/support-details/:supportId',
    views: {
      'tab-else': {
        templateUrl: 'templates/tab-support-details.html',
        controller: 'SupportDetailsCtrl'
      }
    }
  })

  .state('tab.promo', {
    cache: false,
    url: '/promo',
    views: {
      'tab-card': {
        templateUrl: 'templates/tab-promo.html',
        controller: 'PromoCtrl'
      }
    }
  })

  .state('tab.about', {
    cache: false,
    url: '/about',
    views: {
      'tab-else': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutCtrl'
      }
    }
  })

  .state('tab.about-us', {
    cache: false,
    url: '/about-us',
    views: {
      'tab-else': {
        templateUrl: 'templates/tab-about-us.html',
        controller: 'AboutUsCtrl'
      }
    }
  })

  .state('tab.reservation', {
    cache: false,
    url: '/reservation',
    views: {
      'tab-else': {
        templateUrl: 'templates/tab-reservation.html',
        controller: 'ReservationCtrl'
      }
    }
  })

  .state('tab.entry-category', {
      url: '/entry-category',
      views: {
          'tab-else': {
              templateUrl: 'templates/tab-entry-category.html',
              controller: 'EntryCatCtrl'
          }
      }
  })

  .state('tab.entry-start', {
      url: '/entry-start/:catId/:goodId',
      views: {
          'tab-else': {
              templateUrl: 'templates/tab-entry-start.html',
              controller: 'EntryStartCtrl'
          }
      }
  })

  .state('tab.entry-worker', {
      url: '/entry-worker/:menId',
      views: {
          'tab-else': {
              templateUrl: 'templates/tab-entry-worker.html',
              controller: 'EntryWorkerCtrl'
          }
      }
  })

  .state('tab.entry-time', {
      url: '/entry-time/:menId/:workId',
      views: {
          'tab-else': {
              templateUrl: 'templates/tab-entry-time.html',
              controller: 'EntryTimeCtrl'
          }
      }
  })

  .state('tab.entry', {
      url: '/entry/:menId/:workId/:orderHour',
      views: {
          'tab-else': {
              templateUrl: 'templates/tab-entry.html',
              controller: 'EntryCtrl'
          }
      }
  })

  .state('tab.fifthgift', {
    cache: false,
    url: '/fifthgift',
    views: {
      'tab-else': {
        templateUrl: 'templates/tab-fifthgift.html',
        controller: 'FifthGiftCtrl'
      }
    }
  })

  .state('tab.points', {
    cache: false,
    url: '/points',
    views: {
      'tab-else': {
        templateUrl: 'templates/tab-points.html',
        controller: 'PointsCtrl'
      }
    }
  })

  .state('tab.purchase', {
    cache: false,
    url: '/purchase',
    views: {
      'tab-else': {
        templateUrl: 'templates/tab-purchase.html',
        controller: 'PurchaseCtrl'
      }
    }
  })

  .state('tab.profile', {
    cache: false,
    url: '/profile',
    views: {
      'tab-else': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tab.transactions', {
    cache: false,
    url: '/transactions',
    views: {
      'tab-else': {
        templateUrl: 'templates/tab-transactions.html',
        controller: 'TransactionsCtrl'
      }
    }
  })

  .state('profile-edit', {
    cache: false,
    url: '/profile-edit',
    templateUrl: 'templates/profile-edit.html',
    controller: 'ProfileEditCtrl'
  })

  .state('support-chat', {
    cache: false,
    url: '/support-chat',
    templateUrl: 'templates/support-chat.html',
    controller: 'SupportChatCtrl'
  })

  .state('gifts-get', {
    cache: false,
    url: '/gifts-get/:giftId',
    templateUrl: 'templates/gifts-get.html',
    controller: 'GiftsGetCtrl'
  })

  .state('order-summ', {
    cache: false,
    url: '/order-summ',
    templateUrl: 'templates/order-summ.html',
    controller: 'OrderSummCtrl'
  })

  .state('order-qr', {
    cache: false,
    url: '/order-qr',
    templateUrl: 'templates/order-qr.html',
    controller: 'OrderQRCtrl'
  })

  .state('cart', {
    cache: false,
    url: '/cart',
    templateUrl: 'templates/tab-cart.html',
    controller: 'CartCtrl'
  })

  .state('cart-send', {
    cache: false,
    url: '/cart-send',
    templateUrl: 'templates/cart-send.html',
    controller: 'CartSendCtrl'
  })

  .state('login', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('login');

})

.config(function($translateProvider) {

    $translateProvider.translations("ru", {

      // All
      conn_err_tit: 'Ошибка',
      conn_err_tmp: 'Ошибка с соединением',
      conn_err_close: 'Закрыть',
      day_mo: 'Пн',
      day_tu: 'Вт',
      day_we: 'Ср',
      day_th: 'Чт',
      day_fr: 'Пт',
      day_st: 'Сб',
      day_su: 'Вс',
      day_full_mo: 'Понедельник',
      day_full_tu: 'Вторник',
      day_full_we: 'Среда',
      day_full_th: 'Четверг',
      day_full_fr: 'Пятница',
      day_full_st: 'Суббота',
      day_full_su: 'Воскресенье',
      month_jan: 'Январь',
      month_feb: 'Февраль',
      month_mar: 'Март',
      month_apr: 'Апрель',
      month_may: 'Май',
      month_jun: 'Июнь',
      month_jul: 'Июль',
      month_aug: 'Август',
      month_sep: 'Сентябрь',
      month_okt: 'Октябрь',
      month_nov: 'Ноябрь',
      month_dez: 'Декабрь',
      day_month_accept: 'Применить',
      day_month_cancel: 'Отмена',
      blocked_title: "Заблокированно!",
      blocked_body: "Доступ к данной услуге был закрыт.",
      blocked_cancel: 'Закрыть',

      // Login
      login_nointernet: 'Нет интернета',

      // Tabs
      tabs_card: 'Карта',
      tabs_menu: 'Меню',
      tabs_news: 'Акции',
      tabs_contact: 'Контакты',
      tabs_else: 'Еще',

      // CardCtrl
      card_title: 'Walmart',
      card_card: 'Карта постоянного клиента',
      card_balance: 'Текущий баланс',
      card_show_card: 'Предъявить карту',
      card_show_card_sub: 'Предъявите карту и получите бонусные баллы',
      card_gifts: 'Подарки',
      card_groups: 'Сообщества',
      card_shares: 'Поделиться',
      card_ctrl_pop_tit: 'Спасибо!',
      card_ctrl_pop_temp: 'Ваши ответы помогают усовершенствовать «Название заведения».',
      card_ctrl_pop_btn1: 'Закрыть',
      card_pop_phone_tit: "Требуется номер телефона!",
      card_pop_phone_tmp: "Для использования бонусной системы необходимо указать и подтвердить номер мобильного телефона в личном кабинете.",
      card_pop_phone_btn1: "Указать номер",
      card_pop_phone_btn2: "Отмена",

      // OrderSummCtrl
      order_summ_title: 'Сумма заказа',
      order_summ_cancel: 'Отмена',
      order_summ_next: 'Далее',
      order_summ_text: 'Введите сумму, на которую был совершен заказ',
      order_summ_money: 'Рублей',
      order_summ_ctrl_pop_tit: 'Какая сумма?',
      order_summ_ctrl_pop_tmp: 'Введите сумму чека',

      // OrderQRCtrl
      order_qr_title: 'Карта постоянного клиента',
      order_qr_text_top: 'Предъявите полученный QR-код Вашему официанту',
      order_qr_money: 'Рублей',
      order_qr_ready: 'Готово',
      order_qr_change_amount: 'Изменить сумму заказа',
      order_qr_pop_thanks_tit: 'Спасибо',
      order_qr_pop_thanks_temp: 'Ваши отзывы помогают усовершенствовать «Название заведения». Мы свяжемся с вами, если нам понадобится дополнительная информация',
      order_qr_pop_thanks_btn1: 'Закрыть',
      order_qr_pop_review_tit: 'Желаете оставить отзыв?',
      order_qr_pop_review_temp: 'Отзыв увидет только руководство',
      order_qr_pop_review_btn1: 'Да',
      order_qr_pop_review_btn2: 'Нет',
      order_qr_pop_tooften_tit: 'Слишком часто!',
      order_qr_pop_tooften_temp: 'Возможно каждые 12 часов',
      order_qr_review_choise: 'Выберите заведение',
      order_qr_review_choose_pic: 'Прикрепите изображение',
      order_qr_review_make_pic: 'Сделать снимок',
      order_qr_review_take_pic: 'Выбрать из галереи',
      order_qr_review_cancel: 'Отмена',

      // Review
      review_title: 'Отзыв',
      review_send: 'Отправить',
      review_ask: 'Кратко опишите, что вам понравилось, а что мы могли бы усовершенствовать.',
      review_location: 'Заведение',
      review_stars: 'Оцените наш сервис',
      review_review: 'Ваш отзыв',
      review_ctrl_pop_thanks_tit: 'Спасибо',
      review_ctrl_pop_thanks_temp: 'Ваши отзывы помогают усовершенствовать «Название заведения». Мы свяжемся с вами, если нам понадобится дополнительная информация',
      review_ctrl_pop_thanks_btn1: 'Закрыть',
      review_ctrl_pop_review_tit: 'Желаете оставить отзыв?',
      review_ctrl_pop_review_temp: 'лалаал',
      review_ctrl_pop_review_btn1: 'Да',
      review_ctrl_pop_review_btn2: 'Нет',
      review_ctrl_pop_tooften_tit: 'Слишком часто!',
      review_ctrl_pop_tooften_temp: 'Возможно каждые 12 часов',

      // GiftsCtrl
      gifts_title: 'Подарки',
      gifts_cost: 'Стоимость',
      gifts_take_look: 'Следите за обновлениями',
      gifts_look_here: 'Заглядывайте сюда почаще, и Вы будете узнавать о новинках первыми!',

      // GiftsDetailCtrl
      gifts_detail_cost: 'Стоимость подарка',
      gifts_detail_get: 'Получить',
      gifts_detail_ctrl_pop_tit: 'Недостаточно баллов',
      gifts_detail_ctrl_pop_tmp1: 'К сожалению, Вам не хватает',
      gifts_detail_ctrl_pop_tmp2: 'баллов',
      gifts_detail_ctrl_pop_tmp3: 'чтобы получить подарок',
      gifts_detail_ctrl_pop_btn1: 'ОК',
      gifts_detail_pop_phone_tit: "Требуется номер телефона!",
      gifts_detail_pop_phone_tmp: "Для использования бонусной системы необходимо указать и подтвердить номер мобильного телефона в личном кабинете.",
      gifts_detail_pop_phone_btn1: "Указать номер",
      gifts_detail_pop_phone_btn2: "Отмена",

      // GiftsGetCtrl
      gifts_get_title: 'Получить подарок',
      gifts_get_qr: 'Предъявите полученный QR-код Вашему официанту',
      gifts_get_cost: 'Стоимость',
      gifts_get_ready: 'Готово',
      gifts_get_cancel: 'Отменить',
      gifts_get_ctrl_pop_rev_tit: 'Спасибо!',
      gifts_get_ctrl_pop_rev_tmp: 'Ваши отзывы помогают усовершенствовать «Название заведения». Мы свяжемся с вами, если нам понадобится дополнительная информация',
      gifts_get_ctrl_pop_rev_btn1: 'Закрыть',
      gifts_get_ctrl_pop_review_tit: 'Желаете оставить отзыв?',
      gifts_get_ctrl_pop_review_temp: 'лалаал',
      gifts_get_ctrl_pop_review_btn1: 'Да',
      gifts_get_ctrl_pop_review_btn2: 'Нет',
      gifts_get_ctrl_pop_tooften_tit: 'Слишком часто!',
      gifts_get_ctrl_pop_tooften_temp: 'Возможно каждые 12 часов',
      gifts_review_choise: 'Выберите заведение',
      gifts_review_choose_pic: 'Прикрепите изображение',
      gifts_review_make_pic: 'Сделать снимок',
      gifts_review_take_pic: 'Выбрать из галереи',
      gifts_review_cancel: 'Отмена',

      // GroupsCtrl
      groups_title: 'Сообщества',
      groups_become_mem: 'Вступайте в наши официальные сообщества',
      groups_place_com: 'Оставляйте свои комментарии, делитесь своим мнением и приглашайте друзей!',
      groups_fb: 'Фейсбук',
      groups_vk: 'Вконтакте',
      groups_tw: 'Твиттер',
      groups_ig: 'Инстаграм',

      // PromoCtrl
      promo_title: 'Поделиться',
      promo_code: 'ВАШ ПРОМОКОД',
      promo_recommend: 'Рекомендуйте нас друзьям и получайте баллы',
      promo_use_promo: 'Используйте Ваш персональный промо-код что бы зарабатывать бонусы',
      promo_you: 'Вам',
      promo_friend: 'Другу',
      promo_use_friend: 'Ваш друг ввел промо-код',
      promo_come_friend: 'Ваш друг воспользовался нашими услугами',
      promo_use_me: 'Вы ввели промо-код',

      // Discount
      discount_modal_cancel: 'Отмена',
      discount_modal_code: 'Дискаунт карта',
      discount_modal_qr_ready: 'Готово',
      discount_modal_qr_change_discount: 'Внести новую карту',

      // SharesCtrl
      shares_title: 'Поделиться',
      shares_recommend: 'Рекомендуйте нас друзьям, делитесь в социальных сетях и получайте баллы',
      shares_fb: 'Фейсбук',
      shares_vk: 'Вконтакте',
      shares_tw: 'Твиттер',
      shares_ig: 'Инстаграм',
      shares_sms: 'Смс',
      share_txt_1: 'Установи приложение',
      share_txt_1_1: 'и получи бонусы используя следующий промокод:',
      share_txt_1_2: 'и получи бонусы',
      share_promo: 'промокод',

      // MenuCatsCtrl
      menue_cat_title: 'Категории',

      // MenuCtrl
      menue_title: 'Меню',
      menue_costs: 'Стоимость',
      menue_money: 'руб',

      // MenuDetailCtrl
      menue_detail_costs: 'Стоимость',
      menue_detail_money: 'руб',
      menue_detail_amount: 'шт',

      // CartCtrl
      cart_title: 'Корзина',
      cart_next: 'Далее',
      cart_amount: 'Количество',
      cart_costs: 'Стоимость',
      cart_money: 'руб',
      cart_empty: 'Ваша корзина пуста',
      cart_empty_take: 'Вернитесь в меню и положите товар в корзину!',

      // CartSendCtrl
      cart_send_title: 'Заказ',
      cart_send_back: 'Назад',
      cart_send_next: 'Отправить',
      cart_send_surname: 'Фамилия',
      cart_send_name: 'Имя',
      cart_send_middlename: 'Отчество',
      cart_send_mobile: 'Мобильный телефон',
      cart_send_email: 'Электронная почта',
      cart_send_town: 'Город',
      cart_send_adress: 'Адрес',
      cart_send_comment: 'Комментарий',
      cart_cntr_pop_tit: 'Спасибо',
      cart_cntr_pop_tmp: 'Ожидайте звонка',
      cart_cntr_pop_send_ord_tit: 'Желаете отправить заказ',
      cart_cntr_pop_send_ord_tmp: 'Отправить',
      cart_cntr_pop_send_ord_btn1: 'Да',
      cart_cntr_pop_send_ord_btn2: 'Нет',
      cart_cntr_pop_send_ord_send: 'Отправляем',
      cart_cntr_pop_err1_tit: 'Внимание',
      cart_cntr_pop_err1_tmp: 'Не получилось разместить заказ',
      cart_cntr_pop_err2_tit: 'Внимание',
      cart_cntr_pop_err2_tmp: 'Сервер недоступен',
      cart_cntr_pop_nottake_ord_tit: 'Заказы не принимаются!',
      cart_cntr_pop_nottake_ord_tmp: 'В данный момент заказы не принимаются!',
      cart_cntr_pop_nottake_ord_btn1: 'Закрыть',

      // NewsCtrl
      news_title: 'Акции',
      news_take_look: 'Следите за обновлениями',
      news_look_here: 'Заглядывайте сюда почаще, и Вы будете узнавать о новинках первыми!',
      news_firstgift: 'Первый подарок',

      // NewsDetailCtrl
      news_detail_from: 'С',
      news_detail_to: 'до',
      news_detail_qr: 'Предъявите QR-код Вашему официанту',

      // ContactMapCtrl
      contact_map_map: 'Карта',
      contact_map_list: 'Список',
      contact_map_distance: 'м',
      contact_map_opened: 'открыто',
      contact_map_closed: 'закрыто',
      contact_map_reserved: 'Забронировать',

      // ContactListCtrl
      contact_list_map: 'Карта',
      contact_list_list: 'Список',
      contact_list_distance: 'км',
      contact_list_opened: 'открыто',
      contact_list_closed: 'закрыто',
      contact_list_call: 'Позвонить',
      contact_list_email: 'Написать',
      contact_list_site: 'Перейти на сайт',
      contact_list_phones: 'КОНТАКТНЫЕ ТЕЛЕФОНЫ',

      // ElseCtrl
      else_title: 'Еще',
      else_profile: 'Личный кабинет',
      else_points: 'История баллов',
      else_purchase: 'История заказов',
      else_review: 'Оставить отзыв',
      else_bonus: 'Бонусная программа',
      else_share: 'Поделиться',
      else_support: 'Техническая поддержка',
      else_reservation: 'Бронь',
      else_entry: 'Онлайн запись',
      else_fifthgift: 'Пятая покупка в подарок',
      else_promo: 'Использовать промокод',
      else_discount: 'Дисконтная карта',
      else_about_us: 'О нас',
      else_about: 'О разработчике',
      else_policy: 'Политика конфиденциальности и правила пользования.',
      else_review_choise: 'Выберите заведение',
      else_review_choose_pic: 'Прикрепите изображение',
      else_review_make_pic: 'Сделать снимок',
      else_review_take_pic: 'Выбрать из галереи',
      else_review_cancel: 'Отмена',
      else_pop_phone_tit: "Требуется номер телефона!",
      else_pop_phone_tmp: "Для использования бонусной системы необходимо указать и подтвердить номер мобильного телефона в личном кабинете.",
      else_pop_phone_btn1: "Указать номер",
      else_pop_phone_btn2: "Отмена",
      
      langru: 'Русский',
      langen: 'Английский',
      langde: 'Немецкий',
      
      else_push_thank: 'Спасибо!',
      else_push_thank_text: 'Ваши отзывы помогают усовершенствовать «Название заведения». Мы свяжемся с вами, если нам понадобится дополнительная информация',
      else_push_btn_close: 'Закрыть',

      // ProfileCtrl
      profile_title: 'Личный кабинет',
      profile_promo: 'Мой промокод',
      profile_history: 'ИСТОРИЯ ОПЕРАЦИЙ',
      profile_awaiting: 'Ожидает подтверждения',
      profile_confirmed: 'Подтверждено',
      profile_denied: 'Отклонено',
      profile_canceled: 'Отменено',
      profile_cancel: 'Отменить',
      profile_go_history: 'Посмотреть всю историю',
      profile_operations: 'Операций преведенных Вами',
      profile_ctrl_pop_canc_tit: 'Отмена записи',
      profile_ctrl_pop_canc_temp: 'Вы действительно хотите отменить данную запись?',
      profile_ctrl_pop_canc_btn1: 'Нет',
      profile_ctrl_pop_canc_btn2: 'Да',

      // ProfileEditCtrl
      profile_edit_title: 'Изменить профиль',
      profile_edit_cancel: 'Отмена',
      profile_edit_ready: 'Готово',
      profile_edit_promo: 'Мой промокод',
      profile_edit_surname: 'Фамилия',
      profile_edit_name: 'Имя',
      profile_edit_middlename: 'Отчество',
      profile_edit_data: 'ЛИЧНЫЕ ДАННЫЕ',
      profile_edit_gender: 'Пол',
      profile_edit_male: 'Мужской',
      profile_edit_female: 'Женский',
      profile_edit_birthday: 'Дата рождения',
      profile_edit_nobirth: 'Не указан',
      profile_edit_mobile: 'Мобильный телефон',
      profile_edit_nomob: 'Не указан',
      profile_edit_email: 'Электронная почта',
      profile_edit_nomail: 'Не указан',
      profile_edit_ctrl_pop_proofed_tit: 'Внимание',
      profile_edit_ctrl_pop_proofed_temp: 'Номер уже Подтвержден!',
      profile_edit_ctrl_pop_caution_tit: 'Внимание!',
      profile_edit_ctrl_pop_caution_tmp: 'Номер уже подтвержденный',
      profile_edit_ctrl_pop_5minagain_tit: 'Внимание!',
      profile_edit_ctrl_pop_5minagain_tmp: 'Повторный запрос через 5 минут! Но возможно задать предыдущий код.',
      profile_edit_ctrl_pop_numagain_tit: 'Внимание!',
      profile_edit_ctrl_pop_numagain_tmp: 'Укажите Ваш номер телефона!',
      profile_edit_ctrl_pop_reqerr_tit: 'Ошибка',
      profile_edit_ctrl_pop_reqerr_tmp: 'Ошибка в запросе подтверждения!',
      profile_edit_ctrl_pop_answerr_tit: 'Ошибка',
      profile_edit_ctrl_pop_answerr_tmp: 'Ошибка в ответе сохранения!',
      profile_edit_ctrl_pop_discount_tit: 'Дисконтная карта',
      profile_edit_ctrl_pop_discount_tmp: 'Дисконтная карта добавленна!',
      profile_edit_ctrl_pop_block_tit: 'Блокировка',
      profile_edit_ctrl_pop_block_tmp: 'Вы заблокированы!',
      profile_edit_ctrl_pop_deblock_tit: 'Блокировка',
      profile_edit_ctrl_pop_deblock_tmp: 'Вы разблокированы!',
      profile_edit_ctrl_pop_numconf_tit: 'Спасибо!',
      profile_edit_ctrl_pop_numconf_tmp: 'Номер подтвержен!',
      profile_edit_ctrl_pop_numconf_btn1: 'ОК',
      profile_edit_ctrl_pop_erransw_tit: 'Ошибка',
      profile_edit_ctrl_pop_erransw_tmp: 'Ошибка в ответе подтверждения!',
      profile_edit_ctrl_pop_errcode_tit: 'Внимание!',
      profile_edit_ctrl_pop_errcode_tmp: 'Неверно заданный код!',
      profile_edit_ctrl_pop_errconf_tit: 'Ошибка',
      profile_edit_ctrl_pop_errconf_tmp: 'Ошибка в ответе подтверждения!',
      profile_review_pic_delete: 'Удалить текущее фото',
      profile_review_choise: 'Сменить фото профиля',
      profile_review_choose_pic: 'Прикрепите изображение',
      profile_review_make_pic: 'Сделать снимок',
      profile_review_take_pic: 'Выбрать из галереи',
      profile_review_cancel: 'Отмена',

      // PointsCtrl
      points_title: 'История баллов',
      points_money: 'руб',
      points_awaiting: 'Ожидает подтверждения',
      points_confirmed: 'Подтверждено',
      points_canceled: 'Отклонено',

      // PurchaseCtrl
      purchase_title: 'История заказов',
      purchase_money: 'руб',

      // SupportCtrl
      support_title: 'Техническая поддержка',
      support_connection: 'Прямая связь техподдержки',
      support_question: 'Задайте свой вопрос специалисту',

      // SupportDetailsCtrl
      support_details_title: 'Техническая поддержка',
      support_details_connection: 'Прямая связь техподдержки',
      support_details_question: 'Задайте свой вопрос специалисту',

      // SupportChatCtrl
      support_chat_title: 'Прямая связь',
      support_chat_question: 'Задайте интересующий Вас вопрос нашему специалисту',
      support_chat_message: 'Ваше сообщение',
      support_chat_send: 'Отпр.',
      support_chat_call_ctrl_pop_btn1: 'Отмена',
      support_chat_call_ctrl_pop_btn2: 'Позвонить',
      support_chat_hello: 'Добрый день! Чем Вам помочь?',

      // ReservationCtrl
      reservation_title: 'Бронь',
      reservation_send: 'Отправить',
      reservation_surname: 'Фамилия',
      reservation_name: 'Имя',
      reservation_middlename: 'Отчество',
      reservation_date: 'Дата',
      reservation_time: 'Время',
      reservation_amount: 'Кол. гостей',
      reservation_comment: 'Комментарий',
      reservation_ctrl_pop_tit: 'Спасибо!',
      reservation_ctrl_pop_temp: 'Запись принята. Мы свяжемся с вами, если нам понадобится дополнительная информация',
      reservation_ctrl_pop_btn1: 'Закрыть',

      // Entry All
      order_bs_online_reg_1: "Онлайн запись",
      order_bs_online_reg_2: "Company App",

      // EntryCatCtrl
      order_bs_top_1: "Выберите услугу",

      // EntryStartCtrl
      order_bs_top_2: "Записаться",
      order_bs_go_on: "Далее",

      // EntryWorkerCtrl
      order_bs_top_3: "Выберите Мастера",
      order_bs_worker_x_top: "Не имеет значения",
      order_bs_worker_x_sub: "Не указано",

      // EntryTimeCtrl
      order_bs_top_4: "Выберите дату и время",

      // EntryCtrl
      order_bs_top_5: "Контакты",
      order_bs_add_order: "Добавить запись",
      order_bs_your_name: "Имя",
      order_bs_your_name_ex: "Имя",
      order_bs_phone: "Телефон",
      order_bs_ex_phone_1: "Например: 79061234567, 375291234567",
      order_bs_ex_phone_2: "Только цифры! Пример: 79061234567, 375291234567",
      order_bs_email: "Email",
      order_bs_email_ex: "email@email.ru",
      order_bs_comment: "Комментарий",
      order_bs_comment_ex: "Мой комментарий",
      order_bs_confirm: "Записаться",
      order_bs_ctrl_pop_tit: 'Спасибо!',
      order_bs_ctrl_pop_temp: 'Вы записались! Ожидайте звонка.',
      order_bs_ctrl_pop_btn1: 'Закрыть',
      order_bs_ctrl_pop_err5min_tit: 'Внимание!',
      order_bs_ctrl_pop_err5min_temp: 'Повторный запрос только через 5 минут!',
      order_bs_ctrl_pop_err5min_btn1: 'Закрыть',
      order_bs_ctrl_pop_errphone_tit: 'Внимание!',
      order_bs_ctrl_pop_errphone_temp: 'Укажите Ваш номер телефона!',
      order_bs_ctrl_pop_errphone_btn1: 'Закрыть',
      order_bs_ctrl_pop_erralready_tit: 'Внимание!',
      order_bs_ctrl_pop_erralready_temp: 'Запись уже существует!',
      order_bs_ctrl_pop_erralready_btn1: 'Закрыть',
      order_bs_ctrl_pop_errempty_tit: 'Пустая запись!',
      order_bs_ctrl_pop_errempty_temp: 'Добавьте минимум одну запись.',
      order_bs_ctrl_pop_errempty_btn1: 'Закрыть',

      // FifthGiftCtrl
      fifth_title: 'Пятая покупка в подарок',
      fifth_amount: 'Количество совершенных покупок',
      fifth_qr: 'Предъявите полученный QR-код Вашему официанту и получите подарок',
      fifth_ready: 'Готово',

      // AboutCtrl
      about_title: 'О разработчике',
      about_text: 'Разработчик хороший и ласковый',

      // AboutUsCtrl
      about_us_title: 'О нас',
      about_us_text: 'Пару слов о нас',

      // TransactionsCtrl
      trans_title: 'История операций',
      trans_awaiting: 'Ожидает подтверждения',
      trans_confirmed: 'Подтверждено',
      trans_denied: 'Отклонено',
      trans_canceled: 'Отменено',
      trans_cancel: 'Отменить',
      trans_ctrl_pop_canc_tit: 'Отмена записи',
      trans_ctrl_pop_canc_tmp: 'Вы действительно хотите отменить данную запись?',
      trans_ctrl_pop_canc_btn1: 'Нет',
      trans_ctrl_pop_canc_btn2: 'Да',

      // Bonus Modal
      bonus_title: 'Бонусная программа',
      bonus_txt_title_1: 'Правила бонусной программы',
      bonus_txt_body_1: 'Оплата за заказ производится только в белорусских рублях',
      bonus_txt_title_2: 'Еще',
      bonus_txt_body_2: 'ПОЖАЛУЙСТА, ПРЕДУПРЕДИТЕ ДИСПЕТЧЕРА ПРИ ОФОРМЛЕНИИ ЗАКАЗА О ЖЕЛАНИИ ОПЛАТИТЬ ЗАКАЗ ПЛАСТИКОВОЙ КАРТОЙ.',

      // Surveys Radio
      survey_radio_title: 'Опрос',

      // Surveys Text
      survey_text_title: 'Опрос',
      survey_text_send: 'Отправить',
      survey_text_answer: 'Ваш ответ..',

      // Contact Modal
      contact_title: 'Выберите заведение',
      contact_distance: 'м',
      contact_opened: 'открыто',
      contact_closed: 'закрыто',

      // Email Modal
      email_cancel: 'Отмена',
      email_email: 'Email',
      email_next: 'Далее',
      email_enter_email: 'Введите Ваш Email',

      // Promo Modal
      promo_modal_cancel: 'Отмена',
      promo_modal_code: 'Промокод',
      promo_modal_next: 'Использовать',
      promo_modal_enter_code: 'Введите Промокод',
      promo_modal_pop_tit: 'Внимание!',
      promo_modal_pop_tmp: 'Уже использован!',
      promo_modal_pop_btn: 'Закрыть',
      promo_modal_pop_succ_tit: "Благодарим",
      promo_modal_pop_succ_tmp: "Вам будут начислены дополнительные баллы!",
      promo_modal_pop_succ_btn: "Закрыть",
      promo_modal_pop_wrong_tit: "Внимание!",
      promo_modal_pop_wrong_tmp: "Такого промокода не существует!",
      promo_modal_pop_wrong_btn: "Закрыть",

      // Discount Modal
      discount_modal_pop_tit: "Новая карта?",
      discount_modal_pop_tmp: "Внести новую дисконтную карту?",
      discount_modal_pop_btn1: "Внести",
      discount_modal_pop_btn2: "Отмена",
      discount_modal_exists_pop_tit: "Внимание!",
      discount_modal_exists_pop_tmp: "Данная карта уже используется другим пользователем!",
      discount_modal_exists_pop_btn: "Закрыть",
      discount_modal_wrong_pop_tit: "Неверный код!",
      discount_modal_wrong_pop_tmp: "Код который Вы считали не является кодом нашей компании.",
      discount_modal_wrong_pop_btn1: "Повторить",
      discount_modal_wrong_pop_btn2: "Отмена",
      discount_modal_err_pop_tit: "Внимание!",
      discount_modal_err_pop_tmp: "Ошибка в сканере.",
      discount_modal_err_pop_btn: "Закрыть",

      // Gender Modal
      gender_gender: 'Пол',
      gender_male: 'Мужской',
      gender_female: 'Женский',

      // Country Code Modal
      code_cancel: 'Отмена',
      code_country: 'Страна',

      // Mobile Confirm Modal
      mobile_confirm_mobile: 'Номер телефона',
      mobile_confirm_next: 'Далее',
      mobile_confirm_confirm: 'Код подтверждения',
      mobile_confirm_text_1: 'Введите код подтверждения, отправленный на номер',
      mobile_confirm_text_2: 'Если вы его не получили, мы можем',
      mobile_confirm_send_again: 'отправить код повторно',

      // Mobile Modal
      mobile_title: 'Номер телефона',
      mobile_next: 'Далее',
      mobile_number: 'Введите Ваш номер телефона',
      mobile_text: 'Мы вышлем Вам СМС с кодом для подтверждения Вашего мобильного телефона',

      // FAQ
      faq_cat_points: 'Баллы',
      faq_cat_other: 'Другое',

      faq_ask_points_dont_see: 'Я оплатил свой заказ, официант считал мою карту, но я не вижу зачисленных баллов в приложении. Что делать?',
      faq_ask_points_dont_see_answ: 'Для того чтобы увидеть зачисленные баллы в этом случае, закройте приложение и запустите его заново. Если после этого Вы все еще не видите зачисленные баллы, проверьте подключение к Интернету. Наличие Интернета в Вашем смартфоне является необходимым условием для того, чтобы вы могли видеть Ваш актуальный баланс.',
      faq_ask_points_for_what: 'За что я получаю бонусные баллы?',
      faq_ask_points_for_what_answ: 'Бонусные баллы вы можете получить в нескольких случаях:',
      faq_ask_points_for_what_answ1: 'Сделать заказ, оплатить его и предъявить официанту свою карту постоянного гостя на смартфоне.',
      faq_ask_points_for_what_answ2: 'Поделиться в социальных сетях приложением.',
      faq_ask_points_for_what_answ3: 'Поделиться со своим другом промо-кодом на установку приложения.',
      faq_ask_points_shared_not_got: 'Я поделился новостью в социальной сети, однако бонусные баллы не были начислены.',
      faq_ask_points_shared_not_got_answ: 'Для того чтобы увидеть зачисленные баллы в этом случае, закройте приложение и запустите его заново. Если после этого Вы все еще не видите зачисленные баллы, проверьте подключение к Интернету. Наличие Интернета в Вашем смартфоне является необходимым условием для того, чтобы вы могли видеть Ваш актуальный баланс.',
      faq_ask_points_promo: 'Как использовать мой промо-код для начисления баллов?',
      faq_ask_points_promo_answ: 'После того, как Вы передали свой промо-код своему другу, Вам будут начислены баллы в нескольких случаях:',
      faq_ask_points_promo_answ1: 'Ваш друг установил приложение',
      faq_ask_points_promo_answ2: 'Ваш друг посетил ресторан и сделал заказ',
      faq_ask_points_promo_answ3: 'Количество начисляемых баллов во втором случае будет больше, чем в первом. После того, как Ваш друг скачал приложение, он должен будет зарегистрировать свою карту постоянного гостя. При регистрации приложение предложит ввести промо-код.',
      faq_ask_points_new_phone: 'Как мне перенести накопленные баллы если я поменял телефон?',
      faq_ask_points_new_phone_answ: 'Все накопленные баллы привязаны к вашему номеру телефона. Скачайте приложение заново и зарегистрируйте свою карту заново на тот же номер телефона. Все баллы восстановятся в приложении. Если вы не видите баллы после регистрации, закройте приложение и откройте его заново. В данном случае обязательно наличие Интернета в Вашем смартфоне.',
      faq_ask_points_expire: 'Какой срок хранения бонусных баллов, и происходит ли их обнуление?',
      faq_ask_points_expire_answ: 'Обнуление бонусных баллов происходит каждые 6 месяцев.',

      faq_ask_other_sms: 'Я вожу номер телефона а sms кодом не приходит, что делать?',
      faq_ask_other_sms_answ: 'Скорость доставки sms сообщения с кодом зависит от sms-провайдера. К сожалению, иногда время доставки может достигать 30-ти минут. Если Вы не хотите ждать, пожалуйста обратитесь в службу технической поддержки по телефону: +375293803734',
      faq_ask_other_prof_edit: 'Могу ли я изменить свои регистрационные данные после того как привязал номер телефона?',
      faq_ask_other_prof_edit_answ: 'После того, как Вы ввели свои данные в анкете, в личном кабинете Вы сможете изменить любую информацию о себе кроме телефона.'

    });

    $translateProvider.translations("en", {

      // All
      conn_err_tit: 'Achtung',
      conn_err_tmp: 'Keine Internetverbindung',
      conn_err_close: 'Schließen',
      day_mo: 'Mo',
      day_tu: 'Di',
      day_we: 'Mi',
      day_th: 'Do',
      day_fr: 'Fr',
      day_st: 'Sa',
      day_su: 'So',
      day_full_mo: 'Montag',
      day_full_tu: 'Dienstag',
      day_full_we: 'Mittwoch',
      day_full_th: 'Donnerstag',
      day_full_fr: 'Freitag',
      day_full_st: 'Samstag',
      day_full_su: 'Sonntag',
      month_jan: 'Januar',
      month_feb: 'Februar',
      month_mar: 'März',
      month_apr: 'April',
      month_may: 'Mai',
      month_jun: 'Juni',
      month_jul: 'Juli',
      month_aug: 'August',
      month_sep: 'September',
      month_okt: 'Oktober',
      month_nov: 'November',
      month_dez: 'Dezember',
      day_month_accept: 'Annehmen',
      day_month_cancel: 'Schließen',
      blocked_title: "Blockiert!",
      blocked_body: "Zugang zu diesem Dienst wurde blockiert.",
      blocked_cancel: 'Schließen',

      // Login
      login_nointernet: 'Keine Internetverbindung',

      // Tabs
      tabs_card: 'Karte',
      tabs_menu: 'Menü',
      tabs_news: 'Aktionen',
      tabs_contact: 'Standorte',
      tabs_else: 'Noch',

      // CardCtrl
      card_title: 'Walmart',
      card_card: 'Karte des beständigen Gastes',
      card_balance: 'Aktueller Kontostand',
      card_show_card: 'Karte zeigen',
      card_show_card_sub: 'Karte zeigen und Bonuspunkte erhalten',
      card_gifts: 'Geschenke',
      card_groups: 'Community',
      card_shares: 'Teilen',
      card_ctrl_pop_tit: 'Danke!',
      card_ctrl_pop_temp: 'Ihre Antworten helfen uns unser Lokal zu perfektionieren.',
      card_ctrl_pop_btn1: 'Schließen',
      card_pop_phone_tit: "Telefonnummer notwendig!",
      card_pop_phone_tmp: "Um das Bonussystem benützen zu können, muss Ihre Telefonnummer angegeben und bestätigt sein.",
      card_pop_phone_btn1: "Nummer angeben",
      card_pop_phone_btn2: "Abbruch",

      // OrderSummCtrl
      order_summ_title: 'Bestellsumme',
      order_summ_cancel: 'Abbruch',
      order_summ_next: 'Weiter',
      order_summ_text: 'Geben Sie den bezahlten Betrag an',
      order_summ_money: '€',
      order_summ_ctrl_pop_tit: 'Welche Summe?',
      order_summ_ctrl_pop_tmp: 'Geben Sie die ausgegebene Summe ein',

      // OrderQRCtrl
      order_qr_title: 'Karte des beständigen Gastes',
      order_qr_text_top: 'Zeigen Sie den QR-code Ihrem Kellner',
      order_qr_money: '€',
      order_qr_ready: 'Fertig',
      order_qr_change_amount: 'Bestellsumme ändern',
      order_qr_pop_thanks_tit: 'Danke',
      order_qr_pop_thanks_temp: 'Ihre Bewertungen helfen uns unseren Betrieb «Name des Betriebes» zu verbessern. Wir setzen uns mit Ihnen in Verbindung, falls wir noch zusätzliche Information brauchen',
      order_qr_pop_thanks_btn1: 'Schließen',
      order_qr_pop_review_tit: 'Wollen Sie eine Bewertung hinterlassen?',
      order_qr_pop_review_temp: 'Bewertung sieht nur der Inhaber',
      order_qr_pop_review_btn1: 'Ja',
      order_qr_pop_review_btn2: 'Nein',
      order_qr_pop_tooften_tit: 'Zu oft!',
      order_qr_pop_tooften_temp: 'Alle 12 Stunden erlaubt',
      order_qr_review_choise: 'Lokal wählen',
      order_qr_review_choose_pic: 'Foto hinzufügen',
      order_qr_review_make_pic: 'Foto machen',
      order_qr_review_take_pic: 'Aus Gallery wählen',
      order_qr_review_cancel: 'Abbruch',

      // Review
      review_title: 'Bewertung',
      review_send: 'Senden',
      review_ask: 'Beschreiben Sie kurz was Ihnen gefallen hat und was wir verbessern könnten',
      review_location: 'Lokal',
      review_stars: 'Bewerten Sie unseren Service',
      review_review: 'Ihre Bewertung',
      review_ctrl_pop_thanks_tit: 'Danke',
      review_ctrl_pop_thanks_temp: 'Ihre Bewertungen helfen uns unseren Betrieb «Name des Betriebes» zu verbessern. Wir setzen uns mit Ihnen in Verbindung, falls wir noch zusätzliche Information brauchen',
      review_ctrl_pop_thanks_btn1: 'Schließen',
      review_ctrl_pop_review_tit: 'Wollen Sie eine Bewertung hinterlassen?',
      review_ctrl_pop_review_temp: 'lalala',
      review_ctrl_pop_review_btn1: 'Ja',
      review_ctrl_pop_review_btn2: 'Nein',
      review_ctrl_pop_tooften_tit: 'Zu oft!',
      review_ctrl_pop_tooften_temp: 'Alle 12 Stunden erlaubt',

      // GiftsCtrl
      gifts_title: 'Geschenke',
      gifts_cost: 'Kosten',
      gifts_take_look: 'Achten Sie auf Erneuerungen',
      gifts_look_here: 'Schauen Sie hier regelmäßig rein und erfahren über Erneuerungen als Erster!',

      // GiftsDetailCtrl
      gifts_detail_cost: 'Kosten für das Geschenk',
      gifts_detail_get: 'Erhalten',
      gifts_detail_ctrl_pop_tit: 'Nicht genügend Punkte',
      gifts_detail_ctrl_pop_tmp1: 'Leider fehlen Ihnen noch',
      gifts_detail_ctrl_pop_tmp2: 'Punkte',
      gifts_detail_ctrl_pop_tmp3: 'um dieses Geschenk zu erhalten',
      gifts_detail_ctrl_pop_btn1: 'OK',
      gifts_detail_pop_phone_tit: "Telefonnummer notwendig!",
      gifts_detail_pop_phone_tmp: "Um das Bonussystem benützen zu können, muss Ihre Telefonnummer angegeben und bestätigt sein.",
      gifts_detail_pop_phone_btn1: "Nummer angeben",
      gifts_detail_pop_phone_btn2: "Abbruch",

      // GiftsGetCtrl
      gifts_get_title: 'Geschenk erhalten',
      gifts_get_qr: 'Zeigen Sie den QR-code ihrem Kellner',
      gifts_get_cost: 'Kosten',
      gifts_get_ready: 'Fertig',
      gifts_get_cancel: 'Abbruch',
      gifts_get_ctrl_pop_rev_tit: 'Danke!',
      gifts_get_ctrl_pop_rev_tmp: 'Ihre Bewertungen helfen uns unseren Betrieb «Name des Betriebes» zu verbessern. Wir setzen uns mit Ihnen in Verbindung, falls wir noch zusätzliche Information brauchen',
      gifts_get_ctrl_pop_rev_btn1: 'Schließen',
      gifts_get_ctrl_pop_review_tit: 'Wollen Sie eine Bewertung hinterlassen?',
      gifts_get_ctrl_pop_review_temp: 'lalala',
      gifts_get_ctrl_pop_review_btn1: 'Ja',
      gifts_get_ctrl_pop_review_btn2: 'Nein',
      gifts_get_ctrl_pop_tooften_tit: 'Zu oft!',
      gifts_get_ctrl_pop_tooften_temp: 'Alle 12 Stunden erlaubt',
      gifts_review_choise: 'Lokal wählen',
      gifts_review_choose_pic: 'Foto anhängen',
      gifts_review_make_pic: 'Foto machen',
      gifts_review_take_pic: 'Aus Gallery wählen',
      gifts_review_cancel: 'Abbruch',

      // GroupsCtrl
      groups_title: 'Gemeinschaften',
      groups_become_mem: 'Schließen Sie sich unserer offiziellen Community an',
      groups_place_com: 'Hinterlassen Sie Ihre Kommentare, geben Ihr Feedback und laden Ihre Freunde ein!',
      groups_fb: 'Facebook',
      groups_vk: 'VK',
      groups_tw: 'Twitter',
      groups_ig: 'Instagram',

      // PromoCtrl
      promo_title: 'Teilen',
      promo_code: 'IHR PROMOCODE',
      promo_recommend: 'Empfehlen Sie uns Ihren Freunden und sammeln Punkte',
      promo_use_promo: 'Verwenden Sie Ihren persöhnlichen Promocode um Bonis zu verdienen',
      promo_you: 'Ihnen',
      promo_friend: 'Ihrem Freund',
      promo_use_friend: 'Ihr Freund hat Ihren Promocode benützt',
      promo_come_friend: 'Ihr Freund hat uns besucht',
      promo_use_me: 'Sie haben einen Promocode verwendet',

      // Discount
      discount_modal_cancel: 'Zurück',
      discount_modal_code: 'Discount Karte',
      discount_modal_qr_ready: 'Fertig',
      discount_modal_qr_change_discount: 'Neue Karte einscannen',

      // SharesCtrl
      shares_title: 'Teilen',
      shares_recommend: 'Empfehlen Sie uns Ihren Freunden, teilen in sozialen Netzwerken und erhalten Bonuspunkte',
      shares_fb: 'Facebook',
      shares_vk: 'VK',
      shares_tw: 'Twitter',
      shares_ig: 'Instagram',
      shares_sms: 'SMS',
      share_txt_1: 'Lade dir App',
      share_txt_1_1: 'und erhalte Geschenke mit folgendem Code:',
      share_txt_1_2: 'und erhalte Geschenke',
      share_promo: 'Promocode',

      // MenuCatsCtrl
      menue_cat_title: 'Kategorien',

      // MenuCtrl
      menue_title: 'Menü',
      menue_costs: 'Kosten',
      menue_money: '€',

      // MenuDetailCtrl
      menue_detail_costs: 'Kosten',
      menue_detail_money: '€',
      menue_detail_amount: 'st',

      // CartCtrl
      cart_title: 'Warenkorb',
      cart_next: 'Weiter',
      cart_amount: 'Anzahl',
      cart_costs: 'Kosten',
      cart_money: '€',
      cart_empty: 'Ihr Warenkorb ist leer',
      cart_empty_take: 'Kehren Sie zurück ins Menü und fügen Artikel in den Warenkorb!',

      // CartSendCtrl
      cart_send_title: 'Bestellung',
      cart_send_back: 'Zurück',
      cart_send_next: 'Senden',
      cart_send_surname: 'Nachname',
      cart_send_name: 'Name',
      cart_send_middlename: 'Vatersname',
      cart_send_mobile: 'Mobilnummer',
      cart_send_email: 'Email',
      cart_send_town: 'Stadt',
      cart_send_adress: 'Adresse',
      cart_send_comment: 'Kommentar',
      cart_cntr_pop_tit: 'Danke',
      cart_cntr_pop_tmp: 'Wir rufen Sie zurück',
      cart_cntr_pop_send_ord_tit: 'Bestellung senden',
      cart_cntr_pop_send_ord_tmp: 'Senden',
      cart_cntr_pop_send_ord_btn1: 'Ja',
      cart_cntr_pop_send_ord_btn2: 'Nein',
      cart_cntr_pop_send_ord_send: 'Senden',
      cart_cntr_pop_err1_tit: 'Achtung',
      cart_cntr_pop_err1_tmp: 'Bestellung konnte nicht abgesendet werden',
      cart_cntr_pop_err2_tit: 'Achtung',
      cart_cntr_pop_err2_tmp: 'Server ist nicht zu erreichen',
      cart_cntr_pop_nottake_ord_tit: 'Bestellungen gestoppt!',
      cart_cntr_pop_nottake_ord_tmp: 'Zur Zeit werden keine Bestellungen nicht angenommen!',
      cart_cntr_pop_nottake_ord_btn1: 'Schließen',

      // NewsCtrl
      news_title: 'Aktionen',
      news_take_look: 'Geben Sie Acht auf Neuigkeiten',
      news_look_here: 'Schauen Sie hier regelmäßig vorbei und erfahren als erster über Neuigkeiten!',
      news_firstgift: 'Erstes Geschenk',

      // NewsDetailCtrl
      news_detail_from: 'Von',
      news_detail_to: 'bis',
      news_detail_qr: 'Zeigen Sie den QR-code Ihrem Kellner',

      // ContactMapCtrl
      contact_map_map: 'Karte',
      contact_map_list: 'Liste',
      contact_map_distance: 'm',
      contact_map_opened: 'geöffnet',
      contact_map_closed: 'geschloßen',
      contact_map_reserved: 'Reservieren',

      // ContactListCtrl
      contact_list_map: 'Karte',
      contact_list_list: 'Liste',
      contact_list_distance: 'km',
      contact_list_opened: 'geöffnet',
      contact_list_closed: 'geschloßen',
      contact_list_call: 'Anrugen',
      contact_list_email: 'Schreiben',
      contact_list_site: 'Zur Homepage',
      contact_list_phones: 'KONTAKT',

      // ElseCtrl
      else_title: 'Noch',
      else_profile: 'Profil',
      else_points: 'Mein Punkte',
      else_purchase: 'Meine Bestellungen',
      else_review: 'Bewertung machen',
      else_bonus: 'Das Bonusprogramm',
      else_share: 'Teilen',
      else_support: 'Technische Unterstützung',
      else_reservation: 'Reservieren',
      else_entry: 'Online-Termin',
      else_fifthgift: 'Fünfte Kauf umsonst',
      else_promo: 'Promocode benützen',
      else_discount: 'Discount Karte',
      else_about_us: 'Über uns',
      else_about: 'Über Entwickler',
      else_policy: 'Datenschutzrichtlinie und Nutzungsbedingungen.',
      else_review_choise: 'Lokal aussuchen',
      else_review_choose_pic: 'Foto anhängen',
      else_review_make_pic: 'Foto machen',
      else_review_take_pic: 'Aus Gallery wählen',
      else_review_cancel: 'Abbruch',
      else_pop_phone_tit: "Telefonnummer notwendig!",
      else_pop_phone_tmp: "Um das Bonussystem benützen zu können, muss Ihre Telefonnummer angegeben und bestätigt sein.",
      else_pop_phone_btn1: "Nummer angeben",
      else_pop_phone_btn2: "Abbruch",
      
      langru: 'Russisch',
      langen: 'Englisch',
      langde: 'Deutsch',
      
      else_push_thank: 'Danke!',
      else_push_thank_text: 'Ihr Feedback hilft zu verbessern «Name der Einrichtung. Wir werden Sie Kontaktieren, falls wir zusätzliche Informationen benötigen',
      else_push_btn_close: 'Schließen',

      // ProfileCtrl
      profile_title: 'Profil',
      profile_promo: 'Mein Promocode',
      profile_history: 'GESCHICHTE VON OPERATIONEN',
      profile_awaiting: 'Erwartet Bestätigung',
      profile_confirmed: 'Bestätigt',
      profile_denied: 'Abgelehnt',
      profile_canceled: 'Abgebrochen',
      profile_cancel: 'Abbrechen',
      profile_go_history: 'Geschichte anschauen',
      profile_operations: 'aller Ihnen getätigten Operationen',
      profile_ctrl_pop_canc_tit: 'Eintrag widerrufen',
      profile_ctrl_pop_canc_temp: 'Wollen Sie wirklich diesen Eintrag widerrufen?',
      profile_ctrl_pop_canc_btn1: 'Nein',
      profile_ctrl_pop_canc_btn2: 'Ja',

      // ProfileEditCtrl
      profile_edit_title: 'Profil ändern',
      profile_edit_cancel: 'Abbruch',
      profile_edit_ready: 'Fertig',
      profile_edit_promo: 'Mein Promocode',
      profile_edit_surname: 'Nachname',
      profile_edit_name: 'Name',
      profile_edit_middlename: 'Vatersname',
      profile_edit_data: 'PERSÖHNLICHE DATEN',
      profile_edit_gender: 'Geschlecht',
      profile_edit_male: 'Männlich',
      profile_edit_female: 'Weiblich',
      profile_edit_birthday: 'Geburtstag',
      profile_edit_nobirth: 'Nicht angegeben',
      profile_edit_mobile: 'Mobilnummer',
      profile_edit_nomob: 'Nicht angegeben',
      profile_edit_email: 'Email',
      profile_edit_nomail: 'Nicht angegeben',
      profile_edit_ctrl_pop_proofed_tit: 'Achtung',
      profile_edit_ctrl_pop_proofed_temp: 'Nummer bereits bestätigt!',
      profile_edit_ctrl_pop_caution_tit: 'Achtung!',
      profile_edit_ctrl_pop_caution_tmp: 'Nummer bereits bestätigt',
      profile_edit_ctrl_pop_5minagain_tit: 'Achtung!',
      profile_edit_ctrl_pop_5minagain_tmp: 'Anfrage erst wieder in 5 Minut! Sie können jedoch den vorherigen Code eingeben.',
      profile_edit_ctrl_pop_numagain_tit: 'Achtung!',
      profile_edit_ctrl_pop_numagain_tmp: 'Geben Sie Ihre Mobilnummer ein!',
      profile_edit_ctrl_pop_reqerr_tit: 'Fehler',
      profile_edit_ctrl_pop_reqerr_tmp: 'Fehler in der Anfrage der Bestätigung!',
      profile_edit_ctrl_pop_answerr_tit: 'Fehler',
      profile_edit_ctrl_pop_answerr_tmp: 'Fehler in der Antwort beim Speichern!',
      profile_edit_ctrl_pop_discount_tit: 'Discount-Karte',
      profile_edit_ctrl_pop_discount_tmp: 'Discount-Karte hinzugefügt!',
      profile_edit_ctrl_pop_block_tit: 'Blockierung',
      profile_edit_ctrl_pop_block_tmp: 'Sie wurden Gesperrt!',
      profile_edit_ctrl_pop_deblock_tit: 'Blockierung',
      profile_edit_ctrl_pop_deblock_tmp: 'Sie wurden entsperrt!',
      profile_edit_ctrl_pop_numconf_tit: 'Danke!',
      profile_edit_ctrl_pop_numconf_tmp: 'Nummer bestätigt!',
      profile_edit_ctrl_pop_numconf_btn1: 'OK',
      profile_edit_ctrl_pop_erransw_tit: 'Fehler',
      profile_edit_ctrl_pop_erransw_tmp: 'Fehler in der Antwort der Bestätigung!',
      profile_edit_ctrl_pop_errcode_tit: 'Achtung!',
      profile_edit_ctrl_pop_errcode_tmp: 'Falsch eingegebener Code!',
      profile_edit_ctrl_pop_errconf_tit: 'Fehler',
      profile_edit_ctrl_pop_errconf_tmp: 'Fehler in der Antwort der Bestätigung!',
      profile_review_pic_delete: 'Foto entfernen',
      profile_review_choise: 'Profilfoto austauschen',
      profile_review_choose_pic: 'Foto anhängen',
      profile_review_make_pic: 'Foto machen',
      profile_review_take_pic: 'Von Gallery wählen',
      profile_review_cancel: 'Abbruch',

      // PointsCtrl
      points_title: 'Geschichte der Bonuspunkte',
      points_money: '€',
      points_awaiting: 'Erwartet Bestätigung',
      points_confirmed: 'Bestätigt',
      points_canceled: 'Abgelehnt',

      // PurchaseCtrl
      purchase_title: 'Bestellgeschichte',
      purchase_money: '€',

      // SupportCtrl
      support_title: 'Technische Unterstützung',
      support_connection: 'Chat mit Unterstützung',
      support_question: 'Richten Sie Ihre Frage an den Spezialisten',

      // SupportDetailsCtrl
      support_details_title: 'Technische Unterstützung',
      support_details_connection: 'Chat mit Unterstützung',
      support_details_question: 'Richten Sie Ihre Frage an den Spezialisten',

      // SupportChatCtrl
      support_chat_title: 'Chat',
      support_chat_question: 'Richten Sie Ihre Frage an den Spezialisten',
      support_chat_message: 'Ihre Nachricht',
      support_chat_send: 'Send.',
      support_chat_call_ctrl_pop_btn1: 'Abbruch',
      support_chat_call_ctrl_pop_btn2: 'Anrufen',
      support_chat_hello: 'Guten Tag! Wie kann ich Ihnen behilflich sein?',

      // ReservationCtrl
      reservation_title: 'Reservieren',
      reservation_send: 'Senden',
      reservation_surname: 'Nachname',
      reservation_name: 'Name',
      reservation_middlename: 'Vatersname',
      reservation_date: 'Datum',
      reservation_time: 'Uhrzeit',
      reservation_amount: 'Gästeanzahl',
      reservation_comment: 'Kommentar',
      reservation_ctrl_pop_tit: 'Danke!',
      reservation_ctrl_pop_temp: 'Eingetragen. Wir setzen uns mit Ihnen in Verbindung, falls wir zusätzliche Information benötigen',
      reservation_ctrl_pop_btn1: 'Schließen',

      // Entry All
      order_bs_online_reg_1: "Online-Termin",
      order_bs_online_reg_2: "Company App",

      // EntryCatCtrl
      order_bs_top_1: "Dienst auswählen",

      // EntryStartCtrl
      order_bs_top_2: "Eintragen",
      order_bs_go_on: "Weiter",

      // EntryWorkerCtrl
      order_bs_top_3: "Assistenten auswählen",
      order_bs_worker_x_top: "Zufällig",
      order_bs_worker_x_sub: "Nicht angegeben",

      // EntryTimeCtrl
      order_bs_top_4: "Datum und Uhrzeit auswählen",

      // EntryCtrl
      order_bs_top_5: "Kontakt",
      order_bs_add_order: "Eintrag hinzufügen",
      order_bs_your_name: "Name",
      order_bs_your_name_ex: "Name",
      order_bs_phone: "Telefon",
      order_bs_ex_phone_1: "Beispiel: 01701234567",
      order_bs_ex_phone_2: "Nur Ziffern! Beispiel: 01701234567",
      order_bs_email: "Email",
      order_bs_email_ex: "email@email.de",
      order_bs_comment: "Kommentar",
      order_bs_comment_ex: "Mein Kommentar",
      order_bs_confirm: "Eintragen",
      order_bs_ctrl_pop_tit: 'Danke!',
      order_bs_ctrl_pop_temp: 'Sie haben sich eingetragen! Erwarten Sie einen Rückruf.',
      order_bs_ctrl_pop_btn1: 'Schließen',
      order_bs_ctrl_pop_err5min_tit: 'Achtung!',
      order_bs_ctrl_pop_err5min_temp: 'Повторный запрос только через 5 минут!',
      order_bs_ctrl_pop_err5min_btn1: 'Schließen',
      order_bs_ctrl_pop_errphone_tit: 'Achtung!',
      order_bs_ctrl_pop_errphone_temp: 'Geben Sie Ihre Telefonnumer an!',
      order_bs_ctrl_pop_errphone_btn1: 'Schließen',
      order_bs_ctrl_pop_erralready_tit: 'Achtung!',
      order_bs_ctrl_pop_erralready_temp: 'Termin besteht bereits!',
      order_bs_ctrl_pop_erralready_btn1: 'Schließen',
      order_bs_ctrl_pop_errempty_tit: 'Leerer Eintrag!',
      order_bs_ctrl_pop_errempty_temp: 'Fügen Sie mindestens einen Dienst hinzu.',
      order_bs_ctrl_pop_errempty_btn1: 'Schließen',

      // FifthGiftCtrl
      fifth_title: 'Fünfter Kauf umsonst',
      fifth_amount: 'Anzahl getätigter Käufe',
      fifth_qr: 'Zeigen Sie den QR-code Ihrem Kellner und erhalten ein Geschenk',
      fifth_ready: 'Fertig',

      // AboutCtrl
      about_title: 'Entwickler',
      about_text: 'Die Entwickler sind gut und liebevoll',

      // AboutUsCtrl
      about_us_title: 'Über uns',
      about_us_text: 'Einige Wörter über uns',

      // TransactionsCtrl
      trans_title: 'Geschichte der Transaktionen',
      trans_awaiting: 'Erwartet Bestätigung',
      trans_confirmed: 'Bestätigt',
      trans_denied: 'Abgelehnt',
      trans_canceled: 'Abgebrochen',
      trans_cancel: 'Abbrechen',
      trans_ctrl_pop_canc_tit: 'Eintrag widerrufen',
      trans_ctrl_pop_canc_tmp: 'Wollen Sie wirklich diesen Eintrag widerrufen?',
      trans_ctrl_pop_canc_btn1: 'Nein',
      trans_ctrl_pop_canc_btn2: 'Ja',

      // Bonus Modal
      bonus_title: 'Das Bonusprogramm',
      bonus_txt_title_1: 'Die Regeln des Bonusprogramms',
      bonus_txt_body_1: 'Zahlung nur in Euro.',
      bonus_txt_title_2: 'Noch',
      bonus_txt_body_2: 'Bitte vorraussichtlich mitteilen auf welche Art Sie bezahlen möchten.',

      // Surveys Radio
      survey_radio_title: 'Umfrage',

      // Surveys Text
      survey_text_title: 'Umfrage',
      survey_text_send: 'Senden',
      survey_text_answer: 'Ihre Antwort..',

      // Contact Modal
      contact_title: 'Einrichtung wählen',
      contact_distance: 'm',
      contact_opened: 'geöffnet',
      contact_closed: 'geschloßen',

      // Email Modal
      email_cancel: 'Abbruch',
      email_email: 'Email',
      email_next: 'Weiter',
      email_enter_email: 'Geben Sie Ihre Email an',

      // Promo Modal
      promo_modal_cancel: 'Abbruch',
      promo_modal_code: 'Promocode',
      promo_modal_next: 'Benützen',
      promo_modal_enter_code: 'Geben Sie einen Promokode an',
      promo_modal_pop_tit: 'Achtung!',
      promo_modal_pop_tmp: 'Bereits genützt!',
      promo_modal_pop_btn: 'Schließen',
      promo_modal_pop_succ_tit: "Danke",
      promo_modal_pop_succ_tmp: "Ihnen werden zusätzliche Punkte hinzugefügt!",
      promo_modal_pop_succ_btn: "Schließen",
      promo_modal_pop_wrong_tit: "Achtung!",
      promo_modal_pop_wrong_tmp: "Promocode existiert nicht!",
      promo_modal_pop_wrong_btn: "Schließen",

      // Discount Modal
      discount_modal_pop_tit: "Neue Karte?",
      discount_modal_pop_tmp: "Eine neue Karte hinzufügen?",
      discount_modal_pop_btn1: "Einfügen",
      discount_modal_pop_btn2: "Abbruch",
      discount_modal_exists_pop_tit: "Achtung!",
      discount_modal_exists_pop_tmp: "Diese Karte wird bereits von einem anderen Mitglied benützt!",
      discount_modal_exists_pop_btn: "Schließen",
      discount_modal_wrong_pop_tit: "Falscher Code!",
      discount_modal_wrong_pop_tmp: "Der eingelesene Code gehört nicht zu Ihrer Firma.",
      discount_modal_wrong_pop_btn1: "Nochmal",
      discount_modal_wrong_pop_btn2: "Abbruch",
      discount_modal_err_pop_tit: "Achtung!",
      discount_modal_err_pop_tmp: "Scannerfehler.",
      discount_modal_err_pop_btn: "Schließen",

      // Gender Modal
      gender_gender: 'Geschlecht',
      gender_male: 'Männlich',
      gender_female: 'Weiblich',

      // Country Code Modal
      code_cancel: 'Abbruch',
      code_country: 'Land',

      // Mobile Confirm Modal
      mobile_confirm_mobile: 'Mobilnummer',
      mobile_confirm_next: 'Далее',
      mobile_confirm_confirm: 'Bestätigungs-code',
      mobile_confirm_text_1: 'Geben Sie den Bestätigungs-code ein, der an die folgende Nummer gesendet wurde',
      mobile_confirm_text_2: 'Falls Sie diesen nicht erhalten haben, können wir ihn',
      mobile_confirm_send_again: 'nochmals schicken',

      // Mobile Modal
      mobile_title: 'Mobilnummer',
      mobile_next: 'Weiter',
      mobile_number: 'Geben Sie Ihre Mobilnummer an',
      mobile_text: 'Wir schicken Ihnen ein Bestätigungs-code an diese Mobilnummer',

      // FAQ
      faq_cat_points: 'Punkte',
      faq_cat_other: 'Anderes',

      faq_ask_points_dont_see: 'Ich habe meine Bestellung bezahlt, der Kellner hat meine Karte abgelesen, aber ich sehe nicht die gutgeschriebenen Punkte in meinem App. Was kann ich tun?',
      faq_ask_points_dont_see_answ: 'Um die gutgeschriebenen Punkte zu sehen, schließen Sie die Anwendung und starten diese neu. Wenn Sie danach die Punkte immer noch nicht sehen, überprüfen Sie Ihre Internetverbindung. Die Verfügbarkeit des Internets in Ihrem Smartphone ist eine notwendige Bedingung, damit Sie Ihren aktuellen Kontostand sehen.',
      faq_ask_points_for_what: 'Wofür bekomme ich Bonuspunkte?',
      faq_ask_points_for_what_answ: 'Bonus-Punkte erhalten Sie in folgenden Fällen:',
      faq_ask_points_for_what_answ1: 'Machen Sie Ihre Bestellung, bezahlen Sie diese und weisen dem Kellner ihre "Karte des beständigen Gastes" auf dem Smartphone.',
      faq_ask_points_for_what_answ2: 'Teilen in sozialen Netzwerken mit Hilfe der Anwendung.',
      faq_ask_points_for_what_answ3: 'Teilen Sie Ihren Promo-Code für die Installation mit Freunden.',
      faq_ask_points_shared_not_got: 'Ich teilte eine Nachricht in einem sozialen Netzwerk, jedoch wurden die Bonuspunkte nicht gutgeschrieben.',
      faq_ask_points_shared_not_got_answ: 'Um die gutgeschriebenen Punkte zu sehen, schließen Sie die Anwendung und starten diese von neu. Wenn Sie danach die Bonuspunkte immer noch nicht sehen, überprüfen Sie die Internetverbindung. Die Verfügbarkeit des Internets in Ihrem Smartphone ist eine notwendige Bedingung, damit Sie Ihren aktuellen Kontostand sehen.',
      faq_ask_points_promo: 'Wie benütze ich meinen Promo-Code, um Punkte zu sammeln?',
      faq_ask_points_promo_answ: 'Nachdem Sie Ihren Promo-Code an Ihren Freund geteilt haben, werden Ihnen die Punkte, in den folgenden Fällen gutgeschrieben:',
      faq_ask_points_promo_answ1: 'Ihr Freund installierte die Anwendung',
      faq_ask_points_promo_answ2: 'Ihr Freund besuchte unser Restaurant und tätigte eine Bestellung',
      faq_ask_points_promo_answ3: 'Die Anzahl der Punkte im zweiten Fall ist größer als im ersten. Sobald Ihr Freund die App heruntergeladen hat, muss er seine Karte des ständigen Gastes registrieren. Bei der Registrierung der App wird Ihm angeboten einen Promo-Code anzugeben.',
      faq_ask_points_new_phone: 'Wie übertrage ich die gesammelten Punkte wenn ich mein Handy wechsle?',
      faq_ask_points_new_phone_answ: 'Die gesammelten Punkte sind an Ihre Telefonnummer gebunden. Laden Sie die App erneut und registrieren Sie Ihre Karte mit der gleichen Telefonnummer. Alle Punkte werden in die Anwendung rübergezogen. Wenn Sie die Punkte nach der Registrierung nicht sehen, beenden Sie die Anwendung und öffnen Sie diese erneut. In diesem Fall ist die Verfügbarkeit des Internets in Ihrem Smartphone unbedingt erforderlich.',
      faq_ask_points_expire: 'Haben die Punkte eine Wertedauer und werden diese jemals gelöscht?',
      faq_ask_points_expire_answ: 'Bonus-Punkte werden nach 6 Monaten Inaktivität gelöscht. D.h. wenn Sie 6 Monate lang keine Bonuspunkte erhalten oder diese ausgegeben haben.',

      faq_ask_other_sms: 'Ich gebe meine Telefonnumer an, jedoch erhalte lange keine SMS mit Bestätigungscode. Was soll ich tun?',
      faq_ask_other_sms_answ: 'Die Versandgeschwindigkeit der SMS-Nachrichten ist abhängig vom SMS-Provider. Leider kann manchmal die Zustellzeit bis zu 30 Minuten dauern. Wenn Sie nicht warten möchten, wenden Sie sich bitte an den technischen Support unter: +491703562235',
      faq_ask_other_prof_edit: 'Kann ich meine persönliche Information ändern, nachdem ich meine Telefonnumer bestätigt habe?',
      faq_ask_other_prof_edit_answ: 'Nachdem Sie Ihre Telefonnumer bestätigt haben, können Sie all die Information ändern außer der Telefonnumer.'

    });

    $translateProvider.translations("de", {

      // All
      conn_err_tit: 'Achtung',
      conn_err_tmp: 'Keine Internetverbindung',
      conn_err_close: 'Schließen',
      day_mo: 'Mo',
      day_tu: 'Di',
      day_we: 'Mi',
      day_th: 'Do',
      day_fr: 'Fr',
      day_st: 'Sa',
      day_su: 'So',
      day_full_mo: 'Montag',
      day_full_tu: 'Dienstag',
      day_full_we: 'Mittwoch',
      day_full_th: 'Donnerstag',
      day_full_fr: 'Freitag',
      day_full_st: 'Samstag',
      day_full_su: 'Sonntag',
      month_jan: 'Januar',
      month_feb: 'Februar',
      month_mar: 'März',
      month_apr: 'April',
      month_may: 'Mai',
      month_jun: 'Juni',
      month_jul: 'Juli',
      month_aug: 'August',
      month_sep: 'September',
      month_okt: 'Oktober',
      month_nov: 'November',
      month_dez: 'Dezember',
      day_month_accept: 'Annehmen',
      day_month_cancel: 'Schließen',
      blocked_title: "Blockiert!",
      blocked_body: "Zugang zu diesem Dienst wurde blockiert.",
      blocked_cancel: 'Schließen',

      // Login
      login_nointernet: 'Keine Internetverbindung',

      // Tabs
      tabs_card: 'Karte',
      tabs_menu: 'Menü',
      tabs_news: 'Aktionen',
      tabs_contact: 'Standorte',
      tabs_else: 'Noch',

      // CardCtrl
      card_title: 'Walmart',
      card_card: 'Karte des beständigen Gastes',
      card_balance: 'Aktueller Kontostand',
      card_show_card: 'Karte zeigen',
      card_show_card_sub: 'Karte zeigen und Bonuspunkte erhalten',
      card_gifts: 'Geschenke',
      card_groups: 'Community',
      card_shares: 'Teilen',
      card_ctrl_pop_tit: 'Danke!',
      card_ctrl_pop_temp: 'Ihre Antworten helfen uns unser Lokal zu perfektionieren.',
      card_ctrl_pop_btn1: 'Schließen',
      card_pop_phone_tit: "Telefonnummer notwendig!",
      card_pop_phone_tmp: "Um das Bonussystem benützen zu können, muss Ihre Telefonnummer angegeben und bestätigt sein.",
      card_pop_phone_btn1: "Nummer angeben",
      card_pop_phone_btn2: "Abbruch",

      // OrderSummCtrl
      order_summ_title: 'Bestellsumme',
      order_summ_cancel: 'Abbruch',
      order_summ_next: 'Weiter',
      order_summ_text: 'Geben Sie den bezahlten Betrag an',
      order_summ_money: '€',
      order_summ_ctrl_pop_tit: 'Welche Summe?',
      order_summ_ctrl_pop_tmp: 'Geben Sie die ausgegebene Summe ein',

      // OrderQRCtrl
      order_qr_title: 'Karte des beständigen Gastes',
      order_qr_text_top: 'Zeigen Sie den QR-code Ihrem Kellner',
      order_qr_money: '€',
      order_qr_ready: 'Fertig',
      order_qr_change_amount: 'Bestellsumme ändern',
      order_qr_pop_thanks_tit: 'Danke',
      order_qr_pop_thanks_temp: 'Ihre Bewertungen helfen uns unseren Betrieb «Name des Betriebes» zu verbessern. Wir setzen uns mit Ihnen in Verbindung, falls wir noch zusätzliche Information brauchen',
      order_qr_pop_thanks_btn1: 'Schließen',
      order_qr_pop_review_tit: 'Wollen Sie eine Bewertung hinterlassen?',
      order_qr_pop_review_temp: 'Bewertung sieht nur der Inhaber',
      order_qr_pop_review_btn1: 'Ja',
      order_qr_pop_review_btn2: 'Nein',
      order_qr_pop_tooften_tit: 'Zu oft!',
      order_qr_pop_tooften_temp: 'Alle 12 Stunden erlaubt',
      order_qr_review_choise: 'Lokal wählen',
      order_qr_review_choose_pic: 'Foto hinzufügen',
      order_qr_review_make_pic: 'Foto machen',
      order_qr_review_take_pic: 'Aus Gallery wählen',
      order_qr_review_cancel: 'Abbruch',

      // Review
      review_title: 'Bewertung',
      review_send: 'Senden',
      review_ask: 'Beschreiben Sie kurz was Ihnen gefallen hat und was wir verbessern könnten',
      review_location: 'Lokal',
      review_stars: 'Bewerten Sie unseren Service',
      review_review: 'Ihre Bewertung',
      review_ctrl_pop_thanks_tit: 'Danke',
      review_ctrl_pop_thanks_temp: 'Ihre Bewertungen helfen uns unseren Betrieb «Name des Betriebes» zu verbessern. Wir setzen uns mit Ihnen in Verbindung, falls wir noch zusätzliche Information brauchen',
      review_ctrl_pop_thanks_btn1: 'Schließen',
      review_ctrl_pop_review_tit: 'Wollen Sie eine Bewertung hinterlassen?',
      review_ctrl_pop_review_temp: 'lalala',
      review_ctrl_pop_review_btn1: 'Ja',
      review_ctrl_pop_review_btn2: 'Nein',
      review_ctrl_pop_tooften_tit: 'Zu oft!',
      review_ctrl_pop_tooften_temp: 'Alle 12 Stunden erlaubt',

      // GiftsCtrl
      gifts_title: 'Geschenke',
      gifts_cost: 'Kosten',
      gifts_take_look: 'Achten Sie auf Erneuerungen',
      gifts_look_here: 'Schauen Sie hier regelmäßig rein und erfahren über Erneuerungen als Erster!',

      // GiftsDetailCtrl
      gifts_detail_cost: 'Kosten für das Geschenk',
      gifts_detail_get: 'Erhalten',
      gifts_detail_ctrl_pop_tit: 'Nicht genügend Punkte',
      gifts_detail_ctrl_pop_tmp1: 'Leider fehlen Ihnen noch',
      gifts_detail_ctrl_pop_tmp2: 'Punkte',
      gifts_detail_ctrl_pop_tmp3: 'um dieses Geschenk zu erhalten',
      gifts_detail_ctrl_pop_btn1: 'OK',
      gifts_detail_pop_phone_tit: "Telefonnummer notwendig!",
      gifts_detail_pop_phone_tmp: "Um das Bonussystem benützen zu können, muss Ihre Telefonnummer angegeben und bestätigt sein.",
      gifts_detail_pop_phone_btn1: "Nummer angeben",
      gifts_detail_pop_phone_btn2: "Abbruch",

      // GiftsGetCtrl
      gifts_get_title: 'Geschenk erhalten',
      gifts_get_qr: 'Zeigen Sie den QR-code ihrem Kellner',
      gifts_get_cost: 'Kosten',
      gifts_get_ready: 'Fertig',
      gifts_get_cancel: 'Abbruch',
      gifts_get_ctrl_pop_rev_tit: 'Danke!',
      gifts_get_ctrl_pop_rev_tmp: 'Ihre Bewertungen helfen uns unseren Betrieb «Name des Betriebes» zu verbessern. Wir setzen uns mit Ihnen in Verbindung, falls wir noch zusätzliche Information brauchen',
      gifts_get_ctrl_pop_rev_btn1: 'Schließen',
      gifts_get_ctrl_pop_review_tit: 'Wollen Sie eine Bewertung hinterlassen?',
      gifts_get_ctrl_pop_review_temp: 'lalala',
      gifts_get_ctrl_pop_review_btn1: 'Ja',
      gifts_get_ctrl_pop_review_btn2: 'Nein',
      gifts_get_ctrl_pop_tooften_tit: 'Zu oft!',
      gifts_get_ctrl_pop_tooften_temp: 'Alle 12 Stunden erlaubt',
      gifts_review_choise: 'Lokal wählen',
      gifts_review_choose_pic: 'Foto anhängen',
      gifts_review_make_pic: 'Foto machen',
      gifts_review_take_pic: 'Aus Gallery wählen',
      gifts_review_cancel: 'Abbruch',

      // GroupsCtrl
      groups_title: 'Gemeinschaften',
      groups_become_mem: 'Schließen Sie sich unserer offiziellen Community an',
      groups_place_com: 'Hinterlassen Sie Ihre Kommentare, geben Ihr Feedback und laden Ihre Freunde ein!',
      groups_fb: 'Facebook',
      groups_vk: 'VK',
      groups_tw: 'Twitter',
      groups_ig: 'Instagram',

      // PromoCtrl
      promo_title: 'Teilen',
      promo_code: 'IHR PROMOCODE',
      promo_recommend: 'Empfehlen Sie uns Ihren Freunden und sammeln Punkte',
      promo_use_promo: 'Verwenden Sie Ihren persöhnlichen Promocode um Bonis zu verdienen',
      promo_you: 'Ihnen',
      promo_friend: 'Ihrem Freund',
      promo_use_friend: 'Ihr Freund hat Ihren Promocode benützt',
      promo_come_friend: 'Ihr Freund hat uns besucht',
      promo_use_me: 'Sie haben einen Promocode verwendet',

      // Discount
      discount_modal_cancel: 'Zurück',
      discount_modal_code: 'Discount Karte',
      discount_modal_qr_ready: 'Fertig',
      discount_modal_qr_change_discount: 'Neue Karte einscannen',

      // SharesCtrl
      shares_title: 'Teilen',
      shares_recommend: 'Empfehlen Sie uns Ihren Freunden, teilen in sozialen Netzwerken und erhalten Bonuspunkte',
      shares_fb: 'Facebook',
      shares_vk: 'VK',
      shares_tw: 'Twitter',
      shares_ig: 'Instagram',
      shares_sms: 'SMS',
      share_txt_1: 'Lade dir App',
      share_txt_1_1: 'und erhalte Geschenke mit folgendem Code:',
      share_txt_1_2: 'und erhalte Geschenke',
      share_promo: 'Promocode',

      // MenuCatsCtrl
      menue_cat_title: 'Kategorien',

      // MenuCtrl
      menue_title: 'Menü',
      menue_costs: 'Kosten',
      menue_money: '€',

      // MenuDetailCtrl
      menue_detail_costs: 'Kosten',
      menue_detail_money: '€',
      menue_detail_amount: 'st',

      // CartCtrl
      cart_title: 'Warenkorb',
      cart_next: 'Weiter',
      cart_amount: 'Anzahl',
      cart_costs: 'Kosten',
      cart_money: '€',
      cart_empty: 'Ihr Warenkorb ist leer',
      cart_empty_take: 'Kehren Sie zurück ins Menü und fügen Artikel in den Warenkorb!',

      // CartSendCtrl
      cart_send_title: 'Bestellung',
      cart_send_back: 'Zurück',
      cart_send_next: 'Senden',
      cart_send_surname: 'Nachname',
      cart_send_name: 'Name',
      cart_send_middlename: 'Vatersname',
      cart_send_mobile: 'Mobilnummer',
      cart_send_email: 'Email',
      cart_send_town: 'Stadt',
      cart_send_adress: 'Adresse',
      cart_send_comment: 'Kommentar',
      cart_cntr_pop_tit: 'Danke',
      cart_cntr_pop_tmp: 'Wir rufen Sie zurück',
      cart_cntr_pop_send_ord_tit: 'Bestellung senden',
      cart_cntr_pop_send_ord_tmp: 'Senden',
      cart_cntr_pop_send_ord_btn1: 'Ja',
      cart_cntr_pop_send_ord_btn2: 'Nein',
      cart_cntr_pop_send_ord_send: 'Senden',
      cart_cntr_pop_err1_tit: 'Achtung',
      cart_cntr_pop_err1_tmp: 'Bestellung konnte nicht abgesendet werden',
      cart_cntr_pop_err2_tit: 'Achtung',
      cart_cntr_pop_err2_tmp: 'Server ist nicht zu erreichen',
      cart_cntr_pop_nottake_ord_tit: 'Bestellungen gestoppt!',
      cart_cntr_pop_nottake_ord_tmp: 'Zur Zeit werden keine Bestellungen nicht angenommen!',
      cart_cntr_pop_nottake_ord_btn1: 'Schließen',

      // NewsCtrl
      news_title: 'Aktionen',
      news_take_look: 'Geben Sie Acht auf Neuigkeiten',
      news_look_here: 'Schauen Sie hier regelmäßig vorbei und erfahren als erster über Neuigkeiten!',
      news_firstgift: 'Erstes Geschenk',

      // NewsDetailCtrl
      news_detail_from: 'Von',
      news_detail_to: 'bis',
      news_detail_qr: 'Zeigen Sie den QR-code Ihrem Kellner',

      // ContactMapCtrl
      contact_map_map: 'Karte',
      contact_map_list: 'Liste',
      contact_map_distance: 'm',
      contact_map_opened: 'geöffnet',
      contact_map_closed: 'geschloßen',
      contact_map_reserved: 'Reservieren',

      // ContactListCtrl
      contact_list_map: 'Karte',
      contact_list_list: 'Liste',
      contact_list_distance: 'km',
      contact_list_opened: 'geöffnet',
      contact_list_closed: 'geschloßen',
      contact_list_call: 'Anrugen',
      contact_list_email: 'Schreiben',
      contact_list_site: 'Zur Homepage',
      contact_list_phones: 'KONTAKT',

      // ElseCtrl
      else_title: 'Noch',
      else_profile: 'Profil',
      else_points: 'Mein Punkte',
      else_purchase: 'Meine Bestellungen',
      else_review: 'Bewertung machen',
      else_bonus: 'Das Bonusprogramm',
      else_share: 'Teilen',
      else_support: 'Technische Unterstützung',
      else_reservation: 'Reservieren',
      else_entry: 'Online-Termin',
      else_fifthgift: 'Fünfte Kauf umsonst',
      else_promo: 'Promocode benützen',
      else_discount: 'Discount Karte',
      else_about_us: 'Über uns',
      else_about: 'Über Entwickler',
      else_policy: 'Datenschutzrichtlinie und Nutzungsbedingungen.',
      else_review_choise: 'Lokal aussuchen',
      else_review_choose_pic: 'Foto anhängen',
      else_review_make_pic: 'Foto machen',
      else_review_take_pic: 'Aus Gallery wählen',
      else_review_cancel: 'Abbruch',
      else_pop_phone_tit: "Telefonnummer notwendig!",
      else_pop_phone_tmp: "Um das Bonussystem benützen zu können, muss Ihre Telefonnummer angegeben und bestätigt sein.",
      else_pop_phone_btn1: "Nummer angeben",
      else_pop_phone_btn2: "Abbruch",
      
      langru: 'Russisch',
      langen: 'Englisch',
      langde: 'Deutsch',
      
      else_push_thank: 'Danke!',
      else_push_thank_text: 'Ihr Feedback hilft zu verbessern «Name der Einrichtung. Wir werden Sie Kontaktieren, falls wir zusätzliche Informationen benötigen',
      else_push_btn_close: 'Schließen',

      // ProfileCtrl
      profile_title: 'Profil',
      profile_promo: 'Mein Promocode',
      profile_history: 'GESCHICHTE VON OPERATIONEN',
      profile_awaiting: 'Erwartet Bestätigung',
      profile_confirmed: 'Bestätigt',
      profile_denied: 'Abgelehnt',
      profile_canceled: 'Abgebrochen',
      profile_cancel: 'Abbrechen',
      profile_go_history: 'Geschichte anschauen',
      profile_operations: 'aller Ihnen getätigten Operationen',
      profile_ctrl_pop_canc_tit: 'Eintrag widerrufen',
      profile_ctrl_pop_canc_temp: 'Wollen Sie wirklich diesen Eintrag widerrufen?',
      profile_ctrl_pop_canc_btn1: 'Nein',
      profile_ctrl_pop_canc_btn2: 'Ja',

      // ProfileEditCtrl
      profile_edit_title: 'Profil ändern',
      profile_edit_cancel: 'Abbruch',
      profile_edit_ready: 'Fertig',
      profile_edit_promo: 'Mein Promocode',
      profile_edit_surname: 'Nachname',
      profile_edit_name: 'Name',
      profile_edit_middlename: 'Vatersname',
      profile_edit_data: 'PERSÖHNLICHE DATEN',
      profile_edit_gender: 'Geschlecht',
      profile_edit_male: 'Männlich',
      profile_edit_female: 'Weiblich',
      profile_edit_birthday: 'Geburtstag',
      profile_edit_nobirth: 'Nicht angegeben',
      profile_edit_mobile: 'Mobilnummer',
      profile_edit_nomob: 'Nicht angegeben',
      profile_edit_email: 'Email',
      profile_edit_nomail: 'Nicht angegeben',
      profile_edit_ctrl_pop_proofed_tit: 'Achtung',
      profile_edit_ctrl_pop_proofed_temp: 'Nummer bereits bestätigt!',
      profile_edit_ctrl_pop_caution_tit: 'Achtung!',
      profile_edit_ctrl_pop_caution_tmp: 'Nummer bereits bestätigt',
      profile_edit_ctrl_pop_5minagain_tit: 'Achtung!',
      profile_edit_ctrl_pop_5minagain_tmp: 'Anfrage erst wieder in 5 Minut! Sie können jedoch den vorherigen Code eingeben.',
      profile_edit_ctrl_pop_numagain_tit: 'Achtung!',
      profile_edit_ctrl_pop_numagain_tmp: 'Geben Sie Ihre Mobilnummer ein!',
      profile_edit_ctrl_pop_reqerr_tit: 'Fehler',
      profile_edit_ctrl_pop_reqerr_tmp: 'Fehler in der Anfrage der Bestätigung!',
      profile_edit_ctrl_pop_answerr_tit: 'Fehler',
      profile_edit_ctrl_pop_answerr_tmp: 'Fehler in der Antwort beim Speichern!',
      profile_edit_ctrl_pop_discount_tit: 'Discount-Karte',
      profile_edit_ctrl_pop_discount_tmp: 'Discount-Karte hinzugefügt!',
      profile_edit_ctrl_pop_block_tit: 'Blockierung',
      profile_edit_ctrl_pop_block_tmp: 'Sie wurden Gesperrt!',
      profile_edit_ctrl_pop_deblock_tit: 'Blockierung',
      profile_edit_ctrl_pop_deblock_tmp: 'Sie wurden entsperrt!',
      profile_edit_ctrl_pop_numconf_tit: 'Danke!',
      profile_edit_ctrl_pop_numconf_tmp: 'Nummer bestätigt!',
      profile_edit_ctrl_pop_numconf_btn1: 'OK',
      profile_edit_ctrl_pop_erransw_tit: 'Fehler',
      profile_edit_ctrl_pop_erransw_tmp: 'Fehler in der Antwort der Bestätigung!',
      profile_edit_ctrl_pop_errcode_tit: 'Achtung!',
      profile_edit_ctrl_pop_errcode_tmp: 'Falsch eingegebener Code!',
      profile_edit_ctrl_pop_errconf_tit: 'Fehler',
      profile_edit_ctrl_pop_errconf_tmp: 'Fehler in der Antwort der Bestätigung!',
      profile_review_pic_delete: 'Foto entfernen',
      profile_review_choise: 'Profilfoto austauschen',
      profile_review_choose_pic: 'Foto anhängen',
      profile_review_make_pic: 'Foto machen',
      profile_review_take_pic: 'Von Gallery wählen',
      profile_review_cancel: 'Abbruch',

      // PointsCtrl
      points_title: 'Geschichte der Bonuspunkte',
      points_money: '€',
      points_awaiting: 'Erwartet Bestätigung',
      points_confirmed: 'Bestätigt',
      points_canceled: 'Abgelehnt',

      // PurchaseCtrl
      purchase_title: 'Bestellgeschichte',
      purchase_money: '€',

      // SupportCtrl
      support_title: 'Technische Unterstützung',
      support_connection: 'Chat mit Unterstützung',
      support_question: 'Richten Sie Ihre Frage an den Spezialisten',

      // SupportDetailsCtrl
      support_details_title: 'Technische Unterstützung',
      support_details_connection: 'Chat mit Unterstützung',
      support_details_question: 'Richten Sie Ihre Frage an den Spezialisten',

      // SupportChatCtrl
      support_chat_title: 'Chat',
      support_chat_question: 'Richten Sie Ihre Frage an den Spezialisten',
      support_chat_message: 'Ihre Nachricht',
      support_chat_send: 'Send.',
      support_chat_call_ctrl_pop_btn1: 'Abbruch',
      support_chat_call_ctrl_pop_btn2: 'Anrufen',
      support_chat_hello: 'Guten Tag! Wie kann ich Ihnen behilflich sein?',

      // ReservationCtrl
      reservation_title: 'Reservieren',
      reservation_send: 'Senden',
      reservation_surname: 'Nachname',
      reservation_name: 'Name',
      reservation_middlename: 'Vatersname',
      reservation_date: 'Datum',
      reservation_time: 'Uhrzeit',
      reservation_amount: 'Gästeanzahl',
      reservation_comment: 'Kommentar',
      reservation_ctrl_pop_tit: 'Danke!',
      reservation_ctrl_pop_temp: 'Eingetragen. Wir setzen uns mit Ihnen in Verbindung, falls wir zusätzliche Information benötigen',
      reservation_ctrl_pop_btn1: 'Schließen',

      // Entry All
      order_bs_online_reg_1: "Online-Termin",
      order_bs_online_reg_2: "Company App",

      // EntryCatCtrl
      order_bs_top_1: "Dienst auswählen",

      // EntryStartCtrl
      order_bs_top_2: "Eintragen",
      order_bs_go_on: "Weiter",

      // EntryWorkerCtrl
      order_bs_top_3: "Assistenten auswählen",
      order_bs_worker_x_top: "Zufällig",
      order_bs_worker_x_sub: "Nicht angegeben",

      // EntryTimeCtrl
      order_bs_top_4: "Datum und Uhrzeit auswählen",

      // EntryCtrl
      order_bs_top_5: "Kontakt",
      order_bs_add_order: "Eintrag hinzufügen",
      order_bs_your_name: "Name",
      order_bs_your_name_ex: "Name",
      order_bs_phone: "Telefon",
      order_bs_ex_phone_1: "Beispiel: 01701234567",
      order_bs_ex_phone_2: "Nur Ziffern! Beispiel: 01701234567",
      order_bs_email: "Email",
      order_bs_email_ex: "email@email.de",
      order_bs_comment: "Kommentar",
      order_bs_comment_ex: "Mein Kommentar",
      order_bs_confirm: "Eintragen",
      order_bs_ctrl_pop_tit: 'Danke!',
      order_bs_ctrl_pop_temp: 'Sie haben sich eingetragen! Erwarten Sie einen Rückruf.',
      order_bs_ctrl_pop_btn1: 'Schließen',
      order_bs_ctrl_pop_err5min_tit: 'Achtung!',
      order_bs_ctrl_pop_err5min_temp: 'Повторный запрос только через 5 минут!',
      order_bs_ctrl_pop_err5min_btn1: 'Schließen',
      order_bs_ctrl_pop_errphone_tit: 'Achtung!',
      order_bs_ctrl_pop_errphone_temp: 'Geben Sie Ihre Telefonnumer an!',
      order_bs_ctrl_pop_errphone_btn1: 'Schließen',
      order_bs_ctrl_pop_erralready_tit: 'Achtung!',
      order_bs_ctrl_pop_erralready_temp: 'Termin besteht bereits!',
      order_bs_ctrl_pop_erralready_btn1: 'Schließen',
      order_bs_ctrl_pop_errempty_tit: 'Leerer Eintrag!',
      order_bs_ctrl_pop_errempty_temp: 'Fügen Sie mindestens einen Dienst hinzu.',
      order_bs_ctrl_pop_errempty_btn1: 'Schließen',

      // FifthGiftCtrl
      fifth_title: 'Fünfter Kauf umsonst',
      fifth_amount: 'Anzahl getätigter Käufe',
      fifth_qr: 'Zeigen Sie den QR-code Ihrem Kellner und erhalten ein Geschenk',
      fifth_ready: 'Fertig',

      // AboutCtrl
      about_title: 'Entwickler',
      about_text: 'Die Entwickler sind gut und liebevoll',

      // AboutUsCtrl
      about_us_title: 'Über uns',
      about_us_text: 'Einige Wörter über uns',

      // TransactionsCtrl
      trans_title: 'Geschichte der Transaktionen',
      trans_awaiting: 'Erwartet Bestätigung',
      trans_confirmed: 'Bestätigt',
      trans_denied: 'Abgelehnt',
      trans_canceled: 'Abgebrochen',
      trans_cancel: 'Abbrechen',
      trans_ctrl_pop_canc_tit: 'Eintrag widerrufen',
      trans_ctrl_pop_canc_tmp: 'Wollen Sie wirklich diesen Eintrag widerrufen?',
      trans_ctrl_pop_canc_btn1: 'Nein',
      trans_ctrl_pop_canc_btn2: 'Ja',

      // Bonus Modal
      bonus_title: 'Das Bonusprogramm',
      bonus_txt_title_1: 'Die Regeln des Bonusprogramms',
      bonus_txt_body_1: 'Zahlung nur in Euro.',
      bonus_txt_title_2: 'Noch',
      bonus_txt_body_2: 'Bitte vorraussichtlich mitteilen auf welche Art Sie bezahlen möchten.',

      // Surveys Radio
      survey_radio_title: 'Umfrage',

      // Surveys Text
      survey_text_title: 'Umfrage',
      survey_text_send: 'Senden',
      survey_text_answer: 'Ihre Antwort..',

      // Contact Modal
      contact_title: 'Einrichtung wählen',
      contact_distance: 'm',
      contact_opened: 'geöffnet',
      contact_closed: 'geschloßen',

      // Email Modal
      email_cancel: 'Abbruch',
      email_email: 'Email',
      email_next: 'Weiter',
      email_enter_email: 'Geben Sie Ihre Email an',

      // Promo Modal
      promo_modal_cancel: 'Abbruch',
      promo_modal_code: 'Promocode',
      promo_modal_next: 'Benützen',
      promo_modal_enter_code: 'Geben Sie einen Promokode an',
      promo_modal_pop_tit: 'Achtung!',
      promo_modal_pop_tmp: 'Bereits genützt!',
      promo_modal_pop_btn: 'Schließen',
      promo_modal_pop_succ_tit: "Danke",
      promo_modal_pop_succ_tmp: "Ihnen werden zusätzliche Punkte hinzugefügt!",
      promo_modal_pop_succ_btn: "Schließen",
      promo_modal_pop_wrong_tit: "Achtung!",
      promo_modal_pop_wrong_tmp: "Promocode existiert nicht!",
      promo_modal_pop_wrong_btn: "Schließen",

      // Discount Modal
      discount_modal_pop_tit: "Neue Karte?",
      discount_modal_pop_tmp: "Eine neue Karte hinzufügen?",
      discount_modal_pop_btn1: "Einfügen",
      discount_modal_pop_btn2: "Abbruch",
      discount_modal_exists_pop_tit: "Achtung!",
      discount_modal_exists_pop_tmp: "Diese Karte wird bereits von einem anderen Mitglied benützt!",
      discount_modal_exists_pop_btn: "Schließen",
      discount_modal_wrong_pop_tit: "Falscher Code!",
      discount_modal_wrong_pop_tmp: "Der eingelesene Code gehört nicht zu Ihrer Firma.",
      discount_modal_wrong_pop_btn1: "Nochmal",
      discount_modal_wrong_pop_btn2: "Abbruch",
      discount_modal_err_pop_tit: "Achtung!",
      discount_modal_err_pop_tmp: "Scannerfehler.",
      discount_modal_err_pop_btn: "Schließen",

      // Gender Modal
      gender_gender: 'Geschlecht',
      gender_male: 'Männlich',
      gender_female: 'Weiblich',

      // Country Code Modal
      code_cancel: 'Abbruch',
      code_country: 'Land',

      // Mobile Confirm Modal
      mobile_confirm_mobile: 'Mobilnummer',
      mobile_confirm_next: 'Далее',
      mobile_confirm_confirm: 'Bestätigungs-code',
      mobile_confirm_text_1: 'Geben Sie den Bestätigungs-code ein, der an die folgende Nummer gesendet wurde',
      mobile_confirm_text_2: 'Falls Sie diesen nicht erhalten haben, können wir ihn',
      mobile_confirm_send_again: 'nochmals schicken',

      // Mobile Modal
      mobile_title: 'Mobilnummer',
      mobile_next: 'Weiter',
      mobile_number: 'Geben Sie Ihre Mobilnummer an',
      mobile_text: 'Wir schicken Ihnen ein Bestätigungs-code an diese Mobilnummer',

      // FAQ
      faq_cat_points: 'Punkte',
      faq_cat_other: 'Anderes',

      faq_ask_points_dont_see: 'Ich habe meine Bestellung bezahlt, der Kellner hat meine Karte abgelesen, aber ich sehe nicht die gutgeschriebenen Punkte in meinem App. Was kann ich tun?',
      faq_ask_points_dont_see_answ: 'Um die gutgeschriebenen Punkte zu sehen, schließen Sie die Anwendung und starten diese neu. Wenn Sie danach die Punkte immer noch nicht sehen, überprüfen Sie Ihre Internetverbindung. Die Verfügbarkeit des Internets in Ihrem Smartphone ist eine notwendige Bedingung, damit Sie Ihren aktuellen Kontostand sehen.',
      faq_ask_points_for_what: 'Wofür bekomme ich Bonuspunkte?',
      faq_ask_points_for_what_answ: 'Bonus-Punkte erhalten Sie in folgenden Fällen:',
      faq_ask_points_for_what_answ1: 'Machen Sie Ihre Bestellung, bezahlen Sie diese und weisen dem Kellner ihre "Karte des beständigen Gastes" auf dem Smartphone.',
      faq_ask_points_for_what_answ2: 'Teilen in sozialen Netzwerken mit Hilfe der Anwendung.',
      faq_ask_points_for_what_answ3: 'Teilen Sie Ihren Promo-Code für die Installation mit Freunden.',
      faq_ask_points_shared_not_got: 'Ich teilte eine Nachricht in einem sozialen Netzwerk, jedoch wurden die Bonuspunkte nicht gutgeschrieben.',
      faq_ask_points_shared_not_got_answ: 'Um die gutgeschriebenen Punkte zu sehen, schließen Sie die Anwendung und starten diese von neu. Wenn Sie danach die Bonuspunkte immer noch nicht sehen, überprüfen Sie die Internetverbindung. Die Verfügbarkeit des Internets in Ihrem Smartphone ist eine notwendige Bedingung, damit Sie Ihren aktuellen Kontostand sehen.',
      faq_ask_points_promo: 'Wie benütze ich meinen Promo-Code, um Punkte zu sammeln?',
      faq_ask_points_promo_answ: 'Nachdem Sie Ihren Promo-Code an Ihren Freund geteilt haben, werden Ihnen die Punkte, in den folgenden Fällen gutgeschrieben:',
      faq_ask_points_promo_answ1: 'Ihr Freund installierte die Anwendung',
      faq_ask_points_promo_answ2: 'Ihr Freund besuchte unser Restaurant und tätigte eine Bestellung',
      faq_ask_points_promo_answ3: 'Die Anzahl der Punkte im zweiten Fall ist größer als im ersten. Sobald Ihr Freund die App heruntergeladen hat, muss er seine Karte des ständigen Gastes registrieren. Bei der Registrierung der App wird Ihm angeboten einen Promo-Code anzugeben.',
      faq_ask_points_new_phone: 'Wie übertrage ich die gesammelten Punkte wenn ich mein Handy wechsle?',
      faq_ask_points_new_phone_answ: 'Die gesammelten Punkte sind an Ihre Telefonnummer gebunden. Laden Sie die App erneut und registrieren Sie Ihre Karte mit der gleichen Telefonnummer. Alle Punkte werden in die Anwendung rübergezogen. Wenn Sie die Punkte nach der Registrierung nicht sehen, beenden Sie die Anwendung und öffnen Sie diese erneut. In diesem Fall ist die Verfügbarkeit des Internets in Ihrem Smartphone unbedingt erforderlich.',
      faq_ask_points_expire: 'Haben die Punkte eine Wertedauer und werden diese jemals gelöscht?',
      faq_ask_points_expire_answ: 'Bonus-Punkte werden nach 6 Monaten Inaktivität gelöscht. D.h. wenn Sie 6 Monate lang keine Bonuspunkte erhalten oder diese ausgegeben haben.',

      faq_ask_other_sms: 'Ich gebe meine Telefonnumer an, jedoch erhalte lange keine SMS mit Bestätigungscode. Was soll ich tun?',
      faq_ask_other_sms_answ: 'Die Versandgeschwindigkeit der SMS-Nachrichten ist abhängig vom SMS-Provider. Leider kann manchmal die Zustellzeit bis zu 30 Minuten dauern. Wenn Sie nicht warten möchten, wenden Sie sich bitte an den technischen Support unter: +491703562235',
      faq_ask_other_prof_edit: 'Kann ich meine persönliche Information ändern, nachdem ich meine Telefonnumer bestätigt habe?',
      faq_ask_other_prof_edit_answ: 'Nachdem Sie Ihre Telefonnumer bestätigt haben, können Sie all die Information ändern außer der Telefonnumer.'

    });

    $translateProvider.preferredLanguage("en");
    $translateProvider.fallbackLanguage("en");

})
;
