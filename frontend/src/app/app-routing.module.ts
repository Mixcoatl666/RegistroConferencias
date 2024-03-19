import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CreditosComponent } from './components/creditos/creditos.component';
import { AdministradoresComponent } from './components/administradores/administradores.component';
import { TestBackComponent } from './components/test-back/test-back.component';
import { DetailConfComponent } from './components/detail-conf/detail-conf.component';

const routes: Routes = [
  {path: 'administradores', component: AdministradoresComponent},
  {path: 'creditos', component: CreditosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate:[authGuard]},
  {path: 'confer/add', component: TestBackComponent, canActivate:[authGuard]},
  {path: 'confer/details/:title', component: DetailConfComponent},
  {path: '', redirectTo: 'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }