import {Component, OnDestroy, OnInit} from '@angular/core';
import {AllAvatarsService} from "../../services/avatar";
import {Avatar} from "../../models/avatar.model";
import {ModalService} from "../../services/modal.service";
import {Subject} from "rxjs/Rx";
import {animate, style, transition, trigger} from "@angular/animations";
import {AddAvatarService} from "../../services/avatar/addAvatar.service";
import {NotificationsService} from "angular2-notifications";
import {DeleteAvatarService} from "../../services/avatar/deleteAvatar.service";
import {exist} from "../../helpers/exist_item/exist";
import {DisableAvatarService} from "../../services/avatar/disableAvatar.service";
import {EnableAvatarService} from "../../services/avatar/enableAvatar.service";

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.scss'],
})
export class AvatarsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  avatars: Avatar[] = Array();
  currentAvatar: Avatar;
  loading: boolean = true;
  openCreateModal: boolean = false;

  constructor(
    private AllAvatars: AllAvatarsService,
    private AddAvatarService: AddAvatarService,
    private DeleteAvatarService: DeleteAvatarService,
    private DisableAvatarService: DisableAvatarService,
    private EnableAvatarService: EnableAvatarService,
    private modalService: ModalService,
    private notificationService: NotificationsService,

  ) { }

  ngOnInit() {
    this.getAvatars();
    this.subscribe();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  close(e){
    if($(e.target).hasClass('modal')
      || $(e.target).hasClass('close')
      // || $(e.target).hasClass('button__inactive')
      || $(e.target).parent().hasClass('close')
    ){
      this.openCreateModal = false;
    }
  }

  toggleStatus(id:string, index:number){
    if(this.avatars[index].status === 'VALID'){
      this.DisableAvatarService.handler(id).subscribe();
      this.avatars[index].status = 'DISABLED';
    }else if(this.avatars[index].status === 'DISABLED'){
      this.EnableAvatarService.handler(id).subscribe();
      this.avatars[index].status = 'VALID';
    }
  }

  deleteAvatar(id:string, index:number){
    this.DeleteAvatarService.handler(id)
      .subscribe(
        (resp) => {
          console.log(resp);
        }
      );
    this.avatars.splice(index,1);
    this.notificationService.success(
      'Success',
      'The avatar has been deleted.',
    );
  }

  createAvatar(login, password, domain){
    this.AddAvatarService.handler(login, password, domain)
      .subscribe(
        (resp) => {
          this.assignAvatars(resp);
          this.openCreateModal = false;
          this.notificationService.success(
            'Success',
            'The avatar has been added.',
          );
        }
      )
  }

  private getAvatars(){
   this.AllAvatars.handler({pageNum:1,pageSize:5})
     .subscribe(
       (resp) => {
         this.assignAvatars(resp);
         this.loading = false;
       }
     );
  }

  private assignAvatars(items: any){
    if(Array.isArray(items)){
      items.map(item => {
        this.avatars.push(new Avatar(item));
      });
    }else{
      this.avatars.push(new Avatar(items));
    }
  }

  private subscribe(){
    this.modalService.createAvatarModal$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.openCreateModal = data;
      });
  }
}
