var app = angular.module('flapperNews', ['ui.router']);

app.factory('postsService', postsService);
app.controller('MainCtrl', MainController);

function postsService() {
  var o = {
    posts: []
  };
  return o;
}

app.controller('PostsCtrl', PostsController);

PostsController.$inject = ['$stateParams', 'postsService'];

function PostsController($stateParams, postsService) {
  var vm = this;
  vm.post = postsService.posts[$stateParams.id];

  vm.addComment = function () {
    if (vm.body === '') { return; }
    vm.post.comments.push({
      body: vm.body,
      author: 'user',
      upvotes: 0
    });
    vm.body = '';
  };
}

MainController.$inject = ['postsService'];

function MainController(postsService) {
  var vm = this;
  vm.test = "Hello World!";
  vm.posts = postsService.posts;

  vm.addPost = function () {
    if (!vm.title || vm.title === '') { return; }
    vm.posts.push({
      title: vm.title,
      link: vm.link,
      upvotes: 0,
      comments: [
        { author: 'Joe', body: 'Cool post!', upvotes: 0 },
        { author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0 }
      ]
    });

    vm.incrementUpvotes = function (post) {
      post.upvotes += 1;
    };
  }
}

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/home.html',
          controller: 'MainCtrl as vm'
        })
        .state('posts', {
          url: '/posts/{id}',
          templateUrl: '/posts.html',
          controller: 'PostsCtrl as vm'
        });

      $urlRouterProvider.otherwise('home');
    }]);