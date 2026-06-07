import { inject, Injectable, signal } from '@angular/core';
import { Appointment, StorageService } from '../storage/storage';

@Injectable({
	providedIn: 'root',
})
export class AppointmentsService {
	private _storageService = inject(StorageService);

	private _confirmedAppointments = signal<Appointment[]>([]);
	private _unconfirmedAppointments = signal<Appointment[]>([]);
	private _unpaidAppointments = signal<Appointment[]>([]);

	confirmedAppointments = this._confirmedAppointments.asReadonly();
	unconfirmedAppointments = this._unconfirmedAppointments.asReadonly();
	unpaidAppointments = this._unpaidAppointments.asReadonly();

	async fetchAll() {
		this.fetchConfirmedAppointments();
		this.fetchUnconfirmedAppointments();
		this.fetchUnpaidAppointments();
	}

	async fetchConfirmedAppointments() {
		const appointments = await this._storageService.getConfirmedAppointments();

		this._confirmedAppointments.set(appointments);
	}

	async fetchUnconfirmedAppointments() {
		const appointments = await this._storageService.getUnconfirmedAppointments();

		this._unconfirmedAppointments.set(appointments);

		if (this.unconfirmedAppointments().length === 0) {
			// Mocking outside interaction, since there's no page to create appointments

			const minDelay = 5000;
			const maxDelay = 10000;

			const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

			setTimeout(async () => {
				const todayAt = (hours: number) => new Date(new Date().setHours(hours, 0, 0, 0));

				const id = await this.addAppointment({
					carModel: 'Hyundai HB20',
					carPlate: '',
					dateTime: todayAt(8),
					isConfirmed: false,
					status: 'pending',
					isPaid: false,
					services: ['Lavagem Completa'],
					total: 120.0,
				});

				const plateEnd = (id % 10000).toString().padStart(4, '0');

				await this.updateAppointment(id, {
					carModel: `Hyundai HB${id}`,
					carPlate: `HHH${plateEnd}`,
				});
			}, delay);
		}
	}

	async fetchUnpaidAppointments() {
		const appointments = await this._storageService.getUnpaidAppointments();

		this._unpaidAppointments.set(appointments);
	}

	async addAppointment(appointment: Appointment) {
		const retValue = await this._storageService.addAppointment(appointment);

		// The wait for a brute force re-fetch is unnoticeable
		this.fetchAll();

		return retValue;
	}

	async updateAppointment(id: number, changes: Partial<Appointment>) {
		const updateCount = await this._storageService.updateAppointment(id, changes);

		if (updateCount !== 1) throw Error(':(');

		// The wait for a brute force re-fetch is unnoticeable
		this.fetchAll();
	}

	async deleteAppointment(id: number) {
		await this._storageService.deleteAppointment(id);

		// The wait for a brute force re-fetch is unnoticeable
		this.fetchAll();
	}
}
