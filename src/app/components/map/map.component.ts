import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { GeodataService } from 'src/app/services/geodata.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  // Private property to store the Leaflet map instance
  private map!: any;
  // legendData!: any;

  constructor(
    private geodataservice: GeodataService,
    public dialog: MatDialog
  ) {}

  // Method to open an dialog when a feature is clicked on the map
  openDialog(feature: any) {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { feature },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  // Method to determine the color based on a given SV index value.
  getColorBasedOnSV(svIndex: number) {
    // This function maps SV index values to specific colors.

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
    if (!this.map)
      this.map = L.map('map', {
        // Initial map center coordinates
        center: [40.7128, -74.006],
        zoom: 10,
        layers: [
          L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
          }),
        ],
      });

    // Create a GeoJSON layer with custom styling and popups.
    const geojsonLayer = L.geoJSON(geojsonData, {
      style: (feature: any) => {
        // Access the SV index from your GeoJSON feature properties
        const svIndex = feature.properties.SV_Index2;

        const fillColor = this.getColorBasedOnSV(svIndex);
        return {
          fillColor: fillColor,
          color: '#796756', // outline color
          weight: 1, // outline width
          opacity: 1, // outline opacity
          fillOpacity: 0.7, // fill opacity
        };
      },

      onEachFeature: (feature: any, layer: any) => {
        const specificZoneData = (e: any) => {
          this.geodataservice.clickedZoneData = e.target.feature.properties;
        };
        // Function to create the popup content for hovering
        const createHoverPopup = () => {
          return `
      <div>
        <strong>COUNTRY: </strong>${feature.properties.County}<br>
        <strong>NAMELSAD10: </strong>${feature.properties.NAMELSAD10}<br>
        <strong>REGION: </strong>${feature.properties.Region}<br>
        <strong>SV_Index2: </strong>${feature.properties.SV_Index2}
      </div>
    `;
        };

        layer.bindPopup(createHoverPopup(), {
          maxWidth: 400, // Set the maximum width of the popup
        });

        // Add a click event to open the click popup
        layer.on('click', () => {
          layer.bindPopup;
          this.openDialog(feature);
        });
        // Add a mouseover event to open the hover popup when hovering over a feature
        layer.on('mouseover', () => {
          layer
            .bindPopup(createHoverPopup(), {
              maxWidth: 400, // Set the maximum width of the popup
            })
            .openPopup();
        });

        layer.on('click', (e: any) => {
          specificZoneData(e);
        });

        //Add a mouseout event to close the popup when moving the mouse away from the feature
        layer.on('mouseout', () => {
          layer.closePopup();
        });
      },
    });

    // Add the GeoJSON layer to the map
    geojsonLayer.addTo(this.map);
  }
  // Create a legend for the Leaflet map
  private displayLegend() {
    // Create a new Leaflet control positioned at the bottom right
    let legend = new L.Control({ position: 'bottomright' });
    // Define the function to execute when the legend control is added to the map
    legend.onAdd = function () {
      let div = L.DomUtil.create('div', ' legend bullet');
      let labels = [];
      let indexes = [
        '0.9 TO 1',
        '0.8 TO 0.9',
        '0.7 TO 0.8',
        '0.6 TO 0.7',
        '0.5 TO 0.6',
        '0.4 TO 0.5',
        '0.3 TO 0.4',
        '0.2 TO 0.3',
        '0.1 TO 0.2',
        '0   TO 0.1',
      ];
      let colors = [
        '#71001B',
        '#71001B',
        '#D73027',
        '#F46D43',
        '#FDAE61',
        '#FEE9AE',
        '#E4F4AE',
        '#A6D96A',
        '#66BD63',
        '#1A9850',
        '#006837',
      ];
      let style = [
        '<style> ' +
          '' +
          '.legend {\n' +
          'position: relative;\n' +
          'right: auto;\n' +
          'bottom: auto;\n' +
          'border: 2px;\n' +
          'margin: 0;\n' +
          'border-radius: 0px;\n' +
          'padding: 13px 15px 14px 10px; \n' +
          '  background: white;\n' +
          '}' +
          '' +
          ' </style>',
      ];
      // Loop through the SV index ranges and their colors to build the legend content
      for (let i = 0; i < indexes.length; i++) {
        // Create legend entries with colored circles and SV index ranges
        div.innerHTML += labels.push(
          '<span style="background:' +
            colors[i] +
            ' ; float: left; margin: 3px 5px 0 0; width: 3px; height: 3px; border-radius: 50%; padding: 2px; border: 1px solid  rgba(0, 0, 0, 0.2);"></span> ' +
            (indexes[i] ? indexes[i] : '+')
        );
      }
      // Combine legend title, content, and style and set it as the HTML content of the div
      div.innerHTML = labels.join('<br>') + style;
      return div;
    };
    legend.addTo(this.map);
  }

  ngAfterViewInit(): void {
    if (!this.map) {
      // Initialize the map only if it hasn't been initialized before
      this.geodataservice.getGeoJSON().subscribe((data) => {
        this.initMap(data);
        // this.displayLegend = this.getLegendData();
        this.displayLegend();
      });
    }
  }
}
