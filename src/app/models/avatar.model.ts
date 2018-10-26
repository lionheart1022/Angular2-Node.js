import {exist} from "../helpers/exist_item/exist";

export class Avatar{
  allowedCountries: String[];
  domain: string;
  id: string;
  password: string;
  status: string;
  username: string;

  constructor(item: any){
    this.allowedCountries = exist(item.allowedCountries, true);
    this.domain = exist(item.domain, true);
    this.id = exist(item.id, true);
    this.password = exist(item.password, true);
    this.status = exist(item.status, true);
    this.username = exist(item.username, true);
  }
}