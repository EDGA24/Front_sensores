// app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

// Componentes mock para las rutas
@Component({
  template: '<h2>Login Page</h2>'
})
class MockLoginComponent { }

@Component({
  template: '<h2>Dashboard Page</h2>'
})
class MockDashboardComponent { }

@Component({
  template: '<h2>Sensor Monitor Page</h2>'
})
class MockSensorMonitorComponent { }

@Component({
  template: '<h2>Profile Page</h2>'
})
class MockProfileComponent { }

// Mock del servicio de autenticación
class MockAuthService {
  private isAuthenticated = false;

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  login(): void {
    this.isAuthenticated = true;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  setAuthState(state: boolean): void {
    this.isAuthenticated = state;
  }
}

// Rutas protegidas con guards
const routes = [
  { 
    path: 'login', 
    component: MockLoginComponent 
  },
  { 
    path: 'dashboard', 
    component: MockDashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'sensor-monitor', 
    component: MockSensorMonitorComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'profile', 
    component: MockProfileComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    redirectTo: '/dashboard', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];

describe('AppComponent with Protected Routes', () => {
  let router: Router;
  let location: Location;
  let authService: MockAuthService;
  let fixture: any;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(routes)
      ],
      declarations: [
        AppComponent,
        MockLoginComponent,
        MockDashboardComponent,
        MockSensorMonitorComponent,
        MockProfileComponent
      ],
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    authService = TestBed.inject(AuthService) as MockAuthService;
    
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'sensor-monitor'`, () => {
    expect(app.title).toEqual('sensor-monitor');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, sensor-monitor');
  });

  // Pruebas para rutas protegidas
  describe('Protected Routes Navigation', () => {
    
    it('should redirect to login when accessing protected route without authentication', async () => {
      authService.setAuthState(false);
      
      await router.navigate(['/dashboard']);
      fixture.detectChanges();
      
      expect(location.path()).toBe('/login');
    });

    it('should allow access to dashboard when authenticated', async () => {
      authService.setAuthState(true);
      
      await router.navigate(['/dashboard']);
      fixture.detectChanges();
      
      expect(location.path()).toBe('/dashboard');
    });

    it('should allow access to sensor-monitor when authenticated', async () => {
      authService.setAuthState(true);
      
      await router.navigate(['/sensor-monitor']);
      fixture.detectChanges();
      
      expect(location.path()).toBe('/sensor-monitor');
    });

    it('should allow access to profile when authenticated', async () => {
      authService.setAuthState(true);
      
      await router.navigate(['/profile']);
      fixture.detectChanges();
      
      expect(location.path()).toBe('/profile');
    });

    it('should redirect to login when accessing profile without authentication', async () => {
      authService.setAuthState(false);
      
      await router.navigate(['/profile']);
      fixture.detectChanges();
      
      expect(location.path()).toBe('/login');
    });

    it('should redirect to dashboard for empty path when authenticated', async () => {
      authService.setAuthState(true);
      
      await router.navigate(['']);
      fixture.detectChanges();
      
      expect(location.path()).toBe('/dashboard');
    });

    it('should redirect to login for empty path when not authenticated', async () => {
      authService.setAuthState(false);
      
      await router.navigate(['']);
      fixture.detectChanges();
      
      expect(location.path()).toBe('/login');
    });

    it('should redirect to login for invalid routes', async () => {
      await router.navigate(['/invalid-route']);
      fixture.detectChanges();
      
      expect(location.path()).toBe('/login');
    });

    it('should allow navigation after login', async () => {
      // Inicialmente sin autenticación
      authService.setAuthState(false);
      await router.navigate(['/dashboard']);
      expect(location.path()).toBe('/login');

      // Simular login
      authService.setAuthState(true);
      await router.navigate(['/dashboard']);
      fixture.detectChanges();
      
      expect(location.path()).toBe('/dashboard');
    });

    it('should redirect to login after logout', async () => {
      // Inicialmente autenticado
      authService.setAuthState(true);
      await router.navigate(['/dashboard']);
      expect(location.path()).toBe('/dashboard');

      // Simular logout
      authService.setAuthState(false);
      await router.navigate(['/profile']);
      fixture.detectChanges();
      
      expect(location.path()).toBe('/login');
    });
  });

  // Pruebas adicionales para el guard
  describe('AuthGuard Tests', () => {
    let authGuard: AuthGuard;

    beforeEach(() => {
      authGuard = TestBed.inject(AuthGuard);
    });

    it('should allow access when user is authenticated', () => {
      authService.setAuthState(true);
      const result = authGuard.canActivate();
      expect(result).toBe(true);
    });

    it('should deny access when user is not authenticated', () => {
      authService.setAuthState(false);
      const result = authGuard.canActivate();
      expect(result).toBe(false);
    });
  });
});