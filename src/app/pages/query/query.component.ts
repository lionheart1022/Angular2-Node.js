import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'query',
  templateUrl: 'query.component.html',
  styleUrls: ['query.scss']
})

export class QueryComponent {

  numberOfBlocks: number = 12;

  categories = [
    {
      name: 'Weapons',
      page: '/query/weapons',
      icon: '/img/svg/weapons.svg',
    },
    {
      name: 'Drugs',
      page: '/query/drugs/synthetic',
      icon: 'img/svg/drugs.svg',
    },
    {
      name: 'Counterfeits',
      page: '/query/counterfeits/accessories',
      icon: 'img/svg/counterfeits.svg',
    },
    {
      name: 'Hacking',
      page: '/query/hacking/literature',
      icon: 'img/svg/hacking.svg',
    },
    {
      name: 'Religion',
      page: '/query/religion/literature',
      icon: 'img/svg/religion.svg',
    },
    {
      name: 'IDs & Passports',
      page: '/query/ids_passports/passport',
      icon: 'img/svg/idpass.svg',
    },
    {
      name: 'Docs',
      page: '/query/docs/thesis',
      icon: 'img/svg/docs.svg',
    },
    {
      name: 'Money',
      page: '/query/money/paypal',
      icon: 'img/svg/money.svg',
    },
    {
      name: 'Electronics',
      page: '/query/electronics/software',
      icon: 'img/svg/electronics.svg',
    },
    {
      name: 'Fraud',
      page: '/query/fraud/accounts',
      icon: 'img/svg/fraud.svg',
    },
    {
      name: 'E-Books',
      page: '/query/eBooks/manuals',
      icon: 'img/svg/e-books.svg',
    },
    {
      name: 'Blockchain',
      page: '/query/blockchain/address',
      icon: 'img/svg/blockchain.svg',
    },
  ];

  constructor(
    private router: Router
  ) { }


  showMore(page): void {
    this.router.navigate([page]);
  }
}
