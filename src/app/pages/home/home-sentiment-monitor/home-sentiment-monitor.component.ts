import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-sentiment-monitor',
  templateUrl: './home-sentiment-monitor.component.html',
  styleUrls: ['./home-sentiment-monitor.component.scss']
})
export class HomeSentimentMonitorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.dashboardChartInit();
  }

  private dashboardChartInit() {
    let randomScalingFactor = function () {
        return Math.round(Math.random() * 100);
    };

    let chartBInit = function (id, type, data, options) {
        let ctx = $(id);
        let chart = new Chart(ctx, {
            type: type,
            data: data,
            options: options
        });
    };

    let chartDInit = function (id, type, data) {
        let ctx = $(id);
        let chart = new Chart(ctx, {
            type: type,
            data: data,
            options: {
                cutoutPercentage: 60,
                legend: false,
                legendCallback: function (chart) {
                    let text = [];
                    text.push('<ul class="chart-' + chart.id + '-legend">');
                    for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
                        text.push('<li><span class="circle" style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '"></span>');
                        text.push('<p class="text">');
                        if (chart.data.labels[i]) {
                            text.push(chart.data.labels[i]);
                        }
                        text.push('</p></li>');
                    }
                    text.push('</ul>');
                    return text.join("");
                },
                layout: {
                    padding: {
                        left: 12,
                        right: 12,
                        top: 12,
                        bottom: 12
                    }
                }
            }
        });

        $(`${id}-legend`).html(chart.generateLegend());
    };

    let chart1Data = {
        datasets: [{
            data: [
                50, 70, 25, 12
            ],
            backgroundColor: [
                'rgb(57,148,219)',
                'rgb(238,99,82)',
                'rgb(239,148,108)',
                'rgb(249,231,132)'
            ],
            borderWidth: [
                0, 0, 0, 0
            ],
            hoverBackgroundColor: [
                'rgb(57,148,219)',
                'rgb(238,99,82)',
                'rgb(239,148,108)',
                'rgb(249,231,132)'
            ],
            hoverBorderColor: [
                'rgb(57,148,219)',
                'rgb(238,99,82)',
                'rgb(239,148,108)',
                'rgb(249,231,132)'
            ],
            hoverBorderWidth: [
                10, 10, 10, 10
            ]
        }],
        labels: [
            'Empty',
            'Partitional',
            'Full',
            'Other'
        ]
    };

    let chart2Data = {
        datasets: [{
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            backgroundColor: [
                'rgb(57,148,219)',
                'rgb(238,99,82)',
                'rgb(171,225,136)',
                'rgb(239,148,108)',
                'rgb(249,231,132)',
                'rgb(72,99,156)'
            ],
            borderWidth: [
                0, 0, 0, 0, 0, 0
            ],
            hoverBackgroundColor: [
                'rgb(57,148,219)',
                'rgb(238,99,82)',
                'rgb(171,225,136)',
                'rgb(239,148,108)',
                'rgb(249,231,132)',
                'rgb(72,99,156)'
            ],
            hoverBorderColor: [
                'rgb(57,148,219)',
                'rgb(238,99,82)',
                'rgb(171,225,136)',
                'rgb(239,148,108)',
                'rgb(249,231,132)',
                'rgb(72,99,156)'
            ],
            hoverBorderWidth: [
                10, 10, 10, 10, 10, 10
            ]
        }],
        labels: [
            "Positive",
            "Negative",
            "Apathy",
            "Enthusiastic",
            "Romance Emotional",
            "Other"
        ]
    };

    let chart3Data = {
        labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"],
        datasets: [{
            backgroundColor: 'rgb(57, 148, 219)',
            data: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
        }]
    };

    let barOptions = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    source: 'labels'
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    min: -2,
                    max: 2,
                    stepSize: 1
                }
            }]
        }
    };

    chartDInit('#myChart1', 'doughnut', chart1Data);
    chartDInit('#myChart2', 'doughnut', chart2Data);
    chartBInit('#timeline', 'bar', chart3Data, barOptions);
  }

}
