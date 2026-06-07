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

			const appointments =
				this.appointments()?.filter(
					(a) => a.dateTime >= startTime && a.dateTime < endTime,
				) ?? [];

			slots.push({ startTime, endTime, appointments });
		}

		return slots;
	});
}
