// angular.module('adventureApp').directive('parentComponent', function() {
//   function ParentComponentController(scope) {
//     // initialize scope
//   }

//   ParentComponentController.prototype.doSomething = function() {
//     // ironically does nothing
//   }

//   return {
//     restrict: 'E',
//     controller: ['$scope', ParentComponentController],
//     scope: {}
//   };
// });

    angular.module('adventureApp').directive('planet', function (calculate) {                               
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
        
        function PlanetController(scope) {
            this.ref = scope.ref;
            scope.selectedAllMegaTickets = function(loc, index) {
                var i = 0;
                for (i = 0; i < loc.investments.length; i++) {
                    loc.investments[i][2] = $scope.selectAll[0];
                }
            }
        }
        
        PlanetController.prototype.selectedAllMegaTickets = function(index) {
            var i = 0;
            for (i = 0; i < ref.investments.length; i++) {
                ref.investments[i][2] = $scope.selectAll[0];
            }
        }
        
        PlanetController.prototype.updateAngels = function() {
            updateIllionize('numAngels', 'viewNumAngels', 'illions');
        }
             
        return {
           restrict: 'E',
           controller: ['$scope', PlanetController],
           scope: {
                ref: '=',
                raw: '=',
                filterTime: '=',
                illionsArray: '=',
           },
           template: `
      <div data-ng-show="!isCompare()">
        <div>
          <input type="number" class="form-control" min="0" data-ng-model="ref.viewNumAngels" data-ng-blur="updateAngels()" step="0.001" required> <input type="text" class="form-control illions" data-ng-model="ref.illions" uib-typeahead="ill for ill in illionsArray | filter:$viewValue | limitTo:8" placeholder="*illions" data-ng-blur="updateAngels()"> # Angels
          <label><input type="checkbox" class="form-control" data-ng-model="raw"> Raw Values</label>
          <button type="button" class="btn btn-primary" data-ng-click="resetPlanet(ref)">Reset Planet</button>
          <button type="button" class="btn btn-primary" data-ng-click="fullyResetPlanet(ref)">Hard Reset Planet</button>
        </div>

        <investment-table investments="ref.investments" has-mega-tickets="ref.hasMegaTickets" all-mega-tickets-selected="ref.selectAll[0]"></investment-table>      
        
        <div>
          <uib-accordion close-others="false">
            <uib-accordion-group is-open="accOpen[0]">
              <uib-accordion-heading>
                Cost of Upgrades<span class="pull-right fa" ng-class="{'fa-chevron-down': accOpen[0], 'fa-chevron-right': !accOpen[0]}"></span>
              </uib-accordion-heading>
              <upgrade-costs investments="ref.investments" costs="ref.upgradeCosts"></upgrade-costs>
            </uib-accordion-group>
            <uib-accordion-group is-open="accOpen[1]">
              <uib-accordion-heading>
                Cash Upgrades<span class="pull-right fa" ng-class="{'fa-chevron-down': accOpen[1], 'fa-chevron-right': !accOpen[1]}"></span>
              </uib-accordion-heading>
              <cash-upgrades cash-upgrades="ref.cashUpgrades" fill-before="fillBefore" clear-after="clearAfter" ref="ref"></cash-upgrades>              
            </uib-accordion-group>
            <uib-accordion-group is-open="accOpen[2]">
              <uib-accordion-heading>
                Angel Upgrades<i data-ng-show="ref.angelExclamation" class="fa fa-plus"></i><span class="pull-right fa" ng-class="{'fa-chevron-down': accOpen[2], 'fa-chevron-right': !accOpen[2]}"></span>
              </uib-accordion-heading>
              <angel-upgrades angel-upgrades="ref.angelUpgrades" fill-before="fillBefore" clear-after="clearAfter" ref="ref"></angel-upgrades>              
            </uib-accordion-group>
            <uib-accordion-group is-open="accOpen[3]">
              <uib-accordion-heading>
                Managers<span class="pull-right fa" ng-class="{'fa-chevron-down': accOpen[3], 'fa-chevron-right': !accOpen[3]}"></span>
              </uib-accordion-heading>
              <manager-upgrades investments="ref.investments" planet="planet" manager-upgrades="ref.managerUpgrades"></manager-upgrades>              
            </uib-accordion-group>
            <uib-accordion-group is-open="accOpen[4]">
              <uib-accordion-heading>
                Gold Upgrades<span class="pull-right fa" ng-class="{'fa-chevron-down': accOpen[4], 'fa-chevron-right': !accOpen[4]}"></span>
              </uib-accordion-heading>
              <gold-upgrades triples="ref.triples" flux="ref.flux"></gold-upgrades>              
            </uib-accordion-group>
            <uib-accordion-group is-open="accOpen[5]">
              <uib-accordion-heading>
                Other Bonuses<span class="pull-right fa" ng-class="{'fa-chevron-down': accOpen[5], 'fa-chevron-right': !accOpen[5]}"></span>
              </uib-accordion-heading>
              <other-bonuses bonus-angel-effectiveness="ref.bonusAngelEffectiveness" bonus-multiplier="ref.bonusMultiplier" angel-effectiveness="angelEffectiveness"></other-bonuses>
            </uib-accordion-group>
          </uib-accordion>
        </div>
        <h2>Total $ / second : {{ref.totalMoneyPerSecond | number}} ({{ref.totalMoneyPerSecond | num}})</h2>
        <h2>Total $ / minute : {{ref.totalMoneyPerSecond * 60 | number}} ({{ref.totalMoneyPerSecond * 60 | num}})</h2>
        <h2>Total $ / hour : {{ref.totalMoneyPerSecond * 3600 | number}} ({{ref.totalMoneyPerSecond * 3600 | num}})</h2>
        <uib-accordion>
          <uib-accordion-group is-open="accOpen2[0]">
            <uib-accordion-heading>
              Angel Calculations<span class="pull-right fa" ng-class="{'fa-chevron-down': accOpen2[0], 'fa-chevron-right': !accOpen2[0]}"></span>
            </uib-accordion-heading>
            <angel-calculations ref="ref" angel-costs="ref.angelCosts" illions-array="illionsArray" custom-angel-mul="ref.customAngelMul"></angel-calculations>
          </uib-accordion-group>
          <uib-accordion-group is-open="accOpen2[1]">
            <uib-accordion-heading>
              Filter recommendations<span class="pull-right fa" ng-class="{'fa-chevron-down': accOpen2[1], 'fa-chevron-right': !accOpen2[1]}"></span>
            </uib-accordion-heading>                       
            <filter-recommendations ref="ref" filter-time="filterTime"></filter-recommedations>
          </uib-accordion-group>
        </uib-accordion>
        <calculations ref="ref" raw="raw" rec-table="recTable" recommendation="ref.recommendation" filter-time="filterTime" planet="planet"></calculations>        
        <h3>* Upgrade Score is calculated by minimizing time to buy any pair of upgrades.  If your goal is to buy two upgrades, then the upgrade with a higher score should be bought first.</h3>
      </div>
      <hr>
      <h4 class="pull-right">Found an error? Want to request a feature? You can do so on <a href="https://www.reddit.com/r/AdventureCapitalist/comments/3ik18l/another_calculator/">Reddit</a> or <a href="https://github.com/Slimmmo/Slimmmo.github.io">Github</a>.</h4>
               
        //    `,
        //     link: function(scope) {
        //         function updateIllionize(varName, viewName, illionsName) {
        //             if (scope.ref[illionsName] === '') {
        //                 scope.ref[varName] = scope.ref[viewName];
        //             } else {
        //                 scope.ref[illionsName] = scope.ref[illionsName].trim();
        //                 scope.ref[illionsName] = scope.ref[illionsName].charAt(0).toUpperCase() + scope.ref[illionsName].slice(1).toLowerCase();
        //                 var index = scope.illionsArray.indexOf(' ' + scope.ref[illionsName]);
        //                 if (index !== -1) {
        //                     scope.ref[varName] = scope.ref[viewName] * Math.pow(10, 6 + (index * 3));
        //                 }
        //             }
        //         };
                
        //         // scope.updateAngels = function() {
        //         //     updateIllionize('numAngels', 'viewNumAngels', 'illions');
        //         // };
        //     }
        };
    });