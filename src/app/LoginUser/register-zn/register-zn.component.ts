import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../service/auth-service.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register-zn',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-zn.component.html',
  styleUrls: ['./register-zn.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class RegisterZNComponent {
  folio: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  register() {
    // Se registra el usuario utilizando el servicio de autenticación
    var success = this.authService.registerUser(this.folio, this.name, this.email, this.password)
    if (success) {
      // Si el registro es exitoso, se muestra un mensaje de éxito
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
    } else {
      //
      this.errorMessage = 'Folio inválido. No puedes registrarte sin un folio válido.';
    }
  }
}
