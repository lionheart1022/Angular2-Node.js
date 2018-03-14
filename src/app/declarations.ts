import { SelectComponent } from './components/select/select.component';
import { HeadlineComponent } from './components/headline/headline.component';
import { AppComponent } from './app.component';

import {
  DialogComponent,
  DialogCreateCaseComponent,
  BackComponent,
  SubcategoryComponent,
  ConfirmComponent,
  SearchComponent,
  DialogVendorComponent,
  FilterComponent,
  LeftMenuComponent
} from './components';

import {
  CaseComponent,
  CaseDetailComponent,
  HomeComponent,
  LoginComponent,
  QueryComponent,
  CaseSearchComponent,
  UserManagementComponent,
  TargetsComponent,
  TargetComponent,
  TargetsSearchComponent,
  HomeTargetsComponent,
  HomeUsersComponent,
  HomeUserStatisticComponent,
  HomeSuccessProfilesComponent,
  HomeSentimentMonitorComponent,
  HomeMonthlyStatisticsComponent,
  HomeTimelineComponent,
  AvatarsComponent,
  AuditTrailComponent,
  TargetDetailComponent,
  ProfileFullDetailsComponent
} from './pages';

import {
  DrugsComponent,
  DrugsDetailsComponent,
  WeaponsComponent,
  WeaponDetailsComponent,
  CounterfeitsComponent,
  CounterfeitsDetailsComponent,
  DocsComponent,
  DocsDetailsComponent,
  EbooksComponent,
  EbooksDetailsComponent,
  ElectronicsComponent,
  ElectronicsDetailsComponent,
  FraudComponent,
  FraudDetailsComponent,
  HackingComponent,
  HackingDetailsComponent,
  IdsPassportsComponent,
  IdsPassportsDetailsComponent,
  MoneyComponent,
  MoneyDetailsComponent,
  ReligionComponent,
  ReligionDetailsComponent,
  SoftwareComponent,
  SoftwareDetailsComponent
} from './pages/categories';

import { WeaponFilterPipe, WeaponLimitPipe, VendorRatingPipe } from './pipes';

import { GoogleChart } from './directives';

import {
  ContentComponent,
  QueryLayoutComponent,
  FooterComponent
} from './layouts';
import {
  ListingsFromUsernameComponent,
  RatingsComponent,
  RgpKeyComponent,
  TermsAndConditionsComponent,
  VendorInformationsComponent
} from './pages/target-detail/profile-full-details';
import { QueryDialogComponent } from './components/dialog/query-dialog/query-dialog.component';

export const AppDeclarations = [
  AppComponent,
  CaseComponent,
  CaseSearchComponent,
  CaseDetailComponent,
  TargetComponent,
  HomeTargetsComponent,
  HomeUsersComponent,
  AvatarsComponent,
  HomeUserStatisticComponent,
  HomeSuccessProfilesComponent,
  HomeSentimentMonitorComponent,
  HomeMonthlyStatisticsComponent,
  AuditTrailComponent,
  HeadlineComponent,
  HomeTimelineComponent,
  LeftMenuComponent,
  SelectComponent,
  TargetsSearchComponent,
  HomeComponent,
  LoginComponent,
  QueryComponent,
  TargetsComponent,
  TargetDetailComponent,
  UserManagementComponent,
  WeaponFilterPipe,
  ProfileFullDetailsComponent,
  ListingsFromUsernameComponent,
  RatingsComponent,
  RgpKeyComponent,
  TermsAndConditionsComponent,
  VendorInformationsComponent,
  VendorRatingPipe,
  WeaponLimitPipe,
  GoogleChart,
  ContentComponent,
  FooterComponent,
  QueryLayoutComponent,
  DrugsComponent,
  DrugsDetailsComponent,
  WeaponsComponent,
  WeaponDetailsComponent,
  CounterfeitsComponent,
  CounterfeitsDetailsComponent,
  DocsComponent,
  DocsDetailsComponent,
  EbooksComponent,
  EbooksDetailsComponent,
  ElectronicsComponent,
  ElectronicsDetailsComponent,
  FraudComponent,
  FraudDetailsComponent,
  HackingComponent,
  HackingDetailsComponent,
  IdsPassportsComponent,
  IdsPassportsDetailsComponent,
  MoneyComponent,
  MoneyDetailsComponent,
  ReligionComponent,
  ReligionDetailsComponent,
  SoftwareComponent,
  SoftwareDetailsComponent,
  /*----- Components -----*/
  DialogComponent,
  DialogCreateCaseComponent,
  BackComponent,
  SubcategoryComponent,
  ConfirmComponent,
  SearchComponent,
  DialogVendorComponent,
  FilterComponent,
  QueryDialogComponent
];
