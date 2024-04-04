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
import { MyConfsComponent } from './components/my-confs/my-confs.component';
import { OneConferComponent } from './components/one-confer/one-confer.component';
import { UserComponent } from './layouts/user/user.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { AllConferenccesComponent } from './components/all-conferencces/all-conferencces.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { UserConfsComponent } from './components/user-confs/user-confs.component';

const routes: Routes = [
  {
    path:'user',
    component: UserComponent,
    children:[
      {
        path:'login',
        component: LoginComponent,
        title :'Login'
      },
      {
        path:'register',
        component: RegisterComponent,
        title:'Register'
      },
      {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
      }
    ]
  },
  {
    path:'auth',
    component:AuthComponent,
    children:[
      {
        path: 'home', 
        component: HomeComponent, 
        title:'Home'
      },
      {
        path: 'confer/details/:title', 
        component: DetailConfComponent
      },
      {
        path: 'confer/add', 
        component: TestBackComponent, 
        canActivate:[authGuard],
        data:{roles:["Conferencista"]}
      },
      {
        path: 'myconfs', 
        component: MyConfsComponent, 
        canActivate:[authGuard],
        data:{roles:["Conferencista"]}
      },
      {
        path: 'confer/:id', 
        component:OneConferComponent 
      },
      {
        path: 'administradores', 
        component: AdministradoresComponent,
        canActivate:[authGuard],
        data:{roles:["admin"]}
      },
      {
        path: 'horarios', 
        component: SchedulesComponent,
        canActivate:[authGuard],
        data:{roles:["admin"]}
      },
      {
        path: 'all-confs', 
        component: AllConferenccesComponent,
        canActivate:[authGuard],
        data:{roles:["admin"]}
      },
      {
        path:'statistics',
        component:StatisticsComponent,
        title:'Estadisticas'
      },
      {
        path:'myassist',
        component:UserConfsComponent,
        title:'Asistecias'
      },
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      }
    ]
  },
  {
    path: 'creditos', 
    component: CreditosComponent
  },
  {path: '', redirectTo: '/auth/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }