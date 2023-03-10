import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeeComponent } from './component/list-employee/list-employee.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListEmployeeComponent,
  },
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
