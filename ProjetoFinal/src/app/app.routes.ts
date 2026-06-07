import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'dashboard',
		loadComponent: () => import('./pages/dashboard/dashboard').then((c) => c.Dashboard),
	},
	{
		path: 'services',
		loadComponent: () => import('./pages/services/services').then((c) => c.Services),
	},
	{
		path: '**',
		redirectTo: 'dashboard',
	},
];
