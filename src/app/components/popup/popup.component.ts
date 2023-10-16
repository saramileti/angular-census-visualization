import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GeodataService } from 'src/app/services/geodata.service';

@Component({
  selector: 'app-popup-content',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  notifier = new Subject();

  constructor(
    public geoData: GeodataService,
    private router: Router,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  @HostListener('click', ['$event'])
  onClick(event: any) {
    let id = event.target.id;
    if (id == 'chartBtn') {
      this.openChart();
    }
  }
  openChart() {
    
    this.router.navigate([{ outlets: { chart: ['chart'] } }]);
  }
}
