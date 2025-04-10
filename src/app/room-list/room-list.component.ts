import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import { CommonModule } from '@angular/common'
import { RoomService } from '../services/room.service'
import { RouterLink } from '@angular/router'
import {AuthService} from '../services/auth.service';
import {RoomDetailsModalComponent} from '../room-details-modal/room-details-modal.component';
import { BookingModalComponent } from '../booking/booking-modal.component'

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RoomDetailsModalComponent, BookingModalComponent],
  templateUrl: './room-list.component.html'
})
export class RoomListComponent implements OnInit {
  rooms: any[] = []
  errorMessage = ''
  selectedRoom: any = null
  isModalOpen = false
  isBookingModalOpen = false

  constructor(private roomService: RoomService,  public authService: AuthService) { }

  ngOnInit() {
    this.loadRooms()
  }

  loadRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (data: any) => {
        this.rooms = data
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement'
        console.error(error)
      }
    })
  }

  deleteRoom(id: number) {
    if (confirm('Êtes vous sûr de vouloir supprimer cette chambre?')) {
      this.roomService.deleteRoom(id).subscribe({
        next: () => {
          this.loadRooms()
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la suppression'
          console.error(error)
        }
      })
    }
  }

  openDetailsModal(room: any) {
    this.selectedRoom = room
    this.isModalOpen = true
  }

  handleModalClose(isOpen: boolean) {
    this.isModalOpen = isOpen
  }

  openBookingModal(room: any) {
    this.selectedRoom = room
    this.isBookingModalOpen = true
  }



  handleBookingModalClose(value: boolean) {
    this.isBookingModalOpen = value
  }


  onBedsUpdated() {
    this.loadRooms()
  }

}
