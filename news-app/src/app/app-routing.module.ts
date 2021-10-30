import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReadLaterComponent } from './components/read-later/read-later.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegistrationComponent
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate: [LoginGuard]
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path:'read-later',
    component: ReadLaterComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
