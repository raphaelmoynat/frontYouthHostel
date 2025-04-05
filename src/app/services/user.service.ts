import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://hostel.raphaelmoynat.com'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      }
    }
  }

  getAllStaff() {
    return this.http.get(`${this.apiUrl}/api/staff`, this.getHeaders())
  }

  getAllUsers() {
    return this.http.get(`${this.apiUrl}/api/admin/users`, this.getHeaders())
  }

  updateUserRole(userId: number, role: string) {
    return this.http.put(`${this.apiUrl}/api/admin/update-role/${userId}`, { role }, this.getHeaders())
  }
}
