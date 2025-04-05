import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {tap} from 'rxjs';

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
    }).pipe(
      tap((response: any) => {
        this.saveToken(response.token || response.access)
        this.saveUsername(username)
        if (response.roles) {
          this.saveRole(response.roles)
        }
      })
    )
  }

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/login`, {
      username: username,
      password: password
    }).pipe(
      tap((response: any) => {
        this.saveToken(response.token)
        this.saveUsername(username)
        this.extractRolesFromToken(response.token)
      })
    )
  }

  extractRolesFromToken(token: string) {
    try {
      if (!token) return;
      const parts = token.split('.');
      if (parts.length !== 3) return;
      const payload = JSON.parse(this.b64DecodeUnicode(parts[1]));
      console.log(payload);
      if (payload && payload.roles) {
        this.saveRole(payload.roles);
        console.log(payload.roles);
      }
    } catch (error) {
      console.error(error)
    }
  }

  b64DecodeUnicode(str: string) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (str.length % 4) {
      case 0: break;
      case 2: str += '=='; break;
      case 3: str += '='; break;
    }

    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }


  getRoles(): string[] {
    const rolesJson = localStorage.getItem('roles')
    return rolesJson ? JSON.parse(rolesJson) : []
  }

  isAdmin() {
    return this.getRoles().includes('ROLE_ADMIN')
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
  saveRole(roles: string[]) {
    localStorage.setItem('roles', JSON.stringify(roles))
  }

  isStaff() {
    return this.getRoles().includes('ROLE_STAFF') || this.isAdmin()
  }

}
