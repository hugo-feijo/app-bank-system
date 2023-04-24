import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-clientes-form-page',
  templateUrl: 'clientes-form-page.component.html',
})
export class ClientesFormPageComponent {
  name!: string;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}