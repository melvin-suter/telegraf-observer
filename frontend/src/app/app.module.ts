import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { PageHomeComponent } from './components/pages/page-home/page-home.component';
import { SidebarComponent } from './components/partials/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppLayoutComponent } from './components/layouts/app-layout/app-layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { TreeviewComponent } from './components/partials/treeview/treeview.component';
import { TreeviewItemComponent } from './components/partials/treeview-item/treeview-item.component';
import { ConfigItemComponent } from './components/pages/config-edit/config-item/config-item.component';
import { ConfigItemInputComponent } from './components/partials/config-item-input/config-item-input.component';
import { ConfigNewComponent } from './components/pages/config-new/config-new.component';
import { ConfigItemAgentComponent } from './components/pages/config-edit/config-item-agent/config-item-agent.component';
import { ConfigItemOutputComponent } from './components/pages/config-edit/config-item-output/config-item-output.component';
import { ConfigItemScriptComponent } from './components/pages/config-edit/config-item-script/config-item-script.component';
import { ConfigItemInputsComponent } from './components/pages/config-edit/config-item-inputs/config-item-inputs.component';
import { ConfigItemDeployComponent } from './components/pages/config-edit/config-item-deploy/config-item-deploy.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageHomeComponent,
    SidebarComponent,
    AppLayoutComponent,
    TreeviewComponent,
    TreeviewItemComponent,
    ConfigItemComponent,
    ConfigItemInputComponent,
    ConfigNewComponent,
    ConfigItemAgentComponent,
    ConfigItemOutputComponent,
    ConfigItemScriptComponent,
    ConfigItemInputsComponent,
    ConfigItemDeployComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
