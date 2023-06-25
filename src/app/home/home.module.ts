import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-router.module';
import { HomeComponent } from './home.component';
import { HomeService } from './service/home.service';



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
  providers: [HomeService]
})
export class HomeModule { }
