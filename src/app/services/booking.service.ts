// src/app/services/booking.service.ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  apiUrl = 'https://hostel.raphaelmoynat.com'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      }
    }
  }

  createBooking(bookingData: any) {
    return this.http.post(`${this.apiUrl}/api/create/booking`, bookingData, this.getHeaders())
  }

  getMyBookings() {
    return this.http.get(`${this.apiUrl}/api/my-bookings`, this.getHeaders())
  }

  getAllBookings() {
    return this.http.get(`${this.apiUrl}/api/staff/bookings`, this.getHeaders())
  }

  confirmBooking(bookingId: number) {
    return this.http.post(`${this.apiUrl}/api/staff/confirm/booking/${bookingId}`, {}, this.getHeaders())
  }
  cancelBooking(bookingId: number) {
    return this.http.delete(`${this.apiUrl}/api/staff/cancel/booking/${bookingId}`, this.getHeaders())
  }
}
