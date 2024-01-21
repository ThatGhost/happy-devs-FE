import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HeaderComponent } from './app/Components/header/header.component';

bootstrapApplication(HeaderComponent, appConfig)
  .catch((err) => console.error(err));
