    angular.module('adventureApp').directive('upgradeCosts', function () {
        return {
            restrict: 'E',
            scope: {
                investments: "=investments",
                costs: "=costs"
            },
            template : `
<table class="table table-striped table-hover table-bordered">
<thead>
    <tr>
    <th>Type</th>
    <th>$ Cost +1</th>
    <th>Time Cost +1</th>
    <th>$ Cost +10</th>
    <th>Time Cost +10</th>
    <th>$ Cost +bonus</th>
    <th>Time Cost +bonus</th>
    <th>$ Cost +all bonus</th>
    <th>Time Cost +all bonus</th>
    </tr>
</thead>
<tbody>
    <tr data-ng-repeat="rUC in costs track by $index">
    <td>{{investments[$index][0]}}</td>
    <td>\${{rUC[0] | num:raw}}</td>
    <td>{{rUC[1] | time:raw}}</td>
    <td>\${{rUC[2] | num:raw}}</td>
    <td>{{rUC[3] | time:raw}}</td>
    <td>\${{rUC[4] | num:raw}}</td>
    <td>{{rUC[5] | time:raw}}</td>
    <td>\${{rUC[6] | num:raw}}</td>
    <td>{{rUC[7] | time:raw}}</td>
    </tr>
</tbody>
</table>`
        };
    });