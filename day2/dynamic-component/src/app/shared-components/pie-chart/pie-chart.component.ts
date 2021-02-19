import { colors } from '../colors';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PieChart } from './pie-chart';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {

  @Input() data: PieChart = {
    year: 2018,
    legend: [],
    data: []
  };
  constructor() { }

  pieColors = [
    {
      color: colors['color-primary-500'],
      shadow: colors['color-primary-transparent-500'],
    },
    {
      color: colors['color-info-500'],
      shadow: colors['color-info-transparent-500'],
    },
    {
      color: colors['color-success-500'],
      shadow: colors['color-success-transparent-500'],
    },
    {
      color: colors['color-danger-500'],
      shadow: colors['color-danger-transparent-500'],
    },
    {
      color: colors['color-warning-500'],
      shadow: colors['color-warning-transparent-500'],
    },
    {
      color: colors['color-gray-500'],
      shadow: colors['color-gray-transparent-500'],
    }
  ];
  pieChartOption: any = {};
  selectedTime: any;
  getSeriesList(data: number[], legend: string[]) {
    const seriesList = [];
    data.forEach((d, index) => {
      seriesList.push({
        value: d,
        name: legend[index],
        itemStyle: {
          normal: {
            borderWidth: 5,
            shadowBlur: 20,
            borderColor: this.pieColors[index].color,
            shadowColor: this.pieColors[index].shadow,
            color: this.pieColors[index].color
          }
        }
      })
    });
    return seriesList;
  }
  drawChart(legend: string[], total: number, list: any[]) {
    this.pieChartOption = {
      tooltip: {
        show: true
      },
      legend: {
        orient: 'vertical',
        data: legend,
        icon: 'circle',
        right: '3%',
        top: '5%',
        textStyle: {
          color: colors['color-gray-200'],
          fontSize: 12
        }
      },
      series: [{
        name: '',
        type: 'pie',
        clockWise: false,
        startAngle: '90',
        center: ['50%', '50%'],
        radius: ['50%', '51%'],
        hoverAnimation: false,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'outside',
              formatter: (params) => {
                const percent = params.percent;
                return `${percent}%`;
              },
              textStyle: {
                align: 'center',
                baseline: 'middle',
                fontSize: 16,
                fontWeight: '100',
                lineHeight: 30,
                color: colors['color-gray-100']
              },
              alignTo: 'edge',
              margin: 30
            },
            labelLine: {
              length: 10,
              length2: 10,
              show: true,
              color: '#00ffff'
            }
          }
        },
        data: list,
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return idx * 50;
        }
      },
      ]
    };
  }
  selectedChange() {
    let newData = {
      legend: [],
      data: [],
    }
    if (this.selectedTime === '0') {
      newData = {
        legend: ['已註冊', '未註冊'],
        data: [this.data.data[0] - 10, 100 - (this.data.data[0]-10)]
      }
    } else if (this.selectedTime === '1') {
      newData = {
        legend: ['已註冊', '未註冊'],
        data: [this.data.data[0] + 10, 100 - (this.data.data[0]+10)]
      }
    }
    let total = 0;
    newData.data.forEach(value => { total += value });
    const legend = newData.legend;
    const data = newData.data;
    const seriesList = this.getSeriesList(data, legend);
    this.drawChart(legend, total, seriesList)
    console.log(this.data);
  }
  ngOnInit() {
    console.log('PieChart OnInit');
  }
  ngOnChanges(changes: any): void {
    if (changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;
      let total = 0;
      this.data.data.forEach(value => { total += value });
      const legend = this.data.legend;
      const data = this.data.data;
      const seriesList = this.getSeriesList(data, legend);
      this.drawChart(legend, total, seriesList);
    }
  }

}
