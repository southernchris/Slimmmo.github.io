    angular.module('adventureApp').directive('managerUpgrades', function () {       
        return {
            restrict: 'E',
            scope: {
                investments: '=investments',
                managerUpgrades: '=managerUpgrades',
                planet: '='
            },
            link : function ($scope) {
                $scope.isWorld = function (world)
                {
                    return $scope.planet == world;
                },
                $scope.setPlanet = function(p)
                {
                    $scope.planet = p;
                }                
            },                   
            template: `
<table class="table table-striped table-hover table-bordered">
<thead>
    <tr>
    <th>Business</th>
    <th data-ng-show="isWorld('earth')"><label>10% off</label></th>
    <th data-ng-show="isWorld('earth')"><label>99.999% off</label></th>
    <th data-ng-show="isWorld('moon')"><label>25% off</label></th>
    </tr>
</thead>
<tbody>
    <tr data-ng-repeat="mupg in managerUpgrades track by $index">
    <td>{{investments[$index][0]}}</td>
    <td data-ng-repeat="mtup in mupg track by $index">
        <label class="strike-when-checked"><input type="checkbox" data-ng-model="mtup[1]"> <span>{{(isMoon(planet) || $index == 1) ? ' $' : ' '}}{{mtup[0] | num:raw}}{{(!isMoon(planet) && $index == 0) ? ' AI' : ''}}</span></label>
    </td>
    </tr>
</tbody>
</table>`
        };
    });
    
    
    // <tr>
    // <th>Business</th>
    // <th data-ng-show="isEarth(planet)"><label><input type="checkbox" class="form-control" data-ng-model="selectAll[1]" data-ng-change="selectedAll(ref, 1)"> 10% off</label></th>
    // <th data-ng-show="isEarth(planet)"><label><input type="checkbox" class="form-control" data-ng-model="selectAll[2]" data-ng-change="selectedAll(ref, 2)"> 99.999% off</label></th>
    // <th data-ng-show="isMoon(planet)"><label><input type="checkbox" class="form-control" data-ng-model="selectAll[3]" data-ng-change="selectedAll(ref, 3)"> 25% off</label></th>
    // </tr>