import '../../index';
import 'angular';
import 'angular-mocks';
import { SearchController } from './search';
import { DDGService } from '../../shared/services';
import 'phantomjs-polyfill';

const SOME_QUERY = 'test';

describe('Component: Search', function () {
  beforeEach(angular.mock.module('duckduckgoApp'));

  let element, vm, controller, scope;

  beforeEach(angular.mock.inject( ($compile, $rootScope) => {
    let localScope = $rootScope.$new();
    element = angular.element('<search></search>');
    let compiledElement = $compile(element)(localScope);
    localScope.$digest();
    scope = compiledElement.isolateScope();
    vm = scope.vm;
  }));

  describe('Initialization', () => {
    it('should have a null query property', () => {
      expect(vm.query).toBe(null);
    });

    it('should initialize disambiguations as an empty array', () => {
      expect(vm.disambiguations).toEqual([]);
    });

    it('should initialize results as an empty array', () => {
      expect(vm.results).toEqual([]);
    });

    it('should attach a broadcast receiver', () => {
      spyOn(vm.$scope, '$on');

      vm.initialize();

      expect(vm.$scope.$on).toHaveBeenCalledWith(DDGService.ON_CHANGED_BROADCAST, jasmine.any(Function));
    });
  });

  describe('Suggestion selection: onSuggestionSelected', () => {

    it('should be defined', () => {
      expect(vm.onSuggestionSelected).toBeDefined();
    });

    it('should add selection to history', () => {
      spyOn(vm.historyService, 'addItem');

      vm.onSuggestionSelected(SOME_QUERY);

      expect(vm.historyService.addItem).toHaveBeenCalled();
    });

    it('should immediately fetch results for the given query', () => {
      spyOn(vm, 'getResults');

      vm.onSuggestionSelected(SOME_QUERY);

      expect(vm.getResults).toHaveBeenCalledWith(SOME_QUERY);
    });

    it('should do nothing when an undefined string is selected', () => {
      spyOn(vm.historyService, 'addItem');

      vm.onSuggestionSelected(undefined);

      expect(vm.historyService.addItem).not.toHaveBeenCalled();
    });
  });

  describe('Fetch suggestions: getSuggestions', () => {

    it('should be defined', () => {
      expect(vm.getSuggestions).toBeDefined();
    });

    it('should invoke the DuckDuckGoService to get suggestions', () => {
      spyOn(vm.ddgService, 'getAutocompleteItems');

      vm.getSuggestions(SOME_QUERY);

      expect(vm.ddgService.getAutocompleteItems).toHaveBeenCalledWith(SOME_QUERY);
    });
  });

  describe('Broadcast receiver: onResultsChanged', () => {
    const SOME_RESPONSE = {
      disambiguations: ['disambiguation1', 'disambiguation2'],
      results: ['results1', 'results2']
    };

    it('should be defined', () => {
      expect(vm.onResultsChanged).toBeDefined();
    });

    it('should update disambiguations based on the response', () => {
      vm.onResultsChanged(SOME_RESPONSE);

      expect(vm.disambiguations).toBe(SOME_RESPONSE.disambiguations);
    });

    it('should update results based on the response', () => {
      vm.onResultsChanged(SOME_RESPONSE);

      expect(vm.results).toBe(SOME_RESPONSE.results);
    });
  });

  describe('Search: search', () => {
    it('should be defined', () => {
      expect(vm.search).toBeDefined();
    });

    it('should start a timeout when a query is received', () => {
      spyOn(vm, '$timeout');

      vm.search(SOME_QUERY);

      expect(vm.$timeout).toHaveBeenCalled();
    });

    it('should invoke getResults for the query when the user pauses/finishes typing', angular.mock.inject(($timeout) => {
      spyOn(vm, 'getResults');

      vm.search(SOME_QUERY);
      $timeout.flush();

      expect(vm.getResults).toHaveBeenCalledWith(SOME_QUERY);
    }));

    it('should reset the timeout when multiple queries are received in a short duration', () => {
      const SOME_PROMISE = {};
      vm.typingTimeout = SOME_PROMISE;
      spyOn(vm.$timeout, 'cancel');
      spyOn(vm, '$timeout');

      vm.search(SOME_QUERY);

      expect(vm.$timeout.cancel).toHaveBeenCalled();
      expect(vm.$timeout).toHaveBeenCalled();
    });
  });

  describe('Get Results: getResults', () => {

    it('should be defined', () => {
      expect(vm.getResults).toBeDefined();
    });

    it('should do nothing when an undefined query is received', () => {
      spyOn(vm.ddgService, 'getResults');

      vm.getResults(undefined);

      expect(vm.ddgService.getResults).not.toHaveBeenCalled();
    });

    it('should invoke the DuckDuckGoService for valid queries', () => {
      spyOn(vm.ddgService, 'getResults');

      vm.getResults(SOME_QUERY);

      expect(vm.ddgService.getResults).toHaveBeenCalledWith(SOME_QUERY);
    });
  });

  describe('Form submission: onFormSubmitted', () => {

    it('should be defined', () => {
      expect(vm.onFormSubmitted).toBeDefined();
    });

    it('should invoke getResults on valid queries', () => {
      spyOn(vm, 'getResults');

      vm.onFormSubmitted(SOME_QUERY);

      expect(vm.getResults).toHaveBeenCalledWith(SOME_QUERY);
    });

    it('should log valid queries using HistoryService', () => {
      spyOn(vm.historyService, 'addItem');

      vm.onFormSubmitted(SOME_QUERY);

      expect(vm.historyService.addItem).toHaveBeenCalled();
    });

    it('should not invoke getResults on undefined queries', () => {
      spyOn(vm, 'getResults');

      vm.onFormSubmitted(undefined);

      expect(vm.getResults).not.toHaveBeenCalled();
    });
  });
});
