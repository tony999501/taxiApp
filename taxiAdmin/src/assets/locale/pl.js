!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e.__locale__pl=e.__locale__pl||{},e.__locale__pl.js=n())}(this,function(){"use strict";var e={after:function(e,n){var i=n[0];return"Pole "+e+" musi być po polu "+i+"."},alpha_dash:function(e){return"Pole "+e+" może zawierać litery, cyfry oraz myślnik lub podkreślnik."},alpha_num:function(e){return"Pole "+e+" może zawierać tylko litery i cyfry."},alpha_spaces:function(e){return"Pole "+e+" może zawierać tylko litery, cyfry oraz spacje."},alpha:function(e){return"Pole "+e+" może zawierać tylko litery."},before:function(e,n){var i=n[0];return"Pole "+e+" musi być przed "+i+"."},between:function(e,n){var i=n[0],r=n[1];return"Pole "+e+" must be between "+i+" and "+r+"."},confirmed:function(e,n){var i=n[0];return"Pole "+e+" nie zgadza się z polem potwierdzającym "+i+"."},date_between:function(e,n){var i=n[0],r=n[1];return"Pole "+e+" musi zawierać się między "+i+" a "+r+"."},date_format:function(e,n){var i=n[0];return"Pole "+e+" musi pasować do formatu "+i+"."},decimal:function(e,n){void 0===n&&(n=["*"]);var i=n[0];return"Pole "+e+" musi być liczbą i może zawierać "+("*"===i?"":i)+" miejsca po przecinku."},digits:function(e,n){var i=n[0];return"Pole "+e+" musi być liczbą i dokładnie "+i+" cyfr."},dimensions:function(e,n){var i=n[0],r=n[1];return"Obraz "+e+" musi być szeroki na "+i+" pikseli i wysoki na "+r+" pikseli."},email:function(e){return"Pole "+e+" musi być poprawnym adresem email."},ext:function(e){return"Plik "+e+" musi być poprawnym plikiem."},image:function(e){return"Pole "+e+" musi być obrazem."},in:function(e){return"Pole "+e+" musi być poprawną wartością."},ip:function(e){return"Pole "+e+" musi być poprawnym adresem IP."},max:function(e,n){var i=n[0];return"Pole "+e+" nie może być dłuższe niż "+i+" znaków."},mimes:function(e){return"Plik "+e+" musi posiadać poprawne rozszerzenie."},min:function(e,n){var i=n[0];return"Pole "+e+" musi być długie na co najmniej "+i+" znaków."},not_in:function(e){return"Pole "+e+" musi być poprawną wartością."},numeric:function(e){return"Pole "+e+" może zawierać tylko cyfry."},regex:function(e){return"Format pola "+e+" jest nieodpowiedni."},required:function(e){return"Pole "+e+" jest wymagane."},size:function(e,n){var i=n[0];return"Plik "+e+" musi być mniejszy niż "+i+" KB."},url:function(e){return"Pole "+e+" nie jest poprawnym URL."}},n={name:"pl",messages:e,attributes:{}};return"undefined"!=typeof VeeValidate&&VeeValidate&&(VeeValidate.Validator,!0)&&VeeValidate.Validator.addLocale(n),n});