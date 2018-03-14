import { IBreadCrumb } from './../../interfaces';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-headline]',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {

  }

  get title() {
    return this.breadcrumbs[1].title;
  }

  get breadcrumbs(): IBreadCrumb[] {
    const { url } = this.router;
    return url.split('/')
      .filter(breadcrumb => !!breadcrumb)
      .reduce((result, title, i) => {
        if (i === 0) {
          result[i] = {
            title,
            link: `/${title}`
          };
        } else {
          result[i] = {
            title,
            link: `${result[i - 1].link}/${title}`
          };
        }

        return result;
      }, []);
  }

  goBack(): void {
    this.location.back();
  }

}
