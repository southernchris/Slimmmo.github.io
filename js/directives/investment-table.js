// (function() {
//     "use strict";
    
    angular.module('adventureApp').directive('investmentTable', function () {
        function link(scope, element, attrs, controller) {
            scope.selectedAll = function()
            {
                controller.selectedAllMegaTickets(0);
            }
        }
                
        return {
            restrict: 'E',
            require: '^planet',
            scope: {
                investments: '=investments',
                hasMegaTickets: '=hasMegaTickets'
            },
            link: link,
            template : `
<div>
    <div>{{hasMegaTickets}}</div>
    <table class="table table-striped table-hover table-bordered space_top">
    <thead>
        <tr>
        <th>Type</th>
        <th>Number</th>        
        <th ng-show="hasMegaTickets"><label><input type="checkbox" class="form-control" data-ng-model="allMegaTicketsSelected" data-ng-change="selectedAll()"> Mega Ticket</label></th>
        <th>$ / Cycle</th>
        <th>Cycle Time</th>
        <th>$ / Second</th>
        <th>% of total $ / Second</th>
        </tr>
    </thead>
    <tbody>
        <tr data-ng-repeat="inv in investments track by $index">
        <td>{{inv[0]}}</td>
        <td><input type="number" class="form-control" min="0" data-ng-model="inv[1]"></td>
        <td ng-show="hasMegaTickets"><input type="checkbox" class="form-control" data-ng-model="inv[2]"></td>
        <td>\${{inv[3] | num:raw}}</td>
        <td>{{inv[4] | time:raw}}</td>
        <td>\${{inv[5] | num:raw}}</td>
        <td>{{inv[6] | num:raw}}%</td>
        </tr>
    </tbody>
    </table>
</div>`
        };
    });
//     
//     
//     angular.module('adventureApp').directive('investmentTable', function () {
//         return {
//             restrict: 'E',
//             template : `
// <div>
//     <table class="table table-striped table-hover table-bordered space_top">
//     <thead>
//         <tr>
//         <th>Type</th>
//         <th>Number</th>
//         <th ng-show="ref.hasMegaTickets"><label><input type="checkbox" class="form-control" data-ng-model="selectAll[0]" data-ng-change="selectedAll(ref, 0)"> Mega Ticket</label></th>
//         <th>$ / Cycle</th>
//         <th>Cycle Time</th>
//         <th>$ / Second</th>
//         <th>% of total $ / Second</th>
//         </tr>
//     </thead>
//     <tbody>
//         <tr data-ng-repeat="inv in ref.investments track by $index">
//         <td>{{inv[0]}}</td>
//         <td><input type="number" class="form-control" min="0" data-ng-model="inv[1]"></td>
//         <td ng-show="ref.hasMegaTickets"><input type="checkbox" class="form-control" data-ng-model="inv[2]"></td>
//         <td>\${{inv[3] | num:raw}}</td>
//         <td>{{inv[4] | time:raw}}</td>
//         <td>\${{inv[5] | num:raw}}</td>
//         <td>{{inv[6] | num:raw}}%</td>
//         </tr>
//     </tbody>
//     </table>
// </div>`
//         };
//     });



// })();


/*
    <tbody>
        <tr data-ng-repeat="inv in ref.investments track by $index">
        <td>{{inv[0]}}</td>
        <td><input type="number" class="form-control" min="0" data-ng-model="inv[1]"></td>
        <td ng-show="ref.hasMegaTickets"><input type="checkbox" class="form-control" data-ng-model="inv[2]"></td>
        <td>${{inv[3] | num:raw}}</td>
        <td>{{inv[4] | time:raw}}</td>
        <td>${{inv[5] | num:raw}}</td>
        <td>{{inv[6] | num:raw}}%</td>
        </tr>
    </tbody>
    */