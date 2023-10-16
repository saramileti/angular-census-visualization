import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeodataService {
  clickedZoneData : any;
 
  constructor(private http: HttpClient) {}

  getGeoJSON(): Observable<any> {
    return this.http.get('assets/data.geojson').pipe(
      tap((response) => {
        console.log('GeoJSON Data:', response);
      })
    );
  }
  

  // getGeoJSON(): Observable<any> {
  //   return this.http.get('assets/data.geojson');
  // }
}




