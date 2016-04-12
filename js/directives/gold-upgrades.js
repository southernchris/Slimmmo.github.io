    angular.module('adventureApp').directive('goldUpgrades', function () {             
        return {
           restrict: 'E',
           scope: {
               triples: '=',
               flux: '='
           },
           template: `
<label class="col-xs-6"><input type="number" class="form-control" min="0" data-ng-model="triples"> # 3x Multipliers</label>
<label class="col-xs-6"><input type="number" class="form-control" min="0" data-ng-model="flux"> # Flux Capitalors</label>
           `
        };
    });