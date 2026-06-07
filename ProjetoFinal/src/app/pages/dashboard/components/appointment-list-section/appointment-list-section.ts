import { Component, input, contentChild, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Appointment } from '../../../../shared/services/storage/storage';

@Component({
	selector: 'dashboard-appointment-list-section',
	imports: [NgTemplateOutlet],
	templateUrl: './appointment-list-section.html',
	styleUrl: './appointment-list-section.scss',
})
export class AppointmentListSectionComponent {
	title = input.required<string>();
	listingLabel = input<string>('itens');

	appointments = input.required<Appointment[]>();

	cardTemplate = contentChild.required(TemplateRef);
}
