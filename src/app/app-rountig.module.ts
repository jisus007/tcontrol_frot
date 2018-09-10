import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { ObjetoComponent } from './objeto/objeto.component';
import { AddObjetoComponent } from './c_objeto/add-objeto/add-objeto.component';
import { EditObjetoComponent } from './c_objeto/edit-objeto/edit-objeto.component';
import { ListUsuarioComponent } from './c_usuario/list-usuario/list-usuario.component';
import { EditUsuarioComponent } from './c_usuario/edit-usuario/edit-usuario.component';
import { AddUsuarioComponent } from './c_usuario/add-usuario/add-usuario.component';
import { ListGrupoComponent } from './c_grupo/list-grupo/list-grupo.component';
import { AddGrupoComponent } from './c_grupo/add-grupo/add-grupo.component';
import { EditGrupoComponent } from './c_grupo/edit-grupo/edit-grupo.component';
import { ListParametroComponent } from './c_parametro/list-parametro/list-parametro.component';
import { AddParametroComponent } from './c_parametro/add-parametro/add-parametro.component';
import { EditParametroComponent } from './c_parametro/edit-parametro/edit-parametro.component';
import { ListTipoComponent } from './c_tipo/list-tipo/list-tipo.component';
import { AddTipoComponent } from './c_tipo/add-tipo/add-tipo.component';
import { EditTipoComponent } from './c_tipo/edit-tipo/edit-tipo.component';
import { ListUbicacionComponent } from './c_ubicacion/list-ubicacion/list-ubicacion.component';
import { TrayectoDiaComponent } from './c_ubicacion/trayecto-dia/trayecto-dia.component';
import { LastUbicacionComponent } from './c_ubicacion/last-ubicacion/last-ubicacion.component';
import { TrayectoFechasComponent } from './c_ubicacion/trayecto-fechas/trayecto-fechas.component';
import { AuthGuard } from './authGuard';

const routes: Routes = [


 
  { path: 'app', component: AppComponent, children:[
    { path: 'list-usuario', component: ListUsuarioComponent , canActivate: [AuthGuard]},
    { path: 'edit-usuario', component: EditUsuarioComponent, canActivate: [AuthGuard] },
    { path: 'add-usuario', component: AddUsuarioComponent , canActivate: [AuthGuard]},

    { path: 'objeto', component: ObjetoComponent, canActivate: [AuthGuard]},
    { path: 'add-objeto', component: AddObjetoComponent, canActivate: [AuthGuard] },
    { path: 'edit-objeto', component: EditObjetoComponent , canActivate: [AuthGuard]},
    
    { path: 'list-grupo', component: ListGrupoComponent , canActivate: [AuthGuard]},
    { path: 'add-grupo', component: AddGrupoComponent, canActivate: [AuthGuard] },
    { path: 'edit-grupo', component: EditGrupoComponent, canActivate: [AuthGuard] },
  
    { path: 'list-parametro', component: ListParametroComponent , canActivate: [AuthGuard]},
    { path: 'add-parametro', component: AddParametroComponent, canActivate: [AuthGuard] },
    { path: 'edit-parametro', component: EditParametroComponent, canActivate: [AuthGuard] },
  
    { path: 'list-tipo', component: ListTipoComponent , canActivate: [AuthGuard]},
    { path: 'add-tipo', component: AddTipoComponent , canActivate: [AuthGuard]},
    { path: 'edit-tipo', component: EditTipoComponent , canActivate: [AuthGuard]},
    { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  
    { path: 'list-ubicacion', component: ListUbicacionComponent, children:[
        { path: 'last-ubicacion', component: LastUbicacionComponent, canActivate: [AuthGuard], outlet: 'aux'},
        { path: 'trayecto-dia', component: TrayectoDiaComponent, canActivate: [AuthGuard], outlet: 'aux'},
        { path: 'trayecto-fechas', component: TrayectoFechasComponent, canActivate: [AuthGuard], outlet: 'aux'},
      ] , canActivate: [AuthGuard]},
  ]},

  { path: 'login', component: LoginComponent},
  { path: '', component: AppComponent, canActivate: [AuthGuard]},
  { path: '**', component: AppComponent, canActivate: [AuthGuard]},
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRountigModule { }
