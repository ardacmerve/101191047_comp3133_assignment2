import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  imports: [CommonModule]
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | null = null;
  errorMessage: string = '';
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (emp) => this.employee = emp,
      error: (err) => this.errorMessage = err.message
    });
  }

  back(): void {
    this.router.navigate(['/employee-list']);
  }
}
