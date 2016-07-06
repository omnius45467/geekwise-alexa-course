(function() {
  'use strict';

  angular
    .module('alexaCourse')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr) {
    var vm = this;

    vm.blogArticles = [];
    vm.classAnimation = '';
    vm.creationDate = 1467309575734;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.blogArticles = webDevTec.getTec();

      angular.forEach(vm.blogArticles, function(blogArticle) {
        blogArticle.rank = Math.random();
      });
    }
  }
})();
