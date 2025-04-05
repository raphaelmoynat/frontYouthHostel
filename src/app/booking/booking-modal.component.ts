import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { BookingService } from '../services/booking.service'
import { StripeService } from '../services/stripe.service'

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-modal.component.html'
})
export class BookingModalComponent {
  @Input() room: any
  @Input() isOpen = false
  @Output() isOpenChange = new EventEmitter<boolean>()

  bookingData = {
    startDate: '',
    endDate: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    rooms: [] as any[],
    extras: {
      towels: 0,
      luggage_service: 0,
      breakfast: false
    }
  }

  errorMessage = ''
  successMessage = ''
  isLoading = false

  constructor(
    private bookingService: BookingService,
    private stripeService: StripeService,
    private router: Router
  ) {}

  ngOnChanges() {
    if (this.room) {
      this.bookingData.rooms = [{
        id: this.room.id,
        beds: this.room.beds.map((bed: any) => ({ id: bed.id }))
      }]
    }
  }

  closeModal() {
    this.isOpen = false
    this.isOpenChange.emit(false)
  }

  createBooking() {
    this.errorMessage = ''
    this.successMessage = ''
    this.isLoading = true

    this.bookingService.createBooking(this.bookingData).subscribe({
      next: (response: any) => {
        if (response.success && response.paymentIntentId) {
          this.successMessage = 'Réservation créée, traitement du paiement...'
          this.stripeService.confirmPaymentWithStripe(response.paymentIntentId).subscribe({
            next: (paymentResult: any) => {
              if (paymentResult.status === 'succeeded') {
                this.successMessage = 'Paiement réussi! Redirection...'

                setTimeout(() => {
                  this.router.navigate(['/payment-success'], {
                    queryParams: {
                      booking_id: response.id || 'BOOKING',
                      amount: response.totalAmount
                    }
                  })
                  this.closeModal()
                }, 1500)
              } else {
                this.errorMessage = 'Erreur lors du paiement'
                this.isLoading = false
              }
            },
            error: (error) => {
              this.errorMessage = 'Erreur lors du traitement du paiement'
              this.isLoading = false
            }
          })
        } else {
          this.errorMessage = 'Erreur lors de la création de la réservation'
          this.isLoading = false
        }
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la création de la réservation'
        this.isLoading = false
      }
    })
  }
}
