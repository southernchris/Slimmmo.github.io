    angular.module('adventureApp').directive('cashUpgrades', function () {
        return {
           restrict: 'E',
           scope: {
                cashUpgrades: '=',
                clearAfter: '=',
                fillBefore: '=',
                ref: '='
           },
           template: `
              <div class="well">
                <label><input type="checkbox" class="form-control col-xs-offset-3" data-ng-model="fillBefore[0]"> Buy all before (inclusive)</label>
                <label><input type="checkbox" class="form-control col-xs-offset-3" data-ng-model="clearAfter[0]"> Clear all after (inclusive)</label>
              </div>
              <div class="multicolumn">
				<div data-ng-repeat="cupg in cashUpgrades track by $index"><label class="strike-when-checked"><input type="checkbox" class="form-control" data-ng-model="cupg[2]" data-ng-change="checkCash(ref, $index)"> <span>{{getNamedType(ref, cupg)}} (\${{cupg[0] | num:raw}})</span></label></div>
              </div>`,
            link: function(scope) {
                scope.checkCash = function(loc, index) {
                    var i = 0;
                    if (scope.fillBefore[0] && loc.cashUpgrades[index][loc.cashUpgrades[index].length - 1] == true) {
                        for (; i < index; i++) {
                            loc.cashUpgrades[i][loc.cashUpgrades[i].length - 1] = true;
                        }
                    }
                    if (scope.clearAfter[0] && loc.cashUpgrades[index][loc.cashUpgrades[index].length - 1] == false) {
                        for (i = index + 1; i < loc.cashUpgrades.length; i++) {
                            loc.cashUpgrades[i][loc.cashUpgrades[i].length - 1] = false;
                        }
                    }
                };
                
                scope.getNamedType = function(loc, tuple) {
                    var i, j, k = '', l = 1, num;
                    for (; l < tuple.length - 1; l++) {
                        if (typeof tuple[l] === 'object') {
                            i = Math.floor(tuple[l][0] / 2);
                            j = tuple[l][0] % 1;
                            num = tuple[l][1];
                            if (l !== 1) {
                                k += ', ';
                            }
                            if (i < loc.investments.length) {
                                k += loc.investments[i][0] + (j && ' Speed ' || ' Profit ') + num;
                            } else if (i === loc.investments.length) {
                                k += 'All' + (j && ' Speed ' || ' Profit ') + num;
                            } else if (i === loc.investments.length + 1) {
                                k += 'Angel Investor ' + num;
                            } else if (tuple[l][0] >= 30 && tuple[l][0] <= 29 + loc.investments.length) {
                                k += '+' + tuple[l][1] + ' ' + loc.investments[tuple[l][0] - 30][0];
                            }
                        }
                    }
                    return k;
                };
            }
        };
    });