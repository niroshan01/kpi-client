import { Component } from '@angular/core';

import { ConsumableCostPerKgChartService } from './consumableCostPerKgChart.service';

import 'style-loader!./consumableCostPerKgChart.scss';
import { ChartService } from "../../chart/chart.service";

@Component({
  selector: 'consumable-cost-per-kg-chart',
  templateUrl: './consumableCostPerKgChart.html'
})
export class ConsumableCostPerKgChart {

  amChart: any;

  constructor(private _consumableCostPerKgChartService: ConsumableCostPerKgChartService, private chartService: ChartService) {

    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    let monthText: string;
    monthText = ((startDate.getMonth() + 1) < 10 ? "0" + (startDate.getMonth() + 1) : (startDate.getMonth() + 1)) + "";
    let startDateText = startDate.getFullYear() + "-" + monthText.slice(-2) + "-01";

    let endDate = new Date();
    let endDateText = endDate.getFullYear() + "-" + (endDate.getMonth() < 10 ? "0" + endDate.getMonth() : endDate.getMonth()) + "-" + (new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    this.chartService.getMonthlyConsumableCostPerKgChart(startDateText, endDateText).subscribe((data) => {
      let chartData = this._consumableCostPerKgChartService.getChartData(data);
      this.amChart = AmCharts.makeChart("consumableCostPerKgChartchartdiv", chartData);
    });
  }

  initChart(chart: any) {
    let zoomChart = () => {
    };

    chart.addListener('rendered', zoomChart);
    zoomChart();

    if (chart.zoomChart) {
      chart.zoomChart();
    }
  }
}
