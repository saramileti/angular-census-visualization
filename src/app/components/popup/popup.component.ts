import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  // Create a subject for notifying changes
  notifier = new Subject();

  constructor(
    // Inject the Angular Router for navigation
    private router: Router,
    // Inject data passed into the dialog
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  // Define a click event listener for the component
  @HostListener('click', ['$event'])
  onClick(event: any) {
    let id = event.target.id;
    if (id == 'chartBtn') {
      this.openChart();
    }
  }
  // Method to open the chart by navigating to the 'chart' outlet
  openChart() {
    this.router.navigate([{ outlets: { chart: ['chart'] } }]);
  }
}
