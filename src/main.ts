import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HeaderComponent } from './app/Components/standalone/header/header.component';
import { AppComponent } from './app/app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
