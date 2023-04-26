import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContaRoutingModule } from './conta-router.module';
import { ContasListPageComponent } from './components/conta-list-page/conta-list-page.component';



@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule, 
    IonicModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ContaRoutingModule
  ],
  declarations: [ContasListPageComponent]
})
export class ContaModule { }
