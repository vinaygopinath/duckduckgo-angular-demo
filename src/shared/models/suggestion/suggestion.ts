export class SuggestionModel {
  public fullText: string;
  public displayText: string;

  constructor(displayText: string, fullText: string) {
    this.displayText = displayText;
    this.fullText = fullText;
  }
}
