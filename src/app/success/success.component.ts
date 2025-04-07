import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import {ActivatedRoute, RouterLink} from '@angular/router'

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-5">
      <div class="alert alert-success">
        <h3>Paiement réussi</h3>
        <p>Votre réservation a été confirmée</p>
        <p>Numéro de réservation: {{ bookingId }}</p>
        <a routerLink="/my-bookings" class="btn btn-primary mt-3">Voir mes réservations</a>
      </div>
    </div>
  `
})
export class PaymentSuccessComponent implements OnInit {
  bookingId: string = ''

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.bookingId = params['booking_id']
    })
  }
}
