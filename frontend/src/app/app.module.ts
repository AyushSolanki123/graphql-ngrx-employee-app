import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ListEmployeeComponent } from './component/list-employee/list-employee.component';
import { AgePipe } from './pipe/age.pipe';
import { AddEmployeeModalComponent } from './component/add-employee-modal/add-employee-modal.component';
import { FormsModule } from '@angular/forms';
import { UpdateEmployeeModalComponent } from './component/update-employee-modal/update-employee-modal.component';
import { DeleteEmployeeModalComponent } from './component/delete-employee-modal/delete-employee-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    AgePipe,
    AddEmployeeModalComponent,
    UpdateEmployeeModalComponent,
    DeleteEmployeeModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
