import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimerPopoverComponent } from './timer-popover.component';


@NgModule({
  declarations: [TimerPopoverComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class TimerSetupModule { }
