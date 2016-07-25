import '../../index';
import 'angular';
import 'angular-mocks';
import 'phantomjs-polyfill';

describe('Component: App', function () {
  beforeEach(angular.mock.module('duckduckgoApp'));
  const SIDENAV_ID = 'left-sidenav';
  let element, vm, controller;

  beforeEach(angular.mock.inject( ($compile, $rootScope) => {
    let localScope = $rootScope.$new();
    element = angular.element('<app></app>');
    let compiledElement = $compile(element)(localScope);
    localScope.$digest();
    let scope = compiledElement.isolateScope();
    vm = scope.vm;
  }));

  describe('Toggle menu: toggleMenu', () => {
    it('should be defined', () => {
      expect(vm.toggleMenu).toBeDefined();
    });

    it('should toggle the menu', () => {
      let isMenuOpen = vm.$mdSidenav(SIDENAV_ID).isOpen();

      vm.toggleMenu();

      expect(vm.$mdSidenav(SIDENAV_ID).isOpen()).toEqual(!isMenuOpen);
    });
  });


});
