import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { RoomService } from '../services/room.service'

@Component({
  selector: 'app-room-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room-create.component.html'
})
export class RoomCreateComponent {
  room = {
    name: '',
    totalBeds: 1,
    pricePerNight: 0
  }
  errorMessage = ''
  successMessage = ''

  constructor(
    private roomService: RoomService,
    private router: Router
  ) { }

  createRoom() {
    this.errorMessage = ''
    this.successMessage = ''

    this.roomService.createRoom(this.room).subscribe({
      next: (response: any) => {
        this.successMessage = response.message
        setTimeout(() => {
          this.router.navigate(['/rooms'])
        }, 1500)
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la création de la chambre'
        console.error(error)
      }
    })
  }
}
