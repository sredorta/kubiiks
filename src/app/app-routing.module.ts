import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },  
  {
    path: 'blog',
    loadChildren : () => import('./routes/blog/blog/blog.module').then(m => m.BlogModule), 
    pathMatch: 'full'
  }, 
  {
    path: 'contact',
    loadChildren : () => import('./routes/contact/contact/contact.module').then(m => m.ContactModule), 
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren : () => import('./routes/login/login/login.module').then(m => m.LoginModule), 
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren : () => import('./routes/signup/signup/signup.module').then(m => m.SignupModule), 
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{initialNavigation:'enabled'})],//, scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
