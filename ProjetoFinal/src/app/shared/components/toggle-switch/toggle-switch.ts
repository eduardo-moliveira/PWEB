import { Component, model } from '@angular/core';

@Component({
	selector: 'app-toggle-switch',
	imports: [],
	templateUrl: './toggle-switch.html',
	styleUrl: './toggle-switch.scss',
	host: {
		'[class.checked]': 'checked()',
	},
})
export class ToggleSwitchComponent {
	checked = model<boolean>(false);
}
