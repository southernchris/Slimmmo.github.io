    angular.module('adventureApp').directive('calculations', ['calculate', '$filter', function (calculate, $filter) {             
        return {
           restrict: 'E',
           scope: {
               recTable: '=',
               recommendation: '=',
               raw: '=',
               ref: '=',
               planet: '=',
               
               
               filterTime: '='               
           },
           template: `
           <button type="button" class="btn btn-primary" data-ng-click="calc(ref)">Calculate</button>
<div data-ng-show="ref.recTable.length">
    <h2>Recommendation: {{ref.recommendation}}</h2>
    <button type="button" class="btn btn-primary" data-ng-click="apply(ref)">Apply Recommendation</button>
    <label><input type="checkbox" class="form-control" data-ng-model="raw"> Raw Values</label>
    <table class="table table-striped table-hover table-bordered space_top">
    <thead>
        <tr>
        <th>Upgrade</th>
        <th>To</th>
        <th class="clickable" data-ng-click="clickSort(ref, 2)">Upgrade Score (higher = better)*
            <span data-ng-if="2 == sortIndex && reverse" class="pull-right fa fa-chevron-down"></span>
            <span data-ng-if="2 == sortIndex && !reverse" class="pull-right fa fa-chevron-up"></span>
        </th>
        <th class="clickable" data-ng-click="clickSort(ref, 3)">Cost of Upgrade
            <span data-ng-if="3 == sortIndex && reverse" class="pull-right fa fa-chevron-down"></span>
            <span data-ng-if="3 == sortIndex && !reverse" class="pull-right fa fa-chevron-up"></span>
        </th>
        <th class="clickable" data-ng-click="clickSort(ref, 4)">Cost of Upgrade in Time
            <span data-ng-if="4 == sortIndex && reverse" class="pull-right fa fa-chevron-down"></span>
            <span data-ng-if="4 == sortIndex && !reverse" class="pull-right fa fa-chevron-up"></span>
        </th>
        <th class="clickable" data-ng-click="clickSort(ref, 5)">Increase in $ / Second
            <span data-ng-if="5 == sortIndex && reverse" class="pull-right fa fa-chevron-down"></span>
            <span data-ng-if="5 == sortIndex && !reverse" class="pull-right fa fa-chevron-up"></span>
        </th>
        <th class="clickable" data-ng-click="clickSort(ref, 6)">% Increase in $ / Second
            <span data-ng-if="6 == sortIndex && reverse" class="pull-right fa fa-chevron-down"></span>
            <span data-ng-if="6 == sortIndex && !reverse" class="pull-right fa fa-chevron-up"></span>
        </th>
        <th>Apply</th>
        </tr>
    </thead>
    <tbody>
        <tr data-ng-repeat="rec in ref.recTable track by $index">
        <td>{{rec[0] | rec:ref}}</td>
        <td>{{rec[1] | num:raw}}</td>
        <td>{{rec[2] | num:raw}}</td>
        <td>\${{rec[3] | num:raw}}</td>
        <td>{{rec[4] | time:raw}}</td>
        <td>\${{rec[5] | num:raw}}</td>
        <td>{{rec[6] | num:raw}}%</td>
        <td><button type="button" class="btn btn-primary" data-ng-click="applyRow(ref, rec)">Apply this row</button></td>
        </tr>
    </tbody>
    </table>
</div>`,
            link: function(scope) {
                var planets = ['earth', 'moon', 'mars', 'rain'];
                
                scope.reverse = true;
                scope.sortIndex = 2;                
                
                function getJsonForExport() {
                    var retString = '{';
                    for (var p in planets) {
                        if (p !== '0') {
                            retString += ',\r\n';
                        }
                        retString += formatState(scope[planets[p]]);
                    }
                    return retString + '}';
                };
                
                function deepCopy(input) {
                    var temp = [];
                    for (var i = 0; i < input.length; i++) {
                        temp.push(input[i].slice());
                    }
                    return temp;
                }            
                
                function getDifferenceNBonus(loc, index, n) {
                    var i = 0,
                    retVal = null;
                    for (; i < loc.unlocks[index].length; i++) {
                        if (loc.investments[index][1] < loc.unlocks[index][i][0]) {
                            if (i + n - 1 < loc.unlocks[index].length) {
                            retVal = loc.unlocks[index][i + n - 1][0];
                            break;
                            }
                        }
                    }
                    return (retVal === null) ? null : retVal - loc.investments[index][1];
                };
                
                function getNextCashIndex(loc, index) {
                    index += 1;
                    while (index < loc.cashUpgrades.length && tupleIsActive(loc.cashUpgrades[index])) {
                        index++;
                    }
                    if (index === loc.cashUpgrades.length) {
                        index = null;
                    }
                    return index;
                };     
                                
                function indexOrder(input) {
                    return input[scope.sortIndex];
                };           

                function tupleIsActive(tuple) {
                    return tuple[tuple.length - 1];
                };
  
                function updateRecString(loc) {
                    if (loc.rec[0] === 'all') {
                        loc.recommendation = 'Buy all to level ' + loc.rec[1];
                    } else if (loc.rec[0] === 'level') {
                        loc.recommendation = 'Buy ' + loc.investments[loc.rec[1]][0] + ' to level ' + loc.rec[2] + '.';
                    } else {
                        loc.recommendation = 'Buy ' + $filter('rec')(loc.recTable[0][0], loc) + ' Cash Upgrade.'
                    }
                };                
  
                scope.apply = function(loc) {
                    scope.applyRow(loc, loc.recTable[0]);
                };

                scope.applyRow = function(loc, row) {
                    var i = 0;
                    if (row[0] === 'all') {
                        for (; i < loc.investments.length; i++) {
                            if (loc.investments[i][1] < row[1]) {
                            loc.investments[i][1] = row[1];
                            }
                        }
                    } else if (row[0][0] === 'level') {
                        loc.investments[row[0][1]][1] = row[1];
                    } else if (row[0][0] === 'cash') {
                        loc.cashUpgrades[row[0][1]][2] = true;
                    }
                    scope.calc(loc);
                };

                scope.calc = function(loc) {
                    calculate.calcState(loc);
                    calculate.calcAngels(loc);
                    calcSuits(loc);
                    calcRecommendations(loc);
//                    localStorage.setItem('planets', getJsonForExport());
                };
                
  function calcSuits(loc) {
    var i = 0, max = [-1, 0],
    tempPlanet = {};
    loc.suitExclamation = false;
    for (; i < loc.suits.length; i++) {
      if (loc.suits[i][0] === false) {
        tempPlanet = JSON.parse(JSON.stringify(loc));
        tempPlanet.suits[i][0] = true;
        $scope.changeSuits(tempPlanet, i);
        calcState(tempPlanet);
        var delta = tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond;
        var percent = delta / loc.totalMoneyPerSecond;
        if (delta > 0) {
          loc.suits[i][1] = percent;
          loc.suitExclamation = true;
          if (percent > max[1]) {
            max[0] = i;
            max[1] = percent;
          }
        } else {
          loc.suits[i][1] = false;
        }
      }
    }
    if (max[0] !== -1) {
      loc.bestSuit = max[0];
    } else {
      loc.bestSuit = null;
    }
  };
                
                function calcRecommendations(loc) {
                    var i = 0, j = 0, k = 0,
                    highestSharedLevel = loc.investments[0][1],
                    inc = [],
                    tempPlanet = JSON.parse(JSON.stringify(loc)),
                    max = 0,
                    maxObj = [0, 0],
                    tempUnlock = null, tempUnlockTime = null, tempPercentageIncrease = null,
                    upgradeScore = 0;
                    loc.recTable = [];
                    if (!loc.noSingles) {
                    inc.push(1);
                    }
                    if (!loc.noTens) {
                    inc.push(10);
                    }
                    inc.push(100);
                    scope.updateFilterTime(loc);
                    for (; i < loc.investments.length; i++) {
                        while (inc.length > 3 - (loc.noSingles ? 1 : 0) - (loc.noTens ? 1 : 0)) {
                            inc.pop();
                        }
                        if (i === 1 && scope.isWorld('earth')) {
                            for (j = 1; j < 4; j++) {
                                k = getDifferenceNBonus(loc, i, j);
                                if (k !== null) {
                                    inc.push(k);
                                }
                            }
                        } else {
                            k = getDifferenceNBonus(loc, i, 1);
                            if (k !== null) {
                                inc.push(k);
                            }
                        }
                        for (j = 0; j < inc.length; j++) {
                            tempPlanet.investments = deepCopy(loc.investments);
                            tempPlanet.investments[i][1] += inc[j];
                            calculate.calcState(tempPlanet);
                            tempUnlock = calculate.calcUnlockCost(loc, i, loc.investments[i][1], inc[j]);
                            tempUnlockTime = tempUnlock / loc.totalMoneyPerSecond;
                            tempPercentageIncrease = (tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond) * 100 / loc.totalMoneyPerSecond;
                            if ((loc.filterTime === null || loc.filterTime > tempUnlockTime) && (scope.filterTime.percentage === null || scope.filterTime.percentage < tempPercentageIncrease)) {
                                upgradeScore = calculate.calcUpgradeScore(tempPlanet, loc, tempUnlockTime);
                                if (upgradeScore > max) {
                                    max = upgradeScore;
                                    maxObj = ['level', i, tempPlanet.investments[i][1]];
                                }
                                loc.recTable.push([['level', i], tempPlanet.investments[i][1], upgradeScore, tempUnlock, tempUnlockTime, tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond, tempPercentageIncrease]);
                            }
                        }
                    }
                    j = -1;
                    for (i = 0; i < 22; i++) {
                        tempPlanet.investments = deepCopy(loc.investments);
                        tempPlanet.angelEffectiveness = loc.angelEffectiveness;
                        tempPlanet.cashUpgrades = deepCopy(loc.cashUpgrades);
                        j = getNextCashIndex(loc, j);
                        if (j !== null) {
                            tempPlanet.cashUpgrades[j][tempPlanet.cashUpgrades[j].length - 1] = true;
                            calculate.calcState(tempPlanet);
                            tempUnlockTime = loc.cashUpgrades[j][0] / loc.totalMoneyPerSecond;
                            tempPercentageIncrease = (tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond) * 100 / loc.totalMoneyPerSecond;
                            if ((loc.filterTime === null || loc.filterTime > tempUnlockTime) && (scope.filterTime.percentage === null || scope.filterTime.percentage < tempPercentageIncrease)) {
                                upgradeScore = calculate.calcUpgradeScore(tempPlanet, loc, tempUnlockTime);
                                if (upgradeScore > max) {
                                    max = upgradeScore;
                                    maxObj = ['upgrade', j];
                                }
                                loc.recTable.push([['cash', j], null, upgradeScore, loc.cashUpgrades[j][0], tempUnlockTime, tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond, tempPercentageIncrease]);
                            }
                        } else {
                            break;
                        }
                    }
                    tempUnlock = 0;
                    tempPlanet.investments = deepCopy(loc.investments);
                    tempPlanet.cashUpgrades = deepCopy(loc.cashUpgrades);
                    for (i = 1; i < loc.investments.length; i++) {
                        if (loc.investments[i][1] < highestSharedLevel) {
                            highestSharedLevel = loc.investments[i][1];
                        }
                    }
                    for (i = 0; i < loc.unlocks[loc.investments.length].length; i++) {
                        if (loc.unlocks[loc.investments.length][i][0] > highestSharedLevel) {
                            highestSharedLevel = loc.unlocks[loc.investments.length][i][0];
                            break;
                        }
                    }
                    for (i = 0; i < tempPlanet.investments.length; i++) {
                        if (tempPlanet.investments[i][1] < highestSharedLevel) {
                            tempUnlock += calculate.calcUnlockCost(loc, i, tempPlanet.investments[i][1], highestSharedLevel - tempPlanet.investments[i][1]);
                            tempPlanet.investments[i][1] = highestSharedLevel;
                        }
                    }
                    calculate.calcState(tempPlanet);
                    tempUnlockTime = tempUnlock / loc.totalMoneyPerSecond;
                    tempPercentageIncrease = (tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond) * 100 / loc.totalMoneyPerSecond;
                    if ((loc.filterTime === null || loc.filterTime > tempUnlockTime) && (scope.filterTime.percentage === null || scope.filterTime.percentage < tempPercentageIncrease)) {
                        upgradeScore = calculate.calcUpgradeScore(tempPlanet, loc, tempUnlockTime);
                        if (upgradeScore > max) {
                            max = upgradeScore;
                            maxObj = ['all', highestSharedLevel];
                        }
                        loc.recTable.push(['all', highestSharedLevel, upgradeScore, tempUnlock, tempUnlock / loc.totalMoneyPerSecond, tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond, tempPercentageIncrease]);
                    }
                    loc.rec = maxObj;
                    scope.reverse = true;
                    scope.sortIndex = 2;
                    loc.recTable = $filter('orderBy')(loc.recTable, indexOrder, scope.reverse);
                    updateRecString(loc);
                };
                
                function formatState(loc) {
                    var string = '"' + loc.name + '": {\r\n  "levels": {\r\n',
                    i = 0, j = 0, first = true;
                    for (; i < loc.investments.length; i++) {
                        if (i !== 0) {
                        string += ',\r\n';
                        }
                        string += '    "' + loc.investments[i][0] + '": ' + loc.investments[i][1];
                    }
                    string += '\r\n  },\r\n  "numAngels": ' + loc.numAngels + ',\r\n  "upgradeIndexUpTo": ';
                    for (i = 0; i < loc.cashUpgrades.length; i++) {
                        if (loc.cashUpgrades[i][loc.cashUpgrades[i].length - 1] === false) {
                        break;
                        }
                    }
                    string += i + ',\r\n  "upgradeIndexBonus": [';
                    for (; i < loc.cashUpgrades.length; i++) {
                        if (loc.cashUpgrades[i][loc.cashUpgrades[i].length - 1] === true) {
                        if (first !== true) {
                            string += ',\r\n'
                        } else {
                            string += '\r\n';
                            first = false;
                        }
                        string += '    ' + i;
                        }
                    }
                    string += '\r\n  ],\r\n  "angelUpgradeIndexUpTo": ';
                    for (i = 0; i < loc.angelUpgrades.length; i++) {
                        if (loc.angelUpgrades[i][loc.angelUpgrades[i].length - 1] === false) {
                        break;
                        }
                    }
                    first = true;
                    string += i + ',\r\n  "angelUpgradeIndexBonus": [';
                    for (; i < loc.angelUpgrades.length; i++) {
                        if (loc.angelUpgrades[i][loc.angelUpgrades[i].length - 1] === true) {
                        if (first !== true) {
                            string += ',\r\n'
                        } else {
                            string += '\r\n';
                            first = false;
                        }
                        string += '    ' + i;
                        }
                    }
                    first = true;
                    string += '\r\n  ],\r\n  "managersBought": [';
                    for (i = 0; i < loc.managerUpgrades.length; i++) {
                        for (j = 0; j < loc.managerUpgrades[i].length; j++) {
                        if (loc.managerUpgrades[i][j][1] === true) {
                            if (first !== true) {
                            string += ',\r\n'
                            } else {
                            string += '\r\n';
                            first = false;
                            }
                            string += '    ' + ((i * 2) + j);
                        }
                        }
                    }
                    string += '\r\n  ], \r\n  "noSingles": ' + loc.noSingles + ',\r\n  "noTens": ' + loc.noTens;
                    string += ',\r\n  "triples": ' + loc.triples + ',\r\n  "flux": ' + loc.flux + ',\r\n  "bonusAngelEffectiveness": ' + loc.bonusAngelEffectiveness + ',\r\n  "bonusMultiplier": ' + loc.bonusMultiplier + ',\r\n  "megaTicket": [';
                    first = true;
                    for (i = 0; i < loc.investments.length; i++) {
                        if (loc.investments[i][2] === true) {
                        if (first !== true) {
                            string += ',\r\n'
                        } else {
                            string += '\r\n';
                            first = false;
                        }
                        string += '    ' + i;
                        }
                    }
                    string += '\r\n  ]\r\n}';
                    return string;
                };
                
                scope.updateFilterTime = function(loc) {
                    if (scope.filterTime.days === null && scope.filterTime.hours === null && scope.filterTime.minutes === null) {
                        loc.filterTime = null;
                    } else {
                        loc.filterTime = (scope.filterTime.days !== null ? scope.filterTime.days * 86400 : 0) + (scope.filterTime.hours !== null ? scope.filterTime.hours * 3600 : 0) + (scope.filterTime.minutes !== null ? scope.filterTime.minutes * 60 : 0)
                        if (loc.filterTime === 0) {
                            loc.filterTime = null;
                        }
                    }
                };
                
                scope.isWorld = function(world) {
                    return scope.planet == world;
                };

                scope.clickSort = function(loc, index) {
                    if (index === scope.sortIndex) {
                        scope.reverse = !scope.reverse;
                    } else {
                        scope.sortIndex = index;
                        if (index === 2 || index >= 5) {
                            scope.reverse = true;
                        } else {
                            scope.reverse = false;
                        }
                    }
                    loc.recTable = $filter('orderBy')(loc.recTable, indexOrder, scope.reverse);
                };

            }
        };
    }]);           