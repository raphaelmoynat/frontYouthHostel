import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }

  isAdmin() {
    return this.authService.isAdmin()
  }

  getUsername() {
    return this.authService.getUsername()
  }

  onLogout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
