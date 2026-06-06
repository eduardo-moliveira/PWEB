import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

export interface Appointment {
	id?: number;
	dateTime: Date;
	isConfirmed: boolean;
	status: 'pending' | 'in_progress' | 'completed';
	isPaid: boolean;
	carPlate: string;
	carModel: string;
	services: string[];
	total: number;
}

interface DbAppointment extends Omit<Appointment, 'isConfirmed' | 'isPaid'> {
	isConfirmed: 1 | 0;
	isPaid: 1 | 0;
}

export interface Service {
	id?: number;
	name: string;
	description: string;
	duration: number;
	price: number;
	isActive: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class StorageService extends Dexie {
	private appointments!: Table<DbAppointment, number>;
	private services!: Table<Service, number>;

	constructor() {
		super('storage');

		this.version(2).stores({
			appointments: '++id, isConfirmed, status, isPaid, [status+isPaid]',
			services: '++id',
		});

		this.on('populate', async () => {
			await this.services.bulkAdd([
				{
					name: 'Lavagem Simples',
					description: 'Lavagem externa e secagem',
					duration: 45,
					price: 60.0,
					isActive: true,
				},
				{
					name: 'Lavagem Completa',
					description: 'Externa, interna e cera',
					duration: 90,
					price: 120.0,
					isActive: true,
				},
				{
					name: 'Polimento',
					description: 'Polimento técnico com máquina',
					duration: 120,
					price: 250.0,
					isActive: false,
				},
			]);

			const todayAt = (hours: number) => new Date(new Date().setHours(hours, 0, 0, 0));

			const seedAppointments: Appointment[] = [
				{
					carModel: 'Hyundai HB20',
					carPlate: '',
					dateTime: todayAt(11),
					isConfirmed: false,
					status: 'pending',
					isPaid: false,
					services: ['Lavagem Completa'],
					total: 120.0,
				},
				{
					carModel: 'Renault Sandero',
					carPlate: '',
					dateTime: todayAt(14),
					isConfirmed: false,
					status: 'pending',
					isPaid: false,
					services: ['Lavagem Simples'],
					total: 60.0,
				},
				{
					carModel: 'Ford Ka',
					carPlate: '',
					dateTime: todayAt(17),
					isConfirmed: false,
					status: 'pending',
					isPaid: false,
					services: ['Lavagem', 'Aspiração'],
					total: 90.0,
				},

				{
					carModel: 'Chevrolet Onix',
					carPlate: 'ABC1234',
					dateTime: todayAt(9),
					isConfirmed: true,
					status: 'completed',
					isPaid: false,
					services: ['Lavagem Simples'],
					total: 60.0,
				},
				{
					carModel: 'Fiat Uno',
					carPlate: 'XYZ5678',
					dateTime: todayAt(9),
					isConfirmed: true,
					status: 'completed',
					isPaid: false,
					services: ['Lavagem Completa', 'Cera'],
					total: 120.0,
				},

				{
					carModel: 'Honda Civic',
					carPlate: 'DEF9012',
					dateTime: todayAt(9),
					isConfirmed: true,
					status: 'completed',
					isPaid: true,
					services: ['Aspiração'],
					total: 30.0,
				},
				{
					carModel: 'Toyota Corolla',
					carPlate: 'GHI3456',
					dateTime: todayAt(10),
					isConfirmed: true,
					status: 'completed',
					isPaid: true,
					services: ['Polimento'],
					total: 250.0,
				},
				{
					carModel: 'Volkswagen Gol',
					carPlate: 'JKL7890',
					dateTime: todayAt(13),
					isConfirmed: true,
					status: 'completed',
					isPaid: true,
					services: ['Lavagem Completa'],
					total: 120.0,
				},

				{
					carModel: 'Nissan Kicks',
					carPlate: 'MNO2345',
					dateTime: todayAt(14),
					isConfirmed: true,
					status: 'in_progress',
					isPaid: false,
					services: ['Lavagem', 'Cera'],
					total: 90.0,
				},
				{
					carModel: 'Jeep Renegade',
					carPlate: 'PQR6789',
					dateTime: todayAt(14),
					isConfirmed: true,
					status: 'in_progress',
					isPaid: false,
					services: ['Lavagem Simples'],
					total: 60.0,
				},

				{
					carModel: 'Hyundai Creta',
					carPlate: 'STU1234',
					dateTime: todayAt(15),
					isConfirmed: true,
					status: 'pending',
					isPaid: false,
					services: ['Lavagem Completa'],
					total: 120.0,
				},
				{
					carModel: 'Ford Ranger',
					carPlate: 'VWX5678',
					dateTime: todayAt(15),
					isConfirmed: true,
					status: 'pending',
					isPaid: false,
					services: ['Lavagem', 'Polimento'],
					total: 310.0,
				},
				{
					carModel: 'Renault Kwid',
					carPlate: 'YZA9012',
					dateTime: todayAt(16),
					isConfirmed: true,
					status: 'pending',
					isPaid: false,
					services: ['Lavagem Simples'],
					total: 60.0,
				},
				{
					carModel: 'Citroën C3',
					carPlate: 'BCD3456',
					dateTime: todayAt(17),
					isConfirmed: true,
					status: 'pending',
					isPaid: false,
					services: ['Aspiração'],
					total: 30.0,
				},
				{
					carModel: 'Peugeot 208',
					carPlate: 'EFG7890',
					dateTime: todayAt(17),
					isConfirmed: true,
					status: 'pending',
					isPaid: false,
					services: ['Lavagem Completa'],
					total: 120.0,
				},
			];

			await this.appointments.bulkAdd(seedAppointments.map((a) => this._toDbAppointment(a)));
		});

		this.appointments = this.table('appointments');
		this.services = this.table('services');
	}

	private _toAppAppointment(dbData: DbAppointment): Appointment {
		return {
			...dbData,
			isConfirmed: dbData.isConfirmed === 1,
			isPaid: dbData.isPaid === 1,
		};
	}

	private _toDbAppointment(appData: Appointment): DbAppointment {
		return {
			...appData,
			isConfirmed: appData.isConfirmed ? 1 : 0,
			isPaid: appData.isPaid ? 1 : 0,
		};
	}

	private _toDbPartialAppointment(changes: Partial<Appointment>): Partial<DbAppointment> {
		const dbChanges: Partial<DbAppointment> = { ...changes } as any;

		if (changes.isConfirmed !== undefined) {
			dbChanges.isConfirmed = changes.isConfirmed ? 1 : 0;
		}

		if (changes.isPaid !== undefined) {
			dbChanges.isPaid = changes.isPaid ? 1 : 0;
		}

		return dbChanges;
	}

	async getConfirmedAppointments(): Promise<Appointment[]> {
		const appointments = await this.appointments.where('isConfirmed').equals(1).toArray();

		return appointments.map((a) => this._toAppAppointment(a));
	}

	async getUnconfirmedAppointments(): Promise<Appointment[]> {
		const appointments = await this.appointments.where('isConfirmed').equals(0).toArray();

		return appointments.map((a) => this._toAppAppointment(a));
	}

	async getUnpaidAppointments(): Promise<Appointment[]> {
		const appointments = await this.appointments
			.where('[status+isPaid]')
			.equals(['completed', 0])
			.toArray();

		return appointments.map((a) => this._toAppAppointment(a));
	}

	async updateAppointment(id: number, changes: Partial<Appointment>): Promise<number> {
		return this.appointments.update(id, this._toDbPartialAppointment(changes));
	}

	async addAppointment(appointment: Appointment): Promise<number> {
		return this.appointments.add(this._toDbAppointment(appointment));
	}

	async getAllServices(): Promise<Service[]> {
		return this.services.toArray();
	}

	async addService(service: Service): Promise<number> {
		return this.services.add(service);
	}

	async updateService(id: number, changes: Partial<Service>): Promise<number> {
		return this.services.update(id, changes);
	}
}
