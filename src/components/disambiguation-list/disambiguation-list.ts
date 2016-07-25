import { DDGService, HistoryService } from '../../shared/services';
import { QueryModel } from '../../shared/models';
import './disambiguation-list.scss';

export class DisambiguationListComponent implements ng.IComponentOptions {
    public template: string = require('./disambiguation-list.html').toString();
    public controller: Function = DisambiguationListController;
    public controllerAs: string = 'vm';
    public bindings: any = {
      'items': '<'
    };
}

export class DisambiguationListController {}
