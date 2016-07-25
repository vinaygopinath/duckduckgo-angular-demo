export class QueryModel {
  public query: string;
  public timestamp: Date;

  constructor(query: string) {
    this.query = query;
    this.timestamp = new Date();
  }
}
