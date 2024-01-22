import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';

export const routes: Routes = [{
    path: '',
    component: HomeComponent,
    title: 'Home'
}, {
    path: 'profile/:id',
    component: ProfileComponent,
    title: 'Profile'
}];
