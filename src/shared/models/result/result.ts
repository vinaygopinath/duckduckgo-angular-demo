export class ResultModel {
  private static REGEX_RESULT = /.*">(.*)<\/a>(.*)/;
  public heading: string;
  public description: string;
  public category: string;
  public url: string;
  public image: string;

  public static fromResponse(res: any, category?: string) {
    if (!res) {
      throw new Error('Invalid result object!');
    }
    let result = new ResultModel();
    if (res.Icon && res.Icon.URL) {
      result.image = res.Icon.URL;
    }
    if (res.FirstURL) {
      result.url = res.FirstURL;
    }

    if (res.Result) {
      let matches = res.Result.match(ResultModel.REGEX_RESULT);
      if (matches.length === 3) {
        result.heading = matches[1];
        result.description = matches[2];
      }
    }
    if (category) {
      result.category = category;
    }
    return result;
  }
}
