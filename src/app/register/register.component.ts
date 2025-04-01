import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = ''
  password = ''
  successMessage = ''
  errorMessage = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onRegister() {
    this.successMessage = ''
    this.errorMessage = ''

    this.authService.register(this.username, this.password).subscribe({
      next: (response: any) => {
        this.successMessage = 'Registration successful!'

        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 2000)
      },
      error: (error) => {
        this.errorMessage = 'Registration failed. Please try again.'
        console.error(error)
      }
    })
  }
}
