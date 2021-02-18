export interface LineChart {
    xAxis: string[] | number[];
    lines: Line[];
}

interface Line {
    name: string;
    values: number[];
}