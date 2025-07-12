// services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Verificar si hay token en localStorage al inicializar
    const token = localStorage.getItem('authToken');
    if (token && this.isValidToken(token)) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  /**
   * Verifica si el usuario está logueado
   */
  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Realiza el login del usuario
   */
  login(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Simular llamada a API
      setTimeout(() => {
        // Aquí normalmente harías una llamada HTTP a tu backend
        if (this.validateCredentials(email, password)) {
          const token = this.generateToken(email);
          localStorage.setItem('authToken', token);
          localStorage.setItem('userEmail', email);
          this.isAuthenticatedSubject.next(true);
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 1000);
    });
  }

  /**
   * Realiza el logout del usuario
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Obtiene información del usuario actual
   */
  getCurrentUser(): { email: string } | null {
    const email = localStorage.getItem('userEmail');
    if (email && this.isLoggedIn()) {
      return { email };
    }
    return null;
  }

  /**
   * Obtiene el token actual
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Valida las credenciales (simulado)
   */
  private validateCredentials(email: string, password: string): boolean {
    // Simulación de validación - en un caso real esto sería contra tu backend
    const validUsers = [
      { email: 'admin@sensor-monitor.com', password: 'admin123' },
      { email: 'user@sensor-monitor.com', password: 'user123' },
      { email: 'demo@sensor-monitor.com', password: 'demo123' }
    ];

    return validUsers.some(user => 
      user.email === email && user.password === password
    );
  }

  /**
   * Genera un token simulado
   */
  private generateToken(email: string): string {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    return btoa(`${email}:${timestamp}:${randomStr}`);
  }

  /**
   * Valida si un token es válido
   */
  private isValidToken(token: string): boolean {
    try {
      const decoded = atob(token);
      const parts = decoded.split(':');
      
      if (parts.length !== 3) return false;
      
      const timestamp = parseInt(parts[1]);
      const now = Date.now();
      
      // Token válido por 24 horas
      const isExpired = (now - timestamp) > (24 * 60 * 60 * 1000);
      
      return !isExpired;
    } catch {
      return false;
    }
  }

  /**
   * Verifica si el usuario tiene un rol específico
   */
  hasRole(role: string): boolean {
    // Simulación de roles - en un caso real esto vendría del token o del backend
    const user = this.getCurrentUser();
    if (!user) return false;

    const userRoles: { [key: string]: string[] } = {
      'admin@sensor-monitor.com': ['admin', 'user'],
      'user@sensor-monitor.com': ['user'],
      'demo@sensor-monitor.com': ['demo', 'user']
    };

    return userRoles[user.email]?.includes(role) || false;
  }
}