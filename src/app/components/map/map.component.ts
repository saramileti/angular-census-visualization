// import { Component, AfterViewInit } from '@angular/core';
// import * as L from 'leaflet';
// import { GeodataService } from 'src/app/services/geodata.service';

// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.css'],
// })
// export class MapComponent implements AfterViewInit {
//   private map!: L.Map;

//   constructor(private geodataservice: GeodataService) {}

//   private initMap(geojsonData: any): void {
//     this.map = L.map('map', {
//       center: [40.73061, -73.935242],
//       zoom: 10,
//       layers: [
//         L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
//           maxZoom: 18,
//           minZoom: 3,
//         }),
//       ],
//     });

//     // Create a function to determine the fillColor based on the SV index
//     const getColorBasedOnSV = (svIndex: number) => {
//       if (svIndex >= 0.9 && svIndex <= 1) {
//         return '#006837';
//       } else if (svIndex >= 0.8 && svIndex <= 0.9) {
//         return '#1A9850';
//       }
//       if (svIndex >= 0.7 && svIndex <= 0.8) {
//         return '#66BD63';
//       } else if (svIndex >= 0.6 && svIndex <= 0.7) {
//         return '#A6D96A';
//       }
//       if (svIndex >= 0.5 && svIndex <= 0.6) {
//         return '#E4F4AE';
//       } else if (svIndex >= 0.4 && svIndex <= 0.5) {
//         return '#FEE9AE';
//       }
//       if (svIndex >= 0.3 && svIndex <= 0.4) {
//         return '#FDAE61';
//       } else if (svIndex >= 0.2 && svIndex <= 0.3) {
//         return '#F46D43';
//       }
//       if (svIndex >= 0.1 && svIndex <= 0.2) {
//         return '#D73027';
//       } else if (svIndex >= 0 && svIndex <= 0.1) {
//         return '#71001B';
//       } else {
//         return '#AF7843';
//       }
//     };

//     const geojsonLayer = L.geoJSON(geojsonData, {
//       style: (feature: any) => {
//         // Access the SV index from your GeoJSON feature properties

//         const svIndex = feature.properties.SV_Index2;

//         // Use getColorBasedOnSV to determine the fill color
//         const fillColor = getColorBasedOnSV(svIndex);

//         return {
//           fillColor: fillColor,
//           color: '#796756', // outline color
//           weight: 1, // outline width
//           opacity: 1, // outline opacity
//           fillOpacity: 0.7, // fill opacity
//         };
//       },
//       onEachFeature: (feature, layer) => {
//         // Bind a popup to each feature
//         const popupContent = `
//           <div>
//             <strong>COUNTRY: </strong>${feature.properties.County}<br>
//             <strong>NAMELSAD10: </strong>${feature.properties.NAMELSAD10}<br>
//             <strong>REGION: </strong>${feature.properties.Region}<br>
//              <strong>SV_Index2: </strong>${feature.properties.SV_Index2}
//           </div>
//         `;

//         layer.bindPopup(popupContent);

//         // Add a mouseover event to open the popup when hovering over a feature
//         layer.on('mouseover', () => {
//           layer.openPopup();
//         });
//         layer.on('mouseout', () => {
//           layer.closePopup();
//         });
//       },
//     });

//     // Add the GeoJSON layer to the map
//     geojsonLayer.addTo(this.map);
//   }

