import { DDGService, HistoryService } from '../../shared/services';
import './disambiguation.scss';

export class DisambiguationComponent implements ng.IComponentOptions {
    public template: string = require('./disambiguation.html').toString();
    public controller: Function = DisambiguationController;
    public controllerAs: string = 'vm';
    public bindings: any = {
      'item': '<'
    }
}

export class DisambiguationController {

}
