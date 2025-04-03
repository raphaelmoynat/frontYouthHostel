// src/app/bed-create-modal/bed-create-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bed-create-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bed-create-modal.component.html'
})
export class BedCreateModalComponent {
  @Input() isOpen = false;
  @Input() roomId: number = 0;
  @Input() roomName: string = '';
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() bedCreated = new EventEmitter<any>();

  bed = {
    room: 0,
    pricePerNight: 0
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnChanges() {
    if (this.isOpen && this.roomId) {
      this.bed = {
        room: this.roomId,
        pricePerNight: 0
      };
      this.successMessage = '';
      this.errorMessage = '';
    }
  }

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

  createBed() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    this.http.post('https://hostel.raphaelmoynat.com/api/staff/create/bed', this.bed, { headers })
      .subscribe({
        next: (response: any) => {
          this.successMessage = 'Lit créé avec succès!'
          this.bedCreated.emit(response)

          setTimeout(() => {
            this.closeModal()
          }, 2000)
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la création du lit';
          console.error(error)
        }
      });
  }
}
