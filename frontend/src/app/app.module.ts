import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


// Componentes de Pantallas
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AdministradoresComponent } from './components/administradores/administradores.component';
import { HomeComponent } from './components/home/home.component';
import { CreditosComponent } from './components/creditos/creditos.component';
import { TestBackComponent } from './components/test-back/test-back.component';
import { TstHeaderComponent } from './components/tst-header/tst-header.component';
import { CrmConfersComponent } from './components/crm-confers/crm-confers.component';
import { ConferencesComponent } from './components/conferences/conferences.component';
import { DetailConfComponent } from './components/detail-conf/detail-conf.component';
import { MyConfsComponent } from './components/my-confs/my-confs.component';
import { OneConferComponent } from './components/one-confer/one-confer.component';
import { UserComponent } from './layouts/user/user.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { AllConferenccesComponent } from './components/all-conferencces/all-conferencces.component';
import { FilterComponent } from './components/filter/filter.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { UserConfsComponent } from './components/user-confs/user-confs.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    AdministradoresComponent,
    HomeComponent,
    CreditosComponent,
    TestBackComponent,
    CrmConfersComponent,
    TstHeaderComponent,
    ConferencesComponent,
    DetailConfComponent,
    MyConfsComponent,
    OneConferComponent,
    UserComponent,
    AuthComponent,
    SchedulesComponent,
    AllConferenccesComponent,
    FilterComponent,
    StatisticsComponent,
    GraphicComponent,
    UserConfsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
