app.controller('MainCtrl', function ($scope, $rootScope, $timeout, dialogs) {
    //-- Variables --//

    var _progress = 33;

    $scope.name = '';
    $scope.confirmed = 'No confirmation yet!';
    $scope.images = JSON.parse(localStorage.getItem('savedData')) || [];

    $scope.custom = {
        val: 'Initial Value'
    };

    //-- Listeners & Watchers --//

    $scope.launch = function () {
        var dlg = dialogs.create('popup.html', 'customDialogCtrl', {}, 'lg');
        dlg.result.then(function (newImage) {
            $scope.images.push(newImage);
            //to enable the popup button
        }, function () {
            //to enable the popup button
            if (angular.equals($scope.images, {}))
                $scope.title = 'You did not enter an image!';
        });
    }; // end launch

    var _fakeWaitProgress = function () {
        $timeout(function () {
            if (_progress < 100) {
                _progress += 33;
                $rootScope.$broadcast('dialogs.wait.progress', { 'progress': _progress });
                _fakeWaitProgress();
            } else {
                $rootScope.$broadcast('dialogs.wait.complete');
            }
        }, 1000);
    };
});