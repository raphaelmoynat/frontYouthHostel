// src/app/components/room-details-modal/room-details-modal.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Ajoutez HttpClient ici
import { AuthService } from '../services/auth.service';
import { BedCreateModalComponent } from '../bed-create-modal/bed-create-modal.component';

@Component({
  selector: 'app-room-details-modal',
  standalone: true,
  imports: [CommonModule, BedCreateModalComponent],
  templateUrl: './room-details-modal.component.html',
  styleUrls: ['./room-details-modal.component.css']
})
export class RoomDetailsModalComponent {
  @Input() room: any;
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() bedsUpdated = new EventEmitter<void>();

  isBedModalOpen = false;

  constructor(
    public authService: AuthService,
    private http: HttpClient
  ) {}

  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

  openBedCreateModal() {
    this.isBedModalOpen = true;
  }

  onBedCreated(newBed: any) {
    if (this.room && this.room.beds) {
      this.room.beds.push(newBed);
      if (this.room.totalBeds !== undefined) {
        this.room.totalBeds += 1;
      }
    }
    this.bedsUpdated.emit();
  }

  deleteBed(bedId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce lit?')) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
      });

      this.http.delete(`https://hostel.raphaelmoynat.com/api/staff/bed/delete/${bedId}`, { headers })
        .subscribe({
          next: () => {
            if (this.room && this.room.beds) {
              this.room.beds = this.room.beds.filter((bed: any) => bed.id !== bedId);
              if (this.room.totalBeds !== undefined) {
                this.room.totalBeds -= 1;
              }
            }
            this.bedsUpdated.emit();
          },
          error: (error) => {
            console.error('Erreur lors de la suppression du lit', error);
            alert('Impossible de supprimer le lit');
          }
        });
    }
  }
}
