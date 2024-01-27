import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';

export const routes: Routes = [{
    path: '',
    component: HomeComponent,
    title: 'Home'
}, 
{
    path: 'profile/:id',
    component: ProfileComponent,
    title: 'Profile'
},
{
    path: 'login',
    component: LoginComponent,
    title: 'login'
},
{
    path: 'signup',
    component: SignupComponent,
    title: 'signup'
},
{
    path: 'edit-profile',
    component: EditProfileComponent,
    title: 'edit-profile'
}];
