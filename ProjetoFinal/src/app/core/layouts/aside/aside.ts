import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface MenuItem {
	path: string;
	label: string;
	icon: string;
}

@Component({
	selector: 'app-aside',
	imports: [RouterOutlet, RouterLink, RouterLinkActive],
	templateUrl: './aside.html',
	styleUrl: './aside.scss',
})
export class AsideLayout {
	private _router = inject(Router);

	isMobileMenuOpen = signal<boolean>(false);

	menuItems: MenuItem[] = [];

	constructor() {
		const layoutRoute = this._router.config.find((r) => r.path === '');

		if (layoutRoute && layoutRoute.children) {
			this.menuItems = layoutRoute.children
				.filter((r) => r.data && r.data['label'])
				.map((r) => ({
					path: '/' + r.path,
					label: r.data!['label'],
					icon: r.data!['icon'],
				}));
		}
	}

	toggleMobileMenu() {
		this.isMobileMenuOpen.update((v) => !v);
	}

	closeMobileMenu() {
		this.isMobileMenuOpen.set(false);
	}
}
