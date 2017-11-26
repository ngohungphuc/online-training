import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoaderState } from './loader.model';
import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class LoaderService {
  private loaderSubject = new Subject<LoaderState>();

  loaderState = this.loaderSubject.asObservable();

  constructor(public ngProgress: NgProgress) {}

  show() {
    this.ngProgress.set(0.5);
    this.ngProgress.inc(0.5);
    this.ngProgress.start();
    this.loaderSubject.next(<LoaderState>{ loading: true });
  }

  hide() {
    this.ngProgress.done();
    this.loaderSubject.next(<LoaderState>{ loading: false });
  }
}
