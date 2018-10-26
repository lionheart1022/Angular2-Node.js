import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CaseComponent,
  CaseDetailComponent,
  HomeComponent,
  LoginComponent,
  QueryComponent,
  UserManagementComponent,
  TargetsComponent,
  AvatarsComponent,
  AuditTrailComponent,
  TargetDetailComponent,
  VendorInformationsComponent,
  TermsAndConditionsComponent,
  RgpKeyComponent,
  ListingsFromUsernameComponent,
  RatingsComponent,
  TransactionsComponent,
  TargetDetailBlockcheinComponent
} from './pages';

import {
  DrugsComponent,
  WeaponsComponent,
  CounterfeitsComponent,
  DocsComponent,
  EbooksComponent,
  DigitalGoodsComponent,
  FraudComponent,
  HackingComponent,
  IdsPassportsComponent,
  MoneyComponent,
  ReligionComponent,
  SoftwareComponent, TicketsAndBookingsComponent, BlockchainComponent,
} from './pages/categories';
import {
  QueryLayoutComponent,
  ContentComponent,
} from './layouts';
import { AuthenticationService } from './services';
import {BankingComponent} from "./pages/categories/banking/banking.component";
import {PrescriptionComponent} from "./pages/categories/prescription/prescription.component";
import {SecurityAndHostingComponent} from "./pages/categories/securityAndHosting/securityAndHosting.component";
import {ServicesComponent} from "./pages/categories/services/services.component";
import {SteroidsComponent} from "./pages/categories/steroids/steroids.component";
import {LuxuryComponent} from "./pages/categories/luxury/luxury.component";
import {HardwareComponent} from "./pages/categories/hardware/hardware.component";
import {GuidesAndTutorialsComponent} from "./pages/categories/guidesAndTutorials/guidesAndTutorials.component";
import {FashionComponent} from "./pages/categories/fashion/fashion.component";
import {CardingWareComponent} from "./pages/categories/cardingWare/cardingWare.component";
import {OtherComponent} from "./pages/categories/other/other.component";


