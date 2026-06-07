import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ScheduleComponent } from './components/schedule/schedule';
import { AppointmentsService } from '../../shared/services/appointments/appointment';
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
	private _appointmentsService = inject(AppointmentsService);

	currentDate = new Date();

	confirmedAppointments = this._appointmentsService.confirmedAppointments;
	unconfirmedAppointments = this._appointmentsService.unconfirmedAppointments;
	unpaidAppointments = this._appointmentsService.unpaidAppointments;

	ngOnInit() {
		this._appointmentsService.fetchAll();
	}
}
