import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sensor-view',
  standalone: false,
  templateUrl: './sensor-view.component.html',
  styleUrls: ['./sensor-view.component.css']
})
export class SensorViewComponent {

  isLoading = false;

  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']); // FE-NAV-001
  }

  logout() {
    // Aquí haces logout real, ejemplo limpiando token o llamando servicio de Auth
    // Luego rediriges al login
    console.log('Cerrando sesión...'); // Para depuración
    // TODO: llamar al servicio Auth para cerrar sesión realmente

    this.router.navigate(['/login']); // FE-NAV-005
  }
}
