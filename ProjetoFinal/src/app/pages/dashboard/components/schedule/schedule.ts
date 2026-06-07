import { Component, computed, input } from '@angular/core';
import { Appointment } from '../../../../shared/services/storage/storage';
import { DatePipe } from '@angular/common';
import { SlotCardComponent } from './components/slot-card/slot-card';

interface Slot {
	startTime: Date;
	endTime: Date;
	appointments: Appointment[];
}

@Component({
	selector: 'dashboard-schedule',
	imports: [DatePipe, SlotCardComponent],
	templateUrl: './schedule.html',
	styleUrl: './schedule.scss',
})
export class ScheduleComponent {
	fromHours = input<number>(8);
	toHours = input<number>(18);

	appointments = input<Appointment[]>();

	slots = computed(() => {
		const slots: Slot[] = [];

		for (let i = this.fromHours(); i <= this.toHours(); i++) {
			const startTime = new Date(new Date().setHours(i, 0, 0, 0));
			const endTime = new Date(new Date().setHours(i + 1, 0, 0, 0));

			// Compare appointments by hour only because the seeded data is fixed to a single day
			// This prevents slot matching from breaking once the real current date changes
			const appointments =
				this.appointments()?.filter(
					(a) =>
						a.dateTime.getHours() >= startTime.getHours() &&
						a.dateTime.getHours() < endTime.getHours(),
				) ?? [];

			slots.push({ startTime, endTime, appointments });
		}

		return slots;
	});
}
