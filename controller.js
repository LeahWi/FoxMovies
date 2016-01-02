app.controller('MainCtrl', function ($scope, $rootScope, $timeout, dialogs) {
    //-- Variables --//

    // Put the images objects from local storage on the $scope.images var, if there are no images - put an empty array.
    $scope.images = JSON.parse(localStorage.getItem('savedData')) || [];
    $scope.disableButton = false;

    //-- Listeners & Watchers --//

    //Open a new popup
    $scope.launch = function () {
        var dlg = dialogs.create('popup.html', 'customDialogCtrl', {}, 'lg');
        $scope.disableButton = true;
        //After press save
        dlg.result.then(function (newImage) {
            $scope.images.push(newImage);
            $scope.disableButton = false;
        },
        //After press cancel
        function () {
            $scope.disableButton = false;
            if (angular.equals($scope.images, {}));
                //TODO: Add a relevant alert
                //$scope.title = 'You did not enter an image!';
        });
    }; // end launch
});