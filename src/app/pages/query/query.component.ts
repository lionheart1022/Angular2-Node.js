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
      name: 'Drugs',
      page: '/query/drugs/all',
      icon: 'img/svg/drugs.svg',
    },
    {
      name: 'Counterfeits',
      page: '/query/counterfeits/accessories',
      icon: 'img/svg/counterfeits.svg',
    },
    {
      name: 'Hacking',
      page: '/query/hacking/all',
      icon: 'img/svg/hacking.svg',
    },
    {
      name: 'Weapons',
      page: '/query/weapons',
      icon: 'img/svg/weapons.svg',
    },
    // {
    //   name: 'IDs & Passports',
    //   page: '/query/ids_passports/passport',
    //   icon: 'img/svg/idpass.svg',
    // },
    {
      name: 'Documents',
      page: '/query/documents/all',
      icon: 'img/svg/docs.svg',
    },
    {
      name: 'Banking',
      page: '/query/banking/all',
      icon: 'img/svg/money.svg',
    },
    {
      name: 'DigitalGoods',
      page: '/query/digitalGoods/all',
      icon: 'img/svg/electronics.svg',
    },
    {
      name: 'Software',
      page: '/query/software/all',
      icon: 'img/svg/Software.svg',
    },
    {
      name: 'Fraud',
      page: '/query/fraud/all',
      icon: 'img/svg/fraud.svg',
    },
    // {
    //   name: 'E-Books',
    //   page: '/query/eBooks/all',
    //   icon: 'img/svg/e-books.svg',
    // },
    {
      name: 'Blockchain',
      page: '/query/blockchain/address',
      icon: 'img/svg/blockchain.svg',
    },
    {
      name: 'Prescription',
      page: '/query/prescription/all',
      icon: 'img/svg/Prescription.svg',
    },
    {
      name: 'Security and Hosting',
      page: '/query/securityAndHosting/all',
      icon: 'img/svg/SecurityHosting.svg',
    },
    // {
    //   name: 'Empathogens',
    //   page: '/query/empathogens/all',
    //   icon: 'img/svg/blockchain.svg',
    // },
    {
      name: 'Tickets And Bookings',
      page: '/query/ticketsAndBookings/all',
      icon: 'img/svg/TicketsBooking.svg',
    },
    // {
    //   name: 'Alcohol',
    //   page: '/query/alcohol/all',
    //   icon: 'img/svg/blockchain.svg',
    // },
    {
      name: 'Services',
      page: '/query/services/all',
      icon: 'img/svg/Services.svg',
    },
    {
      name: 'Steroids',
      page: '/query/steroids/all',
      icon: 'img/svg/Steroids.svg',
    },
    {
      name: 'Luxury',
      page: '/query/luxury/all',
      icon: 'img/svg/Luxury.svg',
    },
    {
      name: 'Hardware',
      page: '/query/hardware/all',
      icon: 'img/svg/Hardware.svg',
    },
    {
      name: 'Guides And Tutorials',
      page: '/query/guidesAndTutorials/all',
      icon: 'img/svg/GuidesTutorials.svg',
    },
    {
      name: 'Fashion',
      page: '/query/fashion/all',
      icon: 'img/svg/Fashion.svg',
    },
    {
      name: 'Carding Ware',
      page: '/query/cardingWare/all',
      icon: 'img/svg/Cardingware.svg',
    },
    {
      name: 'Other',
      page: '/query/other/all',
      icon: 'img/svg/Other.svg',
    },
  ];

  constructor(
    private router: Router
  ) { }


  showMore(page): void {
    this.router.navigate([page]);
  }
}
