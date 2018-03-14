import { WeaponId } from './index';

export class Weapon {
  _id: WeaponId[];
  created_date: string;
  customrequestid: string;
  escrow: string;
  product_name: string;
  product_photo?: string;
  ships_from: string;
  ships_to: string;
  tor_website: string;
  type: string;
  vendor: string;
  vendor_info: any;
  product_price?: string;
  product_id?: number;
}
