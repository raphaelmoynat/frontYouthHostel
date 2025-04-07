import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BookingService } from '../services/booking.service'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-management.component.html'
})
export class BookingManagementComponent implements OnInit {
  bookings: any[] = []
  isLoading = false
  errorMessage = ''
  successMessage = ''

  constructor(
    private bookingService: BookingService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadBookings()
  }

  loadBookings() {
    this.isLoading = true
    this.errorMessage = ''

    this.bookingService.getAllBookings().subscribe({
      next: (data: any) => {
        this.bookings = data
        this.isLoading = false
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des réservations'
        console.error(error)
        this.isLoading = false
      }
    })
  }

  confirmBooking(bookingId: number) {
    if (confirm('Êtes-vous sûr de vouloir confirmer cette réservation?')) {
      this.isLoading = true
      this.errorMessage = ''
      this.successMessage = ''

      this.bookingService.confirmBooking(bookingId).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.successMessage = 'Réservation confirmée avec succès'
            this.loadBookings()
          } else {
            this.errorMessage = 'Erreur lors de la confirmation'
          }
          this.isLoading = false
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la confirmation de la réservation'
          console.error(error)
          this.isLoading = false
        }
      })
    }
  }

  cancelBooking(bookingId: number) {
    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation?')) {
      this.isLoading = true
      this.errorMessage = ''
      this.successMessage = ''

      this.bookingService.cancelBooking(bookingId).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.successMessage = 'Réservation annulée avec succès'
            this.loadBookings()
          } else {
            this.errorMessage = 'Erreur lors de l\'annulation'
          }
          this.isLoading = false
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de l\'annulation de la réservation'
          console.error(error)
          this.isLoading = false
        }
      })
    }
  }

  getRoomNames(booking: any): string {
    if (!booking.rooms || !Array.isArray(booking.rooms)) {
      return ''
    }
    return booking.rooms.map((r: any) => r.name).join(', ')
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
}
