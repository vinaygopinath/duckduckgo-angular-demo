import { HistoryService } from '../../shared/services';
import { QueryModel } from '../../shared/models';
import './history.scss';

export class HistoryComponent implements ng.IComponentOptions {
    public template: string = require('./history.html').toString();
    public controller: Function = HistoryController;
    public controllerAs: string = 'vm';
}

export class HistoryController {
  log: Array<QueryModel> = [];

  static $inject = ['HistoryService'];

  constructor(private historyService: HistoryService) {
    this.initialize();
  }

  initialize() {
    this.log = this.historyService.getItems();
  }

}
