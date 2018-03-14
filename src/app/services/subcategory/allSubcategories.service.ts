import { Injectable } from '@angular/core';

@Injectable()
export class AllSubcategoriesService {

  public allSubcategories$ = {
    'drugs': [
      {
        name: 'Synthetic',
        url: 'drugs/synthetic',
      },
      {
        name: 'Natural',
        url: 'drugs/natural'
      },
      {
        name: 'Tablettes',
        url: 'drugs/tablettes',
      },
      {
        name: 'Powder',
        url: 'drugs/powder'
      }
    ],
    'counterfeits': [
      {
        name: 'Accessories',
        url: 'counterfeits/accessories'
      },
      {
        name: 'Other',
        url: 'counterfeits/other',
      }
    ],
    'hacking': [
      {
        name: 'Literature',
        url: 'hacking/literature'
      },
      {
        name: 'Accounts',
        url: 'hacking/accounts'
      },
      {
        name: 'Video',
        url: 'hacking/video'
      },
      {
        name: 'Electronics',
        url: 'hacking/electronics'
      }
    ],
    'religion': [
      {
        name: 'Literature',
        url: 'religion/literature',
      },
      {
        name: 'Accessories',
        url: 'religion/accessories'
      },
      {
        name: 'Societies',
        url: 'religion/societies'
      },
    ],
    'ids_passports': [
      {
        name: 'Driver license',
        url: 'ids_passports/driverLicense'
      },
      {
        name: 'Passport',
        url: 'ids_passports/passport'
      },
      {
        name: 'Government ID',
        url: 'ids_passports/governmentID'
      },
      {
        name: 'Social security',
        url: 'ids_passports/socialSecurity'
      },
      {
        name: 'Medical insurance',
        url: 'ids_passports/medicalInsurance'
      },
    ],
    'money': [
      {
        name: 'Cash out',
        url: 'money/cashOut'
      },
      {
        name: 'Transfer',
        url: 'money/transfer'
      },
      {
        name: 'Paypal',
        url: 'money/paypal'
      },
      {
        name: 'Counterfeit',
        url: 'money/counterfeit'
      },
    ],
    'docs': [
      {
        name: 'University degree',
        url: 'docs/universityDegree'
      },
      {
        name: 'College degree',
        url: 'docs/collegeDegree'
      },
      {
        name: 'School certificate',
        url: 'docs/schoolCertificate'
      },
      {
        name: 'Thesis',
        url: 'docs/thesis'
      },
    ],
    'electronics': [
      {
        name: 'Literature',
        url: 'electronics/literature'
      },
      {
        name: 'Software',
        url: 'electronics/software'
      },
      {
        name: 'Hardware',
        url: 'electronics/hardware'
      },
    ],
    'fraud': [
      {
        name: 'Accounts',
        url: 'fraud/accounts'
      },
      {
        name: 'CC&VV',
        url: 'fraud/cc&vv'
      },
      {
        name: 'Documents & data',
        url: 'fraud/documents&Data'
      },
    ],
    'eBooks': [
      {
        name: 'Manuals',
        url: 'eBooks/manuals'
      },
      {
        name: 'Leaks',
        url: 'eBooks/leaks'
      },
      {
        name: 'Education',
        url: 'eBooks/education'
      },
      {
        name: 'Antiques',
        url: 'eBooks/antiques'
      },
    ],
    'blockchain': [
      {
        name: 'Address',
        url: 'blockchain/address'
      },
      {
        name: 'Hash',
        url: 'blockchain/hash'
      }
    ],
  };

  constructor(
  ) { }

  getSubCat(page) {
    return this.allSubcategories$[page];
  }
}
