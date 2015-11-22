angular.module('reviews').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/reviews/create', {
        templateUrl: '/public/views/newReview.html',
    }).when('/', {
        templateUrl: '/public/views/index.html'
    }).when('/reviews', {
        templateUrl: '/public/views/displayReviews.html'
    }).when('/reviews/:reviewId', {
        templateUrl: '/public/views/viewReview.html'
    }).when('/reviews/:reviewId/edit', {
        templateUrl: '/public/views/editReview.html'
    });
    }
]);