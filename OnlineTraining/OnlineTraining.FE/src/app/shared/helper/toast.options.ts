import { ToastOptions } from 'ng2-toastr';
export class ToastOption extends ToastOptions {
  maxShown = 1;
  showCloseButton = true;
}
