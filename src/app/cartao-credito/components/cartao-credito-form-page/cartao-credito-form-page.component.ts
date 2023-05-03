import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CartaoCreditoInterface } from '../../types/cartao-credito.interface';
import { ClienteInterface } from 'src/app/clientes/types/cliente.interface';
import { CartaoCreditoService } from '../../service/cartao-credito.service';

@Component({
  selector: 'app-cartao-credito-form-page',
  templateUrl: 'cartao-credito-form-page.component.html',
})
export class CartaoCreditoFormPageComponent implements OnInit{

  @Input()
  cartao = {} as CartaoCreditoInterface;

  @Input()
  clientes = [] as ClienteInterface[];

  clienteForm!: FormGroup;
  subscriptions = new Subscription();

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private cartaoCreditoService: CartaoCreditoService,
    private alertController: AlertController) {}

  ngOnInit (): void {
    this.clienteForm = this.formBuilder.group({
      idCliente: [
        this.cartao?.idCliente ? this.cartao.idCliente : '',
        Validators.required
      ],
      nome: [
        this.cartao?.nome ? this.cartao.nome : '', 
        [
          Validators.required, 
          Validators.maxLength(250)
        ]
      ],
      limite: [
        this.cartao?.limite ? this.cartao.limite : '',
        Validators.required
      ],
      valorProximaFatura: [
        this.cartao?.valorProximaFatura ? this.cartao.valorProximaFatura : '',
        Validators.required
      ],
      vencimentoFatura: [
        this.cartao?.vencimentoFatura ? this.cartao.vencimentoFatura : '2023-05-03',
        Validators.required
      ],
      diaFechamento: [
        this.cartao?.diaFechamento ? this.cartao.diaFechamento : '',
        Validators.required
      ]
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(): void {
    if(this.cartao?.id) {
      this.updateCartao(this.clienteForm.value)
    } else {
      this.saveCartao(this.clienteForm.value)
    }
  }

  saveCartao(cliente: CartaoCreditoInterface): void {
    this.subscriptions.add(
      this.cartaoCreditoService.save(cliente).subscribe(
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

  updateCartao(cliente: CartaoCreditoInterface): void {
    this.subscriptions.add(
      this.cartaoCreditoService.update(cliente, this.cartao.id).subscribe(
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

  deleteCartao(clienteId: string): void {
    this.subscriptions.add(
      this.cartaoCreditoService.delete(clienteId).subscribe(
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