import { ResultModel } from './result';

const SOME_HEADING = 'Digital camera';
const SOME_DESCRIPTION = 'A camera that encodes digital images and videos digitally and stores them for later reproduction.'
const SOME_URL = 'https://duckduckgo.com/Digital_camera';
const SOME_IMAGE_URL = 'https://duckduckgo.com/i/a795ae19.jpg';
const SOME_CATEGORY = 'Technology';
const SOME_VALID_RESPONSE = {
  Icon: {
    URL: SOME_IMAGE_URL
  },
  FirstURL: SOME_URL,
  Result: `<a href=\"${SOME_URL}\">${SOME_HEADING}</a>${SOME_DESCRIPTION}`
};
const SOME_EMPTY_RESPONSE = {};
let resultModel: ResultModel;

describe('Model: ResultModel', () => {
  beforeEach( () => {
    resultModel = new ResultModel();
  });

  describe('Create from response: fromResponse', () => {
    it('should be defined', () => {
      expect(ResultModel.fromResponse).toBeDefined();
    });

    it('should throw an error when given an undefined response', () => {
      expect(() => ResultModel.fromResponse(undefined)).toThrow();
    });

    it('should default all properties to empty strings', () => {
      let result = ResultModel.fromResponse(SOME_EMPTY_RESPONSE);
      expect(result.heading).toBeUndefined();
      expect(result.description).toBeUndefined();
      expect(result.category).toBeUndefined();
      expect(result.url).toBeUndefined();
      expect(result.image).toBeUndefined();
    });

    describe('Data extraction', () => {
      let result;
      beforeEach(() => {
        result = ResultModel.fromResponse(SOME_VALID_RESPONSE, SOME_CATEGORY);
      });

      it('should extract the image URL, if any', () => {
        expect(result.image).toBe(SOME_IMAGE_URL);
      });

      it('should extract the URL, if any', () => {
        expect(result.url).toBe(SOME_URL);
      });

      it('should extract the heading', () => {
        expect(result.heading).toBe(SOME_HEADING);
      });

      it('should extract the description', () => {
        expect(result.description).toBe(SOME_DESCRIPTION);
      });

      it('should extract the category, if any', () => {
        expect(result.category).toBe(SOME_CATEGORY);
      });
    });
  });
});
