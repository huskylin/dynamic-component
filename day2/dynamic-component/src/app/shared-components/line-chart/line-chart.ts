export interface LineChart {
    year: number;
    xAxis: string[] | number[];
    lines: Line[];
}

interface Line {
    name: string;
    values: number[];
}
