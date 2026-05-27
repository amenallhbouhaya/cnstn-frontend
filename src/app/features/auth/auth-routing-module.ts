import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Feature routes for auth screens (login, register, reset, ...).
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
