import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "../pages";
import {CommonModule} from "@angular/common";
import { FormsModule} from '@angular/forms';

const routes: Routes = [
  { path: '', component: LoginComponent }
  ];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
  ],

})
export class LoginRoutingModule { }
