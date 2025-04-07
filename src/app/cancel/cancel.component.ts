import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cancel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-5">
      <div class="alert alert-warning">
        <h3>Paiement annulé</h3>
        <p>Votre paiement a été annulé. Aucun montant n'a été débité.</p>
        <a routerLink="/" class="btn btn-primary mt-3">Retour à l'accueil</a>
      </div>
    </div>
  `
})
export class CancelComponent {}
