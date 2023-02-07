import { NgModule } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { RouterModule } from '@angular/router';
import { webShellRoutes } from './web-shell.routes';
import { LayoutModule } from '@ng-blog/web/shell/ui/layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(webShellRoutes, {
      scrollPositionRestoration: 'top',
    }),
    LayoutModule,
  ],
  exports: [LayoutModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class WebShellModule {}
