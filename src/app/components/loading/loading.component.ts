import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: 'loading.component.html',
  styleUrls: ['loading.scss']
})

export class LoadingComponent{
  @Input() activated: boolean = false;
}