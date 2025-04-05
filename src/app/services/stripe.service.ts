import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  constructor(private http: HttpClient) {}

  confirmPaymentWithStripe(paymentIntentId: string): Observable<any> {
    // Construire les headers pour l'API Stripe
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer sk_test_51PCNM106IAn0kHEWABe5CqIL2llQqOwqFQZzgUlyKQGDngtaB34da87a8BuwZ2oTIalfIJ2riteobPqNuwS5emxi00VjWbKlWl'
    });

    // Construire le body de la requête
    const body = new URLSearchParams();
    body.set('payment_method', 'pm_card_visa');

    // Appeler directement l'API Stripe
    return this.http.post(
      `https://api.stripe.com/v1/payment_intents/${paymentIntentId}/confirm`,
      body.toString(),
      { headers }
    );
  }
}
