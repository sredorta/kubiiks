import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';


const routes: Routes = [
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
    component: BlogComponent,
    pathMatch: 'full'
  }, 
  {
    path: 'contact',
    component: ContactComponent,
    pathMatch: 'full'
  },
  {
    path: 'lazy',
    //loadChildren: './lazy/lazy.module#LazyModule', // use this syntax for non-ivy or Angular 7 and below
    loadChildren : () => import('./lazy/lazy.module').then(m => m.LazyModule), // new dynamic import method
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{initialNavigation:'enabled'})],//, scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
