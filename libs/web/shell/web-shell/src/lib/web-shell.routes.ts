import { Route } from '@angular/router';
import { LayoutComponent } from '@ng-blog/web/shell/ui/layout';

export const webShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
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
