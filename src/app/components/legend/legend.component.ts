import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css']
})
export class LegendComponent  {
  @Input() legendData: any;

  constructor() { }



}
