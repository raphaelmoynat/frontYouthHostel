import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  apiUrl = 'https://hostel.raphaelmoynat.com'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders() {
    const token = this.authService.getToken()
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  }

  getAllRooms() {
    return this.http.get(`${this.apiUrl}/api/rooms`, this.getHeaders())
  }

  createRoom(roomData: any) {
    return this.http.post(`${this.apiUrl}/api/staff/create/room`, roomData, this.getHeaders())
  }

  updateRoom(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/api/staff/edit/room/${id}`, data, this.getHeaders())
  }

  deleteRoom(id: number) {
    return this.http.delete(`${this.apiUrl}/api/staff/delete/room/${id}`, this.getHeaders())
  }
}
