import '../../index';
import 'angular';
import 'angular-mocks';
import 'phantomjs-polyfill';

describe('Component: History', function () {
  beforeEach(angular.mock.module('duckduckgoApp'));

  let element, vm, controller, scope;

  beforeEach(angular.mock.inject( ($compile, $rootScope) => {
    let localScope = $rootScope.$new();
    element = angular.element('<history></history>');
    let compiledElement = $compile(element)(localScope);
    localScope.$digest();
    scope = compiledElement.isolateScope();
    vm = scope.vm;
  }));

  describe('Initialization', () => {
    it('should define an initialize function', () => {
      expect(vm.initialize).toBeDefined();
    });

    it('should get items from the HistoryService', () => {
      spyOn(vm.historyService, 'getItems');

      vm.initialize();

      expect(vm.historyService.getItems).toHaveBeenCalled();
    });

    it('should save the items from HistoryService in log', () => {
      const SOME_HISTORY_ITEMS = ['item1', 'item2', 'item3'];
      spyOn(vm.historyService, 'getItems').and.returnValue(SOME_HISTORY_ITEMS);

      vm.initialize();

      expect(vm.log).toBe(SOME_HISTORY_ITEMS);
    });
  });


});
