import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from "chart.js";
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-activity-chart',
  standalone: true,
  templateUrl: './activity-chart.component.html',
  styleUrl: './activity-chart.component.scss',
  imports: [NgChartsModule, CommonModule],
})
export class ActivityChartComponent {
	@ViewChild(BaseChartDirective) chart?: BaseChartDirective;
	public isBrowser: boolean;
	
	constructor(@Inject(PLATFORM_ID) platformId: Object) {
  		this.isBrowser = isPlatformBrowser(platformId);
	}

	public updateChart(labels: string[], data: number[]) {
		this.lineChartData.labels = labels;
		this.lineChartData.datasets = [
			{
			  data: data,
			  label: 'activity',
			  fill: false,
			  tension: 0.5,
			  borderColor: '#7981AD',
			  pointBorderColor: '#7981AD',
			  pointBackgroundColor: '#2E2509',
			  pointHoverBackgroundColor: '#837446'
			}
		];
		this.chart?.update();
	}

	public lineChartData: ChartConfiguration<'line'>['data'] = {
		labels: [],
		datasets: [
		  {
			data: [],
			label: 'activity',
			fill: false,
			tension: 0.5,
			borderColor: '#7981AD',
			pointBorderColor: '#7981AD',
			pointBackgroundColor: '#2E2509',
			pointHoverBackgroundColor: '#837446'
		  }
		]
	};
	public lineChartOptions: ChartOptions<'line'> = { 
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			y: {
				min: 0,
				bounds: "data"
			}
		}
	};
	public lineChartLegend = false;
}
