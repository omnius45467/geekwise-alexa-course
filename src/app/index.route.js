(function () {
  'use strict';

  angular
    .module('alexaCourse')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('directory', {
        url: '/directory',
        templateUrl: 'app/directory/directory.html',
        controller: 'DirectoryController',
        controllerAs: 'directory'
      })
      .state('directory.lesson', {
        url: '/:lessonId',
        templateUrl: 'app/directory/lesson.html',
        controller: 'LessonController',
        controllerAs: 'lesson',
        resolve: {
          lesson: function (Lessons, $stateParams) {
            var lesson = null;
            angular.forEach(Lessons.lessons, function (_lesson) {
              if (_lesson.id === parseInt($stateParams.lessonId, 10)) {
                lesson = _lesson;
              }
            });
            return lesson;
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  }

})();
