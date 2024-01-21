import { bootstrapApplication } from '@angular/platform-browser';
import { HeaderComponent } from './app/Components/header/header.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(HeaderComponent, config);

export default bootstrap;
