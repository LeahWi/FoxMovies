app.controller('customDialogCtrl', function ($scope, $modalInstance, data) {
    //-- Variables --//
    $scope.image_url = '';
    $scope.newImage = { title: '', description: '', image_url: '', link: '' };

    //-- Methods --//

    $scope.uploadImage = function (file) {
        var reader = new FileReader();
        // inject an image with the src url
        reader.onload = function (event) {
            // $scope.$apply() should occur as close to the async event when using native JS async behaviors
            $scope.$apply(function () {
                $scope.newImage.image_url = event.target.result;
            });
        }
        reader.readAsDataURL(file);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('Canceled');
    }; // end cancel

    $scope.save = function () {
        savedData = JSON.parse(localStorage.getItem('savedData')) || [];
        //var receiveddata = JSON.stringify($scope.newImage);
        savedData.push($scope.newImage);
        localStorage.setItem("savedData", JSON.stringify(savedData));
        $modalInstance.close($scope.newImage);
    }; // end save

    $scope.hitEnter = function (evt) {
        if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.user.name, null) || angular.equals($scope.user.name, '')))
            $scope.save();
    };
});