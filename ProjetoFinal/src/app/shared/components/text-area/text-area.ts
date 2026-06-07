import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-text-area',
	imports: [ReactiveFormsModule],
	templateUrl: './text-area.html',
	styleUrl: './text-area.scss',
	host: {
		'[class.has-error]': 'hasError',
	},
})
export class TextAreaComponent {
	control = input.required<FormControl>();
	label = input.required<string>();

	placeholder = input<string>('');
	rows = input<number>(3);

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
		required: () => 'Este campo é obrigatório.',
		minlength: (err) => `O mínimo são ${err.requiredLength} caracteres.`,
		maxlength: (err) => `O máximo são ${err.requiredLength} caracteres.`,
	};

	markAsTouched() {
		this.control().markAsTouched();
	}
}
