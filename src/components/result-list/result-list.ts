import { DDGService, HistoryService } from '../../shared/services';
import { QueryModel } from '../../shared/models';
import './result-list.scss';

export class ResultListComponent implements ng.IComponentOptions {
    public template: string = require('./result-list.html').toString();
    public controller: Function = ResultListController;
    public controllerAs: string = 'vm';
    public bindings: any = {
      'items': '<'
    };
}

export class ResultListController {
}
