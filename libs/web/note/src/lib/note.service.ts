import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  getHtmlText() {
    return fetch('./notes/o7mp336qqwyjf1d0jefmg53.html');
  }

  /**
   * table of contents
   */
  getTOC() {
    return fetch('./notes/o7mp336qqwyjf1d0jefmg53.json');
  }
}
