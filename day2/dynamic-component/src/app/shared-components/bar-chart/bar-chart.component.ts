import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { colors } from '../colors';
import { graphic } from 'echarts/dist/echarts';
import { BarChart } from './bar-chart';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() data: BarChart = {
    year: 2018,
    xType: 'category',
    yType: 'value',
    xAxis: [],
    yAxis: [],
  };
  constructor() { }
  selectedTime: any;
  barChartOption: any = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(0, 255, 233,0)'
            }, {
              offset: 0.5,
              color: 'rgba(255, 255, 255,1)',
            }, {
              offset: 1,
              color: 'rgba(0, 255, 233,0)'
            }],
            global: false
          }
        },
      },
    },
    grid: {
      top: '3%',
      bottom: '20%',
      left: '1%',
      right: '1%',
    },
    xAxis: [{
      type: this.data.xType,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors['color-gray-200'],
        }
      },
      splitArea: {
        show: false
      },
      axisLabel: {
        interval: 0,
        margin: 20,
        color: colors['color-gray-200'],
      },
      splitLine: {
        show: false
      },
      // boundaryGap: false,
      axisTick: {
        show: true,
      },
      data: [],

    }],
    yAxis: [{
      type: this.data.yType,
      splitLine: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: colors['color-gray-200'],
        }
      },
      axisLabel: {
        interval: 0,
        margin: 20,
        textStyle: {
          color: colors['color-gray-200'],
        }
      },
      axisTick: {
        show: true,
      },
    }],
    series: [{
      type: 'bar',
      barWidth: 10,
      itemStyle: {
        normal: {
          barBorderRadius: 10,
          color: colors['color-primary-400'],
          shadowColor: colors['color-primary-transparent-700'],
          shadowBlur: 20,
          shadowOffsetY: 15
        },
        label: {
          show: true,
          position: 'right',
          color: colors['color-gray-500'],
        },
      },
      data: [],
    }],
  };
  barChartUpdates: any = {};
  drawChart(data) {
    // 判斷是用x軸還是y軸當數值
    const value = data.xType === 'value' ? data.xAxis : data.yAxis;
    this.barChartUpdates.xAxis = [{
      axisLine: {
        show: true,
        lineStyle: {
          color: colors['color-gray-200'],
        }
      },
      axisLabel: {
        interval: 0,
        margin: 20,
        textStyle: {
          color: colors['color-gray-200'],
        },
      },
      splitLine: {
        show: false
      },
      type: data.xType,
      data: data.xAxis,
    }];
    this.barChartUpdates.yAxis = [{
      axisLine: {
        show: true,
        lineStyle: {
          color: colors['color-gray-200'],
        }
      },
      axisLabel: {
        interval: 0,
        margin: 20,
        textStyle: {
          color: colors['color-gray-200'],
        },
        formatter: (name) => {
          if (name.length > 9) {
            return name.substr(0, 9) + '...';
          }
          return name;
        },
      },
      splitLine: {
        show: false
      },
      type: data.yType,
      data: data.yAxis,
    }];
    this.barChartUpdates.series = [{
      data: value,
    }];
    this.barChartUpdates = { ...this.barChartUpdates };
  }
  selectedChange() {
    let newData = {}
    if (this.selectedTime === '0') {
      newData = {
        xType: 'category',
        yType: 'value',
        xAxis: this.data.xAxis.slice(0, 6),
        yAxis: this.data.yAxis.slice(0, 6),
      }
    } else if (this.selectedTime === '1') {
      newData = {
        xType: 'category',
        yType: 'value',
        xAxis: this.data.xAxis.slice(6, 12),
        yAxis: this.data.yAxis.slice(6, 12),
      }
    }
    this.drawChart(newData)
  }
  ngOnInit() {
    console.log('BarChart OnInit');
  }
  ngOnChanges(changes: any): void {
    if (changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;
      this.drawChart(this.data);
    }
  }
}
