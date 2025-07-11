import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../service/auth-service.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login-zn',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-zn.component.html',
  styleUrls: ['./login-zn.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class LoginZNComponent {
  email: string = '';
  password: string = '';
  folio: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Si hay persistyencia de sesión, se redirige al usuario
    if (this.authService.loginUser(this.email, this.password, this.folio)) {
      if (this.authService.isAdminLoggedIn()) {
        this.router.navigate(['/dashboard']);
      } else if (this.authService.isUserLoggedIn()) {
        this.router.navigate(['/sensorView']);
      } else {
        alert('Inicio de sesión exitoso.');
      }
    } else {
      this.errorMessage = 'Correo, contraseña o folio inválidos.';
    }
  }
}
