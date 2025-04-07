import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { Employee } from '../../models/employee.model.js';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchDept: string = '';
  searchDesig: string = '';
  error: string = '';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => this.employees = data,
      error: (err) => this.error = err.message
    });
  }

  search(): void {
    this.employeeService.searchEmployees(this.searchDept, this.searchDesig).subscribe({
      next: (data) => this.employees = data,
      error: (err) => this.error = err.message
    });
  }

  clearSearch(): void {
    this.searchDept = '';
    this.searchDesig = '';
    this.loadEmployees();
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => alert('Delete failed: ' + err.message)
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
