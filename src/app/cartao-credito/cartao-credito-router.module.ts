import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { CartaoCreditoListPageComponent } from "./components/cartao-credito-list-page/cartao-credito-list-page.component";

const routes: Route[] = [
    {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full'
    },
    {
        path: '',
        component: CartaoCreditoListPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartaoCreditoRoutingModule { }