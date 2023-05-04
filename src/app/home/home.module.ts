import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesService } from '../clientes/services/clientes.service';
import { ContaService } from '../conta/service/conta.service';
import { CartaoCreditoService } from '../cartao-credito/service/cartao-credito.service';
import { HomeRoutingModule } from './home-router.module';
import { HomeComponent } from './home.component';



@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule, 
    IonicModule, 
    FormsModule, 
    ReactiveFormsModule, 
    HomeRoutingModule
  ],
  declarations: [HomeComponent],
  providers: [ContaService, ClientesService, CartaoCreditoService]
})
export class HomeModule { }
