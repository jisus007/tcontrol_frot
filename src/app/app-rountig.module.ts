import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectorioComponent } from './directorio/directorio.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { TcontrolComponent } from './tcontrol/tcontrol.component';
import { PersonalComponent } from './personal/personal.component';
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
import { AddUbicacionComponent } from './c_ubicacion/add-ubicacion/add-ubicacion.component';
import { EditUbicacionComponent } from './c_ubicacion/edit-ubicacion/edit-ubicacion.component';
import { TrayectoDiaComponent } from './c_ubicacion/trayecto-dia/trayecto-dia.component';
import { LastUbicacionComponent } from './c_ubicacion/last-ubicacion/last-ubicacion.component';
import { TrayectoFechasComponent } from './c_ubicacion/trayecto-fechas/trayecto-fechas.component';

const routes: Routes = [
  { path: 'directorio', component: DirectorioComponent },
  { path: 'main', component: MainComponent},
  { path: 'tcontrol', component: TcontrolComponent},
 
  { path: 'app', component: AppComponent, children:[
    { path: 'list-usuario', component: ListUsuarioComponent },
    { path: 'edit-usuario', component: EditUsuarioComponent },
    { path: 'add-usuario', component: AddUsuarioComponent },
    { path: 'personal', component: PersonalComponent},

    { path: 'objeto', component: ObjetoComponent},
    { path: 'add-objeto', component: AddObjetoComponent },
    { path: 'edit-objeto', component: EditObjetoComponent },
  
  
  
    { path: 'list-grupo', component: ListGrupoComponent },
    { path: 'add-grupo', component: AddGrupoComponent },
    { path: 'edit-grupo', component: EditGrupoComponent },
  
    { path: 'list-parametro', component: ListParametroComponent },
    { path: 'add-parametro', component: AddParametroComponent },
    { path: 'edit-parametro', component: EditParametroComponent },
  
    { path: 'list-tipo', component: ListTipoComponent },
    { path: 'add-tipo', component: AddTipoComponent },
    { path: 'edit-tipo', component: EditTipoComponent },
  
    { path: 'list-ubicacion', component: ListUbicacionComponent, children:[
        { path: 'last-ubicacion', component: LastUbicacionComponent, outlet: 'aux'},
        { path: 'trayecto-dia', component: TrayectoDiaComponent, outlet: 'aux'},
        { path: 'trayecto-fechas', component: TrayectoFechasComponent, outlet: 'aux'},
      ]},
  ]},

  { path: 'login', component: LoginComponent},
  { path: '', component: AppComponent},
  { path: '**', component: AppComponent},
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRountigModule { }
