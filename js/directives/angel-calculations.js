    angular.module('adventureApp').directive('angelCalculations', ['calculate', function (calculate) {             
        return {
           restrict: 'E',
           scope: {
               angelCosts: '=',
               customAngelMul: '=',
               illionsArray: '=',
               ref: '='
           },
           template: `
           <!--<p>{{customAngelMul}}</p>
           <input type="number" data-ng-model="customAngelMul" step="0.1" style="">-->
All of values in the tables will include sacrificed angels in calculating the number required to increase by x%. The only exception is Doubled w/o Sacrificed which should match your in game numbers exactly and does not include sacrificed angels.
<br><br>
<input type="number" class="form-control" min="0" data-ng-model="ref.viewLifetimeEarnings" data-ng-blur="updateEarnings()" step="0.001" required> <input type="text" class="form-control illions" data-ng-model="ref.angelIllions" uib-typeahead="ill for ill in illionsArray | filter:$viewValue | limitTo:8" placeholder="*illions" data-ng-blur="updateEarnings()"> Lifetime Earnings
<br>
<input type="number" class="form-control" min="0" data-ng-model="ref.viewSacAngels" data-ng-blur="updateSacrificedAngels()" step="0.001" required> <input type="text" class="form-control illions" data-ng-model="ref.sacIllions" uib-typeahead="ill for ill in illionsArray | filter:$viewValue | limitTo:8" placeholder="*illions" data-ng-blur="updateSacrificedAngels()"> # Angels Sacrificed
<br>
<button type="button" class="btn btn-primary space_top" data-ng-click="calcAngelInvestors(ref)">Calculate Angels</button>
<table class="table table-striped table-hover table-bordered space_top">
    <thead>
    <tr>
        <th></th>
        <th>Number of Angels</th>
        <th>Lifetime Cost</th>
        <th>Lifetime Difference</th>
        <th>Difference Time Cost</th>
    </tr>
    </thead>
    <tbody>
    <tr data-ng-repeat="aUC in angelCosts track by $index">
        <td data-ng-if="!$last">{{aUC[0]}}</td>
        <td data-ng-if="$last"><input type="number" class="form-control" min="0" data-ng-model="ref.customAngelMul" step="0.1"> x</td>
        <td>{{aUC[1] | num:raw}} AI</td>
        <td>\${{aUC[2] | num:raw}}</td>
        <td>\${{aUC[3] | num:raw}}</td>
        <td>{{aUC[4] | time:raw}}</td>
    </tr>
    </tbody>
</table>`,        
        link: function(scope) {
            function calcAngelCost(numAngels, mul) {
                return (1e+15 * Math.pow(numAngels / mul, 2));
            };
            
            function updateIllionize(varName, viewName, illionsName) {
                if (scope.ref[illionsName] === '') {
                    scope.ref[varName] = scope.ref[viewName];
                } else {
                    scope.ref[illionsName] = scope.ref[illionsName].trim();
                    scope.ref[illionsName] = scope.ref[illionsName].charAt(0).toUpperCase() + scope.ref[illionsName].slice(1).toLowerCase();
                    var index = scope.illionsArray.indexOf(' ' + scope.ref[illionsName]);
                    if (index !== -1) {
                        scope.ref[varName] = scope.ref[viewName] * Math.pow(10, 6 + (index * 3));
                    }
                }
            };
            
            scope.calcAngelInvestors = function(loc) {
                loc.angelCosts = [];
                var earnedNumAngels = loc.numAngels + loc.sacAngels;
                var loopVals = [['10%', 1.1], ['50%', 1.5], ['Doubled w/o Sacrificed', 2], ['Doubled', 2], ['5x', 5], ['10x', 10], ['Custom Multiplier', loc.customAngelMul || 0]];
                for (var val in loopVals) {
                    loc.angelCosts[val] = []
                    loc.angelCosts[val][0] = loopVals[val][0];
                    if (loopVals[val][1] !== 0) {
                        if (val !== '2') {
                        loc.angelCosts[val][1] = loopVals[val][1] * earnedNumAngels;
                        } else {
                        loc.angelCosts[val][1] = (loopVals[val][1] * loc.numAngels) + loc.sacAngels;
                        }
                        loc.angelCosts[val][2] = calcAngelCost(loc.angelCosts[val][1], loc.angelScale);
                        loc.angelCosts[val][3] = Math.max(loc.angelCosts[val][2] - loc.lifetimeEarnings, 0);
                        loc.angelCosts[val][4] = loc.angelCosts[val][3] / loc.totalMoneyPerSecond;
                    }
                }
            };
            
            scope.updateEarnings = function() {
                updateIllionize('lifetimeEarnings', 'viewLifetimeEarnings', 'angelIllions');
            };
            
            scope.updateSacrificedAngels = function() {
                updateIllionize('sacAngels', 'viewSacAngels', 'sacIllions');
            };
            
            scope.calcAngelInvestors = function(loc) {
                calculate.calcAngelInvestors(loc);    
            };
        }
        }
    }]);