import { inject, Injectable, signal } from '@angular/core';
import { Appointment, StorageService } from '../storage/storage';

@Injectable({
	providedIn: 'root',
})
export class AppointmentService {
	private _storageService = inject(StorageService);

	private _confirmedAppointments = signal<Appointment[]>([]);
	private _unconfirmedAppointments = signal<Appointment[]>([]);
	private _unpaidAppointments = signal<Appointment[]>([]);

	confirmedAppointments = this._confirmedAppointments.asReadonly();
	unconfirmedAppointments = this._unconfirmedAppointments.asReadonly();
	unpaidAppointments = this._unpaidAppointments.asReadonly();

	async fetchConfirmedAppointments() {
		const appointments = await this._storageService.getConfirmedAppointments();

		this._confirmedAppointments.set(appointments);
	}

	async fetchUnconfirmedAppointments() {
		const appointments = await this._storageService.getUnconfirmedAppointments();

		this._unconfirmedAppointments.set(appointments);
	}

	async fetchUnpaidAppointments() {
		const appointments = await this._storageService.getUnpaidAppointments();

		this._unpaidAppointments.set(appointments);
	}

	async updateAppointment(id: number, changes: Partial<Appointment>): Promise<void> {
		const updateCount = await this._storageService.updateAppointment(id, changes);

		if (updateCount !== 1) throw Error(':(');

		// TODO?: Incremental updates
		// The wait for a brute force re-fetch is unnoticeable
		this.fetchConfirmedAppointments();
		this.fetchUnconfirmedAppointments();
		this.fetchUnpaidAppointments();
	}
}
