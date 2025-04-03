import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { RoomService } from '../services/room.service'

@Component({
  selector: 'app-room-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './room-edit.component.html'
})
export class RoomEditComponent implements OnInit {
  roomId: number = 0
  room = {
    name: ''
  }
  errorMessage = ''
  successMessage = ''

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'))
  }

  updateRoom() {
    this.errorMessage = ''
    this.successMessage = ''

    this.roomService.updateRoom(this.roomId, this.room).subscribe({
      next: () => {
        this.successMessage = 'Chambre mise à jour avec succès'
        setTimeout(() => {
          this.router.navigate(['/rooms'])
        }, 1500)
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la mise à jour'
        console.error(error)
      }
    })
  }
}
