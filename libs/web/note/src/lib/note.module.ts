import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotelistComponent } from './notelist/notelist.component';
import { NoteComponent } from './note/note.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotelistComponent,
      },
      {
        path: ':id',
        component: NoteComponent,
      },
    ]),
  ],
  declarations: [NoteComponent, NotelistComponent],
  exports: [NoteComponent],
})
export class NoteModule {}
