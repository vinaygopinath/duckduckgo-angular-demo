import 'angular';
import { AppComponent } from './components/app/app';

export function attachComponents(app) {
  app
  .component('app', new AppComponent())
  .component('search', new SearchComponent());
}
