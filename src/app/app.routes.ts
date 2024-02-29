import { Routes } from '@angular/router';
import { HomeComponent } from './Components/pages/home/home.component';
import { ProfileComponent } from './Components/pages/profile/profile.component';
import { LoginComponent } from './Components/pages/login/login.component';
import { SignupComponent } from './Components/pages/signup/signup.component';
import { CreatePostComponent } from './Components/pages/create-post/create-post.component';
import { PostComponent } from './Components/pages/post/post.component';
import { CodeFileComponent } from './Components/pages/code-file/code-file.component';
import { DocumentationOverviewComponent } from './Components/pages/documentation-overview/documentation-overview.component';

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
}, {
    path: 'code/file/:id',
    component: CodeFileComponent,
    title: 'File'
}, {
    path: 'code',
    component: DocumentationOverviewComponent,
    title: 'Overview'
}];
