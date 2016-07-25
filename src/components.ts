import 'angular';
import { AppComponent } from './components/app/app';
import { SearchComponent } from './components/search/search';
import { HistoryComponent } from './components/history/history';
import { DisambiguationListComponent } from './components/disambiguation-list/disambiguation-list';
import { DisambiguationComponent } from './components/disambiguation/disambiguation';
import { ResultListComponent } from './components/result-list/result-list';

export function attachComponents(app) {
  app
  .component('app', new AppComponent())
  .component('search', new SearchComponent())
  .component('history', new HistoryComponent())
  .component('disambiguationList', new DisambiguationListComponent())
  .component('disambiguation', new DisambiguationComponent())
  .component('resultList', new ResultListComponent());
}
