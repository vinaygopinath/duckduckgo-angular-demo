import 'angular';
import { DDGService, HistoryService } from '../../shared/services';
import { QueryModel, ResultModel } from '../../shared/models';

export class SearchComponent implements ng.IComponentOptions {
  public template: string = require('./search.html').toString();
  public controller: Function = SearchController;
  public controllerAs: string = 'vm';
}

export class SearchController {
  query: string;
  disambiguations: Array<ResultModel> = [];
  results: Array<ResultModel> = [];
  typingTimeout: any;

  static $inject = ['DDGService', '$scope', 'HistoryService', '$timeout'];
  constructor(private ddgService: DDGService, private $scope: ng.IScope, private historyService: HistoryService, private $timeout: ng.ITimeoutService) {
    this.initialize();
  }

  initialize() {
    this.$scope.$on(DDGService.ON_CHANGED_BROADCAST, (scope, response) => this.onResultsChanged(response));
  }

  private getResults(queryStr: string) {
    if (queryStr) {
      this.ddgService.getResults(queryStr);
    }
  }

  public search(queryStr: string) {
    if (this.typingTimeout) {
      this.$timeout.cancel(this.typingTimeout);
    }
    this.typingTimeout = this.$timeout(() => this.getResults(queryStr), 750);
  }

  private onSuggestionSelected(selectedItem) {
    if (selectedItem) {
      this.historyService.addItem(new QueryModel(selectedItem));
      this.getResults(selectedItem);
    }
  }

  private onResultsChanged(response: any) {
    this.disambiguations = response['disambiguations'];
    this.results = response['results'];
  }

  private onFormSubmitted(queryStr: string) {
    angular.element(document.querySelector('#autocomplete')).blur();
    if (queryStr) {
      this.historyService.addItem(new QueryModel(queryStr));
      this.getResults(queryStr);
    }
  }

  private getSuggestions(queryStr) {
    return this.ddgService.getAutocompleteItems(queryStr);

  }
}
