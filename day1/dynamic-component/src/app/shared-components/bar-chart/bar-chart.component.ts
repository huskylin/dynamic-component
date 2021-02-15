import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { colors } from '../colors';
import { graphic } from 'echarts/dist/echarts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() data: any = {
    xType: 'category',
    yType: 'value',
    xAxis: [],
    yAxis: [],
  };
  constructor() { }

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
  ngOnInit() {
    this.data = {
      xType: 'category',
      yType: 'value',
      xAxis: [9, 10, 8, 5, 6, 6],
      yAxis: [6, 7, 3, 9, 6, 4],
    }
    this.drawChart(this.data);
  }
  ngOnChanges(changes: any): void {
    if (changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;
      this.drawChart(this.data);
    }
  }
}
