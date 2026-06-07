import { Component, inject, input, signal } from '@angular/core';
import { Appointment } from '../../../../shared/services/storage/storage';
import { DatePipe } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { AppointmentsService } from '../../../../shared/services/appointments/appointment';

@Component({
	selector: 'dashboard-unconfirmed-appointment-card',
	imports: [DatePipe, ButtonComponent],
	templateUrl: './unconfirmed-appointment-card.html',
	styleUrl: './unconfirmed-appointment-card.scss',
})
export class UnconfirmedAppointmentCardComponent {
	private _appointmentsService = inject(AppointmentsService);

	appointment = input.required<Appointment>();

	isRefusing = signal<boolean>(false);
	isConfirming = signal<boolean>(false);

	async handleRefuse() {
		if (this.isRefusing()) return;

		const id = this.appointment().id;

		if (!id) return;

		this.isRefusing.set(true);

		try {
			await this._appointmentsService.deleteAppointment(id);
		} catch (err) {
			// TODO?: Toast message
		}

		this.isRefusing.set(false);
	}

	async handleConfirm() {
		if (this.isConfirming()) return;

		const id = this.appointment().id;

		if (!id) return;

		this.isConfirming.set(true);

		try {
			await this._appointmentsService.updateAppointment(id, { isConfirmed: true });
		} catch (err) {
			// TODO?: Toast message
		}

		this.isConfirming.set(false);
	}
}
