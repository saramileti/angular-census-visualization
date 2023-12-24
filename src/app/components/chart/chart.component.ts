import { GeodataService } from 'src/app/services/geodata.service';
import { Chart, registerables } from 'chart.js';
import { Component,  Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  info: any[] = [];
  indexColor: any[] = [];
  displayedData: any;

  constructor(private geoData: GeodataService, @Inject(MAT_DIALOG_DATA)
  public data: any,) {}

  ngOnInit(): void {
    // Get the feature data from the route parameters
    this.displayedData = this.geoData.clickedZoneData;
    this.info.push(this.displayedData.Prcnt_U18);
    this.info.push(this.displayedData.Prcnt_65O);
    this.info.push(this.displayedData.Prcnt_HHBM);
    this.info.push(this.displayedData.Prcnt_Lng);
    this.info.push(this.displayedData.Prcnt_Rent);
    this.info.push(this.displayedData.Prcnt_NoCa);

    this.indexColor = this.info.map((value) => this.getColorBasedOnSV(value));

    this.createChart(this.info, 'pie', 'piechart');
    this.createChart(this.info, 'bar', 'barchart');
  }

  createChart(labelData: any, type: any, id: any) {
    const backgroundColors = this.indexColor.map((color) =>
      this.getColorBasedOnSV(color)
    );

    new Chart(id, {
      type: type,
      data: {
        labels: [
          'Prcnt_U18',
          'Prcnt_65O',
          'Prcnt_HHBM',
          'Prcnt_Lng',
          'Prcnt_Rent',
          'Prcnt_NoCa',
        ],
        datasets: [
          {
            label: 'Main Info per Region: ' + this.displayedData.Region,
            data: this.info,
            backgroundColor: this.indexColor, 
          },
        ],
      },
    });
  }

  getColorBasedOnSV(svIndex: number): string {
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
  }
  

