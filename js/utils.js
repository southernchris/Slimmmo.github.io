'use strict';

angular.module('adventureApp')    
    .service('utils', ['constants', function(constants) {

    return {
        numFilter: function (input, raw) {
            var out = "",
            mCount = 0,
            e = 6;
            if (input === Infinity) {
                return "Infinity";
            } else if (input !== null) {
                if (!raw) {
                while (input >= Number('1e+' + e)) {
                    e += 3;
                    mCount++;
                }
                if (e !== 6) {
                    e -= 3;
                    input /= Number('1e+' + e);
                }
                if (input < 1000) {
                    out = Math.round(input * 1000) / 1000;
                } else {
                    out = Math.round(input * 100) / 100;
                    out = out.toLocaleString("en-US");
                }
                } else {
                out = input.toLocaleString("en-US");
                }
            }
            return out + constants.illionsArr[mCount];
        }
    };
 }]);