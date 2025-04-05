import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserService } from '../services/user.service'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-list.component.html'
})
export class StaffListComponent implements OnInit {
  staffMembers: any[] = []
  errorMessage = ''

  constructor(
    private userService: UserService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadStaff()
  }

  loadStaff() {
    this.userService.getAllStaff().subscribe({
      next: (data: any) => {
        this.staffMembers = data
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement du personnel'
        console.error(error)
      }
    })
  }
}
