(function() {
  'use strict';

  angular
    .module('alexaCourse')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
