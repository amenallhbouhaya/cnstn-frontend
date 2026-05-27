import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';


// Feature module that groups auth pages and routes.
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
