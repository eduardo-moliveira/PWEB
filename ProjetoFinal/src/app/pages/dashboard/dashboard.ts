import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ScheduleComponent } from './components/schedule/schedule';
import { AppointmentService } from '../../shared/services/appointment/appointment';
import { AppointmentListSectionComponent } from './components/appointment-list-section/appointment-list-section';
import { UnconfirmedAppointmentCardComponent } from './components/unconfirmed-appointment-card/unconfirmed-appointment-card';
import { UnpaidAppointmentCardComponent } from './components/unpaid-appointment-card/unpaid-appointment-card';

@Component({
	selector: 'app-dashboard',
	imports: [
		DatePipe,
		ScheduleComponent,
		AppointmentListSectionComponent,
		UnconfirmedAppointmentCardComponent,
		UnpaidAppointmentCardComponent,
	],
	templateUrl: './dashboard.html',
	styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
	private _appointmentService = inject(AppointmentService);

	currentDate = new Date();

	confirmedAppointments = this._appointmentService.confirmedAppointments;
	unconfirmedAppointments = this._appointmentService.unconfirmedAppointments;
	unpaidAppointments = this._appointmentService.unpaidAppointments;

	ngOnInit() {
		this._appointmentService.fetchAll();
	}
}
