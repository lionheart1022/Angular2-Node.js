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
} from './pages';

import {
  DrugsComponent,
  WeaponsComponent,
  CounterfeitsComponent,
  DocsComponent,
  EbooksComponent,
  ElectronicsComponent,
  FraudComponent,
  HackingComponent,
  IdsPassportsComponent,
  MoneyComponent,
  ReligionComponent,
  SoftwareComponent,
} from './pages/categories';
import {
  QueryLayoutComponent,
  ContentComponent,
} from './layouts';
import { AuthenticationService } from './services';


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
    path: 'login',
    component: LoginComponent,
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
                path: 'weapons',
                component: WeaponsComponent,
              },
              {
                path: 'drugs',
                children: [
                  {
                    path: ':subcategory',
                    component: DrugsComponent,
                  }
                ]
              },
              {
                path: 'counterfeits',
                children: [
                  {
                    path: ':subcategory',
                    component: CounterfeitsComponent,
                  }
                ]
              },
              {
                path: 'docs',
                children: [
                  {
                    path: ':subcategory',
                    component: DocsComponent,
                  }
                ]
              },
              {
                path: 'eBooks',
                children: [
                  {
                    path: ':subcategory',
                    component: EbooksComponent,
                  }
                ]
              },
              {
                path: 'electronics',
                children: [
                  {
                    path: ':subcategory',
                    component: ElectronicsComponent,
                  }
                ]
              },
              {
                path: 'fraud',
                children: [
                  {
                    path: ':subcategory',
                    component: FraudComponent,
                  }
                ]
              },
              {
                path: 'hacking',
                children: [
                  {
                    path: ':subcategory',
                    component: HackingComponent,
                  }
                ]
              },
              {
                path: 'ids_passports',
                children: [
                  {
                    path: ':subcategory',
                    component: IdsPassportsComponent,
                  }
                ]
              },
              {
                path: 'money',
                children: [
                  {
                    path: ':subcategory',
                    component: MoneyComponent,
                  }
                ]
              },
              {
                path: 'religion',
                children: [
                  {
                    path: ':subcategory',
                    component: ReligionComponent,
                  }
                ]
              },
              {
                path: 'blockchain',
                children: [
                  {
                    path: ':subcategory',
                    component: SoftwareComponent,
                  }
                ]
              },
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
