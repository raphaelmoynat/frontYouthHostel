import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import {RoomListComponent} from './room-list/room-list.component';
import {RoomCreateComponent} from './room-create/room-create.component';
import {RoomEditComponent} from './room-edit/room-edit.component';
import {UserManagementComponent} from './user-management/user-management.component';
import {StaffListComponent} from './staff-list/staff-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rooms', component: RoomListComponent },
  { path: 'rooms/create', component: RoomCreateComponent },
  { path: 'rooms/edit/:id', component: RoomEditComponent },
  { path: 'staff', component: StaffListComponent },
  { path: 'users', component: UserManagementComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
