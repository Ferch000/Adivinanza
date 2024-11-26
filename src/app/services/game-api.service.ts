import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {lastValueFrom} from 'rxjs';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GameApiService {

  constructor(
    private http: HttpClient
  ) { }

  async login(usuario: string, password: string): Promise<any>{ 
    const response = await lastValueFrom(
      this.http.post<{message: string, token: string}>
      (`${BASE_URL}/login`,{usuario, password})
    );
    localStorage.setItem('token', response.token);

    return response;
}
async register(correo: string, usuario: string, password: string): Promise<any>{ 
  return await this.http 
    .post(`${BASE_URL}/register`, {correo, usuario, password}) 
    .toPromise(); 
}
async start(): Promise<any>{ 
  return await this.http 
    .post(`${BASE_URL}/start`, {}) 
    .toPromise(); 
}
async guess(numero: number): Promise<any>{ 
  return await this.http 
    .post(`${BASE_URL}/guess`, {numero}) 
    .toPromise(); 
}
async restart(): Promise<any>{ 
  return await this.http 
    .post(`${BASE_URL}/restart`, {}) 
    .toPromise(); 
}
async status(): Promise<any>{ 
  return await this.http 
    .get(`${BASE_URL}/status`, {}) 
    .toPromise(); 
} 
async leaderboard(): Promise<any>{ 
  return await this.http 
    .get(`${BASE_URL}/leaderboard`) 
    .toPromise(); 
} 
async statistics(): Promise<any>{ 
  return await this.http 
  .get(`${BASE_URL}/statistics`, {}) 
  .toPromise(); 
} 
async logout(): Promise<void> {
  localStorage.removeItem('token');
}

  //Métodos de cada ruta
}
