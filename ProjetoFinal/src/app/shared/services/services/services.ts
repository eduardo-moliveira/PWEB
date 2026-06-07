import { inject, Injectable, signal } from '@angular/core';
import { Service, StorageService } from '../storage/storage';

@Injectable({
	providedIn: 'root',
})
export class ServicesService {
	private _storageService = inject(StorageService);

	private _services = signal<Service[]>([]);

	services = this._services.asReadonly();

	async fetchAll() {
		const services = await this._storageService.getAllServices();

		this._services.set(services);

		return services;
	}

	async fetchService(id: number) {
		const service = await this._storageService.getService(id);

		if (service && service.id) {
			// May suffer from race conditions
			this._services.update((services) => {
				const index = services.findIndex((s) => s.id === id);

				if (index === -1) return [...services, service];

				const copy = [...services];

				copy[index] = {
					...copy[index],
					...service,
				};

				return copy;
			});
		}

		return service;
	}

	async addService(service: Service) {
		const id = await this._storageService.addService(service);

		// May suffer from race conditions
		this._services.update((services) => [...services, { id, ...service }]);

		return id;
	}

	async updateService(id: number, changes: Partial<Service>) {
		const updateCount = await this._storageService.updateService(id, changes);

		if (updateCount !== 1) throw Error(':(');

		let found = true;

		// May suffer from race conditions
		this._services.update((services) => {
			const index = services.findIndex((s) => s.id === id);

			if (index === -1) {
				found = false;
				return services;
			}

			const copy = [...services];

			copy[index] = {
				...copy[index],
				...changes,
			};

			return copy;
		});

		if (!found) this.fetchService(id);
	}
}
