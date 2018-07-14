import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectorioComponent } from './directorio/directorio.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { TcontrolComponent } from './tcontrol/tcontrol.component';
import { PersonalComponent } from './personal/personal.component';

const routes: Routes = [
  { path: 'directorio', component: DirectorioComponent },
  { path: 'main', component: MainComponent},
  { path: 'tcontrol', component: TcontrolComponent},
  { path: 'login', component: LoginComponent},
  { path: 'app', component: AppComponent},
  { path: 'personal', component: PersonalComponent},
  { path: '', component: AppComponent},
  { path: '**', component: AppComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRountigModule { }
