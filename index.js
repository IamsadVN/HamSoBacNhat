import conf from "./config.js";
import { laygiatriX, laygiatriY } from "./function.js";
import { table } from "table";
import fs from "fs";
import { createCanvas } from "canvas";
import { Chart, Title, plugins, scales } from "chart.js/auto";

const canvas = createCanvas(800,600);
const ctx = canvas.getContext('2d');

//Dữ liệu của biểu đồ
let xValues = laygiatriX(conf.start,conf.end,conf.step);
let yValuesOfParabol = laygiatriY(conf.parabol,xValues);
let yValuesOfLine = laygiatriY(conf.line,xValues);

//In ra bảng giá trị
const temp = [
    xValues,
    yValuesOfParabol,
    yValuesOfLine
];
console.log(table(temp));

//Data ben Chart.js
const dataOfChart = {
    label: xValues,
    datasets: [
        {
            label: `${conf.parabol}`,
            data: yValuesOfParabol,
            fill: true,
            borderColor: `rgb(75,192,192)`,
            tension: 0.3,
            //borderWidth: 1
        },
        {
            label: `${conf.line}`,
            data: yValuesOfLine,
            fill: false,
            borderColor: `rgb(255,69,0)`,
            tension: 0.1,
            //borderWidth: 1
        }
    ]
};
const configOfChart = {
    type: 'line',
    data: dataOfChart,
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Hệ trục tọa độ"
            }
        },
        scales: {
            x: {
                ticks: {
                    stepSize: 1
                }
            },
            y: {
                beginAtZero: false
            }
        }
    }
};

const myChart = new Chart(ctx,configOfChart);

const imageBuffer = canvas.toBuffer();
fs.writeFileSync('myChart.png', imageBuffer);