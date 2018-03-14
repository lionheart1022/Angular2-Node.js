import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
  public weaponDetailsModal$: Subject<boolean> = new Subject<boolean>();
  public weaponId$: Subject<number> = new Subject<number>();
  public otherComponentItem$: Subject<any> = new Subject<any>();
  public vendor$: Subject<any> = new Subject<any>();

  constructor() { }

  openWeaponDeatailsModal(arg: boolean, id): void {
    this.weaponDetailsModal$.next(arg);
    this.weaponId$.next(id);
  }
}
