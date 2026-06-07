import { Component, inject, signal, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button';
import { ServicesService } from '../../shared/services/services/services';
import { CurrencyPipe } from '@angular/common';
import { ToggleSwitchComponent } from '../../shared/components/toggle-switch/toggle-switch';
import { ModalComponent } from '../../shared/components/modal/modal';
import { ServiceFormComponent } from './components/service-form/service-form';
import { Service } from '../../shared/services/storage/storage';

@Component({
	selector: 'app-services',
	imports: [
		ButtonComponent,
		CurrencyPipe,
		ToggleSwitchComponent,
		ModalComponent,
		ServiceFormComponent,
	],
	templateUrl: './services.html',
	styleUrl: './services.scss',
})
export class Services implements OnInit {
	private _servicesService = inject(ServicesService);

	services = this._servicesService.services;

	isModalOpen = signal<boolean>(false);
	selectedService = signal<Service | null>(null);

	ngOnInit() {
		this._servicesService.fetchAll();
	}

	openNewServiceModal() {
		this.selectedService.set(null);
		this.isModalOpen.set(true);
	}

	openEditServiceModal(service: Service) {
		this.selectedService.set(service);
		this.isModalOpen.set(true);
	}

	async toggleServiceStatus(service: Service) {
		if (!service.id) return;

		await this._servicesService.updateService(service.id, { isActive: !service.isActive });
	}
}