export let routes: Routes = [
  {
    path: 'user-management',
    component: UserManagementComponent,
  },
  {
    path: 'avatars',
    component: AvatarsComponent,
  },
  {
    path: 'audit-trail',
    component: AuditTrailComponent,
  },
  {
    path: 'lg',
    // component: LoginComponent,
    loadChildren: './login/login-routing.module#LoginRoutingModule'

  },
  {
    path: 'home',
    canActivate: [AuthenticationService],
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },



  // ------ with layout Content ----

  {
    path: '',
    component: ContentComponent,
    canActivate: [AuthenticationService],
    children: [
      {
        path: 'targets',
        component: TargetsComponent,
        children: [
          {
            path: '',
            component: TargetsComponent,
          },
        ]
      },
      {
        path: 'targets/:id',
        component: TargetDetailComponent,
        children: [
          {
            path: '',
            component: VendorInformationsComponent,
          },
          {
            path: 'vendor-information',
            component: VendorInformationsComponent,
          },
          {
            path: 'terms-and-conditions',
            component: TermsAndConditionsComponent,
          },
          {
            path: 'rgp-key',
            component: RgpKeyComponent,
          },
          {
            path: 'listings-from-username',
            component: ListingsFromUsernameComponent,
          },
          {
            path: 'ratings',
            component: RatingsComponent,
          },
        ]
      },
      {
        path: 'targets/blockchain/:id',
        component: TargetDetailBlockcheinComponent,
        children: [
          {
            path: 'transactions',
            component: TransactionsComponent,
          },
        ]
      },
      {
        path: 'cases',
        component: CaseComponent,
        data: { who: 'test' },
        children: [
          {
            path: '',
            component: CaseComponent,
          },
        ]
      },
      {
        path: 'cases/:id',
        component: CaseDetailComponent,
      },
      {
        path: 'query',
        children: [
          {
            path: '',
            component: QueryComponent,
          },
          {
            path: '',
            component: QueryLayoutComponent,
            children: [
              {
                path: 'drugs',
                component: DrugsComponent,
              },
              {
                path: 'drugs/:subcategory',
                component: DrugsComponent,
              },
              {
                path: 'blockchain',
                component: BlockchainComponent,
              },
              {
                path: 'blockchain/:subcategory',
                component: BlockchainComponent,
              },
              {
                path: 'counterfeits',
                component: CounterfeitsComponent,
              },
              {
                path: 'counterfeits/:subcategory',
                component: CounterfeitsComponent,
              },
              {
                path: 'documents',
                component: DocsComponent,
              },
              {
                path: 'documents/:subcategory',
                component: DocsComponent,
              },
              {
                path: 'eBooks',
                component: EbooksComponent,
              },
              {
                path: 'eBooks/:subcategory',
                component: EbooksComponent,
              },
              {
                path: 'digitalGoods',
                component: DigitalGoodsComponent,
              },
              {
                path: 'digitalGoods/:subcategory',
                component: DigitalGoodsComponent,
              },
              {
                path: 'software',
                component: SoftwareComponent,
              },
              {
                path: 'software/:subcategory',
                component: SoftwareComponent,
              },
              {
                path: 'steroids',
                component: SteroidsComponent,
              },
              {
                path: 'steroids/:subcategory',
                component: SteroidsComponent,
              },
              {
                path: 'fashion',
                component: FashionComponent,
              },
              {
                path: 'fashion/:subcategory',
                component: FashionComponent,
              },
              {
                path: 'cardingWare',
                component: CardingWareComponent,
              },
              {
                path: 'cardingWare/:subcategory',
                component: CardingWareComponent,
              },
              {
                path: 'hardware',
                component: HardwareComponent,
              },
              {
                path: 'hardware/:subcategory',
                component: HardwareComponent,
              },
              {
                path: 'guidesAndTutorials',
                component: GuidesAndTutorialsComponent,
              },
              {
                path: 'guidesAndTutorials/:subcategory',
                component: GuidesAndTutorialsComponent,
              },
              {
                path: 'luxury',
                component: LuxuryComponent,
              },
              {
                path: 'luxury/:subcategory',
                component: LuxuryComponent,
              },
              {
                path: 'ticketsAndBookings',
                component: TicketsAndBookingsComponent,
              },
              {
                path: 'ticketsAndBookings/:subcategory',
                component: TicketsAndBookingsComponent,
              },
              {
                path: 'services',
                component: ServicesComponent,
              },
              {
                path: 'services/:subcategory',
                component: ServicesComponent,
              },
              {
                path: 'securityAndHosting',
                component: SecurityAndHostingComponent,
              },
              {
                path: 'securityAndHosting/:subcategory',
                component: SecurityAndHostingComponent,
              },
              {
                path: 'fraud',
                component: FraudComponent,
              },
              {
                path: 'fraud/:subcategory',
                component: FraudComponent,
              },
              {
                path: 'prescription',
                component: PrescriptionComponent,
              },
              {
                path: 'prescription/:subcategory',
                component: PrescriptionComponent,
              },
              {
                path: 'hacking',
                component: HackingComponent,
              },
              {
                path: 'hacking/:subcategory',
                component: HackingComponent,

              },
              {
                path: 'banking',
                component: BankingComponent,
              },
              {
                path: 'banking/:subcategory',
                component: BankingComponent,

              },
              {
                path: 'other',
                component: OtherComponent,
              },
              {
                path: 'other/:subcategory',
                component: OtherComponent,

              },
              {
                path: 'weapons',
                component: WeaponsComponent,
              },
              {
                path: 'weapons/:subcategory',
                component: WeaponsComponent,

              },
              // {
              //   path: 'ids_passports',
              //   children: [
              //     {
              //       path: ':subcategory',
              //       component: IdsPassportsComponent,
              //     }
              //   ]
              // },
              // {
              //   path: 'banking',
              //   children: [
              //     {
              //       path: ':subcategory',
              //       component: MoneyComponent,
              //     }
              //   ]
              // },
              // {
              //   path: 'religion',
              //   children: [
              //     {
              //       path: ':subcategory',
              //       component: ReligionComponent,
              //     }
              //   ]
              // },
              // {
              //   path: 'blockchain',
              //   children: [
              //     {
              //       path: ':subcategory',
              //       component: SoftwareComponent,
              //     }
              //   ]
              // },
            ]
          },

        ]

      },

    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
