import '../../../index';
import 'angular';
import 'angular-mocks';
import 'phantomjs-polyfill';
import { HistoryService } from './history';
import { QueryModel } from '../../models';

const EMPTY_STATE = null;
const SOME_ITEMS = [];
const STORAGE_KEY = 'duckduckgoApp';
const SOME_ARRAY = [1,2,3,4,5];
describe('HistoryService', () => {
  let historyService: any, window: any;

  beforeEach(angular.mock.module('duckduckgoApp'));

  beforeEach(inject((_HistoryService_: HistoryService) => {
    historyService = _HistoryService_;
  }));

  describe('Initialization', () => {

    it('should provide an initialize function', () => {
      expect(historyService.initialize).toBeDefined();
    });

    it('should initialize with the localStorage array', () => {
      historyService.initialize(SOME_ARRAY);
      expect(historyService.getItems()).toEqual(SOME_ARRAY.reverse());
    });

    it('should reset log to an empty array when localStorage data is corrupt', () => {
      let SOME_CORRUPT_DATA = {};
      historyService.initialize(SOME_CORRUPT_DATA);
      expect(historyService.getItems()).toEqual([]);
    });
  });

  describe('Get items: getItems', () => {
    it('should be defined', () => {
      expect(historyService.getItems).toBeDefined();
    });

    it('should return the log array', () => {
      historyService.initialize(SOME_ARRAY);
      expect(historyService.getItems()).toEqual(jasmine.any(Array));
    });

    it('should provide the items in reverse chronological order', () => {
      historyService.initialize(SOME_ARRAY);

      expect(historyService.getItems()).toEqual(SOME_ARRAY.slice().reverse());
    });
  });

  describe('Add item: addItem', () => {
    const SOME_QUERY_MODEL = new QueryModel('test');

    it('should be defined', () => {
      expect(historyService.addItem).toBeDefined();
    });

    it('should push the item into the log array', () => {
      historyService.initialize([]);

      historyService.addItem(SOME_QUERY_MODEL);
      expect(historyService.getItems()).toEqual([SOME_QUERY_MODEL]);
    });

    it('should clear an old log entry when the count exceeds 100', () => {
      historyService.initialize(new Array(100));

      historyService.addItem(SOME_QUERY_MODEL);

      expect(historyService.getItems().length).toEqual(100);
    });

    it('should save the updated log in local storage', () => {
      historyService.initialize(new Array(100));
      spyOn(historyService.storageService, 'setItem');

      historyService.addItem(SOME_QUERY_MODEL);

      expect(historyService.storageService.setItem).toHaveBeenCalledWith(STORAGE_KEY, jasmine.any(String));
    });
  });

});
