import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes-form-page',
  templateUrl: 'clientes-form-page.component.html',
})
export class ClientesFormPageComponent implements OnInit{
  name!: string;
  clienteForm!: FormGroup;
  subscriptions = new Subscription();

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private alertController: AlertController) {}

  ngOnInit (): void {
    this.clienteForm = this.formBuilder.group({
      nome: [
        '', 
        [Validators.required, 
        Validators.maxLength(250)]
      ],
      genero: '',
      cpf: [
        '', 
        [Validators.required, 
        Validators.maxLength(14)]
      ],
      rg: ['', Validators.required],
      dataNascimento: ['1970-01-01', Validators.required]
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(): void {
    this.subscriptions.add(
      this.clientesService.save(this.clienteForm.value).subscribe(
        () => {
          this.modalCtrl.dismiss(this.name, 'confirm');
        },
        async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível salvar os dados do autor',
            buttons: ['Ok']
          })
          alerta.present()
        }
      )
    )
    
  }
}