import { CasesService } from './services/cases.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxPaginationModule } from 'ngx-pagination';
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
  MatFormFieldModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,

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
  TargetsService
} from './services';

// --- case ---
import {
  AddToTheCaseService,
  GetAllCasesService,
  CreateCaseService,
  GetAllTargetsService,
  DeleteCaseService,
  DeleteTargetService,
  ClearCaseService,
} from './services/case';

import { ModalService } from './services/modal.service';

// --- subcategory ---
import {
  AllSubcategoriesService,
  CurrentSubcategoriesService,
  SelectedSubcategoriesService
} from './services/subcategory/index';
import { HttpClientModule } from '@angular/common/http';
import {QueryService} from './services/query.service';
// ----- end services -----
@NgModule({
  declarations: AppDeclarations,
  imports: [
    SimpleNotificationsModule.forRoot(),
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
    MatPaginatorModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthenticationService,
    SearchService,
    TargetsService,
    CasesService,
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
    QueryService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
