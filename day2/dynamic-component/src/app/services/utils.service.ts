import { Injectable } from '@angular/core';
import { BarChartComponent } from '../shared-components/bar-chart/bar-chart.component';
import { LineChartComponent } from '../shared-components/line-chart/line-chart.component';
import { PieChartComponent } from '../shared-components/pie-chart/pie-chart.component';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() { }
  Page1Components = [
    {
      name: '折線圖',
      val: LineChartComponent,
      description: '',
      img: './assets/line.jpg',
    },
    {
      name: '長條圖',
      val: BarChartComponent,
      description: '',
      img: './assets/bar.jpg',
    },
  ];

  Page2Components = [
    {
      name: '圓餅圖',
      val: PieChartComponent,
      description: '',
      img: './assets/pie.jpg',
    }
  ];

  getAllComponents() {
    return [...this.Page1Components, ...this.Page2Components];
  }
}
