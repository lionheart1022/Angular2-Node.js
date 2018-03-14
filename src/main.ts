///<reference path="../node_modules/@types/node/index.d.ts" />
import './styles';
require('chart.js/src/chart.js');
require('requirejs/require.js');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app';

platformBrowserDynamic().bootstrapModule(AppModule);