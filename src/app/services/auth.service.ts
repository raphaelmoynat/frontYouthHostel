import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://hostel.raphaelmoynat.com'

  constructor(private http: HttpClient) { }

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      username: username,
      password: password
    })
  }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/login`, {
      username: username,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  saveToken(token: string) {
    localStorage.setItem('token', token)
  }

  saveUsername(username: string) {
    localStorage.setItem('username', username)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getUsername() {
    return localStorage.getItem('username')
  }

  isLoggedIn() {
    return this.getToken() !== null
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }
}
