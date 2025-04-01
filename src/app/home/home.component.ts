import { Component } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService) { }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }

  getUsername() {
    return this.authService.getUsername()
  }
}
