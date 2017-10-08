import { NgModule } from '@angular/core';
import { SignalRService, DataHandlerService } from './index';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
    providers: [
        SignalRService,
        DataHandlerService
    ],
    exports: [
        FooterComponent
    ],
    declarations: [FooterComponent]
})
export class SharedModule {  }