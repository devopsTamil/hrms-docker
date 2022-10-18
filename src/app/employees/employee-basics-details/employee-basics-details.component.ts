import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Employee} from '../shared/employee.model';


@Component({
  selector: 'app-employee-basics-details',
  templateUrl: './employee-basics-details.component.html',
  styleUrls: ['./employee-basics-details.component.scss']
})
export class EmployeeBasicsDetailsComponent implements OnInit {
  @Input()
  employee: Employee;

  @Output()
  valueChange = new EventEmitter<Partial<Employee>>();

  @Output()
  formReady = new EventEmitter<FormGroup>();

  basicForm: FormGroup;

  private subscription = new Subscription();
  
  get firstName() { return this.basicForm.get('firstName'); }
  get lastName() { return this.basicForm.get('lastName'); }
  get nameAadhar() { return this.basicForm.get('nameAadhar'); }

  get Fathername() { return this.basicForm.get('Fathername'); }
  get bithday() { return this.basicForm.get('bithday'); }

  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.basicForm = this.fb.group({
      firstName:  [this.employee.firstName, [Validators.required]],
      lastName: [this.employee.lastName, [Validators.required]],
      nameAadhar: [this.employee.nameAadhar, [Validators.required]],
      Fathername: [this.employee.Fathername, [Validators.required]],
      bithday: [this.employee.bithday, [Validators.required]],
    }, { updateOn: 'submit' });

    this.subscription.add(
      this.basicForm.valueChanges.subscribe((value) => {
        this.valueChange.emit({
          firstName: value.firstName,
          lastName: value.lastName,
          nameAadhar:  value.nameAadhar,
          Fathername: value.Fathername,
          bithday: value.bithday,
        });
      })
    );

    this.formReady.emit(this.basicForm);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
