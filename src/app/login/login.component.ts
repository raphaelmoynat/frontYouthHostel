import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = ''
  password = ''
  errorMessage = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin() {
    this.errorMessage = ''
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        this.router.navigate(['/'])
      },
      error: (error) => {
        this.errorMessage = 'Login failed'
        console.error(error)
      }
    })
  }
}
