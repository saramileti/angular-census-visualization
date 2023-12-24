import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeodataService {
  clickedZoneData: any;
  constructor(private http: HttpClient) {}

  getGeoJSON(): Observable<any> {
    return this.http.get(environment.mapDataUrl).pipe(
      tap((response) => {
        console.log('GeoJSON Data:', response);
      })
    );
  }
}
