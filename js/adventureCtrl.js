angular.module('adventureApp').controller('adventureController', ['$document', '$filter', '$scope', 'constants', 'calculate', 'earthConstants', 'moonConstants', 'marsConstants', 'rainConstants', 'fileService', function($document, $filter, $scope, constants, calculate, earthConstants, moonConstants, marsConstants, rainConstants, fileService) {
  $scope.accOpen = [false, false, false, false, false, false];
  $scope.accOpen2 = [false, false];
  $scope.rain = {};
  $scope.clearAfter = [false, false];
  $scope.compare = false;
  $scope.earth = {};
  $scope.fillBefore = [false, false];
  $scope.filterTime = {'days': null, 'hours': null, 'minutes': null, 'percentage': null};
  $scope.illionsArray = constants.illionsArr.slice(1);
  $scope.mars = {};
  $scope.moon = {};
  $scope.planet = 'rain';
  $scope.raw = false;
  $scope.ref = $scope.rain;
  $scope.reverse = true;
  $scope.selectAll = [false, false, false, false];
  $scope.showUpdate = false;
  $scope.sortIndex = 2;
  var planets = ['earth', 'moon', 'mars', 'rain'];

  angular.element(document).ready(function() {
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function(e) {
      var file = fileInput.files[0],
      reader = new FileReader();
      reader.onload = function(e) {
        loadExportedJson(e.target.result);
      }
      reader.readAsText(file);
    });
    var saved = localStorage.getItem('planets');
    if (saved) {
      loadExportedJson(saved);
    }
  });

  function loadExportedJson(str) {
    var i = 0, j = 0, k = 0,
    obj = JSON.parse(str);
    for (k in planets) {
      if (obj.hasOwnProperty(planets[k])) {
        $scope.fullyResetPlanet($scope[planets[k]]);
        for (i in obj[planets[k]].levels) {
          if (obj[planets[k]].levels.hasOwnProperty(i)) {
            for (j = 0; j < $scope[planets[k]].investments.length; j++) {
              if ($scope[planets[k]].investments[j][0] === i) {
                $scope[planets[k]].investments[j][1] = obj[planets[k]].levels[i];
                break;
              }
            }
          }
        }
        $scope[planets[k]].numAngels = obj[planets[k]].numAngels;
        $scope[planets[k]].viewNumAngels = $scope[planets[k]].numAngels;
        for (i = 0; i < obj[planets[k]].upgradeIndexUpTo; i++) {
          $scope[planets[k]].cashUpgrades[i][$scope[planets[k]].cashUpgrades[i].length - 1] = true;
        }
        for (i = 0; i < obj[planets[k]].angelUpgradeIndexUpTo; i++) {
          $scope[planets[k]].angelUpgrades[i][$scope[planets[k]].angelUpgrades[i].length - 1] = true;
        }
        for (i = 0; i < obj[planets[k]].upgradeIndexBonus.length; i++) {
          $scope[planets[k]].cashUpgrades[obj[planets[k]].upgradeIndexBonus[i]][$scope[planets[k]].cashUpgrades[obj[planets[k]].upgradeIndexBonus[i]].length - 1] = true;
        }
        for (i = 0; i < obj[planets[k]].angelUpgradeIndexBonus.length; i++) {
          $scope[planets[k]].angelUpgrades[obj[planets[k]].angelUpgradeIndexBonus[i]][$scope[planets[k]].angelUpgrades[obj[planets[k]].angelUpgradeIndexBonus[i]].length - 1] = true;
        }
        for (i = 0; i < obj[planets[k]].managersBought.length; i++) {
          $scope[planets[k]].managerUpgrades[Math.floor(obj[planets[k]].managersBought[i] / 2)][obj[planets[k]].managersBought[i] % 2][1] = true;
        }
        $scope[planets[k]].noSingles = obj[planets[k]].noSingles || false;
        $scope[planets[k]].noTens = obj[planets[k]].noTens || false;
        if ('suit' in obj[planets[k]]) {
          $scope[planets[k]].suits[obj[planets[k].suit]][0] = true;
        }
        $scope[planets[k]].triples = obj[planets[k]].triples;
        $scope[planets[k]].flux = obj[planets[k]].flux;
        $scope[planets[k]].bonusAngelEffectiveness = obj[planets[k]].bonusAngelEffectiveness;
        $scope[planets[k]].bonusMultiplier = obj[planets[k]].bonusMultiplier;
        if (angular.isDefined(obj[planets[k]].megaTicket)) {
          for (i = 0; i < obj[planets[k]].megaTicket.length; i++) {
            $scope[planets[k]].investments[obj[planets[k]].megaTicket[i]][2] = true;
          }
        }
      }
      $scope.calc($scope[planets[k]]);
    }
    $scope.$digest();
  }

  $scope.calc = function(loc) {
    calculate.calcState(loc);
    calculate.calcAngels(loc);
    calcRecommendations(loc);
    localStorage.setItem('planets', getJsonForExport());
  };

  function calcAngelCost(numAngels, mul) {
    return (1e+15 * Math.pow(numAngels / mul, 2));
  };

  $scope.calcAngelInvestors = function(loc) {
      calculate.calcAngelInvestors(loc);    
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
    $scope.updateFilterTime(loc);
    for (; i < loc.investments.length; i++) {
      while (inc.length > 3 - (loc.noSingles ? 1 : 0) - (loc.noTens ? 1 : 0)) {
        inc.pop();
      }
      if (i === 1 && $scope.isWorld('earth')) {
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
        if ((loc.filterTime === null || loc.filterTime > tempUnlockTime) && ($scope.filterTime.percentage === null || $scope.filterTime.percentage < tempPercentageIncrease)) {
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
        if ((loc.filterTime === null || loc.filterTime > tempUnlockTime) && ($scope.filterTime.percentage === null || $scope.filterTime.percentage < tempPercentageIncrease)) {
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
    if ((loc.filterTime === null || loc.filterTime > tempUnlockTime) && ($scope.filterTime.percentage === null || $scope.filterTime.percentage < tempPercentageIncrease)) {
      upgradeScore = calculate.calcUpgradeScore(tempPlanet, loc, tempUnlockTime);
      if (upgradeScore > max) {
        max = upgradeScore;
        maxObj = ['all', highestSharedLevel];
      }
      loc.recTable.push(['all', highestSharedLevel, upgradeScore, tempUnlock, tempUnlock / loc.totalMoneyPerSecond, tempPlanet.totalMoneyPerSecond - loc.totalMoneyPerSecond, tempPercentageIncrease]);
    }
    loc.rec = maxObj;
    $scope.reverse = true;
    $scope.sortIndex = 2;
    loc.recTable = $filter('orderBy')(loc.recTable, indexOrder, $scope.reverse);
    updateRecString(loc);
  };

//   $scope.clickSort = function(loc, index) {
//     if (index === $scope.sortIndex) {
//       $scope.reverse = !$scope.reverse;
//     } else {
//       $scope.sortIndex = index;
//       if (index === 2 || index >= 5) {
//         $scope.reverse = true;
//       } else {
//         $scope.reverse = false;
//       }
//     }
//     loc.recTable = $filter('orderBy')(loc.recTable, indexOrder, $scope.reverse);
//   };

  function deepCopy(input) {
    var temp = [];
    for (var i = 0; i < input.length; i++) {
      temp.push(input[i].slice());
    }
    return temp;
  }

  $scope.export = function() {
      fileService.export(getJsonForExport());
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

  $scope.fullyResetPlanet = function(loc) {
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
    loc.flux = 0;
    loc.illions = '';
    for (i = 0; i < loc.investments.length; i++) {
      if (i === 0) {
        loc.investments[i][1] = 1;
      } else {
        loc.investments[i][1] = 0;
      }
      loc.investments[i][2] = false;
    }
    loc.numAngels = 0;
    loc.rec = null;
    loc.recTable = [];
    loc.recommendation = '';
    loc.totalMoneyPerSecond = 0;
    loc.triples = 0;
    loc.upgradeCosts = [];
    for (var i = 0; i <= loc.investments.length; i++) {
      loc.upgradeCosts.push([0, 0, 0, 0, 0, 0, 0, 0]);
    }
    loc.viewNumAngels = 0;
    $scope.calc(loc);
  };

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

  function getJsonForExport() {
    var retString = '{';
    for (var p in planets) {
      if (p !== '0') {
        retString += ',\r\n';
      }
      retString += formatState($scope[planets[p]]);
    }
    return retString + '}';
  };

  $scope.getNamedType = function(loc, tuple) {
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

  $scope.hideUpdate = function() {
    $scope.showUpdate = false;
  };

  $scope.incrementDays = function(loc) {
    if ($scope.filterTime.days !== null) {
      $scope.filterTime.days++;
    } else {
      $scope.filterTime.days = 1;
    }
  };

  $scope.incrementHours = function(loc) {
    if ($scope.filterTime.hours !== null) {
      $scope.filterTime.hours++;
    } else {
      $scope.filterTime.hours = 1;
    }
  };

  $scope.incrementMinutes = function(loc) {
    if ($scope.filterTime.minutes !== null) {
      $scope.filterTime.minutes++;
    } else {
      $scope.filterTime.minutes = 1;
    }
  };

  $scope.incrementPercentage = function(loc) {
    if ($scope.filterTime.percentage !== null) {
      $scope.filterTime.percentage++;
    } else {
      $scope.filterTime.percentage = 1;
    }
  };

  function indexOrder(input) {
    return input[$scope.sortIndex];
  };

  $scope.isCompare = function() {
    return $scope.compare;
  };

  $scope.isWorld = function(world) {
    return $scope.ref === $scope[world];
  };
  
  function lzf_decode(str) {
    var iidx = 0, oidx = 0, oLen = str.length,
    temp = Array.apply(null, new Array(oLen)).map(Number.prototype.valueOf, 0);
    do {
      var ctrl = str.charCodeAt(iidx++);
      if (ctrl < (1 << 5)) {
      	ctrl++;
      	while (oidx + ctrl > oLen) {
      	  oLen++;
      	  temp.push(String.fromCharCode(0));
      	}
      	do {
      	  temp[oidx++] = str.charAt(iidx++);
      	} while ((--ctrl) != 0);
      } else {
      	var len = ctrl >> 5, reference = oidx - ((ctrl & 0x1f) << 8) - 1;
      	if (len == 7) {
      	  len += str.charCodeAt(iidx++);
      	}
      	reference -= str.charCodeAt(iidx++);
      	while (oidx + len + 2 > oLen) {
      	  oLen++;
      	  temp.push(String.fromCharCode(0));
      	}
      	if (reference < 0) {
      	  console.log('error');
      	  return 0;
      	}
      	temp[oidx++] = temp[reference++];
      	do {
      	  temp[oidx++] = temp[reference++];
      	} while ((--len) >= 0);
      }
    } while (iidx < $scope.lzfData.length);
    return temp.join("");
  }
  
  $scope.loadGame = function(str) {
    var obj = JSON.parse(lzf_decode(atob(str))), i, id = 0;
    for (i in obj.ventures) {
      id = 0; // find the correct id from short somehow
      loc.investments[i][1] = i.numOwned;
      loc.investments[i][2] = i.isBoosted;
    }
    for (i in obj.upgrades) {
      if (i.id.indexOf("_angel_") != -1) {
        id = 0; // find the correct id from short somehow
        loc.angelUpgrades[i][3] = i.purchased;
      } else {
        id = 0; // find the correct id from short somehow
        loc.cashUpgrades[i][2] = i.purchased;
      }
    }
    for (i in obj.upgrades) {
      if (i.id.indexof("_accountant" != -1)) {
        id = 0; // find the correct id from short somehow
        loc.managerUpgrades[id][(i.id.charAt(i.id.length - 1) != '2') ? 0 : 1][1] = i.purchased;
      }
    }
    loc.lifetimeEarnings = obj.totalCash || obj.sessionCash + obj.totalPreviousCash;
    loc.numAngels = obj.angelInvestors;
    loc.sacAngels = obj.angelInvestorsSpent;
    // how to find gold multipliers, flux, bonus angel effectiveness (kong login etc), suits
  };

  $scope.resetPlanet = function(loc) {
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
    $scope.calc(loc);
  };

  $scope.selectedAll = function(loc, index) {
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
  };

  $scope.setWorld = function(planet) {
    $scope.clearAfter = [false, false];
    $scope.fillBefore = [false, false];
    $scope.compare = false;
    $scope.planet = planet;
    $scope.ref = $scope[planet];
  };

  $scope.toggleManagers = function(row, index) {
    if ($scope.isWorld('earth')) {
      if (row[index][1] === true) {
        row[(index + 1) % 2][1] = false;
      }
    }
  };

  function tupleIsActive(tuple) {
    return tuple[tuple.length - 1];
  };

//   $scope.updateAngels = function() {
//     updateIllionize('numAngels', 'viewNumAngels', 'illions');
//   };

//   $scope.updateEarnings = function() {
//     updateIllionize('lifetimeEarnings', 'viewLifetimeEarnings', 'angelIllions');
//   };

  $scope.updateFilterTime = function(loc) {
    if ($scope.filterTime.days === null && $scope.filterTime.hours === null && $scope.filterTime.minutes === null) {
      loc.filterTime = null;
    } else {
      loc.filterTime = ($scope.filterTime.days !== null ? $scope.filterTime.days * 86400 : 0) + ($scope.filterTime.hours !== null ? $scope.filterTime.hours * 3600 : 0) + ($scope.filterTime.minutes !== null ? $scope.filterTime.minutes * 60 : 0)
      if (loc.filterTime === 0) {
        loc.filterTime = null;
      }
    }
  };

  function updateIllionize(varName, viewName, illionsName) {
    if ($scope.ref[illionsName] === '') {
      $scope.ref[varName] = $scope.ref[viewName];
    } else {
      $scope.ref[illionsName] = $scope.ref[illionsName].trim();
      $scope.ref[illionsName] = $scope.ref[illionsName].charAt(0).toUpperCase() + $scope.ref[illionsName].slice(1).toLowerCase();
      var index = $scope.illionsArray.indexOf(' ' + $scope.ref[illionsName]);
      if (index !== -1) {
        $scope.ref[varName] = $scope.ref[viewName] * Math.pow(10, 6 + (index * 3));
      }
    }
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

//   $scope.updateSacrificedAngels = function() {
//     updateIllionize('sacAngels', 'viewSacAngels', 'sacIllions');
//   };

  function loadDefaults() {
    $scope.earth.angelScale = earthConstants.angelScale;
    $scope.earth.baseCost = earthConstants.baseCost;
    $scope.earth.basePower = earthConstants.basePower;
    $scope.earth.baseProfit = earthConstants.baseProfit;
    $scope.earth.baseSpeed = earthConstants.baseSpeed;
    $scope.earth.hasMegaTickets = earthConstants.hasMegaTickets;
    $scope.earth.investments = earthConstants.investments;

    $scope.moon.angelScale = moonConstants.angelScale;
    $scope.moon.baseCost = moonConstants.baseCost;
    $scope.moon.basePower = moonConstants.basePower;
    $scope.moon.baseProfit = moonConstants.baseProfit;
    $scope.moon.baseSpeed = moonConstants.baseSpeed;
    $scope.moon.hasMegaTickets = moonConstants.hasMegaTickets;
    $scope.moon.investments = moonConstants.investments;
    
    $scope.mars.angelScale = marsConstants.angelScale;
    $scope.mars.baseCost = marsConstants.baseCost;
    $scope.mars.basePower = marsConstants.basePower;
    $scope.mars.baseProfit = marsConstants.baseProfit;
    $scope.mars.baseSpeed = marsConstants.baseSpeed;
    $scope.mars.hasMegaTickets = marsConstants.hasMegaTickets;
    $scope.mars.investments = marsConstants.investments;
    
    $scope.rain.angelScale = rainConstants.angelScale;
    $scope.rain.baseCost = rainConstants.baseCost;
    $scope.rain.basePower = rainConstants.basePower;
    $scope.rain.baseProfit = rainConstants.baseProfit;
    $scope.rain.baseSpeed = rainConstants.baseSpeed;
    $scope.rain.hasMegaTickets = rainConstants.hasMegaTickets;
    $scope.rain.investments = rainConstants.investments;

    for (var p in planets) {
      $scope[planets[p]].angelEffectiveness = 0.02;
      $scope[planets[p]].angelExclamation = false;
      $scope[planets[p]].angelIllions = '';
      $scope[planets[p]].bonusAngelEffectiveness = 0;
      $scope[planets[p]].bonusMultiplier = 0;
      $scope[planets[p]].filterTime = null;
      $scope[planets[p]].flux = 0;
      $scope[planets[p]].illions = '';
      $scope[planets[p]].lifetimeEarnings = 0;
      $scope[planets[p]].name = planets[p];
      $scope[planets[p]].noSingles = false;
      $scope[planets[p]].noTens = false;
      $scope[planets[p]].numAngels = 0;
      $scope[planets[p]].rec = null;
      $scope[planets[p]].recTable = [];
      $scope[planets[p]].recommendation = '';
      $scope[planets[p]].sacAngels = 0;
      $scope[planets[p]].sacIllions = '';
      $scope[planets[p]].totalMoneyPerSecond = 0;
      $scope[planets[p]].triples = 0;
      $scope[planets[p]].unlocks = [];
      $scope[planets[p]].viewLifetimeEarnings = 0;
      $scope[planets[p]].viewNumAngels = 0;
      $scope[planets[p]].viewSacAngels = 0;
      $scope[planets[p]].upgradeCosts = [];
      for (var i = 0; i <= $scope[planets[p]].investments.length; i++) {
        $scope[planets[p]].upgradeCosts.push([0, 0, 0, 0, 0, 0, 0, 0]);
        $scope[planets[p]].unlocks.push([]);
      }
    }
  };

  function loadUnlocks() {
    $scope.earth.unlocks = earthConstants.unlocks;
    $scope.earth.cashUpgrades = earthConstants.cashUpgrades;
    $scope.earth.angelUpgrades = earthConstants.angelUpgrades;
    $scope.earth.managerUpgrades = earthConstants.managerUpgrades;
    $scope.moon.unlocks = moonConstants.unlocks;
    $scope.moon.cashUpgrades = moonConstants.cashUpgrades;
    $scope.moon.angelUpgrades = moonConstants.angelUpgrades;
    $scope.moon.managerUpgrades = moonConstants.managerUpgrades;
    $scope.mars.unlocks = marsConstants.unlocks;
    $scope.mars.cashUpgrades = marsConstants.cashUpgrades;
    $scope.mars.angelUpgrades = marsConstants.angelUpgrades;
    $scope.mars.managerUpgrades = marsConstants.managerUpgrades;
    $scope.rain.unlocks = rainConstants.unlocks;
    $scope.rain.cashUpgrades = rainConstants.cashUpgrades;
    $scope.rain.angelUpgrades = rainConstants.angelUpgrades;
    $scope.rain.managerUpgrades = rainConstants.managerUpgrades;
  };
  loadDefaults();
  loadUnlocks();
}]);
