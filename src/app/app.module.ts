import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule }   from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';

// Angular Material Modules
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule, MatSortModule, MatTableDataSource} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';

import { AppComponent } from './app.component';
import { DirectorioComponent } from './directorio/directorio.component';
import { LoginComponent } from './login/login.component';
import { AppRountigModule } from './/app-rountig.module';
import { MainComponent } from './main/main.component';
import { TcontrolComponent } from './tcontrol/tcontrol.component';
import { MatDialogModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectorioService } from './_services/directorio.service';
import { PersonalComponent } from './personal/personal.component';
import { ObjetoComponent } from './objeto/objeto.component';
import { AddObjetoComponent } from './c_objeto/add-objeto/add-objeto.component';
import { EditObjetoComponent } from './c_objeto/edit-objeto/edit-objeto.component';
import { ListUsuarioComponent } from './c_usuario/list-usuario/list-usuario.component';
import { AddUsuarioComponent } from './c_usuario/add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './c_usuario/edit-usuario/edit-usuario.component';
import { ListGrupoComponent } from './c_grupo/list-grupo/list-grupo.component';
import { AddGrupoComponent } from './c_grupo/add-grupo/add-grupo.component';
import { EditGrupoComponent } from './c_grupo/edit-grupo/edit-grupo.component';
import { ListTipoComponent } from './c_tipo/list-tipo/list-tipo.component';
import { AddTipoComponent } from './c_tipo/add-tipo/add-tipo.component';
import { EditTipoComponent } from './c_tipo/edit-tipo/edit-tipo.component';
import { EditParametroComponent } from './c_parametro/edit-parametro/edit-parametro.component';
import { ListParametroComponent } from './c_parametro/list-parametro/list-parametro.component';
import { AddParametroComponent } from './c_parametro/add-parametro/add-parametro.component';
import { ListUbicacionComponent } from './c_ubicacion/list-ubicacion/list-ubicacion.component';
import { AddUbicacionComponent } from './c_ubicacion/add-ubicacion/add-ubicacion.component';
import { EditUbicacionComponent } from './c_ubicacion/edit-ubicacion/edit-ubicacion.component';


@NgModule({
  declarations: [
    AppComponent,
    DirectorioComponent,
    LoginComponent,
    MainComponent,
    TcontrolComponent,
    DialogComponent,
    PersonalComponent,
    ObjetoComponent,
    AddObjetoComponent,
    EditObjetoComponent,
    ListUsuarioComponent,
    AddUsuarioComponent,
    EditUsuarioComponent,
    ListGrupoComponent,
    AddGrupoComponent,
    EditGrupoComponent,
    ListTipoComponent,
    AddTipoComponent,
    EditTipoComponent,
    EditParametroComponent,
    ListParametroComponent,
    AddParametroComponent,
    ListUbicacionComponent,
    AddUbicacionComponent,
    EditUbicacionComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AppRountigModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    NgbModule,
    MatExpansionModule,
    MatGridListModule,
    FlexLayoutModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DirectorioService,DialogComponent,MatDatepickerModule],
  bootstrap: [AppComponent],
  exports: [ DialogComponent ]
})
export class AppModule {
 }



 
 