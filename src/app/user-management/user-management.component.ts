import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserService } from '../services/user.service'
import { AuthService } from '../services/auth.service'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
  users: any[] = []
  errorMessage = ''
  successMessage = ''

  constructor(
    private userService: UserService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement '
        console.error(error)
      }
    })
  }

  updateUserRole(userId: number, currentRoles: string[]) {
    const currentRole = currentRoles[0]
    const newRole = currentRole === 'ROLE_ADMIN' ? 'ROLE_STAFF' : 'ROLE_ADMIN'

    this.userService.updateUserRole(userId, newRole).subscribe({
      next: (response: any) => {
        this.successMessage = 'Role mis à jour'
        this.loadUsers()
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la mise à jour du rôle'
        console.error(error)
      }
    })
  }
}
