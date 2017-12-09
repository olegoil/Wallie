angular.module('starter.services', [])

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
