import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  barChart = {
    xType: 'category',
    yType: 'value',
    xAxis: [9, 10, 8, 5, 6, 6],
    yAxis: [6, 7, 3, 9, 6, 4],
  }
  lineChart = {
    xAxis: Array.from([...Array(24).keys()]),
    lines: [
      { 'name': '使用率', 'values': [9, 10, 8, 5, 6, 6, 4, 9, 2, 3, 2, 3, 2, 3, 8, 9, 2, 3, 2, 3, 2, 3, 8, 14] }
    ],
  };
  pieChart = {
    legend: ['邪惡勢力', '還是邪惡勢力'],
    data: [333, 666]
  };

}
