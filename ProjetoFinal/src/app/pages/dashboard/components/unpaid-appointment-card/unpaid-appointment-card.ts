import { Component, inject, input, signal } from '@angular/core';
import { AppointmentService } from '../../../../shared/services/appointment/appointment';
import { Appointment } from '../../../../shared/services/storage/storage';
import { CurrencyPipe } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button';

@Component({
	selector: 'dashboard-unpaid-appointment-card',
	imports: [CurrencyPipe, ButtonComponent],
	templateUrl: './unpaid-appointment-card.html',
	styleUrl: './unpaid-appointment-card.scss',
})
export class UnpaidAppointmentCardComponent {
	private _appointmentService = inject(AppointmentService);

	appointment = input.required<Appointment>();

	isPaying = signal<boolean>(false);

	async handlePayment() {
		if (this.isPaying()) return;

		const id = this.appointment().id;

		if (!id) return;

		this.isPaying.set(true);

		try {
			await this._appointmentService.updateAppointment(id, { isPaid: true });
		} catch (err) {
			// TODO?: Toast message
		}

		this.isPaying.set(false);
	}
}
