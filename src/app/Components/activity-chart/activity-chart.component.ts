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
	public isBrowser: boolean;

	constructor(@Inject(PLATFORM_ID) platformId: Object) {
  		this.isBrowser = isPlatformBrowser(platformId);
	}

	public lineChartData: ChartConfiguration<'line'>['data'] = {
		labels: [
		  '20/01',
		  '21/01',
		  '22/01',
		  '23/01',
		  '24/01',
		  '25/01',
		  '26/01',
		  '27/01',
		  '28/01',
		  '29/01',
		  '30/01',
		  '31/01',
		  '01/02',
		],
		datasets: [
		  {
			data: [ 1, 6, 10, 9, 15, 6, 7, 5, 4, 6, 9, 2, 14],
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
