import { Injectable } from '@angular/core';

@Injectable()
export class AllSubcategoriesService {

  public allSubcategories$ = {
    // -------- ** Drugs ** --------
    'drugs': [
      {
        name: 'all',
        parent: 'drugs',
        dmfilter : 104,
        tchkmarket : 1,
        wallfilter : 1,
        url: 'drugs/',
      },
      {
        name: 'Barbiturates',
        parent: 'drugs',
        dmfilter : 119,
        url: 'drugs/barbiturates',
      },
      {
        name: 'Benzos',
        parent: 'drugs',
        dmfilter : 120,
        wallfilter : 7,
        url: 'drugs/benzos',
      },
      {
        name: 'Cannabis',
        parent: 'drugs',
        dmfilter : 121,
        tchkmarket : 1,
        wallfilter : 1,
        url: 'drugs/cannabis',
      },
      {
        name: 'Dissociatives',
        parent: 'drugs',
        dmfilter : 122,
        tchkmarket : 12,
        wallfilter : 68,
        url: 'drugs/dissociatives',
      },
      {
        name: 'MDMA',
        parent: 'drugs',
        url: 'drugs/mdma'
      },
      {
        name: 'Ecstasy',
        parent: 'drugs',
        dmfilter : 123,
        tchkmarket : 9,
        wallfilter : 8,
        url: 'drugs/ecstasy'
      },
      {
        name: 'Opiates',
        parent: 'drugs',
        dmfilter : 9,
        tchkmarket : 9,
        wallfilter : 8,
        url: 'drugs/opiates'
      },
      {
        name: 'Opioids',
        parent: 'drugs',
        dmfilter : 124,
        url: 'drugs/opioids'
      },
      {
        name: 'Prescription',
        parent: 'drugs',
        dmfilter : 125,
        tchkmarket : 8,
        url: 'drugs/prescription'
      },
      {
        name: 'Steroids',
        parent: 'drugs',
        dmfilter : 128,
        tchkmarket : 10,
        wallfilter : 10,
        url: 'drugs/steroids'
      },
      {
        name: 'Stimulants',
        parent: 'drugs',
        dmfilter : 129,
        tchkmarket : 5,
        wallfilter : 11,
        url: 'drugs/stimulants'
      },
      {
        name: 'Weight loss',
        parent: 'drugs',
        dmfilter : 130,
        url: 'drugs/WeightLoss'
      },
      {
        name: 'Psychedelics',
        parent: 'drugs',
        dmfilter : 126,
        tchkmarket : 3,
        wallfilter : 50,
        url: 'drugs/psychedelics'
      },
      {
        name: 'RCs',
        parent: 'drugs',
        dmfilter : 127,
        url: 'drugs/rcs'
      },
      {
        name: 'Utensils',
        parent: 'drugs',
        url: 'drugs/utensils'
      },
      {
        name: 'Empathogens',
        parent: 'drugs',
        tchkmarket : 35,
        url: 'drugs/empathogens'
      },
      {
        name: 'Alcohol',
        parent: 'drugs',
        tchkmarket : 135,
        wallfilter : 69,
        url: 'drugs/alcohol'
      },
      {
        name: 'drugsParaphernalia',
        parent: 'drugsParaphernalia',
        dmfilter : 105,
        url: 'drugsParaphernalia',
      },
    ],
    'weapons' : [
      {
        name: 'all',
        parent: 'weapons',
        url: 'weapons/',
      },
    ],

    'cannabis' : [
      {
        name: 'Buds',
        parent: 'cannabis',
        tchkmarket : 13,
        url: 'drugs/cannabis/buds'
      },
      {
        name: 'Prerolled joints',
        parent: 'cannabis',
        tchkmarket : 38,
        url: 'drugs/cannabis/prerolledJoints'
      },
      {
        name: 'Cheews',
        parent: 'cannabis',
        tchkmarket : 37,
        url: 'drugs/cannabis/buds'
      },
      {
        name: 'Oil',
        parent: 'cannabis',
        tchkmarket : 41,
        url: 'drugs/cannabis/oil'
      },
      {
        name: 'E-Liquid',
        parent: 'cannabis',
        tchkmarket : 119,
        url: 'drugs/cannabis/eLiquid'
      },
      {
        name: 'Hashish',
        parent: 'cannabis',
        dmfilter : 172,
        tchkmarket : 4,
        wallfilter : 2,
        url: 'drugs/cannabis/hashish'
      },
      {
        name: 'Edibles',
        parent: 'cannabis',
        dmfilter : 171,
        tchkmarket : 40,
        wallfilter : 15,
        url: 'drugs/cannabis/edibles'
      },
      {
        name: 'Concentrates',
        parent: 'cannabis',
        dmfilter : 170,
        wallfilter : 16,
        url: 'drugs/cannabis/concentrates'
      },
      {
        name: 'Seeds',
        parent: 'cannabis',
        dmfilter : 174,
        tchkmarket : 39,
        wallfilter : 17,
        url: 'drugs/cannabis/seeds'
      },
      {
        name: 'Synthetics',
        parent: 'cannabis',
        dmfilter : 173,
        wallfilter : 27,
        url: 'drugs/cannabis/synthetics'
      }
    ],
    'dissociatives': [
      {
        name: 'GBL',
        parent: 'dissociatives',
        dmfilter : 164,
        wallfilter : 18,
        url: 'drugs/dissociatives/gbl'
      },
      {
        name: 'GHB',
        parent: 'dissociatives',
        dmfilter : 165,
        wallfilter : 19,
        url: 'drugs/dissociatives/ghb'
      },
      {
        name: 'Ketamine',
        parent: 'dissociatives',
        dmfilter : 166,
        tchkmarket : 36,
        wallfilter : 20,
        url: 'drugs/dissociatives/ketamine'
      },
      {
        name: 'MXE',
        parent: 'dissociatives',
        dmfilter : 167,
        wallfilter : 21,
        url: 'drugs/dissociatives/mxe'
      },
      {
        name: 'Other',
        parent: 'dissociatives',
        dmfilter : 168,
        wallfilter : 23,
        url: 'drugs/dissociatives/other'
      },
      {
        name: 'PCP',
        parent: 'dissociatives',
        dmfilter : 169,
        wallfilter : 22,
        url: 'drugs/dissociatives/pcp'
      }
    ],
    'ecstasy' : [
      {
        name: 'MDA',
        parent: 'ecstasy',
        dmfilter : 160,
        url: 'drugs/ecstasy/mda'
      },
      {
        name: 'MDMA',
        parent: 'ecstasy',
        dmfilter : 161,
        tchkmarket : 7,
        wallfilter : 4,
        url: 'drugs/ecstasy/mdma'
      },
      {
        name: 'Other',
        parent: 'ecstasy',
        dmfilter : 162,
        url: 'drugs/ecstasy/other'
      },
      {
        name: 'Pills',
        parent: 'ecstasy',
        dmfilter : 163,
        url: 'drugs/ecstasy/pills'
      },
    ],
    'opioids': [
      {
        name: 'Buprenorphine',
        parent: 'opioids',
        dmfilter : 176,
        url: 'drugs/opioids/buprenorphine'
      },
      {
        name: 'Codeine',
        parent: 'opioids',
        dmfilter : 177,
        url: 'drugs/opioids/Codeine'
      },
      {
        name: 'Dihydrocodeine',
        parent: 'opioids',
        dmfilter : 178,
        url: 'drugs/opioids/dihydrocodeine'
      },
      {
        name: 'Fentanyl',
        parent: 'opioids',
        dmfilter : 179,
        url: 'drugs/opioids/fentanyl'
      },
      {
        name: 'Heroin',
        parent: 'opioids',
        dmfilter : 180,
        url: 'drugs/opioids/heroin'
      },
      {
        name: 'Hydrocodone',
        parent: 'opioids',
        dmfilter : 181,
        url: 'drugs/opioids/hydrocodone'
      },
      {
        name: 'Hydromorphone',
        parent: 'opioids',
        dmfilter : 182,
        url: 'drugs/opioids/hydromorphone'
      },
      {
        name: 'Morphine',
        parent: 'opioids',
        dmfilter : 183,
        url: 'drugs/opioids/morphine'
      },
      {
        name: 'Opium',
        parent: 'opioids',
        dmfilter : 184,
        url: 'drugs/opioids/opium'
      },
      {
        name: 'Other',
        parent: 'opioids',
        dmfilter : 185,
        url: 'drugs/opioids/other'
      },
      {
        name: 'Other',
        parent: 'opioids',
        dmfilter : 186,
        url: 'drugs/opioids/other'
      },
    ],

    // --- ** prescription ** ----
    'prescription' : [
      {
        name: 'all',
        parent: 'prescription',
        dmfilter : 125,
        tchkmarket : 8,
        url: 'prescription'
      },
      {
        name: 'Opioids',
        parent: 'prescription',
        dmfilter : 124,
        tchkmarket : 6,
        url: 'prescription/opioids'
      },
      {
        name: 'Xanax',
        parent: 'prescription',
        tchkmarket : 45,
        url: 'prescription/xanax'
      },
      {
        name: 'Adderall',
        parent: 'prescription',
        tchkmarket : 42,
        url: 'prescription/adderall'
      },
      {
        name: 'Benzodiazepines',
        parent: 'prescription',
        tchkmarket : 46,
        url: 'prescription/benzodiazepines'
      },
      {
        name: 'Fentanyl',
        parent: 'prescription',
        tchkmarket : 125,
        dmfilter : 179,
        url: 'prescription/fentanyl'
      },
      {
        name: 'Viagra',
        parent: 'prescription',
        tchkmarket : 44,
        url: 'prescription/viagra'
      },
      {
        name: 'Valium',
        parent: 'prescription',
        tchkmarket : 49,
        url: 'prescription/valium'
      },
      {
        name: 'Antidepressants',
        parent: 'prescription',
        tchkmarket : 47,
        url: 'prescription/antidepressants'
      },
      {
        name: 'Sedatatives',
        parent: 'prescription',
        tchkmarket : 50,
        url: 'prescription/sedatatives'
      },
      {
        name: 'Antipsychotics',
        parent: 'prescription',
        tchkmarket : 48,
        url: 'prescription/antipsychotics'
      },
      {
        name: 'Barbiturates',
        parent: 'prescription',
        tchkmarket : 117,
        url: 'prescription/barbiturates'
      },
      {
        name: 'Baclofen',
        parent: 'prescription',
        tchkmarket : 122,
        url: 'prescription/baclofen'
      },
      {
        name: 'Levitra',
        parent: 'prescription',
        tchkmarket : 109,
        url: 'prescription/levitra'
      },
    ],
    // --- ** END prescription ** ----

    // --- ** Banking ** ----
    'banking': [
      {
        name: 'all',
        parent: 'banking',
        tchkmarket : 105,
        url: 'banking'
      },
      {
        name: 'Counterfeit Notes',
        parent: 'banking',
        tchkmarket : 110,
        url: 'banking/counterfeitNotes'
      },
      {
        name: 'Credit Cards Dumps',
        parent: 'banking',
        tchkmarket : 106,
        url: 'banking/creditCardsDumps'
      },
      {
        name: 'Western Union',
        parent: 'banking',
        tchkmarket : 124,
        url: 'banking/westernUnion'
      },
      {
        name: 'Other',
        parent: 'banking',
        tchkmarket : 180,
        url: 'banking/other'
      },
      {
        name: 'Bank Accounts',
        parent: 'banking',
        tchkmarket : 111,
        url: 'banking/bankAccounts'
      },
      {
        name: 'Plastic Cards',
        parent: 'banking',
        tchkmarket : 120,
        url: 'banking/plasticCards'
      },
      {
        name: 'Cashout Methods',
        parent: 'banking',
        tchkmarket : 108,
        url: 'banking/cashoutMethods'
      },
      {
        name: 'PayPal',
        parent: 'banking',
        tchkmarket : 112,
        url: 'banking/payPal'
      },
      {
        name: 'Banking Services',
        parent: 'banking',
        tchkmarket : 140,
        url: 'banking/bankingServices'
      },
      {
        name: 'Carding Hardware',
        parent: 'banking',
        tchkmarket : 157,
        url: 'banking/cardingHardware'
      },
      {
        name: 'Trading Software',
        parent: 'banking',
        tchkmarket : 144,
        url: 'banking/tradingSoftware'
      },
    ],
    // --- ** END Banking ** ----

    'psychedelics' : [
      {
        name: 'Psilocybe Cubensis',
        parent: 'psychedelics',
        tchkmarket : 51,
        url: 'drugs/psychedelics/psilocybeCubensis'
      },
      {
        name: '2C-B',
        parent: 'psychedelics',
        tchkmarket : 51,
        url: 'drugs/psychedelics/2cb'
      },
      {
        name: 'DOB',
        parent: 'psychedelics',
        tchkmarket : 52,
        url: 'drugs/psychedelics/dob'
      },
      {
        name: 'DOM',
        parent: 'psychedelics',
        tchkmarket : 53,
        url: 'drugs/psychedelics/dom'
      },
      {
        name: 'ALD-52',
        parent: 'psychedelics',
        tchkmarket : 123,
        url: 'drugs/psychedelics/ald52'
      },
      {
        name: '2C',
        parent: 'psychedelics',
        dmfilter : 150,
        url: 'drugs/psychedelics/2c'
      },
      {
        name: '5-MeO',
        parent: 'psychedelics',
        dmfilter : 151,
        url: 'drugs/psychedelics/5MeO'
      },
      {
        name: 'DMT',
        parent: 'psychedelics',
        dmfilter : 152,
        tchkmarket : 54,
        url: 'drugs/psychedelics/dmt'
      },
      {
        name: 'LSD',
        parent: 'psychedelics',
        dmfilter : 153,
        tchkmarket : 14,
        wallfilter : 7,
        url: 'drugs/psychedelics/lsd'
      },
      {
        name: 'Mescaline',
        parent: 'psychedelics',
        dmfilter : 154,
        url: 'drugs/psychedelics/mescaline'
      },
      {
        name: 'Mushrooms',
        parent: 'psychedelics',
        dmfilter : 155,
        wallfilter : 8,
        url: 'drugs/psychedelics/mushrooms'
      },
      {
        name: 'NB',
        parent: 'psychedelics',
        dmfilter : 156,
        tchkmarket : 179,
        url: 'drugs/psychedelics/nb'
      },
      {
        name: 'Other',
        parent: 'psychedelics',
        dmfilter : 157,
        wallfilter : 9,
        url: 'drugs/psychedelics/other'
      },
      {
        name: 'Salvia',
        parent: 'psychedelics',
        dmfilter : 158,
        url: 'drugs/psychedelics/salvia'
      },
      {
        name: 'Spores',
        parent: 'psychedelics',
        dmfilter : 159,
        url: 'drugs/psychedelics/spores'
      },
    ],
    'stimulants' : [
      {
        name: 'Cocaine',
        parent: 'stimulants',
        dmfilter : 187,
        tchkmarket : 11,
        wallfilter : 3,
        url: 'drugs/stimulants/cocaine'
      },
      {
        name: 'methamphetamine',
        parent: 'stimulants',
        dmfilter : 188,
        tchkmarket : 107,
        wallfilter : 4,
        url: 'drugs/stimulants/methamphetamine'
      },
      {
        name: 'Amphetamine',
        parent: 'stimulants',
        tchkmarket : 43,
        url: 'drugs/stimulants/amphetamine'
      },
      {
        name: 'A-PVP',
        parent: 'stimulants',
        tchkmarket : 55,
        url: 'drugs/stimulants/apvp'
      },
      {
        name: 'Mexedrone',
        parent: 'stimulants',
        tchkmarket : 150,
        url: 'drugs/stimulants/mexedrone'
      },
      {
        name: 'Ephedrine',
        parent: 'stimulants',
        tchkmarket : 116,
        url: 'drugs/stimulants/ephedrine'
      },
      {
        name: '4-EMC',
        parent: 'stimulants',
        tchkmarket : 116,
        url: 'drugs/stimulants/4emc'
      },
      {
        name: '3-FMP',
        parent: 'stimulants',
        tchkmarket : 148,
        url: 'drugs/stimulants/3fmp'
      },
      {
        name: 'speed',
        parent: 'drugs',
        dmfilter : 190,
        wallfilter : 8,
        url: 'drugs/stimulants/speed'
      },
      {
        name: 'Prescription',
        parent: 'stimulants',
        dmfilter : 188,
        wallfilter : 8,
        url: 'drugs/stimulants/prescription'
      },
      {
        name: 'Pills',
        parent: 'stimulants',
        dmfilter : 206,
        wallfilter : 8,
        url: 'drugs/stimulants/pills'
      }
    ],
    'empathogens': [
      {
        name: 'MDMA',
        parent: 'empathogens',
        tchkmarket : 7,
        url: 'empathogens/mdma'
      },
      {
        name: 'Ecstasy',
        parent: 'empathogens',
        tchkmarket : 9,
        url: 'empathogens/ecstasy',
      },
      {
        name: 'Mephedrone',
        parent: 'empathogens',
        tchkmarket : 185,
        url: 'empathogens/mephedrone',
      },
      {
        name: '4-FA',
        parent: 'empathogens',
        tchkmarket : 152,
        url: 'empathogens/4fa',
      }
    ],

    // --- ** END Drugs ** ---

    // --- ** Digital Goods ** ---
    'digitalGoods' : [
      {
        name: 'all',
        parent: 'digitalGoods',
        dmfilter : 103,
        wallfilter : 12,
        tchkmarket : 23,
        url: 'digitalGoods/',
      },
      {
        name: 'Data',
        parent: 'digitalGoods',
        dmfilter : 108,
        url: 'digitalGoods/data',
      },
      {
        name: 'Documents and Data',
        parent: 'digitalGoods',
        tchkmarket : 25,
        url: 'digitalGoods/documentsAndData',
      },
      {
        name: 'Accounts',
        parent: 'digitalGoods',
        tchkmarket : 160,
        url: 'digitalGoods/accounts',
      },
      {
        name: 'Database Dumps',
        parent: 'digitalGoods',
        tchkmarket : 56,
        url: 'digitalGoods/databaseDumps',
      },
      {
        name: 'Software',
        parent: 'digitalGoods',
        dmfilter : 118,
        wallfilter : 58,
        tchkmarket : 26,
        url: 'digitalGoods/software',
      },
      {
        name: 'Ebooks',
        parent: 'digitalGoods',
        wallfilter : 59,
        dmfilter : 110,
        url: 'digitalGoods/ebooks',
      },
      {
        name: 'Gamekeys',
        parent: 'digitalGoods',
        wallfilter : 60,
        url: 'digitalGoods/gamekeys',
      },
      {
        name: 'Erotica',
        parent: 'digitalGoods',
        dmfilter : 111,
        url: 'digitalGoods/erotica',
      },
      {
        name: 'Fraud',
        parent: 'digitalGoods',
        dmfilter : 112,
        wallfilter : 11,
        url: 'digitalGoods/fraud',
      },
      {
        name: 'Fraud Related',
        parent: 'digitalGoods',
        dmfilter : 113,
        wallfilter : 11,
        url: 'digitalGoods/fraudRelated',
      },
      {
        name: 'Security',
        parent: 'digitalGoods',
        dmfilter : 117,
        url: 'digitalGoods/security',
      },
      {
        name: 'Information',
        parent: 'digitalGoods',
        dmfilter : 115,
        url: 'digitalGoods/information',
      },
      {
        name: 'Other',
        parent: 'digitalGoods',
        tchkmarket : 24,
        wallfilter : 61,
        dmfilter : 116,
        url: 'digitalGoods/other',
      },
    ],
    // --- ** END Digital Goods ** ---

    // --- ** Software ** ---
      'software': [
        {
          name: 'all',
          parent: 'software',
          tchkmarket : 25,
          wallfilter : 8,
          url: 'software/',
        },
        {
          name: 'other',
          parent: 'software',
          tchkmarket : 27,
          wallfilter : 34,
          url: 'software/other',
        },
        {
          name: 'exploits',
          parent: 'software',
          tchkmarket : 28,
          url: 'software/exploits',
        },
        {
          name: 'Source Code',
          parent: 'software',
          tchkmarket : 29,
          url: 'software/sourceCode',
        },
        {
          name: 'Botnets and Malware',
          parent: 'software',
          wallfilter : 30,
          url: 'software/botnetsAnMalware',
        },
        {
          name: 'Exploits',
          parent: 'software',
          wallfilter : 31,
          url: 'software/exploits',
        },
        {
          name: 'Kits',
          parent: 'software',
          wallfilter : 32,
          url: 'software/kits',
        },
        {
          name: 'Security Software',
          parent: 'software',
          wallfilter : 33,
          url: 'software/securitySoftware',
        },
      ],
    // --- ** END Software ** ---

    // --- ** Tickets and Bookings ** ---
    'ticketsAndBookings': [
      {
        name: 'all',
        parent: 'ticketsAndBookings',
        tchkmarket : 158,
        url: 'ticketsAndBookings',
      },
      {
        name: 'Train Tickets',
        parent: 'ticketsAndBookings',
        tchkmarket : 159,
        url: 'ticketsAndBookings/trainTickets',
      },
      {
        name: 'Travel',
        parent: 'ticketsAndBookings',
        tchkmarket : 161,
        url: 'ticketsAndBookings/travel',
      },
    ],
    // --- ** END Tickets and Bookings ** ---

    // --- ** Alcohol ** ---
    'alcohol': [
      {
        name: 'all',
        parent: 'alcohol',
        tchkmarket : 135,
        wallfilter : 69,
        url: 'alcohol',
      },
      {
        name: 'Moonshine',
        parent: 'alcohol',
        tchkmarket : 187,
        url: 'alcohol/moonshine',
      },
      {
        name: 'Rum',
        parent: 'alcohol',
        tchkmarket : 138,
        url: 'alcohol/rum',
      },
    ],
    // --- ** END Alcohol ** ---

    // --- ** Drugs Paraphernalia ** ---
    'drugsParaphernalia' : [
      {
        name: 'all',
        parent: 'drugsParaphernalia',
        dmfilter : 105,
        url: 'drugsParaphernalia',
      },
      {
        name: 'Harm Reduction',
        parent: 'drugsParaphernalia',
        dmfilter : 207,
        wallfilter : 70,
        url: 'drugsParaphernalia/harmReduction',
      },
    ],
    // --- ** END Drugs Paraphernalia ** ---

    // --- ** Services ** ---
    'services' : [
      {
        name: 'all',
        parent: 'services',
        dmfilter : 106,
        tchkmarket : 30,
        wallfilter : 7,
        url: 'services',
      },
      {
        name: 'Hacking',
        parent: 'services',
        dmfilter : 131,
        tchkmarket : 33,
        wallfilter : 7,
        url: 'services/hacking',
      },
      {
        name: 'IDs & Passports',
        parent: 'services',
        dmfilter : 132,
        url: 'services/idsPassports',
      },
      {
        name: 'Money',
        parent: 'services',
        dmfilter : 133,
        url: 'services/money',
      },
      {
        name: 'Cash out',
        parent: 'services',
        dmfilter : 205,
        url: 'services/cashOut',
      },
      {
        name: 'Social Engineering',
        parent: 'services',
        dmfilter : 31,
        wallfilter : 26,
        url: 'services/socialEngineering',
      },
      {
        name: 'Carding',
        parent: 'services',
        wallfilter : 27,
        url: 'services/carding',
      },
      {
        name: 'Coding and Graphics',
        parent: 'services',
        wallfilter : 28,
        url: 'services/codingAndGraphics',
      },
      {
        name: 'Other',
        parent: 'services',
        dmfilter : 134,
        tchkmarket : 32,
        wallfilter : 29,
        url: 'services/other',
      },
    ],
    // --- ** END Services ** ---


    // --- ** Security & Hosting ** --
      'securityAndHosting': [
        {
          name: 'all',
          parent: 'securityAndHosting',
          wallfilter : 6,
          url: 'securityAndHosting',
        },
        {
          name: 'hosting',
          parent: 'securityAndHosting',
          wallfilter : 35,
          url: 'securityAndHosting/hosting',
        },
        {
          name: 'VPN',
          parent: 'securityAndHosting',
          wallfilter : 36,
          url: 'securityAndHosting/vpn',
        },
        {
          name: 'Socks',
          parent: 'securityAndHosting',
          wallfilter : 37,
          url: 'securityAndHosting/socks',
        },
        {
          name: 'Other',
          parent: 'securityAndHosting',
          wallfilter : 38,
          url: 'securityAndHosting/other',
        },
      ],
    // --- ** END Security & Hosting ** --

    // --- ** Other ** --
    'other' : [
      {
        name: 'all',
        parent: 'other',
        dmfilter : 107,
        tchkmarket : 34,
        url: 'other',
      },
    ],
    // --- ** AND Other ** ---

    // --- ** Steroids ** ---
    'steroids': [
      {
        name: 'all',
        parent: 'steroids',
        dmfilter : 128,
        tchkmarket : 10,
        wallfilter : 10,
        url: 'steroids',
      },
      {
        name: 'Other',
        parent: 'steroids',
        tchkmarket : 172,
        url: 'steroids/other',
      },
      {
        name: 'Growth Hormone',
        parent: 'steroids',
        tchkmarket : 163,
        url: 'steroids/growthHormone',
      },
      {
        name: 'Anavar',
        parent: 'steroids',
        tchkmarket : 168,
        url: 'steroids/anavar',
      },
      {
        name: 'Testosterone Enanthate',
        parent: 'steroids',
        tchkmarket : 146,
        url: 'steroids/testosteroneEnanthate',
      },
      {
        name: 'Deca Durabolin',
        parent: 'steroids',
        tchkmarket : 166,
        url: 'steroids/decaDurabolin',
      },
      {
        name: 'Deca Durabolin',
        parent: 'steroids',
        tchkmarket : 166,
        url: 'steroids/decaDurabolin',
      },
      {
        name: 'Trenobolone',
        parent: 'steroids',
        tchkmarket : 141,
        url: 'steroids/trenobolone',
      },
      {
        name: 'Danabol',
        parent: 'steroids',
        tchkmarket : 176,
        url: 'steroids/danabol',
      },
      {
        name: 'Sustanon',
        parent: 'steroids',
        tchkmarket : 175,
        url: 'steroids/austanon',
      },
      {
        name: 'Stanozolol',
        parent: 'steroids',
        tchkmarket : 169,
        url: 'steroids/stanozolol',
      },
      {
        name: 'Testosterone Propionate',
        parent: 'steroids',
        tchkmarket : 142,
        url: 'steroids/testosteronePropionate',
      },
      {
        name: 'Oxymetholone',
        parent: 'steroids',
        tchkmarket : 165,
        url: 'steroids/oxymetholone',
      },
      {
        name: 'Testosterone Cypionate',
        parent: 'steroids',
        tchkmarket : 143,
        url: 'steroids/testosteroneCypionate',
      },
      {
        name: 'Clenbuterol',
        parent: 'steroids',
        tchkmarket : 151,
        url: 'steroids/clenbuterol',
      },
      {
        name: 'Clomed',
        parent: 'steroids',
        tchkmarket : 162,
        url: 'steroids/clomed',
      },
      {
        name: 'Trenbolone',
        parent: 'steroids',
        tchkmarket : 171,
        url: 'steroids/trenbolone',
      },
      {
        name: 'Turanabol',
        parent: 'steroids',
        tchkmarket : 167,
        url: 'steroids/turanabol',
      },
      {
        name: 'Pregnyl',
        parent: 'steroids',
        tchkmarket : 173,
        url: 'steroids/pregnyl',
      },
      {
        name: 'Proviron',
        parent: 'steroids',
        tchkmarket : 170,
        url: 'steroids/proviron',
      },
      {
        name: 'Primobolan',
        parent: 'steroids',
        tchkmarket : 174,
        url: 'steroids/primobolan',
      },
    ],
    // --- ** END Steroids ** ---

    // --- ** END Luxury ** ---
    'luxury' : [
      {
        name: 'all',
        parent: 'luxury',
        tchkmarket : 130,
        wallfilter : 4,
        url: 'luxury',
      },
      {
        name: 'Gold',
        parent: 'luxury',
        tchkmarket : 145,
        wallfilter : 19,
        url: 'luxury/gold',
      },
      {
        name: 'Diamonds',
        parent: 'luxury',
        tchkmarket : 156,
        url: 'luxury/diamonds',
      },
      {
        name: 'Sapphires',
        parent: 'luxury',
        tchkmarket : 132,
        url: 'luxury/sapphires',
      },
      {
        name: 'Rubies',
        parent: 'luxury',
        tchkmarket : 131,
        url: 'luxury/rubies',
      },
      {
        name: 'Silver',
        parent: 'luxury',
        wallfilter : 20,
        url: 'luxury/silver',
      },
      {
        name: 'Other',
        parent: 'luxury',
        wallfilter : 21,
        url: 'luxury/other',
      },
    ],
    // --- ** END Luxury ** ---

    // --- ** Hardware ** ---
    'hardware': [
      {
        name: 'all',
        parent: 'hardware',
        tchkmarket : 154,
        url: 'hardware/',
      },
      {
        name: 'Mobile Phones',
        parent: 'hardware',
        tchkmarket : 178,
        url: 'hardware/mobilePhones',
      },
      {
        name: 'Robots',
        parent: 'hardware',
        tchkmarket : 190,
        url: 'hardware/robots',
      },
      {
        name: 'MacBook',
        parent: 'hardware',
        tchkmarket : 193,
        url: 'hardware/macBook',
      },
      {
        name: '3D Printers',
        parent: 'hardware',
        tchkmarket : 195,
        url: 'hardware/3dPrinters',
      },
      {
        name: 'Computer Hardware',
        parent: 'hardware',
        tchkmarket : 199,
        url: 'hardware/computerHardware',
      },
    ],
    // --- ** END Hardware ** ---

    // --- ** Guides and Tutorials ** ---
     'guidesAndTutorials' : [
       {
         name: 'all',
         parent: 'guidesAndTutorials',
         tchkmarket : 17,
         url: 'guidesAndTutorials',
       },
       {
         name: 'security',
         parent: 'guidesAndTutorials',
         dmfilter : 117,
         tchkmarket : 20,
         wallfilter : 64,
         url: 'guidesAndTutorials/security',
       },
       {
         name: 'Other',
         parent: 'guidesAndTutorials',
         tchkmarket : 19,
         wallfilter : 66,
         url: 'guidesAndTutorials/other',
       },
       {
         name: 'Hacking',
         parent: 'guidesAndTutorials',
         tchkmarket : 21,
         wallfilter : 65,
         url: 'guidesAndTutorials/hacking',
       },
       {
         name: 'Drugs',
         parent: 'guidesAndTutorials',
         dmfilter : 196,
         tchkmarket : 22,
         wallfilter : 63,
         url: 'guidesAndTutorials/drugs',
       },
       {
         name: 'Fraud',
         parent: 'guidesAndTutorials',
         wallfilter : 62,
         url: 'guidesAndTutorials/fraud',
       },
     ],
    // --- ** END Guides and Tutorials ** ---

    // --- ** Fashion ** ---
    'fashion': [
      {
        name: 'all',
        parent: 'fashion',
        tchkmarket : 181,
        url: 'fashion',
      },
      {
        name: 'watch',
        parent: 'fashion',
        tchkmarket : 191,
        url: 'fashion/watch',
      },
      {
        name: 'ties',
        parent: 'fashion',
        tchkmarket : 182,
        url: 'fashion/ties',
      },
      {
        name: 'shoes',
        parent: 'fashion',
        tchkmarket : 186,
        url: 'fashion/shoes',
      },
      {
        name: 'perfume',
        parent: 'fashion',
        tchkmarket : 184,
        url: 'fashion/perfume',
      },
      {
        name: 'bags',
        parent: 'fashion',
        tchkmarket : 183,
        url: 'fashion/bags',
      },
    ],
    // --- ** END Fashion ** ---

    // --- **  Carding Ware ** ---
    'cardingWare': [
      {
        name: 'all',
        parent: 'cardingWare',
        wallfilter : 6,
        url: 'cardingWare',
      },
      {
        name: 'clothing',
        parent: 'cardingWare',
        wallfilter : 22,
        url: 'cardingWare/clothing',
      },
      {
        name: 'electronics',
        parent: 'cardingWare',
        wallfilter : 23,
        url: 'cardingWare/electronics',
      },
      {
        name: 'Smartphones and Tablets',
        parent: 'cardingWare',
        wallfilter : 24,
        url: 'cardingWare/smartphonesAndTablets',
      },
      {
        name: 'Other',
        parent: 'cardingWare',
        wallfilter : 25,
        url: 'cardingWare/Other',
      },
    ],
    // --- ** END Carding Ware ** ---

    'counterfeits': [
      {
        name: 'all',
        parent: 'counterfeits',
        wallfilter : 4,
        dmfilter : 135,
        url: 'counterfeits',
      },
      {
        name: 'Clothing',
        parent: 'counterfeits',
        wallfilter : 13,
        url: 'counterfeits/clothing',
      },
      {
        name: 'Electronics',
        parent: 'counterfeits',
        wallfilter : 14,
        url: 'counterfeits/electronics',
      },
      {
        name: 'Jewelry',
        parent: 'counterfeits',
        wallfilter : 15,
        url: 'counterfeits/jewelry',
      },
      {
        name: 'Cash',
        parent: 'counterfeits',
        wallfilter : 16,
        url: 'counterfeits/cash',
      },
      {
        name: 'ID\'s',
        parent: 'counterfeits',
        wallfilter : 17,
        url: 'counterfeits/ids',
      },
      {
        name: 'Other',
        parent: 'counterfeits',
        wallfilter : 17,
        url: 'counterfeits/other',
      },
    ],
    'hacking': [
      {
        name: 'all',
        parent: 'hacking',
        dmfilter : 131,
        tchkmarket : 33,
        wallfilter : 7,
        url: 'hacking',
      },
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
    'documents': [
      {
        name: 'all',
        parent: 'documents',
        tchkmarket : 114,
        url: 'documents',
      },
      {
        name: 'Passports',
        parent: 'documents',
        tchkmarket : 129,
        url: 'documents/passports',
      },
      {
        name: 'Driver\'s Licence',
        parent: 'documents',
        tchkmarket : 128,
        url: 'documents/driversLicence',
      },
      {
        name: 'ID Cards',
        parent: 'documents',
        tchkmarket : 127,
        url: 'documents/idCards',
      },
      {
        name: 'Certificates',
        parent: 'documents',
        tchkmarket : 134,
        url: 'documents/certificates',
      },
      {
        name: 'Visa',
        parent: 'documents',
        tchkmarket : 126,
        url: 'documents/visa',
      },
      {
        name: 'Social Security (SSN)',
        parent: 'documents',
        tchkmarket : 115,
        url: 'documents/socialSecurity',
      },
      {
        name: 'Cannabis ID',
        parent: 'documents',
        tchkmarket : 133,
        url: 'documents/cannabisID',
      },
    ],
    'fraud': [
      {
        name: 'all',
        parent: 'fraud',
        wallfilter : 11,
        url: 'fraud',
      },
      {
        name: 'Accounts',
        parent: 'fraud',
        wallfilter : 53,
        url: 'fraud/accounts',
      },
      {
        name: 'Credit Cards',
        parent: 'fraud',
        wallfilter : 55,
        url: 'fraud/creditCards',
      },
      {
        name: 'Scans & Documents',
        parent: 'fraud',
        wallfilter : 55,
        url: 'fraud/scansAndDocuments',
      },
      {
        name: 'Dumps',
        parent: 'fraud',
        wallfilter : 56,
        url: 'fraud/dumps',
      },
      {
        name: 'Other',
        parent: 'fraud',
        wallfilter : 57,
        url: 'fraud/other',
      },
    ],
    // 'eBooks': [
    //   {
    //     name: 'Manuals',
    //     url: 'eBooks/manuals'
    //   },
    //   {
    //     name: 'Leaks',
    //     url: 'eBooks/leaks'
    //   },
    //   {
    //     name: 'Education',
    //     url: 'eBooks/education'
    //   },
    //   {
    //     name: 'Antiques',
    //     url: 'eBooks/antiques'
    //   },
    // ],
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
