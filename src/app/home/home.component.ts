import { Component, OnInit } from '@angular/core';
import { ContaInterface } from '../conta/types/conta.interface';
import { ContaService } from '../conta/service/conta.service';
import { Observable, Subscription } from 'rxjs';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ClienteInterface } from '../clientes/types/cliente.interface';
import { ClientesService } from '../clientes/services/clientes.service';
import { CartaoCreditoService } from '../cartao-credito/service/cartao-credito.service';
import { CartaoCreditoInterface } from '../cartao-credito/types/cartao-credito.interface';

@Component({
  selector: 'app-conta',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  public totalConta: number = 0;
  public totalFatura: number = 0;
  public contas: ContaInterface[] = [];
  public cartoes: CartaoCreditoInterface[] = [];
  clientes: ClienteInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private contaService: ContaService,
    private clientesService: ClientesService,
    private cartaoCreditoService: CartaoCreditoService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,) { }

  ngOnInit() {
    this.init(null);
  }

  init(event: any) {
    this.totalConta = 0;
    this.totalFatura = 0;
    this.findAllConta();
    this.findAllCartao();
    if(event) 
      event.target.complete();
  }
  async findAllConta() {
    const busyLoader = await this.loadingController.create({ spinner: 'circular' })
    busyLoader.present()

    const subscriptionConta = this.contaService.findAll()
      .subscribe(async (contas) => {
        this.contas = contas;
        this.findTotalConta();
        const toast = await this.toastController.create({
          color: 'success',
          position: 'top',
          message: 'Lista de contas carregada com sucesso!',
          duration: 1500,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de contas',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscriptionConta);
  }

  async findAllCartao() {
    const busyLoader = await this.loadingController.create({ spinner: 'circular' })
    busyLoader.present()

    const subscriptionConta = this.cartaoCreditoService.findAll()
      .subscribe(async (cartoes) => {
        this.cartoes = cartoes;
        this.findTotalFatura();
        const toast = await this.toastController.create({
          color: 'success',
          position: 'top',
          message: 'Lista de cartões carregada com sucesso!',
          duration: 1500,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de cartões',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscriptionConta);
  }

  findTotalConta() {
    this.contas.forEach(conta => this.totalConta = this.totalConta + parseInt(conta.saldo))
  }

  findTotalFatura() {
    this.cartoes.forEach(cartao => this.totalFatura = this.totalFatura + cartao.valorProximaFatura)
  }
}
