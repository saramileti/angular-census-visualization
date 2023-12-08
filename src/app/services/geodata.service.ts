import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeodataService {
  clickedZoneData: any;
constructor(private http: HttpClient) {}

  getGeoJSON(): Observable<any> {
    const apiUrl =  'https://data-beta-nyc-files.s3.amazonaws.com/resources/a532598e-7313-4c7e-a9d0-e0804b527bb3/cf01eccd73eb44d796458277b4737103geojsonsocialvulnerabilityindexcensustracts.geojson?Signature=guDx5T6BtUnYalzX6iW8ISUprB0%3D&Expires=1701878748&AWSAccessKeyId=AKIAWM5UKMRH2KITC3QA';
    // return this.http.get('assets/data.geojson').pipe(
    //   tap((response) => {
    //     console.log('GeoJSON Data:', response);
    //   })
    // );
    return this.http.get(apiUrl).pipe(
      tap((response) =>{
        console.log('GeoJSON Data:', response);
      })
    )

    
  }

 
}
