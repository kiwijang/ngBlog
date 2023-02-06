import { Route } from '@angular/router';
import { LayoutComponent } from '@ng-blog/web/shell/ui/layout';

export const webShellRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: async () =>
          (await import('@ng-blog/web/home')).HomeModule,
      },
      {
        path: 'notes',
        loadChildren: async () =>
          (await import('@ng-blog/web/note')).NoteModule,
      },
    ],
  },
];
