import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { BookingService } from '../services/booking.service'

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-bookings.component.html'
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = []
  isLoading = false
  errorMessage = ''

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings()
  }

  loadBookings() {
    this.isLoading = true
    this.errorMessage = ''

    this.bookingService.getMyBookings().subscribe({
      next: (data: any) => {
        this.bookings = data
        this.isLoading = false
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement de vos réservations'
        console.error(error)
        this.isLoading = false
      }
    })
  }

  formatDate(dateString: string) {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  getStatusLabel(status: string) {
    const statusMap: { [key: string]: { label: string, cssClass: string } } = {
      'confirmed': { label: 'Confirmée', cssClass: 'bg-success' },
      'waiting payment': { label: 'En attente de paiement', cssClass: 'bg-warning' },
      'cancelled': { label: 'Annulée', cssClass: 'bg-danger' },
      'pending': { label: 'En attente', cssClass: 'bg-info' }
    }

    return statusMap[status] || { label: status, cssClass: 'bg-secondary' }
  }

  getRoomNames(booking: any): string {
    if (!booking.rooms || !Array.isArray(booking.rooms)) {
      return '';
    }
    return booking.rooms.map((r: any) => r.name).join(', ');
  }
}
