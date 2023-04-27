import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ContaInterface } from '../../types/conta.interface';
import { ContaService } from '../../service/conta.service';
import { ClienteInterface } from 'src/app/clientes/types/cliente.interface';

@Component({
  selector: 'app-conta-form-page',
  templateUrl: 'conta-form-page.component.html',
})
export class ContaFormPageComponent implements OnInit{

  @Input()
  conta = {} as ContaInterface;

  @Input()
  clientes = [] as ClienteInterface[];

  clienteForm!: FormGroup;
  subscriptions = new Subscription();

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private contaService: ContaService,
    private alertController: AlertController) {}

  ngOnInit (): void {
    this.clienteForm = this.formBuilder.group({
      idCliente: [
        this.conta?.idCliente ? this.conta.idCliente : '',
        Validators.required
      ],
      instituicao: [
        this.conta?.instituicao ? this.conta.instituicao : '', 
        [
          Validators.required, 
          Validators.maxLength(250)
        ]
      ],
      agencia: [
        this.conta?.agencia ? this.conta.agencia : '',
        Validators.required
      ],
      conta: [
        this.conta?.conta ? this.conta.conta : '',
        Validators.required
      ],
      saldo: [
        this.conta?.saldo ? this.conta.saldo : '',
        Validators.required
      ]
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(): void {
    if(this.conta?.id) {
      this.updateConta(this.clienteForm.value)
    } else {
      this.saveConta(this.clienteForm.value)
    }
  }

  saveConta(cliente: ContaInterface): void {
    this.subscriptions.add(
      this.contaService.save(cliente).subscribe(
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

  updateConta(cliente: ContaInterface): void {
    this.subscriptions.add(
      this.contaService.update(cliente, this.conta.id).subscribe(
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

  deleteConta(clienteId: string): void {
    this.subscriptions.add(
      this.contaService.delete(clienteId).subscribe(
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