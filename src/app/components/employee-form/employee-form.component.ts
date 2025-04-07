import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true
})
export class EmployeeFormComponent implements OnInit {
  form: FormGroup;
  id: string = '';
  isEditMode: boolean = false;
  imagePreview: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
      employee_photo: ['']
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.isEditMode = !!this.id;

    if (this.isEditMode) {
      this.employeeService.getEmployeeById(this.id).subscribe({
        next: (data) => {
          this.form.patchValue({
            ...data,
            date_of_joining: data.date_of_joining?.split('T')[0]
          });
          this.imagePreview = data.employee_photo || '';
        },
        error: (err) => this.errorMessage = err.message
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.form.patchValue({ employee_photo: this.imagePreview });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
      salary: parseFloat(this.form.value.salary),
      date_of_joining: new Date(this.form.value.date_of_joining).toISOString()
    };

    const request = this.isEditMode
      ? this.employeeService.updateEmployee(this.id, payload)
      : this.employeeService.addEmployee(payload);

    request.subscribe({
      next: () => {
        this.successMessage = `Employee ${this.isEditMode ? 'updated' : 'added'} successfully!`;
        setTimeout(() => this.router.navigate(['/employee-list']), 2000);
      },
      error: (err) => this.errorMessage = err.message
    });
  }
}
