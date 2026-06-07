import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from '../../../../shared/components/text-input/text-input';
import { TextAreaComponent } from '../../../../shared/components/text-area/text-area';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { ServicesService } from '../../../../shared/services/services/services';
import { Service } from '../../../../shared/services/storage/storage';

@Component({
	selector: 'app-service-form',
	imports: [ReactiveFormsModule, TextInputComponent, TextAreaComponent, ButtonComponent],
	templateUrl: './service-form.html',
	styleUrl: './service-form.scss',
})
export class ServiceFormComponent implements OnInit {
	private _servicesService = inject(ServicesService);

	service = input<Service | null>(null);
	closeForm = output<void>();

	isSaving = signal<boolean>(false);

	form = new FormGroup({
		name: new FormControl<string>('', {
			nonNullable: true,
			validators: [Validators.required, Validators.maxLength(50)],
		}),
		description: new FormControl<string>('', {
			nonNullable: true,
			validators: [Validators.required, Validators.maxLength(300)],
		}),
		duration: new FormControl<number | null>(null, {
			validators: [Validators.required, Validators.min(1), Validators.max(1000)],
		}),
		price: new FormControl<number | null>(null, {
			validators: [Validators.required, Validators.min(0.01), Validators.max(100000)],
		}),
	});

	ngOnInit() {
		const currentService = this.service();

		if (currentService) {
			this.form.patchValue({
				name: currentService.name,
				description: currentService.description,
				duration: currentService.duration,
				price: currentService.price,
			});
		}
	}

	async save() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			this.form.markAllAsDirty();
			return;
		}

		if (this.isSaving()) return;

		this.isSaving.set(true);

		const formValue = this.form.getRawValue();
		const currService = this.service();

		const payload = {
			name: formValue.name,
			description: formValue.description,
			duration: formValue.duration as number,
			price: formValue.price as number,
		};

		try {
			if (currService?.id) {
				await this._servicesService.updateService(currService.id, payload);
			} else {
				await this._servicesService.addService({
					...payload,
					isActive: true,
				});
			}

			this.closeForm.emit();
		} catch (err) {
			console.error(err);
		}

		this.isSaving.set(false);
	}
}
