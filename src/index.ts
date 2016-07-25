import "angular";
import 'angular-route';
require('angular-moment');
import { routes } from './routes';
import { attachComponents } from './components';
import { attachServices } from './services';
import { otherConfig } from './config';

import 'angular-material/angular-material.css';
import "./styles/screen.scss";

const app = angular.module('duckduckgoApp', [require('angular-material'), require('angular-route'),
'angularMoment'])

attachComponents(app);
attachServices(app);

app.config(routes)
.config(otherConfig);


angular.bootstrap(document, ["duckduckgoApp"], {
  strictDi: true
});
