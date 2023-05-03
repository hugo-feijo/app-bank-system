
import { Component } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { AlertController, LoadingController, ModalController, ToastController, ViewWillEnter } from "@ionic/angular";
import { CartaoCreditoInterface } from "../../types/cartao-credito.interface";
import { ClienteInterface } from "src/app/clientes/types/cliente.interface";
import { ClientesService } from "src/app/clientes/services/clientes.service";
import { CartaoCreditoService } from "../../service/cartao-credito.service";
import { CartaoCreditoFormPageComponent } from "../cartao-credito-form-page/cartao-credito-form-page.component";

@Component({
    selector: 'app-cartao-credito-list-page',
    templateUrl: './cartao-credito-list-page.component.html'
}) 
export class CartaoCreditoListPageComponent implements ViewWillEnter{
  
  cartoes: CartaoCreditoInterface[] = [];
  clientes: ClienteInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private cartaoCreditoService: CartaoCreditoService,
    private clientesService: ClientesService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController,) {}

  ionViewWillEnter (): void {
    this.findAll();
  }

  async findAll() {
    const busyLoader = await this.loadingController.create({ spinner: 'circular' })
    busyLoader.present()

    const subscriptionConta = this.cartaoCreditoService.findAll()
      .subscribe(async (contas) => {
        const subscriptionCliente = this.getClientes().subscribe(clientes => {
          this.clientes = clientes;
          window.localStorage.setItem('clientes', JSON.stringify(clientes));
          this.cartoes = this.loadClientes(contas, clientes);
        })
        this.subscriptions.add(subscriptionCliente);
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

  loadClientes(contas: CartaoCreditoInterface[], clientes: ClienteInterface[]): CartaoCreditoInterface[] {
    return contas.map(conta => {
      return {
        cliente: clientes.filter(cliente => cliente.id == conta.idCliente)[0],
        id: conta.id,
        idCliente: conta.idCliente,
        nome: conta.nome,
        limite: conta.limite,
        valorProximaFatura: conta.valorProximaFatura,
        vencimentoFatura: conta.vencimentoFatura,
        diaFechamento: conta.diaFechamento
      }
    })
  }

  getClientes(): Observable<ClienteInterface[]>  {
    if(!JSON.parse(window.localStorage.getItem('clientes')!)) {
      return this.clientesService.findAll()
    }
    return new Observable((subscribe) => subscribe.next(JSON.parse(window.localStorage.getItem('clientes')!)));
  }

  async openModal(cartao: null|CartaoCreditoInterface) {
    const modal = await this.modalCtrl.create({
      component: CartaoCreditoFormPageComponent,
      componentProps: {
        cartao: cartao,
        clientes: this.clientes
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.findAll();
    }
  }

}  