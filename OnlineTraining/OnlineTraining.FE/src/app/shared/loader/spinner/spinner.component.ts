import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../loader.service';
import { LoaderState } from '../loader.model';

@Component({
  selector: 'ota-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  loading: boolean;
  private subscription: Subscription;

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
        .subscribe((state: LoaderState) => {
          this.loading = state.loading;
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
