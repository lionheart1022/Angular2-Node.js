import { GoogleMapService } from './services';
import { config } from './services/config';
import { CasesService } from './services/cases.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxPaginationModule } from 'ngx-pagination';
import {ToolTipModule} from 'angular2-tooltip';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatRadioModule
} from '@angular/material';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { AppDeclarations } from './declarations';

// ----- services -----

// --- auth ---
import {
  AuthenticationService,
  SearchService,
  WindowRef,
  TargetsService,
  AuditTrailService,
  UsersService
} from './services';

// --- case ---
import {
  AddToTheCaseService,
  GetAllCasesService,
  CreateCaseService,
  GetAllTargetsService,
  DeleteCaseService,
  DeleteTargetService,
  ClearCaseService
} from './services/case';

import { ModalService } from './services/modal.service';

// --- subcategory ---
import {
  AllSubcategoriesService,
  CurrentSubcategoriesService,
  SelectedSubcategoriesService
} from './services/subcategory/index';
import { HttpClientModule } from '@angular/common/http';
import { QueryService } from './services/query.service';

// --- subcategory ---
import {
  AllAvatarsService,
  AddAvatarService
} from './services/index';

// --- export ---
import {
  ExportService,
} from './services/index';

import {Avatar, ErrorModel} from "./models";
import {DeleteAvatarService} from "./services/avatar/deleteAvatar.service";
import {EnableAvatarService} from "./services/avatar/enableAvatar.service";
import {DisableAvatarService} from "./services/avatar/disableAvatar.service";
// ----- end services -----
@NgModule({
  declarations: AppDeclarations,
  imports: [
    SimpleNotificationsModule.forRoot(),
    ToolTipModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTableModule,
    MatRadioModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: config.googleMap.key
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthenticationService,
    SearchService,
    TargetsService,
    CasesService,
    GoogleMapService,
    WindowRef,
    ModalService,
    GetAllCasesService,
    CreateCaseService,
    AddToTheCaseService,
    AllSubcategoriesService,
    CurrentSubcategoriesService,
    GetAllTargetsService,
    DeleteCaseService,
    DeleteTargetService,
    ClearCaseService,
    SelectedSubcategoriesService,
    QueryService,
    AuditTrailService,
    UsersService,
    AllAvatarsService,
    AddAvatarService,
    DeleteAvatarService,
    EnableAvatarService,
    DisableAvatarService,
    ExportService,
    /*------Models------*/
    ErrorModel,
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
