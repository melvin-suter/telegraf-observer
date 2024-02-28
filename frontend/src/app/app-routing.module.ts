import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppLayoutComponent } from './components/layouts/app-layout/app-layout.component';
import { PageHomeComponent } from './components/pages/page-home/page-home.component';
import { ConfigItemComponent } from './components/pages/config-edit/config-item/config-item.component';
import { ConfigNewComponent } from './components/pages/config-new/config-new.component';

const routes: Routes = [
  { path: 'deploy/linux', redirectTo: '/assets/scripts/linux-setup.sh'},
  { path: 'auth', children: [
    { path: 'login', component: LoginComponent}
  ]},
  { path: '',component: AppLayoutComponent, children: [
    { path: 'config/new', component: ConfigNewComponent},
    { path: 'config/new/:id', component: ConfigNewComponent},
    { path: 'config/:id', component: ConfigItemComponent},
    { path: '', component: PageHomeComponent},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
