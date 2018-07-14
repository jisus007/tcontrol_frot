import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule }   from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
//import { ChartistModules } from 'ng-chartist';
//import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';
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


@NgModule({
  declarations: [
    AppComponent,
    DirectorioComponent,
    LoginComponent,
    MainComponent,
    TcontrolComponent,
    DialogComponent,
    PersonalComponent,
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
    MatGridListModule
  ],
  providers: [DirectorioService,DialogComponent],
  bootstrap: [AppComponent],
  exports: [ DialogComponent ]
})
export class AppModule {


 }
