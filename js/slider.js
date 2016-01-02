app.directive('slider', function ($timeout) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            images: '='
        },
        link: function (scope, elem, attrs) {
            
            scope.visible_image = 2;
            scope.images[scope.visible_image].visible = true;

            scope.setCurrentSlideImage = function (index) {
                scope.images[scope.visible_image].visible = false; // make the prev image unvisible
                var temp_arr = scope.images.splice(index - scope.visible_image);
                scope.images = temp_arr.concat(scope.images);
                scope.images[scope.visible_image].visible = true; // make the current image visible
            };

            scope.removeImage = function (index) {
                scope.images.splice(index, 1);
                localStorage.setItem('savedData', JSON.stringify(scope.images));
                scope.images[scope.visible_image].visible = true;
            };

            /* Start: For Automatic slideshow*/

            var timer;
            var sliderFunc = function () {
                timer = $timeout(function () {
                    scope.setCurrentSlideImage(scope.visible_image - 1);
                    timer = $timeout(sliderFunc, 50000);
                }, 50000);
            };

            sliderFunc();

            scope.$on('$destroy', function () {
                $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
            });
            /* End : For Automatic slideshow*/

        },
        templateUrl: 'templates/templateurl.html'
    }
});