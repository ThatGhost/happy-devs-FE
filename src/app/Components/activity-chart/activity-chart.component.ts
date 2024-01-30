import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ChartConfiguration, ChartOptions } from "chart.js";
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-activity-chart',
  standalone: true,
  templateUrl: './activity-chart.component.html',
  styleUrl: './activity-chart.component.scss',
  imports: [NgChartsModule, CommonModule],
})
export class ActivityChartComponent {
	public labels: string[] = [];
	public data: number[] = [];

	public isBrowser: boolean;

	constructor(@Inject(PLATFORM_ID) platformId: Object) {
  		this.isBrowser = isPlatformBrowser(platformId);
	}

	public lineChartData: ChartConfiguration<'line'>['data'] = {
		labels: this.labels,
		datasets: [
		  {
			data: this.data,
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
				max: 20,
				bounds: "data"
			}
		}
	};
	public lineChartLegend = false;
}
