!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e.__locale__fr=e.__locale__fr||{},e.__locale__fr.js=t())}(this,function(){"use strict";var e={after:function(e,t){var n=t[0];return e+" doit être postérieur à "+n+"."},alpha_dash:function(e){return e+" ne peut contenir que des caractères alpha-numériques, tirets ou soulignés."},alpha_num:function(e){return e+" ne peut contenir que des caractères alpha-numériques."},alpha:function(e){return e+" ne peut contenir que des lettres."},before:function(e,t){var n=t[0];return e+" doit être antérieur à "+n+"."},between:function(e,t){var n=t[0],r=t[1];return e+" doit être compris entre "+n+" et "+r+"."},confirmed:function(e,t){var n=t[0];return e+" ne correspond pas à "+n+"."},date_between:function(e,t){var n=t[0],r=t[1];return e+" doit être situé entre "+n+" et "+r+"."},date_format:function(e,t){var n=t[0];return e+" doit être au format "+n+"."},decimal:function(e,t){void 0===t&&(t=["*"]);var n=t[0];return e+" doit être un nombre et peut contenir "+("*"===n?"":n)+" décimales."},digits:function(e,t){var n=t[0];return e+" doit être un nombre entier de "+n+" chiffres."},dimensions:function(e,t){var n=t[0],r=t[1];return e+" doit avoir une taille de "+n+" pixels par "+r+" pixels."},email:function(e){return e+" doit être une adresse e-mail valide."},ext:function(e){return e+" doit être un fichier valide."},image:function(e){return e+" doit être une image."},in:function(e){return e+" doit être une valeur valide."},ip:function(e){return e+" doit être une adresse IP."},max:function(e,t){var n=t[0];return e+" ne peut pas contenir plus de "+n+" caractères."},mimes:function(e){return e+" doit avoir un type MIME valide."},min:function(e,t){var n=t[0];return e+" doit contenir au minimum "+n+" caractères."},not_in:function(e){return e+" doit être une valeur valide."},numeric:function(e){return e+" ne peut contenir que des chiffres."},regex:function(e){return e+" est invalide."},required:function(e){return e+" est obligatoire."},size:function(e,t){var n=t[0];return e+" doit avoir un poids inférieur "+n+" KB."},url:function(e){return e+" n'est pas une URL valide."}},t={name:"fr",messages:e,attributes:{}};return"undefined"!=typeof VeeValidate&&VeeValidate&&(VeeValidate.Validator,!0)&&VeeValidate.Validator.addLocale(t),t});