import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { CreatePostComponent } from './Components/create-post/create-post.component';
import { PostComponent } from './Components/post/post.component';

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
    title: 'Login'
},
{
    path: 'signup',
    component: SignupComponent,
    title: 'Signup'
}, 
{
    path: 'create-post',
    component: CreatePostComponent,
    title: 'Create a post'
}, {
    path: 'post/:id',
    component: PostComponent,
    title: 'Post'
}];
