import '../../../index';
import 'angular';
import 'angular-mocks';
import 'phantomjs-polyfill';
import { DDGService } from './ddg';
import { ResultModel } from '../../models';

describe('Service: DuckDuckGoService', () => {
  const SOME_VALID_QUERY = 'test';
  const SOME_HEADING1 = 'Digital camera';
  const SOME_HEADING2 = 'Digital divide';
  const SOME_VALID_RESPONSE = {
      'RelatedTopics': [{
        "Result" : `<a href=\"https://duckduckgo.com/Digital_camera\">${SOME_HEADING1}</a>A camera that encodes digital images and videos digitally and stores them for later reproduction.`,
        "Icon" : {
          "URL" : "https://duckduckgo.com/i/a795ae19.jpg",
          "Height" : "",
          "Width" : ""
        },
        "FirstURL" : "https://duckduckgo.com/Digital_camera",
        "Text" : "Digital cameraA camera that encodes digital images and videos digitally and stores them for later reproduction."
      }, {
        "Result" : `<a href=\"https://duckduckgo.com/Digital_divide\">${SOME_HEADING2}</a>An economic and social inequality with regard to access to, use of, or impact of information and...`,
        "Icon" : {
          "URL" : "https://duckduckgo.com/i/623c306a.png",
          "Height" : "",
          "Width" : ""
        },
        "FirstURL" : "https://duckduckgo.com/Digital_divide",
        "Text" : "Digital divideAn economic and social inequality with regard to access to, use of, or impact of information and..."
      }]
    };

  let ddgService: DDGService;
  let httpBackend: any;
  let ddgApiHandler: any;
  let $rootScope: any;

  beforeEach(angular.mock.module('duckduckgoApp'));

  beforeEach(inject(function (_DDGService_, $httpBackend, _$rootScope_) {
    ddgService = _DDGService_;
    httpBackend = $httpBackend;
    $rootScope = _$rootScope_;

    ddgApiHandler = httpBackend.when('GET', 'http://api.duckduckgo.com/?format=json&q=test&t=testDuckDuckGoApp').respond(SOME_VALID_RESPONSE);
  }));

  afterEach(() => {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('Get Autocomplete items: getAutocompleteItems', () => {
    it('should be defined', () => {
      expect(ddgService.getAutocompleteItems).toBeDefined();
    });

    it('should invoke HTTP GET and return an array of matches', () => {
      ddgService.getAutocompleteItems(SOME_VALID_QUERY).then(suggestions => {
        expect(suggestions).toEqual([SOME_HEADING1, SOME_HEADING2]);
      });
      httpBackend.flush();
    });

    it('should invoke HTTP GET and return an empty array on error', () => {
      ddgApiHandler.respond(404);
      ddgService.getAutocompleteItems(SOME_VALID_QUERY).catch(suggestions => {
        expect(suggestions).toEqual([]);
      });
      httpBackend.flush();
    });
  });

  describe('Get search disambiguations and results: getResults', () => {
    it('should be defined', () => {
      expect(ddgService.getResults).toBeDefined();
    });

    it('should invoke HTTP GET', () => {
      ddgService.getResults(SOME_VALID_QUERY);
      httpBackend.flush();
    });

    it('should broadcast an object with disambiguations and results', () => {
      let disambiguations = SOME_VALID_RESPONSE.RelatedTopics.map(topic => ResultModel.fromResponse(topic));
      let results = [];
      let broadcastObj = {
        disambiguations, results
      };
      spyOn($rootScope, '$broadcast');

      ddgService.getResults(SOME_VALID_QUERY);
      httpBackend.flush();

      expect($rootScope.$broadcast).toHaveBeenCalledWith(DDGService.ON_CHANGED_BROADCAST, broadcastObj);
    });

    it('should broadcast an object with empty arrays of disambiguations and results on error', () => {
      spyOn($rootScope, '$broadcast');
      ddgApiHandler.respond(404);

      ddgService.getResults(SOME_VALID_QUERY);
      httpBackend.flush();

      expect($rootScope.$broadcast).toHaveBeenCalledWith(DDGService.ON_CHANGED_BROADCAST, {
        disambiguations: [],
        results: []
      });
    });
  });
});
