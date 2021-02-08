import { colors } from '../colors';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { graphic } from 'echarts';
import { LineChart } from './line-chart';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input() data: LineChart = {
    xAxis: [],
    lines: [],
  };
  constructor() { }

  lineChartOption: any = {
    legend: {
      textStyle: {
        color: colors['color-gray-200'],
        fontSize: 14
      },
    },
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
      top: '8%',
    },
    xAxis: [{
      type: 'category',
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
        margin: 20,
        color: colors['color-gray-200'],
      },
      splitLine: {
        show: false
      },
      boundaryGap: false,
      axisTick: {
        show: true,
      },
      data: [],

    }],
    yAxis: [{
      type: 'value',
      min: 0,
      splitNumber: 4,
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
        margin: 20,
        textStyle: {
          color: colors['color-gray-200'],
        },
      },
      axisTick: {
        show: true,
      },
    }],
    series: []
  };
  lineChartUpdates: any = {};
  drawChart(data: any) {
    const colorNames = ['primary', 'info', 'danger', 'success', 'warning', 'gray'];
    const series = [];
    data.lines.forEach((line, index) => {
      series.push({
        name: line.name,
        type: 'line',
        showAllSymbol: true,
        symbol: 'circle',
        smooth: false,
        showSymbol: true,
        symbolSize: 5,
        lineStyle: {
          normal: {
            width: 5,
            color: new graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: colors[`color-${colorNames[index % colorNames.length]}-500`]
            }, {
              offset: 1,
              color: colors[`color-${colorNames[index % colorNames.length]}-300`]
            }]),
            shadowColor: colors[`color-${colorNames[index % colorNames.length]}-transparent-700`],
            shadowBlur: 20,
            shadowOffsetY: 15
          },
        },
        itemStyle: {
          color: colors[`color-${colorNames[index % colorNames.length]}-500`],
          borderColor: '#fff',
          borderWidth: 2,
          shadowColor: 'rgba(0, 0, 0, .1)',
          shadowBlur: 0,
          shadowOffsetY: 2,
          shadowOffsetX: 2,
        },
        tooltip: {
          show: true
        },
        data: line.values
      });
    });
    this.lineChartOption = {
      legend: {
        textStyle: {
          color: colors['color-gray-200'],
          fontSize: 14
        },
        show: data.lines.length > 1 ? true : false,
        data: data.lines.map(l => l.name)
      },
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
        top: '5%',
        left: '5%',
      },
      xAxis: [{
        type: 'category',
        data: data.xAxis,
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
          margin: 20,
          color: colors['color-gray-200'],
        },
        splitLine: {
          show: false
        },
        boundaryGap: false,
        axisTick: {
          show: true,
        }
      }],
      yAxis: [{
        type: 'value',
        min: 0,
        splitNumber: 4,
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
          margin: 20,
          textStyle: {
            color: colors['color-gray-200'],
          },
        },
        axisTick: {
          show: true,
        },
      }],
      series: series
    };
  }
  ngOnInit() {
  }
  ngOnChanges(changes: any): void {
    if (changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;
      this.drawChart(this.data);
    }
  }
}
