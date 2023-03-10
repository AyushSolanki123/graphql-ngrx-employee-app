import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from 'src/app/service/Employee';

@Component({
  selector: 'app-delete-employee-modal',
  templateUrl: './delete-employee-modal.component.html',
  styleUrls: ['./delete-employee-modal.component.scss'],
})
export class DeleteEmployeeModalComponent {
  @Input() emp!: Employee;
  @Output() deleteEmployee: EventEmitter<number> = new EventEmitter();

  onSubmit() {
    this.deleteEmployee.emit(<number>this.emp.id);
  }
}
