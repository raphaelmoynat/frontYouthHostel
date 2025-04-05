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
import {PaymentSuccessComponent} from './success/success.component';
import {CancelComponent} from './cancel/cancel.component';
import {MyBookingsComponent} from './my-bookings/my-bookings.component';
import {BookingManagementComponent} from './booking-management/booking-management.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'rooms', component: RoomListComponent },
  { path: 'rooms/create', component: RoomCreateComponent },
  { path: 'rooms/edit/:id', component: RoomEditComponent },
  { path: 'staff', component: StaffListComponent },
  { path: 'users', component: UserManagementComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-cancel', component: CancelComponent },
  {path: 'my-bookings', component: MyBookingsComponent},
  {
    path: 'admin/bookings',
    component: BookingManagementComponent,
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
