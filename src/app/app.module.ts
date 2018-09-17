import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { FlexLayoutModule} from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, DatePipe }   from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction' 

// Angular Material Modules
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule, MatInputModule, MAT_DATE_LOCALE } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule, MatSortModule, MatTableDataSource} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRountigModule } from './app-rountig.module';
import { MainComponent } from './main/main.component';
import { MatDialogModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { LastUbicacionComponent } from './c_ubicacion/last-ubicacion/last-ubicacion.component';
import { TrayectoDiaComponent } from './c_ubicacion/trayecto-dia/trayecto-dia.component';
import { TrayectoFechasComponent } from './c_ubicacion/trayecto-fechas/trayecto-fechas.component';
import { AlertComponent } from './alert/alert.component';
import { CustomHttpInterceptor } from './customHttpInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DialogComponent,
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
    LastUbicacionComponent,
    TrayectoDiaComponent,
    TrayectoFechasComponent,
    AlertComponent,
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
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTabsModule,
    AgmDirectionModule,
    MatSidenavModule,
    MatMenuModule,
    MatProgressBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDukpIc-86ezs8umS8kOxxRz5yc8HpxVWg'
    })

  ],
  providers: [DialogComponent,AlertComponent,MatDatepickerModule,{provide: MAT_DATE_LOCALE, useValue: 'en-GB'},DatePipe,
 CustomHttpInterceptor,
 {
  provide: HTTP_INTERCEPTORS,
  useClass: CustomHttpInterceptor,
   multi: true
 }
],
  bootstrap: [AppComponent],
  exports: [ DialogComponent,AlertComponent ],
  entryComponents: [DialogComponent,AlertComponent]
})
export class AppModule  {


 }



 
 