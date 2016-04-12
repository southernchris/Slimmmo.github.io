'use strict';

angular.module('adventureApp')
    .filter('time', ['utils', function(utils) {
        return function(input, raw) {
            if (input === Infinity) {
            return "———";
            } else if (raw) {
            var out = utils.numFilter(input, raw) + ' s';
            } else {
            input = Math.floor(input);
            var s = ("00" + input % 60).slice(-2);
            var m = ("00" + Math.floor(input / 60) % 60).slice(-2);
            var h = ("00" + Math.floor(input / 3600) % 24).slice(-2);
            var d = Math.floor(input / 86400);
            var out = "";
            if (d >= 1) {
                out += utils.numFilter(d, false) + ' d';
                if (d < 100) {
                out += ', '
                }
            }
            if (d < 100) {
                out += h + ":" + m + ":" + s;
            }
            return out;
            }
        }
    }])
    .filter('num', ['utils', 'constants', function(utils) {
        return function(input, raw) {
            return utils.numFilter(input, raw);
        }
    }])
    .filter('percentage', function() {
        return function(input) {
            if (isNaN(input)) return input;
            return Math.floor(input * 1000) / 10 + '%';
        }
    })
    .filter('rec', function() {    
        return function(input, loc) {
            var retVal = '';
            if (input === 'all') {
            retVal = 'All';
            } else if (input[0] === 'level') {
            retVal = loc.investments[input[1]][0];
            } else if (input[0] === 'cash') {
            var index = Math.floor(loc.cashUpgrades[input[1]][1][0] / 2);
            retVal = (index < loc.investments.length) ? loc.investments[index][0] : 'All';
            retVal += (loc.cashUpgrades[input[1]][1][0] % 2 === 0) ? ' Profit' : ' Speed';
            retVal += ' ' + loc.cashUpgrades[input[1]][1][1];
            }
            return retVal;
        }
    });