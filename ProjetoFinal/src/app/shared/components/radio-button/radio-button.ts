import { Component, input, model } from '@angular/core';

@Component({
	selector: 'app-radio-button',
	imports: [],
	templateUrl: './radio-button.html',
	styleUrl: './radio-button.scss',
	host: {
		'[class.checked]': 'checkedValue() === value()',
	},
})
export class RadioButton<T extends string = string> {
	name = input.required<string>();
	value = input.required<T>();

	checkedValue = model<T>();
}
