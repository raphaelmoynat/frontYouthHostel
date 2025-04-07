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

  selectedBedIds: number[] = [];
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
      // Initialise les rooms sans les beds
      this.bookingData.rooms = [{
        id: this.room.id,
        beds: []
      }];

      // Vide la sélection des lits
      this.selectedBedIds = [];
    }
  }

  // Vérifie si un lit est sélectionné
  isBedSelected(bedId: number): boolean {
    return this.selectedBedIds.includes(bedId);
  }

  // Bascule la sélection d'un lit
  toggleBedSelection(bedId: number) {
    if (this.isBedSelected(bedId)) {
      this.selectedBedIds = this.selectedBedIds.filter(id => id !== bedId);
    } else {
      this.selectedBedIds.push(bedId);
    }

    // Met à jour les lits sélectionnés dans bookingData
    this.updateSelectedBeds();
  }

  // Met à jour la liste des lits sélectionnés dans bookingData
  updateSelectedBeds() {
    if (this.bookingData.rooms.length > 0) {
      this.bookingData.rooms[0].beds = this.selectedBedIds.map(id => ({ id }));
    }
  }

  // Retourne le nombre de lits sélectionnés
  getSelectedBedCount(): number {
    return this.selectedBedIds.length;
  }

  closeModal() {
    this.isOpen = false
    this.isOpenChange.emit(false)
  }

  createBooking() {
    this.errorMessage = ''
    this.successMessage = ''
    this.isLoading = true

    // Vérifie qu'au moins un lit est sélectionné
    if (this.getSelectedBedCount() === 0) {
      this.errorMessage = 'Veuillez sélectionner au moins un lit';
      this.isLoading = false;
      return;
    }

    // Met à jour les lits sélectionnés une dernière fois avant d'envoyer
    this.updateSelectedBeds();

    this.bookingService.createBooking(this.bookingData).subscribe({
      next: (response: any) => {
        if (response.success && response.paymentIntentId) {
          this.successMessage = 'Réservation créée, traitement du paiement'
          this.stripeService.confirmPaymentWithStripe(response.paymentIntentId).subscribe({
            next: (paymentResult: any) => {
              if (paymentResult.status === 'succeeded') {
                this.successMessage = 'Paiement réussi'

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
