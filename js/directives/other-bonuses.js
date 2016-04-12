    angular.module('adventureApp').directive('otherBonuses', function () {       
        return {
            restrict: 'E',
            scope: {
                bonusAngelEffectiveness: '=',
                bonusMultiplier: '=',
                angelEffectiveness: '='
            },
            template: `
              <p>Please only input the bonus you have.<br>
              For example, if you have a 30% Angel Investor increase from a Christmas event, so now your base Angel Investor bonus is 32%, but with upgrades it could easily be above 40%, please only input 30 or the calculations will be off.
              </p>
              <label class="col-xs-6"><input type="number" class="form-control" min="0" data-ng-model="bonusAngelEffectiveness">% Angel Investor bonus</label>
              <label class="col-xs-6"><input type="number" class="form-control" min="0" data-ng-model="bonusMultiplier">x multiplier</label>
              <label class="col-xs-6">Total Angel Investor % = {{angelEffectiveness | number:0}}%</label>            
            `
        };
    });