import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Appointment } from '../../../../../../shared/services/storage/storage';
import { DatePipe } from '@angular/common';
import { AppointmentsService } from '../../../../../../shared/services/appointments/appointment';
import { RadioButton } from '../../../../../../shared/components/radio-button/radio-button';
import { toObservable } from '@angular/core/rxjs-interop';
import { catchError, distinctUntilChanged, switchMap, EMPTY, from } from 'rxjs';

type StatusType = Appointment['status'];

interface Status {
	value: StatusType;
	label: string;
}

interface StatusStyle {
	checked: string;
	active: string;
	hover: string;
	text: string;
}

@Component({
	selector: 'schedule-slot-card',
	imports: [DatePipe, RadioButton],
	templateUrl: './slot-card.html',
	styleUrl: './slot-card.scss',
})
export class SlotCardComponent {
	private _appointmentsService = inject(AppointmentsService);

	appointment = input.required<Appointment>();

	statuses: Status[] = [
		{ value: 'pending', label: 'Pendente' },
		{ value: 'in_progress', label: 'Andamento' },
		{ value: 'completed', label: 'Concluído' },
	];

	statusStyles: Record<StatusType, StatusStyle> = {
		pending: {
			checked: 'var(--info)',
			active: 'var(--info-active)',
			hover: 'var(--info-hover)',
			text: 'var(--text-on-info)',
		},
		in_progress: {
			checked: 'var(--warning)',
			active: 'var(--warning-active)',
			hover: 'var(--warning-hover)',
			text: 'var(--text-on-warning)',
		},
		completed: {
			checked: 'var(--success)',
			active: 'var(--success-active)',
			hover: 'var(--success-hover)',
			text: 'var(--text-on-success)',
		},
	};

	radioName = computed(() => 'status-' + (this.appointment().id ?? '0'));

	localStatus = signal<StatusType>('pending');
	private fallbackStatus: StatusType = 'pending';

	constructor() {
		effect(() => {
			const incomingStatus = this.appointment().status;
			this.localStatus.set(incomingStatus);
			this.fallbackStatus = incomingStatus;
		});

		toObservable(this.localStatus)
			.pipe(
				distinctUntilChanged(),
				switchMap((newStatus) => {
					const id = this.appointment().id;

					if (!id || newStatus === this.fallbackStatus) return EMPTY;

					return from(
						this._appointmentsService.updateAppointment(id, { status: newStatus }),
					).pipe(
						catchError(() => {
							this.localStatus.set(this.fallbackStatus);
							return EMPTY;
						}),
					);
				}),
			)
			.subscribe(() => {
				this.fallbackStatus = this.localStatus();
			});
	}
}
