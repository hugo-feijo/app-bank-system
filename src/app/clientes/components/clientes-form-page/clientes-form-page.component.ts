import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ClientesService } from '../../services/clientes.service';
import { ClienteInterface } from '../../types/cliente.interface';

@Component({
  selector: 'app-clientes-form-page',
  templateUrl: 'clientes-form-page.component.html',
})
export class ClientesFormPageComponent implements OnInit{
  @Input()
  cliente = {} as ClienteInterface;
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
        this.cliente?.nome ? this.cliente.nome : '', 
        [
          Validators.required, 
          Validators.maxLength(250)
        ]
      ],
      genero: this.cliente?.genero ? this.cliente.genero : '',
      cpf: [
        this.cliente?.cpf ? this.cliente.cpf : '', 
        [
          Validators.required, 
          Validators.maxLength(14)
        ]
      ],
      rg: [
        this.cliente?.rg ? this.cliente.rg : '',
        Validators.required
      ],
      dataNascimento: [
        this.cliente?.dataNascimento ? this.cliente.dataNascimento : '1970-01-01',
        Validators.required
      ]
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(): void {
    if(this.cliente?.id) {
      this.updateCliente(this.clienteForm.value)
    } else {
      this.saveCliente(this.clienteForm.value)
    }
  }

  saveCliente(cliente: ClienteInterface): void {
    this.subscriptions.add(
      this.clientesService.save(cliente).subscribe(
        () => {
          this.modalCtrl.dismiss(cliente, 'confirm');
        },
        async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível salvar os dados do cliente',
            buttons: ['Ok']
          })
          alerta.present()
        }
      )
    )
  }

  updateCliente(cliente: ClienteInterface): void {
    this.subscriptions.add(
      this.clientesService.update(cliente, this.cliente.id).subscribe(
        () => {
          this.modalCtrl.dismiss(cliente, 'confirm');
        },
        async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível atualizar os dados do cliente',
            buttons: ['Ok']
          })
          alerta.present()
        }
      )
    )
  }

  deleteCliente(clienteId: string): void {
    this.subscriptions.add(
      this.clientesService.delete(clienteId).subscribe(
        () => {
          this.modalCtrl.dismiss(clienteId, 'confirm');
        },
        async () => {
          const alerta = await this.alertController.create({
            header: 'Erro',
            message: 'Não foi possível deletar os dados do cliente',
            buttons: ['Ok']
          })
          alerta.present()
        }
      )
    )

  }
}