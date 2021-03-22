import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TimerPopoverComponent } from '../timer-popover/timer-popover.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public popoverController: PopoverController) {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: TimerPopoverComponent,
      mode: 'ios',
      // cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
