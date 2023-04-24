import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesRoutingModule } from './clientes-router.module';
import { ClientesListPageComponent } from './components/clientes-list-page/clientes-list-page.component';
import { ClientesService } from './services/clientes.service';
import { ClientesFormPageComponent } from './components/clientes-form-page/clientes-form-page.component';



@NgModule({
  declarations: [ClientesListPageComponent, ClientesFormPageComponent],
  imports: [
    CommonModule, 
    HttpClientModule, 
    IonicModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ClientesRoutingModule
  ],
  providers: [ClientesService]
})
export class ClientesModule { }
