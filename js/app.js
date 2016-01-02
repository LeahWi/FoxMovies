var sliderApp = angular.module('sliderApp', ['ngAnimate']);

sliderApp.controller('SliderController', function ($scope) {
    //$scope.images = [{
    //    src: 'img1.png',
    //    title: 'Pic 1'
    //}, {
    //    src: 'img2.jpg',
    //    title: 'Pic 2'
    //}, {
    //    src: 'img3.jpg',
    //    title: 'Pic 3'
    //}, {
    //    src: 'img4.png',
    //    title: 'Pic 4'
    //}, {
    //    src: 'img5.png',
    //    title: 'Pic 5'
    //}];
    $scope.images = JSON.parse(localStorage.getItem('savedData'));

});

//var sliderApp = angular.module('sliderApp', ['ngAnimate']);

sliderApp.directive('slider', function ($timeout) {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            images: '='
        },
        link: function (scope, elem, attrs) {
            //},
            //templateUrl: 'templates/templateurl.html'
            //},
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