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
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.clearMessages();

    // Chequeo básico extra (FE-LOG-004, 005, 006)
    if (!this.email && !this.password && !this.folio) {
      this.errorMessage = 'FE-LOG-004: Por favor completa todos los campos.';
      return;
    }
    if (!this.email) {
      this.errorMessage = 'FE-LOG-005: El campo correo está vacío.';
      return;
    }
    if (!this.password) {
      this.errorMessage = 'FE-LOG-006: El campo contraseña está vacío.';
      return;
    }
    if (!this.folio) {
      this.errorMessage = 'FE-LOG-004: El campo folio está vacío.';
      return;
    }

    // Aquí debes adaptar este loginUser para que retorne códigos de error específicos:
    // Por ejemplo: 'SUCCESS', 'USER_NOT_FOUND', 'WRONG_PASSWORD', 'USER_BLOCKED'
    const loginResult = String(this.authService.loginUser(this.email, this.password, this.folio));

    switch (loginResult) {
      case 'SUCCESS':
        this.successMessage = 'FE-LOG-001: Login exitoso.';
        if (this.authService.isAdminLoggedIn()) {
          this.router.navigate(['/dashboard']);
        } else if (this.authService.isUserLoggedIn()) {
          this.router.navigate(['/sensorView']);
        }
        break;

      case 'USER_NOT_FOUND':
        this.errorMessage = 'FE-LOG-002: Usuario inexistente.';
        break;

      case 'WRONG_PASSWORD':
        this.errorMessage = 'FE-LOG-003: Contraseña incorrecta.';
        break;

      case 'USER_BLOCKED':
        this.errorMessage = 'FE-LOG-007: Usuario bloqueado o inactivo.';
        break;

      default:
        this.errorMessage = 'Error desconocido durante el inicio de sesión.';
        break;
    }
  }

  forgotPassword() {
    // Aquí puedes implementar la lógica o redireccionar a una página para recuperar contraseña
    alert('FE-LOG-008: Funcionalidad de "Olvidé mi contraseña" no implementada aún.');
  }

  private clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
