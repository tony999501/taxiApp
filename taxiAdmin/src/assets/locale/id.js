!function(a,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(a.__locale__id=a.__locale__id||{},a.__locale__id.js=n())}(this,function(){"use strict";var a={after:function(a,n){var e=n[0];return a+" harus sebelum "+e+"."},alpha_dash:function(a){return a+" boleh mengandung karakter alfanumerik, tanda hubung, dan garis bawah."},alpha_num:function(a){return a+" hanya boleh mengandung karakter alfanumerik."},alpha:function(a){return a+" hanya boleh mengandung karakter alfabet."},before:function(a,n){var e=n[0];return a+" harus setelah "+e+"."},between:function(a,n){var e=n[0],r=n[1];return a+" harus di antara "+e+" dan "+r+"."},confirmed:function(a,n){var e=n[0];return a+" tidak cocok dengan "+e+"."},date_between:function(a,n){var e=n[0],r=n[1];return a+" harus di antara "+e+" dan "+r+"."},date_format:function(a,n){var e=n[0];return a+" harus dalam format "+e+"."},decimal:function(a,n){void 0===n&&(n=["*"]);var e=n[0];return a+" harus berupa angka dan boleh mengandung "+("*"===e?"":e)+" titik desimal."},digits:function(a,n){var e=n[0];return a+" harus berupa "+e+" digit angka."},dimensions:function(a,n){var e=n[0],r=n[1];return a+" harus berdimensi lebar "+e+" pixel dan tinggi "+r+" pixel."},email:function(a){return a+" harus berupa alamat surel yang benar."},ext:function(a){return a+" harus berupa berkas yang benar."},image:function(a){return a+" harus berupa gambar."},in:function(a){return a+" harus berupa nilai yang sah."},ip:function(a){return a+" harus berupa alamat ip yang sah."},max:function(a,n){var e=n[0];return a+" tidak boleh lebih dari "+e+" karakter."},mimes:function(a){return"Tipe berkas "+a+" harus benar."},min:function(a,n){var e=n[0];return a+" minimal mengandung "+e+" karakter."},not_in:function(a){return a+" harus berupa nilai yang sah."},numeric:function(a){return a+" harus berupa angka."},regex:function(a){return"Format "+a+" salah."},required:function(a){return a+" harus diisi."},size:function(a,n){var e=n[0];return a+" harus lebih kecil dari "+e+" KB."},url:function(a){return a+" harus berupa tautan yang benar."}},n={name:"id",messages:a,attributes:{}};return"undefined"!=typeof VeeValidate&&VeeValidate&&(VeeValidate.Validator,!0)&&VeeValidate.Validator.addLocale(n),n});