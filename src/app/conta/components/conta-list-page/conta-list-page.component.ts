
import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { AlertController, LoadingController, ModalController, ToastController } from "@ionic/angular";
import { ContaInterface } from "../../types/conta.interface";
import { ContaService } from "../../service/conta.service";
import { ClientesFormPageComponent } from "src/app/clientes/components/clientes-form-page/clientes-form-page.component";
import { ClienteInterface } from "src/app/clientes/types/cliente.interface";
import { ClientesService } from "src/app/clientes/services/clientes.service";
import { ContaFormPageComponent } from "../conta-form-page/conta-form-page.component";

@Component({
    selector: 'app-conta-list-page',
    templateUrl: './conta-list-page.component.html'
}) 
export class ContasListPageComponent implements OnInit{
  
  contas: ContaInterface[] = [];
  clientes: ClienteInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private contaService: ContaService,
    private clientesService: ClientesService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController,) {}

  ngOnInit (): void {
    this.findAll();
  }

  async findAll() {
    const busyLoader = await this.loadingController.create({ spinner: 'circular' })
    busyLoader.present()

    const subscriptionConta = this.contaService.findAll()
      .subscribe(async (contas) => {
        const subscriptionCliente = this.getClientes().subscribe(clientes => {
          this.clientes = clientes;
          window.localStorage.setItem('clientes', JSON.stringify(clientes));
          this.contas = this.loadClientes(contas, clientes);
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

  loadClientes(contas: ContaInterface[], clientes: ClienteInterface[]): ContaInterface[] {
    return contas.map(conta => {
      return {
        cliente: clientes.filter(cliente => cliente.id == conta.idCliente)[0],
        id: conta.id,
        idCliente: conta.idCliente,
        instituicao: conta.instituicao,
        agencia: conta.agencia,
        conta: conta.conta,
        saldo: conta.saldo
      }
    })
  }

  getClientes(): Observable<ClienteInterface[]>  {
    if(!JSON.parse(window.localStorage.getItem('clientes')!)) {
      return this.clientesService.findAll()
    }
    return new Observable((subscribe) => subscribe.next(JSON.parse(window.localStorage.getItem('clientes')!)));
  }

  async openModal(conta: null|ContaInterface) {
    const modal = await this.modalCtrl.create({
      component: ContaFormPageComponent,
      componentProps: {
        conta: conta,
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