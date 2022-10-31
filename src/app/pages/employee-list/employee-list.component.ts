import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeDetails : any[] = [];

  constructor() { }

  ngOnInit(): void {

    const employeeData = localStorage.getItem('EmployeeDetails');
    this.employeeDetails = employeeData ? JSON.parse(employeeData) : [];
  }

}
