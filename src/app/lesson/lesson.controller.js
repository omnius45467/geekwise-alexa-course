(function () {
  'use strict';

  angular
    .module('alexaCourse')
    .controller('LessonController', LessonController);

  /** @ngInject */
  function LessonController(Lessons, lesson) {
    this.lesson = lesson;
    this.lessons = Lessons.lessons;
    // findLesson();

    // function findLesson() {
    //   debugger;
    //   var lesson = null;
    //   // angular.forEach(Lessons, function (_lesson) {
    //   //   if (_lesson.id === 1) {
    //   //     lesson = _lesson;
    //   //   }
    //   // });
    //   // console.log(lesson);
    //   return lesson;
    // }
  }
})();
