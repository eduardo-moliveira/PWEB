import { Component, input } from '@angular/core';

@Component({
	selector: 'app-button',
	imports: [],
	templateUrl: './button.html',
	styleUrl: './button.scss',
	host: {
		'[class.disabled]': 'disabled() || loading()',
		'[class.loading]': 'loading()',
	},
})
export class ButtonComponent {
	type = input<'button' | 'submit' | 'reset'>('button');
	icon = input<string>();

	disabled = input<boolean>(false);
	loading = input<boolean>(false);
}
