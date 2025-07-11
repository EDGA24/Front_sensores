import { Injectable } from '@angular/core';

  @Injectable({
  providedIn: 'root',
})
export class AuthService {
  private adminEmail = 'admin@zeronoise.com';
  private adminPassword = 'zeronoise04';
  private adminFolio = 'FOLIO-123456789';

  validateFolio(folio: string): boolean {
    return folio === this.adminFolio || ['FOLIO-123456', 'FOLIO-789012'].includes(folio);
  }

  registerUser(folio: string, name: string, email: string, password: string): boolean {
    // Se obtiene el folio del localStorage
    const storedFolio = localStorage.getItem('folio');
    // Verifica si el folio esta en localStorage
    if (storedFolio && storedFolio === folio) {
      // Si el folio es válido, se registra el usuario
      console.log('Usuario registrado:', { name, email, password, folio });
      // se almacenan los datos del usuario en localStorage
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('folio', folio);
      return true;
    }
    return false;
  }

  loginUser(email: string, password: string, folio: string): boolean {
    if (email === this.adminEmail && password === this.adminPassword && folio === this.adminFolio) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('folio', folio);
      return true;
    }

    const storedFolio = localStorage.getItem('folio');
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedFolio && storedFolio === folio && storedEmail === email && storedPassword === password) {
      return true;
    }

    return false;
  }

  isAdminLoggedIn(): boolean {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const storedFolio = localStorage.getItem('folio');

    return storedEmail === this.adminEmail &&
           storedPassword === this.adminPassword &&
           storedFolio === this.adminFolio;
  }

  isUserLoggedIn(): boolean {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const storedFolio = localStorage.getItem('folio');
  
    return storedEmail !== this.adminEmail &&
           storedEmail !== null &&
           storedPassword !== null &&
           storedFolio !== null;
  }
  

  logout(): void {
    localStorage.removeItem('authToken')
    localStorage.removeItem('email')
    localStorage.removeItem('folio')
    localStorage.removeItem('password')
    console.log('Sesión cerrada'); 
  }
}
