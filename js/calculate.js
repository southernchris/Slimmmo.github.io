angular.module('adventureApp')    
    .service('calculate', function() {

  function tupleIsActive(tuple) {
    return tuple[tuple.length - 1];
  };
  
  return {
      calcAngels: function (loc) {
          var self = this;
        var i = 0,
        tempPlanet = null;
        loc.angelExclamation = false;
        for (; i < loc.angelUpgrades.length; i++) {
        if (!tupleIsActive(loc.angelUpgrades[i]) && loc.angelUpgrades[i][0] < loc.numAngels) {
            tempPlanet = JSON.parse(JSON.stringify(loc));
            tempPlanet.numAngels -= loc.angelUpgrades[i][0];
            tempPlanet.angelUpgrades[i][tempPlanet.angelUpgrades[i].length - 1] = true;
           self.calcState(tempPlanet);
            var delta = tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond;
            var percent = delta / loc.totalMoneyPerSecond;
            if (delta > 0) {
            loc.angelUpgrades[i][loc.angelUpgrades[i].length - 2] = percent;
            loc.angelExclamation = true;
            } else {
            loc.angelUpgrades[i][loc.angelUpgrades[i].length - 2] = false;
            }
        }
        }
    }, 

    calcUnlockCost: function (loc, index, fromLevel, numLevels) {
        var retVal = 1,
        i = 1, j = 0,
        managerDiscount = 1;
        for (; i < numLevels; i++) {
        retVal += Math.pow(loc.basePower[index], i);
        };
        if (index === 0 && false) { // $scope.isWorld('earth')) {
        fromLevel -= 1;
        }
        for (i = 0; i < loc.angelUpgrades.length; i++) {
        if (tupleIsActive(loc.angelUpgrades[i])) {
            if (loc.angelUpgrades[i][1][0] === (30 + index)) {
            fromLevel -= loc.angelUpgrades[i][1][1];
            }
        }
        }
        if (loc.managerUpgrades.length !== 0) {
        for (i = 0; i < loc.managerUpgrades[index].length; i++) {
            if (tupleIsActive(loc.managerUpgrades[index][i])) {
            if (loc.name === 'earth') {
                if (i === 0) {
                managerDiscount = 0.9;
                } else {
                managerDiscount *= 0.00001;
                }
            } else {
                managerDiscount = 0.75;
            }
            }
        }
        }
        retVal *= loc.baseCost[index] * Math.pow(loc.basePower[index], fromLevel) * managerDiscount;
        return retVal;
    },

    calcUnlockCostAll: function(loc) {
        var self = this;
        var lowestLevel = loc.investments[0][1],
        i = 1, j = 0,
        retVal = 0;
        for (; i < loc.investments.length; i++) {
        if (loc.investments[i][1] < lowestLevel) {
            lowestLevel = loc.investments[i][1];
        }
        }
        i = 0;
        while (i < loc.unlocks[loc.investments.length].length && lowestLevel >= loc.unlocks[loc.investments.length][i][0]) {
        i++;
        }
        if (i !== loc.unlocks[loc.investments.length].length) {
        for (; j < loc.investments.length; j++) {
            if (loc.investments[j][1] < loc.unlocks[loc.investments.length][i][0]) {
            retVal += self.calcUnlockCost(loc, j, loc.investments[j][1], loc.unlocks[loc.investments.length][i][0] - loc.investments[j][1]);
            }
        }
        } else {
        retVal = null;
        }
        return retVal;
    },
  

  calcState: function (loc) {
      var self = this;
    var i = 0, j = 0,
    highestSharedLevel = loc.investments[0][1];
    loc.totalMoneyPerSecond = 0;
    loc.angelEffectiveness = 0.02;
    for (; i < loc.investments.length; i++) {
      if (loc.investments[i][1] < highestSharedLevel) {
        highestSharedLevel = loc.investments[i][1];
      }
      loc.investments[i][3] = loc.investments[i][1] * loc.baseProfit[i];
      if (loc.triples > 0 || loc.bonusMultiplier > 0) {
        loc.investments[i][3] *= (3 * loc.triples) + loc.bonusMultiplier;
      }
      if (loc.investments[i][2]) {
        loc.investments[i][3] *= 7.77;
      }
      loc.investments[i][4] = loc.baseSpeed[i];
      if (loc.flux > 0) {
        loc.investments[i][4] /= (1 + loc.flux * 1.21);
      }
      loc.upgradeCosts[i][0] = self.calcUnlockCost(loc, i, loc.investments[i][1], 1);
      loc.upgradeCosts[i][2] = self.calcUnlockCost(loc, i, loc.investments[i][1], 10);
      loc.upgradeCosts[i][4] = self.calcUnlockCost(loc, i, loc.investments[i][1], self.getDifferenceNBonus(loc, i, 1));
      loc.upgradeCosts[i][6] = self.calcUnlockCostAll(loc);
    }
    for (i = 0; i < loc.cashUpgrades.length; i++) {
      if (tupleIsActive(loc.cashUpgrades[i])) {
        self.applyTuple(loc, loc.cashUpgrades[i]);
      }
    }
    for (i = 0; i < loc.angelUpgrades.length; i++) {
      if (tupleIsActive(loc.angelUpgrades[i])) {
        self.applyTuple(loc, loc.angelUpgrades[i]);
      }
    }
    for (i = 0; i < loc.investments.length; i++) {
      j = 0;
      while (j < loc.unlocks[i].length && loc.investments[i][1] >= loc.unlocks[i][j][0]) {
        self.applyTuple(loc, loc.unlocks[i][j]);
        j++;
      }
    }
    j = 0;
    while (j < loc.unlocks[loc.investments.length].length && highestSharedLevel >= loc.unlocks[loc.investments.length][j][0]) {
      self.applyTuple(loc, loc.unlocks[loc.investments.length][j]);
      j++;
    }
    if (loc.bonusAngelEffectiveness > 0) {
      loc.angelEffectiveness += loc.bonusAngelEffectiveness / 100;
    }
    for (i = 0; i < loc.investments.length; i++) {
      loc.investments[i][3] *= (1 + (loc.angelEffectiveness * loc.numAngels));
      loc.investments[i][5] = loc.investments[i][3] / loc.investments[i][4]
      loc.totalMoneyPerSecond += loc.investments[i][5];
    }
    for (i = 0; i < loc.investments.length; i++) {
      loc.investments[i][6] = loc.investments[i][5] * 100 / loc.totalMoneyPerSecond;
    }
    for (i = 0; i < loc.upgradeCosts.length; i++) {
      loc.upgradeCosts[i][1] = loc.upgradeCosts[i][0] / loc.totalMoneyPerSecond;
      loc.upgradeCosts[i][3] = loc.upgradeCosts[i][2] / loc.totalMoneyPerSecond;
      loc.upgradeCosts[i][5] = loc.upgradeCosts[i][4] / loc.totalMoneyPerSecond;
      loc.upgradeCosts[i][7] = loc.upgradeCosts[i][6] / loc.totalMoneyPerSecond;
    }
  },

    calcUpgradeScore: function (planet, loc, unlockCost) {
        var overflowPotential = planet.totalMoneyPerSecond * unlockCost,
        divNum = 0,
        retVal = planet.totalMoneyPerSecond - loc.totalMoneyPerSecond;
        if (!isFinite(unlockCost)) {
        return 0;
        }
        while (!isFinite(overflowPotential)) {
        divNum += 100;
        overflowPotential = planet.totalMoneyPerSecond * (unlockCost / Number('1e+' + divNum));
        }
        retVal *= 1000000000000000000000 / overflowPotential;
        if (divNum !== 0) {
        retVal *= Number('1e+' + divNum);
        }
        return retVal;
    },
  
    applyTuple: function (loc, row) {
        var i = 0, j = 0,
        applyRow = -1,
        applyType = -1;
        for (; i < row.length; i++) {
        if (typeof row[i] === 'object') {
            applyRow = Math.floor(row[i][0] / 2);
            applyType = row[i][0] % 2;
            if (applyRow < loc.investments.length) {
            if (applyType === 0) {
                loc.investments[applyRow][3] *= row[i][1];
            } else {
                loc.investments[applyRow][4] /= row[i][1];
            }
            } else if (applyRow === loc.investments.length) {
            if (applyType === 0) {
                for (j = 0; j < loc.investments.length; j++) {
                loc.investments[j][3] *= row[i][1];
                }
            } else {
                for (j = 0; j < loc.investments.length; j++) {
                loc.investments[j][4] /= row[i][1];
                }
            }
            } else if (applyRow === loc.investments.length + 1) {
            loc.angelEffectiveness += row[i][1] / 100;
            } else if (row[i][0] < 30 || row[i][0] > 29 + loc.investments.length) {
            throw 'Tuple not dealt with: ' + row;
            }
        }
        }
    },

    getDifferenceNBonus: function (loc, index, n) {
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
    },
    
    calcAngelCost: function(numAngels, mul) {
        return (1e+15 * Math.pow(numAngels / mul, 2));
    },


    // calcAngelInvestors: function(loc) {
    //     loc.angelCosts = [];
    //     var earnedNumAngels = loc.numAngels + loc.sacAngels;
    //     var loopVals = [['10%', 1.1], ['50%', 1.5], ['Doubled w/o Sacrificed', 2], ['Doubled', 2], ['5x', 5], ['10x', 10], ['Custom Multiplier', loc.customAngelMul || 0]];
    //     for (var val in loopVals) {
    //     loc.angelCosts[val] = []
    //     loc.angelCosts[val][0] = loopVals[val][0];
    //     if (loopVals[val][1] !== 0) {
    //         if (val !== '2') {
    //         loc.angelCosts[val][1] = loopVals[val][1] * earnedNumAngels;
    //         } else {
    //         loc.angelCosts[val][1] = (loopVals[val][1] * loc.numAngels) + loc.sacAngels;
    //         }
    //         loc.angelCosts[val][2] = self.calcAngelCost(loc.angelCosts[val][1], loc.angelScale);
    //         loc.angelCosts[val][3] = Math.max(loc.angelCosts[val][2] - loc.lifetimeEarnings, 0);
    //         loc.angelCosts[val][4] = loc.angelCosts[val][3] / loc.totalMoneyPerSecond;
    //     }
    //     }
    //  },

     resetPlanet: function(loc) {
        var i = 0;
        for (; i < loc.cashUpgrades.length; i++) {
            loc.cashUpgrades[i][loc.cashUpgrades[i].length - 1] = false;
        }
        for (i = 0; i < loc.angelUpgrades.length; i++) {
            loc.angelUpgrades[i][loc.angelUpgrades[i].length - 1] = false;
        }
        for (i = 0; i < loc.managerUpgrades.length; i++) {
            loc.managerUpgrades[i][0][loc.managerUpgrades[i][0].length - 1] = false;
            if (angular.isDefined(loc.managerUpgrades[i][1])) {
                loc.managerUpgrades[i][1][loc.managerUpgrades[i][1].length - 1] = false;
            }
        }
        loc.angelEffectiveness = 0.02;
        loc.angelExclamation = false;
        loc.bonusAngelEffectiveness = 0;
        loc.bonusMultiplier = 0;
        for (i = 0; i < loc.investments.length; i++) {
            if (i === 0) {
                loc.investments[i][1] = 1;
            } else {
                loc.investments[i][1] = 0;
            }
        }
        loc.rec = null;
        loc.recTable = [];
        loc.recommendation = '';
        loc.totalMoneyPerSecond = 0;
        loc.upgradeCosts = [];
        for (var i = 0; i <= loc.investments.length; i++) {
            loc.upgradeCosts.push([0, 0, 0, 0, 0, 0, 0, 0]);
        }
     },
     
     selectedAll: function(loc, index) {
        var i = 0;
        if (index === 0) {
            for (i = 0; i < loc.investments.length; i++) {
                loc.investments[i][2] = $scope.selectAll[0];
            }
        } else if (index === 1) {
            for (i = 0; i < loc.managerUpgrades.length; i++) {
                loc.managerUpgrades[i][0][1] = $scope.selectAll[1];
        /*        if ($scope.selectAll[2]) {
                $scope.selectAll[2] = false;
                }
                loc.managerUpgrades[i][1][1] = $scope.selectAll[2];*/
            }
        } else if (index === 2) {
            for (i = 0; i < loc.managerUpgrades.length; i++) {
                loc.managerUpgrades[i][1][1] = $scope.selectAll[2];
        /*        if ($scope.selectAll[1]) {
                $scope.selectAll[1] = false;
                }
                loc.managerUpgrades[i][0][1] = $scope.selectAll[1];*/
            }
        } else if (index === 3) {
            for (i = 0; i < loc.managerUpgrades.length; i++) {
                loc.managerUpgrades[i][0][1] = $scope.selectAll[3];
            }
        }
    }
  };
 });