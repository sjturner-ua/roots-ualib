angular.module('ualib.imageCarousel', ['angular-carousel'])
    .constant('VIEW_IMAGES_URL', 'http://wwwdev2.lib.ua.edu/erCarousel/api/slides/active')

    .factory('imageCarouselFactory', ['$http', 'VIEW_IMAGES_URL', function imageCarouselFactory($http, url){
        return {
            getData: function(){
                return $http({method: 'GET', url: url, params: {}});
            }
        };
    }])
    .controller('imageCarouselCtrl', ['$scope', '$q', 'imageCarouselFactory',
        function imageCarouselCtrl($scope, $q, imageCarouselFactory){
            $scope.slides = null;

            function loadImages(slides, i, len, deferred){
                i = i ? i : 0;
                len = len ? len : slides.length;
                deferred = deferred ? deferred : $q.defer();

                if (len < 1){
                    deferred.resolve(item);
                }

                var image = new Image();

                image.onload = function(){
                    this.styles = 'url('+this.src+')';
                    slides[i] = this;

                    if (i+1 === len){
                        deferred.resolve(slides);
                    }
                    else {
                        i++;
                        loadImages(slides, i, len, deferred);
                    }
                };

                image.src = slides[i].image;
                return deferred.promise;
            }

            imageCarouselFactory.getData()
                .success(function(data) {
                    console.log(data);
                    loadImages(data.slides).then(function(slides){
                        $scope.slides = slides;
                    });
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });

        }])
    .directive('ualibImageCarousel', [ function() {
        return {
            restrict: 'AC',
            controller: 'imageCarouselCtrl',
            link: function(scope, elm, attrs, Ctrl){
            }
        };
    }]);
