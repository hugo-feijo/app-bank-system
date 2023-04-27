import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContaRoutingModule } from './conta-router.module';
import { ContasListPageComponent } from './components/conta-list-page/conta-list-page.component';
import { ContaService } from './service/conta.service';
import { ClientesService } from '../clientes/services/clientes.service';
import { ContaFormPageComponent } from './components/conta-form-page/conta-form-page.component';



@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule, 
    IonicModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ContaRoutingModule
  ],
  declarations: [ContasListPageComponent, ContaFormPageComponent],
  providers: [ContaService, ClientesService]
})
export class ContaModule { }
