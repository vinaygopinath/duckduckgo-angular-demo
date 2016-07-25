import { DDGService, HistoryService } from './shared/services';

export function attachServices(app) {
  app
  .service('DDGService', DDGService)
  .service('HistoryService', HistoryService);
}
