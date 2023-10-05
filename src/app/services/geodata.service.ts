import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeodataService {
  getCountryBorders() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  getGeoJSON(): Observable<any> {
    return this.http.get('assets/data.geojson');
  }
}
