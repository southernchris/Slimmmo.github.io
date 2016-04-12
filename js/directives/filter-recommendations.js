    angular.module('adventureApp').directive('filterRecommendations', function () {             
        return {
           restrict: 'E',
           scope: {
               filterTime: '=',
               ref: '='
           },
           template: `
<label><input type="checkbox" class="form-control" data-ng-model="ref.noSingles"> Don't show +1 upgrades</label>
<label><input type="checkbox" class="form-control" data-ng-model="ref.noTens"> Don't show +10 upgrades</label>
<br>
<br>
<div>
    Don't show upgrades that take longer than (Days : Hours : Minutes)
</div>
<table>
    <tr class="text-center">
        <td><a ng-click="incrementDays(ref)" class="btn btn-link"><span class="fa fa-chevron-up"></span></a></td>
        <td>&nbsp;</td>
        <td><a ng-click="incrementHours(ref)" class="btn btn-link"><span class="fa fa-chevron-up"></span></a></td>
        <td>&nbsp;</td>
        <td><a ng-click="incrementMinutes(ref)" class="btn btn-link"><span class="fa fa-chevron-up"></span></a></td>
    </tr>
    <tr>
        <td class="form-group">
            <input style="width:50px;" data-ng-model="filterTime.days" class="form-control text-center" type="text" pattern="[0-9]*" placeholder="d">
        </td>
        <td>:</td>
        <td class="form-group">
            <input style="width:50px;" data-ng-model="filterTime.hours" class="form-control text-center" type="text" pattern="[0-9]*" placeholder="h">
        </td>
        <td>:</td>
        <td class="form-group">
            <input style="width:50px;" data-ng-model="filterTime.minutes" class="form-control text-center" type="text" pattern="[0-9]*" placeholder="m">
        </td>
    </tr>
    <tr class="text-center">
        <td><a ng-click="decrementDays(ref)" class="btn btn-link"><span class="fa fa-chevron-down"></span></a></td>
        <td>&nbsp;</td>
        <td><a ng-click="decrementHours(ref)" class="btn btn-link"><span class="fa fa-chevron-down"></span></a></td>
        <td>&nbsp;</td>
        <td><a ng-click="decrementMinutes(ref)" class="btn btn-link"><span class="fa fa-chevron-down"></span></a></td>
    </tr>
</table>
<div>
    Don't show upgrades that have % Increase in $ / Second less than X
</div>
<table>
    <tr class="text-center">
        <td><a ng-click="incrementPercentage(ref)" class="btn btn-link"><span class="fa fa-chevron-up"></span></a></td>
    </tr>
    <tr class="form-group">
        <td class="form-group">
            <input style="width:50px;" data-ng-model="filterTime.percentage" class="form-control text-center" type="text" pattern="[0-9]*" placeholder="%">
        </td>
    </tr>
    <tr class="text-center">
        <td><a ng-click="decrementPercentage(ref)" class="btn btn-link"><span class="fa fa-chevron-down"></span></a></td>
    </tr>
</table>
           `,
           link: function(scope) {               
                scope.incrementDays = function(loc) {
                    if (scope.filterTime.days !== null) {
                        scope.filterTime.days++;
                    } else {
                        scope.filterTime.days = 1;
                    }
                };
                scope.incrementHours = function(loc) {
                    if (scope.filterTime.hours !== null) {
                        scope.filterTime.hours++;
                    } else {
                        scope.filterTime.hours = 1;
                    }
                };
                scope.incrementMinutes = function(loc) {
                    if (scope.filterTime.minutes !== null) {
                        scope.filterTime.minutes++;
                    } else {
                        scope.filterTime.minutes = 1;
                    }
                };
                scope.incrementPercentage = function(loc) {
                    if (scope.filterTime.percentage !== null) {
                        scope.filterTime.percentage++;
                    } else {
                        scope.filterTime.percentage = 1;
                    }
                };
                scope.decrementDays = function(loc) {
                    if (scope.filterTime.days !== null) {
                        if (scope.filterTime.days > 0) {
                            scope.filterTime.days--;
                        }
                    }
                };
                scope.decrementHours = function(loc) {
                    if (scope.filterTime.hours !== null) {
                        if (scope.filterTime.hours > 0) {
                            scope.filterTime.hours--;
                        }
                    }
                };
                scope.decrementMinutes = function(loc) {
                    if (scope.filterTime.minutes !== null) {
                        if (scope.filterTime.minutes > 0) {
                            scope.filterTime.minutes--;
                        }
                    }
                };
                scope.decrementPercentage = function(loc) {
                    if (scope.filterTime.percentage !== null) {
                        if (scope.filterTime.percentage > 0) {
                            scope.filterTime.percentage--;
                        }
                    }
                };
           }
        };
    });