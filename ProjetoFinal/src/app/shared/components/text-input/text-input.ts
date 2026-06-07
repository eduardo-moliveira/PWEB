import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-text-input',
	imports: [ReactiveFormsModule],
	templateUrl: './text-input.html',
	styleUrl: './text-input.scss',
	host: {
		'[class.has-error]': 'hasError',
	},
})
export class TextInputComponent {
	control = input.required<FormControl>();
	label = input.required<string>();

	type = input<'text' | 'number'>('text');
	step = input<string | number>('1');
	placeholder = input<string>('');

	maxLength = input<number | string>();

	get hasError(): boolean {
		return this.control().invalid && this.control().touched;
	}

	get errorMessages(): string[] {
		const errors = this.control().errors;

		if (!errors) return [];

		return Object.keys(errors).map((key) => {
			const formatter = this._errorMessages[key];
			return formatter ? formatter(errors[key]) : 'Valor inválido.';
		});
	}

	private _errorMessages: Record<string, (err: any) => string> = {
		required: () =>
			this.type() === 'number' ? 'Valor inválido.' : 'Este campo é obrigatório.',
		minlength: (err) => `O mínimo são ${err.requiredLength} caracteres.`,
		maxlength: (err) => `O máximo são ${err.requiredLength} caracteres.`,
		min: (err) => `O valor mínimo é ${err.min}.`,
		max: (err) => `O valor máximo é ${err.max}.`,
	};

	markAsTouched() {
		this.control().markAsTouched();
	}
}