//   ngAfterViewInit(): void {
//     this.geodataservice.getGeoJSON().subscribe((data) => {
//       this.initMap(data);
//     });
//   }
// }
import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeodataService } from 'src/app/services/geodata.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnInit {
  private map!: L.Map;

  constructor(
    private geodataservice: GeodataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Initialize Chart.js data (you can replace this with your data)
    // ...
  }

  private getColorBasedOnSV(svIndex: number): string {
    if (svIndex >= 0.9 && svIndex <= 1) {
      return '#006837';
    } else if (svIndex >= 0.8 && svIndex <= 0.9) {
      return '#1A9850';
    } else if (svIndex >= 0.7 && svIndex <= 0.8) {
      return '#66BD63';
    } else if (svIndex >= 0.6 && svIndex <= 0.7) {
      return '#A6D96A';
    } else if (svIndex >= 0.5 && svIndex <= 0.6) {
      return '#E4F4AE';
    } else if (svIndex >= 0.4 && svIndex <= 0.5) {
      return '#FEE9AE';
    } else if (svIndex >= 0.3 && svIndex <= 0.4) {
      return '#FDAE61';
    } else if (svIndex >= 0.2 && svIndex <= 0.3) {
      return '#F46D43';
    } else if (svIndex >= 0.1 && svIndex <= 0.2) {
      return '#D73027';
    } else if (svIndex >= 0 && svIndex <= 0.1) {
      return '#71001B';
    } else {
      return '#AF7843';
    }
  }

  private initMap(geojsonData: any): void {
    this.map = L.map('map', {
      center: [40.73061, -73.935242],
      zoom: 10,
      layers: [
        L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 3,
        }),
      ],
    });

    const geojsonLayer = L.geoJSON(geojsonData, {
      style: (feature: any) => {
        // Access the SV index from your GeoJSON feature properties
        const svIndex = feature.properties.SV_Index2;

        // Use getColorBasedOnSV to determine the fill color
        const fillColor = this.getColorBasedOnSV(svIndex);

        return {
          fillColor: fillColor,
          color: '#796756', // outline color
          weight: 1, // outline width
          opacity: 1, // outline opacity
          fillOpacity: 0.7, // fill opacity
        };
      },

      onEachFeature: (feature, layer) => {
        // Function to create the popup content for hovering
        const createHoverPopup = () => {
          return `
      <div>
        <strong>COUNTRY (Hover): </strong>${feature.properties.County}<br>
        <strong>NAMELSAD10 (Hover): </strong>${feature.properties.NAMELSAD10}<br>
        <strong>REGION (Hover): </strong>${feature.properties.Region}<br>
        <strong>SV_Index2 (Hover): </strong>${feature.properties.SV_Index2}
      </div>
    `;
        };

        // Function to create the popup content for clicking
        const createClickPopup = () => {
          return `
      <div>
        <strong>POPDENSE (Click): </strong>${feature.properties.PopDense}<br>
        <strong>COUNTY (Click): </strong>${feature.properties.County}<br>
           <strong>HH BELOW50 (Click): </strong>${feature.properties.HH_Below50}<br>
              <strong>HH NOCAR (Click): </strong>${feature.properties.HH_NoCar}<br>
                 <strong>HU (Click): </strong>${feature.properties.HU}<br>
                    <strong>MINORITY (Click): </strong>${feature.properties.Minority}<br>
                       <strong>NAMELSAD10 (Click): </strong>${feature.properties.NAMELSAD10}<br>
                          <strong>NON WHITE (Click): </strong>${feature.properties.Non_white}<br>
        <strong>OCC HU (Click): </strong>${feature.properties.Occ_HU}<br>
          <strong>OVER65 (Click): </strong>${feature.properties.Over65}<br>
            <strong>POORENG (Click): </strong>${feature.properties.PoorEng}<br>
              <strong>POP T (Click): </strong>${feature.properties.Pop_T}<br>
                <strong>EMPLOYMENT (Click): </strong>${feature.properties.Employment}<br>
                  <strong>PRCNT 650 (Click): </strong>${feature.properties.Prcnt_65O}<br>
                    <strong>PRCNT HHBM (Click): </strong>${feature.properties.Prcnt_HHBM}<br>
                      <strong>PRCNT LNG (Click): </strong>${feature.properties.Prcnt_Lng}<br>
                        <strong>PRCNT NOCA (Click): </strong>${feature.properties.Prcnt_NoCa}<br>
                          <strong>PRCNT RENT (Click): </strong>${feature.properties.Prcnt_Rent}<br>
                            <strong>PRCNT U18 (Click): </strong>${feature.properties.Prcnt_U18}<br>
                              <strong>REGION (Click): </strong>${feature.properties.Region}<br>
                                <strong>RENTERS (Click): </strong>${feature.properties.Renters}<br>
                                 <strong>STATE (Click): </strong>${feature.properties.State}<br>
                                  <strong>SV INDEX2 (Click): </strong>${feature.properties.SV_Index2}<br>
                                   <strong>UNDER18 (Click): </strong>${feature.properties.Under18}<br>
                                   
    
        <button class="popup-button" onclick="openChart('${feature.properties.County}')">View with Chart.js</button>
      </div>
    `;
        };

        // Bind the initial hover popup content to the layer
        layer.bindPopup(createHoverPopup(), {
          maxWidth: 400, // Set the maximum width of the popup
        });

        // Add a click event to open the click popup
        layer.on('click', () => {
          layer
            .bindPopup(createClickPopup(), {
              maxWidth: 400, // Set the maximum width of the popup
            })
            .openPopup();
        });

        // Add a mouseover event to open the hover popup when hovering over a feature
        layer.on('mouseover', () => {
          layer
            .bindPopup(createHoverPopup(), {
              maxWidth: 400, // Set the maximum width of the popup
            })
            .openPopup();
        });

        // Add a mouseout event to close the popup when moving the mouse away from the feature
        layer.on('mouseout', () => {
          layer.closePopup();
        });
      },
    });

    // Add the GeoJSON layer to the map
    geojsonLayer.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.geodataservice.getGeoJSON().subscribe((data) => {
      this.initMap(data);
    });
  }
}
