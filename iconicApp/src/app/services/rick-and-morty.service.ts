import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacters() {
    return this.http.get(`${this.apiUrl}/character`);
  }

  getCharacter(id: number) {
    return this.http.get(`${this.apiUrl}/character/${id}`);
  }
}
