import { Router } from '@angular/router';
import { CasesService } from './services';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  ChangeDetectorRef,
  AfterViewChecked,
  AfterViewInit
} from '@angular/core';

import { DOCUMENT } from '@angular/platform-browser';

import { WindowRef } from './services';
import { AuthenticationService } from './services';

declare var $: JQueryStatic;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss']
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
  navIsFixed: boolean = false;
  wrap: boolean = false;
  username: string = '';
  showCreateCaseDialog: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private windowRef: WindowRef,
    private cdRef: ChangeDetectorRef,
    private authService: AuthenticationService,
    private casesService: CasesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.username = this.authService.username;
    this.wrap = this.windowRef.with_wrap$.getValue();
    setTimeout(() => this.subscribeWindowEvent());
  }

  get currentPageName(): string {
    const { url } = this.router;

    return url.split('/')
      .filter(breadcrumb => !!breadcrumb)[0];
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    let number = document.body.scrollTop;
    if (number > 54) {
      this.navIsFixed = true;
    } else {
      this.navIsFixed = false;
    }
  }

  openCreateCaseDialog() {
    this.showCreateCaseDialog = true;
  }

  changeVisiblesCreateCaseDialog() {
    this.showCreateCaseDialog = false;
  }

  successAddCase(item: any) {
    this.casesService.addCases(item);
  }

  isActive(item: string): any {
    let url = (this.windowRef.nativeWindow.location.pathname).split('/')[1];
    if (url === '' && item === 'home') {
      return true;
    }
    return item === url;
  }

  ngAfterViewInit(): void {
    $('ul.categories li.categories-item a').click(function (e) {
      e.preventDefault();
      $('.categories-item').removeClass('active');
      $(this).parents('.categories-item').addClass('active');
    });
  }

  logout() {
    this.authService.logout();
  }

  private subscribeWindowEvent() {
    this.windowRef.with_wrap$
      .subscribe(data => {
        this.wrap = data;
      });
  }

}

