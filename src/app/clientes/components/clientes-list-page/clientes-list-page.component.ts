
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ClienteInterface } from "../../types/cliente.interface";
import { Subscription } from "rxjs";
import { ClientesService } from "../../services/clientes.service";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";

@Component({
    selector: 'app-clientes-list-page',
    templateUrl: './clientes-list-page.component.html'
}) 
export class ClientesListPageComponent implements OnInit{
  
  clientes: ClienteInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private clientesService: ClientesService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,) {}

  ngOnInit (): void {
    this.findAll();
  }

  async findAll() {
    const busyLoader = await this.loadingController.create({ spinner: 'circular' })
    busyLoader.present()

    const subscription = this.clientesService.findAll()
      .subscribe(async (clientes) => {
        this.clientes = clientes;
        const toast = await this.toastController.create({
          color: 'success',
          message: 'Lista de clientes carregada com sucesso!',
          duration: 1500,
          buttons: ['X']
        })
        toast.present()
        busyLoader.dismiss();
      }, async () => {
        const alerta = await this.alertController.create({
          header: 'Erro',
          message: 'Não foi possível carregar a lista de autores',
          buttons: ['Ok']
        })
        alerta.present()
        busyLoader.dismiss();
      });
    this.subscriptions.add(subscription);
  }
}  