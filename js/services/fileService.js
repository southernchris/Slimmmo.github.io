angular.module('adventureApp').service('fileService', ['$document', function($document) {
    this.export = function(json) {
        var blob = new Blob([json], {type: "application/json"});
        var title = "AdvCapCalc.json";
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, title);
        } else {
            var downloadLink = angular.element("<a></a>");
            downloadLink.attr("href", window.URL.createObjectURL(blob));
            downloadLink.attr("download", title);
            $document.find("body").append(downloadLink);
            downloadLink[0].click();
            downloadLink.remove();
        }
    };    
}]);