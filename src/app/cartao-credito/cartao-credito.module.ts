import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesService } from '../clientes/services/clientes.service';
import { CartaoCreditoRoutingModule } from './cartao-credito-router.module';
import { CartaoCreditoService } from './service/cartao-credito.service';
import { CartaoCreditoListPageComponent } from './components/cartao-credito-list-page/cartao-credito-list-page.component';
import { CartaoCreditoFormPageComponent } from './components/cartao-credito-form-page/cartao-credito-form-page.component';



@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule, 
    IonicModule, 
    FormsModule, 
    ReactiveFormsModule, 
    CartaoCreditoRoutingModule
  ],
  declarations: [CartaoCreditoListPageComponent, CartaoCreditoFormPageComponent],
  providers: [CartaoCreditoService, ClientesService]
})
export class CartaoCreditoModule { }
