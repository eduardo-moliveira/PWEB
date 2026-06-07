import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./core/layouts/aside/aside').then((c) => c.AsideLayout),
		children: [
			{
				path: 'dashboard',
				loadComponent: () => import('./pages/dashboard/dashboard').then((c) => c.Dashboard),
				data: { label: 'Agenda', icon: 'pi-calendar' },
			},
			{
				path: 'services',
				loadComponent: () => import('./pages/services/services').then((c) => c.Services),
				data: { label: 'Serviços', icon: 'pi-wrench' },
			},
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
		],
	},
	{
		path: '**',
		redirectTo: 'dashboard',
	},
];
