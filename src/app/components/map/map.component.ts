import { Component, AfterViewInit, HostListener } from '@angular/core';
import * as L from 'leaflet';
import { GeodataService } from 'src/app/services/geodata.service';
import { MatDialog } from '@angular/material/dialog';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  // Private property to store the Leaflet map instance
  private map!: any;
 

  constructor(
    private geoData: GeodataService,
    public dialog: MatDialog
  ) {}

  // Method to determine the color based on a given SV index value.
  getColorBasedOnSV(svIndex: number) {
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
          weight: 1, 
          opacity: 1, 
          fillOpacity: 0.7, 
        };
      },

      onEachFeature: (feature: any, layer: any) => {
        const specificZoneData = (e: any) => {
          this.geoData.clickedZoneData = e.target.feature.properties;
        };
        // Function to create the popup content for hovering

        let content =
          '<b>State:</b>' +
          feature.properties.State +
          '<br>' +
          '<b>Country:</b>' +
          feature.properties.County +
          '<br>' +
          '<b>Region:</b>' +
          feature.properties.Region +
          '<br>' +
          '<b>Pop_T:</b>' +
          feature.properties.Pop_T +
          '<br>' +
          '<b>PopDense:</b>' +
          feature.properties.PopDense +
          '<br>' +
          '<b>Prcnt_U18:</b>' +
          feature.properties.Prcnt_U18 +
          '<br>' +
          '<b>Under18:</b>' +
          feature.properties.Under18 +
          '<br>' +
          '<b>Prcnt_65O:</b>' +
          feature.properties.Prcnt_65O +
          '<br>' +
          '<b>Over65:</b>' +
          feature.properties.Over65 +
          '<br>' +
          '<b>Prcnt_HHBM:</b>' +
          feature.properties.Prcnt_HHBM +
          '<br>' +
          '<b>HH_Below50:</b>' +
          feature.properties.HH_Below50 +
          '<br>' +
          '<b>Prcnt_Lng:</b>' +
          feature.properties.Prcnt_Lng +
          '<br>' +
          '<b>PoorEng:</b>' +
          feature.properties.PoorEng +
          '<br>' +
          '<b>Non_white:</b>' +
          feature.properties.Non_white +
          '<br>' +
          '<b>Occ_HU:</b>' +
          feature.properties.Occ_HU +
          '<br>' +
          '<b>HU:</b>' +
          feature.properties.HU +
          '<br>' +
          '<b>Prcnt_Rent:</b>' +
          feature.properties.Prcnt_Rent +
          '<br>' +
          '<b>SV_Index2:</b>' +
          feature.properties.SV_Index2 +
          '<br><br>' +
          "<button id= 'chartBtn'  mat-button >View Chart</button>" +
          '<br><br>';

        let customOptions = {
          width: '400',
          maxHeight: '250',
          maxWidth: '400',
        };
   
        layer.bindPopup(content, customOptions),
          layer.on({
           
            mouseover: function over(e: any) {
              e.target.setStyle({
                maxWidth: 400,
               
              });
              
              layer.bindTooltip(
            
          '<b>Country: </b>' +
          feature.properties.County +
          '<br>' +
          '<b>NAMELSAD10: </b>' +
          feature.properties.NAMELSAD10 +
          '<br>' +
          '<b>Region: </b>' +
          feature.properties.Region +
          '<br>' +
          '<b>SV_Index2: </b>' +
          feature.properties.SV_Index2 +
          '<br>', { direction: 'top' }

               
              );
              layer.openTooltip();
            },
            mouseout: function over(e: any){
              e.target.setStyle((feature))
              layer.unbindTooltip();
              layer.closeTooltip();
            }, 
            
          });

       

        layer.on('click', (e: any) => {
          specificZoneData(e);
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
        '#006837',
        '#1A9850',
        '#66BD63',
        '#A6D96A',
        '#E4F4AE',
        '#FEE9AE',
        '#FDAE61',
        '#F46D43',
        '#D73027',
        '#71001B',
        '#AF7843',
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
      this.geoData.getGeoJSON().subscribe((data) => {
        this.initMap(data);
        // this.displayLegend = this.getLegendData();
        this.displayLegend();
      });
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    let id = event.target.id;
    if (id == 'chartBtn') {
      this.openDialog(this.geoData.clickedZoneData);
    }
  }

  private openDialog(feature: any) {
    const dialogRef = this.dialog.open(ChartComponent, {
      data: { feature, },
      // width: '500px',
      // height: '400px'
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      // Handle the dialog closure if needed
    });
  }
  

}
