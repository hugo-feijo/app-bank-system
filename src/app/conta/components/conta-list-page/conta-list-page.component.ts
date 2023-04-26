
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AlertController, LoadingController, ModalController, ToastController } from "@ionic/angular";
import { ContaInterface } from "../../types/conta.interface";

@Component({
    selector: 'app-conta-list-page',
    templateUrl: './conta-list-page.component.html'
}) 
export class ContasListPageComponent implements OnInit{
  
  contas: ContaInterface[] = [];
  subscriptions = new Subscription();

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalCtrl: ModalController,) {}

  ngOnInit (): void {
  }

}  