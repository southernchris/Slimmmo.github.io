    angular.module('adventureApp').directive('angelUpgrades', function () {             
        return {
           restrict: 'E',
           scope: {
                angelUpgrades: '=',
                clearAfter: '=',
                fillBefore: '=',
                ref: '='
           },
           template: `
<div class="well">
    <label><input type="checkbox" class="form-control col-xs-offset-3" data-ng-model="fillBefore[1]"> Buy all before (inclusive)</label>
    <label><input type="checkbox" class="form-control col-xs-offset-3" data-ng-model="clearAfter[1]"> Clear all after (inclusive)</label>
</div>
    <div class="multicolumn">
    <div data-ng-repeat="aupg in angelUpgrades track by $index"><label class="strike-when-checked"><input type="checkbox" class="form-control" data-ng-model="aupg[3]" data-ng-change="checkAngel(ref, $index)"> <span>{{getNamedType(ref, aupg)}} ({{aupg[0] | num:raw}} AI)<i data-ng-show="aupg[2]" title="{{aupg[2] | percentage }} increase in $ / second" class="fa fa-plus"></i></span></label></div>
</div>`,
            link: function(scope) {
                scope.checkAngel = function(loc, index) {
                    var i = 0;
                    loc.angelUpgrades[index][loc.angelUpgrades[index].length - 2] = false;
                    if (scope.fillBefore[1] && loc.angelUpgrades[index][loc.angelUpgrades[index].length - 1] == true) {
                        for (; i < index; i++) {
                            loc.angelUpgrades[i][loc.angelUpgrades[i].length - 1] = true;
                            loc.angelUpgrades[i][loc.angelUpgrades[i].length - 2] = false;
                        }
                    }
                    if (scope.clearAfter[1] && loc.angelUpgrades[index][loc.angelUpgrades[index].length - 1] == false) {
                        for (i = index + 1; i < loc.angelUpgrades.length; i++) {
                            loc.angelUpgrades[i][loc.angelUpgrades[i].length - 1] = false;
                        }
                    }
                    //calcAngels(loc);
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
        }
    });