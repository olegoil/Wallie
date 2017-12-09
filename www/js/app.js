angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ionic.rating', 'ionic-datepicker', 'ngIOS9UIWebViewPatch', 'pascalprecht.translate', 'ja.qr', 'ionic-cache-src', 'ion-datetime-picker', 'ion-autocomplete'])

.run(function($ionicPlatform, $state, $http, $timeout, $rootScope, $window, $ionicHistory, $ionicPopup, $localStorage, $ionicLoading, $cordovaSplashscreen) {

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

    $rootScope.generalscript = 'http://www.olegtronics.com/wallie/test.php';

    $rootScope.user_id = 1;

    $ionicLoading.show({
      template: '<ion-spinner icon="android" class="spinner-positive"></ion-spinner>',
      duration: 0,
      animation: 'fade-in'
    }).then(function() {

      var jsonedstr = JSON.stringify({
        userId: $rootScope.user_id,
        userToken: 'xxx'
      });
  
      $http.post($rootScope.generalscript, jsonedstr).then(function(suc) {
        
        $ionicLoading.hide().then(function() {
          if(suc.data[0].request) {
            // $cordovaSplashscreen.hide();
            // console.log(suc.data[0].request)
            $state.go('card');
          }
        });
  
      }, 
      function(er) {});

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

  .state('login', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('settings', {
    cache: false,
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'SettingsCtrl'
  })

  .state('coinsget', {
    cache: false,
    url: '/coinsget',
    templateUrl: 'templates/coinsget.html',
    controller: 'CoinsgetCtrl'
  })

  .state('coinssend', {
    cache: false,
    url: '/coinssend',
    templateUrl: 'templates/coinssend.html',
    controller: 'CoinssendCtrl'
  })

  .state('card', {
    cache: false,
    url: '/card',
    templateUrl: 'templates/tab-card.html',
    controller: 'CardCtrl'
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

      card_coins_menue: "Настройки",
      card_coins_coinsget: "Получить",
      card_coins_coinssend: "Отправить",      

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
      promo_modal_pop_notallowed_tit: "Внимание!",
      promo_modal_pop_notallowed_tmp: "Нельзя задавать промокод привлеченного Вами друга!",
      promo_modal_pop_notallowed_btn: "Закрыть",

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
      
      card_coins_menue: "Einstellungen",
      card_coins_coinsget: "Erhalten",
      card_coins_coinssend: "Senden",  

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
      promo_modal_pop_notallowed_tit: "Achtung!",
      promo_modal_pop_notallowed_tmp: "Eingabe des Promocodes vom angelockten Freund nicht erlaubt!",
      promo_modal_pop_notallowed_btn: "Schließen",

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
      
      card_coins_menue: "Settings",
      card_coins_coinsget: "Get",
      card_coins_coinssend: "Send",  

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
      promo_modal_pop_notallowed_tit: "Achtung!",
      promo_modal_pop_notallowed_tmp: "Eingabe des Promocodes vom angelockten Freund nicht erlaubt!",
      promo_modal_pop_notallowed_btn: "Schließen",

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
