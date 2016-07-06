(function() {
  'use strict';

  angular
    .module('alexaCourse')
    .controller('DirectoryController', DirectoryController);

  /** @ngInject */
  function DirectoryController(Lessons) {
    var vm = this;
    vm.lessons = Lessons.lessons;
    rankLessons();
    findLesson();
    function rankLessons() {
      angular.forEach(vm.lessons, function(lessons) {
        lessons.rank = lessons.id;
      });
      
    }
    function findLesson(){
      angular.forEach(vm.lessons, function(_lesson){
        return _lesson;
      });
    }
  }
})();
