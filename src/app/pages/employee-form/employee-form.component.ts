import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as diff from 'date-fns';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  disabledDate = (current: Date): boolean => diff.differenceInCalendarDays(current, new Date()) > 0;

  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder, private message: NzMessageService) { }

  ngOnInit(): void {
    this.employeeFormInit();
    this.addPhoneNumber();
  }

  employeeFormInit() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      role: ['', [Validators.required]],
      phone: this.fb.array([]),
      gender: ['', [Validators.required]]
    });
  }

  get phoneList() {
    return this.employeeForm.controls["phone"] as FormArray;
  }

  submitForm() {
    const employeeData = localStorage.getItem('EmployeeDetails');
    let formData = employeeData ? JSON.parse(employeeData) : [];

    let result = this.employeeForm.value;
    result.phone = result.phone.map((item: any) => item.phone);

    formData.push(result);
    localStorage.setItem('EmployeeDetails', JSON.stringify(formData));

    this.message.create('success', `${this.employeeForm.value.name} added to Employee List`);
    this.resetForm();
  }

  resetForm() {
    this.employeeForm.reset();
    while (this.phoneList.controls.length !== 0) {
      this.phoneList.removeAt(0)
    }
    this.addPhoneNumber();
  }

  addPhoneNumber() {
    const phoneNumber = this.fb.group({
      phone: ['', Validators.required]
    });

    this.phoneList.push(phoneNumber);
  }

  removePhoneNumber(index: number) {
    this.phoneList.removeAt(index);
    if (this.phoneList.controls.length === 0) {
      this.addPhoneNumber();
    }
  }
}
function differenceInCalendarDays(current: Date, today: any) {
  throw new Error('Function not implemented.');
}

