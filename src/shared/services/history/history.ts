import { QueryModel } from '../../models/query/query';

export class HistoryService {

  private static STORAGE_KEY = 'duckduckgoApp';
  private storageService: any;
  private log: Array<QueryModel> = [];

  public static $inject = ['$window'];
  constructor($window: ng.IWindowService) {
    this.storageService = $window.localStorage;
    try {
      this.initialize(JSON.parse(this.storageService.getItem(HistoryService.STORAGE_KEY)));
    } catch (e) {
      //Reset log in case local storage is corrupt/manually modified
      this.log = [];
    }
  }

  initialize(localStorageData) {
    let storedData = localStorageData || [];
    if (storedData instanceof Array) {
      this.log = storedData;
    } else {
      this.log = [];
    }
  }

  getItems(): Array<QueryModel> {
    return this.log.slice().reverse();
  }

  addItem(item: QueryModel) {
    this.log.push(item);
    if (this.log.length > 100) {
      this.log.shift();
    }
    this.storageService.setItem(HistoryService.STORAGE_KEY, JSON.stringify(this.log));
  }
}
