import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListEmployeeComponent } from './component/list-employee/list-employee.component';
import { AgePipe } from './pipe/age.pipe';
import { AddEmployeeModalComponent } from './component/add-employee-modal/add-employee-modal.component';
import { UpdateEmployeeModalComponent } from './component/update-employee-modal/update-employee-modal.component';
import { DeleteEmployeeModalComponent } from './component/delete-employee-modal/delete-employee-modal.component';
import { AuthComponent } from './component/auth/auth.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { GraphQLModule } from './graphql.module';
import { reducers } from './store';

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    AgePipe,
    AddEmployeeModalComponent,
    UpdateEmployeeModalComponent,
    DeleteEmployeeModalComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
