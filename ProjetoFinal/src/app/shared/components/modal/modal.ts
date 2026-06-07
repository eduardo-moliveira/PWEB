import { Component, effect, ElementRef, input, model, OnDestroy, viewChild } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
	selector: 'app-modal',
	imports: [ButtonComponent],
	templateUrl: './modal.html',
	styleUrl: './modal.scss',
})
export class ModalComponent implements OnDestroy {
	heading = input.required<string>();
	isOpen = model<boolean>(false);

	dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('dialogRef');

	constructor() {
		effect(() => {
			const dialog = this.dialogRef().nativeElement;

			if (this.isOpen()) {
				if (!dialog.open) {
					dialog.showModal();
					document.body.style.overflow = 'hidden';
				}
			} else {
				if (dialog.open) {
					dialog.close();
					document.body.style.overflow = '';
				}
			}
		});
	}

	onCancel(event: Event) {
		event.preventDefault();
		this.isOpen.set(false);
	}

	ngOnDestroy() {
		document.body.style.overflow = '';
	}
}
