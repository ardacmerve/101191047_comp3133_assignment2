import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class AppComponent {
  constructor(private router: Router) {
    console.log('Router configuration:', this.router.config);
  }
}
