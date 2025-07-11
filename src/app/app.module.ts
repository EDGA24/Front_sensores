import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Ruta pública
  { 
    path: 'login', 
    component: LoginZNComponent,
    data: { title: 'Iniciar Sesión' }
  },
  
  // Rutas protegidas
  { 
    path: 'dashboard', 
    component: RegisteDashboardComponent,
    canActivate: [AuthGuard],
    data: { title: 'Dashboard', roles: ['user', 'admin'] }
  },
  { 
    path: 'sensor-monitor', 
    component: Sensor1DisplayComponent,
    canActivate: [AuthGuard],
    data: { title: 'Monitor de Sensores', roles: ['user', 'admin'] }
  },
  
  
  // Redirecciones
  { 
    path: '', 
    redirectTo: '/dashboard', 
    pathMatch: 'full' 
  },
  
  
  // Wildcard route - debe ir al final
  { 
    path: '**', 
    redirectTo: '/404' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // Cambiar a true para debugging
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Importaciones adicionales para la preloading strategy
import { PreloadAllModules } from '@angular/router';
import { LoginZNComponent } from './LoginUser/login-zn/login-zn.component';import { RegisteDashboardComponent } from './admin/features/registe-dashboard/registe-dashboard.component';
import { Sensor1DisplayComponent } from './sensors/sensor1/sensor1-display/sensor1-display.component';

