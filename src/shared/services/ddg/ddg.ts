import { SuggestionModel, ResultModel } from '../../models';

export class DDGService {
  public static ON_CHANGED_BROADCAST: string = 'data-changed';
  public static UPDATE_TYPE = { Disambiguation: 1, Other: 2, Error: 3};
  isLoaded: boolean = false;

  private static REGEX_SUGGESTION = /.*">(.*)</;

  public static $inject: Array<string> = ['$rootScope', '$http', '$q'];
  constructor(private $rootScope: ng.IRootScopeService, private $http: ng.IHttpService, private $q: ng.IQService) {}

  private doHttpGet(queryStr: string) {
    return this.$http.get('http://api.duckduckgo.com/', {
      params: {
        format: 'json',
        t: 'testDuckDuckGoApp',
        q: queryStr
      }
    });
  }

  private extractResultsFromResponse(res: any, customFunc: Function): Array<any> {
    let results: Array<any> = [];
    if (res && res.data) {
      if (res.data['RelatedTopics']) {
        res.data['RelatedTopics'].forEach(topic => {
          if (!topic['Result'] && topic['Name'] && topic['Topics']) {
            topic['Topics'].forEach(subTopic => {
              customFunc(results, subTopic);
            });
          } else {
            customFunc(results, topic);
          }
        });
      }
    }
    return results;
  }

  public getResults(queryStr: string) {
    this.doHttpGet(queryStr).then( res => {
      let disambiguations = this.extractResultsFromResponse(res, (arr, topic) => {
        arr.push(ResultModel.fromResponse(topic));
      });
      let results = (res['Results'] || []).map( (result) => ResultModel.fromResponse(result));
      this.$rootScope.$broadcast(DDGService.ON_CHANGED_BROADCAST, {
        disambiguations,
        results
      });
    }, err => {
      this.$rootScope.$broadcast(DDGService.ON_CHANGED_BROADCAST, {
        disambiguations: [],
        results: []
      });
    });
  }

  public getAutocompleteItems(queryStr: string) {
    return this.doHttpGet(queryStr).then(res => {
      let suggestions: Array<string> = this.extractResultsFromResponse(res, (arr, topic) => {
        let match = topic['Result'].match(DDGService.REGEX_SUGGESTION);
        if (match.length === 2) {
          arr.push(match[1]);
        }
      });
      return this.$q.when(suggestions);
    }, err => {
      return this.$q.when([]);
    });
  }
}
