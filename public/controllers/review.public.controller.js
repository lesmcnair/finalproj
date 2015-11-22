angular.module('reviews').controller('ReviewsController', ['$scope', '$routeParams', '$location', 'Reviews', '$timeout', function($scope, $routeParams, $location, Reviews, $timeout){

    
    $scope.create = function() {

      var review = new Reviews({
            author: this.author,
            dateCreated: this.dateCreated,
            reviewBody: this.reviewBody,
            reviewTitle: this.reviewTitle,
            starRating: this.starRating,
            ImgURL: this.ImgURL

      });
      
      console.log(this);
      
      review.$save(function(response) {
          
          console.log(response);
          
          $location.path('/api/reviews/:' + response._id);
      }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
      });
    };
    
    $scope.find = function() {
      $scope.reviews = Reviews.query();
      console.log($scope.reviews);
    };
    
    $scope.findOne = function() {
        $scope.review = Reviews.get({
            reviewId: $routeParams.reviewId
        });
    };
    
    $scope.update = function() {
        $scope.review.$update(function() {
            console.log($scope);
            $location.path('/api/reviews/:' + $scope.review._id);
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };
    
    $scope.delete = function(review) {
        if (review) {
            review.$remove(function() {
                for (var i in $scope.reviews) {
                    if ($scope.reviews[i] === review) {
                        $scope.reviews.splice(i, 1);
                    }
                }
            });
        } else {
            $scope.review.$remove(function() {
                $location.path('reviews');
            });
        }
    };
    
    
}]);