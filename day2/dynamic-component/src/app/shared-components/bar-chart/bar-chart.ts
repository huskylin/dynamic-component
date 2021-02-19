// 藉由 value 或 category 來決定哪一軸是放數值, 哪一軸是放類別(日期, 種類等等)
// 並且放在對應的 xAxis, yAxis
export interface BarChart {
  year: number;
  xType: 'value' | 'category';
  yType: 'value' | 'category';
  xAxis: Array<string | number>;
  yAxis: Array<string | number>;
}
